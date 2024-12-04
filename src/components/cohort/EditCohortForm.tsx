import { Formik,Form,Field,ErrorMessage } from 'formik'
import React,{useState} from 'react'
import * as Yup from 'yup';
import {inter} from "@/app/fonts"
import { format, parseISO } from "date-fns";
import DatePickerInput from '@/reuseable/Input/DatePickerInput';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineEdit } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import ToastPopUp from '@/reuseable/notification/ToastPopUp';
import { useEditCohortMutation } from '@/service/admin/cohort_query';
import { useQueryClient } from '@tanstack/react-query';
// import data from '@iconify/icons-line-md/loading-loop';
// import { uploadImageToCloudinary } from '@/utils/UploadToCloudinary';

// import Image from 'next/image';


interface cohortDetails {
  id: string,
   programId: string,
   organizationId: string,
   cohortDescription: string,
   name: string,
   activationStatus: string,
   cohortStatus: string,
   tuitionAmount: number,
   totalCohortFee: number,
   imageUrl: string,
   startDate: string,
   expectedEndDate: string
}


 interface idProps {
   cohortId? : string;
   setIsOpen? : (e:boolean | undefined) => void;
   cohortDetail?: cohortDetails
 }

 interface ApiError {
  status: number;
  data: {
      message: string;
  };
}





const EditCohortForm = ({setIsOpen,cohortDetail}: idProps) => {
  const [editCohort, {isLoading}] = useEditCohortMutation();
  const queryClient = useQueryClient();
  const [error, setError] =  useState('');

  const initialFormValue = {
    id: cohortDetail?.id,
    name: cohortDetail?.name,
    startDate: cohortDetail?.startDate,
    expectedEndDate: cohortDetail?.expectedEndDate,
    cohortDescription: cohortDetail?.cohortDescription,  
    cohortImage: cohortDetail?.imageUrl,

//  'https://www.thoughtco.com/thmb/gvFwQROKdUKVqquJ7a1t79S1qC4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-10194740-58b885703df78c353cbe18bc.jpg'


}



  
  const [image, setImage] = useState(initialFormValue.cohortImage);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [uploading, setUploading] = useState(false); 
  // const [uploadError, setUploadError] = useState(false); 
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); 
  // const [isImageUploaded, setIsImageUploaded] = useState(false)
  const maxChars = 1500;
  
  
  const supportedTypes = [
    "image/svg+xml",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/tiff",
    "image/x-icon",
    "image/heif",
    "image/heic"
  ];

  


const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  // setUploadError(false); 
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
   

    if (supportedTypes.includes(file.type)) {
      // setUploadError(false); 
      // setIsImageUploaded(true); 
      setUploadedFile(file); 
      setImage(URL.createObjectURL(file)); 

      setTimeout(() => {
        // setUploading(false);
        // setShowSuccessMessage(true);
        // setIsImageUploaded(true);
      }, 2000);
  } else {
      // setUploadError(true);
      return;
     
  }
    
  }

  
};

// const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setUploadError(false);
//   const file = e.dataTransfer.files[0];
//   if (supportedTypes.includes(file.type)) {
//     setUploadedFile(file);
//     setImage(URL.createObjectURL(file));
//     setUploading(true);

//     setTimeout(() => {
//       setUploadError(false); 
//       setUploading(false);
//       setShowSuccessMessage(true);
//       setIsImageUploaded(true);
//     }, 2000);
//   } else {
//     setUploadError(true);
//   }
// }

// const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
// };

const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageDelete = () => {
    setImage('')
    setUploadedFile(null); 
    // setIsImageUploaded(false);
    // setShowSuccessMessage(false);
    // setUploadError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
  };

}

  //  const handleReset = (resetForm: () => void) => {
  //   resetForm(); 
  //   setImage(initialFormValue.cohortImage);
  //   setUploadedFile(null); 
  // };

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }

 


   
  const validationSchema = Yup.object().shape({
    name: Yup.string()
     .trim()
     .matches(/^\S*$/, 'Cohort name should not contain spaces')
     .required('Cohort name is required'),
    startDate: Yup.date()
                .required('Start date is required')
                .nullable(),
     expectedEndDate: Yup.date()
    .required('End date is required')
    .nullable()
    .when('startDate', (startDate, schema) => {
     
      return startDate
        ? schema.min(startDate, 'End date must be after start date')
        : schema;
    })
    ,
    cohortDescription: Yup.string()
     .trim()
    .required('Cohort Description is required')
    .max(1500, 'Cohort description must be 1500 characters or less')
  });

  const toastPopUp =  ToastPopUp({
      description: "Cohorts details successfully updated.",
      status:"success"
      
    })

    const networkPopUp =  ToastPopUp({
      description: "No internet connection",
      status: "error",
    });

  const handleSubmit = async (values: typeof initialFormValue) => {
    if (!navigator.onLine) {
      networkPopUp.showToast();
      if (setIsOpen) {
        setIsOpen(false);
      }
      return 
  }
  try{
    await editCohort({data: values}).unwrap();
    queryClient.invalidateQueries({ queryKey: ['cohort'] });
    toastPopUp.showToast();
    if (setIsOpen) {
      setIsOpen(false);
    }
  }
  catch (err) {
    const error = err as ApiError;
    setError(error?.data?.message );
   
  }

   
   
  };

  return (
    <div id='editCohortForm'>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        >
         {
          ({values, errors, isValid, touched, setFieldValue}) => (
            <Form className={`${inter.className}`}>
              <div className='grid grid-cols-1 gap-y-4'>
              <div className=''>
                <Label htmlFor="cohortName">Cohort name</Label>
                <Field
              id="editCohortName"
              name="name"
              className="w-full p-3 border rounded focus:outline-none mt-2"
              placeholder="Enter cohort name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("name", e.target.value.replace(/\s+/g, ''))}
            />
              
             {
              errors.name && touched.name &&  (
                 <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                <div className=''>
                  <Label htmlFor="startDate">Start date</Label>
                 <DatePickerInput
                    selectedDate={parseISO(values.startDate ?? "")}
                     onDateChange={(date) => setFieldValue('startDate', format(date, 'yyyy-MM-dd'))}
                     className='p-6 mt-2'
                     disabledDate={(date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)}
                 />
                   {
              errors.startDate && touched.startDate &&  (
                 <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
                </div>
                <div className=''>
                  <Label htmlFor="endDate">End date</Label>
                 <DatePickerInput
                    selectedDate={parseISO(values.expectedEndDate?? "")}
                     onDateChange={(date) => setFieldValue('expectedEndDate', format(date, 'yyyy-MM-dd'))}
                     className='p-6 mt-2'
                     disabledDate={
                      // (date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)
                      (date) =>
                        !values.startDate || date <= parseISO(values.startDate)
                    }
                     
                 />
                   {
              errors.expectedEndDate && touched.expectedEndDate &&  (
                 <ErrorMessage
              name="expectedEndDate"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
                </div>
              </div>
              <div>
                <Label htmlFor="cohortDescription">Cohort description</Label>
                <Field
                 as="textarea"
                id="editCohortDescription"
                name="cohortDescription"
                className="w-full p-3 border rounded focus:outline-none mt-2 resize-none "
                placeholder="Enter cohort description"
                rows={4}
                maxLength={maxChars}
                />
             {
              errors.cohortDescription && touched.cohortDescription &&  (
                 <ErrorMessage
              name="cohortDescription"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
              </div>
              <div>
                <Label htmlFor='cohortImage'>Cohort Image (Optional)</Label>
                <div className='mt-2'>
                  
                      <div className='relative border border-solid h-24 rounded flex items-center justify-between px-4'>
                      {image? ( <div   className='flex items-center'> <img  data-testid="image" src={image} alt="Cohort" className="w-24 h-16 object-cover rounded-md" />
                       <span className="ml-4 text-sm text-gray-600">
                       {uploadedFile ? uploadedFile.name : "Existing Image"}
                     </span> </div>
                    ) : (<div></div>)}
                      <div className='flex relative'>
                         {
                    image? ( 
                    <Button
                         type='button'
                         className='border-none shadow-none relative '
                         onClick={handleImageDelete}
                         aria-label="delete"
                         >
                          <div className='bg-greyBase200 w-8 flex justify-center items-center rounded-full h-8'>
                          < MdDeleteOutline size={22} className='text-blue200 ' />
                          </div>
                         
                         </Button> ) : (
                          <div>
 
                         </div>
                         )
                        }
                        <div >
                          <Label htmlFor='imageUpload'>
                         
                          <div className='bg-greyBase200 w-8 flex justify-center items-center rounded-full h-8 cursor-pointer'>
                          < MdOutlineEdit size={22} className='text-blue200 ' />
                          </div>
                         
                        
                          </Label>
                          <Input
                              id="imageUpload"
                              type="file"
                              accept="image/*"
                              name="cohortImage"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleImageUpload(e); 
                                if (e.target.files && e.target.files[0]) {
                                  setUploadedFile(e.target.files[0]); 
                                  setFieldValue('cohortImage', e.target.files[0].name); 
                                }
                              }}
                            />

                        </div>
                        </div>
                      </div>
                  
                </div>
              </div>
              <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
                <Button 
                variant={'outline'} 
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4'
                // onClick={() => handleReset(resetForm)}
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
               {
                <div className={`text-error500 flex justify-center items-center ${error? "mb-3" : ""}`}>{error}</div>
            }
            </Form>

          )
          
         } 

        </Formik>
    </div>
  )
}

export default EditCohortForm