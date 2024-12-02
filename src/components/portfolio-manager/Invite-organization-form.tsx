import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import {inter} from "@/app/fonts"
import CustomSelect from '@/reuseable/Input/Custom-select';
import { FileUpload } from '@/reuseable/Input';
import Isloading from '@/reuseable/display/Isloading';
import { useInviteOrganizationMutation } from '@/service/admin/organization';
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}


const initialFormValue = {
    name: "",
    email: "",
    websiteAddress: "",
    industry: "",
    serviceOffering: "",
    rcNumber: "",
    tin: "",
    adminFirstName: "",
    adminLastName:"",
    adminEmail: "",
    logoImage: "",
    coverImage: "",
    phoneNumber: "",
}

interface props {
  setIsOpen? : (e:boolean) => void;
}

function InviteOrganizationForm({setIsOpen}: props) {
     const queryClient = useQueryClient();
    //  const industries = [ "MANUFACTURING", "INSURANCE", "LOGISTIC", "TELECOMMUNICATION", "REAL ESTATE", "AUTOMOBILE", "FASHION", "AVIATION", "AGRICULTURE", "EDUCATION", "HEALTHCARE", "ENTERTAINMENT", "HOSPITALITY", "FMCG", "TECHNOLOGY", "FINANCE" ];
    const industries =   ["EDUCATION","BANKING"]
    const serviceOfferings = [ "FINANCIAL ADVISORY", "INSURANCE SERVICES", "LOAN SERVICES", "ACCOUNTING AND BOOKKEEPING", "INVESTMENT ADVISORY", "RISK MANAGEMENT", "CORPORATE FINANCE", "TAX SERVICES", "BANKING SERVICES", "CRYPTOCURRENCY SERVICES", "SOFTWARE DEVELOPMENT", "WEB DEVELOPMENT", "CLOUD SERVICES", "CYBERSECURITY SERVICES", "IT SUPPORT AND CONSULTING", "DATABASE MANAGEMENT", "AI AND MACHINE LEARNING", "BUSINESS INTELLIGENCE", "DEVOPS SERVICES", "BLOCKCHAIN SERVICES", "DISTRIBUTION SERVICES", "MARKETING AND BRANDING", "SALES SERVICES", "LOGISTIC AND SUPPLY CHAIN MANAGEMENT", "CUSTOMER SERVICE AND SUPPORT", "SUSTAINABILITY SERVICES", "REGULATORY COMPLIANCE AND LEGAL SERVICES", "CONSUMER ENGAGEMENT AND LOYALTY", "TECHNOLOGY AND INNOVATION", "HOTEL SERVICES", "RESTAURANT SERVICES", "EVENT PLANNING", "TRAVEL AND TOUR SERVICES", "CORPORATE RETREATS", "SPA AND WELLNESS", "TRANSPORTATION", "CONFERENCE AND MEETING FACILITIES", "FILM AND TELEVISION", "MUSIC", "THEATRE", "SPORTS AND FITNESS", "GAMING", "EVENT AND PARTIES", "TELECOMMUNICATION", "PHOTOGRAPHY", "TRAINING", ];

    const [error, setError] = useState("");

    const [inviteOrganization,{isLoading}] = useInviteOrganizationMutation()
    const { toast } = useToast();

    const handleCloseModal = () => {
      if (setIsOpen) {
        setIsOpen(false);
      }
    }

    

    const validationSchema = Yup.object().shape({
        name:Yup.string()
        .trim()
        .required('Name is required')
        .matches(/^[^0-9]*$/, 'Numbers are not allowed'),
        email: Yup.string()
        .email('Invalid email address')
        .matches(/^\S*$/, 'Email address should not contain spaces')
        .required('Email address is required'),
        industry:Yup.string()
        .required('Industry is required'),
        serviceOffering:Yup.string()
        .required('Service is required'),
        rcNumber: Yup.string()
        .trim()
        .required('Registration number is required')
        .matches(/^RC\d{7}$/, 'RC Number must start with "RC" followed by 7 digits'),
        tin: Yup.string()
        .trim()
        .required('Tax number is required')
        .min(9, 'Tax number must be at least 9 characters long')
        .matches(/^[A-Za-z0-9-]*$/, 'Tax number can only contain letters, numbers, and hyphens, and must not start with a hyphen'),
        adminFirstName: Yup.string()
        .trim()
        .required('Admin first name is required'),
        adminLastName: Yup.string()
        .trim()
        .required('Admin last name is required'),
        phoneNumber: Yup.string()
         .required('Phone number is required') 
        .matches(/^(0)(70|71|80|81|90|91)\d{8}$/,'Invalid phone number'),
        adminEmail: Yup.string()
        .email('Invalid email address')
        .matches(/^\S*$/, 'Email address should not contain spaces')
        .required('Admin email address is required')
        .test(
            'email-different', 'Admin email address must be different from company email address',
            function () {
                const { email, adminEmail } = this.parent; return email !== adminEmail;
             })
    })

    const handleSubmit = async (values: typeof initialFormValue) => {
      // console.log('The values: ',values);
      if (!navigator.onLine) {
      toast({
        description: "No internet connection",
        status: "error",
      });
      return;
    }
      const formData = {
        name: values.name,
        email: values.email,
        websiteAddress: values.websiteAddress,
        rcNumber: values.rcNumber,
        tin: values.tin,
        adminFirstName: values.adminFirstName,
        adminLastName: values.adminLastName,
        adminEmail: values.adminEmail,
        phoneNumber: values.phoneNumber,
        adminRole: "ORGANIZATION_ADMIN",
        serviceOfferings: [
           {
            industry: values.industry,
            name:"Service",
            transactionLowerBound: "3000",
            transactionUpperBound: "5000"
           }
        ]
      }
      console.log("the forms: ", formData)
     try{
      const result = await inviteOrganization(formData).unwrap();
      if(result){
        queryClient.invalidateQueries({ queryKey: ['invite'] });
        toast({
          description: result.message,
          status: "success",
        });
          if (setIsOpen) {
        setIsOpen(false);
      }
      }

     } catch (err) {
        const error = err as ApiError;
        setError(error?.data?.message);
        
      }
    

    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

  return (
    <div id='inviteOrganizationForm'>
      <Formik
       initialValues={initialFormValue}
       onSubmit={handleSubmit}
       validateOnMount={true}
       validationSchema={validationSchema}
      >
        {
({errors, isValid, touched,setFieldValue,values}) => (
    <Form className={`${inter.className}`}>
        <div
          className='grid grid-cols-1 gap-y-4 md:max-h-[580px] overflow-y-auto'
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
              placeholder="Enter Name"
            //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("name", e.target.value.replace(/[^A-Za-z]/g, ''))}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                setFieldValue("name", formattedValue); }}
            />
              {
                 errors.name && touched.name &&  (
                    <ErrorMessage
                 name="name"
                 component="div"
                 className="text-red-500 text-sm"
               />
                 )
              }
            </div>
            <div className=''> 
            <Label htmlFor="phoneNumber">Phone Number</Label> 
            <Field 
            id="phoneNumber" 
            name="phoneNumber" 
            className="w-full p-3 border rounded focus:outline-none mt-2" 
            placeholder="Enter Phone Number" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
               const value = e.target.value; const formattedValue = value.replace(/[^0-9]/g, '');  
               setFieldValue("phoneNumber", formattedValue); }}
                />
                {errors.phoneNumber && touched.phoneNumber && ( 
                <ErrorMessage 
                name="phoneNumber" 
                component="div" 
                className="text-red-500 text-sm" /> )} 
                </div>
            <div>
            <Label htmlFor="email">Email Address </Label>
            <Field
                  id="email"
                  name="email"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  placeholder="Enter email address"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("email", e.target.value.replace(/\s+/g, ''))}
                 />

                   {
              errors.email && touched.email &&  (
                 <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
              )
             }
            </div>
            <div>
            <Label htmlFor="websiteAddress">Website (optional)</Label>
            <Field
                  id="website"
                  name="websiteAddress"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  placeholder="Enter website"
                  />
            </div>
            <div className='grid md:grid-cols-2 gap-4 w-full'>
             <div>
             <Label htmlFor="industry">Industry</Label>
             <CustomSelect
              selectContent={industries}
              value={values.industry}
              onChange={(value) => setFieldValue("industry", value)}
              name="industry"
              placeHolder='Select industry'
             />
           {
              errors.industry && touched.industry &&  (
                 <ErrorMessage
              name="industry"
              component="div"
              className="text-red-500 text-sm"
            />
              )
             }
             </div>
             <div>
             <Label htmlFor="serviceOffering:">Service Offering:</Label>
             <CustomSelect
              selectContent={serviceOfferings}
              value={values.serviceOffering}
              onChange={(value) => setFieldValue("serviceOffering", value)}
              name="serviceOffering"
              placeHolder='Select service'
             />
              {
              errors.serviceOffering && touched.serviceOffering &&  (
                 <ErrorMessage
              name="serviceOffering"
              component="div"
              className="text-red-500 text-sm"
            />
              )
             }
             </div>
            </div>
             <div className='grid md:grid-cols-2 gap-4 w-full relative bottom-5'>
              <div>
                <Label htmlFor="rcNumber">Registration Number</Label>
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
              errors.rcNumber && touched.rcNumber &&  (
                 <ErrorMessage
              name="rcNumber"
              component="div"
              className="text-red-500 text-sm"
            />
              )
             }
              </div>
              <div>
                <Label htmlFor="tin">Tax Number</Label>
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
              errors.tin && touched.tin &&  (
                 <ErrorMessage
              name="tin"
              component="div"
              className="text-red-500 text-sm"
            />
              )
             }
              </div>
             </div>
              <div className='grid md:grid-cols-2 gap-4 w-full relative'>
                  <div className='relative bottom-5'>
              <Label htmlFor="adminFirstName">Admin First Name</Label>
              <Field
                id="adminFirstName"
                name="adminFirstName"
                className="w-full p-3 border rounded focus:outline-none mt-3"
                placeholder="Enter admin first name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  const formattedValue = value.replace(/[^A-Za-z]/g, '');
                 setFieldValue("adminFirstName", formattedValue); }}
              />
              {
              errors.adminFirstName && touched.adminFirstName &&  (
                 <ErrorMessage
              name="adminFirstName"
              component="div"
              className="text-red-500 text-sm"
              />
              )}
             </div>
             <div className='relative bottom-5'>
              <Label htmlFor="adminLastName">Admin Last Name</Label>
              <Field
                id="adminLastName"
                name="adminLastName"
                className="w-full p-3 border rounded focus:outline-none mt-3"
                placeholder="Enter admin Last name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  const formattedValue = value.replace(/[^A-Za-z]/g, '');
                 setFieldValue("adminLastName", formattedValue); }}
              />
              {
              errors.adminLastName && touched.adminLastName &&  (
                 <ErrorMessage
              name="adminLastName"
              component="div"
              className="text-red-500 text-sm"
              />
              )}
             </div>
             </div>
             <div className='relative bottom-5'>
              <Label htmlFor="adminEmail">Admin Email Address</Label>
              <Field
                id="adminEmail"
                name="adminEmail"
                className="w-full p-3 border rounded focus:outline-none mt-3"
                placeholder="Enter admin email address"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("adminEmail", e.target.value.replace(/\s+/g, ''))}
              />
              {
              errors.adminEmail && touched.adminEmail &&  (
                 <ErrorMessage
              name="adminEmail"
              component="div"
              className="text-red-500 text-sm"
              />
              )}
             </div>
             {/* <div className='relative bottom-5'>
             <Label htmlFor="logoImage">Logo Image (optional)</Label>
             <div className='mt-2'>
            <FileUpload
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            setUploadedImageUrl={(url: string | null) => setFieldValue("logoImage",url)}
            />
             </div>
             </div> */}

             {/* <div className='relative bottom-5'>
             <Label htmlFor="coverImage">Cover Image (optional)</Label>
             <div className='mt-2'>
            <FileUpload
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            setUploadedImageUrl={(url: string | null) => setFieldValue("coverImage",url)}
            />
             </div>

             </div> */}

             <div className='md:flex gap-4 justify-end mt-2 md:mb-0 mb-3'>
                <Button
                variant={'outline'}
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
                onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button
                id='submitTrainee'
                variant={'default'}
                className={`w-full md:w-36 h-[57px] ${!isValid? "bg-neutral650 cursor-not-allowed " :"hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`}
                type='submit'
                disabled={!isValid}

                >
                  {isLoading ? ( <Isloading/> ) : (
                                                "Invite"
                                            )}

                 </Button>
              </div>
              {
                <div className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
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