import React,{useState}  from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import {Icon} from "@iconify/react";
import {inter} from "@/app/fonts"
import CurrencySelectInput from '@/reuseable/Input/CurrencySelectInput';
import {Accordion, AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
import ToastPopUp from '@/reuseable/notification/ToastPopUp';


interface idProps {
  cohortId : string;
  setIsOpen? : (e:boolean | undefined) => void;
}




function AddTraineeForm({cohortId,setIsOpen}: idProps) {

  const details = [
    {
      "item": "Tuition",
      "amount": "₦2,000,000.00"
    },
    {
      "item": "Devices",
      "amount": "₦600,000.00"
    },
    {
      "item": "Accommodation",
      "amount": "₦600,000.00"
    },
    {
      "item": "Feeding",
      "amount": "₦300,000.00"
    },
    {
      "item": "Total amount requested",
      "amount": "₦3,500,000.00"
    }
  ]
  
  

  const initialFormValue = {
    cohortId: cohortId,
    firstName: "",
    lastName: "",
    emailAddress: "",
    initialDeposit: '',

  }

  const [selectCurrency, setSelectCurrency] = useState('NGN');

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading] = useState(false);
  
  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
};

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
    .trim()
    .required('First name is required'),
    lastName: Yup.string()
    .trim()
    .required('Last name is required'),
    emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
    initialDeposit: Yup.number()
    .positive('Initial deposit must be a positive number')
    .required('Initial deposit is required')
    .transform((value) => (isNaN(value) || value === null || value === undefined) ? 0 : value)

  })

  const toastPopUp = ToastPopUp({
    description: "Cohort Trainee successfully added.",
    status:"success"
  });
  

  const handleSubmit = (values: typeof initialFormValue) => {
    const formattedDeposit = `${selectCurrency}${values.initialDeposit}`;
    const formattedValues = {
      ...values,
      initialDeposit: formattedDeposit,
    };
    toastPopUp.showToast();
    console.log(formattedValues);

    if (setIsOpen) {
      setIsOpen(false);
    }

  }
   


  return (
    <div id='addTraineeForm'>
      <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
       {
         ({errors, isValid, touched}) => (
          <Form className={`${inter.className}`}>
              <div 
              className='grid grid-cols-1 gap-y-4 md:max-h-[520px] overflow-y-auto'
              style={{
                scrollbarWidth: 'none',
                  msOverflowStyle: 'none', 
                  
              }}
              >
              <div className=''>
                <Label htmlFor="firstName">First name</Label>
                <Field
              id="firstName"
              name="firstName"
              className="w-full p-3 border rounded focus:outline-none mt-2"
              placeholder="Enter first name"
              
            />
              
             {
              errors.firstName && touched.firstName &&  (
                 <ErrorMessage
              name="firstName"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
              </div>
              <div className=''>
                  <Label htmlFor="lastName">Last name</Label>
                  <Field
                  id="lastName"
                  name="lastName"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  placeholder="Enter last name"
                 />
              
                   {
              errors.lastName && touched.lastName &&  (
                 <ErrorMessage
              name="lastName"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
                </div>
                <div className=''>
                  <Label htmlFor="emailAddress">Email address</Label>
                  <Field
                  id="emailAddress"
                  name="emailAddress"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  placeholder="Enter email address"
                 />
              
                   {
              errors.emailAddress && touched.emailAddress &&  (
                 <ErrorMessage
              name="emailAddress"
              component="div"
              className="text-red-500 text-sm"
            /> 
              )
             }
                </div>
                <div>
                <Label htmlFor="initialDeposit">Initial Deposit</Label>
                <div className='flex items-center gap-2'>
                <CurrencySelectInput
                selectedcurrency={selectCurrency}
                setSelectedCurrency={setSelectCurrency}
                  />
                  <div className='w-full mb-2'>
                  <Field
                  id="initialDeposit"
                  name="initialDeposit"
                  type="number"
                  placeholder="Enter Initial Deposit"
                  className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none "
                  />
                 
                  </div>
                </div>
                </div>
                 <div className='relative bottom-6 ml-[90px]'>
                 {
              errors.initialDeposit && touched.initialDeposit &&  (
                 <ErrorMessage
              name="initialDeposit"
              component="div"
              className="text-red-500 text-sm"
            />) }
            </div >
            <div className='relative bottom-9 '>
              <Accordion
               type="single" 
               collapsible 
               className="w-full"
               
              >
                <AccordionItem value='item'>
                <AccordionTrigger 
                onClick={handleDropdownOpen}
                className='border rounded shadow-none text-black300'
                >
                  {!dropdownOpen?  (<div>Expand to see the tuition breakdown</div>) : (<div>Collapse to hide the tuition breakdown</div>)}
                  </AccordionTrigger>
                  <AccordionContent
                   className='border rounded '
                  > 
                    {
                      details.map((detail, index) => (
                        <div key={index} className={`flex flex-row items-center justify-between mt-6 px-3 text-black300 ${detail.item === "Total amount requested"? "border-t h-10" : "" }`}>
                          <div>{detail.item}</div>
                          <div>{detail.amount}</div>
                        </div>
                      ))
                    }
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
                
              </div>
              <div className='md:flex gap-4 justify-end mt-2 md:mb-0 mb-3'>
                <Button 
                variant={'outline'} 
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4'
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
                  {isLoading ? (
                                                <div id={'loadingLoopIconDiv'} className="flex items-center justify-center">
                                                    <Icon id={'Icon'} icon={loadingLoop} width={34} height={32}  style={{
                                                animation: 'spin 1s linear infinite',
                                                strokeWidth: 6, 
                                                display: 'block',
                                                    }}/>
                                                </div>
                                            ) : (
                                                "Add"
                                            )}
                  
                 </Button>
              </div>
          </Form>
         )
       } 

      </Formik>

    </div>
  )
}

export default AddTraineeForm