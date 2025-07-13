import React,{ useState } from 'react'
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { inter } from "@/app/fonts";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import Isloading from "@/reuseable/display/Isloading";
import { useCreateInvestmentVehicleMutation } from "@/service/admin/fund_query";
import { useToast } from "@/hooks/use-toast";
import { validateNumber, validatePositiveNumberWithIndexNumbers } from "@/utils/Format";
import { validateText, validateNumberLimit } from "@/utils/Format";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
// import FormikCustomQuillField from "@/reuseable/textArea/FormikCustomQuillField";
import {useRouter } from 'next/navigation';
import DatePickerInput from "@/reuseable/Input/DatePickerInput";
import { format, parseISO } from "date-fns";
import {store} from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/vehicle-multiselect';
import {useAppSelector} from "@/redux/store";
import { setCreateInvestmentField,clearSaveCreateInvestmentField,setDraftId,clearDraftId, setInvestmentVehicleType} from '@/redux/slice/vehicle/vehicle';
import { validationSchema,draftValidationSchema } from '@/utils/validation-schema';
import PdfAndDocFileUpload from '@/reuseable/Input/Pdf&docx-fileupload';

interface ApiError {
    status: number;
    data: {
      name: {
        message: string;
      };
    };
   
  }
  
interface Props {
  investmentVehicleType?: string;
    
}

function Setup({investmentVehicleType}: Props) {
    const [selectCurrency, setSelectCurrency] = useState("NGN");
     const [isError, setError] = useState("");
     const [vehicleTypeStatus, setVehicleTypeStatus] = useState('');
      const vehicleType = useAppSelector(state => (state?.vehicle?.vehicleType))
      const savedFormData = useAppSelector(state => (state?.vehicle?.CreateInvestmentField))
      const draftId = useAppSelector(state => (state?.vehicle?.setDraftId))
      const [createInvestmentVehicle, { isLoading }] = useCreateInvestmentVehicleMutation();
      const { toast } = useToast();
       const router = useRouter();
     
    const initialFormValue = {
      id: draftId || "",
       name: savedFormData?.name || "",
      fundManager: savedFormData?.fundManager|| "",
      minimumInvestmentAmount: savedFormData?.minimumInvestmentAmount || "",
      mandate: savedFormData?.mandate || "",
      tenure: savedFormData?.tenure || "",
      size: savedFormData?.size || "",
      rate: savedFormData?.rate || "",
      bankPartner: savedFormData?.bankPartner || "",
      trustee: savedFormData?.trustee || "",
      custodian:savedFormData?.custodian || "",
      investmentVehicleType: savedFormData?.investmentVehicleType || "",
      startDate: savedFormData?.startDate || "",
    };

   const handlenext = () => {
      router.push("/vehicle/status")
   }

        const handleDraft = async (values: typeof initialFormValue)=> {
          setVehicleTypeStatus("DRAFT")
          const formData = {
            id:draftId,
            name: values.name,
            fundManager: values.fundManager,
            minimumInvestmentAmount: values.minimumInvestmentAmount,
            mandate: values.mandate,
            tenure: values.tenure || "1",
            size: values.size,
            rate: values.rate,
            bankPartner: values.bankPartner,
            trustee: values.trustee,
            custodian: values.custodian,
            investmentVehicleType: investmentVehicleType,
            investmentVehicleStatus : "DRAFT",
            startDate: values.startDate,
            sponsors: '',
          };
          try {
            const create = await createInvestmentVehicle(formData).unwrap();
            if (create) {
              toast({
                description: "Successfully added to draft",
                status: "success",
              });
              store.dispatch(clearSaveCreateInvestmentField())
               store.dispatch(clearDraftId())
               if(vehicleType === "commercial"){
                store.dispatch(setInvestmentVehicleType("COMMERCIAL"))
                 router.push("/vehicle/draft")
               }else {
                store.dispatch(setInvestmentVehicleType("ENDOWMENT")) 
                router.push("/vehicle/draft")
               }
            }
          } catch (err) {
            const error = err as ApiError;
            setError(error?.data?.name?.message);
          }
        }
       

       const handleSaveDraft = async (
           values: typeof initialFormValue,
           setFieldError: (field: string, message: string) => void
         ) => {
           try {
             await draftValidationSchema.validate(values, { abortEarly: false });
         
             await handleDraft(values);
           } catch (validationErrors) {
             if (validationErrors instanceof Yup.ValidationError) {
               const errors = validationErrors.inner.reduce((acc, err) => {
                 acc[err.path || ""] = err.message;
                 return acc;
               }, {} as Record<string, string>);
               setFieldError("name", errors.name); 
               if(errors.name){
                 toast({
                   description:  errors.name,
                   status: "error",
                 });
               }
               
             }
           }
         };

         const saveToRedux = (values: typeof initialFormValue) => {
          const investmentVehicleData  = {
           id: draftId,
           name: values.name,
           investmentVehicleType: values.investmentVehicleType,
           mandate: values.mandate,
           tenure: values.tenure,
           size: values.size,
           rate: values.rate,
           trustee: values.trustee,
           custodian: values.custodian,
           bankPartner: values.bankPartner,
           fundManager: values.fundManager,
           startDate: values.startDate,
           minimumInvestmentAmount: values.minimumInvestmentAmount,
           sponsors: '',
          }
          store.dispatch(setCreateInvestmentField(investmentVehicleData))
      }

       

       const handleSubmit = async (values: typeof initialFormValue) => {
            setVehicleTypeStatus("SAVE-AND-CONTINUE")
             const formData = {
              id:draftId,
              name: values.name,
              fundManager: values.fundManager,
              minimumInvestmentAmount: values.minimumInvestmentAmount,
              mandate: values.mandate,
              tenure: values.tenure || "1",
              size: values.size,
              rate: values.rate,
              bankPartner: values.bankPartner,
              trustee: values.trustee,
              custodian: values.custodian,
              investmentVehicleType: investmentVehicleType,
              investmentVehicleStatus : "DRAFT",
              startDate: values.startDate,
              sponsors: '',
            };
            try {
              const create = await createInvestmentVehicle(formData).unwrap();
              if (create) {
                 const id = create?.data?.id
                 store.dispatch(setDraftId(id))
                 saveToRedux(values);
                store.dispatch(markStepCompleted("setup"))
                handlenext()    
               
              }
            } catch (err) {
              const error = err as ApiError;
              setError(error?.data?.name?.message);
            }  
             
       }

        const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
           event.preventDefault();
         };
       
         const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
           event.preventDefault();
         };



  return (
    <div className={`${inter.className} `}>
        <div className='xl:px-36 grid grid-cols-1 gap-y-6 '>
       <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Set up {vehicleType} vehicle</h1>
        {/*<p className='text-[14px] font-normal'>Provide details of your {vehicleType} vehicle</p>*/}
       </div>
       <div>
       <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
        enableReinitialize={true}
       >
        {({
          errors,
          isValid,
          touched,
          setFieldValue,
          setFieldError,
           values
        })=> (
            <Form className={`${inter.className}`}>
            <div>
            <div className="grid grid-cols-1 gap-y-4 md:max-h-[50vh] md:relative overflow-y-auto lg:px-16 relative  lg:right-16  "
                style={{
                    overflowY: "auto",
                    marginRight: "-10px",  
                    paddingRight: "10px",  
                    // scrollbarWidth: "thin", 
                    // scrollbarColor: "#142854 #f1f1f1",  
                  }}
            >
             <div>
            <Label htmlFor="name" className='text-[14px]'>Vehicle name</Label>
            <Field
                id="name"
                name="name"
                placeholder="Enter name"
                className="w-full p-3 border rounded focus:outline-none mt-2 text-[14px]"
                onChange={validateText("name", setFieldValue)}
            />
            {errors.name && touched.name && (
                <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
                />
            )}
            </div>
             <div className='lg:grid lg:grid-cols-2 gap-4'>
                <div>
                <Label htmlFor="name" className='text-[14px]'>Start date</Label>
              <DatePickerInput
              selectedDate={values.startDate ? parseISO(values.startDate) : undefined}
              // onDateChange={(date) => {
              //   const formattedDate = format(date, "yyyy-MM-dd");
              //   setFieldValue("startDate", formattedDate).then(() => {
              //     saveToRedux({ ...values, startDate: formattedDate });
              //   });
              // }}
              onDateChange={(date) => {
                if (date) {
                  const formattedDate = format(date, "yyyy-MM-dd");
                  setFieldValue("startDate", formattedDate);
                }
              }}
                 className="p-6 mt-2 text-[14px] text-[#6A6B6A]"
                //  disabledDate={
                //       (date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)
                //     }
              />  
               {errors.startDate && touched.startDate && (
                <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm"
                />
            )}   
                </div>
                  <div className='lg:flex gap-2'>
                  <div className='md:mt-4 lg:mt-0'>
                        <Label htmlFor="rate">Interest rate</Label>
                        <Field
                        id="rate"
                        name="rate"
                        placeholder="0"
                        type="text"
                        className="w-full  p-3 border rounded focus:outline-none mt-2"
                         onChange={investmentVehicleType === 'ENDOWMENT'?  validatePositiveNumberWithIndexNumbers(
                          "rate",
                          setFieldValue,
                          100,
                          0
                        ) : validatePositiveNumberWithIndexNumbers(
                          "rate",
                          setFieldValue,
                          100,
                          1
                        )}
                        />
                        {errors.rate && touched.rate && (
                        <ErrorMessage
                            name="rate"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                        )}
                </div>  
               <div className='md:mt-4 lg:mt-0'>
                                <Label htmlFor="tenure">Tenor(months)</Label>
                                <Field
                                  id="tenure"
                                  name="tenure"
                                  placeholder="0"
                                  className="w-full  p-3 border rounded focus:outline-none mt-2"
                                   onChange={validateNumberLimit(
                                    "tenure",
                                    setFieldValue,
                                    setFieldError,
                                    3,
                                    "Tenure must be a positive number, must not start with zero, and must be a maximum of three digits."
                                  )}
                                />
                                {errors.tenure && touched.tenure && (
                                  <ErrorMessage
                                    name="tenure"
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                )}
                              </div>   
             </div>
                 
             </div>
             <div>
                  <Label htmlFor="size">Vehicle size</Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <Field
                      id="size"
                      name="size"
                      type="text"
                      component={CustomInputField}
                       className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2 "
                      onChange={validateNumber("size", setFieldValue)}
                    />

                    
                  </div>
                  <div className="relative bottom-3">
                    {errors.size && touched.size && (
                      <ErrorMessage
                        name="size"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    )}
                  </div>
                </div>
                <div className='relative bottom-4'>
                  <Label
                    htmlFor=" minimumInvestmentAmount"
                  >
                    Minimum investment amount
                  </Label>
                  <div className="flex gap-2 items-center justify-center ">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <Field
                      id="minimumInvestemntAmount"
                      name="minimumInvestmentAmount"
                      className="text-[14px] relative"
                      component={CustomInputField}
                      onChange={
                        validateNumber(
                        "minimumInvestmentAmount",
                        setFieldValue
                      )}
                    />
                  </div>
                  <div className="relative bottom-3">
                    {errors.minimumInvestmentAmount &&
                      touched.minimumInvestmentAmount && (
                        <ErrorMessage
                          name="minimumInvestmentAmount"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      )}
                  </div>
                </div>
                <div className='md:flex gap-4 relative md:bottom-9'>
                   <div className="relative bottom-10  md:bottom-0">
                    <Label htmlFor="name">Bank partner</Label>
                    <Field
                    id="bankPartner"
                    name="bankPartner"
                    placeholder="Enter bank partner"
                    className="w-full p-3 border rounded focus:outline-none mt-2 text-[14px]"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(
                          "bankPartner",
                          e.target.value.replace(/[^a-zA-Z\s]/g, "")
                        )
                      }
                    />
                    {errors.bankPartner && touched.bankPartner && (
                    <ErrorMessage
                        name="bankPartner"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                    )}
                </div> 
                 <div className="relative bottom-5 md:bottom-0">
                    <Label htmlFor="fundManager" className=' '>Fund manager</Label>
                    <Field
                    id="fundManager"
                    name="fundManager"
                    placeholder="Enter fund manager"
                    className="w-full p-3 border rounded focus:outline-none mt-2  text-[14px]"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("fundManager", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                     onChange={validateText("fundManager", setFieldValue)}
                    />
                    {errors.fundManager && touched.fundManager && (
                    <ErrorMessage
                        name="fundManager"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                    )}
                </div>
                </div>
                <div className='md:grid md:grid-cols-2 gap-4 relative md:bottom-9'>
                   <div className="relative bottom-6 md:bottom-2 lg:bottom-0">
                    <Label htmlFor="trustee">Trustee</Label>
                    <Field
                    id="trustee"
                    name="trustee"
                    placeholder="Enter trustee"
                    className="w-full p-3 border rounded focus:outline-none mt-3 text-[14px]"
                    />
                    {errors.trustee && touched.trustee && (
                    <ErrorMessage
                        name="trustee"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                    )}
                </div> 
                 <div className="relative bottom-2 lg:bottom-0">
                    <Label htmlFor="custodian">Custodian</Label>
                    <Field
                    id="custodian"
                    name="custodian"
                    placeholder="Enter custodian"
                    className="w-full p-3 border rounded focus:outline-none mt-3 text-[14px]"
                    />
                    {errors.custodian && touched.custodian && (
                    <ErrorMessage
                        name="custodian"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                    )}
                </div>
                </div>
                <div className='relative md:bottom-9 bottom-2'>
                   <Label htmlFor="mandate">Vehicle mandate</Label>
                   <div className='mt-4'>
                   <PdfAndDocFileUpload
                    handleDrop={handleDrop}
                    handleDragOver={handleDragOver}
                    setUploadedDocUrl={(url: string | null) => 
                      setFieldValue("mandate", url)
                    }
                    initialDocUrl={values.mandate}
                    cloudinaryFolderName='investment-vehicle-documents'
                  />
                   
                   </div>
                {errors.mandate && touched.mandate && (
               <div>
               
                <ErrorMessage
                    name="mandate"
                    component="div"
                    id="editCohortDescriptionError"
                    className="text-red-500 text-sm"
                  />
               </div>  
                )} 
                </div>
            </div>  
            <div className= "lg:flex lg:gap-24 gap-6 justify-between mt-6  md:mb-0 lg:px-8 relative lg:right-10">
                        <Button
                            id='saveInvestment'
                            variant={"outline"}
                             type="button"
                           className='w-full lg:w-36 h-[48px] mb-4 border-solid border-[#142854] text-[#142854] cursor-pointer'
                            onClick={()=> handleSaveDraft(values,setFieldError)}
                        >
                          {
                             vehicleTypeStatus === "DRAFT" && 
                            isLoading?  <Isloading /> : "Save to draft"
                          }       
                        </Button>

                        <Button
                            id='submitInvestment'
                            variant={"secondary"}
                            className={` w-full lg:w-36 h-[48px] ${
                                !isValid
                                    ? "bg-neutral650 cursor-auto hover:bg-neutral650 "
                                    : " bg-meedlBlue cursor-pointer"
                            }`}
                            type="submit"
                            disabled={!isValid}
                        >
                            {
                            vehicleTypeStatus === "SAVE-AND-CONTINUE" &&
                             isLoading ? <Isloading /> : "Continue"}
                        </Button>
                    </div>
            </div>
            <p
              className={`text-error500 flex justify-center items-center ${
                isError ? "mb-3" : ""
              }`}
            >
              {isError}
            </p>
            </Form>
        )}
       </Formik>
       </div>
       </div>
    </div>
  )
}

export default Setup
