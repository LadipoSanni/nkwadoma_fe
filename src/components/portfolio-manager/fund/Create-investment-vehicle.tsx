import React,{useState} from 'react'
import { Button } from '@/components/ui/button';
import { Formik,Form,Field,ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Label } from '@/components/ui/label';
import {inter} from "@/app/fonts"
import CurrencySelectInput from '@/reuseable/Input/CurrencySelectInput';
// import RichTextEditor from '@/reuseable/Input/Ritch-text-editor';
import Isloading from '@/reuseable/display/Isloading';


// interface ApiError {
//     status: number;
//     data: {
//       message: string;
//     };
//   }

  const initialFormValue = {
    name: "",
    sponsor: "",
    fundManager: "",
    minimumAmount:"",
    mandate: "",
    tenor:"",
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
    const [isError, setError] = useState('')

    const handleCloseModal = () => {
        if (setIsOpen) {
          setIsOpen(false);
        }
      }
      
      const isLoading = false
  
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
       tenor:Yup.string()
       .trim()
       .required('tenor size is required')
       .matches(/^[1-9]\d*$/, 'Tenor must be a positive number and cannot start with zero.'),
      rate: Yup.number() 
      .min(1, 'Rate must be at least 1.') 
      .max(100, 'Rate must be at most 100.') 
      .required('Rate is required'),
      mandate:Yup.string()
      .trim()
      .max(2500, 'Mandate must be 2500 characters or less')
      })

     const handleSubmit = () => {

      }

      const maxChars = 1500;
  return (
    <div id='createInvestmentVehicleId'>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
        >
       {
        ({errors,isValid, touched,setFieldValue,values}) => (
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
                             setFieldValue("name", value); 
                            } 
                             
                             else { 
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
                    <div>
                    <Label htmlFor=" minimumAmount"
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '100%', }}
                    >Minimum investment amount</Label>  
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
                <div className='grid md:grid-cols-2 gap-4 w-full relative bottom-4'>
                <div>
                    <Label htmlFor="rate">Interest rate (%)</Label>
                    <Field
                      id="rate"
                      name="rate"
                      placeholder="0"
                      type="number"
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                       style={{ WebkitAppearance: 'none', MozAppearance: 'textfield', }}
                    />
                     {
                 errors.rate && touched.rate &&  (
                    <ErrorMessage
                    name="rate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                }
                </div>
                <div>
                <Label htmlFor="tenor">Tenor (months)</Label>
                    <Field
                      id="tenor"
                      name="tenor"
                      placeholder="0"
                      
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                      // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("tenor", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    /> 
                    {
                 errors.tenor && touched.tenor &&  (
                    <ErrorMessage
                    name="tenor"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                }
                </div>
                </div>
                <div className='relative bottom-3'>
                <Label htmlFor="name">Bank partner</Label>
                <Field
                  id="bankPartner"
                  name="bankPartner"
                  placeholder="Enter Bank partner"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("bankPartner", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  />
                </div>
                <div className='grid md:grid-cols-2 gap-4 w-full relative bottom-3'>
                <div>
                    <Label htmlFor="trustee">Trustee</Label>
                    <Field
                      id="trustee"
                      name="trustee"
                      placeholder="Enter trustee"
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("trustee", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    />
                     {/* {
                 errors.sponsor && touched.sponsor &&  (
                    <ErrorMessage
                    name="sponsor"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                } */}
                </div>
                <div>
                <Label htmlFor="custodian">Custodian</Label>
                    <Field
                      id="custodian"
                      name="custodian"
                      placeholder="Enter Custodian"
                      className="w-full p-3 border rounded focus:outline-none mt-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("custodian", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    /> 
                    {/* {
                 errors.fundManager && touched.fundManager &&  (
                    <ErrorMessage
                    name="fundManager"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                 )
                } */}
                </div>
                </div>
                <div className='relative bottom-3'>
                <Label htmlFor="mandate">Vehicle mandate</Label>

                 <Field
                 as="textarea"
                id="mandate"
                name="mandate"
                className="w-full p-3 border rounded focus:outline-none mt-2 resize-none "
                placeholder="Enter cohort description"
                rows={4}
                maxLength={maxChars}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { 
                  const value = e.target.value; 
                  if (value.length <= maxChars) { 
                    setFieldValue("mandate", value); } }} 
                onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => { 
                  const paste = e.clipboardData.getData('text'); 
                  if (paste.length + values.mandate.length > maxChars) { 
                    e.preventDefault(); 
                    setError('Mandate must be 2500 characters or less'); } }}
                />
             {/* {
              errors.mandate && touched.mandate &&  (
                 <ErrorMessage
              name="mandate"
              component="div"
              id='editCohortDescriptionError'
              className="text-red-500 text-sm"
            /> 
              )
             } */}
                </div>
                <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
                <Button 
                variant={'outline'} 
                type='reset'
                className='w-full md:w-36 h-[57px] mb-4'
                // onClick={() => handleReset(resetForm)}
                onClick={handleCloseModal}
                >
                    Cancel
                </Button>
                <Button 
                variant={'default'} 
                className={`w-full md:w-36 h-[57px] ${ !isValid? "bg-neutral650 cursor-not-allowed " :"hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`}
                type='submit'
                disabled={!isValid}
                >
                  {isLoading ? (
                                     <Isloading />          
                                            ) : (
                                                "Publish"
                                            )}
                  
                </Button>
              </div>
              </div>
              <p className={`text-error500 flex justify-center items-center ${isError? "mb-3" : ""}`}>{isError}</p>
            </Form>
        )
       }
        </Formik>

    </div>
  )
}

export default  CreateInvestmentVehicle