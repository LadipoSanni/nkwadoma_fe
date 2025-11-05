import React, { useState } from 'react'
import Border from './Border'
import { Formik, Form ,FormikHelpers} from "formik";
import { Label } from '@/components/ui/label';
import {NumericFormat} from 'react-number-format';
import * as Yup from "yup";
import { Button } from '@/components/ui/button'

function LinkedAccount() {
    const [showErrors, setShowErrors] = useState(false);
    const [submitted, setSubmitted] = useState(false);
      const [hasTyped, setHasTyped] = useState(false);

    const initialFormValue = {
        repaymentAmount :  ""
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
        })

    function handleSubmit(values: typeof initialFormValue, { setSubmitting }: FormikHelpers<typeof initialFormValue>) {
            setSubmitted(true);
            console.log('Submitting:', values);
            // setIsopen(true)
            setSubmitting(false);
        }
    
        const handleContinue = () => {
            setShowErrors(true);
            setHasTyped(true);
            // if(currentState === 0) {
            //     store.dispatch(setWalletTab(1))
            // }
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
                    //   store.dispatch(setRepaymentAmount("")); 
                        return;
                    }
                    
                    const numericValue = value.replace(/[^\d.]/g, '');
                    setFieldValue("repaymentAmount", numericValue);
                //   store.dispatch(setRepaymentAmount(numericValue)); 
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
            </Form>
        )
      }}  
        
        </Formik> 
     
    </Border>
  )
}

export default LinkedAccount
