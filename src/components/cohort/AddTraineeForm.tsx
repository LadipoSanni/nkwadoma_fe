import React, {useState, useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import {Icon} from '@iconify/react';
import {inter} from '@/app/fonts';
import CurrencySelectInput from '@/reuseable/Input/CurrencySelectInput';
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import {useAddLoaneeToCohortMutation, useGetCohortLoanBreakDownQuery} from "@/service/admin/cohort_query";
import {getItemSessionStorage} from "@/utils/storage";
import TotalInput from "@/reuseable/display/TotalInput";
import {NumericFormat} from 'react-number-format';
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";

interface Props {
    tuitionFee?: string;
    setIsOpen?: (e: boolean | undefined) => void;
}

type cohortBreakDown = {
    currency: string;
    itemAmount: string;
    itemName: string;
    loanBreakdownId: string;
}

function AddTraineeForm({setIsOpen, tuitionFee}: Props) {
    const COHORTID = getItemSessionStorage("cohortId");
    const [step, setStep] = useState(1);
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [isLoading] = useState(false);
    const {data} = useGetCohortLoanBreakDownQuery(COHORTID);
    const [cohortBreakDown, setCohortBreakDown] = useState<cohortBreakDown[]>([]);
    const [totalItemAmount, setTotalItemAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [initialDepositAmount, setInitialDepositAmount] = useState('');

    const [addLoaneeToCohort] = useAddLoaneeToCohortMutation();

    useEffect(() => {
        if (data?.data) {
            setCohortBreakDown(data.data);
            calculateTotal(data.data, tuitionFee);
        }
    }, [data, tuitionFee, initialDepositAmount]);

    const validationSchemaStep1 = Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .required('First name is required')
            .matches(/^\S*$/, 'First name should not contain spaces')
            .matches(/^[A-Za-z]+$/, 'First name should only contain letters'),
        lastName: Yup.string()
            .trim()
            .matches(/^\S*$/, 'Last name should not contain spaces')
            .matches(/^[A-Za-z]+$/, 'Last name should only contain letters')
            .required('Last name is required'),
        emailAddress: Yup.string()
            .email('Invalid email address')
            .matches(/^\S*$/, 'Email address should not contain spaces')
            .required('Email address is required'),
        initialDeposit: Yup.string()
            .required('Initial deposit is required')
            .matches(/^[1-9]\d*$/, 'Initial deposit must be a positive number and cannot start with zero'),
    });

    const initialFormValue = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        initialDeposit: ''
    };

    const toastPopUp = ToastPopUp({
        description: 'Cohort Trainee successfully added.',
        status: 'success',
    });

    const handleCloseModal = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    const calculateTotal = (items: cohortBreakDown[], tuitionFee?: string) => {
        const total = items.reduce((sum, item) => sum + parseFloat(item.itemAmount || '0'), 0);
        const totalWithTuition = total + (tuitionFee ? parseFloat(tuitionFee) : 0);
        const totalWithInitialDepositDeducted = totalWithTuition - (initialDepositAmount ? parseFloat(initialDepositAmount) : 0);
        setTotalItemAmount(totalWithInitialDepositDeducted);
    };

    const handleSubmitStep1 = () => {
        setStep(2);
    };

    const handleFinalSubmit = async (values: typeof initialFormValue) => {
        const input = {
            cohortId: COHORTID,
            userIdentity: {
                email: values.emailAddress,
                firstName: values.firstName,
                lastName: values.lastName
            },
            loaneeLoanDetail: {
                initialDeposit: values.initialDeposit,
                loanBreakdown: cohortBreakDown
            }
        };
        try {
            const response = await addLoaneeToCohort(input).unwrap();
            toastPopUp.showToast();
            handleCloseModal();
            setErrorMessage(null);
            console.log(response)
        } catch (error) {
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setErrorMessage(error?.data?.message || "An unexpected error occurred.");
        }
    };


    const editCohortBreakDown = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const {value} = e.target;
        const updatedData = cohortBreakDown.map((item, i) =>
            i === index ? {...item, itemAmount: value} : item
        );
        setCohortBreakDown(updatedData);
        calculateTotal(updatedData, tuitionFee);
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div id="addTraineeForm">
            <Formik
                initialValues={initialFormValue}
                validationSchema={step === 1 ? validationSchemaStep1 : undefined}
                onSubmit={step === 1 ? handleSubmitStep1 : handleFinalSubmit}
                validateOnMount
            >
                {({errors, isValid, touched, setFieldValue}) => (
                    <Form className={`${inter.className}`}>
                        {step === 1 ? (
                            <div className="grid grid-cols-1 gap-y-4 md:max-h-[520px] overflow-y-auto">
                                <div>
                                    <Label htmlFor="firstName">First name</Label>
                                    <Field
                                        id="firstName"
                                        name="firstName"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter first name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue('firstName', e.target.value.replace(/[^A-Za-z]/g, ''))
                                        }
                                    />
                                    {errors.firstName && touched.firstName && (
                                        <ErrorMessage name="firstName" component="div"
                                                      className="text-red-500 text-sm"/>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter last name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue("lastName", e.target.value.replace(/[^A-Za-z]/g, ''))
                                        }
                                    />
                                    {errors.lastName && touched.lastName && (
                                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm"/>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="emailAddress">Email address</Label>
                                    <Field
                                        id="emailAddress"
                                        name="emailAddress"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter email address"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue("emailAddress", e.target.value.replace(/\s+/g, ''))
                                        }
                                    />
                                    {errors.emailAddress && touched.emailAddress && (
                                        <ErrorMessage name="emailAddress" component="div"
                                                      className="text-red-500 text-sm"/>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="initialDeposit">Initial Deposit</Label>
                                    <div className='flex items-center gap-2'>
                                        <CurrencySelectInput
                                            selectedcurrency={selectCurrency}
                                            setSelectedCurrency={setSelectCurrency}
                                        />
                                        <div className='w-full'>
                                            <Field
                                                id="initialDeposit"
                                                name="initialDeposit"
                                                type="number"
                                                placeholder="Enter Initial Deposit"
                                                component={CustomInputField}
                                                className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const value = e.target.value;
                                                    setInitialDepositAmount(value)
                                                    console.log('initial deposit amount after setting : ', initialDepositAmount);
                                                    if (/^\d*$/.test(value)) {
                                                        void setFieldValue("initialDeposit", value);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='relative bottom-6 ml-[90px]'>
                                    {errors.initialDeposit && touched.initialDeposit && (
                                        <ErrorMessage name="initialDeposit" component="div"
                                                      className="text-red-500 text-sm"/>
                                    )}
                                </div>
                                <div className="md:flex gap-4 justify-end mt-2 md:mb-0 mb-3">
                                    <Button
                                        variant="outline"
                                        type="reset"
                                        className="w-full md:w-36 h-[57px] mb-4"
                                        onClick={handleCloseModal}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant="secondary"
                                        className={`w-full md:w-36 h-[57px] ${!isValid ? 'bg-neutral650 cursor-not-allowed ' : 'hover:bg-meedlBlue bg-meedlBlue cursor-pointer'}`}
                                        disabled={!isValid}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className={`py-5 ${inter.className}`}>
                                <span>Tuition</span>
                                <div className="flex items-center gap-2 ">
                                    <CurrencySelectInput
                                        readOnly={true}
                                        className={`bg-grey105 text-black300`}
                                        selectedcurrency={selectCurrency}
                                        setSelectedCurrency={setSelectCurrency}
                                    />

                                    <div className={`flex w-full flex-row items-center justify-between mb-2`}>
                                        <Field
                                            id="detail-"
                                            name="detail-"
                                            type="text"
                                            defaultValue={tuitionFee?.toLocaleString() || ''}
                                            readOnly
                                            className="w-full p-3 h-[3.2rem] border rounded bg-grey105 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                {cohortBreakDown?.map((detail: cohortBreakDown, index: number) => (
                                    <div key={"breakDown" + index} className={` grid md:grid gap-0`}>
                                        <Label htmlFor={`detail-${index}`}>{detail.itemName}</Label>
                                        <div className="w-full">
                                            <div className={`flex items-center w-full gap-2`}>
                                                <div>
                                                    <CurrencySelectInput
                                                        // readOnly={false}
                                                        selectedcurrency={detail.currency}
                                                        setSelectedCurrency={setSelectCurrency}
                                                    />
                                                </div>
                                                <div
                                                    className={`flex w-full flex-row items-center justify-between mb-2 text-black300`}>
                                                    <NumericFormat
                                                        id={`detail-${index}`}
                                                        name={`detail-${index}`}
                                                        type="text"
                                                        thousandSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        value={detail?.itemAmount?.toLocaleString() || ''}
                                                        placeholder={`${detail.itemName}`}
                                                        className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            const rawValue = e.target.value.replace(/,/g, '');
                                                            if (!isNaN(Number(rawValue))) {
                                                                editCohortBreakDown(
                                                                    {target: {value: rawValue}} as React.ChangeEvent<HTMLInputElement>,
                                                                    index
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div id={'totalInputOnAddLoaneeModal'} data-testid={'totalInputOnAddLoaneeModal'}>
                                    <div className={`text-[#6A696D]`}>initial deposit is deducted from total</div>
                                    <TotalInput prefix={'₦'} total={totalItemAmount}
                                                componentId={'totalInputOnAddLoaneeModalComponent'}/>
                                </div>
                                <div className="md:flex gap-4 justify-end mt-2 md:mb-0 mb-3">
                                    <Button
                                        variant="outline"
                                        type="reset"
                                        className="w-full md:w-36 h-[57px] mb-4"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="w-full md:w-36 h-[57px] hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                                        type="submit"
                                    >
                                        {isLoading ? (
                                            <div id="loadingLoopIconDiv" className="flex items-center justify-center">
                                                <Icon
                                                    id="Icon"
                                                    icon={loadingLoop}
                                                    width={34}
                                                    height={32}
                                                    style={{
                                                        animation: 'spin 1s linear infinite',
                                                        strokeWidth: 6,
                                                        display: 'block',
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            'Add'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                        {errorMessage && (
                            <div
                                className="mb-8 text-error500  text-sm text-center"
                                data-testid="formErrorMessage"
                            >
                                {errorMessage}
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddTraineeForm;