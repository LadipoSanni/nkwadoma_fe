import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import React, {useState} from "react";
import CustomSelect from "@/reuseable/Input/Custom-select";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {useCreateLoanProductMutation} from "@/service/admin/loan_product";
import Isloading from "@/reuseable/display/Isloading";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";
import {useGetAllInvestmentmentVehicleQuery} from "@/service/admin/fund_query";
import 'react-quill-new/dist/quill.snow.css';
import CustomInputField from "@/reuseable/Input/CustomNumberFormat"
import {validatePositiveNumber} from "@/utils/Format";

interface CreateLoanProductProps {
    setIsOpen?: (b: boolean) => void;
}

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}


const CreateLoanProduct = ({setIsOpen}: CreateLoanProductProps) => {
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [error, setError] = useState('');
    const [mandateError, setMandateError] = useState('');
    const [loanProductTermsAndConditionError, setLoanProductTermsAndConditionError] = useState('');
    // const [step, setStep] = useState(1);
    const [createLoanProduct, {isLoading}] = useCreateLoanProductMutation();
    const dataElement = {
        pageNumber: 0,
        pageSize: 200
    }
    // const { data: investmentVehicleData } = useGetAllInvestmentmentVehicleQuery(dataElement)
    // console.log(investmentVehicleData?.name, "VEHICLES")
    const {data: investmentVehicleData} = useGetAllInvestmentmentVehicleQuery(dataElement);

    // if (investmentVehicleData && investmentVehicleData.data) {
    //     investmentVehicleData.data.forEach(vehicle => {
    //         console.log(vehicle.name, "VEHICLES");
    //     });
    // } else {
    //     console.log("No data available");
    // }


    const initialFormValue = {
        productName: "",
        // productSponsor: "",
        investmentVehicleId: "",
        costOfFunds: "",
        tenor: "",
        // tenorDuration: "",
        loanProductSize: "",
        minimumRepaymentAmount: "",
        moratorium: "",
        interest: "",
        obligorLimit: "",
        loanProductMandate: "",
        loanProductTermsAndCondition: "",
        bankPartner: "",
        loanInsuranceProvider: "",
        loanDisbursementTerms: "",
        // investmentVehicleId: "",
        // loanProductStatus: "ACTIVE"
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .trim()
            .required("Product Name is required")
            .test('valid-name', 'Name cannot be only numbers or special characters.', (value= '') => {
                const hasLetter = /[a-zA-Z]/.test(value);
                const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(value);
                return hasLetter && !isOnlyNumbersOrSpecials; }),
        // productSponsor: Yup.string()
        //     .trim()
        //     .required("Product sponsor is required"),
        investmentVehicleId: Yup.string()
            .trim()
            .required("Fund product is required"),
        costOfFunds: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Cost of fund must be greater than 0 ")
            .transform((original) => original?.replace(/,/g, ""))
            .required("Cost of fund is required"),
        // tenorDuration: Yup.string()
        //     .trim()
        //     .required("Duration can not be empty"),
        tenor: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Tenor must be greater than 0")
            .required("Tenor is required"),
        // .test("max-number", "Tenor must be less than or equal to 24", value => !value || Number(value) <= 24),
        loanProductSize: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Product size must be greater than 0")
            .required("Loan product is required"),
        // .test('is-greater-than-obligor-limit', 'Loan Product Size must be greater than or equal to Obligor Limit',
        //     function (value) {
        //         const {obligorLimit} = this.parent;
        //         return parseFloat(value) >= parseFloat(obligorLimit);
        //     }),
        obligorLimit: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Limit must be greater than 0")
            .required("Obligor limit is required")
            .test('is-less-than-loan-product-size', 'Obligor cant be greater than product size',
                function (value) {
                    const {loanProductSize} = this.parent;
                    return parseFloat(value) <= parseFloat(loanProductSize);
                }),
        minimumRepaymentAmount: Yup.string()
            .trim()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Amount must be greater than 0")
            .required("Amount is required")
            .test('is-greater-than-loan-product-size', 'Repayment amount cant be greater than product size',
                function (value) {
                    const {loanProductSize} = this.parent;
                    return parseFloat(value) <= parseFloat(loanProductSize);
                }),
        moratorium: Yup.string()
            .trim()
            .required("Amount is required")
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Moratorium must be greater than 0")
            .test("max-number", "Moratorium must be less than or equal to 24", value => !value || Number(value) <= 24),
        interest: Yup.string()
            .trim()
            .required("Interest is required"),
        loanProductMandate: Yup.string()
            .trim()
            .required("Product mandate is required")
            .max(2500, "Terms exceeds 2500 characters")
            .test("no-html-tags", "Product mandate terms contains HTML tags", value => !value || !/<\/?[a-z][\s\S]*>/i.test(value)),
        loanProductTermsAndCondition: Yup.string()
            .trim()
            .required("Loan product terms is required")
            .max(2500, "Terms exceeds 2500 characters")
            .test("no-html-tags", "Loan product terms contains HTML tags", value => !value || !/<\/?[a-z][\s\S]*>/i.test(value)),
        loanDisbursementTerms: Yup.string()
            .trim()
            .max(2500, "Terms exceeds 2500 characters")
            .test("no-html-tags", "Loan disbursement terms contains HTML tags", value => !value || !/<\/?[a-z][\s\S]*>/i.test(value))
    });

    interface Vehicle {
        id: string;
        name: string;
    }

    // const investmentVehicleNames = investmentVehicleData?.data?.map((vehicle: Vehicle, index: number) => ({
    //     id: vehicle.id,
    //     name: vehicle.name,
    //     key: `${vehicle.id}-${index}`
    // }));

    // const investmentVehicleNames = investmentVehicleData?.data?.map((vehicle: Vehicle) => ({
    //     id: vehicle.id,
    //     name: vehicle.name,
    //     key: vehicle.id
    // }))
    const investmentVehicleNames = investmentVehicleData?.data?.map((vehicle: Vehicle) => vehicle.name) || [];
    // const bankPartner = ["Patner 1", "Partner 2",];
    const maxChars = 2500;

    const validateLength = (value: string) => {
        const maxChars = 2500;
        const regex = new RegExp(`^.{0,${maxChars}}$`);
        return regex.test(value);
    };

    const toastPopUp = ToastPopUp({
        description: "Loan product Created successfully.",
        status: "success"
    });

    const networkPopUp = ToastPopUp({
        description: "No internet connection",
        status: "error",
    });

    const fundProductId = "1fd80e57-de2e-4cea-8ad9-c57ad13245ab"
    // const fundProductId = ""

    const handleSubmit = async (values: typeof initialFormValue) => {
        if (!navigator.onLine) {
            networkPopUp.showToast();
            if (setIsOpen) {
                setIsOpen(false);
            }
            return;
        }
        // const selectedVehicle = investmentVehicleNames.find(vehicle => vehicle.name === values.investmentVehicleId);

        const formData = {
            name: values.productName,
            // sponsors: [values.productSponsor],
            investmentVehicleId: fundProductId,
            costOfFund: Number(values.costOfFunds),
            tenor: Number(values.tenor),
            // tenorDuration: values.tenorDuration,
            loanProductSize: Number(values.loanProductSize),
            minRepaymentAmount: Number(values.minimumRepaymentAmount),
            moratorium: Number(values.moratorium),
            interestRate: Number(values.interest),
            obligorLoanLimit: Number(values.obligorLimit),
            mandate: values.loanProductMandate,
            termsAndCondition: values.loanProductTermsAndCondition,
            bankPartner: values.bankPartner,
            loanInsuranceProvider: values.loanInsuranceProvider,
            disbursementTerms: values.loanDisbursementTerms,
            // investmentVehicleId: fundProductId,
            // loanProductStatus: values.loanProductStatus,
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

    // const handleBack = () => {
    //     setStep(1);
    // }
    //
    // const handleContinueButton = () => {
    //     setStep(2);
    // };
    const handleModalClose = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    }


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
                            <div className='grid grid-cols-1 md:max-h-[580px] overflow-y-auto'
                                 style={{
                                     scrollbarWidth: 'none',
                                     msOverflowStyle: 'none',
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
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        //     const value = e.target.value;
                                        //     const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                                        //     setFieldValue("productName", formattedValue);
                                        // }}
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
                                    <CustomSelect
                                        triggerId='FundProductId'
                                        id="FundProduct"
                                        selectContent={investmentVehicleNames}
                                        value={values.investmentVehicleId}
                                        onChange={(value) => setFieldValue("investmentVehicleId", value)}
                                        name="FundProduct"
                                        placeHolder='Select fund'
                                        isItemDisabled={(item) => item !== 'tade'}
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
                                    {/*<div>*/}
                                    {/*    <Label htmlFor="productSponsor">Loan product sponsor</Label>*/}
                                    {/*    <LoanProductCustomSelect triggerId='productSponsorId'*/}
                                    {/*                             id="productSponsor"*/}
                                    {/*                             selectContent={productSponsors}*/}
                                    {/*                             value={values.productSponsor}*/}
                                    {/*                             onChange={(value) => setFieldValue("productSponsor", value)}*/}
                                    {/*                             name="productSponsor"*/}
                                    {/*                             placeHolder='Select a sponsor'/>*/}
                                    {/*    {*/}
                                    {/*        errors.productSponsor && touched.productSponsor && (*/}
                                    {/*            <ErrorMessage*/}
                                    {/*                name="productSponsor"*/}
                                    {/*                id='productSponsorError'*/}
                                    {/*                component="div"*/}
                                    {/*                className="text-red-500 text-sm"*/}
                                    {/*            />)*/}
                                    {/*    }*/}
                                    {/*</div>*/}

                                    <div className={`flex flex-col w-full`}>
                                        <div>
                                            <Label htmlFor="costOfFunds">Cost of funds (%)</Label>
                                        </div>

                                        <Field
                                            id="costOfFunds"
                                            data-testid="costOfFunds"
                                            name="costOfFunds"
                                            type={"number"}
                                            className="w-full p-3 border rounded focus:outline-none mt-3 text-sm"
                                            placeholder="0"
                                            onChange={validatePositiveNumber(`costOfFunds`, setFieldValue, 100, 1)}
                                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            //     const rawValue = e.target.value.replace(/,/g, "");
                                            //     if (/^(?!0$)\d*$/.test(rawValue)) {
                                            //         let formattedValue = Number(rawValue).toLocaleString();
                                            //         formattedValue += ".00";
                                            //         setFieldValue("costOfFunds", rawValue)
                                            //         e.target.value = formattedValue;
                                            //     }
                                            // }}
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

                                    <div className={`w-full`}>
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

                                    <div className={`pt-4`}>
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

                                            <div className={`md:pt-4 w-full`}>
                                                <Field
                                                    id="minimumRepaymentAmount"
                                                    data-testid="minimumRepaymentAmount"
                                                    name="minimumRepaymentAmount"
                                                    type={"number"}
                                                    className="w-full p-3 border rounded focus:outline-none text-sm"
                                                    component={CustomInputField}
                                                    placeholder="0.00"
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

                                    <div>
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
                                        <div className={`flex flex-row gap-2 pt-2`}>
                                            <div>
                                                <Label htmlFor="interest">Interest (%)</Label>
                                                <div>
                                                    <Field
                                                        id="interest"
                                                        data-testid="interest"
                                                        name="interest"
                                                        type={"number"}
                                                        className="w-20 p-3 border rounded focus:outline-none mt-2 text-sm"
                                                        placeholder="0"
                                                        onChange={validatePositiveNumber(`interest`, setFieldValue, 100, 1)}
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
                                                    {
                                                        errors.interest && touched.interest && (
                                                            <ErrorMessage
                                                                name="interest"
                                                                id='interest'
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />)
                                                    }
                                                </div>
                                            </div>

                                            <div className={`w-full`}>
                                                <Label htmlFor="obligorLimit">Obligor limit</Label>
                                                <div className={`w-full pt-1`}>
                                                    <Field
                                                        id="obligorLimit"
                                                        data-testid="obligorLimit"
                                                        name="obligorLimit"
                                                        type={"number"}
                                                        className="w-full p-3 border rounded focus:outline-none text-sm"
                                                        component={CustomInputField}
                                                        placeholder="0"
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
                                    <Field
                                        as="textarea"
                                        id="loanProductMandateId"
                                        name="loanProductMandate"
                                        className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"
                                        placeholder="Enter description"
                                        rows={4}
                                        maxLength={maxChars}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            const value = e.target.value;
                                            if (validateLength(value)) {
                                                setFieldValue("loanProductMandate", value);
                                                setMandateError('');
                                            } else {
                                                setMandateError('Mandate must be 2500 characters or less');
                                            }
                                        }}

                                        onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
                                            const paste = e.clipboardData.getData('text');
                                            if (paste.length + values.loanProductMandate.length > maxChars) {
                                                e.preventDefault();
                                                setMandateError('Mandate must be 2500 characters or less');
                                            } else {
                                                setMandateError('');
                                            }
                                        }}
                                    />
                                    {
                                        errors.loanProductMandate && touched.loanProductMandate && (
                                            <ErrorMessage
                                                name="loanProductMandate"
                                                component="div"
                                                id='loanProductMandateError'
                                                className="text-red-500 text-sm"
                                            />
                                        )
                                    }
                                    {mandateError && (
                                        <div className="text-red-500 text-sm">
                                            {mandateError}
                                        </div>
                                    )}
                                </div>

                                <div className={`pt-4`}>
                                    <Label htmlFor="loanProductTermsAndCondition">Loan product terms and
                                        condition</Label>
                                    <Field
                                        as="textarea"
                                        id="loanProductTermsAndConditionId"
                                        name="loanProductTermsAndCondition"
                                        className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"
                                        placeholder="Enter terms and condition"
                                        rows={4}
                                        maxLength={maxChars}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            const value = e.target.value;
                                            if (validateLength(value)) {
                                                setFieldValue("loanProductTermsAndCondition", value);
                                                setLoanProductTermsAndConditionError('');
                                            } else {
                                                setLoanProductTermsAndConditionError('Product condition must be 2500 characters or less');
                                            }
                                        }}
                                        onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
                                            const paste = e.clipboardData.getData('text');
                                            if (paste.length + values.loanProductTermsAndCondition.length > maxChars) {
                                                e.preventDefault();
                                                setLoanProductTermsAndConditionError('Product condition must be 2500 characters or less');
                                            } else {
                                                setLoanProductTermsAndConditionError('');
                                            }
                                        }}
                                    />
                                    {
                                        errors.loanProductTermsAndCondition && touched.loanProductTermsAndCondition && (
                                            <ErrorMessage
                                                name="loanProductTermsAndCondition"
                                                component="div"
                                                id='loanProductTermsAndConditionError'
                                                className="text-red-500 text-sm"
                                            />
                                        )
                                    }
                                    {loanProductTermsAndConditionError && (
                                        <div className="text-red-500 text-sm">
                                            {loanProductTermsAndConditionError}
                                        </div>
                                    )}
                                </div>
                                {/*<div className="pt-4">*/}
                                {/*    <Label htmlFor="loanProductTermsAndConditionId" className={`pb-5`}>Loan product*/}
                                {/*        terms and*/}
                                {/*        condition</Label>*/}
                                {/*    <ReactQuill*/}
                                {/*        theme="snow"*/}
                                {/*        value={values.loanProductTermsAndCondition}*/}
                                {/*        onChange={(content) => {*/}
                                {/*            if (content.length <= maxChars) {*/}
                                {/*                setFieldValue("loanProductTermsAndCondition", content);*/}
                                {/*                setError('');*/}
                                {/*            } else {*/}
                                {/*                setError('Product condition must be 2500 characters or less');*/}
                                {/*            }*/}
                                {/*        }}*/}
                                {/*        placeholder="Enter terms and condition"*/}
                                {/*        className={`font-inter text-sm font-normal leading-[22px] pt-2 rounded-md`}*/}
                                {/*        style={{height: '100px'}}*/}
                                {/*    />*/}
                                {/*    {*/}
                                {/*        errors.loanProductTermsAndCondition && touched.loanProductTermsAndCondition && (*/}
                                {/*            <ErrorMessage*/}
                                {/*                name="loanProductTermsAndCondition"*/}
                                {/*                component="div"*/}
                                {/*                id="loanProductTermsAndConditionError"*/}
                                {/*                className="text-red-500 text-sm"*/}
                                {/*            />*/}
                                {/*        )*/}
                                {/*    }*/}
                                {/*    {error && <div className="text-red-500 text-sm">{error}</div>}*/}
                                {/*</div>*/}

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
                                        className={`h-12 w-32 ${!isValid ? 'bg-neutral650 text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                                        variant={"secondary"}
                                        type={"submit"}
                                        disabled={!isValid}
                                    >
                                        {isLoading ? (<Isloading/>) : (
                                            "Create"
                                        )}
                                    </Button>
                                    {/*<Button*/}
                                    {/*    className={`h-12 w-32 ${!isValid? 'bg-neutral650 text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'*/}
                                    {/*    }`}*/}
                                    {/*    variant="secondary"*/}
                                    {/*    onClick={handleContinueButton}*/}
                                    {/*    disabled={!isValid}*/}
                                    {/*>*/}
                                    {/*    Continue*/}
                                    {/*</Button>*/}
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm mt-2 text-center">
                                        {error}
                                    </div>
                                )}

                                {/*{*/}
                                {/*    <div*/}
                                {/*        className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>*/}
                                {/*}*/}
                            </div>
                            {/*)}*/}

                            {/*{step === 2 && (*/}
                            {/*    <div id={"step2Div"}>*/}
                            {/*        <div>*/}
                            {/*            <Label htmlFor="bankPartner">Bank partner(optional)</Label>*/}
                            {/*            <div>*/}
                            {/*                <CustomSelect triggerId='bankPartner'*/}
                            {/*                              id="bankPartner"*/}
                            {/*                              selectContent={bankPartner}*/}
                            {/*                              value={values.bankPartner}*/}
                            {/*                              onChange={(value) => setFieldValue("bankPartner", value)}*/}
                            {/*                              name="bankPartner"*/}
                            {/*                              placeHolder='Select partner'*/}
                            {/*                />*/}
                            {/*                {*/}
                            {/*                    errors.bankPartner && touched.bankPartner && (*/}
                            {/*                        <ErrorMessage*/}
                            {/*                            name="bankPartner"*/}
                            {/*                            id='bankPartner'*/}
                            {/*                            component="div"*/}
                            {/*                            className="text-red-500 text-sm"*/}
                            {/*                        />)*/}
                            {/*                }*/}
                            {/*            </div>*/}
                            {/*        </div>*/}

                            {/*        <div>*/}
                            {/*            <Label htmlFor="loanDisbursementTerms">Select loan insurance provider (optional)</Label>*/}
                            {/*            <div>*/}

                            {/*            </div>*/}
                            {/*        </div>*/}


                            {/*        <div className={`pt-4`}>*/}
                            {/*            <Label htmlFor="loanDisbursementTerms">Loan disbursement terms(optional)</Label>*/}
                            {/*            <Field*/}
                            {/*                as="textarea"*/}
                            {/*                id="loanDisbursementTermsId"*/}
                            {/*                name="loanDisbursementTerms"*/}
                            {/*                className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"*/}
                            {/*                placeholder="Enter disbursement terms"*/}
                            {/*                rows={4}*/}
                            {/*                maxLength={maxChars}*/}
                            {/*                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {*/}
                            {/*                    const value = e.target.value; if (value.length <= maxChars) {*/}
                            {/*                        setFieldValue("loanDisbursementTerms", value); } }}*/}
                            {/*                onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {*/}
                            {/*                    const paste = e.clipboardData.getData('text');*/}
                            {/*                    if (paste.length + values.loanDisbursementTerms.length > maxChars) {*/}
                            {/*                        e.preventDefault();*/}
                            {/*                        setError('Loan terms must be 2500 characters or less');*/}
                            {/*                    } }}*/}
                            {/*            />*/}
                            {/*            { errors.loanDisbursementTerms && touched.loanDisbursementTerms && (*/}
                            {/*                <ErrorMessage*/}
                            {/*                    name="loanDisbursementTerms"*/}
                            {/*                    component="div"*/}
                            {/*                    id='loanDisbursementTerms'*/}
                            {/*                    className="text-red-500 text-sm"*/}
                            {/*                /> ) }*/}
                            {/*            { error && (*/}
                            {/*                <div className="text-red-500 text-sm"> {error} </div>*/}
                            {/*            )}*/}
                            {/*        </div>*/}

                            {/*        <div className={`flex justify-end py-5 gap-3`}>*/}
                            {/*            <Button*/}
                            {/*                className={`text-meedlBlue border border-meedlBlue h-12 w-32`}*/}
                            {/*                variant={"outline"}*/}
                            {/*                onClick={handleBack}*/}
                            {/*            >*/}
                            {/*                Back*/}
                            {/*            </Button>*/}
                            {/*            <Button*/}
                            {/*                className={`bg-meedlBlue text-meedlWhite h-12 w-32`}*/}
                            {/*                variant={"secondary"}*/}
                            {/*                type={"submit"}*/}
                            {/*            >*/}
                            {/*                Create*/}
                            {/*                /!*{isLoading ? ( <Isloading/> ) : (*!/*/}
                            {/*                /!*    "Create"*!/*/}
                            {/*                /!*)}*!/*/}

                            {/*            </Button>*/}
                            {/*        </div>*/}
                            {/*        {*/}
                            {/*            <div*/}
                            {/*                className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>*/}
                            {/*        }*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </Form>
                    )
                }
            </Formik>

        </main>
    );
}

export default CreateLoanProduct;