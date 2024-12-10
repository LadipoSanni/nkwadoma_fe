import React,{useState} from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import {inter} from "@/app/fonts"
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import CustomSelect from '@/reuseable/Input/Custom-select';
import { useUpdateProgramMutation } from '@/service/admin/program_query';
import { useQueryClient } from '@tanstack/react-query';

interface ProgramDetail {
    id: string;
    programDescription: string;
    name: string;
    durationType: string;
    programStartDate: string;
    duration: number;
    mode: string;
    deliveryType: string;
    totalAmountRepaid: number;
    totalAmountDisbursed: number;
    totalAmountOutstanding: number;
}





type Props = {
    programId : string;
   setIsOpen? : (e:boolean) => void;
   programDetail?: ProgramDetail
}

interface ApiError {
  status: number;
  data: {
      message: string;
  };
}




function EditProgramForm({programId,setIsOpen,programDetail}: Props) {
  const [updateProgram, { isLoading }] = useUpdateProgramMutation();
  const queryClient = useQueryClient();
  const [error, setError] =  useState('');

    const initialFormValue = {
        id: programDetail?.id,
        name: programDetail?.name,
        deliveryType: programDetail?.deliveryType,
        mode: programDetail?.mode,
        duration: programDetail?.duration,
        programDescription: programDetail?.programDescription || "",
    }

    // const [isButtonLoading] = useState(false);
    const maxChars = 2500;

    const programDeliveryTypes = ["ONSITE", "ONLINE","HYBRID"];
    const programModes=["FULL_TIME", "PART_TIME"]
    // const programDurations=[1,3,4,5,6]

    const validationSchema = Yup.object().shape({
      name: Yup.string()
       .trim()
      .required('Program name is required'),
      deliveryType:Yup.string()
      .required('Program delivery type is required'),
      mode:Yup.string()
      .required('Program Mode is required'),
      duration:  Yup.string()
      .required('Program duration is required')
      .matches(/^[1-9]\d*$/, 'Program duration must be a positive number and cannot start with zero')
      .test('positive-number', 'Program duration must be a positive number', (value) => {
          return value !== undefined && Number(value) > 0;
      }),
      programDescription: Yup.string()
       .trim()
       .required('Program Description is required')
       .max(2500, 'Program description must be 2500 characters or less')
    });
  
     const toastPopUp = ToastPopUp({
      description: "Program details successfully updated.",
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
    
    try {
      await updateProgram({ id:programId, data: values }).unwrap();
     queryClient.invalidateQueries({ queryKey: ['program'] });
      toastPopUp.showToast();
      if (setIsOpen) {
        setIsOpen(false);
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error?.data?.message );
      // setError(err instanceof Error ? err.message : 'An error occurred try again later');
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
                  name="name"
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter program name"
                  /> 
                  {
                    errors.name && touched.name &&  (
                       <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                    id='editProgramNameError'
                    />
                    )
                   }
              
                  </div>
                  <div>
                    <Label htmlFor="programDeliveryType">Program delivery type</Label>
                  
                    <CustomSelect
                      triggerId='editProgramDeliveryTypeTriggerId'
                      id="editProgramDeliveryType"
                      selectContent={programDeliveryTypes}
                      value={values.deliveryType} 
                      onChange={(value) => setFieldValue("deliveryType", value)} 
                      name="deliveryType"
                      placeHolder='Select a program Delivery Type'
                    />
                     {
                    errors.deliveryType && touched.deliveryType &&  (
                       <ErrorMessage
                    name="deliveryType"
                    id='editDeliveryTypeError'
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
                      triggerId='editProgramModeTriggerId'
                      id="editProgramModalSelect"
                      selectContent={programModes}
                      value={values.mode} 
                      onChange={(value) => setFieldValue("mode", value)} 
                      name="mode"
                      placeHolder='Select a program Mode'
                     
                    />
                     {
                    errors.mode && touched.mode &&  (
                       <ErrorMessage
                    name="mode"
                    component="div"
                    id='editModeError'
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                  </div>
                   <div className='md:mt-1'>
                    <Label htmlFor="duration">Program duration</Label>
                    {/* <CustomSelect
                      selectContent={programDurations}
                      value={values.duration} 
                      onChange={(value) => setFieldValue("duration", value)} 
                      name="duration"
                      placeHolder='Select a program Duration'
                     
                    /> */}
                      <Field
                        id="duration"
                        name="duration"
                        // type="number"
                        className="w-full p-3 md:h-[3.2rem] border rounded focus:outline-none mt-2 text-sm"
                        placeholder="Enter program duration"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                              setFieldValue("duration", value);
                          }
                      }}
                        /> 

                     {
                    errors.duration && touched.duration &&  (
                       <ErrorMessage
                    name="duration"
                    id='editProgramDurationError'
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
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { 
                    const value = e.target.value; 
                    if (value.length <= maxChars) { 
                      setFieldValue("programDescription", value); } }} 
                  onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => { 
                    const paste = e.clipboardData.getData('text'); 
                    if (paste.length + values.programDescription.length > maxChars) { 
                      e.preventDefault(); 
                      setError('Program description must be 2500 characters or less'); } }}
                  /> 
                  {
                    errors.programDescription && touched.programDescription &&  (
                       <ErrorMessage
                    name="programDescription"
                    component="div"
                    id='editprogramDescriptionError'
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                </div>
                <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
                <Button 
                 id='editProgramCancelButton'
                variant={'outline'} 
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4'
                onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button 
                id='editProgramSaveButton'
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
                {
                <div id='errorFromBackEnd' className={`text-error500 flex justify-center items-center ${error? "mb-3" : ""}`}>{error}</div>
            }
              </Form>
            )
         }
        </Formik>
       
        </div>
  )
}

export default EditProgramForm