import React,{useState} from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SpreadsheetFileUpload from "@/reuseable/Input/RawFile-spreadshitUpload";
import { inter } from "@/app/fonts";
import SubmitAndCancelButton from '@/reuseable/buttons/Submit-and-cancelButton';
import DownloadTemplate from "./Download-template";
import { store,useAppSelector } from '@/redux/store';
import { setUserdataFile,setRepaymentFile,resetCsvStatus,resetRepaymentdata } from '@/redux/slice/csv/csv';
import { useUploadLoaneeFileMutation,useUploadRepaymentFileMutation } from "@/service/admin/loan_book";
import { convertSpreadsheetToCsv } from "@/utils/convert-csv";
import { useToast } from "@/hooks/use-toast";

interface FormValues {
  loaneeFile: File | null;
  repaymentFile: File | null;
}

interface Props {
  uploadType?: "loaneeData" | "repaymentData";
  setIsOpen?: (e: boolean) => void;
}

interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

function UploadForm({ setIsOpen, uploadType }: Props) {
  const userData = useAppSelector(store => store?.csv?.userdataFile)
  const repaymentData = useAppSelector(store => store?.csv?.repaymentFile)
  const cohortDetails = useAppSelector((state) => state.cohort?.selectedCohortInOrganization)
  const cohortId = cohortDetails?.id
  const [uploadLoaneeFile, {isLoading: uploadLoaneeIsloading}] = useUploadLoaneeFileMutation();
  const [uploadLRepaymentFile, {isLoading: uploadRepaymentIsloading}] = useUploadRepaymentFileMutation();
  const [error, setError] = useState("");

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
     
   try {

    if (uploadType === "loaneeData"  &&  values.loaneeFile) {
        const csvData = await convertSpreadsheetToCsv(values.loaneeFile);
        const formData = new FormData(); 
        formData.append("file", csvData, csvData.name); 
        const uploadData = {
            cohortId:cohortId,
            formData 
        }
        const uploadUserFile = await uploadLoaneeFile(uploadData).unwrap()
        if(uploadUserFile) {
            handleCloseModal()
            store.dispatch(resetCsvStatus()) 
            toast({
                description: uploadUserFile.message,
                status: "success",
              });
        }
    } 
    else if(uploadType === "repaymentData" &&  values.repaymentFile){
        const csvData = await convertSpreadsheetToCsv(values.repaymentFile);
        const formData = new FormData(); 
        formData.append("file", csvData, csvData.name); 
        const uploadData = {
            cohortId:cohortId,
            formData 
        }
        const uploadFile = await uploadLRepaymentFile(uploadData).unwrap()
        if(uploadFile) {
            handleCloseModal()
            store.dispatch(resetRepaymentdata())
            toast({
              description: uploadFile.message,
              status: "success",
            });
        }
    }
     
   } catch (err) {
    const error = err as ApiError;
    setError(error?.data?.message);
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

  const { toast } = useToast();

  return (
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
                <div 
                  className='grid grid-cols-1 gap-y-4 md:max-h-[40.5vh] overflow-y-auto'
                  style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',

                  }}
                >
        <div className='mb-5'>
        <DownloadTemplate 
          name={uploadType === "loaneeData" ? "loanee" : "repayment"}
          fileName={uploadType === "loaneeData" ? "UserData_template" : "Repayment_template"}
          fileUrl={uploadType === "loaneeData" ? "/templates/Userdata_template.csv" : "/templates/RepaymentData_template.csv"}
        /> 
            </div>
              <div 
               style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',

            }}
              >
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
              </div>
              <div className='relative top-3 mt-4'>
                <SubmitAndCancelButton 
                  isValid={ uploadType === "loaneeData"
                                          ? !!values.loaneeFile
                                          : !!values.repaymentFile}
                  isLoading={uploadType === "loaneeData"? uploadLoaneeIsloading : uploadRepaymentIsloading}
                  handleCloseModal={handleCloseModal}
                  submitButtonName='Upload'
                />
              </div>
              <div id="createCohortError"
          className={`text-error500 flex justify-center items-center ${
            error ? "mb-3 mt-2" : ""
          }`}
        >
          {error}
        </div>
            </Form>
          )}
        </Formik>
      
    </div>
  );
}

export default UploadForm;