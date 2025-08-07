import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Label} from '@/components/ui/label';
import {inter} from "@/app/fonts"
import {useToast} from "@/hooks/use-toast";
import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';
import { validationStaffSchema } from '@/utils/validation-schema';
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';

// interface ApiError {
//     status: number;
//     data: {
//         message: string;
//     };
// }


const initialFormValue = {
    name: "",
    email: "",
    adminRole: ""
}

 interface Props{
    setIsOpen : (e:boolean) => void;
 }


function InviteStaff({setIsOpen}:Props) {
    
    const adminRoleType = [ { value: "ADMIN", label: "Admin" }, { value: "PORTFOLIO_MANAGER", label: "Portfolio manager" }, { value: "ASSOCIATE", label: "Associate"} ];
    const { toast } = useToast();

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleSubmit = (values: typeof initialFormValue) => {
       console.log(values)
       toast({
        description:"Invited successfully",
        status: "success",
       })
     handleCloseModal()
    }

    

  return (
    <div id='inviteForm'>
        <Formik 
         initialValues={initialFormValue}
         onSubmit={handleSubmit}
         validateOnChange={true}
         validateOnBlur={true}  
         validateOnMount={true}
         validationSchema={validationStaffSchema}
        >
     {
        ({errors, isValid, touched, setFieldValue, values}) => (
            <Form className={`${inter.className}`}>
           <div className='grid grid-cols-1 gap-y-4 mt-5'>
            <div>
              <Label htmlFor="Name">Name</Label>  
              <Field
               id="staffName"
               data-testid="staffNameTestId"
                name="name"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                placeholder="Enter name"
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
                <Label htmlFor="email">Email address </Label>
                <Field
                    id="email"
                    data-testid="emailTestId"
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
              <Label htmlFor="role">Role</Label>
               <div>
                <CustomSelectObj
                  triggerId='roleTriggerId'
                  id='selectRole'
                  value={values.adminRole}
                  onChange={(value) => setFieldValue("adminRole", value)} 
                  name='adminRole'
                  placeHolder='Select a role'
                  selectContent={adminRoleType}
                />
               </div>
                  {
                    errors.adminRole && touched.adminRole &&  (
                        <ErrorMessage
                    name="adminRole"
                    component="div"
                    id='programModeError'
                    className="text-red-500 text-sm"
                    />
                    )
                    }
              </div>
              <div className='mb-4'>
                <SubmitAndCancelButton
                  isValid={isValid} 
                  isLoading={false}
                  handleCloseModal={handleCloseModal}
                  submitButtonName='Invite'
                />
              </div>
           </div>
            </Form>
        )
     }
        </Formik> 
    </div>
  )
}

export default InviteStaff
