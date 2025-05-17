import React, { useEffect, useState } from "react";
import Select from "@/reuseable/select/ProgramSelect";
import DatePicker from "@/reuseable/date/DatePicker";
import FormButtons from "@/reuseable/buttons/FormButtons";
import { CohortNameInput } from "@/reuseable/Input";
import { useCreateCohortMutation } from "@/service/admin/cohort_query";
import { useGetAllProgramsQuery } from "@/service/admin/program_query";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import CustomQuillField from "@/reuseable/textArea/Custom-quill-field";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";
import TuitionInput from "@/reuseable/feeBreakdown/Tuition";
import { Label } from "@/components/ui/label";
import SpreadsheetFileUpload from "@/reuseable/Input/RawFile-spreadshitUpload";
import {  useViewAllLoanProductQuery } from "@/service/admin/loan_product";
import { useUploadLoaneeFileMutation } from "@/service/admin/loan_book";

interface createCohortProps {
  setIsOpen?: (e: boolean) => void;
  organizationId?: string
}

interface viewAllProps {
  id?: string;
  name: string;
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}



const AddCohortInAnOrganization: React.FC<createCohortProps> = ({ setIsOpen,organizationId}) => {
  const [startDate, setDate] = useState<Date>();
  const [programId, setProgramId] = useState("");
  const [loanProductId, setLoanProductId] = useState("");
  const [selectCurrency, setSelectCurrency] = useState("NGN");
  const [name, setName] = useState("");
  const [cohortDescription, setDescription] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedLoanProduct, setSelectedLoanProduct] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isLoanProductSelectOpen, setIsLoanProductSelectOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [loanBreakdowns, setLoanBreakdowns] = useState<{ itemName: string; itemAmount: string; currency: string }[]>([ { itemName: "Tuition", itemAmount: "", currency: "NGN" }  ]);
 
  const [fileUpload, setUploadedFile] = useState<File | null>(null);
  const size = 10;
  const [error, setError] = useState("");
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [isLoanProduct, setIsLoanProduct] = useState(false)
  const [isProgram, setIsprogram] = useState(false)
  const [tuitionAmount,setTuition] = useState("")

   
   const [programView, setProgramView] = useState<viewAllProps[]>([]);
   const [programPageNumber, setProgramPageNumber] = useState(0);
   const [hasNextProgramPage, setHasNextProgramPage] = useState(true);
 
  
   const [listOfLoanProduct, setLoanProducts] = useState<viewAllProps[]>([]);
   const [loanProductPageNumber, setLoanProductPageNumber] = useState(0);
   const [hasNextLoanProductPage, setHasNextLoanProductPage] = useState(true);
 


  const { data,isLoading: programIsLoading,isFetching } = useGetAllProgramsQuery(
    { organizationId: organizationId, pageSize: size, pageNumber: programPageNumber },
    { skip: !isProgram }
  );
  const { data:loanProduct, isLoading: loanProductIsloading,isFetching:loanProductIsfetching} = useViewAllLoanProductQuery({ pageSize: size, pageNumber:loanProductPageNumber },{ skip: !isLoanProduct});

  const [createCohort, { isLoading } ] = useCreateCohortMutation();
  const [uploadLoaneeFile, {isLoading: uploadLoaneeIsloading}] = useUploadLoaneeFileMutation();

  useEffect(() => {
    if (data?.data) {
      setProgramView((prev) => {
        if (programPageNumber === 0) {
          return [...data.data.body].sort((a, b) => a.name.localeCompare(b.name));
        }
        const newPrograms = data.data.body.filter(
          (newProgram: viewAllProps) => !prev.some((prevItem) => prevItem.id === newProgram.id)
        );
        return [...prev, ...newPrograms].sort((a, b) => a.name.localeCompare(b.name));
      });
      setHasNextProgramPage(data.data.hasNextPage);
    }
  }, [data, programPageNumber]);

  
  useEffect(() => {
    if (loanProduct?.data) {
      setLoanProducts((prev) => {
        if (loanProductPageNumber === 0) {
          return [...loanProduct.data.body].sort((a, b) => a.name.localeCompare(b.name));
        }
        const newLoanProducts = loanProduct.data.body.filter(
          (newLoanProduct: viewAllProps) => !prev.some((prevItem) => prevItem.id === newLoanProduct.id)
        );
        return [...prev, ...newLoanProducts].sort((a, b) => a.name.localeCompare(b.name));
      });
      setHasNextLoanProductPage(loanProduct.data.hasNextPage);
    }
  }, [loanProduct, loanProductPageNumber]);


  
  const loadMorePrograms = () => {
    if (!isFetching && hasNextProgramPage) {
      setProgramPageNumber((prev) => prev + 1);
    }
  };


  const loadMoreLoanProducts = () => {
    if (!loanProductIsfetching && hasNextLoanProductPage) {
      setLoanProductPageNumber((prev) => prev + 1);
    }
  };

  const { toast } = useToast();

  useEffect(() => {
    if (name && selectedProgram && startDate && !descriptionError && selectedLoanProduct && tuitionAmount && fileUpload ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, selectedProgram, startDate, descriptionError, selectedLoanProduct, tuitionAmount, fileUpload]);


  const resetForm = () => {
    setDate(undefined);
    setName("");
    setDescription("");
    setSelectedProgram("");
    setSelectedLoanProduct("");
    setDescriptionError(null);
    setIsSelectOpen(false);
    // setLoanBreakdowns([{ itemName: "Tuition", itemAmount: "", currency: "NGN" }]);
    setProgramId("");
    setError("");
    setUploadedFile(null)
  };

  const handleCloseModal = () => {
    if (setIsOpen) {
        setIsOpen(false);
    }
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!navigator.onLine) {
      toast({
        description: "No internet connection",
        status: "error",
      });
      return;
    }
    if (!isButtonDisabled && !descriptionError) {
      const loanBreakDownObj = {
        itemName: "food",
        itemAmount: "500000",
        currency: "NGN"
      }
      
      const formDatas = {
        name: name,
        programId: programId,
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        cohortDescription: cohortDescription,
        imageUrl: "",
        loanBreakdowns: [loanBreakDownObj],
        tuitionAmount: tuitionAmount
      };

      if (!fileUpload) {
        toast({
          description: "no file",
          status: "error",
        });
        return;
      }
      try {
      
        const result = await createCohort(formDatas).unwrap();
        const formData = new FormData();
           formData.append("file", fileUpload, fileUpload.name); 
           
        if(result && fileUpload){
          const uploadData = {
            cohortId:result.data?.id,
            loanProductId: loanProductId,
            formData
          }
  
            const uploadFile = await uploadLoaneeFile(uploadData).unwrap()
            if(uploadFile) {
              resetForm();
              handleCloseModal()
              toast({
                description: result.message,
                status: "success",
              });
            }
    
        }
       
      } catch (err) {
        const error = err as ApiError;
        setError(error?.data?.message);
        
      }
    }else { setError("Description must be 2500 characters or less"); }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };



  return (
    <div 
    >

        <form
          id="cohortForm"
          className='grid gap-5 grid-cols-1 gap-y-4 md:max-h-[57vh] max-h-[55vh] overflow-y-auto  pr-2'
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollbarGutter: "stable both-edge"
    
                    }}
          onSubmit={handleSubmit}
        >
         
              <CohortNameInput cohortName={name} setCohortName={setName} />
              <div
                id="programDateContainer"
                className={"md:flex grid gap-5 w-full items-center"}
              >
                <Select
                    selectedProgram={selectedProgram}
                    setSelectedProgram={setSelectedProgram}
                    isSelectOpen={isSelectOpen}
                    setIsSelectOpen={setIsSelectOpen}
                    selectOptions={programView}
                    setId={setProgramId} 
                    label={"Program"} 
                    placeholder={"Select program"}  
                    isLoading={programIsLoading}
                    onOpenChange={(open) => setIsprogram(open)}
                    infinityScroll={{
                      hasMore: hasNextProgramPage,
                      loadMore: loadMorePrograms ,
                      loader: isFetching
                    }}
                       />
                <DatePicker date={startDate} setDate={setDate} />
              </div>
              <div
              id="loanProductAndTuitionContainer"
               className={"md:grid grid-cols-2 gap-x-5"}
              >
                <div>
                <Select
                    selectedProgram={selectedLoanProduct}
                    setSelectedProgram={setSelectedLoanProduct}
                    isSelectOpen={isLoanProductSelectOpen}
                    setIsSelectOpen={setIsLoanProductSelectOpen}
                    selectOptions={listOfLoanProduct}
                    setId={setLoanProductId} 
                    label={"loanProduct"} 
                    placeholder={"Select loan product"}  
                    isLoading={loanProductIsloading}
                    onOpenChange={(open) => setIsLoanProduct(open)}
                    infinityScroll={{
                      hasMore: hasNextLoanProductPage,
                      loadMore:  loadMoreLoanProducts,
                      loader: loanProductIsfetching
                    }}
                       />
                </div>
                 <div>
                 <Label>
                    Tuition
                 </Label>
                <div
                className="flex gap-2 items-center md:relative bottom-[4px] "
                >
                    
                    <CurrencySelectInput
                      selectedcurrency={selectCurrency}
                      setSelectedCurrency={setSelectCurrency}
                      className="h-[3.3rem]"
                    />
                   
                
                 <div className="relative bottom-2">
                 <TuitionInput  tuition={tuitionAmount} setTuition={setTuition}/>
                 </div>
                </div>
                </div>
              </div>
              <div className="md: mt-2 lg:mt-0 lg:relative bottom-3">
                <SpreadsheetFileUpload
                 handleDrop={handleDrop}
                 handleDragOver={handleDragOver}
                 setUploadedFile={setUploadedFile}
                 labelName="Loanees Data"
                />
              </div>
                  <CustomQuillField
                    description={cohortDescription}
                    setDescription={setDescription}
                    maximumDescription={2500}
                    onDescriptionChange={(desc) => {
                      const pTagSpace = 7
                      const maximumDescription = 2500
                      if (desc.length <= maximumDescription +  pTagSpace) {
                        setDescription(desc);
                        setDescriptionError(null);
                      } else {
                        setDescriptionError("Cohort description must be 2500 characters or less");
                      }
                    }} 
                    label={"Description"} 
                    placeholder={"Enter description...."}   
                    setError={(error) => setDescriptionError(error)}
                    name="Cohort description"
                  />

              {descriptionError && ( <div className="text-red-500 text-sm">{descriptionError}</div> )}
        
              <FormButtons
                isButtonDisabled={isButtonDisabled}
                setClearField={resetForm}
                buttonName="Add"
                isSubmitType={true}
                isloading={isLoading || uploadLoaneeIsloading}
              />
           
           
         
        </form>
        <div id="createCohortError"
          className={`text-error500 flex justify-center items-center ${
            error ? "mb-3" : ""
          }`}
        >
          {error}
        </div>
    </div>
  );
};
export default AddCohortInAnOrganization;



// function downloadCSVs() {
//   const csvContent = 
//       "data:text/csv;charset=utf-8," +
//       "FirstName,LastName,Email,PhoneNumber,DON,InitialDeposit,AmountRequested,AmountReceived\n" +
//       "Johns,Doess,johndoee@email.com,1234267890,2025-05-18,90000,10000,19000\n" +
//       "Janesa,Smithss,janesmieth@email.com,0987054321,2025-05-13,4000,17000,15000";

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "data.csv");
//   document.body.appendChild(link);
//   link.click();
// }


// downloadCSVs()