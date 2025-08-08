import React, {useState} from 'react'
import {Button} from '@/components/ui/button';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Label} from '@/components/ui/label';
import {inter} from "@/app/fonts"
import CustomSelect from '@/reuseable/Input/Custom-select';
import { notificationApi } from '@/service/notification/notification_query';
import Isloading from '@/reuseable/display/Isloading';
import {useInviteOrganizationMutation} from '@/service/admin/organization';
import {useToast} from "@/hooks/use-toast";
import { store,useAppSelector } from '@/redux/store';
import { setOrganizationTabStatus } from '@/redux/slice/organization/organization';
import PhoneNumberSelect from '@/reuseable/select/phoneNumberSelect/Index';
import { formatInternationalNumber } from '@/utils/phoneNumber';
import CenterMultistep from '@/reuseable/multiStep-component/Center-multistep';
import { organizationValidationSchema } from '@/utils/validation-schema';
import { setOrganizationInitialState } from '@/redux/slice/organization/organization';

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

function InviteOrganizationForm({setIsOpen,organizationRefetch,tabType}: props) {
 
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
    //  const industries = [ "MANUFACTURING", "INSURANCE", "LOGISTIC", "TELECOMMUNICATION", "REAL ESTATE", "AUTOMOBILE", "FASHION", "AVIATION", "AGRICULTURE", "EDUCATION", "HEALTHCARE", "ENTERTAINMENT", "HOSPITALITY", "FMCG", "TECHNOLOGY", "FINANCE" ];
    const [currentStep, setCurrentStep] = useState(1);
    const industries = ["EDUCATION", "BANKING"]
    const serviceOfferings = ["TRAINING", "FINANCIAL ADVISORY", "INSURANCE SERVICES", "LOAN SERVICES", "ACCOUNTING AND BOOKKEEPING", "INVESTMENT ADVISORY", "RISK MANAGEMENT", "CORPORATE FINANCE", "TAX SERVICES", "BANKING SERVICES", "CRYPTOCURRENCY SERVICES", "SOFTWARE DEVELOPMENT", "WEB DEVELOPMENT", "CLOUD SERVICES", "CYBERSECURITY SERVICES", "DATABASE MANAGEMENT", "AI AND MACHINE LEARNING", "BUSINESS INTELLIGENCE", "DEVOPS SERVICES", "BLOCKCHAIN SERVICES", "DISTRIBUTION SERVICES", "MARKETING AND BRANDING", "SALES SERVICES", "CUSTOMER SERVICE AND SUPPORT", "SUSTAINABILITY SERVICES", "CONSUMER ENGAGEMENT AND LOYALTY", "TECHNOLOGY AND INNOVATION", "HOTEL SERVICES", "RESTAURANT SERVICES", "EVENT PLANNING", "TRAVEL AND TOUR SERVICES", "CORPORATE RETREATS", "SPA AND WELLNESS", "TRANSPORTATION", "FILM AND TELEVISION", "MUSIC", "THEATRE", "SPORTS AND FITNESS", "GAMING", "EVENT AND PARTIES", "TELECOMMUNICATION", "PHOTOGRAPHY"];
     const [countryCode, setCountryCode] = useState("NG")
     const [isPhoneNumberError,setPhoneNumberError] = useState(false)

    const [error, setError] = useState("");

    const [inviteOrganization, {isLoading}] = useInviteOrganizationMutation()
    const {toast} = useToast();

    const handleCloseModal = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    }

    const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

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

    return (
        <div id='inviteOrganizationForm'>
            <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validateOnMount={true}
                validationSchema={organizationValidationSchema}
                validateOnChange={true}
                validateOnBlur={true}  
            >
                {
                    ({errors, isValid, touched, setFieldValue, values,setFieldTouched,setFieldError,handleBlur}) => (
                        <Form className={`${inter.className}`}>
                            <div >
                                <div>
                                <CenterMultistep currentStep={currentStep} totalSteps={2} />
                                </div>
                              
                             {currentStep === 1 ?   <div
                                className='grid grid-cols-1 gap-y-4 md:max-h-[55.5vh] overflow-y-auto'
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',

                                }}
                                >
                                <div className=''>
                                    <Label htmlFor="Name">Name</Label>
                                    <Field
                                        id="organizationName"
                                        name="name"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter name"
                                        //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("name", e.target.value.replace(/[^A-Za-z]/g, ''))}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = e.target.value;
                                            const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                                            setFieldValue("name", formattedValue);
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
                                       setSelectedCountryCode={(code) => setCountryCode(code)}
                                       phoneNumber={values.phoneNumber}
                                       setPhoneNumber={(num) => setFieldValue('phoneNumber', num)}
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value.replace(/\s+/g, ''))}
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
                                        <CustomSelect
                                            triggerId='industryTriggerId'
                                            id='industryId'
                                            selectContent={industries}
                                            value={values.industry}
                                            onChange={(value) => setFieldValue("industry", value)}
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
                                        <CustomSelect
                                            triggerId='serviceOfferingTriggerId'
                                            id='serviceOffering'
                                            selectContent={serviceOfferings}
                                            value={values.serviceOffering}
                                            onChange={(value) => setFieldValue("serviceOffering", value)}
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
                                <div className='grid md:grid-cols-2 gap-4 w-full relative md:bottom-10 bottom-16'>
                                    <div>
                                        <Label htmlFor="rcNumber">Registration number</Label>
                                        <Field
                                            id="rcNumber"
                                            name="rcNumber"
                                            className="w-full p-3 border rounded focus:outline-none mt-3"
                                            placeholder="Enter registration number"
                                            //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            //     const value = e.target.value;
                                            //     const formattedValue = value.replace(/[^0-9]/g, '');
                                            //     setFieldValue("rcNumber", formattedValue);
                                            //    }}
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
                          
                                </div> : 

                                <div className='relative  md:h-[55.5vh] h-[40.5vh] overflow-y-auto'>
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
                                            }}
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
                                            }}
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
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("adminEmail", e.target.value.replace(/\s+/g, ''))}
                                        onFocus={() => setFieldTouched("adminEmail", true, false)}
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
                                }
                                <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
                                <div className='md:flex gap-4 justify-end mt-5 mb-3'>
                                    <Button
                                        variant={'outline'}
                                        type='reset'
                                        className='w-full md:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
                                        onClick={currentStep === 1? handleCloseModal : prevStep}
                                        id='CancelInviteOrganization'
                                    >
                                       { currentStep === 1? "Cancel" : "Back"}
                                    </Button>
                                  { currentStep === 1? 
                                  <Button
                                  id='inviteOrganization'
                                  variant={'secondary'}
                                  type='button'
                                   className={`w-full md:w-36 h-[57px]`}
                                   onClick={nextStep}
                                  >
                                    Continue
                                  </Button> : 
                                  
                                  <Button
                                        id='inviteOrganization'
                                        variant={'secondary'}
                                        className={`w-full md:w-36 h-[57px] ${!isValid || isPhoneNumberError ? "bg-[#D7D7D7] hover:bg-[#D7D7D7] " : " bg-meedlBlue cursor-pointer"}`}
                                        type='submit'
                                        disabled={!isValid || isPhoneNumberError}

                                    >
                                        {isLoading ? (<Isloading/>) : (
                                                "Invite"
                                            )}
                                        
                                    </Button>}
                                </div>
                                {
                                    <div
                                        className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
                                }
                            </div>
                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}

export default InviteOrganizationForm