
import React from 'react'
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';


interface Props {
    setIsOpen?: (e: boolean) => void;
    financierId?: string;
    financierType?: string;
    setStep: (e: number) => void
}

interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

function InviteFinanciers({setIsOpen,financierId,financierType,setStep}: Props) {

    const initialFormValue = {
        id:financierId,
        companyName: "",
        firstName: "",
        lastName: "",
        email:"",
        financierType: financierType || ""
    }

    const validationschema = Yup.object().shape({
      firstName: Yup.string()
           .trim()
           .matches(/^[A-Za-z]+$/, 'First name should only contain letters')
           .max(100, "First name cannot be more than 50 characters.")
           .when('financierType', {
            is: 'Individual', 
            then: (schema) => schema.required('First name is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
         lastName: Yup.string()
           .trim()
           .matches(/^[A-Za-z]+$/, 'Last name should only contain letters')
           .max(100, "Last name cannot be more than 50 characters.")
           .when('financierType', {
            is: 'Individual', 
            then: (schema) => schema.required('Last Name is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
         email: Yup.string()
           .trim()
           .email('Invalid email address')
           .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
           .required('Email Address is required'),
         companyName: Yup.string()
              .trim()
              .matches(
                /^[a-zA-Z0-9\-_ ]*$/,
               "Name can include at least a letter and then numbers, hyphens and underscores.",
              )
              .max(200, "Full name cannot be more than 200 characters.")
              .when('financierType', {
                is: 'Company', 
                then: (schema) => schema.required('Company name is required'),
                otherwise: (schema) => schema.notRequired(),
            })
    })

    const handleBack = () => {
          setStep(1); 
        
      };

    const handleSubmit = (values: typeof initialFormValue) => {
       console.log(values)
       if(setIsOpen)
       setIsOpen(false)
      }

  return (
    <div id='invitefinancier'>
     <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationschema}
     >
        {({errors,isValid,touched,setFieldValue}) => (
            <Form>
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
         isLoading={false}
         handleContinueOrBack={handleBack}
         />
        </div>
         </div>
            </Form>
        )}

     </Formik>
    </div>
  )
}

export default InviteFinanciers