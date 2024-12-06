import React from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {inter} from '@/app/fonts';
import { Label } from '@/components/ui/label';
import Isloading from '@/reuseable/display/Isloading';


interface Props {
    setIsOpen? : (e:boolean) => void;
}

function InviteAdmin({setIsOpen}: Props) {

    const initialFormValue = {
        fullName: "",
        emailAddress: "",
    }
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
         .trim()
        .matches(/^[A-Za-z]+$/, 'First name should only contain letters')
         .required('Full Name is required'),
        emailAddress: Yup.string()
         .trim()
         .email('Invalid email address')
         .matches(/^\S*$/, 'Email address should not contain spaces')
         .required('Email Address is required'),
   
    })

    const isLoading = false

    const handleSubmit = () => {
        // if (setIsOpen) {
        //     setIsOpen(false);
        //   }
      
    }

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }


  return (
    <div>
     <Formik
       initialValues={initialFormValue}
       validateOnMount={true}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}
     >
       {
        ({errors, isValid, touched, setFieldValue}) => (
            <Form className={`${inter.className}`}>
             <div
             className='grid grid-cols-1 gap-y-4'
             >
              <div>
              <Label htmlFor="fullName">Full name</Label> 
              <Field
                id="fullName"
                name="fullName"
                className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                placeholder="Enter full name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                  const value = e.target.value; const regex = /^[A-Za-z\s]+$/; 
                  if (regex.test(value) || value === "") { 
                    setFieldValue("fullName", value); } }}
                />
                 {
                    errors.fullName && touched.fullName &&  (
                    <ErrorMessage
                    name="fullName"
                    id='fullName'
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                }
              </div>
              <div>
              <Label htmlFor="emailAddress">Email address</Label> 
              <Field
                id="emailAddress"
                name="emailAddress"
                className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                placeholder="Enter email address"
                />
                 {
                    errors.emailAddress && touched.emailAddress &&  (
                    <ErrorMessage
                    name="emailAddress"
                    id='emailAddress'
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                }
              </div>
              <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
                <Button 
                id='createProgramCancelButton'
                variant={'outline'} 
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4'
                onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button 
                id='createProgramButton'
                variant={'default'} 
                className={`w-full md:w-36 h-[57px] ${ !isValid? "bg-neutral650 cursor-not-allowed " :"hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`}
                type='submit'
                disabled={!isValid}
                >
                  {isLoading ? <Isloading/>: (
                                                "Invite"
                                            )}
                  
                </Button>
              </div>
             </div>
            </Form>
        )
       }
     </Formik>
    </div>
  )
}

export default InviteAdmin