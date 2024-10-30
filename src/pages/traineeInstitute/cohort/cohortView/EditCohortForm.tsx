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

 interface idProps {
   cohortId : string;
   setIsOpen? : (e:boolean | undefined) => void;
 }



const EditCohortForm = ({cohortId,setIsOpen}: idProps) => {

  const initialFormValue = {
    cohortId: cohortId,
    cohortName: 'Luminary',
    startDate: '2023-12-18',
    endDate: '2024-12-24',
    cohortDescription:
      'Luminary is a dynamic cohort of visionary thinkers and creators, pursuing excellence in product design.',
    cohortImage: 'https://www.thoughtco.com/thmb/gvFwQROKdUKVqquJ7a1t79S1qC4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-10194740-58b885703df78c353cbe18bc.jpg',


}

  const [isLoading] = useState(false);
  const [image, setImage] = useState(initialFormValue.cohortImage);

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setImage(URL.createObjectURL(file)); 
  //   }
  // };

  const [uploadedFile, setUploadedFile] = useState<File | null>(null); 

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setUploadedFile(file); 
    setImage(URL.createObjectURL(file)); 
  }
};

const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageDelete = () => {
    setImage('')
    setUploadedFile(null); 
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
    cohortName: Yup.string().required('Cohort name is required'),
    startDate: Yup.date()
                .required('Start date is required')
                .nullable(),
    endDate: Yup.date()
    .required('End date is required')
    .nullable()
    .when('startDate', (startDate, schema) => {
     
      return startDate
        ? schema.min(startDate, 'End date must be after start date')
        : schema;
    })
    ,
    cohortDescription: Yup.string().required('Cohort Description is required'),
  });
  
  const handleSubmit = (values: typeof initialFormValue) => {
    console.log(values);
    if (setIsOpen) {
      setIsOpen(false);
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
          ({values, errors, isValid, touched, setFieldValue,resetForm}) => (
            <Form className={`${inter.className}`}>
              <div className='grid grid-cols-1 gap-y-4'>
              <div className=''>
                <Label htmlFor="cohortName">Cohort name</Label>
                <Field
              id="editCohortName"
              name="cohortName"
              className="w-full p-3 border rounded focus:outline-none mt-3"
              placeholder="Enter cohort name"
            />
              
             {
              errors.cohortName && touched.cohortName &&  (
                 <ErrorMessage
              name="cohortName"
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
                    selectedDate={parseISO(values.startDate)}
                     onDateChange={(date) => setFieldValue('startDate', format(date, 'yyyy-MM-dd'))}
                     className='p-6 mt-3'
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
                  <Label htmlFor="startDate">End date</Label>
                 <DatePickerInput
                    selectedDate={parseISO(values.endDate)}
                     onDateChange={(date) => setFieldValue('endDate', format(date, 'yyyy-MM-dd'))}
                     className='p-6 mt-3'
                     disabledDate={
                      // (date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)
                      (date) =>
                        !values.startDate || date <= parseISO(values.startDate)
                    }
                     
                 />
                   {
              errors.endDate && touched.endDate &&  (
                 <ErrorMessage
              name="endDate"
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
                className="w-full p-3 border rounded focus:outline-none mt-3 resize-none "
                placeholder="Enter cohort description"
                rows={4}
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
                <div>
                  
                      <div className='relative border border-solid h-24 rounded flex items-center justify-between px-4'>
                      {image? ( <div   className='flex items-center'> <img data-testid="image" src={image} alt="Cohort" className="w-24 h-16 object-cover rounded-md" /> 
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
              <div className='md:flex gap-4 justify-end'>
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
            </Form>

          )
          
         } 

        </Formik>
    </div>
  )
}

export default EditCohortForm