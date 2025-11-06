'use client'
import {Form, Formik,FieldArray} from "formik";
import * as Yup from "yup";
import {inter} from "@/app/fonts"
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import React, { useState,useEffect} from "react";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import {useCreateLoanProductMutation,useUpdateLoanProductMutation} from "@/service/admin/loan_product";
import Isloading from "@/reuseable/display/Isloading";
import 'react-quill-new/dist/quill.snow.css'
// import PdfAndDocFileUpload from "@/reuseable/Input/Pdf&docx-fileupload";
import {useRouter } from 'next/navigation';
import BankSelectField from '@/reuseable/Input/Bank-select-field';
import CustomSelect from "@/reuseable/Input/Custom-select-and-add";
import { validateNumber, validateNumberLimit } from "@/utils/Format";
import VendorCostField from "./VendorCostField";
import {store, useAppSelector} from "@/redux/store";
import { setLoanProductFieldStepTwo,clearLoanProductField} from "@/redux/slice/loan-product/Loan-product";
import {useToast} from "@/hooks/use-toast";
import { MdDeleteOutline, MdAdd } from 'react-icons/md';
import { useViewAllProviderServicesQuery,useViewAllPartnerProvidersQuery } from "@/service/admin/vendor/vendor_query";


interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

 interface partner{
  providerServices: string[],
    vendorName: string,
    costOfService: string,
    duration: string,
    id?: string
 }


function StepTwo() {
     const router = useRouter();
      const loanProductField = useAppSelector(state => (state?.loanProduct?.createLoanProductFieldStepTwo))
      const stepOneLoanProductField = useAppSelector(state => (state?.loanProduct?.createLoanProductField))
       const completedStep = useAppSelector(state => (state?.loanProduct?.completedSteps))
       const isEdit = useAppSelector(state => state?.loanProduct?.isEdit)
      const [selectCurrency, setSelectCurrency] = useState("NGN");
    const [error, setError] = useState('');
     const [createLoanProduct, {isLoading}] = useCreateLoanProductMutation();
     const [updateLoanProduct, {isLoading:isUpdateLoading}] =useUpdateLoanProductMutation()
    
    const [providerSearchTerm, setProviderSearchTerm] = useState("");
    const [providersMap, setProvidersMap] = useState<Map<string, partner>>(new Map());
    const [pageNumber, setPageNumber] = useState(0);
    const [hasNextPage, setNextPage] = useState(true);

    const [serviceSearchTerm, setServiceSearchTerm] = useState("");
    const [servicesMap, setServicesMap] = useState<Map<string, string>>(new Map());
    const [pageServiceNumber, setPageServiceNumber] = useState(0);
    const [serviceHasasNextPage, setServiceNextPage] = useState(true);


     const {toast} = useToast();

     const providers = Array.from(providersMap.values());
     const services = Array.from(servicesMap.values());

     const param = {
      ...(providerSearchTerm && { name: providerSearchTerm }),
        pageSize: 10,
        pageNumber: pageNumber
     }

     const serviceParam = {
      ...(serviceSearchTerm && { name: serviceSearchTerm}),
      pageSize: 10,
      pageNumber: pageServiceNumber
   }


     const {data,isLoading:isProvidersLoading,isFetching} = useViewAllPartnerProvidersQuery(param,{refetchOnMountOrArgChange:true})


     const {data:serviceData,isLoading:isServiceLoading,isFetching: isServiceFetching } = useViewAllProviderServicesQuery(serviceParam,{refetchOnMountOrArgChange:true})

     useEffect(() => {
      setPageNumber(0);
          }, [providerSearchTerm]);

    useEffect(() => {
      setPageServiceNumber(0);
        }, [serviceSearchTerm]);

        useEffect(() => {
          if (data && data?.data) {
              setProvidersMap(prev => {
                  const newMap = new Map(prev);
                  if (pageNumber === 0) {
                      newMap.clear();
                  }
                  
                  data.data.body
                      .filter((provider: partner) => 
                          provider.vendorName && 
                          provider.vendorName.trim() !== "" &&
                          typeof provider.vendorName === 'string'
                      )
                      .forEach((provider: partner) => {
                          newMap.set(provider.vendorName.toLowerCase(), provider);
                      });
                  
                  return newMap;
              });
              setNextPage(data?.data?.hasNextPage);
          }
      }, [data, pageNumber, providerSearchTerm]);
  
      useEffect(() => {
          if (serviceData && serviceData?.data) {
              setServicesMap(prev => {
                  const newMap = new Map(prev);
                  
                  if (pageServiceNumber === 0) {
                      newMap.clear();
                  }
                  
                  serviceData.data.body
                      .filter((service: string) => service && service.trim() !== "")
                      .forEach((service: string) => {
                          newMap.set(service.toLowerCase(), service);
                      });
                  
                  return newMap;
              });
              setServiceNextPage(serviceData.data?.hasNextPage);
          }
      }, [serviceData, pageServiceNumber, serviceSearchTerm]);

  const isFormValid = (values: typeof initialFormValue) => {
    if (values.vendor.length === 0) return true;
    
    const vendorNames = values.vendor.map(v => v.vendorName?.toLowerCase().trim());
    const hasDuplicateVendors = new Set(vendorNames).size !== vendorNames.length;
    
    const serviceNames = values.vendor.map(v => v.providerServices?.[0]?.toLowerCase().trim());
    const hasDuplicateServices = new Set(serviceNames).size !== serviceNames.length;
    
    if (hasDuplicateVendors || hasDuplicateServices) {
      return false;
    }
    
    return values.vendor.every(vendor => {
      if (vendor.vendorName) { 
        return vendor.vendorName && vendor.providerServices?.[0] && vendor.costOfService && vendor.duration && /^[1-9]\d{0,2}$/.test(vendor.duration);
      }
      return true;
    });
  };

      const providerOptions = providers.map(provider => ({
        // id: provider.id || `temp-${provider.vendorName}`,
        name: provider.vendorName
      }));

      const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    const loadMoreService = () => {
      if (!isServiceFetching && serviceHasasNextPage) {
        setPageServiceNumber((prevPage) => prevPage + 1);
      }
  };

      const areCurrentProvidersValid = (vendors: partner[]) => {
        return vendors.every(vendor => 
          vendor.vendorName && 
          vendor.providerServices?.[0] && 
          vendor.costOfService && 
          vendor.duration && 
          /^[1-9]\d{0,2}$/.test(vendor.duration)
        );
      };


      useEffect(()=> {
           if(!completedStep.includes("stepTwo")){
            router.push('/loan-product/step-one');
           }
         },[completedStep, router])
   
     const initialFormValue = {
        bankPartner: loanProductField?.bankPartner ||  "",
        vendor: loanProductField?.vendor && loanProductField?.vendor?.length > 0 ? loanProductField.vendor : [{providerServices: [""],vendorName: "",costOfService: "",duration: ""}] as partner[],
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
    
    const handleSubmit = async (values: typeof initialFormValue) => {

      const filteredVendors = values.vendor.filter(vendor => {
        const vendorName = String(vendor.vendorName || '').trim();
        const service = String(vendor.providerServices?.[0] || '').trim();
        const costOfService = String(vendor.costOfService || '').trim();
        const duration = String(vendor.duration || '').trim();
        return vendorName && service && costOfService && duration;
    });

        const formData = {
           id: stepOneLoanProductField?.id,
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
           vendors: filteredVendors
        }

         try {
            if(stepOneLoanProductField?.id) {
              const update = await updateLoanProduct(formData).unwrap();
              if (update) {
                  toast({
                      description: update.message,
                      status: "success",
                      duration: 2000
                  });  
                  store.dispatch(clearLoanProductField())
                  router.push("/loan-product/loan-product-details")
          }
            }else {
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
      }
        } catch (err) {
            const error = err as ApiError;
            setError(error ? error?.data?.message : "Error occurred");
        }
    };
  

  return (
    <div className={`${inter.className} `}>
        <div  className='xl:px-36 grid grid-cols-1 gap-y-6 '>
        <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>
        {
                isEdit? "Update loan partnership" : "Loan partnership"
            }
          {/* Loan partnership */}
          </h1>
        <p className='text-[14px] font-normal'>Provide details of your loan partnership</p>
       </div>
       <div>
       <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {
                    ({setFieldValue, values,setFieldError}) =>{ 
                       
                      const handleVendorNameChange = (index: number, value: string) => {
                        if (!providersMap.has(value.toLowerCase())) {
                            const newProvider: partner = {
                                id: "",
                                vendorName: value,
                                providerServices: [""],
                                costOfService: "",
                                duration: ""
                            };
                            
                            setProvidersMap(prev => {
                                const newMap = new Map(prev);
                                newMap.set(value.toLowerCase(), newProvider);
                                return newMap;
                            });
                        }
                        
                        setFieldValue(`vendor.${index}.vendorName`, value);
                    };

                    const handleVendorServicesChange = (index: number, value: string) => {
                      if (!servicesMap.has(value.toLowerCase())) {
                          setServicesMap(prev => {
                              const newMap = new Map(prev);
                              newMap.set(value.toLowerCase(), value);
                              return newMap;
                          });
                      }
                      
                      setFieldValue(`vendor.${index}.providerServices`, [value]);
                  };
              
                      return (
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
                         <Label htmlFor="insuranceProvider">Loan service provider (optional)</Label> 
                         <div>
                          <FieldArray name="vendor">
                           {
                            ({ push, remove }) => (
                              <div className="space-y-4">
                              {
                                values.vendor?.map((vendor, index)  => (
                                  <div key={index} className="mt-4">
                                    
                                 <div className="border border-solid border-gray-200 rounded-lg p-6 bg-white">
                                  <div  className="mb-4">
                                  <Label htmlFor={`vendor.${index}.vendorName`} className="text-sm font-medium">
                                                                        Provider name
                                   </Label>

                                   <CustomSelect
                                  triggerId={`vendorTrigger-${index}`}
                                  id={`vendorId-${index}`}
                                  selectContent={providerOptions} 
                                  value={vendor?.vendorName}
                                  onChange={(value: string) => 
                                    handleVendorNameChange(index, value)
                                  }
                                  name={`vendor.${index}.vendorName`}
                                  placeHolder="Select provider name"
                                  infinityScroll={{
                                    hasMore: hasNextPage,
                                    loadMore: loadMore,
                                    loader: isFetching
                                  }}
                                  isloading={isProvidersLoading }
                                  isFetching={isFetching}
                                  emptyState="No provider available"
                                  isItemDisabled={(item) => {
                                    const itemName = typeof item === 'object' ? item.name : String(item);
                                    return values.vendor.some((v, i) => i !== index && v.vendorName === itemName);
                                  }}
                                  showSearch={true}
                                  searchTerm={providerSearchTerm}
                                  setSearchTerm={setProviderSearchTerm}
                                  // isTyping={isTyping}
                              />

                                  </div>

                                  <div className="mb-4">
                                  <Label htmlFor={`vendor.${index}.product`} className="text-sm font-medium">
                                                                        Provider service
                                   </Label>
                                   <CustomSelect
                                    triggerId={`serviceTrigger-${index}`}
                                    id={`serviceId-${index}`}
                                    selectContent={services}
                                    value={vendor?.providerServices?.[0] || ""}
                                    onChange={(value: string) => {
                                      handleVendorServicesChange(index, value)
                                        
                                        }
                                    }
                                    name={`vendor.${index}.product`}
                                    placeHolder="Select service"
                                    infinityScroll={{
                                      hasMore: serviceHasasNextPage,
                                      loadMore: loadMoreService,
                                      loader: isServiceFetching
                                    }}
                                    isloading={isServiceLoading}
                                    isFetching={isServiceFetching}
                                    emptyState="No service available"
                                    isItemDisabled={(item) => {
                                      const serviceName = typeof item === 'object' ? item.name : String(item);
                                      return values.vendor.some((v, i) => i !== index && v.providerServices?.[0] === serviceName);
                                    }}
                                    showSearch={true}
                                    searchTerm={serviceSearchTerm}
                                    setSearchTerm={setServiceSearchTerm}
                                    // isTyping={isServiceTyping}
                                />
                              
                              </div>

                              <div className="mb-4">
                              <Label htmlFor={`vendor.${index}.costOfService`} className="text-sm font-medium">
                                  Cost of service
                              </Label>
                              <div className="flex items-center gap-2">
                              <CurrencySelectInput
                                  selectedcurrency={selectCurrency}
                                  setSelectedCurrency={setSelectCurrency}
                                  className="h-[3.2rem]"
                              />
                              <VendorCostField
                                  value={vendor.costOfService || ""}
                                  onChange={(value: string) => { 
                                      setFieldValue(`vendor.${index}.costOfService`, value);
                                      validateNumber("costOfService", setFieldValue);
                                  }}
                              />   
                              </div>
                            
                              </div>

                              <div className="relative bottom-4">
                                  <Label htmlFor={`vendor.${index}.duration`} className="text-sm font-medium">
                                      Duration
                                  </Label>
                                  <div className="flex border border-solid border-gray-300 rounded-md w-40 gap-2 mt-2">
                                      <input
                                          id={`duration-${index}`}
                                          className="w-20 p-3 focus:outline-none text-sm border-none"
                                          placeholder="0"
                                          value={vendor.duration}
                                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                              const value = e.target.value;
                                              if (/^[1-9]\d{0,2}$/.test(value) || value === "") {
                                                  setFieldValue(`vendor.${index}.duration`, value);
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
                                      <p className="bg-[#F9F9F9] flex items-center h-[44px] text-sm px-3 text-gray-600">month</p>
                                  </div>
                                                                </div>

                                                                
                                 </div>
                                 {values.vendor.length > 1 && (
                                    <div className="border-solid border-b-[1px] mb-8 pb-3 flex justify-end">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => remove(index)}
                                            className="text-red-500 hover:text-red-700 text-[14px] font-normal"
                                        >
                                            <MdDeleteOutline className="h-5 w-[18px]" /> <span className="pl-1 relative mt-[1px]">Delete</span>
                                        </Button>
                                </div>
                                   )} 
                                 
                                 </div>
                                ))
 }
                              <div className="relative bottom-5">
                                 <Button
                                      type="button"
                                      variant="ghost"
                                      className={`text-[#142854] border-none shadow-none hover:bg-white px-0 ${!areCurrentProvidersValid(values.vendor) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      onClick={() => push({
                                        providerServices: [""], 
                                          vendorName: "",
                                          costOfService: "",
                                          duration: ""
                                      })}
                                      disabled={!areCurrentProvidersValid(values.vendor)} 
                                  >
                                      <MdAdd color="#142854" className="h-[16px] w-[16px]" /> Add another provider
                                  </Button> 
                                 </div>
                              </div>
                            )
                           }
                           
                          </FieldArray>

                         </div>
                         </div>

                         {/* <div className="relative bottom-8">
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
                         </div> */}

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
                                        {isLoading || isUpdateLoading ? (<Isloading/>) : (
                                          isEdit? "Update" : "Create"
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
                    )}
                }
            </Formik>
       </div>
        </div>
        
    </div>
  )
}

export default StepTwo