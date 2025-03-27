import React from 'react'
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';
import Isloading from "@/reuseable/display/Isloading";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const initialFormValue = {
    status: "",
    state: ""
}

// interface ApiError {
//     status: number;
//     data: {
//       message: string;
//     };
//   }

type SelectOption = {
    value: string | number;
    label: string;
  };

  interface Props {
    selectStatus?: Array<SelectOption>;
    selectState?: Array<SelectOption>;
    fundId?: string;
    isStateRequired?: boolean,
    statusType?: string
  }

function statusReusable({selectStatus,selectState,fundId,isStateRequired,statusType}: Props) {
    const isLoading = false
    const router = useRouter()


    const validationSchema = Yup.object().shape({
        status:Yup.string()
        .required('Status is required'),
        state:isStateRequired 
        ? Yup.string().required('State is required')
        : Yup.string().notRequired()
    })
    
        function handleSubmit( ) {
            router.push('/vehicle/visibility')
        }

      const handleBack = () => {
        router.push('/vehicle/setup')
      }

  return (
    <div className='md:pr-8'>
      <Formik
      initialValues={initialFormValue}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validationSchema={validationSchema}
      >
      {
        ({errors, isValid, touched,setFieldValue,values}) => (
            <Form>
              <div
                 className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-4'
              >
                <div>
                  <Label htmlFor="status">Status</Label> 
                  <CustomSelectObj
                    triggerId='statusTypeTriggerId'
                    id='statusType'
                    value={values.status}
                    onChange={(value) => setFieldValue("status", value)}
                    name='status'
                    placeHolder='Select state'
                    selectContent={selectStatus}
                  /> 
                   {errors.status && touched.status && (
                    <div>
                    
                    <ErrorMessage
                        name="status"
                        component="div"
                        id="statusError"
                        className="text-red-500 text-sm"
                    />
                    </div>  
                    )} 
                </div>
                <div>
                <Label htmlFor="state">State</Label> 
                <CustomSelectObj
                    triggerId='stateTypeTriggerId'
                    id='stateType'
                    value={values.state}
                    onChange={(value) => setFieldValue("state", value)}
                    name='state'
                    placeHolder='Select state'
                    selectContent={selectState}
                  /> 
                    {errors.state && touched.state && (
                    <div>
                    
                    <ErrorMessage
                        name="state"
                        component="div"
                        id="stateError"
                        className="text-red-500 text-sm"
                    />
                    </div>  
                    )} 
                </div>
              </div> 
              <div className= "md:flex justify-between w-full mt-3">
                    <Button
                            id='saveInvestment'
                            variant={"outline"}
                             type="button"
                           className='w-full md:w-24 h-[48px] mb-4 border-solid border-[#142854] text-[#142854]'
                            onClick={handleBack}
                            
                        >
                         Back
                        </Button>
                <Button
                            id='submitInvestment'
                            variant={"default"}
                            className={` w-full md:w-24 h-[48px] ${
                                !isValid
                                    ? "bg-neutral650 cursor-auto hover:bg-neutral650 "
                                    : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                            }`}
                            type="submit"
                            disabled={!isValid}
                        >
                            {
                        
                             isLoading ? <Isloading /> : "Publish"}
                        </Button>
                </div>
                
            </Form>
        )
      }
      </Formik>
    </div>
  )
}

export default statusReusable
