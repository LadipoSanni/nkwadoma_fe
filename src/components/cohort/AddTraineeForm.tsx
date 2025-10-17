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
import { useAddLoaneeToCohortMutation, useGetCohortLoanBreakDownQuery, useEditAddLoaneeToCohortMutation } from "@/service/admin/cohort_query";
import TotalInput from "@/reuseable/display/TotalInput";
import { NumericFormat } from 'react-number-format';
import {MdOutlineDelete, MdAdd} from "react-icons/md";
import CenterMultistep from "@/reuseable/multiStep-component/Center-multistep";
import StringDropdown from "@/reuseable/Dropdown/DropdownSelect";
import { store } from '@/redux/store';
import {setCohortBreakdownText} from "@/redux/slice/cohort/unpersist-slice";
import {MdOutlineErrorOutline} from 'react-icons/md'
interface Props {
    tuitionFee?: string;
    setIsOpen?: (e: boolean | undefined) => void;
    cohortId?: string;
    isEdit?:boolean;
    loaneeBasicDetails?: {loaneeFirstName: string, loaneeLastName: string, loaneeEmail: string, loaneeInitialDeposit: string}
    loaneeLoanBreakDown?: cohortBreakDown[],
    loaneeId?: string,
    modalText?: string;
}

export type cohortBreakDown = {
    currency: string;
    itemAmount: string;
    itemName: string;
    loanBreakdownId: string;
    isloading?:(value: boolean) => boolean;
}

function AddTraineeForm({setIsOpen, tuitionFee,cohortId, isEdit,loaneeBasicDetails, loaneeLoanBreakDown, loaneeId }: Props) {
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
    const [currentSelectedItemAmount , setCurrentSelectedItemAmount] = useState("")

    const [addLoaneeToCohort, {isLoading: isLoadingAddLoanee}] = useAddLoaneeToCohortMutation();
    const [editLoaneeInACohort,{isLoading: isLoadingEditLoanee}] = useEditAddLoaneeToCohortMutation()
    const [selectedCohortItem, setSelectedCohortItem] = useState<cohortBreakDown[]>([]);
    const [names, setNames] = useState<string[]>([])
    const [openEmptyField, setOpenEmptyField] = useState(selectedCohortItem?.length === 0)

    const [cohortBreakDownTotal, setCohortBreakDownTotal  ] = useState(0)

    useEffect(() => {
        if (data?.data) {
            setCohortBreakDown(data?.data);
            dropDownItem(data.data)
        }
    }, [data, tuitionFee, initialDepositAmount]);


    useEffect(() => {
        if (isEdit && loaneeLoanBreakDown){
            setSelectedCohortItem(loaneeLoanBreakDown)
            calculateTotalForEditingLoane(loaneeLoanBreakDown, tuitionFee)
            setNamessOnEdit()
        }else{
            calculateTotalForAddingLoanee( tuitionFee);
            setSelectedCohortItem([])
        }
        calculateCohortItemsTotal(data?.data, tuitionFee ? Number(tuitionFee) : 0)

    }, [isEdit, loaneeLoanBreakDown, initialDepositAmount, tuitionFee, data?.data]);



    const calculateCohortItemsTotal = (cohortItems: cohortBreakDown[], tuitionFee: number)=> {
        // const cohortItems: cohortBreakDown[] = data?.data;
        const total = cohortItems?.reduce((sum: number, item: cohortBreakDown) => sum + Number(item?.itemAmount) , 0)
        const totalPlusTuition = total + tuitionFee ;
        setCohortBreakDownTotal(totalPlusTuition)
    }


    const setNamessOnEdit = () => {
        if(loaneeLoanBreakDown){
            const unselectedItemNames = cohortBreakDown
                .filter(item => !loaneeLoanBreakDown.some(sel => sel.itemName === item.itemName))
                .map(item => item.itemName);
            setNames(unselectedItemNames)

        }
    }


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
        firstName: loaneeBasicDetails && isEdit ? loaneeBasicDetails?.loaneeFirstName : '',
        lastName: loaneeBasicDetails && isEdit ? loaneeBasicDetails?.loaneeLastName : '',
        emailAddress: loaneeBasicDetails  && isEdit  ? loaneeBasicDetails?.loaneeEmail : '',
        initialDeposit: loaneeBasicDetails && isEdit ? loaneeBasicDetails?.loaneeInitialDeposit : ''
    };


    const toastPopUp = ToastPopUp({
        description: 'Cohort loanee successfully added.',
        status: 'success',
    });

    const handleCloseModal = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    };

    const calculateTotalForAddingLoanee = (tuitionFee?: string) => {
        const totalWithInitialDepositDeducted  = (tuitionFee ? parseFloat(tuitionFee) : 0) - (initialDepositAmount ? parseFloat(initialDepositAmount) : 0);
        setTotalItemAmount(totalWithInitialDepositDeducted);
    };


    const calculateTotalForEditingLoane = (loaneeAddedItems: cohortBreakDown[], tuitionFee?: string) => {
        const totalItems = loaneeAddedItems.reduce((sum, item) => sum + parseFloat(item.itemAmount || '0'), 0);
        const total = totalItems + (tuitionFee ? parseFloat(tuitionFee) : 0);
        const totalWithInitialDepositDeducted = total - (initialDepositAmount ? parseFloat(initialDepositAmount) : 0);
        setTotalItemAmount(totalWithInitialDepositDeducted);

    }

    const calculateTotal = (items: cohortBreakDown[], tuitionFee?: string) => {
        const total = items.reduce((sum, item) => sum + parseFloat(item.itemAmount || '0'), 0);
        const totalWithTuition = total + (tuitionFee ? parseFloat(tuitionFee) : 0);
        const totalWithInitialDepositDeducted  = totalWithTuition - (initialDepositAmount ? parseFloat(initialDepositAmount) : 0);
        setTotalItemAmount(totalWithInitialDepositDeducted);
    };

    const handleSubmitStep1 = (values: typeof initialFormValue) => {
        store.dispatch(setCohortBreakdownText('Cohort breakdown'))
        setInitialDepositAmount(values.initialDeposit)
        setStep(2);
    };

    const handleAddLoanee = async (values: typeof initialFormValue) => {
        const input = {
            cohortId: cohortId,
            userIdentity: {
                email: values.emailAddress,
                firstName: values.firstName,
                lastName: values.lastName
            },
            loaneeLoanDetail: {
                initialDeposit: values.initialDeposit,
                loanBreakdown: selectedCohortItem
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

        }
    };
    const handleEditLoanee = async (values: typeof initialFormValue) => {
        const newArray = selectedCohortItem.map(({ loanBreakdownId, ...rest }) => ({
            ...rest,
            loaneeLoanBreakdownId: loanBreakdownId,
        }));
        const input = {
            cohortId: cohortId,
            loaneeId: loaneeId,
            firstName: values.firstName,
            lastName: values.lastName,
            email:values.emailAddress,
            initialDeposit: values.initialDeposit,
            loanBreakdown:  newArray

        };
        try {
            await editLoaneeInACohort(input).unwrap();
            toastPopUp.showToast();
            handleCloseModal();
            setErrorMessage(null);
        } catch (error) {
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setErrorMessage(error?.data?.message || "An unexpected error occurred.");


        }
    };



    const handleFinalSubmit = async (values: typeof initialFormValue) => {
        store.dispatch(setCohortBreakdownText(''))
        setErrorMessage("")
       if (isEdit){
          await handleEditLoanee(values)
       }else{
          await handleAddLoanee(values)
       }
    };


    const editCohortBreakDown = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const itemAmountFromCohort = Number(item?.at(index)?.itemAmount)
        const userInput =  Number(e.target.value)

        if (userInput < itemAmountFromCohort || userInput  === itemAmountFromCohort) {
            const { value } = e.target;
            const updatedData = selectedCohortItem.map((item, i) =>
                i === index ? { ...item, itemAmount: value } : item
            );
            setSelectedCohortItem(updatedData)
            calculateTotal(updatedData, tuitionFee);
            setAmountError({error:'', index:0})
            setDisableAddLoaneeButton(false)

        }else {
            setDisableAddLoaneeButton(true)
            setAmountError({error:'amount can not be greater than cohort amount', index})
        }
    };



    const deductFromTotal = (itemAmount: number ) => {
        const deductedAmount = totalItemAmount - itemAmount
        setTotalItemAmount(deductedAmount);
    }


    const deleteItem = ( itemAmount: number,itemLoanBreakDownId?: string,itemName?: string) => {
        deductFromTotal( itemAmount);
        const updatedData = selectedCohortItem.filter((cohort) => cohort?.loanBreakdownId !== itemLoanBreakDownId)
        setSelectedCohortItem(updatedData)
        let removedItemName = ''
        if (isEdit && itemName){
            removedItemName = cohortBreakDown.find(item => item.itemName === itemName)?.itemName ?? '';
        }else {
            removedItemName = cohortBreakDown.find(item => item.loanBreakdownId === itemLoanBreakDownId)?.itemName ?? '';
        }
        setNames((prevState) => [...prevState,removedItemName] )
    }

    const handleBack = () => {
        store.dispatch(setCohortBreakdownText(isEdit ? 'Edit Loanee' : 'Add Loanee'))
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

    const changeSelectedItem = (currentItemIndex: number, currentItemName: string, selectedItemName: string)=> {
        const selectedItemArray: cohortBreakDown[] =  cohortBreakDown?.filter(item => item?.itemName === selectedItemName);
        const itemsOnSelectedArray = selectedCohortItem?.filter(item => item?.itemName === currentItemName )

        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const itemsS : cohortBreakDown = itemsOnSelectedArray?.at(0) ? itemsOnSelectedArray?.at(0 ) : {    currency: '',
            itemAmount: '',
            itemName: '',
            loanBreakdownId: '',
        };

        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const selectedItem: cohortBreakDown = selectedItemArray?.at(0) ? selectedItemArray?.at(0 ) : {    currency: '',
            itemAmount: '',
            itemName: '',
            loanBreakdownId: '',
        };


        setSelectedCohortItem((prev: cohortBreakDown[]) =>
            prev?.map((item: cohortBreakDown, i) => (i === currentItemIndex ? selectedItem : item))
        );
        setSelectedCohortItem((prev) =>
            prev.map((item) =>
                item.itemName === selectedItem.itemName
                    ? { ...item, itemAmount: itemsS?.itemAmount }
                    : item
            )
        );
        setNames(prevNames => {
            const updated = [...prevNames, currentItemName]
            return updated;
        });
        setNames(prevNames => prevNames.filter(name => name !== selectedItemName));


    }


    const handleSelect = (value: string) => {
       const currentItemArray =  cohortBreakDown?.filter(item => item?.itemName === value);
        const currentItem = currentItemArray?.at(0) ? currentItemArray?.at(0 ) : {    currency: '',
            itemAmount: '',
            itemName: '',
            loanBreakdownId: '',
        };
        if (currentSelectedItemAmount){
            const updatedCurrentItem: cohortBreakDown = {
                currency: currentItem?.currency ?? "",
                itemAmount: currentSelectedItemAmount,
                itemName: currentItem?.itemName ?? "",
                loanBreakdownId: currentItem?.loanBreakdownId ?? "",
            };
            let index = 0;
            setSelectedCohortItem(prev => {
                const updated =  [...prev, updatedCurrentItem];
                 index = updated.findIndex(
                    item => item.loanBreakdownId === updatedCurrentItem.loanBreakdownId
                );
                return updated;

            });
            if (parseFloat(currentSelectedItemAmount) < parseFloat(currentItem?.itemAmount ? currentItem?.itemAmount : '') || parseFloat(currentSelectedItemAmount) === parseFloat(currentItem?.itemAmount ? currentItem?.itemAmount : '') ){
                    const totalWithInitialDepositDeducted  = totalItemAmount + ( currentSelectedItemAmount ? parseFloat(currentSelectedItemAmount) : 0);
                    setTotalItemAmount(totalWithInitialDepositDeducted);
                    setAmountError({error:'',index: 0 })
                setDisableAddLoaneeButton(false)
            }else{
                setDisableAddLoaneeButton(true)
                setAmountError({error:'amount can not be greater than cohort amount', index:index })

            }
        }else{

            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSelectedCohortItem(prev => {
                return [...prev, currentItem];
            });
            const totalWithInitialDepositDeducted  = totalItemAmount + ( currentItem?.itemAmount ? parseFloat(currentItem?.itemAmount) : 0);
            setTotalItemAmount(totalWithInitialDepositDeducted);
        }
        setCurrentSelectedItemAmount("")
        setNames(prevNames => prevNames.filter(name => name !== value));
        setOpenEmptyField(false)

    };

    const handleAddButton = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e?.preventDefault()
        setOpenEmptyField(true)
    }



    return (
        <div id="addTraineeForm">
            <Formik
                initialValues={initialFormValue}
                validationSchema={step === 1 ? validationSchemaStep1 : undefined}
                onSubmit={step === 1 ? handleSubmitStep1 : handleFinalSubmit}
                validateOnMount
            >
                {({ errors, isValid, touched,values, setFieldValue }) => (
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
                                        <div className='flex gap-3   h-fit py-0  items-center '>
                                            <CurrencySelectInput
                                                selectedcurrency={selectCurrency}
                                                setSelectedCurrency={setSelectCurrency}
                                            />
                                            <div className='w-full h-fit mt-auto  mb-auto  '>
                                                <NumericFormat
                                                    id="initialDeposit"
                                                    name="initialDeposit"
                                                    // type="number"
                                                    type="text"
                                                    inputMode="numeric"
                                                    thousandSeparator=","
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    placeholder="Enter Initial Deposit"
                                                    value={values?.initialDeposit}
                                                    // component={CustomInputField}
                                                    className="w-full p-3 h-[3rem] mt-auto mb-auto border rounded focus:outline-none"
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        let value = e.target.value;
                                                        value = value.replace(/\D/g, "");
                                                        setInitialDepositAmount(value);
                                                        if (value === "") {
                                                            setInitialDepositError("");
                                                            return;
                                                        }

                                                        const numericValue = Number(value);
                                                        const total = Number(cohortBreakDownTotal);
                                                        const newNumString = numericValue?.toString()?.slice(0, -2);
                                                        void setFieldValue("initialDeposit",newNumString);
                                                        if (Number(newNumString) <= Number(total)) {
                                                            setInitialDepositError("");
                                                            setInitialDepositAmount(newNumString);
                                                        } else {
                                                            setInitialDepositError(
                                                                "Initial deposit cannot be greater than cohort total breakdown amount:"+total
                                                            );

                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='relative bottom-6 m'>
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
                                        className={`w-full md:w-36 h-[57px] ${!isValid || Boolean(initialDepositError) ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7]' : 'cursor-pointer'}`}
                                        disabled={!isValid || Boolean(initialDepositError)}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className={`py- ${inter.className}`}>
                                <div className={` w-full h-fit bg-[#F9F9F9] rounded-md grid py-2 px-2  `}>
                                    <span>Total loan amount (  Cohort breakdown - Initial deposit ) </span>
                                    <TotalInput prefix={'₦'} total={totalItemAmount}
                                                componentId={'totalInputOnAddLoaneeModalComponent'}/>
                                </div>

                                <div
                                    style={{
                                        overflowX: 'hidden',
                                        overflowY: 'auto',
                                        scrollbarWidth: 'none',
                                        msOverflowStyle: 'none',

                                    }}
                                    className={` max-h-[45vh] h-[45vh] overflow-y-scroll   `}
                                >
                                    <div
                                        className={` w-full flex gap-4    `}
                                    >
                                        <div>
                                            <div className={` text-[14px] h-fit py-2   ${inter500.className}  `}>Item</div>
                                            <div className={` w-  grid gap-4 `}>
                                                <div className={` mt-auto mb-auto bg-[#F9F9F9] border border-[#D7D7D7] rounded-md w-full  h-fit p-3  text-black  `}>
                                                    Tuition
                                                </div>

                                                {selectedCohortItem?.map((detail: cohortBreakDown, index: number) => (
                                                    <div key={'item'+ index}  className={` text-[14px] ${inter.className}   mt-auto mb-auto  w-full   h-full text-black  `}>
                                                        <StringDropdown
                                                            height={' h-[3.2rem]  '}
                                                            label={detail?.itemName}
                                                            items={names}
                                                            onSelect={ (value) => changeSelectedItem(index, detail?.itemName, value)
                                                        }
                                                        />
                                                    </div>
                                                ))}
                                                {openEmptyField &&
                                                    <div  className={`flex gap-3  mt-auto mb-auto `}>
                                                        <div className={` text-[14px] ${inter.className}  mt-auto mb-auto  w-full  h-fit text-black  `}>
                                                            <StringDropdown
                                                                height={' h-[3.2rem]  '}
                                                                label={'Select item'}
                                                                items={names}
                                                                onSelect={handleSelect}
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>

                                        <div className={` w-full  grid    `}>
                                            <div className={` text-[14px] h-fit py-2  ${inter500.className} `}>Amount</div>
                                           <div className={` grid gap-4 `}>
                                               <div
                                                   className={`  flex gap-2  h-fit  `}
                                               >
                                                   <div className={` mt-auto mb-auto bg-[#F9F9F9] h-[3.2rem] p-3 border border-[#D7D7D7] rounded-md  text-black  `}>
                                                       NGN
                                                   </div>

                                                   <Field
                                                       id="detail-"
                                                       name="detail-"
                                                       type="text"
                                                       defaultValue={tuitionFee?.toLocaleString() || ''}
                                                       readOnly
                                                       className=" p-3 w-[80%]  h-[3.2rem] border rounded bg-grey105 focus:outline-none"
                                                   />

                                               </div>
                                               {selectedCohortItem?.map((detail: cohortBreakDown, index: number) => (
                                                   <div
                                                       key={'index' + index}
                                                       className={`   grid  `}
                                                   >
                                                       <div
                                                           className={` w-full h-fit  flex  gap-2  `}
                                                       >
                                                           <div className={` mt-auto mb-auto bg-white border border-[#D7D7D7] rounded-md  h-fit p-3  text-black  `}>
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
                                                               className=" w-[70%] p-3 h-[3.2rem] border rounded focus:outline-none"
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
                                                           <MdOutlineDelete id={`deleteItemButton${index}}`}
                                                                            className={'text-blue200 mt-auto mb-auto  h-6 w-4 cursor-pointer'}
                                                                            onClick={()=> {deleteItem( Number(detail.itemAmount), detail?.loanBreakdownId,detail?.itemName)}}
                                                           />

                                                       </div>
                                                       {amountError?.index === index && <div
                                                           className={`text-error500 place-self-start  text-sm text-center`}>{amountError?.error}</div>}

                                                   </div>
                                               ))}
                                               {openEmptyField &&
                                                   <div

                                                       className={` w-full h-fit  flex  gap-2  `}
                                                   >
                                                       <div className={` mt-auto mb-auto bg-white border border-[#D7D7D7] rounded-md  h-[3.2rem] p-3  text-black  `}>
                                                           NGN
                                                       </div>

                                                       <NumericFormat
                                                           id={`detail-01`}
                                                           name={`detail-01`}
                                                           type="text"
                                                           thousandSeparator=","
                                                           decimalScale={2}
                                                           fixedDecimalScale={true}
                                                           // value={detail?.itemAmount?.toLocaleString() || ''}
                                                           // placeholder={`${detail?.itemAmount || ''}`}
                                                           className=" w-[70%] p-3 h-[3.2rem] border rounded focus:outline-none"
                                                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                               const rawValue = e.target.value.replace(/,/g, '');
                                                               if (!isNaN(Number(rawValue))) {
                                                                   setCurrentSelectedItemAmount(rawValue)
                                                               }
                                                           }}
                                                       />
                                                   </div>
                                               }
                                           </div>
                                        </div>
                                    </div>
                                    {names?.length !== 0 &&
                                    <div
                                        onClick={(e) => {handleAddButton(e)}}
                                        className={` flex gap-2 text-[14px] ${inter.className} pt-2  text-meedlBlue  `}>
                                        <MdAdd className={` w-6 h-6  `}/>
                                        Add another
                                    </div>
                                    }

                                </div>

                                <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
                                {totalItemAmount < 0 &&
                                    <div className={` py-2  `}>
                                        <div className={` text-sm flex text-[#66440A] bg-[#FEF6E8] w-fit h-fit px-1 py-1  `}>
                                            <MdOutlineErrorOutline  className={` pl-2 mtauto mbauto h-8 w-8 `}/>
                                            The loan amount is negative because the cohort breakdown is lower than the initial deposit
                                        </div>
                                    </div>}
                                <div className="md:flex   md:gap-4 md:justify-end  grid gap-2 mt-2 md:mb-0 py-3 ">
                                    <Button
                                        variant="outline"
                                        type="reset"
                                        className="md:w-fit w-full  h-[3rem] px-6  "
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                        <Button
                                            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
                                            type={disableAddLoaneeButton || totalItemAmount < 0 ? "" : 'submit' }
                                            className={`w-full md:w-36 h-[3rem] ${disableAddLoaneeButton || totalItemAmount < 0 ? 'hover:bg-[#D0D5DD] bg-[#D0D5DD]' : ' hover:bg-meedlBlue bg-meedlBlue '}  `}>

                                            {disableAddLoaneeButton || totalItemAmount < 0 ?
                                                'Confirm'
                                                :
                                                <div>
                                                    {isLoadingAddLoanee || isLoadingEditLoanee ? (
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
                                                        'Confirm'
                                                    )}
                                                </div>

                                            }
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