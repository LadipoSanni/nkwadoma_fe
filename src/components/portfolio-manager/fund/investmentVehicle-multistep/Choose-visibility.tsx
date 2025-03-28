"use client"
import React,{useState,useEffect} from 'react'
import { inter } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Label } from '@/components/ui/label';
import Isloading from "@/reuseable/display/Isloading";
import {store} from "@/redux/store";
import {useAppSelector} from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/vehicle-multiselect';
import { useRouter } from "next/navigation";

const initialFormValue = {
    status:"",
    financiers: [],
    investmentId: ''

  };
   


function ChooseVisibility() {
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const validationSchema = Yup.object().shape({
        status: Yup.string().required("Visibility is required"),
    })
    const isLoading = false
    const completedStep = useAppSelector(state => (state?.vehicleMultistep.completedSteps))

    
       useEffect(()=> {
         if(!completedStep.includes("setup")){
          router.push('/vehicle/setup');
         }
       },[completedStep, router])
    
    
    const handleSubmit = (values: typeof initialFormValue) => {
       store.dispatch(markStepCompleted("setup"))
        console.log(values)
        
    }

    const handleCopyLink = () => {
        const url = "meedl.com/tech5investment";
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
        //   setTimeout(() => setCopied(false), 2000); 
        });
      };

  return (
    <div className={`${inter.className} `}>
        <div className='xl:px-40 lg:px-8 grid grid-cols-1 gap-y-6 '>
        <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Visibility</h1>
        <p className='text-[14px] font-thin'>Select the visibility of your commercial fund</p>
       </div>
         <div>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
         >
        {({
          // errors,
          isValid,
          // touched,
          setFieldValue,
          // setFieldError,
           values
        })=> (
            <Form className={`${inter.className}`}>
             <div className='grid grid-cols-1 gap-y-4 lg:pr-16 rounded-lg  md:max-h-[50vh]  overflow-y-auto'
                style={{
                    overflowY: "auto",
                    marginRight: "-10px",  
                    paddingRight: "10px",  
                    // scrollbarWidth: "thin", 
                    // scrollbarColor: "#142854 #f1f1f1",  
                  }}
             >
              <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'Public' ? 'border-[#142854]' : ''}`}
        onClick={() => setFieldValue('status', 'Public')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Public"
                value="Public"
                checked={values.status === 'Public'}
                onChange={() => setFieldValue('status', 'Public')}
                className="hidden" 
                id="public" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'Public' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'Public' && (
                  <svg
                    className="absolute w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[14px]">Public</span> 
            </label>
            <p className='text-[14px] font-thin px-8 text-[#6A6B6A]'>This commercial fund will be visible to the public</p>
            {values.status === "Public" && (
                      <div className='lg:px-8 mt-5'>
                      <div className="px-4 lg:flex items-center cursor-auto   lg:justify-between  bg-[#F9F9F9] py-3 rounded-lg">
                        <p className="text-[14px] text-[#212221] text-center lg:text-start lg:flex justify-center cursor-auto">
                          meedl.com/tech5investment
                        </p>
                        <div className='flex justify-center mt-3 lg:mt-0'>
                        <Button
                          type="button"
                          onClick={handleCopyLink}
                          variant={'default'}
                          className="text-[12px] bg-[#D9EAFF] text-[#142854] px-4  rounded-2xl hover:bg-[#D9EAFF] transition font-semibold shadow-none "
                        >
                          {copied ? "Copied!" : "Copy link"}
                        </Button>
                        </div>
                        
                      </div>
                      </div>
                    )}
          </div>
          <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'Private' ? 'border-[#142854]' : ''}`}
        onClick={() => setFieldValue('status', 'Private')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Private"
                value="Private"
                checked={values.status === 'Private'}
                onChange={() => setFieldValue('status', 'Public')}
                className="hidden" 
                id="private" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'Private' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'Private' && (
                  <svg
                    className="absolute w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[14px]">Private</span>
            </label>
            <p className='text-[14px] font-thin px-8 text-[#6A6B6A]'>This commercial fund will be visible to selected people</p>
            {
                values.status === "Private" && (
                    <div className='mt-5 px-8 '>
                        <Label className='text-[#212221]'>Financier</Label>
                    </div>
                )
            }
          </div>
          <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'Default' ? 'border-[#142854]' : ''}`}
          onClick={() => setFieldValue('status', 'Default')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Default"
                value="Default"
                checked={values.status === 'Default'}
                onChange={() => setFieldValue('status', 'Default')}
                className="hidden" 
                id="default" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'Default' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'Default' && (
                  <svg
                    className="absolute w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[14px]">Only me</span>
            </label>
            <p className='text-[14px] font-thin px-8 text-[#6A6B6A]'>This commercial fund will be visible to only portfolio manager</p>
          </div>
             </div>
             <div className="md:flex justify-end w-full mt-4">
                <button
                  id="submitInvestment"
                  className={`w-full md:w-24 h-[46px] rounded-md ${
                    !isValid
                      ? "bg-neutral650 cursor-auto text-white hover:bg-neutral650"
                      : "hover:bg-meedlBlue bg-meedlBlue text-white cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoading ? <Isloading /> : "Finish"}
                </button>
              </div>
            </Form>
        )

        }
       
         </Formik>
         </div>
        </div>
    </div>
  )
}

export default ChooseVisibility