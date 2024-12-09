// import {Button} from "@/components/ui/button"
// import {
//     DialogFooter,
// } from "@/components/ui/dialog"
// import {inter} from "@/app/fonts";
// import {Input} from '@/components/ui/input'
// import {Label} from "@/components/ui/label"
// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
// import {Textarea} from "@/components/ui/textarea";
// import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
// import React, {useCallback, useState} from "react";
// import {useCreateProgramMutation} from "@/service/admin/program_query";
// import {toast} from "@/hooks/use-toast";

// interface CreateProgramProps {
//     programDeliveryTypes: string[];
//     programModes: string[];
//     programDurations: string[];
//     submitButtonText: string;
//     setIsOpen?: (isOpen: boolean) => void
// }

// const CreateProgram: React.FC<CreateProgramProps> = ({
//                                                          programDeliveryTypes,
//                                                          programModes,
//                                                          programDurations,
//                                                          submitButtonText,
//                                                          setIsOpen
//                                                      }) => {

//     const [isDropdown, setIsDropdown] = useState(false)
//     const [programName, setProgramName] = useState('');
//     const [deliveryType, setDeliveryType] = useState('');
//     const [programMode, setProgramMode] = useState('');
//     const [programDuration, setProgramDuration] = useState('');
//     const [programDescription, setProgramDescription] = useState('');
//     const [error, setError] =  useState('');
//     const [createProgram] = useCreateProgramMutation();

//     const isProgramNameValid = /^(?!\s)(?!\d)(?!.\d.[a-zA-Z].|\d.[a-zA-Z].*\d)[a-zA-Z\s]+$/.test(programName);
//     const isDescriptionValid = /^(?!\s)(?!\d)(?!.\d.[a-zA-Z].|\d.[a-zA-Z].*\d)[a-zA-Z\s]+$/.test(programDescription);
//     const isProgramDuration = /^(?:[1-9][0-9]*|0[1-9]*[0-9]+)$/.test(programDuration);

//     const isFormValid = isProgramNameValid && deliveryType && programMode && isProgramDuration && isDescriptionValid;

//     const handleCancelButton = () => {
//         if (setIsOpen) {
//             setIsOpen(false);
//         }
//         resetFormFields();
//     };
//     const resetFormFields = () => {
//         setProgramName('');
//         setDeliveryType('');
//         setProgramMode('');
//         setProgramDuration('');
//         setProgramDescription('');
//     };

//     const toggleDropdown = useCallback(() => {
//         setIsDropdown((prev) => !prev);
//     }, []);



//     // const instituteId = "06fd45a1-364c-464e-b3de-c3432e72bd03";

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log(programName,programDescription,programMode,deliveryType,programDuration)
//         if (!isFormValid) {
//             toast({
//                 description: 'Please fill in all the required fields',
//                 status: 'error',
//             });
//         } else {
//             try {
//                 const newProgram = {
//                      programName: programName,
//                     programDescription: programDescription,
//                     programDuration: programDuration,
//                     deliveryType: deliveryType,
//                     programMode: programMode,
//                 };
//                 const response = await createProgram(newProgram).unwrap();
//                 if (response) {
//                     toast({
//                         description: 'Program created successfully',
//                         status: 'success',
//                     })
//                     // if (setIsOpen) setIsOpen(false);
//                 }
//             } catch (error) {
//                 setError(error instanceof Error ? error.message : 'An error occurred');
//             }
//         }
//     };

//     return (
//         <form data-testid="dialog-description" className={`w-full md:px-0 px-3`} onSubmit={handleSubmit}>
//             <div id="formContainer" data-testid="form-container"
//                  className="grid py-3 flex-col text-labelBlue">
//                 <div id="programNameContainer" data-testid="program-name-container"
//                      className="">
//                     <Label htmlFor="programName" id="programNameLabel" data-testid="program-name-label"
//                            className={`${inter.className} text-meedlBlack font-bold pb-1`}>Program
//                         Name</Label>
//                     <Input
//                         id="programNameInput"
//                         data-testid="program-name-input"
//                         placeholder="Enter name"
//                         name="programName"
//                         onChange={(e) => setProgramName(e.target.value)}
//                         className={`h-14 focus:outline-none focus:ring-0 focus-visible:ring-0`}
//                     />
//                     {!isProgramNameValid && programName && (
//                         <p className="text-red-500 text-sm">Name must contain only letters.</p>
//                     )}
//                 </div>

//                 <div className={`grid grid-col`} id="selectInputsContainer"
//                      data-testid="select-inputs-container">
//                     <div id=" selectInputsContainer" data-testid="select-inputs-container" className={`pt-4`}>
//                         <Label
//                             htmlFor="programDeliveryType"
//                             id="programDeliveryTypeLabel"
//                             data-testid="program-delivery-type-label"
//                             className={`${inter.className} text-meedlBlack font-bold`}
//                         >
//                             Program Delivery Type
//                         </Label>
//                         <Select data-testid="program-delivery-type-select" onOpenChange={toggleDropdown}
//                                 onValueChange={setDeliveryType}>
//                             <SelectTrigger id="programDeliveryTypeTrigger"
//                                            data-testid="program-delivery-type-trigger"
//                                            className={`focus:outline-none focus:ring-0 shadow-none`}>
//                                 <SelectValue placeholder="Select delivery type"/>
//                                 <div className={`ml-4`}>
//                                     {isDropdown ? (
//                                         <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
//                                     ) : (
//                                         <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
//                                     )}

//                                 </div>
//                             </SelectTrigger>
//                             <SelectContent id="programDeliveryTypeContent"
//                                            style={{
//                                                zIndex: 1000
//                                            }}
//                                            data-testid="program-delivery-type-content">
//                                 {programDeliveryTypes.map((deliveryType, index) => (
//                                     <SelectItem key={index} value={deliveryType}
//                                                 id={`programDeliveryTypeItem-${index}`}
//                                                 data-testid={`program-delivery-type-item-${index}`}>
//                                         {deliveryType}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                     </div>
//                     <div id="leftColumn" data-testid="left-column"
//                          className="grid md:grid-cols-2 gap-5 ">
//                         <div>
//                             <Label htmlFor="programMode" id="programModeLabel" data-testid="program-mode-label"
//                                    className={`${inter.className} text-meedlBlack font-bold`}>Program
//                                 Mode</Label>
//                             <Select data-testid="program-mode-select" onOpenChange={toggleDropdown}
//                                     onValueChange={setProgramMode}>
//                                 <SelectTrigger id="programModeTrigger" data-testid="program-mode-trigger"
//                                                className={`focus:outline-none focus:ring-0 shadow-none min-w-0 w-full`}>
//                                     <SelectValue placeholder="Select mode"/>
//                                     <div className={`ml-4`}>
//                                         {isDropdown ? (
//                                             <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
//                                         ) : (
//                                             <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
//                                         )}

//                                     </div>
//                                 </SelectTrigger>
//                                 <SelectContent id="programModeContent" data-testid="program-mode-content"
//                                                style={{
//                                                    zIndex: 1000
//                                                }}
//                                 >
//                                     {programModes.map((mode, index) => (
//                                         <SelectItem key={index} value={mode} id={`programModeItem-${index}`}
//                                                     data-testid={`program-mode-item-${index}`}>
//                                             {mode}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div >
//                             <Label
//                                 htmlFor="programDuration"
//                                 id="programDurationLabel"
//                                 data-testid="program-duration-label"
//                                 className={`${inter.className} text-meedlBlack font-bold `}>
//                                 Program Duration
//                             </Label>
//                             <Select data-testid="program-duration-select" onOpenChange={toggleDropdown}
//                                     onValueChange={setProgramDuration}>
//                                 <SelectTrigger id="programDurationTrigger"
//                                                data-testid="program-duration-trigger"
//                                                className={`focus:outline-none focus:ring-0 shadow-none min-w-0 w-full`}>
//                                     <SelectValue placeholder="Select duration"/>
//                                     <div className={`ml-4`}>
//                                         {isDropdown ? (
//                                             <ChevronUpIcon className={`h-4 w-5 font-bold`}/>
//                                         ) : (
//                                             <ChevronDownIcon className={`h-4 w-5 font-bold`}/>
//                                         )}
//                                     </div>
//                                 </SelectTrigger>
//                                 <SelectContent id="programDurationContent"
//                                                data-testid="program-duration-content"
//                                                style={{
//                                                    zIndex: 1000
//                                                }}
//                                 >
//                                     {programDurations.map((duration, index) => (
//                                         <SelectItem key={index} value={duration}
//                                                     id={`programDurationItem-${index}`}
//                                                     data-testid={`program-duration-item-${index}`}>
//                                             {duration}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                              <Input
//                         id="programDuration"
//                         data-testid="program-duration-input"
//                         placeholder="Enter program Duration"
//                         name='programDuration'
//                         onChange={(e) => setProgramDuration(e.target.value)}
//                         className={`h-14 focus:outline-none focus:ring-0 focus-visible:ring-0 mt-3`}
//                     />
//                       {!isProgramDuration && programDuration && (
//                         <p className="text-red-500 text-sm">Duration must contain only numbers and must be greater than zero.</p>
//                     )}
//                         </div>

//                     </div>

//                 </div>
//                 <div id="rightColumn" data-testid="right-column">
//                     <Label htmlFor="programDescription" id="programDescriptionLabel"
//                            data-testid="program-mode-label"
//                            className={`${inter.className} text-meedlBlack font-bold`}>Program description</Label>
//                     <Textarea
//                         id="programDescription"
//                         name="programDescription"
//                         data-testid="program-description"
//                         placeholder="Enter description"
//                         onChange={(e) => setProgramDescription(e.target.value)}
//                         className={`focus:outline-none focus:ring-0  focus-visible:ring-0 resize-none`}
//                     />
//                     {!isDescriptionValid && programDescription && (
//                         <p className="text-red-500 text-sm">Description must contain only letters.</p>
//                     )}
//                 </div>
//             </div>

//             <DialogFooter id="dialogFooter" data-testid="dialog-footer" className="gap-3 py-5">
//                 <Button
//                     id="cancelButton"
//                     data-testid="cancel-button"
//                     variant="outline"
//                     size={`lg`}
//                     className={`${inter.className}  bg-meedlWhite h-14 text-grey800 text-sm font-semibold `}
//                     onClick={handleCancelButton}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     id="createButton"
//                     data-testid="create-button"
//                     variant="secondary"
//                     size={`lg`}
//                     className={`${inter.className} bg-meedlBlue h-14 text-meedlWhite text-sm font-semibold `}
//                     disabled={!isFormValid}
//                     type={"submit"}
//                 >
//                     {submitButtonText}
//                 </Button>
//             </DialogFooter>
//            
//         </form>
        
//     )
// }

// export default CreateProgram;
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
  // const queryClient = useQueryClient();
  const [createProgram,{isLoading}] = useCreateProgramMutation();
  const [error, setError] =  useState('');

    const initialFormValue = {
        programName: "",
        deliveryType: "",
        programMode: "",
        programDuration: "",
        programDescription: "",
    }

    
    const maxChars = 2500;

    const programDeliveryTypes = ["ONSITE", "ONLINE","HYBRID"];
    const programModes=["FULL_TIME", "PART_TIME"]


    const validationSchema = Yup.object().shape({
        programName:Yup.string()
       .trim()
       .matches(/^[a-zA-Z\s_-]+$/, 'Program name can only contain letters, underscores, hyphens, and spaces.')
      .required('Program name is required'),
      deliveryType:Yup.string()
      .required('Program delivery type is required'),
      programMode:Yup.string()
      .required('Program Mode is required'),
      programDuration:  Yup.string()
      .matches(/^(?!0)\d+$/, 'Program duration must be a number and cannot start with zero.')
      .required('Program duration is required'),
      programDescription: Yup.string()
       .trim()
       .required('Program Description is required')
       .max(2500, 'Program description must be 2500 characters or less')
    });

    
  
     const toastPopUp = ToastPopUp({
      description: "Program Created successfully updated.",
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
                className='grid grid-cols-1 gap-y-4'
                >
                  <div>
                  <Label htmlFor="programName">Program name</Label>
                  <Field
                  id="programName"
                  name="programName"
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter program name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                    const value = e.target.value; const regex = /^[a-zA-Z\s_-]*$/; 
                    if (regex.test(value)) { 
                      setFieldValue("programName", value); } }}
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
                      placeHolder='Select a program Delivery Type'
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
                    <Label htmlFor="programMode">Program mode</Label>
                    <CustomSelect
                     triggerId='programModeTriggerId'
                      id="programModalSelect"
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
                    id='programModeError'
                    className="text-red-500 text-sm"
                    />
                    )
                   }
                  </div>
                   <div className='md:mt-1'>
                    <Label htmlFor="duration">Program duration (Months)</Label>
                    {/* <CustomSelect
                      selectContent={programDurations}
                      value={values.duration} 
                      onChange={(value) => setFieldValue("duration", value)} 
                      name="duration"
                      placeHolder='Select a program Duration'
                     
                    /> */}
                      <Field
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
                    id='programDescriptionError'
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

