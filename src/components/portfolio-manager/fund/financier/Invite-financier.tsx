import React from 'react'
import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';

// interface ApiError {
//     status: number;
//     data: {
//       message: string;
//     };
//   }

interface Props {
    financierType?: string;
    isloading: boolean;
    isValid: boolean;
    handleBack:() => void;
    errors: { [key: string]: string }; 
    touched: { [key: string]: boolean }; 
  setFieldValue: (field: string, value: string | number | boolean, shouldValidate?: boolean) => void;
}

function inviteFinancier({financierType,isloading,isValid,handleBack,errors,touched,setFieldValue}: Props) {

    
  return (
    <div
    className='grid grid-cols-1 gap-y-4'
    >
       {
         financierType === "Individual"? 
         <div className='grid grid-cols-1 gap-y-4'>
           <div>
               <Label htmlFor='firstName'>First name</Label>
               <Field
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                className="w-full p-3 border rounded focus:outline-none mt-2"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    const regex = /^[A-Za-z]+$/;
                                    if (regex.test(value) || value === "") {
                                      setFieldValue("firstName", value);
                                    }
                                  }}
               />
                {errors.firstName && touched.firstName && (
                                 <ErrorMessage
                                   name="firstName"
                                   component="div"
                                   className="text-red-500 text-sm"
                                 />
                               )}
           </div>
           <div>
               <Label htmlFor='lastName'>Last name</Label>
               <Field
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                className="w-full p-3 border rounded focus:outline-none mt-2"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    const regex = /^[A-Za-z]+$/;
                                    if (regex.test(value) || value === "") {
                                      setFieldValue("lastName", value);
                                    }
                                  }}
               />
                {errors.lastName && touched.lastName && (
                                 <ErrorMessage
                                   name="lastName"
                                   component="div"
                                   className="text-red-500 text-sm"
                                 />
                               )}
           </div>
         </div>
          
          : 
          <div>
          <Label htmlFor='companyName'>Full name</Label>
          <Field
           id="companyName"
           name="companyName"
           placeholder="Enter full name"
           className="w-full p-3 border rounded focus:outline-none mt-2"
            
          />
           {errors.companyName && touched.companyName && (
                            <ErrorMessage
                              name="companyName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          )}
      </div>
       }
   <div>
   <Label htmlFor='email'>Email</Label>
   <Field
       id="email"
       name="email"
       className="w-full p-3 border rounded focus:outline-none mt-2"
       placeholder="Enter email address"
       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value.replace(/\s+/g, ''))}
   />
     {
       errors.email && touched.email && (
           <ErrorMessage
               name="email"
               component="div"
               className="text-red-500 text-sm"
           />
       )
   }
   </div>
   <div>
    <SubmitAndCancelButton
    isValid={isValid}
    submitButtonName='Invite'
    hasBack={true}
    isLoading={isloading}
    handleContinueOrBack={handleBack}
    />
   </div>
    </div>
  )
}

export default inviteFinancier