import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import {inter} from "@/app/fonts"
import CurrencySelectInput from '@/reuseable/Input/CurrencySelectInput';
import CustomSelect from '@/reuseable/Input/Custom-select';


interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

  const initialFormValue = {
    name: "",
    sponsor: "",
    fundManager: "",
    minimumAmount:"",
    mandate: "",
    tenure:"",
    vehicleSize: "",
    rate:"",
    bankPartner: "",
    trustee: "",
    custodian:"",

    
  }

  interface props {
    setIsOpen? : (e:boolean) => void;
  }
function CreateInvestmentVehicle({setIsOpen}:props) {
    const [selectCurrency, setSelectCurrency] = useState('NGN');

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }

  
      const validationSchema = Yup.object().shape({
        name:Yup.string()
       .trim()
       .matches(/^[a-zA-Z0-9_\-\/]+$/, 'Name can only contain letters, numbers, underscores, hyphens, and slashes.')
       .required('Name is required'),
       sponsor:Yup.string()
       .trim()
       .required('vehicle sponsor is required')
       .matches(/^[a-zA-Z\s]+$/, 'Vehicle sponsor can only contain letters and spaces.'),
       fundManager:Yup.string()
       .trim()
       .matches(/^[a-zA-Z\s]+$/, 'Fund manager can only contain letters and spaces.')
       .required('Fund is required'),
       vehicleSize:Yup.string()
       .required('Vehicle size is required')
       .matches(/^[1-9]\d*$/, 'Vehicle size must be a positive number and cannot start with zero'),
       minimumAmount:Yup.string()
       .required('Vehicle size is required')
       .matches(/^[1-9]\d*$/, 'Vehicle size must be a positive number and cannot start with zero'),

       
      })

     const handleSubmit = () => {

      }
  return (
    <div id='createInvestmentVehicleId'>
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
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                    //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("name", e.target.value.replace(/[^a-zA-Z0-9_\-\/]/g,''))}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                        const value = e.target.value; const regex = /^[a-zA-Z][a-zA-Z0-9_\-\/]*$/; 
                         if (regex.test(value) || value === "") { 
                             setFieldValue("name", value); } else { 
                             setFieldValue("name", value.replace(/[^a-zA-Z0-9_\-\/]/g, '').replace(/^[^a-zA-Z]/, '')); 
                            } }}
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
                <div className='grid md:grid-cols-2 gap-4 w-full'>
                <div>
                    <Label htmlFor="sponsor">Vehicle Sponsor</Label>
                    <Field
                      id="sponsor"
                      name="sponsor"
                      placeholder="Enter Vehicle Sponsor"
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("sponsor", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    />
                     {
                 errors.sponsor && touched.sponsor &&  (
                    <ErrorMessage
                    name="sponsor"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                }
                </div>
                <div>
                <Label htmlFor="fundManager">Fund manager</Label>
                    <Field
                      id="fundManager"
                      name="fundManager"
                      placeholder="Enter Fund manager"
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("fundManager", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    /> 
                    {
                 errors.fundManager && touched.fundManager &&  (
                    <ErrorMessage
                    name="fundManager"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                }
                </div>
                </div>
                <div className='grid md:grid-cols-2 gap-4 w-full'>
                    <div>
                    <div>
                    <Label htmlFor="vehicleSize">Vehicle size</Label> 
                    <div className='flex gap-2 items-center justify-center'>
                        <CurrencySelectInput
                         selectedcurrency={selectCurrency}
                         setSelectedCurrency={setSelectCurrency}
                        />
                        <Field
                        id="vehicleSize"
                         name="vehicleSize"
                         type="text"
                          placeholder="0.00"
                         className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2 "
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            if (/^(?!0)\d*$/.test(value)) { 
                                setFieldValue("vehicleSize", value); 
                            }
                        }}
                        />
                        </div>
                        <div className='relative bottom-5'>
                          {
                 errors.vehicleSize && touched.vehicleSize &&  (
                    <ErrorMessage
                    name="vehicleSize"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                }
                </div>
                    </div>  
                    </div>
                    <div>
                    <Label htmlFor=" minimumAmount">Minimum investment amount</Label>  
                    <div className='flex gap-2 items-center justify-center'>
                    <CurrencySelectInput
                         selectedcurrency={selectCurrency}
                         setSelectedCurrency={setSelectCurrency}
                        />
                    <Field
                        id="minimumAmount"
                        name="minimumAmount"
                        type="text"
                        placeholder="0.00"
                        className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            if (/^(?!0)\d*$/.test(value)) { 
                                setFieldValue("minimumAmount", value); 
                            }
                        }}
                        />
                    </div> 
                    <div className='relative bottom-5'>
                    {
                 errors.minimumAmount && touched.minimumAmount &&  (
                    <ErrorMessage
                    name="minimumAmount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                }   
                </div>
                    </div>
                </div>
              </div>
            </Form>
        )
       }
        </Formik>

    </div>
  )
}

export default  CreateInvestmentVehicle