import React,{useState} from 'react'
import {Button} from '@/components/ui/button';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Label} from '@/components/ui/label';
import {inter} from "@/app/fonts"
import { notificationApi } from '@/service/notification/notification_query';
import Isloading from '@/reuseable/display/Isloading';
import {useInviteOrganizationMutation} from '@/service/admin/organization';
import {useToast} from "@/hooks/use-toast";
import { store,useAppSelector } from '@/redux/store';
import { setOrganizationTabStatus } from '@/redux/slice/organization/organization';
import PhoneNumberSelect from '@/reuseable/select/phoneNumberSelect/Index';
import { formatInternationalNumber } from '@/utils/phoneNumber';
import CenterMultistep from '@/reuseable/multiStep-component/Center-multistep';
import { organizationValidationSchema,stepTwo1ValidationSchema } from '@/utils/validation-schema';
import { setOrganizationInitialState,resetOrganizationInitialState } from '@/redux/slice/organization/organization';
import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';

interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

interface props {
    setIsOpen?: (e: boolean) => void;
    organizationRefetch?: (() => void) | null;
    tabType?: string
}


function InviteOrganizationsForm({setIsOpen,organizationRefetch,tabType}: props) {
    const initialValue = useAppSelector((state) => state?.organization?.organizationInitialState)
    const initialFormValue = {
    name:  initialValue?.name || "",
    email: initialValue?.email ||  "",
    websiteAddress: initialValue?.websiteAddress ||  "",
    industry: initialValue?.industry ||  "",
    serviceOffering: initialValue?.serviceOffering || "",
    rcNumber: initialValue?.rcNumber || "",
    tin:  initialValue?.tin ||  "",
    adminFirstName: initialValue?.adminFirstName || "",
    adminLastName: initialValue?.adminLastName || "",
    adminEmail:initialValue?.adminEmail ||  "",
    logoImage:initialValue?.logoImage || "",
    coverImage:initialValue?.coverImage || "",
    phoneNumber:initialValue?.phoneNumber || "",
   }

    const [isPhoneNumberError,setPhoneNumberError] = useState(false)
     const [countryCode, setCountryCode] = useState("NG")
     const [currentStep, setCurrentStep] = useState(1);
     const industries = [
        { value: "EDUCATION", label: "Education" },
        { value: "BANKING", label: "Banking" }
      ];
    const serviceOfferings = [
  { value: "TRAINING", label: "Training" },
  { value: "FINANCIAL_ADVISORY", label: "Financial Advisory" },
  { value: "INSURANCE_SERVICES", label: "Insurance Services" },
  { value: "LOAN_SERVICES", label: "Loan Services" },
  { value: "ACCOUNTING_AND_BOOKKEEPING", label: "Accounting and Bookkeeping" },
  { value: "INVESTMENT_ADVISORY", label: "Investment Advisory" },
  { value: "RISK_MANAGEMENT", label: "Risk Management" },
  { value: "CORPORATE_FINANCE", label: "Corporate Finance" },
  { value: "TAX_SERVICES", label: "Tax Services" },
  { value: "BANKING_SERVICES", label: "Banking Services" },
  { value: "CRYPTOCURRENCY_SERVICES", label: "Cryptocurrency Services" },
  { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
  { value: "WEB_DEVELOPMENT", label: "Web Development" },
  { value: "CLOUD_SERVICES", label: "Cloud Services" },
  { value: "CYBERSECURITY_SERVICES", label: "Cybersecurity Services" },
  { value: "DATABASE_MANAGEMENT", label: "Database Management" },
//   { value: "AI_AND_MACHINE_LEARNING", label: "AI and Machine Learning" },
//   { value: "BUSINESS_INTELLIGENCE", label: "Business Intelligence" },
//   { value: "DEVOPS_SERVICES", label: "DevOps Services" },
//   { value: "BLOCKCHAIN_SERVICES", label: "Blockchain Services" },
//   { value: "DISTRIBUTION_SERVICES", label: "Distribution Services" },
//   { value: "MARKETING_AND_BRANDING", label: "Marketing and Branding" },
//   { value: "SALES_SERVICES", label: "Sales Services" },
//   { value: "CUSTOMER_SERVICE_AND_SUPPORT", label: "Customer Service and Support" },
//   { value: "SUSTAINABILITY_SERVICES", label: "Sustainability Services" },
//   { value: "CONSUMER_ENGAGEMENT_AND_LOYALTY", label: "Consumer Engagement and Loyalty" },
//   { value: "TECHNOLOGY_AND_INNOVATION", label: "Technology and Innovation" },
//   { value: "HOTEL_SERVICES", label: "Hotel Services" },
//   { value: "RESTAURANT_SERVICES", label: "Restaurant Services" },
//   { value: "EVENT_PLANNING", label: "Event Planning" },
//   { value: "TRAVEL_AND_TOUR_SERVICES", label: "Travel and Tour Services" },
//   { value: "CORPORATE_RETREATS", label: "Corporate Retreats" },
//   { value: "SPA_AND_WELLNESS", label: "Spa and Wellness" },
//   { value: "TRANSPORTATION", label: "Transportation" },
//   { value: "FILM_AND_TELEVISION", label: "Film and Television" },
//   { value: "MUSIC", label: "Music" },
//   { value: "THEATRE", label: "Theatre" },
//   { value: "SPORTS_AND_FITNESS", label: "Sports and Fitness" },
//   { value: "GAMING", label: "Gaming" },
//   { value: "EVENT_AND_PARTIES", label: "Event and Parties" },
//   { value: "TELECOMMUNICATION", label: "Telecommunication" },
//   { value: "PHOTOGRAPHY", label: "Photography" }
];

       const [error, setError] = useState("");
      
          const [inviteOrganization, {isLoading}] = useInviteOrganizationMutation()
          const {toast} = useToast();
      
        const handleCloseModal = () => {
            if (setIsOpen) {
                setIsOpen(false);
            }
            store.dispatch(resetOrganizationInitialState())
           }
      

            const handleFormChange = (field: string, value: string) => {
                store.dispatch(setOrganizationInitialState({
                  ...initialValue,
                  [field]: value
                }));
              };
      
          const handleSubmit = async (values: typeof initialFormValue) => {
              if (!navigator.onLine) {
                  toast({
                      description: "No internet connection",
                      status: "error",
                  });
                  return;
              }
              const formattedPhone = formatInternationalNumber(
                  values.phoneNumber, 
                  countryCode
                );
        
              const formData = {
                  name: values.name,
                  email: values.email,
                  websiteAddress: values.websiteAddress,
                  rcNumber: values.rcNumber,
                  tin: values.tin,
                  adminFirstName: values.adminFirstName,
                  adminLastName: values.adminLastName,
                  adminEmail: values.adminEmail,
                  phoneNumber:formattedPhone || values.phoneNumber,
                  adminRole: "ORGANIZATION_ADMIN",
                  serviceOfferings: [
                      {
                          industry: values.industry,
                          name: values.serviceOffering,
                          transactionLowerBound: "3000",
                          transactionUpperBound: "5000"
                      }
                  ]
              }
              try {
                  const result = await inviteOrganization(formData).unwrap();
                  if (result) {
                      store.dispatch(notificationApi.util.invalidateTags(['notification']))
                      store.dispatch(setOrganizationTabStatus("invited"))
                      if(organizationRefetch && tabType === "invited"){
                          organizationRefetch()
                      }
                      toast({
                          description: result.message,
                          status: "success",
                      });
                      handleCloseModal()
                      
                  }
      
              } catch (err) {
                  const error = err as ApiError;
                  setError(error?.data?.message);
      
              }
      
      
          }

          const nextStep = async () => {
              setCurrentStep(currentStep + 1);
          };
         const prevStep = () => setCurrentStep(currentStep - 1);


         const isStep2Valid = (values: typeof initialFormValue) => {
            return (
              values.adminFirstName.trim() !== "" &&
              values.adminLastName.trim() !== "" &&
              values.adminEmail.trim() !== ""
            );
          };


  return (
    <div>
      <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={currentStep === 1 ? stepTwo1ValidationSchema : organizationValidationSchema}
        validateOnChange={true}
        validateOnBlur={true} 
      >
        {({errors, isValid, touched, setFieldValue, values,setFieldTouched,setFieldError,handleBlur}) => (
        <Form className={`${inter.className}`}>
         <div >
         <CenterMultistep currentStep={currentStep} totalSteps={2} />
         {
            currentStep=== 1? (
                <div>
                <div
                className='grid grid-cols-1 gap-y-4 max-h-[55.5vh] overflow-y-auto'
                style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',  
              }}
                >

            <div className=''>                                    <Label htmlFor="Name">Name</Label>
            <Field
                    id="organizationName"
                    name="name"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                    placeholder="Enter name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                        setFieldValue("name", formattedValue);
                        handleFormChange("name", formattedValue);
                    }}
                />
                    {
                        errors.name && touched.name && (
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        )
                    }
                </div>

     <div className=''>
    <Label htmlFor="phoneNumber">Phone number</Label>
            <div className='relative bottom-3'>
        <PhoneNumberSelect
        selectedCountryCode={countryCode}
        setSelectedCountryCode={(code) => {
        setCountryCode(code)
        handleFormChange("countryCode", code);

    }}
        phoneNumber={values.phoneNumber}
        setPhoneNumber={(num) => { 
        setFieldValue('phoneNumber', num)
        handleFormChange("phoneNumber", num);
    }  }
        label=''
        placeholder="Select code"
        id="phoneNumber"
        setFieldError={setFieldError}
        onBlur={handleBlur}
        setError={setPhoneNumberError}
        name='phoneNumber'
        />     
        </div>
     </div>

      <div className='relative bottom-6'>
                                         <Label htmlFor="email">Email address </Label>
            <Field
                id="email"
                name="email"
                className="w-full p-3 border rounded focus:outline-none mt-2"
                placeholder="Enter email address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("email", e.target.value.replace(/\s+/g, ''))
                        handleFormChange("email", e.target.value);
                }}
            />

            {
                errors.email && touched.email && (
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                )
            }
         </div>

          <div className='relative bottom-6'>
            <Label htmlFor="websiteAddress">Website (optional)</Label>
            <Field
                id="website"
                name="websiteAddress"
                className="w-full p-3 border rounded focus:outline-none mt-2"
                placeholder="Enter website"
                onFocus={() => setFieldTouched("websiteAddress", true, false)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("websiteAddress", e.target.value);
                    handleFormChange("websiteAddress", e.target.value);
                }}
            />
            {
                errors.websiteAddress && touched.websiteAddress && (
                    <ErrorMessage
                        name="websiteAddress"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                )
            }
        </div>

        <div className='grid md:grid-cols-2 gap-4 w-full relative bottom-6'>
                                    <div>
                                        <Label htmlFor="industry">Industry</Label>
                                         <CustomSelectObj
                                            triggerId='industryTriggerId'
                                            id='industryId'
                                            selectContent={industries}
                                            value={values.industry}
                                            onChange={(value) => {
                                            setFieldValue("industry", value)
                                            handleFormChange("industry", value);
                                            }}
                                            name="industry"
                                            placeHolder='Select industry'
                                            isItemDisabled={(item) => item !== 'EDUCATION'}
                                        />
                                        {
                                            errors.industry && touched.industry && (
                                                <ErrorMessage
                                                    name="industry"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            )
                                        }
                                    </div>
                                    <div className='relative bottom-5 md:bottom-0'>
                                        <Label htmlFor="serviceOffering:">Service offering</Label>
                                        <CustomSelectObj
                                            triggerId='serviceOfferingTriggerId'
                                            id='serviceOffering'
                                            selectContent={serviceOfferings}
                                            value={values.serviceOffering}
                                            onChange={(value) => {
                                            setFieldValue("serviceOffering", value)
                                            handleFormChange("serviceOffering", value);
                                            }}
                                            name="serviceOffering"
                                            placeHolder='Select service'
                                            isItemDisabled={(item) => item !== 'TRAINING'}
                                        />
                                        {
                                            errors.serviceOffering && touched.serviceOffering && (
                                                <ErrorMessage
                                                    name="serviceOffering"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            )
                                        }
                                    </div>
         </div>

          <div 
          className='grid md:grid-cols-2 gap-4 w-full relative md:bottom-10 bottom-16'
          >
                <div>
                    <Label htmlFor="rcNumber">Registration number</Label>
                    <Field
                        id="rcNumber"
                        name="rcNumber"
                        className="w-full p-3 border rounded focus:outline-none mt-3"
                        placeholder="Enter registration number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue("rcNumber", e.target.value)
                            handleFormChange("rcNumber", e.target.value);
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                             setFieldTouched("rcNumber", true, false);
                            setFieldValue("rcNumber", e.target.value, true); 
                          }}
                    />
                    {
                        errors.rcNumber && touched.rcNumber && (
                            <ErrorMessage
                                name="rcNumber"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        )
                    }
                </div>
                <div>
                    <Label htmlFor="tin">Tax number</Label>
                    <Field
                        id="tin"
                        name="tin"
                        className="w-full p-3 border rounded focus:outline-none mt-3"
                        placeholder="Enter tax number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            const formattedValue = value.replace(/[^A-Za-z0-9-]/g, '').replace(/^-/, '');
                            setFieldValue("tin", formattedValue);
                            handleFormChange("tin", formattedValue);
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        setFieldTouched("tin", true, false);
                       setFieldValue("tin", e.target.value, true); 
                     }}
                     />
                    {
                        errors.tin && touched.tin && (
                            <ErrorMessage
                                name="tin"
                                component="div"
                                className="text-red-500 text-sm"
                            />
                        )
                    }
                </div>
            </div>
         </div>
         <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
         <div className='md:flex gap-4 justify-end mt-5 mb-3'>
         <Button
            variant={'outline'}
            type='reset'
            className='w-full md:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
            onClick={ handleCloseModal}
            id='CancelInviteOrganization'
        >
           Cancel
        </Button>

        <button
            id='continueOrganization'
            type='button'
            className={`w-full md:w-36 h-[57px]  rounded-md ${
            !isValid || isPhoneNumberError || !values.phoneNumber ? " cursor-not-allowed bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white "  : "bg-meedlBlue text-meedlWhite hover:bg-[#435376] focus:bg-[#142854]"
            }`}
            onClick={(e) => {
            e.preventDefault();  
            if (isValid && !isPhoneNumberError && values.phoneNumber) {
                nextStep();
                }
            
        }}
        // onClick={async (e) => {
        //     e.preventDefault();
        //   nextStep();
        //   }}
            disabled={!isValid || isPhoneNumberError || !values.phoneNumber}
        >
            Continue
            </button> 
            </div>
                </div>
            ) : (
<div 

>
       <div
       className='relative   h-[55.5vh] overflow-y-auto'
       style={{
           scrollbarWidth: 'none',
           msOverflowStyle: 'none',  
             }}
       >
        <div className='grid md:grid-cols-2 gap-4 w-full '>
            <div className=''>
                    <Label htmlFor="adminFirstName">Admin first name</Label>
                <Field
                    id="adminFirstName"
                    name="adminFirstName"
                    className="w-full p-3 border rounded focus:outline-none mt-3"
                    placeholder="Enter admin first name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const formattedValue = value.replace(/[^A-Za-z]/g, '');
                        setFieldValue("adminFirstName", formattedValue);
                        handleFormChange("adminFirstName", formattedValue);
                    }}
                    // onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    //     setFieldTouched("adminFirstName", true, false);
                    //     setFieldValue("adminFirstName", e.target.value, true); 
                    //     }}
                />
                {
                    errors.adminFirstName && touched.adminFirstName && (
                        <ErrorMessage
                            name="adminFirstName"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                    )}
            </div>
            <div className='relative'>
                <Label htmlFor="adminLastName">Admin last name</Label>
                <Field
                    id="adminLastName"
                    name="adminLastName"
                    className="w-full p-3 border rounded focus:outline-none mt-3"
                    placeholder="Enter admin last name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const formattedValue = value.replace(/[^A-Za-z]/g, '');
                        setFieldValue("adminLastName", formattedValue);
                        handleFormChange("adminLastName", formattedValue);
                    }}
                    // onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    //     setFieldTouched("adminLastName", true, false);
                    //     setFieldValue("adminLastName", e.target.value, true); 
                    //     }}
                />
                {
                    errors.adminLastName && touched.adminLastName && (
                        <ErrorMessage
                            name="adminLastName"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                    )}
            </div>
            </div>
            <div className='relative'>
                <Label htmlFor="adminEmail">Admin email address</Label>
                <Field
                    id="adminEmail"
                    name="adminEmail"
                    className="w-full p-3 border rounded focus:outline-none mt-3"
                    placeholder="Enter admin email address"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("adminEmail", e.target.value.replace(/\s+/g, ''))
                        handleFormChange("adminEmail",e.target.value);
                    }}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        setFieldTouched("adminEmail", true, false);
                        setFieldValue("adminEmail", e.target.value, true); 
                        }}
                />
                {
                    errors.adminEmail && touched.adminEmail && (
                        <ErrorMessage
                            name="adminEmail"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                    )}
            </div>
            
        </div>
        <div className=''>
            <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
            <div className='md:flex gap-4 justify-end mt-5 mb-3'>
            <Button
            variant={'outline'}
            type='reset'
            className='w-full md:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
            onClick={ prevStep}
            id='CancelInviteOrganization'
            >
           Back
           </Button>
           <button
                id='inviteOrganization'
                className={`w-full md:w-36 h-[57px] rounded-md text-white ${ currentStep === 2 && !isStep2Valid(values) ||  !isValid || isPhoneNumberError ? "bg-[#D7D7D7] hover:bg-[#D7D7D7] " : " bg-meedlBlue cursor-pointer"}`}
                disabled={
                    currentStep === 2 && !isStep2Valid(values) &&
                    (!isValid || isPhoneNumberError)
                  }

            >
                {isLoading ? (<Isloading/>) : (
                        "Invite"
                    )}
                
            </button>
            </div>
        </div>
        </div>
            )
         }
         </div>
         {
            <div
                className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
        }
        </Form>
        )}

      </Formik>
    </div>
  )
}

export default InviteOrganizationsForm
