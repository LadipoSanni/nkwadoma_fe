import React from 'react'
import {Button} from '@/components/ui/button';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import {Label} from '@/components/ui/label';
import {inter} from "@/app/fonts"
import CustomSelect from '@/reuseable/Input/Custom-select';
import {FileUpload} from '@/reuseable/Input';
import Isloading from '@/reuseable/display/Isloading';
import {useInviteOrganizationMutation} from "@/service/admin/organization";


const initialFormValue = {
    name: "",
    emailAddress: "",
    website: "",
    industry: "",
    serviceOffering: "",
    rcNumber: "",
    taxNumber: "",
    adminFullName: "",
    adminEmailAddress: "",
    logoImage: "",
    coverImage: ""
}

interface props {
    setIsOpen?: (e: boolean) => void;
}

function InviteOrganizationForm({setIsOpen}: props) {

    const [inviteOrganization, {isLoading}] = useInviteOrganizationMutation()

    const industries = ["Manufacturing", "Insurance", "Logistic", "Telecommunication", "Real estate", "Automobile", "Fashion", "Aviation", "Agriculture",
        "Education", "Healthcare", "Entertainment", "Hospitality", "FMCG", "Technology", "Finance"
    ]
    const serviceOfferings = [
        "Financial Advisory", "Insurance Services", "Loan Services", "Accounting and Bookkeeping", "Investment Advisory", "Risk Management", "Corporate Finance", "Tax Services",
        "Banking Services", "Cryptocurrency Services", "Software Development", "Web Development", "Cloud Services", "Cybersecurity Services", "IT Support and Consulting", "Database Management", "AI and Machine Learning",
        "Business Intelligence", "Devops Services", "Blockchain Services", "Devops Services", "Distribution Services", "Marketing and Branding", "Sales Services", "Logistic and Supply Chain Management",
        "Customer Service and Support", "Sustainability Services", "Regulatory Compliance and Legal Services", "Consumer Engagement and Loyalty", "Technology and Innovation", "Hotel Services",
        "Restaurant Services", "Event Planning", "Travel and Tour Services", "Corporate Retreats", "Spa and wellness", "Transportation", "Conference & Meeting Facilities", "Film and Television",
        "Music", "Theatre", "Sports and Fitness", "Gaming", "Event and Parties", 'Telecommunication', 'Photography', 'Training',
    ]

    const handleCloseModal = () => {
        if (setIsOpen) {
            setIsOpen(false);
        }
    }

    // const [isloading] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Name is required')
            .matches(/^[^0-9]*$/, 'Numbers are not allowed'),
        emailAddress: Yup.string()
            .email('Invalid email address')
            .matches(/^\S*$/, 'Email address should not contain spaces')
            .required('Email address is required'),
        industry: Yup.string()
            .required('Industry is required'),
        serviceOffering: Yup.string()
            .required('Service is required'),
        rcNumber: Yup.string()
            .trim()
            .required('Registration number is required')
            .matches(/^RC\d{7}$/, 'RC Number must start with "RC" followed by 7 digits'),
        taxNumber: Yup.string()
            .trim()
            .required('Tax number is required')
            .min(9, 'Tax number must be at least 9 characters long')
            .matches(/^[A-Za-z0-9-]*$/, 'Tax number can only contain letters, numbers, and hyphens, and must not start with a hyphen'),
        adminFullName: Yup.string()
            .trim()
            .required('Admin full name is required'),
        adminEmailAddress: Yup.string()
            .email('Invalid email address')
            .matches(/^\S*$/, 'Email address should not contain spaces')
            .required('Admin email address is required')
            .test(
                'email-different', 'Admin email address must be different from company email address',
                function () {
                    const {emailAddress, adminEmailAddress} = this.parent;
                    return emailAddress !== adminEmailAddress;
                })
    })

    const handleSubmit = async (values: typeof initialFormValue) => {
        console.log('The values: ', values);
        const response = await inviteOrganization(values)
        console.log("response:: ", response)
        // if (setIsOpen) {
        //     setIsOpen(false);
        // }

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
                    ({errors, isValid, touched, setFieldValue, values}) => (
                        <Form className={`${inter.className}`}>
                            <div
                                className='grid grid-cols-1 gap-y-4 md:max-h-[600px] overflow-y-auto'
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
                                <div>
                                    <Label htmlFor="emailAddress">Email Address </Label>
                                    <Field
                                        id="emailAddress"
                                        name="emailAddress"
                                        className="w-full p-3 border rounded focus:outline-none mt-2"
                                        placeholder="Enter email address"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("emailAddress", e.target.value.replace(/\s+/g, ''))}
                                    />

                                    {
                                        errors.emailAddress && touched.emailAddress && (
                                            <ErrorMessage
                                                name="emailAddress"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        )
                                    }
                                </div>
                                <div>
                                    <Label htmlFor="website">Website (optional)</Label>
                                    <Field
                                        id="website"
                                        name="website"
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
                                            errors.industry && touched.industry && (
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
                                        <Label htmlFor="taxNumber">Tax Number</Label>
                                        <Field
                                            id="taxNumber"
                                            name="taxNumber"
                                            className="w-full p-3 border rounded focus:outline-none mt-3"
                                            placeholder="Enter tax number"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const value = e.target.value;
                                                const formattedValue = value.replace(/[^A-Za-z0-9-]/g, '').replace(/^-/, '');
                                                setFieldValue("taxNumber", formattedValue);
                                            }}
                                        />
                                        {
                                            errors.taxNumber && touched.taxNumber && (
                                                <ErrorMessage
                                                    name="taxNumber"
                                                    component="div"
                                                    className="text-red-500 text-sm"
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='relative bottom-5'>
                                    <Label htmlFor="adminFullName">Admin Full Name</Label>
                                    <Field
                                        id="adminFullName"
                                        name="adminFullName"
                                        className="w-full p-3 border rounded focus:outline-none mt-3"
                                        placeholder="Enter admin full name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const value = e.target.value;
                                            const formattedValue = value.replace(/^[^A-Za-z]+|[^A-Za-z\s]/g, '');
                                            setFieldValue("adminFullName", formattedValue);
                                        }}
                                    />
                                    {
                                        errors.adminFullName && touched.adminFullName && (
                                            <ErrorMessage
                                                name="adminFullName"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        )}
                                </div>
                                <div className='relative bottom-5'>
                                    <Label htmlFor="adminEmailAddress">Admin Email Address</Label>
                                    <Field
                                        id="adminEmailAddress"
                                        name="adminEmailAddress"
                                        className="w-full p-3 border rounded focus:outline-none mt-3"
                                        placeholder="Enter admin email address"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("adminEmailAddress", e.target.value.replace(/\s+/g, ''))}
                                    />
                                    {
                                        errors.adminEmailAddress && touched.adminEmailAddress && (
                                            <ErrorMessage
                                                name="adminEmailAddress"
                                                component="div"
                                                className="text-red-500 text-sm"
                                            />
                                        )}
                                </div>
                                <div className='relative bottom-5'>
                                    <Label htmlFor="logoImage">Logo Image (optional)</Label>
                                    <div className='mt-2'>
                                        <FileUpload
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                            setUploadedImageUrl={(url: string | null) => setFieldValue("logoImage", url)}
                                        />
                                    </div>
                                </div>

                                <div className='relative bottom-5'>
                                    <Label htmlFor="coverImage">Cover Image (optional)</Label>
                                    <div className='mt-2'>
                                        <FileUpload
                                            handleDrop={handleDrop}
                                            handleDragOver={handleDragOver}
                                            setUploadedImageUrl={(url: string | null) => setFieldValue("coverImage", url)}
                                        />
                                    </div>

                                </div>

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
                                        className={`w-full md:w-36 h-[57px] ${!isValid ? "bg-neutral650 cursor-not-allowed " : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`}
                                        type='submit'
                                        disabled={!isValid}

                                    >
                                        {isLoading ? (<Isloading/>) : (
                                            "Invite"
                                        )}

                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )
                }

            </Formik>
        </div>
    )
}

export default InviteOrganizationForm