import React,{useState} from 'react'
import { inter } from "@/app/fonts";
import FinancierSelectType from './financier-select-type';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InviteFinancier from './Invite-financier';



interface Props{
  setIsOpen?: (e: boolean) => void;
  investmentId?: string
  amountCommitedAndDesignationCondition?: boolean
  isDesignationRequired?: boolean

}

function InviteFinanciers({setIsOpen,investmentId,amountCommitedAndDesignationCondition,isDesignationRequired}: Props) {
  const [step, setStep] = useState(1);

  const initialFormValue = {
    id:investmentId,
    companyName: "",
    firstName: "",
    lastName: "",
    email:"",
    financierType: "",
    investmentVehicleDesignation: [] as string[],
    amountCommited: ''
    // investmentVehicleDesignation: ""
}

 const validationschema = Yup.object().shape({
      firstName: Yup.string()
           .trim()
           .matches(/^[A-Za-z]+$/, 'First name should only contain letters')
           .max(100, "First name cannot be more than 50 characters.")
           .when('financierType', {
            is: 'Individual', 
            then: (schema) => schema.required('First name is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
         lastName: Yup.string()
           .trim()
           .matches(/^[A-Za-z]+$/, 'Last name should only contain letters')
           .max(100, "Last name cannot be more than 50 characters.")
           .when('financierType', {
            is: 'Individual', 
            then: (schema) => schema.required('Last Name is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
         email: Yup.string()
           .trim()
           .email('Invalid email address')
           .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
           .required('Email Address is required'),
         companyName: Yup.string()
              .trim()
              .matches(
                /^[a-zA-Z0-9\-_ ]*$/,
               "Name can include at least a letter and then numbers, hyphens and underscores.",
              )
              .max(200, "Full name cannot be more than 200 characters.")
              .when('financierType', {
                is: 'Company', 
                then: (schema) => schema.required('Company name is required'),
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

const handleSubmit = (values: typeof initialFormValue) => {
   console.log(values)
   if(setIsOpen)
   setIsOpen(false)
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
           setFieldValue={setFieldValue}
          />
        </div>
      ) : (
      <div>
        <InviteFinancier
         financierType={values.financierType || ""}
         isloading={false}
         isValid={isValid}
         handleBack={handleBack}
         errors={errors}
         touched={touched}
         setFieldValue={setFieldValue}
        //  values={values.investmentVehicleDesignation}
        amountCommitedAndDesignationCondition={amountCommitedAndDesignationCondition || false}
        />
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