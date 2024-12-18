
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { inter } from '@/app/fonts';
import { Label } from '@/components/ui/label';
import Isloading from '@/reuseable/display/Isloading';

interface Props {
  setIsOpen?: (e: boolean) => void;
}

function InviteAdmin({ setIsOpen }: Props) {
  const initialFormValue = {
    firstName: "",
    lastName: "",
    emailAddress: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, 'First name should only contain letters')
      .required('First Name is required'),
    lastName: Yup.string()
      .trim()
      .matches(/^[A-Za-z]+$/, 'Last name should only contain letters')
      .required('Last Name is required'),
    emailAddress: Yup.string()
      .trim()
      .email('Invalid email address')
      .matches(/^\S*$/, 'Email address should not contain spaces')
      .required('Email Address is required'),
  });

  const isLoading = false;

  const handleSubmit = () => {
    // if (setIsOpen) {
    //   setIsOpen(false);
    // }
  };

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValue}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, isValid, touched, setFieldValue }) => (
          <Form className={`${inter.className}`}>
            <div className='grid grid-cols-1 gap-y-4'>
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Field
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter first name"
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
                    id='firstName'
                    component="div"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Field
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter last name"
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
                    id='lastName'
                    component="div"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>
              <div>
                <Label htmlFor="emailAddress">Email address</Label>
                <Field
                  id="emailAddress"
                  name="emailAddress"
                  value={values.emailAddress}
                  className="w-full p-3 border rounded focus:outline-none mt-2 text-sm"
                  placeholder="Enter email address"
                />
                {errors.emailAddress && touched.emailAddress && (
                  <ErrorMessage
                    name="emailAddress"
                    id='emailAddress'
                    component="div"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>
              <div className='md:flex gap-4 justify-end mt-2 mb-4 md:mb-0'>
                <Button
                  id='createProgramCancelButton'
                  variant={'outline'}
                  type='reset'
                  className='w-full md:w-36 h-[57px] mb-4'
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  id='createProgramButton'
                  variant={'default'}
                  className={`w-full md:w-36 h-[57px] ${!isValid ? "bg-neutral650 cursor-not-allowed " : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"}`}
                  type='submit'
                  disabled={!isValid}
                >
                  {isLoading ? <Isloading /> : (
                    "Invite"
                  )}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InviteAdmin;
