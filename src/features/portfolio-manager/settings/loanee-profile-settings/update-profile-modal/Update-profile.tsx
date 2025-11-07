import * as Yup from "yup";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Formik, Form, ErrorMessage } from "formik";
import Isloading from "@/reuseable/display/Isloading";
import CustomSelectObj from "@/reuseable/Input/Custom-select-obj";
import NigeriaStatesSelect from "@/reuseable/select/NigeriaStatesSelect";
import { useLoaneeUpdateProfileMutation } from "@/service/users/Loanee_query";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
  refetch: () => void;
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

function UpdateProfile({ setIsOpen, refetch }: Props) {
  const [customEducationOptions, setCustomEducationOptions] = useState<{ value: string; label: string }[]>([]);
  const [loaneeUpdate, { isLoading }] = useLoaneeUpdateProfileMutation();
  const [error, setError] = useState("");
  const { toast } = useToast();

  const closeModal = () => {
    setIsOpen(false);
  };

  const initialFormValue = {
    stateOfResidence: "",
    levelOfEducation: ""
  };

  const handleSubmit = async (values: typeof initialFormValue) => {
    const formData = {
      stateOfResidence: values?.stateOfResidence,
      levelOfEducation: values?.levelOfEducation
    };
    try {
      const result = await loaneeUpdate(formData).unwrap();
      if (result) {
        toast({
          description: result.message,
          status: "success",
          duration: 1500
        });
        refetch();
        closeModal();
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error?.data?.message);
    }
  };

  const validateSchema = Yup.object().shape({
    stateOfResidence: Yup.string().required("State of residence is required"),
    levelOfEducation: Yup.string().required("Level of education is required")
  });

  const educationalQualifications = [
    { value: "O_LEVEL", label: "O'level" },
    { value: "OND", label: "OND" },
    { value: "HND", label: "HND" },
    { value: "BSC", label: "BSC" },
    { value: "MSC", label: "MSC" },
    { value: "PHD", label: "PHD" },
    { value: "DIPLOMA", label: "Diploma" }
  ];

  const allEducationOptions = [
    ...educationalQualifications,
    ...customEducationOptions
  ];

  const handleEducationChange = (
    value: string,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => {
    const isCustomValue = !educationalQualifications.some(
      (qual) => qual.value === value
    );
    const alreadyExists = customEducationOptions.some(
      (opt) => opt.value === value
    );

    if (isCustomValue && !alreadyExists) {
      const newOption = { value, label: value };
      setCustomEducationOptions((prev) => [...prev, newOption]);
    }

    setTimeout(() => {
      setFieldValue("levelOfEducation", value);
    }, 0);
  };

  return (
    <div>
      <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validateSchema}
      >
        {({ errors, touched, values, setFieldValue, isValid }) => (
          <Form>
            <div className='w-full grid grid-cols-1 gap-y-5'>
              <div className='grid grid-cols-1 gap-y-3 w-full'>
                <Label htmlFor='state-residence' className='text-[14px] text-[#212221] font-medium'>
                  State of residence
                </Label>

                <NigeriaStatesSelect
                  triggerId='updateSelectStateTriggerId'
                  id='state-residence'
                  value={values.stateOfResidence}
                  onChange={(value) => {
                    setFieldValue("stateOfResidence", value);
                  }}
                  name='stateOfResidence'
                  placeHolder='Select state of residence'
                  className='h-[3.5rem]'
                />
                {errors.stateOfResidence && touched.stateOfResidence && (
                  <ErrorMessage
                    name='stateOfResidence'
                    component='div'
                    className='text-red-500 text-sm'
                  />
                )}
              </div>

              <div className='grid grid-cols-1 gap-y-3 w-full'>
                <Label htmlFor='education-level' className='text-[14px] text-[#212221] font-medium'>
                  Level of education
                </Label>
                <CustomSelectObj
                  triggerId='selectlevelOfEducationTriggerId'
                  id='education-level'
                  value={values.levelOfEducation}
                  onChange={(value) =>
                    handleEducationChange(value, setFieldValue)
                  }
                  name='levelOfEducation'
                  placeHolder='Select level of education'
                  className='h-[3.5rem]'
                  // showAddField={true}
                  selectContent={allEducationOptions}
                />
              </div>

              <div className='md:flex justify-between item-center mt-4 mb-4'>
                <div>
                  <Button
                    id='cancelButton'
                    type='button'
                    variant='outline'
                    onClick={closeModal}
                    className='w-full md:w-[140px] h-[44px] border-solid border-[#142854] text-[#142854]'
                  >
                    Cancel
                  </Button>
                </div>

                <div className='md:mt-0 mt-3'>
                  <Button
                    id='updateProfile'
                    type='submit'
                    variant='secondary'
                    className={`w-full md:w-[140px] h-[44px] border-solid  text-white  ${
                      !isValid
                        ? "cursor-auto bg-[#D7D7D7] hover:bg-[#D7D7D7]"
                        : "cursor-pointer bg-meedlBlue"
                    }`}
                    disabled={!isValid}
                  >
                    {isLoading ? <Isloading /> : "Update"}
                  </Button>
                </div>
              </div>
              <div
                className={`text-error500 flex justify-center items-center text-center relative bottom-5`}
              >
                {error}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UpdateProfile;
