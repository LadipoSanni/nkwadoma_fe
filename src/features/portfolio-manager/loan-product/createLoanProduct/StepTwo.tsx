
'use client'
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import React, { useState} from "react";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {useCreateLoanProductMutation} from "@/service/admin/loan_product";
import Isloading from "@/reuseable/display/Isloading";
import 'react-quill-new/dist/quill.snow.css'
import PdfAndDocFileUpload from "@/reuseable/Input/Pdf&docx-fileupload";
import {useRouter } from 'next/navigation';
import BankSelectField from '@/reuseable/Input/Bank-select-field';
import { Checkbox } from "@/components/ui/checkbox"
import CustomSelect from "@/reuseable/Input/Custom-select";
import { validateNumber, validateNumberLimit } from "@/utils/Format";
import VendorCostField from "./VendorCostField";
import {store, useAppSelector} from "@/redux/store";
import { setLoanProductFieldStepTwo,clearLoanProductField} from "@/redux/slice/loan-product/Loan-product";
import {useToast} from "@/hooks/use-toast";


interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

 interface Obj{
    product: string,
    vendorName: string,
    costOfService: string,
    duration: string
 }


function StepTwo() {
     const router = useRouter();
      const loanProductField = useAppSelector(state => (state?.loanProduct?.createLoanProductFieldStepTwo))
      const stepOneLoanProductField = useAppSelector(state => (state?.loanProduct?.createLoanProductField))
      const [selectCurrency, setSelectCurrency] = useState("NGN");
    const [error, setError] = useState('');
     const [createLoanProduct, {isLoading}] = useCreateLoanProductMutation();
     const {toast} = useToast();
      const isFormValid = (values: typeof initialFormValue) => {
        
        if (values.vendor.length === 0) return true;
        
        return values.vendor.every(vendor => {
          if (vendor.product) { 
            return vendor.vendorName && vendor.costOfService && vendor.duration && /^[1-9]\d{0,2}$/.test(vendor.duration);
          }
          return true;
        });
      };


     const creditLifeInsuranceNigeria = [
        "Sanlam Nigeria",
        "Industrial and General Insurance Plc (IGI)",
        "Capital Express Assurance",
        "Stanbic IBTC Insurance Limited",
        "Tangerine Life Insurance",
        "Emple Life Assurance Limited (emPLE)",
        "NICO Life Assurance",
        "AIICO Insurance",
        "Zenith Life Assurance",
        "Axa Mansard Life Insurance",
        "African Alliance Insurance",
        "Sovereign Trust Insurance",
        "Coronation Insurance",
        "Old Mutual Nigeria",
        "FBS Reinsurance",
        "Custodian Life Assurance",
        "Veritas Kapital Assurance",
        "GoldLink Insurance Plc",
        "LASACO Assurance Plc",
        "Leadway Assurance"
      ];

      const healthInsuranceProvidersNigeria = [
        "Hygeia HMO",
        "AXA Mansard Health",
        "Avon Healthcare Limited",
        "Clearline International Limited",
        "Greenbay Healthcare Services",
        "Integrated Healthcare Limited",
        "Marina Medical Services HMO",
        "Mediplan Healthcare Limited",
        "Metropolitan Health HMO",
        "Premier Health HMO"
    ];

    const accommodationProvidersNigeria = [
        "Airbnb",
        "Booking.com",
        "Jumia Travel (formerly Jovago)",
        "Jara Beach Resort",
        "Transcorp Hotels",
        "Eko Hotels & Suites",
        "Radisson Blu Hotel",
        "Sheraton Hotels & Resorts",
        "The Wheatbaker Hotel",
        "Federal Palace Hotel"
    ];
      
    const deviceProvidersNigeria = [
        "Samsung Nigeria",
        "Tecno Mobile",
        "Infinix Mobility",
        "Apple Authorized Resellers Nigeria",
        "HP Nigeria",
        "Dell Nigeria",
        "Lenovo Nigeria",
        "Microsoft Nigeria",
        "Oracle Nigeria",
        "Slot Nigeria"
    ];
   
     const initialFormValue = {
        bankPartner: loanProductField?.bankPartner ||  "",
        vendor: loanProductField?.vendor || [] as Obj[],
        disbursementTerms: loanProductField?.disbursementTerms ||  ""
               
         }

         const saveToRedux = (values: typeof initialFormValue) => {
            const createLoanProductData = {
                bankPartner: values?.bankPartner,
                vendor: values?.vendor,
                disbursementTerms: values?.disbursementTerms
            }
             store.dispatch(setLoanProductFieldStepTwo(createLoanProductData))
         }


    const validationSchema = Yup.object().shape({
      
    });

    const handleBackRoute =() => {
        router.push("/loan-product/step-one")
    }

    const handleInsuranceChange = (
        checked: boolean | string, 
        setFieldValue: (field: string, value: string | number | boolean | Obj[] | null | undefined) => void, 
        values: typeof initialFormValue,
        insuranceType: string,
    ) => {
        const insurance: Obj = {
            product: insuranceType,
            vendorName: "",
            costOfService: "",
            duration: ""
        };

        if (checked) {
            if (!values.vendor.some(v => v.product === insuranceType)) {
                setFieldValue("vendor", [...values.vendor, insurance]);
            }
        } else {
            setFieldValue("vendor", values.vendor.filter(v => v.product !== insuranceType));
        }
    };
     

    const updateVendorField = (
        setFieldValue: (field: string, value:string | number | boolean | Obj[] | null | undefined) => void,
        values: typeof initialFormValue,
        insuranceType: string,
        fieldName: keyof Obj,
        value: string
    ) => {
        const updatedVendor = values.vendor.map(v => 
            v.product === insuranceType 
                ? {...v, [fieldName]: value}
                : v
        );
        setFieldValue("vendor", updatedVendor);
    };


    const handleSubmit = async (values: typeof initialFormValue) => {
        const formData = {
           name: stepOneLoanProductField?.productName,
           investmentVehicleId: stepOneLoanProductField?.investmentVehicleId,
           loanProductSize: stepOneLoanProductField?.loanProductSize,
           minRepaymentAmount: stepOneLoanProductField?.minimumRepaymentAmount,
           obligorLoanLimit: stepOneLoanProductField?.obligorLimit,
           interestRate: stepOneLoanProductField?.interest,
           costOfFund: stepOneLoanProductField?.costOfFunds,
           tenor: stepOneLoanProductField?.tenor,
           termsAndCondition: stepOneLoanProductField?.loanProductTermsAndCondition,
           mandate: stepOneLoanProductField?.loanProductMandate,
           bankPartner: values?.bankPartner,
           disbursementTerms: values?.disbursementTerms,
           moratorium: stepOneLoanProductField?.moratorium,
           sponsors: stepOneLoanProductField?.sponsors,
           vendors: values?.vendor
        }

         try {
            const create = await createLoanProduct(formData).unwrap();
            if (create) {
                toast({
                    description: create.message,
                    status: "success",
                    duration: 2000
                });  
                store.dispatch(clearLoanProductField())
                router.push("/loan-product")
        }
        } catch (err) {
            const error = err as ApiError;
            setError(error ? error?.data?.message : "Error occurred");
        }
    };


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

  

  return (
    <div className={`${inter.className} `}>
        <div  className='xl:px-36 grid grid-cols-1 gap-y-6 '>
        <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Create loan product</h1>
        <p className='text-[14px] font-normal'>Provide details of your loan product</p>
       </div>
       <div>
       <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {
                    ({setFieldValue, values,setFieldError}) => (
                        <Form className={`${inter.className}`}>
                            <div>
                            <div className="grid grid-cols-1 gap-y-4 md:max-h-[45vh] md:relative overflow-y-auto lg:px-16 relative  lg:right-16  "
                                  style={{
                                    overflowY: "auto",
                                    marginRight: "-10px",  
                                    paddingRight: "10px",  
                                  }}
                            >
                            <div>
                            <Label htmlFor="bankPartner">Bank partner</Label>
                             <BankSelectField
                            triggerId='bankTriggerId'
                            id='bankId'
                            value={values.bankPartner}
                            onChange={(value: string) =>{ 
                                setFieldValue("bankPartner", value)
                            }}
                            bankName="bankPartner"
                            placeHolder='Select bank'
                            className='h-[3.0rem]'
                        />
                           
                        </div>

                         <div className="relative bottom-4">
                         <Label htmlFor="insuranceProvider">Loan insurance provider (optional)</Label> 
                           <div>
                           <div className="border border-solid py-4 rounded-md pl-4 mt-4">
                           <div className="flex items-center gap-2">
                                <Checkbox 
                                id="credit"
                                 className="  border-[#D7D7D7] shadow-none data-[state=checked]:bg-[#142854] pb-3 h-[18px] w-[18px]"
                                checked={values.vendor.some(v => v.product === "CREDIT_LIFE_INSURANCE_PROVIDER")}
                                onCheckedChange={(checked) => 
                                handleInsuranceChange(checked, setFieldValue, values, "CREDIT_LIFE_INSURANCE_PROVIDER")
                                }
                                 />
                                <Label htmlFor="credit" className="text-[14px]">Credit life insurance provider</Label>
                            </div>
                           {
                            values.vendor.some(v => v.product === "CREDIT_LIFE_INSURANCE_PROVIDER") && (
                                <div className="mt-8 pr-4">
                                    <div>
                                    <Label htmlFor="provider" className="text-[14px]">Provider</Label> 
                                    <CustomSelect
                                      triggerId='providerTriggerId'
                                       id='providerId'
                                       selectContent={creditLifeInsuranceNigeria}
                                       value={values.vendor.find(v => v.product === "CREDIT_LIFE_INSURANCE_PROVIDER")?.vendorName || ""}
                                       onChange={(value: string) => updateVendorField(setFieldValue, values, "CREDIT_LIFE_INSURANCE_PROVIDER", "vendorName", value)}
                                       name="vendorName"
                                       placeHolder="Select provider"
                                    />  
                                    </div>
                                    <div>
                  <Label htmlFor="serviceCost">Cost of service</Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <VendorCostField
                    value={values.vendor.find(v => v.product === "CREDIT_LIFE_INSURANCE_PROVIDER")?.costOfService || ""}
                    onChange={(value: string) => { 
                    updateVendorField(setFieldValue, values, "CREDIT_LIFE_INSURANCE_PROVIDER", "costOfService", value);
                    validateNumber("costOfService", setFieldValue);
                    }}
                     />   
                  </div>
                
                </div>

                  <div className="font-normal">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="flex border border-solid rounded-md w-40 gap-4 mt-3">
                  <input
                    id="durationId"
                    className="w-20 p-3 border rounded focus:outline-none mt-2 text-[14px] border-none"
                    placeholder="0"
                    value={values.vendor.find(v => v.product === "CREDIT_LIFE_INSURANCE_PROVIDER")?.duration || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (/^[1-9]\d{0,2}$/.test(value) || value === "") {
                            updateVendorField(setFieldValue, values, "CREDIT_LIFE_INSURANCE_PROVIDER", "duration", value);
                            validateNumberLimit(
                              "duration",
                              setFieldValue,
                              setFieldError,
                              3,
                              "Duration must be a positive number, must not start with zero, and must be a maximum of three digits."
                            );
                          }
                        }}
                    />
                    <p className="bg-[#F9F9F9] flex items-center h-[44px] relative top-[4px] text-[14px] px-2 rounded-lg">month</p>
                  </div>
                  </div>
                                </div>
                            )
                           }
                            </div> 
                         </div>

                         <div>
                           <div className="border border-solid py-4 rounded-md pl-4 mt-4">
                           <div className="flex items-center gap-2">
                                <Checkbox 
                                id="credit"
                                 className="  border-[#D7D7D7] shadow-none data-[state=checked]:bg-[#142854] pb-3 h-[18px] w-[18px]"
                                checked={values.vendor.some(v => v.product === "HEALTH_INSURANCE_PROVIDER")}
                                onCheckedChange={(checked) => 
                                handleInsuranceChange(checked, setFieldValue, values, "HEALTH_INSURANCE_PROVIDER")
                                }
                                 />
                                <Label htmlFor="credit" className="text-[14px]">Health insurance provider</Label>
                            </div>
                           {
                            values.vendor.some(v => v.product === "HEALTH_INSURANCE_PROVIDER") && (
                                <div className="mt-8 pr-4">
                                    <div>
                                    <Label htmlFor="provider" className="text-[14px]">Provider</Label> 
                                    <CustomSelect
                                      triggerId='providerTriggerId'
                                       id='providerId'
                                       selectContent={healthInsuranceProvidersNigeria}
                                       value={values.vendor.find(v => v.product === "HEALTH_INSURANCE_PROVIDER")?.vendorName || ""}
                                       onChange={(value: string) => updateVendorField(setFieldValue, values, "HEALTH_INSURANCE_PROVIDER", "vendorName", value)}
                                       name="vendorName"
                                       placeHolder="Select provider"
                                    />  
                                    </div>
                                    <div>
                  <Label htmlFor="serviceCost">Cost of service</Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <VendorCostField
                    value={values.vendor.find(v => v.product === "HEALTH_INSURANCE_PROVIDER")?.costOfService || ""}
                    onChange={(value: string) => { 
                    updateVendorField(setFieldValue, values, "HEALTH_INSURANCE_PROVIDER", "costOfService", value);
                    validateNumber("costOfService", setFieldValue);
                    }}
                     />   
                  </div>
                
                </div>

                  <div className="font-normal">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="flex border border-solid rounded-md w-40 gap-4 mt-3">
                  <input
                    id="durationId"
                    className="w-20 p-3 border rounded focus:outline-none mt-2 text-[14px] border-none"
                    placeholder="0"
                    value={values.vendor.find(v => v.product === "HEALTH_INSURANCE_PROVIDER")?.duration || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (/^[1-9]\d{0,2}$/.test(value) || value === "") {
                            updateVendorField(setFieldValue, values, "HEALTH_INSURANCE_PROVIDER", "duration", value);
                            validateNumberLimit(
                              "duration",
                              setFieldValue,
                              setFieldError,
                              3,
                              "Duration must be a positive number, must not start with zero, and must be a maximum of three digits."
                            );
                          }
                        }}
                    />
                    <p className="bg-[#F9F9F9] flex items-center h-[44px] relative top-[4px] text-[14px] px-2 rounded-lg">month</p>
                  </div>
                  </div>
                                </div>
                            )
                           }
                            </div> 
                         </div>

                         <div>
                           <div className="border border-solid py-4 rounded-md pl-4 mt-4">
                           <div className="flex items-center gap-2">
                                <Checkbox 
                                id="credit"
                                 className="  border-[#D7D7D7] shadow-none data-[state=checked]:bg-[#142854] pb-3 h-[18px] w-[18px]"
                                checked={values.vendor.some(v => v.product === "ACCOMMODATION")}
                                onCheckedChange={(checked) => 
                                handleInsuranceChange(checked, setFieldValue, values, "ACCOMMODATION")
                                }
                                 />
                                <Label htmlFor="credit" className="text-[14px]">Accomodation provider</Label>
                            </div>
                           {
                            values.vendor.some(v => v.product === "ACCOMMODATION") && (
                                <div className="mt-8 pr-4">
                                    <div>
                                    <Label htmlFor="provider" className="text-[14px]">Provider</Label> 
                                    <CustomSelect
                                      triggerId='providerTriggerId'
                                       id='providerId'
                                       selectContent={accommodationProvidersNigeria}
                                       value={values.vendor.find(v => v.product === "ACCOMMODATION")?.vendorName || ""}
                                       onChange={(value: string) => updateVendorField(setFieldValue, values, "ACCOMMODATION", "vendorName", value)}
                                       name="vendorName"
                                       placeHolder="Select provider"
                                    />  
                                    </div>
                                    <div>
                  <Label htmlFor="serviceCost">Cost of service</Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <VendorCostField
                    value={values.vendor.find(v => v.product === "ACCOMMODATION")?.costOfService || ""}
                    onChange={(value: string) => { 
                    updateVendorField(setFieldValue, values, "ACCOMMODATION", "costOfService", value);
                    validateNumber("costOfService", setFieldValue);
                    }}
                     />   
                  </div>
                
                </div>

                  <div className="font-normal">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="flex border border-solid rounded-md w-40 gap-4 mt-3">
                  <input
                    id="durationId"
                    className="w-20 p-3 border rounded focus:outline-none mt-2 text-[14px] border-none"
                    placeholder="0"
                    value={values.vendor.find(v => v.product === "ACCOMMODATION")?.duration || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (/^[1-9]\d{0,2}$/.test(value) || value === "") {
                            updateVendorField(setFieldValue, values, "ACCOMMODATION", "duration", value);
                            validateNumberLimit(
                              "duration",
                              setFieldValue,
                              setFieldError,
                              3,
                              "Duration must be a positive number, must not start with zero, and must be a maximum of three digits."
                            );
                          }
                        }}
                    />
                    <p className="bg-[#F9F9F9] flex items-center h-[44px] relative top-[4px] text-[14px] px-2 rounded-lg">month</p>
                  </div>
                  </div>
                                </div>
                            )
                           }
                            </div> 
                         </div>

                         <div>
                           <div className="border border-solid py-4 rounded-md pl-4 mt-4">
                           <div className="flex items-center gap-2">
                                <Checkbox 
                                id="credit"
                                 className="  border-[#D7D7D7] shadow-none data-[state=checked]:bg-[#142854] pb-3 h-[18px] w-[18px]"
                                checked={values.vendor.some(v => v.product === "DEVICE")}
                                onCheckedChange={(checked) => 
                                handleInsuranceChange(checked, setFieldValue, values, "DEVICE")
                                }
                                 />
                                <Label htmlFor="credit" className="text-[14px]">Device provider</Label>
                            </div>
                           {
                            values.vendor.some(v => v.product === "DEVICE") && (
                                <div className="mt-8 pr-4">
                                    <div>
                                    <Label htmlFor="provider" className="text-[14px]">Provider</Label> 
                                    <CustomSelect
                                      triggerId='providerTriggerId'
                                       id='deviceProviderId'
                                       selectContent={deviceProvidersNigeria}
                                       value={values.vendor.find(v => v.product === "DEVICE")?.vendorName || ""}
                                       onChange={(value: string) => updateVendorField(setFieldValue, values, "DEVICE", "vendorName", value)}
                                       name="vendorName"
                                       placeHolder="Select provider"
                                    />  
                                    </div>
                                    <div>
                  <Label htmlFor="serviceCost">Cost of service</Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <VendorCostField
                    value={values.vendor.find(v => v.product === "DEVICE")?.costOfService || ""}
                    onChange={(value: string) => { 
                    updateVendorField(setFieldValue, values, "DEVICE", "costOfService", value);
                    validateNumber("costOfService", setFieldValue);
                    }}
                     />   
                  </div>
                
                </div>

                  <div className="font-normal">
                  <Label htmlFor="duration">Duration</Label>
                  <div className="flex border border-solid rounded-md w-40 gap-4 mt-3">
                  <input
                    id="durationId"
                    className="w-20 p-3 border rounded focus:outline-none mt-2 text-[14px] border-none"
                    placeholder="0"
                    value={values.vendor.find(v => v.product === "DEVICE")?.duration || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (/^[1-9]\d{0,2}$/.test(value) || value === "") {
                            updateVendorField(setFieldValue, values, "DEVICE", "duration", value);
                            validateNumberLimit(
                              "duration",
                              setFieldValue,
                              setFieldError,
                              3,
                              "Duration must be a positive number, must not start with zero, and must be a maximum of three digits."
                            );
                          }
                        }}
                    />
                    <p className="bg-[#F9F9F9] flex items-center h-[44px] relative top-[4px] text-[14px] px-2 rounded-lg">month</p>
                  </div>
                  </div>
                                </div>
                            )
                           }
                            </div> 
                         </div>
                         </div>

                         <div>
                           <Label htmlFor="disbursementTerms" className={`pb-5`}>
                               Loan disbursement terms (optional)</Label>
                           
                               <div className={`pt-3`}>
                                        <PdfAndDocFileUpload
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                            setUploadedDocUrl={(url: string | null) => {
                                                setFieldValue("disbursementTerms", url)
                                            }
                                            }
                                            initialDocUrl={values.disbursementTerms}
                                            cloudinaryFolderName='disbursementTerms'
                                        />
                                    </div>
                         </div>
                          {/* <div className="mt-6 p-4 bg-gray-100 rounded-md">
  <h3 className="text-sm font-medium mb-2">Form Values (Debug):</h3>
  <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-40">
    {JSON.stringify(values, null, 2)}
  </pre>
</div> */}
       
                                </div>
                                
                            <div className={`md:flex justify-between pt-5 gap-3 pb-5 lg:pr-12 mt-4 md:mt-0 `}>
                                  <div>
                                  <Button
                                        className={`text-meedlBlue border border-meedlBlue h-12 md:w-32 w-full`}
                                        variant={"outline"}
                                        type={"button"}
                                        onClick={()=>{
                                            handleBackRoute()
                                            saveToRedux(values)
                                        }}
                                    >
                                        Back
                                    </Button>
                                  </div >
                                  <div className="mt-3 md:mt-0">
                                    <Button
                                        className={`h-12 md:w-32 w-full ${!isFormValid(values) ? 'bg-[#D7D7D7] hover:bg-[#D7D7D7] text-meedlWhite cursor-not-allowed ' : 'bg-meedlBlue text-meedlWhite cursor-pointer'}`}
                                        variant={"secondary"}
                                        type={"submit"}
                                        disabled={!isFormValid(values)}
                                    >
                                        {isLoading ? (<Isloading/>) : (
                                           "Create"
                                        )}
                                    </Button>
                                    </div>
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm mt-2 text-center">
                                        {error}
                                    </div>
                                )}
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

export default StepTwo