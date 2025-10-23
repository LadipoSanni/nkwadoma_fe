import React,{useState} from 'react'
import { Formik,Form,Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import {inter} from "@/app/fonts"
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Isloading from '@/reuseable/display/Isloading';
import CustomSelect from '@/reuseable/Input/Custom-select';
import {useCreateProgramMutation,useUpdateProgramMutation} from "@/service/admin/program_query";
import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';
import  QuillFieldEditor  from '@/reuseable/textArea/Quill-field';
import { formatPlaceName } from "@/utils/GlobalMethods";
import { setInitialProgramFormValue,resetInitialProgramFormValue } from '@/redux/slice/program/programSlice';
import { useAppSelector,store } from '@/redux/store';
import { useToast } from "@/hooks/use-toast";
import { programApi } from '@/service/admin/program_query';

type Props = {
    isEdit?: boolean,
   setIsOpen? : (e:boolean) => void;
   
}

interface ApiError {
  status: number;
  data: {
      message: string;
  };
}

function CreateProgram({setIsOpen,isEdit}:Props) {
  const initialProgramValue = useAppSelector((state) => state?.program?.initialProgramFormValue)
  const programDetail  = useAppSelector((state) => state?.program?.programDetail)
  const [createProgram,{isLoading}] = useCreateProgramMutation();
  const [updateProgram, { isLoading:isEditLoading }] = useUpdateProgramMutation();
  const [error, setError] =  useState('');
     const { toast } = useToast();
  // const [charCount] = useState(0);
  // const [charCountError, setCharCountError] = useState("");
  const maxChars = 2500;

  const extractPlainText = (html: string): string => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  };

    const initialFormValue = {
        id: initialProgramValue?.id || "",
        programName:initialProgramValue?.programName || "",
        deliveryType: initialProgramValue?.deliveryType ||  "",
        programMode: initialProgramValue?.programMode ||  "",
        programDuration: initialProgramValue?.programDuration ||  "",
        programDescription: initialProgramValue?.programDescription ||  "",
    }

    // useEffect(() => {
    //   if(charCount > maxChars){
    //    setCharCountError('Program description must be 2500 characters or less')
    //    console.log("Error: ",charCountError)
    //   }else {
    //     setCharCountError("")
    //     console.log("No error: ",charCountError)
    //   }

    // },[charCount])

    const handleFormChange = (field: string, value: string ) => {
         const currentField = initialProgramValue || {
          id: "",
          programName: "",
          deliveryType:  "",
          programMode:  "",
          programDuration:  "",
          programDescription:  "",
         };
         store.dispatch(setInitialProgramFormValue({
          ...currentField,
          [field]: value   
         }));
    }

  
    const programModes = [ { value: "FULL_TIME", label: "Full time" }, { value: "PART_TIME", label: "Part time" } ];
    const programDurations=Array.from({ length: 24 }, (_, i) => (i + 1).toString());
    const programDeliveryType = [ { value: "ONSITE", label: "Onsite" }, { value: "ONLINE", label: "Online" },{ value: "HYBRID", label: "Hybrid" } ];

   


    const validationSchema = Yup.object().shape({
        programName:Yup.string()
       .trim()
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
      .test('maxChars', 'Program description must be 2500 characters or less', (value) => {
        if (!value) return true; 
        const textContent = extractPlainText(value);
        return textContent.length <= maxChars;
      })
  });


    const networkPopUp =  ToastPopUp({
      description: "No internet connection",
      status: "error",
      
    });
    

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
          if(programDetail !== "detail"){
            store.dispatch(resetInitialProgramFormValue())
          }
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
    id: values.id,
    programName: values.programName,
    ...(isEdit?{name: values.programName} : {}),
    programDescription: values.programDescription,
    programDuration: values.programDuration,
    deliveryType: values.deliveryType,
    programMode: values.programMode,
  };
    try { 
      if(!isEdit){
        const create = await createProgram(payload).unwrap();
        if(create) {
         handleCloseModal()
       toast({
         description: create.message,
         status: "success",
         duration: 2000
       })
      }
      }else {
        const update = await updateProgram({  data: payload }).unwrap();
        if(update) {
          store.dispatch(
            programApi.util.prefetch('getProgramById', { id: values.id }, { force: true })
          );
          handleCloseModal()
        toast({
          description: update.message,
          status: "success",
          
        });
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
                <div>
                <div
                className='grid grid-cols-1 gap-y-4 md:max-h-[50.5vh] overflow-y-auto'
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      const formattedValue = formatPlaceName(value,true);
                      const cleanedValue = formattedValue.replace(/[^a-zA-Z0-9'_&\-\s]/g, '');
                      if (cleanedValue.length > 0 && !/^[a-zA-Z0-9]/.test(cleanedValue)) {  
                          setFieldValue("programName", cleanedValue.substring(1));
                          handleFormChange("programName", cleanedValue.substring(1));
                      } else {
                          setFieldValue("programName", cleanedValue);
                          handleFormChange("programName", cleanedValue);
                      }
                  }}
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
                  
                     <CustomSelectObj
                     triggerId='deliveryTypeTriggerId'
                      id="deliveryTypeSelect"
                      selectContent={programDeliveryType}
                      value={values.deliveryType} 
                      onChange={(value) => {
                        setFieldValue("deliveryType", value)
                        handleFormChange("deliveryType", value);
                      }} 
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
                <div className='grid md:grid-cols-2 gap-4 w-full relative md:bottom-4'>
                  <div>
                   
                     <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none',
                       msOverflowStyle: 'none'}}> 
                    <Label htmlFor="programMode" style={{ display: 'inline-block',WebkitOverflowScrolling: 'touch'  }}>Program mode</Label> 
                    </div>
                    <CustomSelectObj
                     triggerId='programModeTriggerId'
                      id="programModalSelect"
                      selectContent={programModes}
                      value={values.programMode} 
                      onChange={(value) => {
                        setFieldValue("programMode", value)
                        handleFormChange("programMode", value);
                      }} 
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
                      onChange={(value) => {
                        setFieldValue("programDuration", value)
                        handleFormChange("programDuration", value);
                      }} 
                      name="programDuration"
                      placeHolder='Select a duration'
                     
                    />
                      
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
                <div className='relative md:bottom-9'>
                  <Label htmlFor="programDescription">Program description</Label>
                  
                  <QuillFieldEditor
                      name="programDescription"
                      errorMessage=""
                      errors={{ programDescription: errors.programDescription }}
                      touched={{ programDescription: touched.programDescription }}
                      onExternalChange={(value) => handleFormChange("programDescription", value)}
                      // onCharCountChange={setCharCount}
                      // maxChars={maxChars}
                     />
                     {/* <div className={`text-right text-sm mt-1 ${
                charCount >= maxChars ? 'text-red-500' : 'text-gray-500'
              }`}> */}
                {/* {charCount}/{maxChars} characters
                {charCount > maxChars && ' - Limit reached'} */}
              {/* </div> */}
                    {errors.programDescription && touched.programDescription && (
                  <ErrorMessage
                      name="programDescription"
                      component="div"
                      id="programDescriptionError"
                      className="text-red-500 text-sm"
                  />
                  )}
                  {/* {
                    <div className="text-red-500 text-sm">
                      {charCountError}
                    </div>
                  } */}
                  <div>
                     
                  </div>
                </div>
                </div>
                <div className='w-full border-[#D7D7D7] border-[0.6px] mt-3 mb-6'></div>
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
                  {isLoading || isEditLoading ? <Isloading/>: (
                                            isEdit? "Edit" : "Save"
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

