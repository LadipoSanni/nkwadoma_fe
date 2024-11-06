import React from 'react'
import { Formik, } from 'formik'
import * as Yup from 'yup';
import {inter} from "@/app/fonts"
// import { Input } from '@/components/ui/input';
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
// import { Label } from '@/components/ui/label';
// import { Button } from '@/components/ui/button';
// import loadingLoop from "@iconify/icons-line-md/loading-loop";
// import {Icon} from "@iconify/react";
// import { initialize } from 'next/dist/server/lib/render-server';


type Props = {
    programId : string;
   setIsOpen? : (e:boolean) => void;
}

function EditProgramForm({programId}: Props) {

    const initialFormValue = {
        programId: programId,
        programName: 'New Program',
        programDeliveryType: 'Online',
        programMode: 'Full Time',
        programDuration: '3',
        programDescription: 'This is a new program',
    }

    const validationSchema = Yup.object().shape({
      programName: Yup.string()
       .trim()
      .required('Program name is required'),
      programDeliveryType:Yup.string()
      .required('Program delivery type is required'),
      programMode:Yup.string()
      .required('Program Mode is required'),
      programDescription: Yup.string()
       .trim()
      .required('Cohort Description is required'),
      programDuration:  Yup.number()
      .positive('Program duration must be a positive number')
      .required('Program duration is required')
      .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)
    });
  
     const toastPopUp = ToastPopUp({
      description: "Program details successfully updated.",
      status:"success"
      
    });
    

    // const handleCloseModal = () => {
    //     if (setIsOpen) {
    //       setIsOpen(false);
    //     }
    //   }
    
  function handleSubmit(values: typeof initialFormValue) {
    console.log(values);
    toastPopUp.showToast();
   
  }

  return (
    <div>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount={true}
        >
         {/* {
            ({errors, isValid, touched}) => (
              <Form className={`${inter.className}`}>
                <div
                className='grid grid-cols-1 gap-y-4'
                >
                  <div>

                  </div>

                </div>

              </Form>
            )
         } */}
        </Formik>
        EditProgramForm
        </div>
  )
}

export default EditProgramForm