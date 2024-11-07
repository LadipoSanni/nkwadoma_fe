import React,{useState} from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import {inter} from "@/app/fonts"
import { Input } from '@/components/ui/input';
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import CustomSelect from '@/reuseable/Input/Custom-select';


type Props = {
    programId : string;
   setIsOpen? : (e:boolean) => void;
}

function EditProgramForm({programId,setIsOpen}: Props) {

    const initialFormValue = {
        programId: programId,
        programName: 'New Program',
        programDeliveryType: 'Full Time',
        programMode: 'Online',
        programDuration: '3years',
        programDescription: 'This is a new program',
    }

    const [isLoading] = useState(false);
    const maxChars = 1500;

    const programDeliveryTypes = ["Full Time", "Part Time"];
    const programModes=["Online", "Physical"]
    const programDurations=["3years", "4years"]

    const validationSchema = Yup.object().shape({
      programName: Yup.string()
       .trim()
      .required('Program name is required'),
      programDeliveryType:Yup.string()
      .required('Program delivery type is required'),
      programMode:Yup.string()
      .required('Program Mode is required'),
      programDuration:  Yup.string()
      .required('Program duration is required'),
      programDescription: Yup.string()
       .trim()
       .required('Program Description is required')
       .max(2500, 'Program description must be 2500 characters or less')
    });
  
     const toastPopUp = ToastPopUp({
      description: "Program details successfully updated.",
      status:"success"
      
    });
    

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }
    
  function handleSubmit(values: typeof initialFormValue) {
    console.log(values);
    toastPopUp.showToast();
    if (setIsOpen) {
      setIsOpen(false);
    }
   
  }

  return (
    <div>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount={true}
        >
         {
            ({errors, isValid, touched,setFieldValue,values}) => (
              <Form className={`${inter.className}`}>
                <div
                className='grid grid-cols-1 gap-y-4'
                >
                  <div>
                  <Label htmlFor="programName">Program name</Label>
                  <Field
                  id="programName"
                  name="programName"
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter program name"
                  /> 
                  {
                    errors.programName && touched.programName &&  (
                       <ErrorMessage
                    name="programName"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                   }
              
                  </div>
                  <div>
                    <Label htmlFor="programDeliveryType">Program delivery type</Label>
                  
                    <CustomSelect
                      selectContent={programDeliveryTypes}
                      value={values.programDeliveryType} 
                      onChange={(value) => setFieldValue("programDeliveryType", value)} 
                      name="programDeliveryType"
                      placeHolder='Select a program Delivery Type'
                    />
                     {
                    errors.programDeliveryType && touched.programDeliveryType &&  (
                       <ErrorMessage
                    name="programDeliveryType"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                  </div>
                <div className='grid md:grid-cols-2 gap-4 w-full'>
                  <div>
                    <Label htmlFor="programMode">Program mode</Label>
                    <CustomSelect
                      selectContent={programModes}
                      value={values.programMode} 
                      onChange={(value) => setFieldValue("programMode", value)} 
                      name="programMode"
                      placeHolder='Select a program Mode'
                     
                    />
                     {
                    errors.programMode && touched.programMode &&  (
                       <ErrorMessage
                    name="programMode"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                  </div>
                   <div>
                    <Label htmlFor="programDuration">Program duration</Label>
                    <CustomSelect
                      selectContent={programDurations}
                      value={values.programDuration} 
                      onChange={(value) => setFieldValue("programDuration", value)} 
                      name="programDuration"
                      placeHolder='Select a program Duration'
                     
                    />
                     {
                    errors.programDuration && touched.programDuration &&  (
                       <ErrorMessage
                    name="programDuration"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                  }
                   </div>
                </div>
                <div>
                  <Label htmlFor="programDescription">Program description</Label>
                  <Field
                  as="textarea"
                  id="programDescription"
                  name="programDescription"
                  className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"
                  placeholder="Enter program description"
                  rows={4}
                  maxLength={maxChars}
                  /> 
                  {
                    errors.programDescription && touched.programDescription &&  (
                       <ErrorMessage
                    name="programDescription"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                </div>
                <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
                <Button 
                variant={'outline'} 
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4'
                onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button 
                variant={'default'} 
                className={`w-full md:w-36 h-[57px] ${ !isValid? "bg-neutral650 cursor-not-allowed " :"hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`}
                type='submit'
                disabled={!isValid}
                >
                  {isLoading ? (
                                                <div id={'loadingLoopIconDiv'} className="flex items-center justify-center">
                                                    <Icon id={'Icon'} icon={loadingLoop} width={34} height={32}  style={{
                                                animation: 'spin 1s linear infinite',
                                                strokeWidth: 6, 
                                                display: 'block',
                                                    }}/>
                                                </div>
                                            ) : (
                                                "Save"
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

export default EditProgramForm