import React,{useState} from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import {inter} from "@/app/fonts"
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Isloading from '@/reuseable/display/Isloading';
import CustomSelect from '@/reuseable/Input/Custom-select';
// import { useQueryClient } from '@tanstack/react-query';
import {useCreateProgramMutation} from "@/service/admin/program_query";
import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';
import  QuillFieldEditor  from '@/reuseable/textArea/Quill-field';
// import FormikCustomQuillField from "@/reuseable/textArea/FormikCustomQuillField";


type Props = {
    
   setIsOpen? : (e:boolean) => void;
   
}

interface ApiError {
  status: number;
  data: {
      message: string;
  };
}

function CreateProgram({setIsOpen}:Props) {
 
  const [createProgram,{isLoading}] = useCreateProgramMutation();
  const [error, setError] =  useState('');

    const initialFormValue = {
        programName: "",
        deliveryType: "",
        programMode: "",
        programDuration: "",
        programDescription: "",
    }

    
    // const maxChars = 2500;

    const programDeliveryTypes = ["ONSITE", "ONLINE","HYBRID"];
    // const programModes=["FULL_TIME", "PART_TIME"]
    const programModes = [ { value: "FULL_TIME", label: "Full Time" }, { value: "PART_TIME", label: "Part Time" } ];
    const programDurations=Array.from({ length: 24 }, (_, i) => (i + 1).toString());

   


    const validationSchema = Yup.object().shape({
        programName:Yup.string()
       .trim()
      //  .matches(/^[a-zA-Z\s_-]+$/, 'Program name can only contain letters, underscores, hyphens, and spaces.')
      .max(200, "Program name cannot be more than 200 characters.")
      .test(
        "valid-name",
        "Program name can include at least a letter and then numbers, hyphens and underscores.",
        (value = "") => {
        const regex = /^[a-zA-Z0-9\s-_]*$/;
        const onlyNumbersOrSpecials = /^[^a-zA-Z]*$/;
        return regex.test(value) && !onlyNumbersOrSpecials.test(value);
        }
      )
      .required('Program name is required'),
      deliveryType:Yup.string()
      .required('Program delivery type is required'),
      programMode:Yup.string()
      .required('Program mode is required'),
      programDuration:  Yup.string()
      .matches(/^(?!0)\d+$/, 'Program duration must be a number and cannot start with zero.')
      .required('Program duration is required'),
      programDescription: Yup.string()
       .trim()
      //  .required('Program Description is required')
        .max(2500, 'Program description must be 2500 characters or less')
    });

    
  
     const toastPopUp = ToastPopUp({
      description: "Program Created successfully.",
      status:"success"
      
    });

    const networkPopUp =  ToastPopUp({
      description: "No internet connection",
      status: "error",
      
    });
    

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }
    
    async function handleSubmit  (values: typeof initialFormValue) {
      if (!navigator.onLine) {
        networkPopUp.showToast();
        if (setIsOpen) {
          setIsOpen(false);
        }
        return 
    }
    
    const payload = {
    programName: values.programName,
    programDescription: values.programDescription,
    programDuration: values.programDuration,
    deliveryType: values.deliveryType,
    programMode: values.programMode,
  };
    try { 
    
     const create = await createProgram(payload).unwrap();
     if(create) {
    //  queryClient.invalidateQueries({ queryKey: ['program'] });
      toastPopUp.showToast();
      if (setIsOpen) {
        setIsOpen(false);
      }
     
    }} catch (err) {
      const error = err as ApiError;
      setError(error ? error?.data?.message : "Error occured" );
     
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
                // className='grid grid-cols-1 gap-y-4'
                className='grid grid-cols-1 gap-y-4 md:max-h-[56.5vh] overflow-y-auto'
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',

                }}
                >
                  <div>
                  <Label htmlFor="programName">Program name</Label>
                  <Field
                  id="programName"
                  name="programName"
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter program name"
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                  //   const value = e.target.value; const regex = /^[a-zA-Z\s_-]*$/; 
                  //   if (regex.test(value)) { 
                  //     setFieldValue("programName", value); } }}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                  //   const regex = /^[a-zA-Z0-9\s_'-.,&/():]*$/;
                  //  const onlyNumbersOrSpecials = /^[^a-zA-Z]*$/;    
                  //   const value = e.target.value;
                  //   if (regex.test(value) && !onlyNumbersOrSpecials.test(value)) { 
                  //     setFieldValue("programName", value); 
                  //   }
                  // }}
                  /> 
                  {
                    errors.programName && touched.programName &&  (
                       <ErrorMessage
                    name="programName"
                    id='programNameError'
                    component="div"
                    className="text-red-500 text-sm"
                    />
                    )
                   }
              
                  </div>
                  <div >
                    <Label htmlFor="programDeliveryType">Program delivery type</Label>
                  
                    <CustomSelect
                     triggerId='deliveryTypeTriggerId'
                      id="deliveryTypeSelect"
                      selectContent={programDeliveryTypes}
                      value={values.deliveryType} 
                      onChange={(value) => setFieldValue("deliveryType", value)} 
                      name="deliveryType"
                      placeHolder='Select a program delivery type'
                    />
                     {
                    errors.deliveryType && touched.deliveryType &&  (
                       <ErrorMessage
                    name="deliveryType"
                    component="div"
                    id='deliveryTypeError'
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                  </div>
                <div className='grid md:grid-cols-2 gap-4 w-full'>
                  <div>
                    {/* <Label htmlFor="programMode"
                     style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '100%', }}
                    >Program mode</Label> */}
                     <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none',
                       msOverflowStyle: 'none'}}> 
                    <Label htmlFor="minimumAmount" style={{ display: 'inline-block',WebkitOverflowScrolling: 'touch'  }}>Program mode</Label> 
                    </div>
                    <CustomSelectObj
                     triggerId='programModeTriggerId'
                      id="programModalSelect"
                      selectContent={programModes}
                      value={values.programMode} 
                      onChange={(value) => setFieldValue("programMode", value)} 
                      name="programMode"
                      placeHolder='Select a mode'
                     
                    />
                     {
                    errors.programMode && touched.programMode &&  (
                       <ErrorMessage
                    name="programMode"
                    component="div"
                    id='programModeError'
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                  </div>
                   <div className=''>
                    {/* <Label htmlFor="duration"
                      className="overflow-x-auto whitespace-nowrap max-w-full md:max-w-[100px]"
                     style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '100%', }}
                    >Program duration (Months)</Label> */}
                    <div 
                    style={{ 
                      overflowX: 'auto', 
                      whiteSpace: 'nowrap' ,
                      scrollbarWidth: 'none',
                       msOverflowStyle: 'none'
                      }}> 
                    <Label htmlFor="programDuration" style={{ display: 'inline-block',WebkitOverflowScrolling: 'touch' }}>Program duration (months)</Label>
                    </div>
                    <CustomSelect
                      selectContent={programDurations}
                      value={values.programDuration} 
                      onChange={(value) => setFieldValue("programDuration", value)} 
                      name="programDuration"
                      placeHolder='Select a duration'
                     
                    />
                      {/* <Field
                        id="duration"
                        name="programDuration"
                        // type="number"
                        className="w-full p-3 md:h-[3.2rem] border rounded focus:outline-none mt-2 text-sm"
                        placeholder="Enter program duration"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          if (/^(?!0)\d*$/.test(value)) { 
                              setFieldValue("programDuration", value); 
                          }
                      }}
                        />  */}

                     {
                    errors.programDuration && touched.programDuration &&  (
                       <ErrorMessage
                    name="programDuration"
                    component="div"
                    id='programDurationError'
                    className="text-red-500 text-sm"
                    />
                    )
                  }
                   </div>
                </div>
                <div>
                  <Label htmlFor="programDescription">Program description</Label>
                  {/* <Field
                  as="textarea"
                  id="programDescription"
                  name="programDescription"
                  className="w-full p-3 border rounded focus:outline-none mt-2 resize-none text-sm"
                  placeholder="Enter program description"
                  rows={4}
                  maxLength={maxChars}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { 
                    const value = e.target.value; 
                    if (value.length <= maxChars) { 
                      setFieldValue("programDescription", value); } }} 
                  onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => { 
                    const paste = e.clipboardData.getData('text'); 
                    if (paste.length + values.programDescription.length > maxChars) { 
                      e.preventDefault(); 
                      setError('Program description must be 2500 characters or less'); } }}
                  />  */}
                   <QuillFieldEditor
                      name="programDescription"
                      errorMessage="Program description must be 2500 characters or less"
                      errors={errors}
                      touched={touched}
                     />
                     {/* <Field
                      name="programDescription"
                      component={FormikCustomQuillField}
                      maximumDescription={2500}
                      placeholder={"Enter program description..."}
                     /> */}
                  {/* {
                    errors.programDescription && touched.programDescription &&  (
                       <ErrorMessage
                    name="programDescription"
                    component="div"
                    id='programDescriptionError'
                    className="text-red-500 text-sm"
                    />
                    )
                   } */}
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
                variant={"secondary"}
                className={`w-full md:w-36 h-[57px] ${ !isValid? "bg-[#D7D7D7] hover:bg-[#D7D7D7] " :" bg-meedlBlue cursor-pointer"}`}
                type='submit'
                disabled={!isValid}
                >
                  {isLoading ? <Isloading/>: (
                                                "Save"
                                            )}
                  
                </Button>
              </div>

                </div>
                {
                <div id='createProgramErrorFromBackend' className={`text-error500 flex justify-center items-center`}>{error}</div>
                 }

              </Form>
            )
         }
        </Formik>
       
        </div>
  )
}

export default CreateProgram

