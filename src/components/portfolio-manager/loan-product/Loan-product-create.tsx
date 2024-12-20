import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import React, {useState} from "react";
import CustomSelect from "@/reuseable/Input/Custom-select";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";


interface CreateLoanProductProps {
    setIsOpen?: (b: boolean) => void;
}

export const LoanProductCreate = ({setIsOpen}: CreateLoanProductProps) => {
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [error, setError] =  useState('');
    const [step, setStep] = useState(1);

    const initialFormValue = {
        productName: "",
        productSponsor: "",
        FundProduct: "",
        costOfFunds: "",
        tenor: "",
        tenorDuration: "",
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
    }

    const validationSchema = Yup.object().shape({
        productName: Yup.string()
            .trim()
            .required("Product Name is required")
            .matches(/^[^0-9]*$/, 'Numbers are not allowed'),
        productSponsor: Yup.string()
            .trim()
            .required("Product sponsor is required"),
        FundProduct: Yup.string()
            .trim()
            .required("Fund product is required"),
        costOfFunds: Yup.string()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Cost of fund must be greater than 0 and must be numeric")
            .trim()
            .required("Cost of fund is required"),
        tenorDuration: Yup.string()
            .trim()
            .required("Duration can not be empty"),
        tenor: Yup.string()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Tenor must be greater than 0 and must be numeric")
            .trim()
            .required("Tenor is required"),
        loanProductSize: Yup.string()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Product size must be greater than 0 and must be numeric")
            .trim()
            .required("loan product is required"),
        minimumRepaymentAmount: Yup.string()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Amount must be greater than 0 and must be numeric")
            .trim()
            .required("Amount is required"),
        moratorium: Yup.string()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "Moratorium must be greater than 0 and must be numeric")
            .trim()
            .required("Amount is required"),
        interest: Yup.string()
            .trim()
            .required("Interest is required"),
        obligorLimit: Yup.string()
            .matches(/^(?!0$)([1-9]\d*|0\.\d*[1-9]\d*)$/, "limit must be greater than 0 and must be numeric")
            .trim()
            .required("Obligor limit is required"),
        loanProductMandate: Yup.string()
            .trim()
            .required("Product mandate is required")
            .max(2500, "Terms exceeds 2500 characters")
            .matches(/^[a-zA-Z0-9\s.,'-]+$/, "Product mandate terms contains invalid characters")
            .test( "no-html-tags", "Product mandate terms contains HTML tags", value => !value || !/<\/?[a-z][\s\S]*>/i.test(value) ),
        loanProductTermsAndCondition: Yup.string()
            .trim()
            .max(2500, "Terms exceeds 2500 characters")
            .matches(/^[a-zA-Z0-9\s.,'-]+$/, "Loan product terms contains invalid characters")
            .test( "no-html-tags", "Loan product terms contains HTML tags", value => !value || !/<\/?[a-z][\s\S]*>/i.test(value) ),
        loanDisbursementTerms: Yup.string()
            .trim()
            .max(2500, "Terms exceeds 2500 characters")
            .matches(/^[a-zA-Z0-9\s.,'-]+$/, "Loan disbursement terms contains invalid characters")
            .test( "no-html-tags", "Loan disbursement terms contains HTML tags", value => !value || !/<\/?[a-z][\s\S]*>/i.test(value) )
    });


    const productSponsor = ["Zenith", "Apple"];
    const funds = ["Equity Fund", "Debt Fund",];
    const durations = ["Day", "Month", "Year",];
    const bankPartner = ["Patner 1", "Partner 2",];
    const maxChars = 2500;

    const handleSubmit = () => {

    }


    const handleBack = () => {
        setStep(1);
    }

    const handleContinueButton = () => {
        setStep(2);
    };
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
                            {step === 1 && (
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
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const value = e.target.value;
                                                const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                                                setFieldValue("productName", formattedValue);
                                            }}
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

                                    <div className={`grid md:grid-cols-2 grid-col gap-y-0 gap-x-5 pt-4`}>
                                        <div>
                                            <Label htmlFor="productSponsor">Product Sponsor</Label>
                                            <CustomSelect triggerId='productSponsorId'
                                                          id="productSponsor"
                                                          selectContent={productSponsor}
                                                          value={values.productSponsor}
                                                          onChange={(value) => setFieldValue("productSponsor", value)}
                                                          name="productSponsor"
                                                          placeHolder='Select a sponsor'/>
                                            {
                                                errors.productSponsor && touched.productSponsor && (
                                                    <ErrorMessage
                                                        name="productSponsor"
                                                        id='productSponsorError'
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />)
                                            }
                                        </div>

                                        <div>
                                            <Label htmlFor="FundProduct">Fund Product</Label>
                                            <CustomSelect triggerId='FundProductId'
                                                          id="FundProduct"
                                                          selectContent={funds}
                                                          value={values.FundProduct}
                                                          onChange={(value) => setFieldValue("FundProduct", value)}
                                                          name="FundProduct"
                                                          placeHolder='Select fund'/>
                                            {
                                                errors.FundProduct && touched.FundProduct && (
                                                    <ErrorMessage
                                                        name="FundProduct"
                                                        id='FundProductError'
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />)
                                            }
                                        </div>

                                        <div>
                                            <Label htmlFor="costOfFunds">Cost of funds (%)</Label>
                                            <Field
                                                id="costOfFunds"
                                                data-testid="costOfFunds"
                                                name="costOfFunds"
                                                type={"number"}
                                                className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                                                placeholder="0"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    let rawValue = e.target.value.replace(/,/g, "");
                                                    if (/^(?!0$)\d*$/.test(rawValue)) {
                                                        rawValue = parseInt(rawValue).toString();
                                                        let formattedValue = Number(rawValue).toLocaleString();
                                                        formattedValue += ".00";
                                                        setFieldValue("costOfFunds", rawValue);
                                                        e.target.value = formattedValue;
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
                                                    />)
                                            }
                                        </div>

                                        <div className={`flex flex-row gap-2`}>
                                            <div>
                                                <Label htmlFor="tenor">Tenor</Label>
                                                <div>
                                                    <Field
                                                        id="tenor"
                                                        data-testid="tenor"
                                                        name="tenor"
                                                        type={"number"}
                                                        className="w-20 p-3 border rounded focus:outline-none mt-2 text-sm"
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
                                                    {
                                                        errors.tenor && touched.tenor && (
                                                            <ErrorMessage
                                                                name="tenor"
                                                                id='tenorId'
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />)
                                                    }
                                                </div>

                                            </div>


                                            <div className={`w-full`}>
                                                <Label htmlFor="tenorDuration">Duration</Label>
                                                <div>
                                                    <CustomSelect triggerId='tenorDuration'
                                                                  id="tenorDuration"
                                                                  selectContent={durations}
                                                                  value={values.tenorDuration}
                                                                  onChange={(value) => setFieldValue("tenorDuration", value)}
                                                                  name="tenorDuration"
                                                                  placeHolder='Select duration'
                                                                  isItemDisabled={(item) => item !== "Month"}
                                                    />
                                                    {
                                                        errors.tenorDuration && touched.tenorDuration && (
                                                            <ErrorMessage
                                                                name="tenorDuration"
                                                                id='tenorDuration'
                                                                component="div"
                                                                className="text-red-500 text-sm"
                                                            />)
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="loanProductSize"
                                                   style={{display: 'inline-block', WebkitOverflowScrolling: 'touch'}}>Loan
                                                product size</Label>

                                            <div className={`flex flex-row gap-2`}>
                                                <div className={`pt-1`}>
                                                    <CurrencySelectInput readOnly={false}
                                                                         selectedcurrency={selectCurrency}
                                                                         setSelectedCurrency={setSelectCurrency}
                                                                         className={`h-12`}/>
                                                </div>

                                                <div className={`pt-2`}>
                                                    <Field
                                                        id="loanProductSize"
                                                        data-testid="loanProductSize"
                                                        name="loanProductSize"
                                                        type={"number"}
                                                        className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                                                        placeholder="0.00"
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

                                        <div>
                                            <Label htmlFor="minimumRepaymentAmount"
                                                   style={{display: 'inline-block', WebkitOverflowScrolling: 'touch'}}>Minimum
                                                repayment amount</Label>

                                            <div className={`flex flex-row gap-2`}>
                                                <div className={`pt-1`}>
                                                    <CurrencySelectInput readOnly={false}
                                                                         selectedcurrency={selectCurrency}
                                                                         setSelectedCurrency={setSelectCurrency}
                                                                         className={`h-12`}/>
                                                </div>

                                                <div className={`pt-2`}>
                                                    <Field
                                                        id="minimumRepaymentAmount"
                                                        data-testid="minimumRepaymentAmount"
                                                        name="minimumRepaymentAmount"
                                                        type={"number"}
                                                        className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
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

                                        <div>
                                            <Label htmlFor="moratorium"
                                                   style={{
                                                       display: 'inline-block',
                                                       WebkitOverflowScrolling: 'touch'
                                                   }}>Moratorium(month)</Label>
                                            <div className={`pt-2`}>
                                                <Field
                                                    id="moratorium"
                                                    data-testid="moratorium"
                                                    name="moratorium"
                                                    type={"number"}
                                                    className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
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
                                                    <Label htmlFor="interest">Interest(%)</Label>
                                                    <div>
                                                        <Field
                                                            id="interest"
                                                            data-testid="interest"
                                                            name="interest"
                                                            type={"number"}
                                                            className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                                                            placeholder="0"
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

                                                <div>
                                                    <Label htmlFor="obligorLimit">Obligor limit</Label>
                                                    <div>
                                                        <Field
                                                            id="obligorLimit"
                                                            data-testid="obligorLimit"
                                                            name="obligorLimit"
                                                            type={"number"}
                                                            className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
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
                                        <Label htmlFor="loanProductMandate">LoanProduct mandate</Label>
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
                                                if (value.length <= maxChars) {
                                                    setFieldValue("loanProductMandate", value);
                                                }
                                            }}
                                            onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
                                                const paste = e.clipboardData.getData('text');
                                                if (paste.length + values.loanProductMandate.length > maxChars) {
                                                    e.preventDefault();
                                                    setError('Program description must be 2500 characters or less');
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
                                                if (value.length <= maxChars) {
                                                    setFieldValue("loanProductTermsAndCondition", value);
                                                }
                                            }}
                                            onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
                                                const paste = e.clipboardData.getData('text');
                                                if (paste.length + values.loanProductTermsAndCondition.length > maxChars) {
                                                    e.preventDefault();
                                                    setError('Program description must be 2500 characters or less');
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
                                    </div>
                                    <div className={`flex justify-end py-5 gap-3`}>
                                        <Button
                                            className={`text-meedlBlue border border-meedlBlue h-12 w-32`}
                                            variant={"outline"}
                                            type={"reset"}
                                            onClick={handleModalClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            className={`h-12 w-32 ${!isValid? 'bg-neutral650 text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'
                                            }`}
                                            variant="secondary"
                                            onClick={handleContinueButton}
                                            disabled={!isValid}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div id={"step2Div"}>
                                    <div>
                                        <Label htmlFor="bankPartner">Bank partner(optional)</Label>
                                        <div>
                                            <CustomSelect triggerId='bankPartner'
                                                          id="bankPartner"
                                                          selectContent={bankPartner}
                                                          value={values.bankPartner}
                                                          onChange={(value) => setFieldValue("bankPartner", value)}
                                                          name="bankPartner"
                                                          placeHolder='Select partner'
                                            />
                                            {
                                                errors.bankPartner && touched.bankPartner && (
                                                    <ErrorMessage
                                                        name="bankPartner"
                                                        id='bankPartner'
                                                        component="div"
                                                        className="text-red-500 text-sm"
                                                    />)
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="loanDisbursementTerms">Select loan insurance provider (optional)</Label>
                                        <div>

                                        </div>
                                    </div>




                                    <div className={`pt-4`}>
                                        <Label htmlFor="loanDisbursementTerms">Loan disbursement terms(optional)</Label>
                                        <Field
                                            as="textarea"
                                            id="loanDisbursementTermsId"
                                            name="loanDisbursementTerms"
                                            className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"
                                            placeholder="Enter disbursement terms"
                                            rows={4}
                                            maxLength={maxChars}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                const value = e.target.value; if (value.length <= maxChars) {
                                                    setFieldValue("loanDisbursementTerms", value); } }}
                                            onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
                                                const paste = e.clipboardData.getData('text');
                                                if (paste.length + values.loanDisbursementTerms.length > maxChars) {
                                                    e.preventDefault();
                                                    setError('Loan terms must be 2500 characters or less');
                                                } }}
                                        />
                                        { errors.loanDisbursementTerms && touched.loanDisbursementTerms && (
                                            <ErrorMessage
                                                name="loanDisbursementTerms"
                                                component="div"
                                                id='loanDisbursementTerms'
                                                className="text-red-500 text-sm"
                                            /> ) }
                                        { error && (
                                            <div className="text-red-500 text-sm"> {error} </div>
                                        )}
                                    </div>

                                    <div className={`flex justify-end py-5 gap-3`}>
                                        <Button
                                            className={`text-meedlBlue border border-meedlBlue h-12 w-32`}
                                            variant={"outline"}
                                            onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className={`bg-meedlBlue text-meedlWhite h-12 w-32`}
                                            variant={"secondary"}
                                            type={"submit"}
                                        >
                                            Create
                                            {/*{isLoading ? ( <Isloading/> ) : (*/}
                                            {/*    "Create"*/}
                                            {/*)}*/}

                                        </Button>
                                    </div>
                                    {
                                        <div
                                            className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
                                    }
                                </div>
                            )}
                        </Form>
                    )
                }
            </Formik>

        </main>
    )
}