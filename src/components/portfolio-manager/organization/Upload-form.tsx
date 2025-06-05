import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SpreadsheetFileUpload from "@/reuseable/Input/RawFile-spreadshitUpload";
import { inter } from "@/app/fonts";
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';
import DownloadTemplate from "./Download-template";
import { store,useAppSelector } from '@/redux/store';
import { setUserdataFile,setRepaymentFile,resetCsvStatus } from '@/redux/slice/csv/csv';
import { useUploadLoaneeFileMutation } from "@/service/admin/loan_book";

interface FormValues {
  loaneeFile: File | null;
  repaymentFile: File | null;
}

interface Props {
  uploadType?: "loaneeData" | "repaymentData";
  setIsOpen?: (e: boolean) => void;
}

function UploadForm({ setIsOpen, uploadType }: Props) {
  const userData = useAppSelector(store => store?.csv?.userdataFile)
  const repaymentData = useAppSelector(store => store?.csv?.repaymentFile)
  const cohortDetails = useAppSelector((state) => state.cohort?.selectedCohortInOrganization)
  const cohortId = cohortDetails?.id
  const [uploadLoaneeFile, {isLoading: uploadLoaneeIsloading}] = useUploadLoaneeFileMutation();

  const initialFormValue: FormValues = {
    loaneeFile:  userData || null,
    repaymentFile: repaymentData ||  null,
  };

  const validationSchema = Yup.object().shape({
    loaneeFile: Yup.mixed().when('uploadType', {
      is: "loaneeData",
      then: (schema) => schema.required("Loanee file is required"),
      otherwise: (schema) => schema.nullable().notRequired()
    }),
    repaymentFile: Yup.mixed().when('uploadType', {
      is: "repaymentData",
      then: (schema) => schema.required("Repayment file is required"),
      otherwise: (schema) => schema.nullable().notRequired()
    })
  });

  const handleSubmit =  async  (values: FormValues) => {
     
    store.dispatch(resetCsvStatus())
    if (uploadType === "loaneeData") {
      console.log('Loanee file:', values.loaneeFile);
    } else {
      console.log('Repayment file:', values.repaymentFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleCloseModal = () => {
    setIsOpen?.(false);
  };

  return (
    <div>
      <div>
        <DownloadTemplate 
          name={uploadType === "loaneeData" ? "loanee" : "repayment"}
          fileName={uploadType === "loaneeData" ? "UserData_template" : "Repayment_template"}
          fileUrl={uploadType === "loaneeData" ? "/templates/Userdata_template.csv" : "/templates/RepaymentData_template.csv"}
        /> 
      </div>
      <div>
        <Formik
          initialValues={initialFormValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnMount={true}
          context={{ uploadType }} 
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className={inter.className}>
              <div className='mt-5'>
                {uploadType === "loaneeData" ? (
                  <div>
                    <SpreadsheetFileUpload
                      handleDrop={handleDrop}
                      handleDragOver={handleDragOver}
                      setUploadedFile={(file) =>  {setFieldValue("loaneeFile", file); store.dispatch(setUserdataFile(file))}}
                      initialFile={userData}
                    />
                    {errors.loaneeFile && touched.loaneeFile && (
                      <ErrorMessage
                        name="loaneeFile"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <SpreadsheetFileUpload
                      handleDrop={handleDrop}
                      handleDragOver={handleDragOver}
                      setUploadedFile={(file) =>{ setFieldValue("repaymentFile", file); store.dispatch(setRepaymentFile(file));}}
                      initialFile={repaymentData}
                    />
                    {errors.repaymentFile && touched.repaymentFile && (
                      <ErrorMessage
                        name="repaymentFile"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className='relative top-3 mt-4'>
                <SubmitAndCancelButton 
                  isValid={ uploadType === "loaneeData"
                                          ? !!values.loaneeFile
                                          : !!values.repaymentFile}
                  isLoading={false}
                  handleCloseModal={handleCloseModal}
                  submitButtonName='Upload'
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UploadForm;