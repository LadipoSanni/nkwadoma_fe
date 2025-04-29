import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Label } from "@/components/ui/label";
import { inter } from "@/app/fonts";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import Isloading from "@/reuseable/display/Isloading";
import { useCreateInvestmentVehicleMutation } from "@/service/admin/fund_query";
import { useToast } from "@/hooks/use-toast";
import { validateNumber, validatePositiveNumberWithIndexNumbers } from "@/utils/Format";
import { validateText, validateNumberLimit } from "@/utils/Format";
import CustomInputField from "@/reuseable/Input/CustomNumberFormat";
import FormikCustomQuillField from "@/reuseable/textArea/FormikCustomQuillField";
import ChooseVisibility from "./investmentVehicle-multistep/Choose-visibility";


interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

const initialFormValue = {
  name: "",
  sponsors: "",
  fundManager: "",
  minimumInvestmentAmount: "",
  mandate: "",
  tenure: "",
  size: "",
  rate: "",
  bankPartner: "",
  trustee: "",
  custodian: "",
  investmentVehicleType: "",
};

interface props {
  setIsOpen?: (e: boolean) => void;
  type?: string;
  investmentVehicleType?: string;
}
function CreateInvestmentVehicle({
  setIsOpen,
  type,
  investmentVehicleType,
}: props) {
  const [selectCurrency, setSelectCurrency] = useState("NGN");
  const [isError, setError] = useState("");
  const [vehicleTypeStatus, setVehicleTypeStatus] = useState('');
  const [createInvestmentVehicle, { isLoading }] = useCreateInvestmentVehicleMutation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const handleContinue = () => {
    setStep(2); 
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(
        // /^[a-zA-Z0-9\-_' ]*$/,
        // "name can include letters,numbers, hyphens,apostrophe and underscores only."
        /^[a-zA-Z][a-zA-Z0-9\-' ]*$/,
        "Name can include letters, numbers, hyphens and apostrophes only, and must start with a letter."
      )
      .test(
        "valid-name",
        "Name cannot be only numbers or special characters.",
        (value = "") => {
          const trimmedValue = value.trim();
          if (trimmedValue === "") {
            return true;
          }
          const hasLetter = /[a-zA-Z]/.test(value);
          const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
          return hasLetter && !isOnlyNumbersOrSpecials;
        }
      )
      .max(200, "Name cannot be more than 200 characters.")
      .required("Name is required"),
    sponsors: Yup.string()
      .trim()
      .required("vehicle sponsor is required")
      .max(100, "Program name cannot be more than 100 characters.")
      .matches(
        // /^[a-zA-Z\-_ ]*$/,
        // " sponsors can include letters, hyphens, and underscores only."
        /^[a-zA-Z][a-zA-Z\-' ]*$/,
        // "Sponsors can include letters, - and ' only and cannot start with -,' ."
        "Invalid sponsor name"
      )
      //  .matches(/^[a-zA-Z\s]+$/, 'Vehicle sponsor can only contain letters and spaces.')
      .test(
        "valid-sponsor",
        "Sponsor cannot be only numbers or special characters.",
        (value = "") => {
          const trimmedValue = value.trim();
          if (trimmedValue === "") {
            return true;
          }
          const hasLetter = /[a-zA-Z]/.test(value);
          const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
          return hasLetter && !isOnlyNumbersOrSpecials;
        }
      ),
    fundManager: Yup.string()
      .trim()

      .matches(
        // /^[a-zA-Z\-_ ]*$/,
        // "Fund manager can include letters, hyphens, and underscores only."

        /^[a-zA-Z][a-zA-Z\-' ]*$/,
        // "Fund can include letters, - and ' only and cannot start with - and ' ."
        "Invalid fund manager name"
      )

      .max(100, "Fund manager cannot be more than 100 characters.")
      .test(
        "valid-fundManager",
        "fund manager cannot be only numbers or special characters.",
        (value = "") => {
          const trimmedValue = value.trim();
          if (trimmedValue === "") {
            return true;
          }
          const hasLetter = /[a-zA-Z]/.test(value);
          const isOnlyNumbersOrSpecials = /^[^a-zA-Z]+$/.test(trimmedValue);
          return hasLetter && !isOnlyNumbersOrSpecials;
        }
      )
      .required("Fund manager is required"),
    size: Yup.string().required("Vehicle size is required"),
    //  .matches(/^[1-9]\d*$/, 'Vehicle size must be a positive number and cannot start with zero'),
    minimumInvestmentAmount: Yup.string()
      .required("Minimum investment amount is required")
      .test(
        "minimum-less-or-equal-to-size",
        "Minimum Investment Amount must be less than or equal to Vehicle Size.",
        function (value) {
          const { size } = this.parent;
          return !value || !size || parseFloat(value) <= parseFloat(size);
        }
      ),
    //  .matches(/^[1-9]\d*$/, 'minimum investmentAmount must be a positive number and cannot start with zero'),
    tenure: Yup.string()
      .trim()
      .required("Tenor size is required")
      .matches(
        /^[1-9]\d{0,2}$/,
        "Tenor must be a three-digit positive number and cannot start with zero."
      ),
    rate: Yup.number()
      .min(0, "Rate must be at least 1.")
      .max(100, "Rate must be at most 100.")
      .required("Rate is required"),
    mandate: Yup.string()
      .trim()
      .max(2500, "Mandate must be 2500 characters or less")
      .required("mandate is required")
      .test("not-empty", "Mandate is required.", (value = "") => {
        const sanitizedValue = value.replace(/<\/?[^>]+(>|$)/g, "").trim();
        return sanitizedValue !== "";
      }),
    bankPartner: Yup.string().trim().required("Bank partner is required"),
    trustee: Yup.string()
    .trim()
    .max(100, "Trustee cannot be more than 100 characters.")
    .matches(
      /^[a-zA-Z][a-zA-Z\-' ]*$/,
      // "Trustee can include letters, - and ' only and cannot start with - and ' ."
      "Invalid trustee name"
    )
    .required("Trustee is required"),
    custodian: Yup.string()
    .trim()
    .required("Custodian is required")
    .max(100, "Custodian cannot be more than 100 characters.")
    .matches(
      /^[a-zA-Z][a-zA-Z\-' ]*$/,
      // "Custodian can include letters, - and ' only and cannot start with - and ' ."
      "Invalid custodian name"
    ),
  });

  const draftValidationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("Name is required"), 
  });

  const handleDraft = async (values: typeof initialFormValue) => {
    setVehicleTypeStatus("DRAFT")
    const formData = {
      name: values.name,
      sponsors: values.sponsors,
      fundManager: values.fundManager,
      minimumInvestmentAmount: values.minimumInvestmentAmount,
      mandate: values.mandate,
      tenure: values.tenure || "1",
      size: values.size,
      rate: values.rate,
      bankPartner: values.bankPartner,
      trustee: values.trustee,
      custodian: values.custodian,
      investmentVehicleType: investmentVehicleType,
      investmentVehicleStatus : "DRAFT"
    };
    try {
      const create = await createInvestmentVehicle(formData).unwrap();
      // setIsChecked(true)
      if (create) {
        toast({
          description: "Successfully added to draft",
          status: "success",
        });
        handleCloseModal();
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error?.data?.message);
    }
  };

  const handleSaveDraft = async (
    values: typeof initialFormValue,
    setFieldError: (field: string, message: string) => void
  ) => {
    try {
      await draftValidationSchema.validate(values, { abortEarly: false });
  
      await handleDraft(values);
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const errors = validationErrors.inner.reduce((acc, err) => {
          acc[err.path || ""] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setFieldError("name", errors.name); 
        if(errors.name){
          toast({
            description:  errors.name,
            status: "error",
          });
        }
        
      }
    }
  };

  
 
  
   
  const handleSubmit = async (values: typeof initialFormValue) => {
    setVehicleTypeStatus("PUBLISH")
    const formData = {
      name: values.name,
      sponsors: values.sponsors,
      fundManager: values.fundManager,
      minimumInvestmentAmount: values.minimumInvestmentAmount,
      mandate: values.mandate,
      tenure: values.tenure || "1",
      size: values.size,
      rate: values.rate,
      bankPartner: values.bankPartner,
      trustee: values.trustee,
      custodian: values.custodian,
      investmentVehicleType: investmentVehicleType,
      
    };
    try {
      const create = await createInvestmentVehicle(formData).unwrap();
      if (create) {
        toast({
          description: create.message,
          status: "success",
        });
        // handleCloseModal();
        handleContinue()
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error?.data?.message);
    }
  };

  

  return (
    <div id="createInvestmentVehicleId">
      { step === 1?
      <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
      >
        {({
          errors,
          isValid,
          touched,
          setFieldValue,
          setFieldError,
           values
        }) => (
          <Form className={`${inter.className}`}>
            <div
              className=""
            >
              <div className="grid grid-cols-1 gap-y-4 lg:max-h-[56.5vh] md:max-h-[50vh] overflow-y-auto"
                 style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
              <div>
                <Label htmlFor="name">Name</Label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  onChange={validateText("name", setFieldValue)}
                />
                {errors.name && touched.name && (
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label htmlFor="sponsors">Vehicle {type}</Label>
                  <Field
                    id="sponsors"
                    name="sponsors"
                    placeholder="Enter vehicle sponsor"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("sponsor", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    onChange={validateText("sponsors", setFieldValue)}
                  />
                  {errors.sponsors && touched.sponsors && (
                    <ErrorMessage
                      name="sponsors"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="fundManager">Fund manager</Label>
                  <Field
                    id="fundManager"
                    name="fundManager"
                    placeholder="Enter fund manager"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("fundManager", e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                    onChange={validateText("fundManager", setFieldValue)}
                  />
                  {errors.fundManager && touched.fundManager && (
                    <ErrorMessage
                      name="fundManager"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 w-full">
                <div>
                  <Label htmlFor="size">Vehicle size</Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <Field
                      id="size"
                      name="size"
                      type="text"
                      component={CustomInputField}
                      //  className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2 "
                      onChange={validateNumber("size", setFieldValue)}
                    />
                  </div>
                  <div className="relative bottom-5">
                    {errors.size && touched.size && (
                      <ErrorMessage
                        name="size"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor=" minimumInvestmentAmount"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "inline-block",
                      maxWidth: "100%",
                    }}
                  >
                    Minimum investment amount
                  </Label>
                  <div className="flex gap-2 items-center justify-center">
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                    />
                    <Field
                      id="minimumInvestemntAmount"
                      name="minimumInvestmentAmount"
                      // className="w-full p-3  h-[3.2rem]  border rounded focus:outline-none mb-2"
                      component={CustomInputField}
                      onChange={validateNumber(
                        "minimumInvestmentAmount",
                        setFieldValue
                      )}
                    />
                  </div>
                  <div className="relative bottom-5">
                    {errors.minimumInvestmentAmount &&
                      touched.minimumInvestmentAmount && (
                        <ErrorMessage
                          name="minimumInvestmentAmount"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      )}
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 w-full relative bottom-4">
                <div>
                  <Label htmlFor="rate">Interest rate (%)</Label>
                  <Field
                    id="rate"
                    name="rate"
                    placeholder="0"
                    type="text"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                    onChange={investmentVehicleType === 'ENDOWMENT'?  validatePositiveNumberWithIndexNumbers(
                      "rate",
                      setFieldValue,
                      100,
                      0
                    ) : validatePositiveNumberWithIndexNumbers(
                      "rate",
                      setFieldValue,
                      100,
                      1
                    )}
                  />
                  {errors.rate && touched.rate && (
                    <ErrorMessage
                      name="rate"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="tenure">Tenor (months)</Label>
                  <Field
                    id="tenure"
                    name="tenure"
                    placeholder="0"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                    onChange={validateNumberLimit(
                      "tenure",
                      setFieldValue,
                      setFieldError,
                      3,
                      "Tenure must be a positive number, must not start with zero, and must be a maximum of three digits."
                    )}
                  />
                  {errors.tenure && touched.tenure && (
                    <ErrorMessage
                      name="tenure"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
              </div>
              <div className="relative bottom-3">
                <Label htmlFor="name">Bank partner</Label>
                <Field
                  id="bankPartner"
                  name="bankPartner"
                  placeholder="Enter bank partner"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue(
                      "bankPartner",
                      e.target.value.replace(/[^a-zA-Z\s]/g, "")
                    )
                  }
                />
                {errors.bankPartner && touched.bankPartner && (
                  <ErrorMessage
                    name="bankPartner"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4 w-full relative bottom-3">
                <div>
                  <Label htmlFor="trustee">Trustee</Label>
                  <Field
                    id="trustee"
                    name="trustee"
                    placeholder="Enter trustee"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   setFieldValue(
                    //     "trustee",
                    //     e.target.value.replace(/[^a-zA-Z\s]/g, "")
                    //   )
                    // }
                  />
                  {errors.trustee && touched.trustee && (
                    <ErrorMessage
                      name="trustee"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="custodian">Custodian</Label>
                  <Field
                    id="custodian"
                    name="custodian"
                    placeholder="Enter custodian"
                    className="w-full p-3 border rounded focus:outline-none mt-2"
                  />
                  {errors.custodian && touched.custodian && (
                    <ErrorMessage
                      name="custodian"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
              </div>
              <div className="relative bottom-3">
                <Label htmlFor="mandate">Vehicle mandate</Label>
                <Field
                  name="mandate"
                  component={FormikCustomQuillField}
                  maximumDescription={2500}
                  // label={"Mandate"}
                  placeholder={"Enter mandate..."}
                />
                {errors.mandate && touched.mandate && (
               <div>
               
                <ErrorMessage
                    name="mandate"
                    component="div"
                    id="editCohortDescriptionError"
                    className="text-red-500 text-sm"
                  />
               </div>  
                )}
              </div>
              </div>
                    <div className= "md:flex gap-4 justify-end mt-2 mb-4 md:mb-0">
                        <Button
                            variant={"outline"}
                             type="button"
                           className='w-full lg:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
                            // onClick={() => handleReset(resetForm)}
                            onClick={()=> handleSaveDraft(values,setFieldError)}
                        >
                          {
                            vehicleTypeStatus === "DRAFT" && isLoading?  <Isloading /> : "Save to draft"
                          }
                            
                        </Button>
                        <Button
                            variant={"default"}
                            className={` w-full lg:w-36 h-[57px] ${
                                !isValid
                                    ? "bg-neutral650 cursor-auto hover:bg-neutral650 "
                                    : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                            }`}
                            type="submit"
                            disabled={!isValid}
                        >
                            {vehicleTypeStatus === "PUBLISH" && isLoading ? <Isloading /> : "Publish"}
                        </Button>

                    </div>

            </div>
            <p
              className={`text-error500 flex justify-center items-center ${
                isError ? "mb-3" : ""
              }`}
            >
              {isError}
            </p>
          </Form>
        )}
      </Formik> 
      : 
      <div>
        <ChooseVisibility/>
      </div>
      }
    </div>
  );
}

export default CreateInvestmentVehicle;

