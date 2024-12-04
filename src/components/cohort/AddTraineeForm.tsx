import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import {Icon} from '@iconify/react';
import {inter} from '@/app/fonts';
import CurrencySelectInput from '@/reuseable/Input/CurrencySelectInput';
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
// import {getUserDetails} from '@/features/auth/usersAuth/login/action';
import {MdOutlineDelete} from "react-icons/md";
import {useGetCohortLoanBreakDownQuery} from "@/service/admin/cohort_query";
import {getItemSessionStorage} from "@/utils/storage";

interface idProps {
    cohortId: string;
    tuitionFee?:string,
    setIsOpen?: (e: boolean | undefined) => void;
}

type cohortBreakDown = {
    currency: string,
    itemAmount: string,
    itemName: string,
    loanBreakdownId: string

}

function AddTraineeForm({cohortId, setIsOpen,tuitionFee}: idProps) {
    // const {storedAccessToken} = getUserDetails();
    // console.log('tuitionfee : ', tuitionFee);

    const details = [
        {item: 'Tuition', amount: tuitionFee},
        {item: 'Devices', amount: '₦600,000.00'},
        {item: 'Accommodation', amount: '₦600,000.00'},
        {item: 'Feeding', amount: '₦300,000.00'},
        {item: 'Total amount requested', amount: '₦3,500,000.00'},
    ];

    const COHORTID  = getItemSessionStorage("cohortId")
    console.log("coddo: ",COHORTID )

    const [step, setStep] = useState(1);
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [isLoading] = useState(false);
    const [inputValue, setInputValue] = useState(``);
    const [loanBreakdowns, setLoanBreakdowns] = useState<
        { itemName: string; itemAmount: string; currency: string }[]
    >([]);
    const {data} = useGetCohortLoanBreakDownQuery(COHORTID)
    const [cohortBreakDown, setCohortBreakDown] = useState([]);


    const handleNewValue = (newValue: string, index: number) => {
        setInputValue(newValue);
        console.log(`New value for detail-${index}:`, newValue);
    };

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
        cohortId,
        firstName: '',
        lastName: '',
        emailAddress: '',
        initialDeposit: '',
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

    const handleSubmitStep1 =  () => {
        // const response = await loanBreakDown(cohortId).unwrap()
        console.log("cohortId", cohortId,"response: ", data)
        const newCohortBreakDown = data?.data
        // newCohortBreakDown.add(data?.data)
        console.log(" beforee usestase:: ", cohortBreakDown, "dada: ", data?.data, "duydu: ", newCohortBreakDown)
        cohortBreakDown.push(data?.data)
        // setCohortBreakDown(data?.data)

        console.log(" usestase:: ", cohortBreakDown.at(0))
        setStep(2);

    };

    const handleFinalSubmit = (values: typeof initialFormValue) => {
        // const formattedDeposit = `${selectCurrency}${values.initialDeposit}`;
        // const formattedValues = {...values, initialDeposit: formattedDeposit};
        toastPopUp.showToast();
        console.log(values);

        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    const handleDeleteItem = (index: number) => {
        setLoanBreakdowns(loanBreakdowns.filter((_, i) => i !== index));
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
                                {/* Step 1 Fields */}
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

                                <div className=''>
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Field
                                        id="lastName"
                                        name="lastName"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter last name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("lastName", e.target.value.replace(/[^A-Za-z]/g, ''))}
                                    />

                                    {
                                        errors.lastName && touched.lastName && (
                                            <ErrorMessage
                                                name="lastName"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        )
                                    }
                                </div>
                                <div className=''>
                                    <Label htmlFor="emailAddress">Email address</Label>
                                    <Field
                                        id="emailAddress"
                                        name="emailAddress"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter email address"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("emailAddress", e.target.value.replace(/\s+/g, ''))}
                                    />

                                    {
                                        errors.emailAddress && touched.emailAddress && (
                                            <ErrorMessage
                                                name="emailAddress"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        )
                                    }
                                </div>
                                <div>
                                    <Label htmlFor="initialDeposit">Initial Deposit</Label>
                                    <div className='flex items-center gap-2'>
                                        <CurrencySelectInput
                                            selectedcurrency={selectCurrency}
                                            setSelectedCurrency={setSelectCurrency}
                                        />
                                        <div className='w-full mb-2'>
                                            <Field
                                                id="initialDeposit"
                                                name="initialDeposit"
                                                type="text"
                                                placeholder="Enter Initial Deposit"
                                                className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none "
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    const value = e.target.value;
                                                    if (/^\d*$/.test(value)) {
                                                        setFieldValue("initialDeposit", value);
                                                    }
                                                }}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className='relative bottom-6 ml-[90px]'>
                                    {
                                        errors.initialDeposit && touched.initialDeposit && (
                                            <ErrorMessage
                                                name="initialDeposit"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />)}
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
                                        variant="default"
                                        className={`w-full md:w-36 h-[57px] ${!isValid ? 'bg-neutral650 cursor-not-allowed ' : 'hover:bg-meedlBlue bg-meedlBlue cursor-pointer'}`}
                                        disabled={!isValid}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className={`py-5 ${inter.className}`}>
                                {details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className={`${detail.item === 'Total amount requested' ? `` : ''}`}
                                    >
                                        <Label htmlFor={`detail-${index}`}>{detail.item}</Label>
                                        <div className="w-full">
                                            {detail.item === 'Tuition' ? (
                                                <div className="flex items-center gap-2">
                                                    <CurrencySelectInput
                                                        readOnly
                                                        selectedcurrency={selectCurrency}
                                                        setSelectedCurrency={setSelectCurrency}
                                                    />
                                                    <div
                                                        className={`flex w-full flex-row items-center justify-between mb-2 text-black300`}>
                                                        <Field
                                                            id={`detail-${index}`}
                                                            name={`detail-${index}`}
                                                            type="text"
                                                            defaultValue={detail.amount || ''}
                                                            readOnly
                                                            className="w-full p-3 h-[3.2rem] border rounded bg-grey105 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`flex items-center w-full gap-2`}>
                                                    <div>
                                                        <CurrencySelectInput
                                                            readOnly={false}
                                                            selectedcurrency={selectCurrency}
                                                            setSelectedCurrency={setSelectCurrency}
                                                        />
                                                    </div>

                                                    <div
                                                        className={`flex w-full flex-row items-center justify-between mb-2 text-black300 ${detail.item === "Total amount requested" ? "" : ""}`}
                                                    >
                                                        <Field
                                                            id={`detail-${index}`}
                                                            name={`detail-${index}`}
                                                            type="text"
                                                            value={inputValue}
                                                            placeholder={`Enter ${detail.item}`}
                                                            className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                const value = e.target.value;
                                                                if (/^\d*$/.test(value)) {
                                                                    setFieldValue(`detail-${index}`, value);
                                                                    handleNewValue(value, index);
                                                                }
                                                            }}

                                                        />
                                                        <MdOutlineDelete id={`deleteItemButton${index}`}
                                                                         className={'text-blue200 h-4 w-4 cursor-pointer'}
                                                                         onClick={() => handleDeleteItem(index)}/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
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
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddTraineeForm;