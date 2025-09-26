'use client'
import React, { useState} from "react";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import 'react-quill-new/dist/quill.snow.css'
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
import { validateNumber} from "@/utils/Format";

function Loan() {
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const initialFormValue = {
                obligorLimit: ""
             }

    const validationSchema = Yup.object().shape({
        obligorLimit: Yup.string().required("Obligor limit is required"),
    });

    const handleSubmit = async (values: typeof initialFormValue) => {
          console.debug(values)
    };  

  return (
    <div className={`${inter.className} px-5 md:px-60 lg:px-96 mt-20 `}>
        <div className="grid grid-cols-1 gap-y-9">
        <div className='grid grid-cols-1 gap-y-2'>
        <h1 className='text-[18px] font-normal'>
           Obligor limit 
        </h1>    
        <p className='text-[14px] text-[#4D4E4D]'>
             setup obligor limit for all loans
       </p>
         <div className='h-[1px] bg-[#D7D7D7] mt-3'></div>
       </div>        
       <div>
       <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
                validateOnChange={true}
                validateOnBlur={true} 
            >
                {
                    ({errors, isValid, touched, setFieldValue}) => {
                        
                        return (
                        <Form >
                        <div>
                         <Label htmlFor="overTime">Over-time</Label>    
                         <div className="flex items-center gap-2">
                         <div className={``}>
                            <CurrencySelectInput readOnly={false}
                                                    selectedcurrency={selectCurrency}
                                                    setSelectedCurrency={setSelectCurrency}
                                                    className={`h-12`}/>
                        </div>
                        <Field
                      id="obligorLimitId"
                      name="obligorLimit"
                      type="text"
                      component={CustomInputField}
                       className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2 "
                      onChange={validateNumber("obligorLimit", setFieldValue)}
                    />
                         </div>
                          <div className="relative bottom-1">
                            {errors.obligorLimit && touched.obligorLimit && (
                            <ErrorMessage
                                name="obligorLimit"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                            )}
                        </div>

                        <div className="mt-3">
                         <Button
                        className={`h-11 w-full ${!isValid ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                        variant={"secondary"}
                        type={"submit"}
                        disabled={!isValid}
                    >
                           Confirm
                    </Button>
                        </div>

                        </div>   
                        </Form>
                    )}
                }
            </Formik>
       </div>
       </div>
        
    </div>
  )
}

export default Loan

