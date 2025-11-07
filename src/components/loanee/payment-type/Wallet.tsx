import React, { useState } from 'react'
import Border from './Border'
import { formatAmount } from '@/utils/Format';
import { Formik, Form,FormikHelpers} from "formik";
import * as Yup from "yup";
import {NumericFormat} from 'react-number-format';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { setWalletTab,setRepaymentAmount } from '@/redux/slice/make-payment/payment';
import { store,useAppSelector } from '@/redux/store';
import Modal from '@/reuseable/modals/TableModal';
import SuccessfulPaymentAndFailure from '@/reuseable/documents/Successful-payment-and-failure';
import { inter } from '@/app/fonts';

function Wallet() {
    const [showErrors, setShowErrors] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);
    const currentState = useAppSelector(state => state?.payment?.walletTab)
    const repaymentAmount = useAppSelector(state => state?.payment?.repaymentAmount)
    const [isOpen, setIsopen] = useState(false)
    const [formKey, setFormKey] = useState(0); 
    const [isSuccessful, setIsSuccessful] = useState(false)

     const paymentData = {
        referenceNumber: "000085752257",
        dateTime: "22, Feb 2024, 07:80 AM",
        paymentMethod: "Wallet",
        amount: repaymentAmount || ""
      };

    const initialFormValue = {
        repaymentAmount : repaymentAmount ||  ""
    }

    const walletBalance = 3000000
    
    const validationSchema = Yup.object().shape({
        repaymentAmount: Yup.string()
            .trim()
            .required("Required")
            .test('is-positive', 'Amount must be greater than 0', (value) => {
                if (!value) return false;
                const numericValue = parseFloat(value.replace(/,/g, ''));
                return numericValue > 0;
            })
            .test('not-exceed-balance', 'Amount cannot exceed your wallet balance', (value) => {
                if (!value) return false;
                const numericValue = parseFloat(value.replace(/,/g, ''));
                return numericValue <= walletBalance;
            }),
            
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
            store.dispatch(setWalletTab(1))
        }
    }

    const handleModalClose = () => {
        setIsopen(false);
        store.dispatch(setWalletTab(0));
        store.dispatch(setRepaymentAmount(""));
        setFormKey(prev => prev + 1); 
        setShowErrors(false);
        setHasTyped(false);
        setSubmitted(false);
    }

    return (
        <Border className={`${inter.className}  ${currentState === 1 && "border-[#D7D7D7]"}`}>
            <div>
                
            <div className=''>
               { currentState === 0 && <div className='py-3 bg-[#F0F0F0] px-7 rounded-md'>
                    <p className='text-[#4D4E4D] text-[14px] font-medium'>Your wallet balance</p>
                    <p className='text-[#212221] text-[18px] font-medium mt-2'>
                        {formatAmount(walletBalance)}
                    </p>
                </div>}

                <div className='md:mt-8 mt-5'>
                   { walletBalance > 0? <Formik
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
                                            className={`w-full p-3 h-[3rem] mt-2 border focus:outline-none rounded-md `}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                setHasTyped(true); 
                                                
                                                if (value === '' || value === '0.00') {
                                                    setFieldValue("repaymentAmount", "");
                                                    store.dispatch(setRepaymentAmount("")); 
                                                    return;
                                                }
                                                
                                                const numericValue = value.replace(/[^\d.]/g, '');
                                                setFieldValue("repaymentAmount", numericValue);
                                                store.dispatch(setRepaymentAmount(numericValue)); 
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

                                    <div className='flex item-center justify-end mt-32 md:mt-28 relative top-2'>
                                        <Button
                                            type='button'
                                            variant={'secondary'}
                                            id='continueId'
                                            className={`md:w-[140px] w-full h-[44px] text-[14px] rounded-md font-bold ${
                                                !isValid || !values.repaymentAmount 
                                                    ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] cursor-not-allowed ' 
                                                    : 'bg-meedlBlue text-white'
                                            }`}
                                            disabled={!isValid || !values.repaymentAmount}
                                            onClick={handleContinue}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                    </div>
                                     : 
                                     <div className='relative bottom-2 md:bottom-10'>
                                        <p className='text-[#4D4E4D] text-[18px]'>Review your payment</p>
                                        <div className='mt-10 grid grid-cols-1 gap-y-4'>
                                        <div >
                                            <p className='text-[12px]'>Loan type</p>
                                            <p className='text-[#212221] font-medium'>Student living allowance loan for software engineering</p>
                                        </div>

                                        <div >
                                            <p className='text-[12px]'>Amount</p>
                                            <p className='text-[#212221] font-medium'>{formatAmount(repaymentAmount)}</p>
                                        </div>

                                        <div >
                                            <p className='text-[12px]'>Payment method</p>
                                            <p className='text-[#212221] font-medium'>Wallet</p>
                                        </div>
                                        </div>
                                        <div className='flex item-center justify-end mt-16 relative top-[50px]'>
                                            <Button
                                            id='submitButtonForMakePayment'
                                            type='submit'
                                            variant={"secondary"}
                                            className='md:w-[140px] w-full h-[44px] font-bold text-[14px]'
                                            >
                                                Make payment
                                            </Button>
                                        </div>
                                     </div>
                                    }
                                </Form>
                            )
                        }}
                    </Formik>  :
                    <div className='flex flex-col items-center justify-center py-20 gap-y-5'>
                       <p className='text-[14px] text-[#101828] font-medium'>Your wallet balance is empty</p> 
                       <Button
                        type='button'
                        variant={"outline"}
                        className=' text-[#142854] w-[90px] h-[26px] rounded-2xl text-[12px] border-[#142854] border-[1px]'
                       >
                        Fund wallet 
                       </Button>
                    </div>
                    }
                </div>
            </div>
            </div>
            <div>
             <Modal
              isOpen={isOpen}
              closeModal={()=> setIsopen(false)}
              closeOnOverlayClick={true}
                styeleType='styleBodyThree'
             >
            <SuccessfulPaymentAndFailure
            paymentObj={paymentData}
            handleCloseModal={handleModalClose}
            isSuccessful={isSuccessful}
            />
             </Modal>
            </div>
        </Border>
    )
}

export default Wallet