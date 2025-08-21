import React,{useState} from 'react'
import { inter } from "@/app/fonts";
import FinancierSelectType from './financier-select-type';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InviteFinancier from './Invite-financier';
import { useInviteFinancierMutation } from '@/service/admin/financier';
import {useToast} from "@/hooks/use-toast";
import { store } from '@/redux/store';
import { setFinancierStatusTab } from '@/redux/slice/financier/financier';

interface ApiError {
  status: number;
  data: {
      message: string;
  };
}


interface Props{
  setIsOpen?: (e: boolean) => void;
  investmentId?: string
  amountCommitedAndDesignationCondition?: boolean
  isDesignationRequired?: boolean
  context?: string
  state?: string
}

function InviteFinanciers({setIsOpen,investmentId,amountCommitedAndDesignationCondition,isDesignationRequired,context,state}: Props) {
  const [step, setStep] = useState(1);
  const [inviteFinancier, {isLoading}] = useInviteFinancierMutation()
  const [error, setError] = useState("");
  const {toast} = useToast();
  

  const initialFormValue = {
    id:investmentId,
    organizationName: "",
    firstName: "",
    lastName: "",
    email:"",
    financierType: "",
    investmentVehicleDesignation: [] as string[],
    amountCommited: '',
    organizationEmail: ''
    // investmentVehicleDesignation: ""
}

 const validationschema = Yup.object().shape({
      firstName: Yup.string()
           .trim()
           .matches(/^[A-Za-z]+$/, 'First name should only contain letters')
           .max(100, "First name cannot be more than 50 characters.")
           .required('Last Name is required'),
        //    .when('financierType', {
        //     is: 'INDIVIDUAL', 
        //     then: (schema) => schema.required('First name is required'),
        //     otherwise: (schema) => schema.notRequired(),
        // }),
         lastName: Yup.string()
           .trim()
           .matches(/^[A-Za-z]+$/, 'Last name should only contain letters')
           .max(100, "Last name cannot be more than 50 characters.")
           .required('Last Name is required'),
          //  .when('financierType', {
          //   is: 'INDIVIDUAL', 
          //   then: (schema) => schema.required('Last Name is required'),
          //   otherwise: (schema) => schema.notRequired(),
        // }),
         email: Yup.string()
           .trim()
           .email('Invalid email address')
           .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
           .required('Email Address is required')
           .required('Last Name is required'),
        //    .when('financierType', {
        //     is: 'INDIVIDUAL', 
        //     then: (schema) => schema.required('email is required'),
        //     otherwise: (schema) => schema.notRequired(),
        // }),
        organizationEmail: Yup.string()
        .trim()
        .email('Invalid email address')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
        .required('Email Address is required')
        .when('financierType', {
         is: 'COOPERATE', 
         then: (schema) => schema.required('email is required'),
         otherwise: (schema) => schema.notRequired(),
     }),
           organizationName: Yup.string()
              .trim()
              .matches(
                /^[a-zA-Z0-9\-_ ]*$/,
               "Name can include at least a letter and then numbers, hyphens and underscores.",
              )
              .max(200, "Organization name cannot be more than 200 characters.")
              .when('financierType', {
                is: 'COOPERATE', 
                then: (schema) => schema.required('Organization name is required'),
                otherwise: (schema) => schema.notRequired(),
            }),
         investmentVehicleDesignation: Yup.array()
             .when('financierType', (financierType, schema) => {
              return isDesignationRequired && financierType
              ? schema.min(1, "At least one designation is required")
              .required("Designation is required")
              : schema.notRequired();
      }),
            // amountCommited: Yup.string()
            // .required("Vehicle size is required"),
            // investmentVehicleDesignation: Yup.array()
            // .of(Yup.string()) 
            // .min(1, "At least one designation is required") 
            // .required("Designation is required"),

          
    })
 

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
      setStep(1);
    }
  };

  

  const handleContinue = () => {
    
      setStep(2); 
    
  };
  

  const handleBack = () => {
   
      setStep(1); 
    
  };

const handleSubmit = async  (values: typeof initialFormValue) => {
  //  console.log(values)
  const data = {
       userIdentity: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email
       },
       investmentVehicleDesignation: values.investmentVehicleDesignation,
       organizationEmail: values.organizationEmail,
       organizationName: values.organizationName,
       financierType: values.financierType,
       amountToInvest: values.amountCommited

  }
    const formData = {
      financierRequests: [data],
      investmentVehicleId: values.id
    }

    try{
      const result = await inviteFinancier(formData).unwrap();
      if (result) {
        toast({
            description: result.message,
            status: "success",
            duration: 1000
        });
        if (setIsOpen) {
            setIsOpen(false);
        }
        if(state === "platform"){
          store.dispatch(setFinancierStatusTab("invited"))
        }
    }

    }catch(err){
      const error = err as ApiError;
      setError(error?.data?.message);
    }
  }

  return (
    <div id='InviteFinancier' className={`${inter.className}`} >
      <Formik
       initialValues={initialFormValue}
       onSubmit={handleSubmit}
       validateOnMount={true}
       validationSchema={validationschema}
       validateOnChange={true}
      >
        {({errors,isValid,touched,setFieldValue,values}) => (
          <Form className='z-10'>
         {
        step === 1? (
        <div>
          <FinancierSelectType
           financierType={values.financierType || ""}
           handleCloseModal={handleCloseModal}
           handleContinue={handleContinue}
           setFieldValue={(field, value, shouldValidate) => {
            if (field === 'financierType' && value !== values.financierType) {
              setFieldValue('organizationName', '');
              setFieldValue('organizationEmail', '');
              setFieldValue('firstName', '');
              setFieldValue('lastName', '');
              setFieldValue('email', '');
              setFieldValue('investmentVehicleDesignation', []);
              setFieldValue('amountCommited', '');
            }
            setFieldValue(field, value, shouldValidate);
          }}
           context={context}
          />
        </div>
      ) : (
        <div>
      <div>
        <InviteFinancier
         financierType={values.financierType || ""}
         isloading={isLoading}
         isValid={isValid}
         handleBack={handleBack}
         errors={errors}
         touched={touched}
         setFieldValue={setFieldValue}
        //  values={values.investmentVehicleDesignation}
        amountCommitedAndDesignationCondition={amountCommitedAndDesignationCondition || false}
        
        />
        </div>
          {
            <div
                className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>{error}</div>
        }
        </div>
        )
      }
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InviteFinanciers