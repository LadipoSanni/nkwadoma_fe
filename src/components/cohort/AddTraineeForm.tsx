'use client'
import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import loadingLoop from '@iconify/icons-line-md/loading-loop';
import { Icon } from '@iconify/react';
import {inter, inter500} from '@/app/fonts';
import CurrencySelectInput from '@/reuseable/Input/CurrencySelectInput';
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import { useAddLoaneeToCohortMutation, useGetCohortLoanBreakDownQuery } from "@/service/admin/cohort_query";
import TotalInput from "@/reuseable/display/TotalInput";
import { NumericFormat } from 'react-number-format';
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
import {MdOutlineDelete} from "react-icons/md";
import CenterMultistep from "@/reuseable/multiStep-component/Center-multistep";
import StringDropdown from "@/reuseable/Dropdown/DropdownSelect";

interface Props {
    tuitionFee?: string;
    setIsOpen?: (e: boolean | undefined) => void;
    cohortId?: string
}

type cohortBreakDown = {
    currency: string;
    itemAmount: string;
    itemName: string;
    loanBreakdownId: string;
    isloading?:(value: boolean) => boolean;
}

function AddTraineeForm({setIsOpen, tuitionFee,cohortId }: Props) {
    const [step, setStep] = useState(1);
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const { data } = useGetCohortLoanBreakDownQuery(cohortId);
    const [cohortBreakDown, setCohortBreakDown] = useState<cohortBreakDown[]>([]);
    const [totalItemAmount, setTotalItemAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [initialDepositAmount, setInitialDepositAmount] = useState('');
    const [amountError, setAmountError] = useState<{error: string, index: number}>()
    const item = data?.data
    const [disableAddLoaneeButton, setDisableAddLoaneeButton] = useState(false)
    const [initialDepositError, setInitialDepositError] = useState('')

    const [addLoaneeToCohort, {isLoading: isLoadingAddLoanee}] = useAddLoaneeToCohortMutation();
    const [selectedCohortItem, setSelectedCohortItem] = useState<cohortBreakDown[]>([]);


    const [names, setNames] = useState<string[]>([])
    useEffect(() => {
        if (data?.data) {
            setCohortBreakDown(data?.data);
            calculateTotal( tuitionFee);
            // deductInitialDepositFromTotal(data.data)
            dropDownItem(data.data)
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
            // .required('Initial deposit is required')
            // .matches(/^[1-9]\d*$/, 'Initial deposit must be a positive number and cannot start with zero'),

    });

    const initialFormValue = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        initialDeposit: ''
    };
    // const {toast} = useToast();

    const toastPopUp = ToastPopUp({
        description: 'Cohort loanee successfully added.',
        status: 'success',
    });

    const handleCloseModal = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    const calculateTotal = (tuitionFee?: string) => {

        const totalWithInitialDepositDeducted  = (tuitionFee ? parseFloat(tuitionFee) : 0) - (initialDepositAmount ? parseFloat(initialDepositAmount) : 0);
        setTotalItemAmount(totalWithInitialDepositDeducted);
    };



    const handleSubmitStep1 = (values: typeof initialFormValue) => {
        setInitialDepositAmount(values.initialDeposit)
        setStep(2);
    };


    const handleFinalSubmit = async (values: typeof initialFormValue) => {
        const input = {
            cohortId: cohortId,
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
            await addLoaneeToCohort(input).unwrap();
            toastPopUp.showToast();
            handleCloseModal();
            setErrorMessage(null);
        } catch (error) {
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setErrorMessage(error?.data?.message || "An unexpected error occurred.");
            // toast({
            //     status: 'error',
            //     description: errorMessage,
            // })

        }
    };



    const editCohortBreakDown = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const itemAmountFromCohort = Number(item?.at(index)?.itemAmount)
        const userInput =  Number(e.target.value)

        if (userInput < itemAmountFromCohort || userInput  === itemAmountFromCohort) {
            const { value } = e.target;
            const updatedData = cohortBreakDown.map((item, i) =>
                i === index ? { ...item, itemAmount: value } : item
            );
            setCohortBreakDown(updatedData);
            setSelectedCohortItem(updatedData)
            calculateTotal( tuitionFee);
            setAmountError({error:'', index:0})
            setDisableAddLoaneeButton(false)

        }else {
            const current = cohortBreakDown
            setDisableAddLoaneeButton(true)
            setCohortBreakDown(current);
            setSelectedCohortItem(current)
            setAmountError({error:'amount can not be greater than cohort amount', index})
        }
    };



    const deductFromTotal = (itemAmount: number ) => {
        const deductedAmount = totalItemAmount - itemAmount
        setTotalItemAmount(deductedAmount);
    }


    const deleteItem = (itemLoanBreakDownId: string, itemAmount: number) => {
        deductFromTotal( itemAmount);
        const updatedData = selectedCohortItem.filter((cohort) => cohort?.loanBreakdownId !== itemLoanBreakDownId)
        const removedItemName = cohortBreakDown.find(item => item.loanBreakdownId === itemLoanBreakDownId)?.itemName ?? '';
        setNames((prevState) => [...prevState,removedItemName] )
        setSelectedCohortItem(updatedData)
    }

    const handleBack = () => {
        setStep(1);
    };

    const dropDownItem = (co: cohortBreakDown[])=>{
        const itemNames: string[] = [];
        const items: {name: string, amount: string}[] = []
        co?.forEach((element) => {
            itemNames?.push(element?.itemName)
            items?.push({name : element?.itemName, amount : element?.itemAmount})
        })
        setNames(itemNames);

    }


    const handleSelect = (value: string) => {
       const currentItemArray =  cohortBreakDown?.filter(item => item?.itemName === value);
        const currentItem = currentItemArray?.at(0) ? currentItemArray?.at(0 ) : {    currency: '',
            itemAmount: '',
            itemName: '',
            loanBreakdownId: ''};
        const totalWithInitialDepositDeducted  = totalItemAmount + ( currentItem?.itemAmount ? parseFloat(currentItem?.itemAmount) : 0);

        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setSelectedCohortItem(prev => [...prev, currentItem]);
        setNames(prevNames => prevNames.filter(name => name !== value));
        setTotalItemAmount(totalWithInitialDepositDeducted);

    };

    return (
        <div id="addTraineeForm">
            <Formik
                initialValues={initialFormValue}
                validationSchema={step === 1 ? validationSchemaStep1 : undefined}
                onSubmit={step === 1 ? handleSubmitStep1 : handleFinalSubmit}
                validateOnMount
            >
                {({ errors, isValid, touched, setFieldValue }) => (
                    <Form className={`${inter.className} `}

                    >
                       <div>
                           <CenterMultistep currentStep={step} totalSteps={2} />
                       </div>
                        {step === 1 ? (
                            <div>
                                <div
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',

                                    }}
                                    className=" md:max-h-[67.5vh]  overflow-y-auto  grid grid-cols-1 gap-y-4  px-2">
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
                                            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
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
                                            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
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
                                            <ErrorMessage name="emailAddress" component="div" className="text-red-500 text-sm" />
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="initialDeposit">Initial Deposit</Label>
                                        <div className='flex gap-3 items-center '>
                                            <CurrencySelectInput
                                                selectedcurrency={selectCurrency}
                                                setSelectedCurrency={setSelectCurrency}
                                            />
                                            <div className='w-full '>
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
                                                        if (/^\d*$/.test(value)) {
                                                            if (Number(e.target.value) < Number(totalItemAmount) || Number(e.target.value) === Number(totalItemAmount)) {
                                                                setInitialDepositError('')
                                                                setInitialDepositAmount(value)
                                                                void setFieldValue("initialDeposit", e.target.value);
                                                            }else {
                                                                void setFieldValue("initialDeposit", '');
                                                                setInitialDepositError("initialDeposit can not be greater than cohort amount");

                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='relative bottom-6 ml-[90px]'>
                                        {errors.initialDeposit && touched.initialDeposit && (
                                            <ErrorMessage name="initialDeposit" component="div" className="text-red-500 text-sm" />
                                        )}
                                        {initialDepositError.length > 1 &&
                                            <span className="text-red-500 text-sm" >{initialDepositError}</span>}
                                    </div>
                                </div>
                                <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
                                <div className="md:flex q gap-4 justify-end mt-2 md:mb-0 mb-3">
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
                                        className={`w-full md:w-36 h-[57px] ${!isValid ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7]' : 'cursor-pointer'}`}
                                        disabled={!isValid}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className={`py- ${inter.className}`}>
                                <span className={` text-[24px] text-black    `}>Cohort breakdown</span>
                                <div className={` w-full h-fit bg-[#F9F9F9] rounded-md grid py-2 px-2  `}>
                                    <span>Total loan amount (Initial deposit - Cohort breakdown) </span>
                                    <TotalInput prefix={'₦'} total={totalItemAmount}
                                                componentId={'totalInputOnAddLoaneeModalComponent'}/>
                                </div>

                                <div
                                    style={{
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',

                                    }}
                                    className={` max-h-[45vh] h-[45vh] overflow-y-scroll   `}
                                >
                                    <div className={`w-full grid   `}>
                                        <div className={` flex  w-full  `}>
                                            <div className={`w-1/3 text-[14px] h-fit py-2   ${inter500.className}  `}>Item</div>
                                            <div className={`w-2/3 text-[14px] h-fit py-2  ${inter500.className} `}>Amount</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`flex gap-3 `}>
                                            <div className={` mt-auto mb-auto bg-[#F9F9F9] border border-[#D7D7D7] rounded-md w-[40%] h-fit p-3  text-black  `}>
                                                Tuition
                                            </div>
                                            <div className={`flex w-full gap-2 flex-row items-center justify-between mb-2`}>
                                                {/*<CurrencySelectInput*/}
                                                {/*    readOnly={true}*/}
                                                {/*    className={`bg-grey105 h-fit p-3  text-black300`}*/}
                                                {/*    selectedcurrency={selectCurrency}*/}
                                                {/*    setSelectedCurrency={setSelectCurrency}*/}
                                                {/*/>*/}
                                                <div className={` mt-auto mb-auto bg-[#F9F9F9]  border border-[#D7D7D7] rounded-md w-[6rem] h-fit p-3  text-black  `}>
                                                    NGN
                                                </div>

                                                <Field
                                                    id="detail-"
                                                    name="detail-"
                                                    type="text"
                                                    defaultValue={tuitionFee?.toLocaleString() || ''}
                                                    readOnly
                                                    className="w-full p-3  h-[3.2rem] border rounded bg-grey105 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        {selectedCohortItem?.length === 0 &&
                                            <div  className={`flex gap-3 `}>

                                                <div className={` text-[14px] ${inter.className}  mt-auto mb-auto  w-[40%] h-fit text-black  `}>
                                                    <StringDropdown
                                                        label={'Select item'}
                                                        items={names}
                                                        onSelect={handleSelect}
                                                    />
                                                </div>
                                                <div className={`flex w-full gap-2 flex-row items-center justify-between mb-2`}>
                                                    <div className={` mt-auto mb-auto bg-white border border-[#D7D7D7] rounded-md w-[6rem] h-fit p-3  text-black  `}>
                                                        NGN
                                                    </div>

                                                    <NumericFormat
                                                        id={`detail-`}
                                                        name={`detail`}
                                                        type="text"
                                                        thousandSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                        value={ ''}
                                                        placeholder={``}
                                                        className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"

                                                    />

                                                </div>
                                            </div>

                                        }
                                        <div className={` grid gap-3 `}>
                                            {selectedCohortItem?.map((detail: cohortBreakDown, index: number) => (
                                                <div key={'item'+ index}>
                                                    <div  className={`flex gap-3  `}>

                                                        <div className={` text-[14px] ${inter.className}  mt-auto mb-auto  w-[40%]  h-full text-black  `}>
                                                            <StringDropdown
                                                                label={detail?.itemName}
                                                                items={names}
                                                                onSelect={handleSelect}
                                                            />
                                                        </div>
                                                        <div className={`flex w-full gap-2 flex-row items-center justify-between mb-2`}>
                                                            <div className={` mt-auto mb-auto bg-white border border-[#D7D7D7] rounded-md w-[6rem] h-fit p-3  text-black  `}>
                                                                NGN
                                                            </div>

                                                            <NumericFormat
                                                                id={`detail-${index}`}
                                                                name={`detail-${index}`}
                                                                type="text"
                                                                thousandSeparator=","
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                value={detail?.itemAmount?.toLocaleString() || ''}
                                                                placeholder={`${detail?.itemAmount || ''}`}
                                                                className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    const rawValue = e.target.value.replace(/,/g, '');
                                                                    if (!isNaN(Number(rawValue))) {
                                                                        editCohortBreakDown(
                                                                            {target: {value: rawValue}} as React.ChangeEvent<HTMLInputElement>,
                                                                            index,
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <MdOutlineDelete id={`deleteItemButton${index}`}
                                                                             className={'text-blue200 mt-auto mb-auto  h-6 w-6 cursor-pointer'}
                                                                             onClick={()=> {deleteItem(detail?.loanBreakdownId, Number(detail.itemAmount))}}
                                                            />
                                                        </div>
                                                    </div>
                                                    {amountError?.index === index && <div
                                                        className={`text-error500 place-self-start  text-sm text-center`}>{amountError?.error}</div>}
                                                </div>
                                            ))}

                                        </div>
                                    </div>

                                </div>

                                <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
                                <div className="md:flex gap-4 justify-end mt-2 md:mb-0 py-3 ">
                                    <Button
                                        variant="outline"
                                        type="reset"
                                        className="w-fit h-fit px-6 py-4 "
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    {disableAddLoaneeButton ?
                                        <Button
                                            className={`w-full md:w-36 h-[57px] hover:bg-[#D0D5DD] bg-[#D0D5DD] `}>
                                            Add
                                        </Button>
                                        :
                                        <Button
                                            variant="secondary"
                                            className="w-fit h-fit px-6 py-4  cursor-pointer"
                                            type="submit"
                                        >
                                            {isLoadingAddLoanee ? (
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
                                    }
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