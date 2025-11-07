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
import { useViewObligorLimitQuery,useSetUpObligorLimitMutation } from "@/service/admin/overview";
import Isloading from "@/reuseable/display/Isloading";
import {useToast} from "@/hooks/use-toast";
import {Skeleton} from '@/components/ui/skeleton'

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

function Loan() {
    const [selectCurrency, setSelectCurrency] = useState('NGN');
    const [setUpObligorLimit,{isLoading}] = useSetUpObligorLimitMutation()
    const [error, setError] = useState('');
     const {toast} = useToast();
    const {data,isLoading:isViewLoading,refetch} = useViewObligorLimitQuery({})
    
    const initialFormValue = {
                obligorLimit: data?.data && data.data > 0 ? data.data.toString() : ""
             }


const validationSchema = Yup.object().shape({
                obligorLimit: Yup.number()
                    .required("Obligor limit is required")
                    .min(1, "Obligor limit must be greater than 0")
            });

    const handleSubmit = async (values: typeof initialFormValue) => {
         const param = {
            obligorLoanLimit: parseFloat(values?.obligorLimit || "0")
         }
         try {
            const result = await setUpObligorLimit(param).unwrap()
            if(result){
                refetch()
                setError(''); 
                toast({
                    description: result.message,
                    status: "success",
                    duration: 1500
             });  
            }
            
         } catch (err) {
            const error = err as ApiError;
            setError(error ? error?.data?.message : "Error occurred");
         }
         
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
                enableReinitialize={true}
            >
                {
                    ({errors, isValid, touched, setFieldValue,setFieldTouched, dirty }) => {

                        const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                            validateNumber("obligorLimit", setFieldValue)(e);
                        };

                        const handleFieldFocus = () => {
                            setFieldTouched("obligorLimit", true, false);
                        };

                        const shouldDisableButton = !isValid || !dirty;
                        
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
                      {  
                    isViewLoading? 
                    <div className="w-full relative bottom-1 border border-solid rounded-md h-[3rem] pr-10 pl-2 py-4 flex items-center">      
                    <Skeleton className="h-8 w-full bg-[#F6F6F6]"/>
                     </div> 
                    :   
                     <Field
                      id="obligorLimitId"
                      name="obligorLimit"
                      type="number"
                      component={CustomInputField}
                       className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2 "
                       onChange={handleFieldChange} 
                     onFocus={handleFieldFocus}
                    />
                    }
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
                        className={`h-11 w-full ${shouldDisableButton? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                        variant={"secondary"}
                        type={"submit"}
                        disabled={shouldDisableButton}
                    >
                          { isLoading? <Isloading/> : "Confirm"}
                    </Button>
                        </div>
                        {error && (
                                    <div className="text-red-500 text-sm mt-2 text-center">
                                        {error}
                                    </div>
                         )}
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

