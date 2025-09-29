import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { inter } from "@/app/fonts";
import { format, parseISO } from "date-fns";
import DatePickerInput from "@/reuseable/Input/DatePickerInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import loadingLoop from "@iconify/icons-line-md/loading-loop";
import { Icon } from "@iconify/react";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";
import { useEditCohortMutation } from "@/service/admin/cohort_query";
import { useQueryClient } from "@tanstack/react-query";
// import FileUploadTwo from "@/reuseable/Input/FileUploadTwo";
import QuillFieldEditor from "@/reuseable/textArea/Quill-field";
import DatePicker from "@/reuseable/date/DatePicker";

interface cohortDetails {
  id: string;
  programId: string;
  organizationId: string;
  cohortDescription: string;
  name: string;
  activationStatus: string;
  cohortStatus: string;
  tuitionAmount: number;
  totalCohortFee: number;
  imageUrl: string;
  startDate: string;
  expectedEndDate: string;
}

interface idProps {
  cohortId?: string;
  setIsOpen?: (e: boolean | undefined) => void;
  cohortDetail?: cohortDetails;
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

const EditCohortForm = ({ setIsOpen, cohortDetail }: idProps) => {
  const [editCohort, { isLoading }] = useEditCohortMutation();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");

  const initialFormValue = {
    id: cohortDetail?.id,
    name: cohortDetail?.name,
    startDate: cohortDetail?.startDate,
    expectedEndDate: cohortDetail?.expectedEndDate,
    cohortDescription: cohortDetail?.cohortDescription,
    imageUrl: cohortDetail?.imageUrl,
  };
  // const maxChars = 1500;

  const handleCloseModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };
  //
  // const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\-_ ]*$/,
        // "Cohort name can include letters, numbers, hyphens, and underscores"
       "Name can include at least a letter and then numbers, hyphens and underscores.",
      )
      .test(
        "valid-name",
        "Program name can include at least a letter and then numbers, hyphens and underscores.",
        (value = "") => {
        const regex = /^[a-zA-Z0-9\s-_]*$/;
        const onlyNumbersOrSpecials = /^[^a-zA-Z]*$/;
        return regex.test(value) && !onlyNumbersOrSpecials.test(value);
        }
      )
      .required("Cohort name is required")
      .max(200, "Cohort name cannot be more than 200 characters"),
    startDate: Yup.date()
      .required("Start date is required")
      .nullable()
      .test(
        "is-before-end-date",
        "Start date must be before end date",
        function (value) {
          const { expectedEndDate } = this.parent;
          return (
            !expectedEndDate ||
            !value ||
            new Date(value) < new Date(expectedEndDate)
          );
        }
      )
      .test(
        "not-equal-to-endDate",
        "Start date cannot be the same as end date",
        function (value) {
          const { expectedEndDate } = this.parent;
          return (
            !value ||
            !expectedEndDate ||
            new Date(value).getTime() !== new Date(expectedEndDate).getTime()
          );
        }
      ),
    expectedEndDate: Yup.date()
      .required("End date is required")
      .nullable()
      .when("startDate", (startDate, schema) => {
        return startDate
          ? schema
              .min(startDate, "End date must be after start date")
              .test(
                "not-equal-to-startDate",
                "End date cannot be the same as start date",
                function (value) {
                  const { startDate } = this.parent;
                  return !!value && value !== startDate;
                }
              )
          : schema;
      }),
    // .test( 'is-after-start-date', 'End date must be after start date', function (value) { const { startDate } = this.parent; return !startDate || !value || new Date(value) > new Date(startDate); } ) .test( 'not-equal-to-startDate', 'End date cannot be the same as start date', function (value) { const { startDate } = this.parent; return !value || !startDate || new Date(value).getTime() !== new Date(startDate).getTime(); } )
    cohortDescription: Yup.string()
      .trim()
      .required("Cohort Description is required")
      .max(1500, "Cohort description must be 1500 characters or less"),
  });

  const toastPopUp = ToastPopUp({
    description: "Cohorts details successfully updated.",
    status: "success",
  });

  const networkPopUp = ToastPopUp({
    description: "No internet connection",
    status: "error",
  });

  const handleSubmit = async (values: typeof initialFormValue) => {
    // console.log("values: ",values);
    if (!navigator.onLine) {
      networkPopUp.showToast();
      if (setIsOpen) {
        setIsOpen(false);
      }
      return;
    }
    try {
      await editCohort({ data: values }).unwrap();
      queryClient.invalidateQueries({ queryKey: ["cohort"] });
      toastPopUp.showToast();
      if (setIsOpen) {
        setIsOpen(false);
      }
    } catch (err) {
      const error = err as ApiError;
      setError(error?.data?.message);
    }
  };

  return (
    <div id="editCohortForm">
      <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, isValid, touched, setFieldValue }) => (
          <Form className={`${inter.className}`}>
            <div className="grid grid-cols-1 gap-y-4  md:max-h-[55vh] max-h-[55vh] overflow-y-auto"
             style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollbarGutter: "stable both-edge"

          }}
            >
              <div className="">
                <Label htmlFor="cohortName">Cohort name</Label>
                <Field
                  id="editCohortName"
                  name="name"
                  className="w-full p-3 border rounded focus:outline-none mt-2"
                  placeholder="Enter cohort name"

                />

                {errors.name && touched.name && (
                  <ErrorMessage
                    name="name"
                    id="editCohortNameError"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="">

                   <DatePicker
                  date={values.startDate ? parseISO(values.startDate) : undefined}
                  setDate={(date) => {
                    if (date) {
                      setFieldValue("startDate", format(date, "yyyy-MM-dd"));
                    }
                  }}
                  styleLabel="relative top-[2px]"
                  className="h-[3.1rem] mt-1"
                  disabledDate={(date) => {
                    if (!date) return false; 
                    const endDate = values.expectedEndDate ? parseISO(values.expectedEndDate) : null;
                    return endDate ? date.getTime() >= endDate.getTime() : false;
                  }}
                   />
                  {errors.startDate && touched.startDate && (
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      id="editStartDateError"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
                <div className="">
                  <Label htmlFor="endDate">End date</Label>
                  <DatePickerInput
                    selectedDate={parseISO(values.expectedEndDate ?? "")}
                   onDateChange={(date) => {
                                   if (date) {
                                     const formattedDate = format(date, "yyyy-MM-dd");
                                     setFieldValue("startDate", formattedDate); 
                                   } else {
                                     setFieldValue("startDate", ""); 
                                   }
                                 }}
                    className="p-6 mt-2"
                    disabled={true}
                    disabledDate={
                      // (date) => date && date.getTime() < new Date().setHours(0, 0, 0, 0)
                      (date) =>
                        !values.startDate || date <= parseISO(values.startDate)
                    }
                  />
                  {errors.expectedEndDate && touched.expectedEndDate && (
                    <ErrorMessage
                      name="expectedEndDate"
                      component="div"
                      id="editEndDateError"
                      className="text-red-500 text-sm"
                    />
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="cohortDescription">Cohort description</Label>
                <QuillFieldEditor
                  name="cohortDescription"
                  errorMessage="Cohort description must be 2500 characters or less"
                  errors={errors}
                  touched={touched}
                />
                {errors.cohortDescription && touched.cohortDescription && (
                  <ErrorMessage
                    name="cohortDescription"
                    component="div"
                    id="editCohortDescriptionError"
                    className="text-red-500 text-sm"
                  />
                )}
              </div>
              {/*<div>*/}
              {/*  <Label htmlFor="cohortImage">Cohort Image (Optional)</Label>*/}
              {/*  <FileUploadTwo*/}
              {/*    handleDrop={handleDrop}*/}
              {/*    handleDragOver={handleDragOver}*/}
              {/*    setUploadedImageUrl={(url: string | null) =>*/}
              {/*      setFieldValue("imageUrl", url)*/}
              {/*    }*/}
              {/*    initialImageUrl={values.imageUrl}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
            <div className="md:flex gap-4 justify-end mt-2 mb-4 md:mb-0 ">
                <Button
                  variant={"outline"}
                  type="reset"
                  className="w-full md:w-36 h-[57px] mb-4"
                  // onClick={() => handleReset(resetForm)}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  variant={"default"}
                  className={`w-full md:w-36 h-[57px] ${
                    !isValid
                      ? "bg-neutral650 cursor-not-allowed "
                      : "hover:bg-meedlBlue bg-meedlBlue cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoading ? (
                    <div
                      id={"loadingLoopIconDiv"}
                      className="flex items-center justify-center"
                    >
                      <Icon
                        id={"Icon"}
                        icon={loadingLoop}
                        width={34}
                        height={32}
                        style={{
                          animation: "spin 1s linear infinite",
                          strokeWidth: 6,
                          display: "block",
                        }}
                      />
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            {
              <div
                id="editCohortErrorFromBackend"
                className={`text-error500 flex justify-center items-center ${
                  error ? "mb-3" : ""
                }`}
              >
                {error}
              </div>
            }
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCohortForm;


