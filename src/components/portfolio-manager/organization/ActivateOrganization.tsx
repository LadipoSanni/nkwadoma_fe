import React,{useState}  from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import {inter} from "@/app/fonts"
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'
import { useActivateOrganizationMutation } from '@/service/admin/organization';
import { store } from '@/redux/store';
import { setOrganizationTabStatus } from '@/redux/slice/organization/organization';


interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

  const initialFormValue = {
    id: '',
    reason: ''
    
  }

  interface props {
    setIsOpen? : (e:boolean) => void;
    id: string;
  }

function ActivateOrganization({setIsOpen,id}:props) {
  const [isError, setError] = useState('')
  const [activateOrganization, {isLoading}] = useActivateOrganizationMutation();
  const { toast } = useToast();
  const router = useRouter()

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }

      const validationSchema = Yup.object().shape({
        reason: Yup.string()
         .trim()
         .required('Reason is required')
      })

      const handleSubmit = async (values: typeof initialFormValue) => {
        const formData = {
          id: id ,
          reason: values.reason
        }

        try {
          const activate = await activateOrganization(formData).unwrap();
          if(activate){
            toast({
              description: activate.message,
              status: "success",
            })
            store.dispatch(setOrganizationTabStatus("active"))
            router.push("/organizations")
          }
        } catch (err) {
          const error = err as ApiError;
          setError(error?.data?.message);
        }
      }

  return (
    <div>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
        >
            {
              ({errors,isValid, touched}) => (
                <Form className={`${inter.className}`} role="form">
                 <div
                  className='grid grid-cols-1 gap-y-4 md:max-h-[580px] overflow-y-auto mt-6'
                  style={{
                    scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
        
                  }}
                 >
                <div>
                 <Label htmlFor="reason">Reason</Label>
                 <Field 
                   as="textarea"
                   id="reason"
                   name="reason"
                   className="w-full p-3 border rounded focus:outline-none mt-2 resize-none "
                   placeholder="Enter reason"
                   rows={4}
                 />
                  {
              errors.reason && touched.reason &&  (
                 <ErrorMessage
              name="reason"
              component="div"
              id='editCohortDescriptionError'
              className="text-red-500 text-sm"
            /> 
              )
             }
                 </div>
                <div>
              <SubmitAndCancelButton 
                isValid={isValid} 
                isLoading={isLoading} 
                handleCloseModal={handleCloseModal} 
                submitButtonName='Activate'
                />
                </div>
                 </div>
                 <p className={`text-error500 flex justify-center items-center ${isError? "mb-3" : ""}`}>{isError}</p>
                </Form>
              )  
            }

        </Formik>
    </div>
  )
}

export default ActivateOrganization