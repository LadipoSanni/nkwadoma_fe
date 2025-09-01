'use client'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import React, {useEffect, useState} from "react";
// import CustomSelect from "@/reuseable/Input/Custom-select";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {useCreateLoanProductMutation} from "@/service/admin/loan_product";
import Isloading from "@/reuseable/display/Isloading";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";
import {
    useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery,
} from "@/service/admin/fund_query";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat"
import 'react-quill-new/dist/quill.snow.css'
import { setFundProductAvailableAmount } from "@/redux/slice/loan/selected-loan";
import {store, useAppSelector} from "@/redux/store";
import {formatAmount} from "@/utils/Format";
import PdfAndDocFileUpload from "@/reuseable/Input/Pdf&docx-fileupload";
import styles from "@/features/market-place/Index.module.css";
import SelectWithAmount from "@/reuseable/select/SelectWithAmount";
import { MultiSelect } from "@/reuseable/mult-select/customMultiselectWithId/Multiselect-withId";
import { useViewFinanciersByInvestmentmentVehicleQuery } from '@/service/admin/financier';



interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

interface viewAllProps {
    id: string;
    name: string;
    size?: number
  }

function StepOne() {
    const fundProductAvailableAmount = useAppSelector(state => (state.selectedLoan.fundProductAvailableAmount))
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [error, setError] = useState('');
    const [fundPageNumber, setFundPageNumber] = useState(0);
    const [hasNextfundPage, setHasNextfundPage] = useState(true);
    const [hasNextfinancierPage, setHasNextfinancierPage] = useState(true);
    const [investmentVehicleFund, setInvestmentVehicleFund] = useState<viewAllProps[]>([]);
    const [selectedFund, setSelectedFund] = useState<string | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [fundProductId,setFundProductId] = useState("")
    const [financierPageNumber, setFinancierPageNumber] = useState(0);
    const [financiers,setFinanciers] = useState<viewAllProps[]>([]);

    const [createLoanProduct, {isLoading}] = useCreateLoanProductMutation();
    const { data: investmentVehicleData, isFetching, isLoading: isFundLoading } =
        useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
            pageSize: 10,
            pageNumber: fundPageNumber,
            investmentVehicleStatus: "PUBLISHED",
        });
    
    const param = {
            pageNumber: financierPageNumber,
            pageSize: 10,
            investmentVehicleId: fundProductId
            }
    
   const {data,isLoading:isFinancierLoading,isFetching:isfetching} = useViewFinanciersByInvestmentmentVehicleQuery(param,{skip: !fundProductId})

    useEffect(() => {
        if (investmentVehicleData?.data) {
            setInvestmentVehicleFund((prev) => {
                if(fundPageNumber  === 0){
                    return [...investmentVehicleData.data.body].sort((a, b) => a.name.localeCompare(b.name));
                }
                const newFunds = investmentVehicleData?.data?.body.filter(
                    (newFund: viewAllProps) => !prev.some((prevItem) => prevItem.id === newFund.id)
                );
                return [...prev, ...newFunds].sort((a,b) => a.name.localeCompare(b.name));
            });
            setHasNextfundPage(investmentVehicleData.data.hasNextPage);
        }
    },[investmentVehicleData,fundPageNumber])


    useEffect(() => {
        if(data?.data){
            setFinanciers((prev) => {
                if(financierPageNumber === 0){
                    return [...data?.data?.body].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                }
                const newFinanciers = data?.data?.body.filter(
                    ( newFinancier: viewAllProps) => !prev.some((prevItem) => prevItem.id === newFinancier.id)
                );
                return [...prev, ...newFinanciers].sort((a,b) => (a.name || '').localeCompare(b.name || ''));
            });
            setHasNextfinancierPage(data.data.body)
        }
    },[data,financierPageNumber])

      
  const loadMoreFunds = () => {
    if (!isFetching && hasNextfundPage) {
        setFundPageNumber((prev) => prev + 1);
    }
  };

  const loadMoreFinancier = () => {
     if(!isfetching && hasNextfinancierPage){
        setFinancierPageNumber((prev) => prev + 1);
     }
  }



    const initialFormValue = {
        productName: "",
        investmentVehicleId: "",
        costOfFunds: "",
        tenor: "",
        loanProductSize: "",
        minimumRepaymentAmount: "",
        moratorium: "",
        interest: "",
        obligorLimit: "",
        loanProductMandate: "",
        loanProductTermsAndCondition: "",
        sponsor: []
    }


    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .trim()
            .required("Product name is required")
            .test(
                "valid-name",
                "Name must start with a letter and end with a letter/number",
                (value = "") => {
                    const regex = /^[a-zA-Z][a-zA-Z0-9\s-_]*[a-zA-Z0-9]$/;
                    return regex.test(value);
                }
            )

            .max(200, "Terms exceeds 100 characters"),
        investmentVehicleId: Yup.string()
            .trim()
            .required("Fund product is required"),
        costOfFunds: Yup.string()
            .trim()
            .transform((original) => original?.replace(/,/g, ""))
            .required("Cost of fund is required"),
        tenor: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Tenor must be greater than 0")
            .required("Tenor is required")
            .test("max-number", "Invalid tenor limit", value => !value || Number(value) <= 999),
        loanProductSize: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Product size must be greater than 0")
            .required("Loan product is required")
            .test("max-number", "Product size must be less than or equal to a quadrillion",
                value => !value || Number(value) <= 1e15)
            .test(
                `is-greater-than-fund`,
                `Amount can't be greater than fund product ${formatAmount(fundProductAvailableAmount)}`,
                function(value) {
                    if (!value || !fundProductAvailableAmount) return true;
                    return Number(value) <= Number(fundProductAvailableAmount);
                }
            ),
        obligorLimit: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Limit must be greater than 0")
            .required("Obligor limit is required")
            .test('is-less-than-loan-product-size', 'Obligor can\'t be greater than product size',
                function (value) {
                    const {loanProductSize} = this.parent;
                    return parseFloat(value) <= parseFloat(loanProductSize);
                }),
        minimumRepaymentAmount: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Amount must be greater than 0")
            .required("Amount is required")
            .test('is-greater-than-loan-product-size', 'Repayment amount can\'t be greater than product size',
                function (value) {
                    const {loanProductSize} = this.parent;
                    return parseFloat(value) <= parseFloat(loanProductSize);
                }),
        moratorium: Yup.string()
            .trim()
            .required("Amount is required")
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Moratorium must be greater than 0")
            .test("max-number", "Moratorium must be less than or equal to 24", value => !value || Number(value) <= 24)
            .test('is-less-than-loan-product-size', 'Moratorium can\'t be greater than tenor',
                function (value) {
                    const {tenor} = this.parent;
                    return parseFloat(value) <= parseFloat(tenor);
                })
            .test('is-not-equal-to-tenor', 'Moratorium can\'t be equal to tenor',
                function (value) {
                    const {tenor} = this.parent;
                    return parseFloat(value) !== parseFloat(tenor);
                }),
        interest: Yup.string()
            .trim()
            .required("Interest is required"),
        loanProductMandate: Yup.string()
            .trim()
            .required("Product mandate is required")
            .max(2500, "Terms exceeds 2500 characters")
            .test("not-empty", "Mandate is required.", (value = "") => {
                const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
                return sanitizedValue !== "";
            }),
        loanProductTermsAndCondition: Yup.string()
            .trim()
            .required("Loan product terms is required")
            .max(2500, "Terms exceeds 2500 characters")
            .test("not-empty", "Terms and conditions is required.", (value = "") => {
                const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
                return sanitizedValue !== "";
            }),
    });


    const toastPopUp = ToastPopUp({
        description: "Loan product Created successfully.",
        status: "success"
    });

    const networkPopUp = ToastPopUp({
        description: "No internet connection",
        status: "error",
    });

    const handleSubmit = async (values: typeof initialFormValue) => {
        console.log(values)
       

        // const formData = {
        //     name: values.productName,
        //     // sponsors: [values.productSponsor],
        //     investmentVehicleId: values.investmentVehicleId,
        //     costOfFund: Number(values.costOfFunds),
        //     tenor: Number(values.tenor),
        //     loanProductSize: Number(values.loanProductSize),
        //     minRepaymentAmount: Number(values.minimumRepaymentAmount),
        //     moratorium: Number(values.moratorium),
        //     interestRate: Number(values.interest),
        //     obligorLoanLimit: Number(values.obligorLimit),
        //     mandate: values.loanProductMandate,
        //     termsAndCondition: values.loanProductTermsAndCondition,
        // };


         try {
        //     const create = await createLoanProduct(formData).unwrap();
        //     if (create) {
        //         toastPopUp.showToast();
        //         // if (setIsOpen) {
        //         //     setIsOpen(false);
        //         // }
        // }
        } catch (err) {
            const error = err as ApiError;
            setError(error ? error?.data?.message : "Error occurred");
        }
    };


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

  return (
    <div className={`${inter.className} `}>
        <div  className='xl:px-36 grid grid-cols-1 gap-y-6 '>
        <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Create loan product</h1>
        <p className='text-[14px] font-normal'>Provide details of your loan product</p>
       </div>
       <div>
       <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {
                    ({errors, isValid, touched, setFieldValue, values}) => (
                        <Form className={`${inter.className}`}>
                            <div>
                            <div className="grid grid-cols-1 gap-y-4 md:max-h-[45vh] md:relative overflow-y-auto lg:px-16 relative  lg:right-16  "
                                  style={{
                                    overflowY: "auto",
                                    marginRight: "-10px",  
                                    paddingRight: "10px",  
                                  }}
                            >
                            <div>
                            <Label htmlFor="productName">Product name</Label>
                            <Field
                                id="productName"
                                data-testid="productName"
                                name="productName"
                                className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                                placeholder="Enter Product name"
                            />
                            {
                                errors.productName && touched.productName && (
                                    <ErrorMessage
                                        name="productName"
                                        id='productNameError'
                                        component="div"
                                        className="text-red-500 text-sm"
                                    />)
                            }
                        </div>
                        <div>
                         <Label htmlFor="FundProduct">Fund product</Label>
                         <SelectWithAmount
                                      selectedProgram={selectedFund}
                                      setSelectedProgram={setSelectedFund}
                                      isSelectOpen={isSelectOpen}
                                      setIsSelectOpen={setIsSelectOpen}
                                      selectOptions={investmentVehicleFund}
                                      setId={(value) => {
                                        setFieldValue("investmentVehicleId", value);
                                        setFundProductId(value)
                                        const selectedVehicle = investmentVehicleData?.data?.body?.find(
                                            (vehicle: { name: string }) => vehicle.name === value
                                        );
                                        if (selectedVehicle) {
                                            store.dispatch(setFundProductAvailableAmount(selectedVehicle.totalAvailableAmount))
                                        }
                                    }}
                                    placeholder='Select fund'
                                    isLoading={isFundLoading}
                                    //  onOpenChange={(open) => setIsFund(open)}
                                     infinityScroll={{
                                        hasMore:hasNextfundPage,
                                        loadMore: loadMoreFunds,
                                        loader: isFetching
                                     }}
                                     label=""
                                    /> 
                        </div>
                        <div className=" grid grid-cols-1 gap-y-3">
                        <Label htmlFor="FundProductSponsor">Fund product sponsor</Label>   
                         <MultiSelect
                            options={financiers}
                            onValueChange={(values) => setFieldValue("sponsor",values)}
                            placeholder="Select sponsor"
                            defaultValue={values.sponsor}
                            infinityScroll={{
                                hasMore:hasNextfinancierPage,
                                loadMore: loadMoreFinancier,
                                loader: isfetching
                             }}
                         />
                        </div>
                        <div className={``}>
                                        <Label htmlFor="loanProductSize"
                                               style={{display: 'inline-block', WebkitOverflowScrolling: 'touch'}}>Loan
                                            product size</Label>

                                        <div className={`flex flex-row gap-2`}>
                                            <div className={``}>
                                                <CurrencySelectInput readOnly={false}
                                                                     selectedcurrency={selectCurrency}
                                                                     setSelectedCurrency={setSelectCurrency}
                                                                     className={`h-12`}/>
                                            </div>

                                            <div className={`pt-3 w-full`}>
                                                <Field
                                                    id="loanProductSize"
                                                    data-testid="loanProductSize"
                                                    name="loanProductSize"
                                                    type={"number"}
                                                    className="w-full p-3 border h-12 rounded focus:outline-none text-sm "
                                                    placeholder="0.00"
                                                    component={CustomInputField}
                                                    onWheel={(e: {
                                                        currentTarget: { blur: () => string; };
                                                    }) => e.currentTarget.blur()}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        let rawValue = e.target.value.replace(/,/g, "");
                                                        if (/^(?!0$)\d*$/.test(rawValue)) {
                                                            rawValue = parseInt(rawValue).toString();
                                                            let formattedValue = Number(rawValue).toLocaleString();
                                                            formattedValue += ".00";
                                                            setFieldValue("loanProductSize", rawValue);
                                                            e.target.value = formattedValue;
                                                        }
                                                    }}
                                                />
                                              
                                                    {
                                                        errors.loanProductSize && touched.loanProductSize && (
                                                            <ErrorMessage
                                                                name="loanProductSize"
                                                                id='loanProductSizeId'
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />)
                                                    }
                                                
                                            </div>
                                        </div>
                                    </div>
                        
                            
                             <div className={`relative bottom-4`}>
                                        <Label htmlFor="minimumRepaymentAmount"
                                               style={{display: 'inline-block', WebkitOverflowScrolling: 'touch'}}>Minimum
                                            repayment amount</Label>

                                        <div className={`flex flex-row gap-2 w-full`}>
                                            <div className={`pt-1`}>
                                                <CurrencySelectInput readOnly={false}
                                                                     selectedcurrency={selectCurrency}
                                                                     setSelectedCurrency={setSelectCurrency}
                                                                     className={`h-12`}/>
                                            </div>

                                            <div className={`pt-4 w-full`}>
                                                <Field
                                                    id="minimumRepaymentAmount"
                                                    data-testid="minimumRepaymentAmount"
                                                    name="minimumRepaymentAmount"
                                                    type={"number"}
                                                    className="w-full p-3 border rounded focus:outline-none text-sm"
                                                    component={CustomInputField}
                                                    placeholder="0.00"
                                                    onWheel={(e: {
                                                        currentTarget: { blur: () => string; };
                                                    }) => e.currentTarget.blur()}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        let rawValue = e.target.value.replace(/,/g, "");
                                                        if (/^(?!0$)\d*$/.test(rawValue)) {
                                                            rawValue = parseInt(rawValue).toString();
                                                            let formattedValue = Number(rawValue).toLocaleString();
                                                            formattedValue += ".00";
                                                            setFieldValue("minimumRepaymentAmount", rawValue);
                                                            e.target.value = formattedValue;
                                                        }
                                                    }}
                                                />
                                                  {
                                            errors.minimumRepaymentAmount && touched.minimumRepaymentAmount && (
                                                <ErrorMessage
                                                    name="minimumRepaymentAmount"
                                                    id='minimumRepaymentAmount'
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />)
                                        }
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`relative bottom-9`}>
                                        <Label htmlFor="obligorLimit">Obligor limit</Label>

                                        <div className={`flex flex-row gap-2 w-full`}>
                                            <div className={`pt-1`}>
                                                <CurrencySelectInput readOnly={false}
                                                                     selectedcurrency={selectCurrency}
                                                                     setSelectedCurrency={setSelectCurrency}
                                                                     className={`h-12`}/>
                                            </div>

                                            <div className={`pt-4 w-full`}>
                                            <Field
                                                        id="obligorLimit"
                                                        data-testid="obligorLimit"
                                                        name="obligorLimit"
                                                        type={"number"}
                                                        className="w-full p-3 border mt-2 rounded focus:outline-none text-sm"
                                                        component={CustomInputField}
                                                        onWheel={(e: {
                                                            currentTarget: { blur: () => string; };
                                                        }) => e.currentTarget.blur()}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            let rawValue = e.target.value.replace(/,/g, "");
                                                            if (/^(?!0$)\d*$/.test(rawValue)) {
                                                                rawValue = parseInt(rawValue).toString();
                                                                let formattedValue = Number(rawValue).toLocaleString();
                                                                formattedValue += ".00";
                                                                setFieldValue("obligorLimit", rawValue);
                                                                e.target.value = formattedValue;
                                                            }
                                                        }}
                                                    />
                                                 {
                                                        errors.obligorLimit && touched.obligorLimit && (
                                                            <ErrorMessage
                                                                name="obligorLimit"
                                                                id='obligorLimitId'
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />)
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                 
                                 <div className="grid md:grid-cols-2 gap-4 items-center">
                                  <div className="grid grid-cols-2 gap-3 relative bottom-14">
                                  <div>
                                  <Label htmlFor="interest">Interest</Label> 
                                  <div className="border border-solid flex items-center rounded-md relative top-3 md:w-28 h-12">
                                  <div className={`pt-2 flex relative bottom-1  `}>
                                    <p className="bg-[#F9F9F9] flex items-center w-9 justify-center rounded-md ml-1">%</p>
                                        <Field
                                            id="interest"
                                            data-testid="interest"
                                            name="interest"
                                            type="number"
                                            className="w-16 p-3 border border-none rounded focus:outline-none  text-sm"
                                            placeholder="0"
                                            step="0.01"
                                            onWheel={(e: {
                                                currentTarget: { blur: () => string; };
                                            }) => e.currentTarget.blur()}
                                            onChange={(e: { target: { value: string; }; }) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value) && Number(value) <= 100) {
                                                    setFieldValue("interest", value);
                                                }
                                            }}
                                        /> 
                                 </div> 
                                 </div>
                                 <div className="mt-2">
                                 {
                                            errors.interest && touched.interest && (
                                                <ErrorMessage
                                                    name="interest"
                                                    id='interestId'
                                                    component="div"
                                                    className="text-red-500 text-sm "
                                                />)
                                        }
                                 </div>
                                </div> 

                                <div>
                                  <Label  htmlFor="costOfFunds">Cost of fund</Label> 
                                  <div className="border border-solid flex items-center rounded-md relative top-3 md:w-28 h-12">
                                  <div className={`pt-2 flex relative bottom-1  `}>
                                   <p className="bg-[#F9F9F9] flex items-center w-9 justify-center rounded-md ml-1">%</p>
                                        <Field
                                             id="costOfFunds"
                                            data-testid="costOfFunds"
                                             name="costOfFunds"
                                            type="number"
                                            className="w-16 p-3 border border-none rounded focus:outline-none  text-sm"
                                            placeholder="0"
                                            step="0.01"
                                            onWheel={(e: {
                                                currentTarget: { blur: () => string; };
                                            }) => e.currentTarget.blur()}
                                            onChange={(e: { target: { value: string; }; }) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d*$/.test(value) && Number(value) <= 100) {
                                                    setFieldValue("costOfFunds", value);
                                                }
                                            }}
                                        /> 
                                 </div> 
                                 </div>
                               
                                 <div className="mt-5">
                                 {
                                            errors.costOfFunds && touched.costOfFunds && (
                                                <ErrorMessage
                                                    name="costOfFunds"
                                                    id='interestId'
                                                    component="div"
                                                    className="text-red-500 text-sm "
                                                />)
                                        }
                                 </div>
                                </div>  
                                </div>  
                                  <div className={`w-full relative bottom-[58px]`}>
                                                                       <div>
                                                                           <Label htmlFor="tenor">Tenor (month)</Label>
                                                                       </div>
                                                                       <div>
                                                                           <Field
                                                                               id="tenor"
                                                                               data-testid="tenor"
                                                                               name="tenor"
                                                                               type={"number"}
                                                                               className="w-full h-12 p-3 border rounded focus:outline-none mt-3 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                               placeholder="0"
                                                                               onWheel={(e: {
                                                                                   currentTarget: { blur: () => string; };
                                                                               }) => e.currentTarget.blur()}
                                                                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                   let rawValue = e.target.value.replace(/,/g, "");
                                                                                   if (/^(?!0$)\d*$/.test(rawValue)) {
                                                                                       rawValue = parseInt(rawValue).toString();
                                                                                       let formattedValue = Number(rawValue).toLocaleString();
                                                                                       formattedValue += ".00";
                                                                                       setFieldValue("tenor", rawValue);
                                                                                       e.target.value = formattedValue;
                                                                                   }
                                                                               }}
                                                                           />
                                                                       </div>
                               
                                                                       <div className={`mb-[2%]`}>
                                                                           {
                                                                               errors.tenor && touched.tenor && (
                                                                                   <ErrorMessage
                                                                                       name="tenor"
                                                                                       id='tenorId'
                                                                                       component="div"
                                                                                       className="text-red-500 text-sm"
                                                                                   />
                                                                               )
                                                                           }
                                                                       </div>
                                                                   </div>
                                 </div>
                            </div> 
                            <div className={`flex justify-end pt-5 gap-3 pb-5`}>
                                    <Button
                                        className={`text-meedlBlue border border-meedlBlue h-12 w-32`}
                                        variant={"outline"}
                                        type={"reset"}
                            
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className={`h-12 w-32 ${!isValid ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                                        variant={"secondary"}
                                        type={"submit"}
                                        disabled={!isValid}
                                    >
                                        {isLoading ? (<Isloading/>) : (
                                            "Create"
                                        )}
                                    </Button>
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm mt-2 text-center">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </Form>
                    )
                }
            </Formik>
       </div>
        </div>
    </div>
  )
}

export default StepOne
