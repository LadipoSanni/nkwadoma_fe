import React, { useState } from 'react'
import Border from './Border'
import { Formik, Form,FormikHelpers } from "formik";
import { Label } from '@/components/ui/label';
import {NumericFormat} from 'react-number-format';
import * as Yup from "yup";
import { Button } from '@/components/ui/button'
import { store,useAppSelector } from '@/redux/store';
import { setPaystackAmount } from '@/redux/slice/make-payment/payment';

function Paystack() {
    const [showErrors, setShowErrors] = useState(false);
    const [submitted, setSubmitted] = useState(false);
      const initialState = useAppSelector(state => state?.payment?.payStackAmount)
      const [hasTyped, setHasTyped] = useState(false);

    const initialFormValue = {
        repaymentAmount : initialState ||  ""
    }

      const validationSchema = Yup.object().shape({
            repaymentAmount: Yup.string()
                .trim()
                .required("Required")
                .test('valid-format', 'Invalid amount format', (value) => {
                    if (!value) return false;
                    if (value.startsWith('.')) return false;
                    return true;
                  })
                .test('is-positive', 'Amount must be greater than 0', (value) => {
                    if (!value) return false;
                    const numericValue = parseFloat(value.replace(/,/g, ''));
                    return numericValue > 0;
                })
                .test('min-amount', 'Amount must be greater than 0', (value) => {  
                    if (!value) return false;
                    const numericValue = parseFloat(value.replace(/,/g, ''));
                    return numericValue >= 1; 
                }),
        })

    function handleSubmit(values: typeof initialFormValue, { setSubmitting }: FormikHelpers<typeof initialFormValue>) {
        setHasTyped(true);
        setSubmitted(true);
        console.log('Submitting:', values);
        setSubmitting(false);
    }

  return (
    <Border className='relative bottom-3 md:bottom-0'>
       <Formik
        // key={formKey}
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
              <div>
            <Label htmlFor="repaymentAmount" className='text-[#212221] text-[12px] font-medium'>
                How much would you like to repay?
            </Label>
            <NumericFormat
            id="repaymentAmount"
            name="repaymentAmount"
            type="text"
            inputMode="decimal"
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale={false}
            allowNegative={false}
            placeholder="Enter repayment amount"
            value={values.repaymentAmount}
            className={`w-full p-3 h-[3rem] mt-2 border focus:outline-none rounded-md `}
            onValueChange={(values, sourceInfo) => {
                const { value, formattedValue } = values;
                const { source } = sourceInfo;
                setHasTyped(true);
                
                if (source === 'event' && formattedValue === '.') {
                setFieldValue("repaymentAmount", "");
                store.dispatch(setPaystackAmount(""));
                return;
                }
                

                if (value === '') {
                setFieldValue("repaymentAmount", "");
                store.dispatch(setPaystackAmount(""));
                return;
                }
                
                let cleanValue = formattedValue.replace(/[^\d.]/g, '');

                const decimalParts = cleanValue.split('.');
                if (decimalParts.length > 2) {
                cleanValue = decimalParts[0] + '.' + decimalParts.slice(1).join('');
                }
                
                if (cleanValue === '0') {
                setFieldValue("repaymentAmount", cleanValue);
                store.dispatch(setPaystackAmount(cleanValue));
                return;
                } else if (cleanValue.startsWith('0') && cleanValue.length > 1 && !cleanValue.startsWith('0.')) {
                cleanValue = cleanValue.replace(/^0+/, '');
                }
                
                setFieldValue("repaymentAmount", cleanValue);
                store.dispatch(setPaystackAmount(cleanValue));
            }}
            onBlur={() => {
                if (hasTyped) {
                setShowErrors(true);
                }
            }}
            isAllowed={(values) => {
                const { floatValue } = values;
                if (floatValue === undefined) return true;
                return floatValue >= 0;
            }}
            />
            {(shouldShowError && errors.repaymentAmount) && (
                <div className="text-red-500 text-sm mt-1">
                    {errors.repaymentAmount}
                </div>
            )}
        </div>  

         <div className='flex item-center justify-end mt-56 md:mt-52 relative top-2'>
                    <Button
                        type='submit'
                        variant={'secondary'}
                        id='continueId'
                        className={`md:w-[176px] w-full h-[44px] text-[14px] rounded-md font-bold ${
                            !isValid || !values.repaymentAmount 
                                ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] cursor-not-allowed ' 
                                : 'bg-meedlBlue text-white'
                        }`}
                        disabled={!isValid || !values.repaymentAmount}
                        
                    >
                        Continue to payment
                    </Button>
                </div>
            </Form>
        )
      }}  
        
        </Formik> 
     
    </Border>
  )
}

export default Paystack
