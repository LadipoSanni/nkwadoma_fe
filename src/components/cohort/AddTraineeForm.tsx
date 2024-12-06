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
// import Input
// import {MdOutlineDelete} from "react-icons/md";
import {useAddLoaneeToCohortMutation, useGetCohortLoanBreakDownQuery} from "@/service/admin/cohort_query";
import {getItemSessionStorage} from "@/utils/storage";
import TotalInput from "@/reuseable/display/TotalInput";
import {store, useAppSelector} from "@/redux/store";
import {setCohortBreakDownContainer} from "@/redux/slice/cohort/unpersist-slice";
import {Input} from "@/components/ui/input";

interface Props {
    cohortId: string;
    tuitionFee?: string,
    setIsOpen?: (e: boolean | undefined) => void;
}

type cohortBreakDown = {
    currency: string,
    itemAmount: string,
    itemName: string,
    loanBreakdownId: string

}

function AddTraineeForm({cohortId, setIsOpen, tuitionFee}: Props) {


    const COHORTID = getItemSessionStorage("cohortId")
    console.log("coddo: ", COHORTID)

    const [step, setStep] = useState(1);
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [isLoading] = useState(false);
    const [loanBreakdowns, setLoanBreakdowns] = useState<
        { itemName: string; itemAmount: string; currency: string }[]
    >([]);
    const {data} = useGetCohortLoanBreakDownQuery(COHORTID)
    const breakDown = useAppSelector(state => state.cohortBreakDownSlice.cohortBreakDownContainer)
    const [cohortBreakDown, setCohortBreakDown] = useState<cohortBreakDown[]>([]);
    const [totalItemAmount, setTotalItenAmount] = useState()
    const [loanBreakDownInputError, setLoanBreakDownInputError] = useState('')

    const [addLoaneeToCohort] = useAddLoaneeToCohortMutation()


    // const inputProps = {
    //     chortId: COHORTID,
    //     userIdentity: userIdentityInput,
    //     cohortBreakDown
    // }

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

    const handleSubmitStep1 = () => {
        // const response = await loanBreakDown(cohortId).unwrap()
        console.log("cohortId", cohortId, "response: ", data)
        // const newCohortBreakDown = data?.data
        // newCohortBreakDown.add(data?.data)
        const datass : cohortBreakDown[] = []
        data?.data?.forEach((datas) => {
            datass.push(datas)
        })
        store.dispatch(setCohortBreakDownContainer(data?.data))
        setCohortBreakDown(data?.data)
        // console.log(" datasss::after ", datass)
        // console.log(" beforee usestase:: ", cohortBreakDown, "dada: ", data?.data, "duydu: ", newCohortBreakDown)
        cohortBreakDown.push(data?.data)
        console.log("cohortBreakDown", cohortBreakDown, "data?.data: ", data?.data)

        // setCohortBreakDown(data?.data)

        console.log(" usestase:: ", cohortBreakDown)
        setStep(2);

    };

    const handleFinalSubmit = (values: typeof initialFormValue) => {
        // const formattedDeposit = `${selectCurrency}${values.initialDeposit}`;
        // const formattedValues = {...values, initialDeposit: formattedDeposit};
        // setUserIdentityInput(values)
        toastPopUp.showToast();
        console.log(values);

        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    // const handleDeleteItem = (index: number) => {
    //     setLoanBreakdowns(loanBreakdowns.filter((_, i) => i !== index));
    // };

    const editCohortBreakDown = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const cohortBreakDown =  data?.data
        const currentCohortBreakdown = cohortBreakDown[index]
        const currentCohortBreakDownAmount = currentCohortBreakdown?.itemAmount * 1
        const {value} = e.target
        const currentueui = value.toString() * 1
        // if (currentueui > )
        const item = cohortBreakDown[index]
        setCohortBreakDown((prevValue) => {
            const currentObj = prevValue[index];
            const updatedCurrentObj = {...currentObj,  itemAmount: value}
            const updatedCohortBreakdown = prevValue.filter((obj, objIndex) => objIndex === index ? updatedCurrentObj : obj)
            return updatedCohortBreakdown
        })
        //creating a variable with the inputted amount
        const updatedData: cohortBreakDown = {
            currency: item?.currency,
            itemAmount: value,
            loanBreakdownId: item.loanBreakdownId,
            itemName: item.itemName

        }
        console.log("ii: ", updatedData)
       // creating the copy of the cohortBreakDown
        const updateArray : cohortBreakDown[] = [...cohortBreakDown];
        //looping through the copy array to change the item  inputted amount
        for (let i = 0; i < updateArray.length; i++) {
            if (i === index) {
                //replacing the copy with the created item
                updateArray[index] = updatedData
            }
        }
        console.log("up: ", updateArray)

        // const updateArary =


        // const update : cohortBreakDown[] = []

        if (updateArray) {
            // updateArray.forEach((item) => update.push(item))
            // // cohortBreakDown.fo
            // for (let i = 0; i < updateArray.length; i++) {
            //     if (i === index) {
            //         cohortBreakDown[index] = updateArray[index]
            //     }
            //
            // }
            // store.dispatch(setCohortBreakDownContainer(updateArray))

            console.log("after changing: ",cohortBreakDown )
             // cohortBreakDown.replaceAll(cohortBreakDown)
            setCohortBreakDown(updateArray)
            console.log("after setting: ", cohortBreakDown)
            console.log("breakDown: ", breakDown)
            const items = cohortBreakDown[index]?.itemAmount * 1

            console.log("cohort amount: ", currentCohortBreakDownAmount, "itemmm: ", items)

        }

        // current[index] = newIndexElement
        // current.r

    }

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
                                <span>Tuition</span>
                                <div className="flex items-center gap-2">
                                    <CurrencySelectInput
                                        readOnly
                                        selectedcurrency={selectCurrency}
                                        setSelectedCurrency={setSelectCurrency}
                                    />
                                    <div
                                        className={`flex w-full flex-row items-center justify-between mb-2 text-black300`}>
                                        <Field
                                            id={`detail-`}
                                            name={`detail-`}
                                            type="text"
                                            defaultValue={tuitionFee}
                                            readOnly
                                            className="w-full p-3 h-[3.2rem] border rounded bg-grey105 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                {cohortBreakDown?.map((detail: cohortBreakDown, index: number) => (
                                    <div
                                        key={"breakDown"+index}
                                        className={``}
                                    >
                                        <Label htmlFor={`detail-${index}`}>{detail.itemName}</Label>
                                        <div className="w-full">
                                            <div className={`flex items-center w-full gap-2`}>
                                                <div>
                                                    <CurrencySelectInput
                                                        readOnly={false}
                                                        selectedcurrency={selectCurrency}
                                                        setSelectedCurrency={setSelectCurrency}
                                                    />
                                                </div>

                                                <div
                                                    className={`flex w-full flex-row items-center justify-between mb-2 text-black300 `}
                                                >
                                                    <Field
                                                        id={`detail-${index}`}
                                                        name={`detail-${index}`}
                                                        type="number"
                                                        defaultValue={detail?.itemAmount}
                                                        placeholder={`${detail.itemName}`}
                                                        className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                            editCohortBreakDown(e, index)
                                                        }}

                                                    />
                                                    {/*<MdOutlineDelete id={`deleteItemButton${index}`}*/}
                                                    {/*                 className={'text-blue200 h-4 w-4 cursor-pointer'}*/}
                                                    {/*                 onClick={() => handleDeleteItem(index)}/>*/}
                                                </div>
                                            </div>
                                            {/*}*/}
                                        </div>
                                    </div>
                                ))}
                                <div
                                    id={'totalInputOnAddLoaneeModal'}
                                    data-testid={'totalInputOnAddLoaneeModal'}
                                >
                                    <TotalInput prefix={'₦'} total={"20000"} componentId={'totalInputOnAddLoaneeModalComponent'}/>
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