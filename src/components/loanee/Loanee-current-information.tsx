import React,{useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoaneeInformationvalidationSchema} from '@/utils/validation-schema';
import { inter } from "@/app/fonts";
import { Label } from "@/components/ui/label";
import PhoneNumberSelect from '@/reuseable/select/phoneNumberSelect/Index';
import GoogleLocationsearch from '@/reuseable/google-location/Google-location-search';
import Select from "@/reuseable/select/ProgramSelect";
import { Button } from "@/components/ui/button";


export interface initialFormValue {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nextOfKinRelationship: string;
  contactAddress: string;
  alternateEmail: string;
  alternatePhoneNumber: string;
  alternateContactAddress: string;
}

interface Props {
  initialFormValue: initialFormValue
  handleSubmit:  (values:  initialFormValue) => void
  nextOfCountryCode?: string;
  setNextOfCountryCode?: (code: string) => void;
  countryCode?: string;
  setCountryCode?: (code: string) => void;
  
}

function LoaneeCurrentInformation({initialFormValue,handleSubmit,nextOfCountryCode,setNextOfCountryCode,countryCode,setCountryCode}:Props) {
  const [isRelationshipSelectOpen, setIsRelationshipSelectOpen] = useState(false);
  const [isPhoneNumberError,setPhoneNumberError] = useState(false)
  const [isAltPhoneNumberError,setAltPhoneNumberError] = useState(false)

  return (
    <div>
      <Formik
       initialValues={initialFormValue}
       onSubmit={handleSubmit}
       validateOnMount={true}
      //  enableReinitialize={true}
       validationSchema={LoaneeInformationvalidationSchema}
      >
         {({
          errors,
          touched,
          setFieldValue,
           values,isValid,isSubmitting,
           setFieldError,
           handleBlur,
        })=> (
          <Form
          className={`${inter.className}`}
          >
            <div className='grid gap-3 z-50 relative'>
              <div className={'grid gap-2'}>
              <Label htmlFor="alternateEmail" className="block text-sm font-medium text-labelBlue">Alternate
               email address</Label>
               <Field
                 name={"alternateEmail"}
                 className="w-full p-3 border border-[#B6BCCA] rounded-md focus:outline-none mt-2 text-[14px] h-14 border-opacity-65"
                   placeholder="Enter email address"
               />
                {errors.alternateEmail && touched.alternateEmail && (
                    <ErrorMessage
                    name="alternateEmail"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                           )}
              </div>
               
               <div className={'grid gap-2'}>
              
                <PhoneNumberSelect
                  selectedCountryCode={countryCode}
                  setSelectedCountryCode={(code) => {
                    if(setCountryCode){
                      setCountryCode(code)
                    }
                    }}
                  phoneNumber={values.alternatePhoneNumber}
                  setPhoneNumber={(num) => setFieldValue('alternatePhoneNumber', num)}
                label="Alternate phone number"
                placeholder="Select code"
                 id="phone"
                  setFieldError={setFieldError}
                  name="alternatePhoneNumber"
                  onBlur={handleBlur}
                  setError={setPhoneNumberError}
                />
                 {/* {errors.alternatePhoneNumber && touched.alternatePhoneNumber && (
                    <ErrorMessage
                    name="alternatePhoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                 )} */}
               </div>

               <div className={'grid'}>
                 <Label className="block text-sm font-medium text-labelBlue">
                   Alternative residential address
                 </Label>
                 <GoogleLocationsearch
              address={values.alternateContactAddress}
              setAddress={(address) => setFieldValue('alternateContactAddress', address || '')}
              variant="textarea"
              helperText={touched.alternateContactAddress && errors.alternateContactAddress ? errors.alternateContactAddress : "Start typing to search addresses"}
              error={!!(touched.alternateContactAddress && errors.alternateContactAddress)}
            />
              {/* {errors.alternateContactAddress && touched.alternateContactAddress && (
                    <ErrorMessage
                    name="alternateContactAddress"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                 )} */}

               </div>

               <div className={'grid gap-2'}>
               <Label htmlFor="nextOfKinFirstName"
                 className="block text-sm font-medium text-labelBlue">Next of
                                                  Kin&#39;s
                                                  first name</Label>
                <Field
                 name={"firstName"}
                 className="w-full p-3 border border-[#B6BCCA] rounded-md focus:outline-none mt-2 text-[14px] h-14 border-opacity-65"
                   placeholder="Enter email address"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!_-]/g, '');
                      setFieldValue("firstName", formattedValue);
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
                <div className={'grid gap-2'}>
                <Label htmlFor="nextOfKinLastName"
                  className="block text-sm font-medium text-labelBlue">Next of
                  Kin&#39;s
                  last name</Label>
                  <Field
                 name={"lastName"}
                 className="w-full p-3 border border-[#B6BCCA] rounded-md focus:outline-none mt-2 text-[14px] h-14 border-opacity-65"
                   placeholder="Enter email address"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!_-]/g, '');
                      setFieldValue("lastName", formattedValue);
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

                <div className={'grid gap-2'}>
              <Label htmlFor="email" className="block text-sm font-medium text-labelBlue">
              Next of kin&#39;s email address</Label>
               <Field
                 name={"email"}
                 className="w-full p-3 border border-[#B6BCCA] rounded-md focus:outline-none mt-2 text-[14px] h-14 border-opacity-65"
                   placeholder="Enter email address"
               />
                {errors.email && touched.email && (
                    <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                           )}
              </div>

                <div className={'grid gap-2'}>
                <PhoneNumberSelect
                  selectedCountryCode={nextOfCountryCode}
                  setSelectedCountryCode={(code) => {
                      if(setNextOfCountryCode){
                        setNextOfCountryCode(code)
                      }
                   }}
                  phoneNumber={values.phoneNumber}
                  setPhoneNumber={(num) => setFieldValue('phoneNumber', num)}
                label="Next of kin's phone number"
                placeholder="Select code"
                 id="phoneNumber"
                 setFieldError={setFieldError}
                 name="phoneNumber"
                 onBlur={handleBlur}
                 setError={setAltPhoneNumberError}
                // setSelectedCountryCode={setCountryCode}
                />
                  {/* {errors.phoneNumber && touched.phoneNumber && (
                    <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                    />
                 )} */}
                </div>

                <div className={'grid '}>
                 <Label className="block text-sm font-medium text-labelBlue">
                   Next of kin&apos;s residential address
                 </Label>
                 <GoogleLocationsearch
              address={values.contactAddress}
              setAddress={(address) => setFieldValue('contactAddress', address || '')}
              variant="textarea"
              helperText={touched.contactAddress && errors.contactAddress ? errors.contactAddress : "Start typing to search addresses"}
              error={!!(touched.contactAddress && errors.contactAddress)}
            />
{/* 
              {errors.contactAddress && touched.contactAddress && (
                <ErrorMessage
                  name="contactAddress"
                  component="div"
                  className="text-red-500 text-sm"
                />
              )} */}

               </div>
              
               <div className={'grid gap-2'}>
              <Select
                selectedProgram={values.nextOfKinRelationship}
                setSelectedProgram={(value) => setFieldValue('nextOfKinRelationship', value)}
                isSelectOpen={isRelationshipSelectOpen}
                setIsSelectOpen={setIsRelationshipSelectOpen}
                selectOptions={[
                  { id: "1", name: "Father" },
                  { id: "2", name: "Mother" },
                  { id: "3", name: "Brother" },
                  { id: "4", name: "Sister" },
                  { id: "5", name: "Friend" },
                  { id: "6", name: "Spouse" },
                   { id: "7", name: "Aunt" },
                   { id: "8", name: "Uncle" },
                  { id: "9", name: "Niece" },
                  { id: "10", name: "Nephew" },
                ]}
                setId={(id: string) => {
                  const selected = [
                    { id: "1", name: "Father" },
                    { id: "2", name: "Mother" },
                    { id: "3", name: "Brother" },
                    { id: "4", name: "Sister" },
                    { id: "5", name: "Friend" },
                    { id: "6", name: "Spouse" },
                    { id: "7", name: "Aunt" },
                    { id: "8", name: "Uncle" },
                    { id: "9", name: "Niece" },
                    { id: "10", name: "Nephew" },
                  ].find(opt => opt.id === id);
                  if (selected) {
                    setFieldValue('nextOfKinRelationship', selected.name);
                  }
                }}
                label={'Next of Kin\'s relationship'}
                placeholder={'Select relationship'}
              />
              {errors.nextOfKinRelationship && touched.nextOfKinRelationship && (
                <ErrorMessage
                  name="nextOfKinRelationship"
                  component="div"
                  className="text-red-500 text-sm"
                />
              )}
            </div>
            <div className="hidden">
            <pre>Valid: {isValid.toString()}</pre>
            <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
          </div>
             <div className='flex justify-end'>
              <Button
              id='additionalinformation'
              variant={'secondary'}
              className={`w-full md:w-20 h-[50px] ${!isValid || isSubmitting || isAltPhoneNumberError || isPhoneNumberError ? "bg-[#D7D7D7] hover:bg-[#D7D7D7] " : " bg-meedlBlue cursor-pointer"}`}
              type='submit'
              disabled={!isValid ||isSubmitting || isAltPhoneNumberError || isPhoneNumberError}
              >
                Add
              </Button>
             </div>

            </div>

          </Form>
        )}

      </Formik>
      
    </div>
  )
}

export default LoaneeCurrentInformation

