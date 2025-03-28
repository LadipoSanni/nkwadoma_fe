import React,{ useState } from 'react'
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { inter } from "@/app/fonts";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import Isloading from "@/reuseable/display/Isloading";
// import { useCreateInvestmentVehicleMutation } from "@/service/admin/fund_query";
// import { useToast } from "@/hooks/use-toast";
import { validateNumber, validatePositiveNumberWithIndexNumbers } from "@/utils/Format";
import { validateText, validateNumberLimit } from "@/utils/Format";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
import FormikCustomQuillField from "@/reuseable/textArea/FormikCustomQuillField";
import {useRouter } from 'next/navigation';
import DatePickerInput from "@/reuseable/Input/DatePickerInput";
import { format, parseISO } from "date-fns";


// interface ApiError {
//     status: number;
//     data: {
//       message: string;
//     };
//   }
  
  const initialFormValue = {
    name: "",
    fundManager: "",
    minimumInvestmentAmount: "",
    mandate: "",
    tenure: "",
    size: "",
    rate: "",
    bankPartner: "",
    trustee: "",
    custodian: "",
    investmentVehicleType: "",
    startDate: "",
  };

interface Props {
    // type?: string;
  investmentVehicleType?: string;
    
}

function Setup({investmentVehicleType}: Props) {
    const [selectCurrency, setSelectCurrency] = useState("NGN");
//   const [isError, setError] = useState("");
//   const [vehicleTypeStatus, setVehicleTypeStatus] = useState('');
//   const [createInvestmentVehicle, { isLoading }] = useCreateInvestmentVehicleMutation();
//   const { toast } = useToast();
   const router = useRouter();
    const isLoading = false

   const handlenext = () => {

      router.push("/vehicle/status")
   }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .trim()
          .matches(
            // /^[a-zA-Z0-9\-_' ]*$/,
            // "name can include letters,numbers, hyphens,apostrophe and underscores only."
            /^[a-zA-Z][a-zA-Z0-9\-' ]*$/,
            "Name can include letters, numbers, hyphens and apostrophes only, and must start with a letter."
          )
          .test(
            "valid-name",
            "Name cannot be only numbers or special characters.",
            (value = "") => {
              const trimmedValue = value.trim();
              if (trimmedValue === "") {
                return true;
              }
              const hasLetter = /[a-zA-Z]/.test(value);
              const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
              return hasLetter && !isOnlyNumbersOrSpecials;
            }
          )
          .max(200, "Name cannot be more than 200 characters.")
          .required("Name is required"),
        fundManager: Yup.string()
          .trim()
          .matches(
            /^[a-zA-Z][a-zA-Z\-' ]*$/,
            "Invalid fund manager name"
          )
          .max(100, "Fund manager cannot be more than 100 characters.")
          .test(
            "valid-fundManager",
            "fund manager cannot be only numbers or special characters.",
            (value = "") => {
              const trimmedValue = value.trim();
              if (trimmedValue === "") {
                return true;
              }
              const hasLetter = /[a-zA-Z]/.test(value);
              const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
              return hasLetter && !isOnlyNumbersOrSpecials;
            }
          )
          .required("Fund manager is required"),
        size: Yup.string().required("Vehicle size is required"),
        //  .matches(/^[1-9]\d*$/, 'Vehicle size must be a positive number and cannot start with zero'),
        minimumInvestmentAmount: Yup.string()
          .required("Minimum investment amount is required")
          .test(
            "minimum-less-or-equal-to-size",
            "Minimum Investment Amount must be less than or equal to Vehicle Size.",
            function (value) {
              const { size } = this.parent;
              return !value || !size || parseFloat(value) <= parseFloat(size);
            }
          ),
        //  .matches(/^[1-9]\d*$/, 'minimum investmentAmount must be a positive number and cannot start with zero'),
        tenure: Yup.string()
          .trim()
          .required("Tenor is required")
          .matches(
            /^[1-9]\d{0,2}$/,
            "Tenor must be a three-digit positive number and cannot start with zero."
          ),
        rate: Yup.number()
          .min(0, "Rate must be at least 1.")
          .max(100, "Rate must be at most 100.")
          .required("Rate is required"),
        mandate: Yup.string()
          .trim()
          .max(2500, "Mandate must be 2500 characters or less")
          .required("mandate is required")
          .test("not-empty", "Mandate is required.", (value = "") => {
            const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
            return sanitizedValue !== "";
          }),
        bankPartner: Yup.string().trim().required("Bank partner is required"),
        trustee: Yup.string()
        .trim()
        .max(100, "Trustee cannot be more than 100 characters.")
        .matches(
          /^[a-zA-Z][a-zA-Z\-' ]*$/,
          // "Trustee can include letters, - and ' only and cannot start with - and ' ."
          "Invalid trustee name"
        )
        .required("Trustee is required"),
        custodian: Yup.string()
        .trim()
        .required("Custodian is required")
        .max(100, "Custodian cannot be more than 100 characters.")
        .matches(
          /^[a-zA-Z][a-zA-Z\-' ]*$/,
          "Invalid custodian name"
        ),
        startDate: Yup.date()
              .required("Start date is required")
              .nullable()
      });

       const handleSubmit = (values: typeof initialFormValue) => {
             console.log(values)
             handlenext()
       }

    function handleSaveDraft() {
       
    }

  return (
    <div className={`${inter.className} `}>
        <div className='xl:px-36 grid grid-cols-1 gap-y-6 '>
       <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Set up commercial fund</h1>
        <p className='text-[14px] font-thin'>Provide details of your commercial fund</p>
       </div>
       <div>
       <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
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
            <div className="grid grid-cols-1 gap-y-4 md:max-h-[55vh]  overflow-y-auto "
                //  style={{
                //   scrollbarWidth: "none",
                //   msOverflowStyle: "none",
                // }}
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
              selectedDate={parseISO(values.startDate ?? "")}
                onDateChange={(date) =>
                setFieldValue("startDate", format(date, "yyyy-MM-dd"))
                }
                 className="p-6 mt-2 text-[14px] text-[#6A6B6A]"
                 disabledDate={
                      (date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)
                    }
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
                        <Label htmlFor="rate">Interest rate...</Label>
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
                                <Label htmlFor="tenure">Tenor (months)</Label>
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
                      //  className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2 "
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
                      onChange={validateNumber(
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
                   <Field
                  name="mandate"
                  component={FormikCustomQuillField}
                  maximumDescription={2500}
                  // label={"Mandate"}
                  placeholder={"Enter mandate..."}
                />
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
            <div className= "md:flex gap-4 justify-between mt-6  md:mb-0">
                        <Button
                            variant={"outline"}
                             type="button"
                           className='w-full lg:w-36 h-[48px] mb-4 border-solid border-[#142854] text-[#142854]'
                            // onClick={() => handleReset(resetForm)}
                            onClick={()=> handleSaveDraft}
                        >
                          {
                            // vehicleTypeStatus === "DRAFT" && 
                            isLoading?  <Isloading /> : "Save to draft"
                          }
                            
                        </Button>
                        <Button
                            variant={"default"}
                            className={` w-full lg:w-36 h-[48px] ${
                                !isValid
                                    ? "bg-neutral650 cursor-auto hover:bg-neutral650 "
                                    : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                            }`}
                            type="submit"
                            disabled={!isValid}
                        >
                            {
                            // vehicleTypeStatus === "PUBLISH" &&
                             isLoading ? <Isloading /> : "Save and continue"}
                        </Button>
                    </div>
            </div>
            </Form>
        )}
       </Formik>
       </div>
       </div>
    </div>
  )
}

export default Setup
