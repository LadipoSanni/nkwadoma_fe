import React,{useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {Label} from '@/components/ui/label';
import {inter} from "@/app/fonts"
import {useToast} from "@/hooks/use-toast";
import CustomSelectObj from '@/reuseable/Input/Custom-select-obj';
import { validationStaffSchema } from '@/utils/validation-schema';
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';
import { useInviteColleagueMutation } from '@/service/admin/organization';
import { getUserDetailsFromStorage } from "@/components/topBar/action";
import { setIsStaffOpen } from '@/redux/slice/staff-and-request/request';
import { store } from '@/redux/store';
import {formatSentence} from "@/utils/GlobalMethods";

interface RoleOption {
  value: string;
  label: string;
}


 interface Props{
    setIsOpen : (e:boolean) => void;
    roleOptions: RoleOption[];
    isItemDisabled?: (item: string | number) => boolean;
 }

 interface ApiError {
  status: number;
  data: {
    message: string;
  };
}


function InviteStaff({setIsOpen,roleOptions,isItemDisabled}:Props) {
     const user_role = getUserDetailsFromStorage('user_role');
    const { toast } = useToast();
     const [error, setError] = useState("")
    const [inviteColleague,{isLoading}] = useInviteColleagueMutation()

    const initialFormValue = {
      firstName: "",
      lastName: "",
      email: "",
      role: ["COOPERATE_FINANCIER_SUPER_ADMIN","COOPERATE_FINANCIER_ADMIN"].includes(user_role || "")?  "COOPERATE_FINANCIER_ADMIN" : ""
  }

    const handleCloseModal = () => {
        setIsOpen(false);
        store.dispatch(setIsStaffOpen(false))
    }

    const handleSubmit = async  (values: typeof initialFormValue) => {

      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role
      }

      try {
        const result = await inviteColleague(formData).unwrap();
        if(result){
          const toasts = formatSentence(result.message)
          console.log(toasts)
          toast({
          description: toasts,
          status: "success",
          duration: 3000
        });
        handleCloseModal()
    
    }
      } catch (err) {
        const error = err as ApiError;
        setError(formatSentence(error?.data?.message));
      }
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
           <div 
           className='grid grid-cols-1 gap-y-4 mt-5  md:max-h-[56.5vh] overflow-y-auto'
           style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',

        }}
           >
            <div>
              <Label htmlFor="firstName">First name</Label>  
              <Field
               id="staffName"
               data-testid="staffNameTestId"
                name="firstName"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                placeholder="Enter name"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                setFieldValue("firstName", formattedValue);
            }}  
            />
               {
                errors.firstName && touched.firstName && (
                    <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm"
                    />
                )
            }
            </div>

            <div>
              <Label htmlFor="firstName">Last name</Label>  
              <Field
               id="staffLastName"
               data-testid="staffLastNameTestId"
                name="lastName"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                placeholder="Enter name"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = value.replace(/^[\s]+|[^A-Za-z\s!-]/g, '');
                setFieldValue("lastName", formattedValue);
            }}  
            />
               {
                errors.lastName && touched.lastName && (
                    <ErrorMessage
                        name="lastName"
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

             { !["COOPERATE_FINANCIER_SUPER_ADMIN","COOPERATE_FINANCIER_ADMIN"].includes(user_role || "") && <div>
              <Label htmlFor="role">Role</Label>
               <div>
                <CustomSelectObj
                  triggerId='roleTriggerId'
                  id='selectRole'
                  value={values.role}
                  onChange={(value) => setFieldValue("role", value)} 
                  name='role'
                  placeHolder='Select a role'
                  selectContent={roleOptions}
                  testId='roleTestId'
                  isItemDisabled={isItemDisabled}
                />
               </div>
                  {
                    errors.role && touched.role &&  (
                        <ErrorMessage
                    name="adminRole"
                    component="div"
                    id='adminRoleError'
                    className="text-red-500 text-sm"
                    />
                    )
                    }
              </div>}
           </div>
           <div className='mb-4 '>
                <SubmitAndCancelButton
                  isValid={isValid} 
                  isLoading={isLoading}
                  handleCloseModal={handleCloseModal}
                  submitButtonName='Invite'
                />
                <div>
                {
                <div className={`text-error500 flex justify-center items-center text-center relative bottom-2`}>{error}</div>
                 }
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
