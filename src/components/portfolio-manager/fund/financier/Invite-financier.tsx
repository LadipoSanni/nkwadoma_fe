import React,{useState} from 'react'
import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';
//  import { MultiSelect } from '@/reuseable/mult-select';
 import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
 import { validateNumber} from "@/utils/Format";
 import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
//  import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';
import Multiselect from '@/reuseable/mult-select/multi-select';


// interface ApiError {
//     status: number;
//     data: {
//       message: string;
//     };
//   }

interface Props {
    financierType?: string;
    isloading: boolean;
    isValid: boolean;
    handleBack:() => void;
    errors: { [key: string]: string | string[] }; 
    touched: { [key: string]: boolean }; 
    setFieldValue: (field: string, value: string | number | boolean | string[], shouldValidate?: boolean) => void;
  //  values?: string[],
  amountCommitedAndDesignationCondition: boolean
}

function InviteFinancier({financierType,isloading,isValid,handleBack,errors,touched,setFieldValue,amountCommitedAndDesignationCondition = false}: Props) {
  
  const [selectCurrency, setSelectCurrency] = useState("NGN");

  const designations = [
    { label: "Lead", value: "LEAD" },
    { label: "Sponsor", value: "SPONSOR" },
    { label: "Investor", value: "INVESTOR" },
    { label: "Endower", value: "ENDOWER" },
    { label: "Donor", value: "DONOR" },
  ]

    
  return (
    <div>
    <div
    className='grid grid-cols-1 gap-y-4 lg:max-h-[55.5vh] md:max-h-[50vh] overflow-y-auto z-20'
    style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
    >
       {
         financierType === "Individual"? 
         <div className='grid grid-cols-1 gap-y-4'>
           <div>
               <Label htmlFor='firstName'>First name</Label>
               <Field
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                className="w-full p-3 border rounded focus:outline-none mt-2"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    const regex = /^[A-Za-z]+$/;
                                    if (regex.test(value) || value === "") {
                                      setFieldValue("firstName", value);
                                    }
                                  }}
               />
                {errors.firstName && touched.firstName && (
                                 <ErrorMessage
                                   name="firstName"
                                   component="div"
                                   className="text-red-500 text-sm"
                                 />
                               )}
           </div>
           <div>
               <Label htmlFor='lastName'>Last name</Label>
               <Field
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                className="w-full p-3 border rounded focus:outline-none mt-2"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    const regex = /^[A-Za-z]+$/;
                                    if (regex.test(value) || value === "") {
                                      setFieldValue("lastName", value);
                                    }
                                  }}
               />
                {errors.lastName && touched.lastName && (
                                 <ErrorMessage
                                   name="lastName"
                                   component="div"
                                   className="text-red-500 text-sm"
                                 />
                               )}
           </div>
         </div>
          
          : 
          <div>
          <Label htmlFor='companyName'>Company name</Label>
          <Field
           id="companyName"
           name="companyName"
           placeholder="Enter full name"
           className="w-full p-3 border rounded focus:outline-none mt-2"
            
          />
           {errors.companyName && touched.companyName && (
                            <ErrorMessage
                              name="companyName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          )}
      </div>
       }
   <div>
   <Label htmlFor='email'>Email</Label>
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
    <div>
    {!amountCommitedAndDesignationCondition? "" :
    <div>
   <div>
   <Label htmlFor='investmentVehicleDesignation'>Designation</Label>

   {/* <MultiSelect
    options={designations}
    // onValueChange={(values) => console.log(values)}
    placeholder='Select designation'
    className='mt-2'
    modalPopover={true}
    onValueChange={(values) => setFieldValue("investmentVehicleDesignation", values)}
    id='designationId'
    selcetButtonId='designationbuttonId'
     restrictedItems={["LEAD","SPONSOR"]}
   /> */}
    <Multiselect
        multiselectList={designations}
        onValueChange={(values) => setFieldValue("investmentVehicleDesignation", values)}
        placeholder='Select designation'
        restrictedItems={["LEAD","SPONSOR"]}
      />
    
   {
       errors.investmentVehicleDesignation && touched.investmentVehicleDesignation && (
           <ErrorMessage
               name="investmentVehicleDesignation"
               component="div"
               className="text-red-500 text-sm"
           />
       )
   }
   </div >
   <div className='mt-4 '>
   <Label htmlFor='amountCommited'>Amount commited</Label>
   <div className="flex gap-2 items-center justify-center relative bottom-1">
   <CurrencySelectInput
    selectedcurrency={selectCurrency}
    setSelectedCurrency={setSelectCurrency}
        />
    
<Field
  id="amountCommited"
  name="amountCommited"
  placeholder="Enter amount commited"
  className="w-full p-3 border rounded focus:outline-none mb-2 text-[14px]"
  component={CustomInputField}
  onChange={validateNumber("amountCommited", setFieldValue)}
/>
   </div>
   </div>
   </div>
}
   </div>
    </div>
    <div className='z-20'>
    <SubmitAndCancelButton
    isValid={isValid}
    submitButtonName='Invite'
    hasBack={true}
    isLoading={isloading}
    handleContinueOrBack={handleBack}
    />
   </div>
    </div>
  )
}

export default InviteFinancier