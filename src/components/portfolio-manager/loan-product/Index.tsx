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
import Select from "@/reuseable/select/ProgramSelect";


interface CreateLoanProductProps {
    setIsOpen?: (b: boolean) => void;
}

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

interface viewAllProps {
    id?: string;
    name: string;
    size?: number
  }


const CreateLoanProduct = ({setIsOpen}: CreateLoanProductProps) => {
    const fundProductAvailableAmount = useAppSelector(state => (state.selectedLoan.fundProductAvailableAmount))
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    // const [investmentVehicleObj, setInvestmentVehicleObj] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState('');
    const [fundPageNumber, setFundPageNumber] = useState(0);
    const [hasNextfundPage, setHasNextfundPage] = useState(true);
    const [investmentVehicleFund, setInvestmentVehicleFund] = useState<viewAllProps[]>([]);
    const [selectedFund, setSelectedFund] = useState<string | null>(null);
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [isFund, setIsFund] = useState(false)

    const [createLoanProduct, {isLoading}] = useCreateLoanProductMutation();
    const { data: investmentVehicleData, isFetching, isLoading: isFundLoading } =
        useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
            pageSize: 10,
            pageNumber: fundPageNumber,
            investmentVehicleStatus: "PUBLISHED",
        },{ skip: !isFund});

    // useEffect(() => {
    //     if (investmentVehicleData?.data?.body) {
    //         const obj: { [key: string]: string } = {};
    //         investmentVehicleData.data.body.forEach((vehicle: { id: string; name: string; totalAvailableAmount: number }) => {
    //             obj[vehicle.name] = vehicle.id;
    //         });
    //         setInvestmentVehicleObj(obj);
    //     }
    // }, [investmentVehicleData]);

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

      
  const loadMoreFunds = () => {
    if (!isFetching && hasNextfundPage) {
        setFundPageNumber((prev) => prev + 1);
    }
  };



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

    // const investmentVehicleNames = investmentVehicleData?.data?.body
    //     ?.map((vehicle: { name: string }) => vehicle.name)
    //     ?.sort((a, b) => a.localeCompare(b)) || [];

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
        if (!navigator.onLine) {
            networkPopUp.showToast();
            if (setIsOpen) {
                setIsOpen(false);
            }
            return;
        }

        const formData = {
            name: values.productName,
            // sponsors: [values.productSponsor],
            investmentVehicleId: values.investmentVehicleId,
            costOfFund: Number(values.costOfFunds),
            tenor: Number(values.tenor),
            loanProductSize: Number(values.loanProductSize),
            minRepaymentAmount: Number(values.minimumRepaymentAmount),
            moratorium: Number(values.moratorium),
            interestRate: Number(values.interest),
            obligorLoanLimit: Number(values.obligorLimit),
            mandate: values.loanProductMandate,
            termsAndCondition: values.loanProductTermsAndCondition,
        };


        try {
            const create = await createLoanProduct(formData).unwrap();
            if (create) {
                toastPopUp.showToast();
                if (setIsOpen) {
                    setIsOpen(false);
                }
            }
        } catch (err) {
            const error = err as ApiError;
            setError(error ? error?.data?.message : "Error occurred");
        }
    };

    const handleModalClose = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    }


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };


    return (
        <main>
            <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {
                    ({errors, isValid, touched, setFieldValue, values}) => (
                        <Form className={`${inter.className}`}>
                            <div className='grid grid-cols-1'
                                 style={{
                                     scrollbarWidth: 'thin',
                                     msOverflowStyle: 'none',
                                 }}
                            >
                                <div className={`${styles.container} space-y-3  lg:max-h-[56.5vh] md:max-h-[50vh] overflow-y-auto`}>
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

                                <div className={`pt-4`}>
                                    <Label htmlFor="FundProduct">Fund product</Label>
                                    {/* <CustomSelect
                                        triggerId='FundProductId'
                                        id="FundProduct"
                                        selectContent={investmentVehicleNames}
                                        value={values.investmentVehicleId}
                                        onChange={(value) => {
                                            setFieldValue("investmentVehicleId", value);
                                            // Find the selected vehicle in the data
                                            const selectedVehicle = investmentVehicleData?.data?.body?.find(
                                                (vehicle: { name: string }) => vehicle.name === value
                                            );
                                            if (selectedVehicle) {
                                                store.dispatch(setFundProductAvailableAmount(selectedVehicle.totalAvailableAmount))
                                            }
                                        }}
                                        name="FundProduct"
                                        placeHolder='Select fund'
                                    /> */}
                                    <Select
                                      selectedProgram={selectedFund}
                                      setSelectedProgram={setSelectedFund}
                                      isSelectOpen={isSelectOpen}
                                      setIsSelectOpen={setIsSelectOpen}
                                      selectOptions={investmentVehicleFund}
                                      setId={(value) => {
                                        setFieldValue("investmentVehicleId", value);
                                        const selectedVehicle = investmentVehicleData?.data?.body?.find(
                                            (vehicle: { name: string }) => vehicle.name === value
                                        );
                                        if (selectedVehicle) {
                                            store.dispatch(setFundProductAvailableAmount(selectedVehicle.totalAvailableAmount))
                                        }
                                    }}
                                    placeholder='Select fund'
                                    isLoading={isFundLoading}
                                     onOpenChange={(open) => setIsFund(open)}
                                     infinityScroll={{
                                        hasMore:hasNextfundPage,
                                        loadMore: loadMoreFunds,
                                        loader: isFetching
                                     }}
                                     label=""
                                    />
                                      
                                    {errors.investmentVehicleId && touched.investmentVehicleId && (
                                        <ErrorMessage
                                            name="FundProduct"
                                            id='FundProductError'
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    )}
                                   
                                </div>

                                <div className={`grid md:grid-cols-2 grid-col gap-y-0 gap-x-5`}>
                                    <div className={`flex flex-col w-full`}>
                                        <div>
                                            <Label htmlFor="costOfFunds">Cost of funds (%)</Label>
                                        </div>
                                        <Field
                                            id="costOfFunds"
                                            data-testid="costOfFunds"
                                            name="costOfFunds"
                                            type="number"
                                            className="w-full p-3 border rounded focus:outline-none mt-3 text-sm"
                                            placeholder="0.0"
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

                                        {
                                            errors.costOfFunds && touched.costOfFunds && (
                                                <ErrorMessage
                                                    name="costOfFunds"
                                                    id='costOfFundsError'
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            )
                                        }
                                    </div>

                                    <div className={`w-full md:pt-0 pt-4`}>
                                        <div>
                                            <Label htmlFor="tenor">Tenor (month)</Label>
                                        </div>
                                        <div>
                                            <Field
                                                id="tenor"
                                                data-testid="tenor"
                                                name="tenor"
                                                type={"number"}
                                                className="w-full p-3 border rounded focus:outline-none mt-3 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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


                                    <div className={`pt-5`}>
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
                                                <div className={`pb-5`}>
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
                                    </div>

                                    <div className={`md:pt-4`}>
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
                                            </div>
                                        </div>
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

                                    <div className={`p`}>
                                        <Label htmlFor="moratorium"
                                               style={{
                                                   display: 'inline-block',
                                                   WebkitOverflowScrolling: 'touch'
                                               }}>Moratorium (month)</Label>
                                        <div className={`pt-2`}>
                                            <Field
                                                id="moratorium"
                                                data-testid="moratorium"
                                                name="moratorium"
                                                type={"number"}
                                                className="w-full p-3 border rounded focus:outline-none mt-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                                        setFieldValue("moratorium", rawValue);
                                                        e.target.value = formattedValue;
                                                    }
                                                }}
                                            />
                                            {
                                                errors.moratorium && touched.moratorium && (
                                                    <ErrorMessage
                                                        name="moratorium"
                                                        id='moratorium'
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />)
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div className={`flex flex-row gap-2 `}>
                                            <div>
                                                <Label htmlFor="interest">Interest (%)</Label>
                                                <div className={`pt-2`}>
                                                    <Field
                                                        id="interest"
                                                        data-testid="interest"
                                                        name="interest"
                                                        type="number"
                                                        className="w-20 p-3 border rounded focus:outline-none mt-2 text-sm"
                                                        placeholder="0.0"
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
                                                    {
                                                        errors.interest && touched.interest && (
                                                            <ErrorMessage
                                                                name="interest"
                                                                id='interestId'
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />)
                                                    }
                                                </div>
                                            </div>

                                            <div className={`w-full`}>
                                                <Label htmlFor="obligorLimit">Obligor limit</Label>
                                                <div className={`w-full pt-3`}>
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
                                    </div>
                                </div>

                                <div className={`pt-4`}>
                                    <Label htmlFor="loanProductMandate">Loan product mandate</Label>
                                   <div className={`pt-3`}>
                                       <PdfAndDocFileUpload
                                           handleDrop={handleDrop}
                                           handleDragOver={handleDragOver}
                                           setUploadedDocUrl={(url: string | null) =>
                                               setFieldValue("loanProductMandate", url)
                                           }
                                           initialDocUrl={values.loanProductMandate}
                                           cloudinaryFolderName='loan-product-mandate'
                                       />
                                   </div>
                                    {errors.loanProductMandate && touched.loanProductMandate && (
                                        <ErrorMessage
                                            name="loanProductMandate"
                                            component="div"
                                            id="loanProductMandateError"
                                            className="text-red-500 text-sm"
                                        />
                                    )}
                                </div>
                                <div className="pt-4">
                                    <Label htmlFor="loanProductTermsAndConditionId" className={`pb-5`}>Loan product
                                        terms and
                                        conditions</Label>
                                    <div className={`pt-3`}>
                                        <PdfAndDocFileUpload
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                            setUploadedDocUrl={(url: string | null) =>
                                                setFieldValue("loanProductTermsAndCondition", url)
                                            }
                                            initialDocUrl={values.loanProductTermsAndCondition}
                                            cloudinaryFolderName='loan-product-terms-and-conditions'
                                        />
                                    </div>
                                    {errors.loanProductTermsAndCondition && touched.loanProductTermsAndCondition && (
                                        <ErrorMessage
                                            name="loanProductTermsAndCondition"
                                            component="div"
                                            id="loanProductTermsAndConditionError"
                                            className="text-red-500 text-sm"
                                        />
                                    )}
                                </div>
                                </div>

                                <div className={`flex justify-end pt-5 gap-3 pb-5`}>
                                    <Button
                                        className={`text-meedlBlue border border-meedlBlue h-12 w-32`}
                                        variant={"outline"}
                                        type={"reset"}
                                        onClick={handleModalClose}
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

        </main>
    );
}

export default CreateLoanProduct;