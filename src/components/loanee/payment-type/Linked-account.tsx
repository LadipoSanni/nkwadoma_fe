import React, { useState } from 'react'
import Border from './Border'
import { Formik, Form ,FormikHelpers} from "formik";
import { Label } from '@/components/ui/label';
import {NumericFormat} from 'react-number-format';
import * as Yup from "yup";
import { Button } from '@/components/ui/button'
import { AccountMultiSelect } from '@/reuseable/mult-select/account-multiselect/Account-multiselect';
import { bankAccounts } from '@/features/loaneeViews/payment/Payment';
import { MdInfoOutline } from 'react-icons/md';
import { inter } from '@/app/fonts';
import { setLinkedAccountTab, setInitialLinkedAccountValue,resetInitialLinkedAccountValue } from '@/redux/slice/make-payment/payment';
import { store,useAppSelector } from '@/redux/store';
import { formatAmount } from '@/utils/Format';
import { BankAccountItem } from '@/components/loanee/Bank-account-item';
import styles from "@/features/loaneeViews/payment/index.module.css"
import Modal from '@/reuseable/modals/TableModal';
import SuccessfulPayment from '@/reuseable/documents/Successful-payment-and-failure';

export interface AcctObj {
    id: string;
    bankName: string;
    logo: string;
  accountNumber: string;
}

function LinkedAccount() {
    const [showErrors, setShowErrors] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);
    const [formKey, setFormKey] = useState(0); 
    const [isOpen, setIsopen] = useState(false)
    const currentState = useAppSelector(state => state?.payment?.linkedAccountTab)
    const currentInitialState = useAppSelector(state => state?.payment?.initialLinkedAcctFormValue)
    const [isSuccessful, setIsSuccessful] = useState(false)

    const paymentData = {
        referenceNumber: "000085752257",
        dateTime: "22, Feb 2024, 07:80 AM",
        paymentMethod: "Linked account",
        amount: currentInitialState?.repaymentAmount || ""
      };

    const initialFormValue = {
        repaymentAmount : currentInitialState?.repaymentAmount ||  "",
        account : currentInitialState?.account || [] as AcctObj[]
    }

 
    const handleFormChange = (field: string, value: string | AcctObj[]) => {
        const currentField = currentInitialState || {
            repaymentAmount : "" ,
            account : []
        };

        store.dispatch(setInitialLinkedAccountValue({
                    ...currentField,
                    [field]: value   
     }));
    }

      const validationSchema = Yup.object().shape({
            repaymentAmount: Yup.string()
                .trim()
                .required("Required")
                .test('is-positive', 'Amount must be greater than 0', (value) => {
                    if (!value) return false;
                    const numericValue = parseFloat(value.replace(/,/g, ''));
                    return numericValue > 0;
                }),
            account: Yup.array()
                .of(
                    Yup.object().shape({
                    id: Yup.string().required(),
                    bankName: Yup.string().required()
                    })
                )
                .min(1, "At least one sponsor is required")
                .required("Account is required"),
        })

    function handleSubmit(values: typeof initialFormValue, { setSubmitting }: FormikHelpers<typeof initialFormValue>) {
            setSubmitted(true);
            setIsSuccessful(true)
            console.log('Submitting:', values);
             setIsopen(true)
            setSubmitting(false);
        }
    
        const handleContinue = () => {
            setShowErrors(true);
            setHasTyped(true);
            if(currentState === 0) {
                store.dispatch(setLinkedAccountTab(1))
            }
        }

        const handleModalClose = () => {
                setIsopen(false);
                store.dispatch(setLinkedAccountTab(0));
                store.dispatch(resetInitialLinkedAccountValue());
                setFormKey(prev => prev + 1); 
                setShowErrors(false);
                setHasTyped(false);
                setSubmitted(false);
            }

  return (
    <Border className={`relative bottom-3 md:bottom-0   ${inter.className} ${currentState === 1 && "border-[#D7D7D7]"}`}>
       <Formik
        key={formKey}
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validateOnChange={true}
        validationSchema={validationSchema}
        validateOnBlur={true} 
    
    >
      {({errors, isValid,setFieldValue, values}) => {
        const shouldShowError = showErrors || hasTyped || (submitted && errors.repaymentAmount);

        return (
            <Form>
               { currentState === 0? <div>
                <div className={`grid grid-cols-1 gap-y-4  md:h-[32vh]   ${styles.container}`}>
              <div>
            <Label htmlFor="repaymentAmount" className='text-[#212221] text-[12px] font-medium'>
                How much would you like to repay?
            </Label>
            <NumericFormat
                id="repaymentAmount"
                name="repaymentAmount"
                type="text"
                inputMode="numeric"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                placeholder="Enter repayment amount"
                value={values.repaymentAmount}
                className={`w-full p-3 h-[3rem] mt-2 border focus:outline-none rounded-md text-[14px] placeholder:text-[#4D4E4D]`}
                onValueChange={(values) => {
                    const { value } = values;
                    setHasTyped(true); 
                    
                    if (value === '' || value === '0.00') {
                        setFieldValue("repaymentAmount", "");
                        handleFormChange("repaymentAmount","")
                        return;
                    }
                    
                    const numericValue = value.replace(/[^\d.]/g, '');
                    setFieldValue("repaymentAmount", numericValue);
                    handleFormChange("repaymentAmount",numericValue) 
                }}
                onBlur={() => {
                    if (hasTyped) { 
                        setShowErrors(true);
                    }
                }}
            />
            {(shouldShowError && errors.repaymentAmount) && (
                <div className="text-red-500 text-sm mt-1">
                    {errors.repaymentAmount}
                </div>
            )}
        </div>  

        <div className='h-full'>
           <Label htmlFor="FundProductSponsor" className='text-[#212221] text-[12px] font-medium '>Select account to pay from</Label> 
           <div className='mt-3'>
            <AccountMultiSelect 
             options={bankAccounts}
             onValueChange={(values) => {
                setFieldValue("account",values)
                handleFormChange("account",values)
             }}
             placeholder='Select account'
             defaultValue={values.account}
             selectAllcondition={true}
            /> 
            <div className='flex items-center gap-1 mt-2'>
                <MdInfoOutline className='h-[20px] w-[20px] text-[#06792D]'/>
                <span className='text-[#142854] text-[14px]'>You can pay from one or more linked accounts</span>
            </div>
            </div> 
        </div>
        </div>
          <div className='flex item-center justify-end  relative md:mt-0 top-10   md:top-2'>
            <Button
                type='button'
                variant={'secondary'}
                id='continueId'
                className={`md:w-[140px] relative md:top-2 w-full h-[44px] text-[14px] rounded-md font-bold ${
                    !isValid 
                        ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] cursor-not-allowed ' 
                        : 'bg-meedlBlue text-white'
                }`}
                disabled={!isValid }
                onClick={handleContinue}
            >
                Continue
            </Button>
        </div>
        </div> :
        <div>
        <div className={`relative bottom-2 `}>
           <p className='text-[#4D4E4D] text-[18px] font-medium'>Review your transaction</p>
           <div className={`mt-10 grid grid-cols-1 gap-y-4 md:h-[26vh] ${styles.container}`}> 
           <div >
            <p className='text-[12px]'>Loan type</p>
            <p className='text-[#212221] font-medium'>Student living allowance loan for software engineering</p>
             </div>

             <div>
             <p className='text-[12px]'>Amount</p> 
             <p className='text-[#212221] font-medium'>{formatAmount(initialFormValue?.repaymentAmount)}</p>
             </div>

             <div >
                <p className='text-[12px]'>Payment method</p>
                <div className="space-y-3 mt-2">
                    {initialFormValue?.account?.map((account, index) => (
                    <BankAccountItem 
                        key={account.id || index}
                        account={{
                        bankName: account.bankName,
                        accountNumber: account.accountNumber,
                        logo: account.logo
                        }}
                        style={"flex gap-2 items-center"}
                    />
                    ))}
                </div>
            </div>
           </div>
        </div>
        <div className='flex item-center justify-end  relative top-[50px] md:top-4'>
            <button
            id='submitButtonForMakePayment'
            type='submit'
            className='md:w-[140px] w-full h-[44px] font-bold text-[14px] bg-[#142854] rounded-md text-white hover:bg-[#435376] focus:bg-[#142854]' 
            >
                Make payment
            </button>
        </div>
        </div>
        }

            </Form>
        )
      }}  
        
        </Formik> 
        <div>
             <Modal
              isOpen={isOpen}
              closeModal={()=> setIsopen(false)}
              closeOnOverlayClick={true}
                styeleType='styleBodyThree'
             >
            <SuccessfulPayment
            paymentObj={paymentData}
            handleCloseModal={handleModalClose}
            isSuccessful={isSuccessful}
            backButtonText='Back to link account'
            />
             </Modal>
            </div>
    </Border>
  )
}

export default LinkedAccount
