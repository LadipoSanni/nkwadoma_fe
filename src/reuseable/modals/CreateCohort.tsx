import React, { useEffect, useState } from "react";
import { cabinetGrotesk, inter } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdClose } from "react-icons/md";
import ProgramSelect from "@/reuseable/select/ProgramSelect";
import DatePicker from "@/reuseable/date/DatePicker";
import DescriptionTextarea from "@/reuseable/textArea/DescriptionTextarea";
import FormButtons from "@/reuseable/buttons/FormButtons";
import {
  FeeBreakdownHeader,
  // InitialItem,
  AddItemSection,
  ItemList
} from "@/reuseable/feeBreakdown";
import { CohortNameInput, FileUpload } from "@/reuseable/Input";
import { useCreateCohortMutation } from "@/service/admin/cohort_query";
import { useGetAllProgramsQuery } from "@/service/admin/program_query";
import { DialogDescription } from "@radix-ui/react-dialog";
import Isloading from "../display/Isloading";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import TotalInput from "@/reuseable/display/TotalInput";

interface createCohortProps {
  triggerButtonStyle: string;
}

interface viewAllProgramProps {
  id?: string;
  name: string;
}

interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

const CreateCohort: React.FC<createCohortProps> = ({ triggerButtonStyle }) => {
  const [startDate, setDate] = useState<Date>();
  const [programId, setProgramId] = useState("");
  const [name, setName] = useState("");
  const [cohortDescription, setDescription] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [loanBreakdowns, setLoanBreakdowns] = useState<
  //   { itemName: string; itemAmount: string; currency: string }[]
  // >([]);
  const [loanBreakdowns, setLoanBreakdowns] = useState<{ itemName: string; itemAmount: string; currency: string }[]>([ { itemName: "Tuition", itemAmount: "", currency: "NGN" }  ]);
  const [programView, setProgramView] = useState<viewAllProgramProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setUploadedUrl] = useState<string | null>(null);
  const [page] = useState(0);
  const size = 200;
  const [error, setError] = useState("");
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [isItemListValid, setIsItemListValid] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [initialItemAmount, setInitialItemAmount] = useState("");

  const { data } = useGetAllProgramsQuery(
    { pageSize: size, pageNumber: page },
    { refetchOnMountOrArgChange: true }
  );
  const [createCohort, { isLoading }] = useCreateCohortMutation();

  useEffect(() => {
    if (data && data?.data) {
      const programs = data?.data?.body;
      setProgramView(programs);
    }
  }, [data]);

  const { toast } = useToast();

  useEffect(() => {
    if (name && selectedProgram && startDate && !descriptionError) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, selectedProgram, startDate, descriptionError]);

  const areLoanBreakdownsValid = () => {
    return loanBreakdowns.every(item => item.itemName && item.itemAmount);
  };

  useEffect(() => {
    if(areLoanBreakdownsValid() && loanBreakdowns.length > 1 ) {
      setCreateButtonDisabled(false);
    }else {
      setCreateButtonDisabled(true);
    }
  },[areLoanBreakdownsValid, loanBreakdowns])

  useEffect(() => {
    const total = loanBreakdowns.reduce((sum, item) => sum + parseFloat(item.itemAmount || '0'), 0) + parseFloat(initialItemAmount || '0');
    setTotalAmount(total);
  }, [loanBreakdowns, initialItemAmount]);

  const resetForm = () => {
    setDate(undefined);
    setName("");
    setDescription("");
    setSelectedProgram(null);
    setDescriptionError(null);
    setIsSelectOpen(false);
    setIsButtonDisabled(true);
    setCreateButtonDisabled(true);
    setIsFormSubmitted(false);
    // setLoanBreakdowns([]);
    setLoanBreakdowns([{ itemName: "Tuition", itemAmount: "", currency: "NGN" }]);
    setProgramId("");
    setError("");
    setUploadedUrl(null);
    setInitialItemAmount("0.00");
  };

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
      const tuitionItem = loanBreakdowns.find(item => item.itemName === "Tuition");
      const tuitionAmount = tuitionItem? tuitionItem.itemAmount : "" ;
      const filteredLoanBreakdowns = loanBreakdowns.filter(item => item.itemName !== "Tuition");

      const formData = {
        name: name,
        programId: programId,
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        cohortDescription: cohortDescription,
        imageUrl: imageUrl,
        loanBreakdowns: filteredLoanBreakdowns,
        tuitionAmount: tuitionAmount
      };
      try {
        const result = await createCohort(formData).unwrap();
        setIsFormSubmitted(true);
        setIsModalOpen(false);
        resetForm();
        toast({
          description: result.message,
          status: "success",
        });
       
      } catch (err) {
        const error = err as ApiError;
        setError(error?.data?.message);
        
      }
    }else { setError("Description must be 2500 characters or less"); }
  };

  const handleReset = () => {
    setIsFormSubmitted(false);
    setDate(undefined);
    setName("");
    setDescription("");
    setSelectedProgram(null);
    setDescriptionError(null);
    setIsSelectOpen(false);
    setIsButtonDisabled(true);
    setCreateButtonDisabled(true);
    // setLoanBreakdowns([]);
     setLoanBreakdowns([{ itemName: "Tuition", itemAmount: "", currency: "NGN" }]);
    setProgramId("");
    setError("");
    setUploadedUrl(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleSelectClick = () => {
    // setLoanBreakdowns([
    //   ...loanBreakdowns,
    //   { itemName: "", itemAmount: "", currency: "NGN" },
    // ]);
    setLoanBreakdowns([ loanBreakdowns[0],
       ...loanBreakdowns.slice(1), 
       { itemName: "", itemAmount: "", currency: "NGN" }  ]);
  };

  const handleDeleteItem = (index: number) => {
    setLoanBreakdowns(loanBreakdowns.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
      <DialogTrigger asChild>
        <Button
          id="createCohortButton"
          size={"lg"}
          className={`${triggerButtonStyle} ${inter.className} h-12 shadow-none bg-meedlBlue hover:bg-meedlBlue cursor-pointer text-meedlWhite md:mt-0 mt-3 text-sm font-semibold leading-5`}
        >
          Create cohort
        </Button>
      </DialogTrigger>
      <DialogContent
        id="createCohortDialogContent"
        className="max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-8 py-5 pl-5 pr-2"
      >
        <DialogHeader id="createCohortDialogHeader">
          <DialogTitle
            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}
          >
            Create cohort
          </DialogTitle>
          <DialogClose asChild>
            <button
              id="createCohortDialogCloseButton"
              className="absolute right-5"
              onClick={handleReset}
            >
              <MdClose
                id={"createCohortCloseIcon"}
                className="h-6 w-6 text-neutral950"
              />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="hidden">
          <DialogDescription></DialogDescription>
        </div>

        <form
          id="cohortForm"
          className={`grid gap-5 ${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`}
          style={{ scrollbarGutter: "stable both-edge" }}
          onSubmit={handleSubmit}
        >
          {!isFormSubmitted ? (
            <>
              <CohortNameInput cohortName={name} setCohortName={setName} />
              <div
                id="programDateContainer"
                className={"md:flex grid gap-5 w-full items-center"}
              >
                <ProgramSelect
                    selectedProgram={selectedProgram}
                    setSelectedProgram={setSelectedProgram}
                    isSelectOpen={isSelectOpen}
                    setIsSelectOpen={setIsSelectOpen}
                    selectOptions={programView}
                    setId={setProgramId} label={"Program"} placeholder={"Select program"}                />
                <DatePicker date={startDate} setDate={setDate} />
              </div>
              <DescriptionTextarea
                  description={cohortDescription}
                  setDescription={setDescription}
                  // maximumDescription={2500}
                  onDescriptionChange={(desc) => {
                    if (desc.length <= 2500) {
                      setDescription(desc);
                      setDescriptionError(null);
                    } else {
                      setDescriptionError("Description must be 2500 characters or less");
                    }
                  }} label={"Description"} placeholder={"Enter description"}              />
              {descriptionError && ( <div className="text-red-500 text-sm">{descriptionError}</div> )}
              <FileUpload
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                setUploadedImageUrl={setUploadedUrl}
                labelName="Cohort image (optional)"
              />
              <FormButtons
                isButtonDisabled={isButtonDisabled}
                setIsFormSubmitted={setIsFormSubmitted}
                setClearField={resetForm}
              />
            </>
          ) : (
            <main id="feeBreakdownContainer" className={"grid gap-5"}>
              <FeeBreakdownHeader />
              {/* <InitialItem 
              itemAmount={itemAmount}
              setItemAmount={handleItemAmountChange}
              itemAmountError={itemAmountError}
              itemName="Tuition"
              currency="NGN"
              /> */}
              <ItemList
                items={loanBreakdowns}
                setItems={setLoanBreakdowns}
                handleDeleteItem={handleDeleteItem}
                setIsItemListValid={setIsItemListValid}
                setTotalAmount={setTotalAmount}
              />
              <div
                id={"Step2stickyContainer"}
                className={"sticky bottom-0 bg-meedlWhite"}
              >
                <AddItemSection handleSelectClick={handleSelectClick} />
                <TotalInput total={totalAmount.toString()} componentId={"createCohort"} prefix={"₦"} />
                <section
                  id="Step2formButtonsContainer"
                  className={
                    "md:flex grid gap-5 mt-3 md:justify-end md:items-end bg-meedlWhite"
                  }
                >
                  <Button
                    id="CancelCohortButton"
                    variant={"outline"}
                    className={`text-meedlBlue font-bold border-solid border-meedlBlue w-full md:w-[8.75rem] h-[3.5625rem]`}
                    onClick={() => setIsFormSubmitted(false)}
                  >
                    Back
                  </Button>
                
                    <Button
                      id="CreateCohortButton"
                      className={`text-meedlWhite font-bold ${
                        createButtonDisabled || !isItemListValid
                          ? "bg-neutral650 hover:bg-neutral650"
                          : "bg-meedlBlue hover:bg-meedlBlue"
                      } w-full md:w-[8.75rem] h-[3.5625rem]`}
                       disabled={createButtonDisabled || !isItemListValid}
                      type="submit"
                    >
                     {isLoading ? (
                    <Isloading />
                  ) : (
                      "Create cohort"
                  )}
                    </Button>
                 
                </section>
              </div>
            </main>
          )}
        </form>
        <div id="createCohortError"
          className={`text-error500 flex justify-center items-center ${
            error ? "mb-3" : ""
          }`}
        >
          {error}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CreateCohort;


// import React, { useEffect, useState } from "react";
// import { cabinetGrotesk, inter } from "@/app/fonts";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { MdClose } from "react-icons/md";
// import ProgramSelect from "@/reuseable/select/ProgramSelect";
// import DatePicker from "@/reuseable/date/DatePicker";
// import DescriptionTextarea from "@/reuseable/textArea/DescriptionTextarea";
// import FormButtons from "@/reuseable/buttons/FormButtons";
// import {
//   FeeBreakdownHeader,
//   InitialItem,
//   AddItemSection,
//   ItemList
// } from "@/reuseable/feeBreakdown";
// import { CohortNameInput, FileUpload } from "@/reuseable/Input";
// import { useCreateCohortMutation } from "@/service/admin/cohort_query";
// import { useGetAllProgramsQuery } from "@/service/admin/program_query";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import Isloading from "../display/Isloading";
// import { format } from "date-fns";
// import { useToast } from "@/hooks/use-toast";
// import TotalInput from "@/reuseable/display/TotalInput";

// interface createCohortProps {
//   triggerButtonStyle: string;
// }

// interface viewAllProgramProps {
//   id?: string;
//   name: string;
// }

// interface ApiError {
//   status: number;
//   data: {
//     message: string;
//   };
// }

// const CreateCohort: React.FC<createCohortProps> = ({ triggerButtonStyle }) => {
//   const [startDate, setDate] = useState<Date>();
//   const [programId, setProgramId] = useState("");
//   const [name, setName] = useState("");
//   const [cohortDescription, setDescription] = useState("");
//   const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
//   const [isSelectOpen, setIsSelectOpen] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   // const [loanBreakdowns, setLoanBreakdowns] = useState<
//   //   { itemName: string; itemAmount: string; currency: string }[]
//   // >([]);
//   const [loanBreakdowns, setLoanBreakdowns] = useState<{ itemName: string; itemAmount: string; currency: string }[]>([ { itemName: "Tuition", itemAmount: "", currency: "NGN" }  ]);
//   const [programView, setProgramView] = useState<viewAllProgramProps[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imageUrl, setUploadedUrl] = useState<string | null>(null);
//   const [page] = useState(0);
//   const size = 200;
//   const [error, setError] = useState("");
//   const [descriptionError, setDescriptionError] = useState<string | null>(null);
//   const [isItemListValid, setIsItemListValid] = useState(true);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [initialItemAmount, setInitialItemAmount] = useState("");
//   const [tuition, setTuitionAmount] = useState<string>('');
//   const [itemAmountError, setItemAmountError] = useState<string | null>(null);

//   const handleItemAmountChange = (value: string) => { 
//     setTuitionAmount(value); 
//     if (value.trim() === '') { 
//       setItemAmountError('Item amount is required'); 
//     } else { setTuitionAmount(""); } };

//   const { data } = useGetAllProgramsQuery(
//     { pageSize: size, pageNumber: page },
//     { refetchOnMountOrArgChange: true }
//   );
//   const [createCohort, { isLoading }] = useCreateCohortMutation();

//   useEffect(() => {
//     if (data && data?.data) {
//       const programs = data?.data?.body;
//       setProgramView(programs);
//     }
//   }, [data]);

//   const { toast } = useToast();

//   useEffect(() => {
//     if (name && selectedProgram && startDate && !descriptionError) {
//       setIsButtonDisabled(false);
//     } else {
//       setIsButtonDisabled(true);
//     }
//   }, [name, selectedProgram, startDate, descriptionError]);

//   const areLoanBreakdownsValid = () => {
//     return loanBreakdowns.every(item => item.itemName && item.itemAmount);
//   };

//   useEffect(() => {
//     if(areLoanBreakdownsValid() && loanBreakdowns.length > 0 ) {
//       setCreateButtonDisabled(false);
//     }else {
//       setCreateButtonDisabled(true);
//     }
//   },[areLoanBreakdownsValid, loanBreakdowns])

//   useEffect(() => {
//     const total = loanBreakdowns.reduce((sum, item) => sum + parseFloat(item.itemAmount || '0'), 0) + parseFloat(initialItemAmount || '0');
//     setTotalAmount(total);
//   }, [loanBreakdowns, initialItemAmount]);

//   const resetForm = () => {
//     setDate(undefined);
//     setName("");
//     setDescription("");
//     setSelectedProgram(null);
//     setDescriptionError(null);
//     setIsSelectOpen(false);
//     setIsButtonDisabled(true);
//     setCreateButtonDisabled(true);
//     setIsFormSubmitted(false);
//     // setLoanBreakdowns([]);
//     setLoanBreakdowns([{ itemName: "Tuition", itemAmount: "", currency: "NGN" }]);
//     setProgramId("");
//     setError("");
//     setUploadedUrl(null);
//     setInitialItemAmount("0.00");
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!navigator.onLine) {
//       toast({
//         description: "No internet connection",
//         status: "error",
//       });
//       return;
//     }
//     if (!isButtonDisabled && !descriptionError) {
//       const formData = {
//         name: name,
//         programId: programId,
//         startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
//         cohortDescription: cohortDescription,
//         imageUrl: imageUrl,
//         loanBreakdowns: loanBreakdowns,
//       };
//       try {
//         const result = await createCohort(formData).unwrap();
//         setIsFormSubmitted(true);
//         setIsModalOpen(false);
//         resetForm();
//         toast({
//           description: result.message,
//           status: "success",
//         });
       
//       } catch (err) {
//         const error = err as ApiError;
//         setError(error?.data?.message);
        
//       }
//     }else { setError("Description must be 2500 characters or less"); }
//   };

//   const handleReset = () => {
//     setIsFormSubmitted(false);
//     setDate(undefined);
//     setName("");
//     setDescription("");
//     setSelectedProgram(null);
//     setDescriptionError(null);
//     setIsSelectOpen(false);
//     setIsButtonDisabled(true);
//     setCreateButtonDisabled(true);
//     setLoanBreakdowns([]);
//     setProgramId("");
//     setError("");
//     setUploadedUrl(null);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//   };

//   const handleSelectClick = () => {
//     // setLoanBreakdowns([
//     //   ...loanBreakdowns,
//     //   { itemName: "", itemAmount: "", currency: "NGN" },
//     // ]);
//     setLoanBreakdowns([ loanBreakdowns[0],
//        ...loanBreakdowns.slice(1), 
//        { itemName: "", itemAmount: "", currency: "NGN" }  ]);
//   };

//   const handleDeleteItem = (index: number) => {
//     setLoanBreakdowns(loanBreakdowns.filter((_, i) => i !== index));
//   };

//   return (
//     <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
//       <DialogTrigger asChild>
//         <Button
//           id="createCohortButton"
//           size={"lg"}
//           className={`${triggerButtonStyle} ${inter.className} h-12 shadow-none bg-meedlBlue hover:bg-meedlBlue cursor-pointer text-meedlWhite md:mt-0 mt-3 text-sm font-semibold leading-5`}
//         >
//           Create cohort
//         </Button>
//       </DialogTrigger>
//       <DialogContent
//         id="createCohortDialogContent"
//         className="max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-8 py-5 pl-5 pr-2"
//       >
//         <DialogHeader id="createCohortDialogHeader">
//           <DialogTitle
//             className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}
//           >
//             Create cohort
//           </DialogTitle>
//           <DialogClose asChild>
//             <button
//               id="createCohortDialogCloseButton"
//               className="absolute right-5"
//               onClick={handleReset}
//             >
//               <MdClose
//                 id={"createCohortCloseIcon"}
//                 className="h-6 w-6 text-neutral950"
//               />
//             </button>
//           </DialogClose>
//         </DialogHeader>
//         <div className="hidden">
//           <DialogDescription></DialogDescription>
//         </div>

//         <form
//           id="cohortForm"
//           className={`grid gap-5 ${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`}
//           style={{ scrollbarGutter: "stable both-edge" }}
//           onSubmit={handleSubmit}
//         >
//           {!isFormSubmitted ? (
//             <>
//               <CohortNameInput cohortName={name} setCohortName={setName} />
//               <div
//                 id="programDateContainer"
//                 className={"md:flex grid gap-5 w-full items-center"}
//               >
//                 <ProgramSelect
//                   selectedProgram={selectedProgram}
//                   setSelectedProgram={setSelectedProgram}
//                   isSelectOpen={isSelectOpen}
//                   setIsSelectOpen={setIsSelectOpen}
//                   selectOptions={programView}
//                   setId={setProgramId}
//                 />
//                 <DatePicker date={startDate} setDate={setDate} />
//               </div>
//               <DescriptionTextarea
//                 description={cohortDescription}
//                 setDescription={setDescription}
//                 // maximumDescription={2500}
//                 onDescriptionChange={(desc) => { 
//                   if (desc.length <= 2500) { 
//                     setDescription(desc);
//                     setDescriptionError(null); } 
//                     else { 
//                       setDescriptionError("Description must be 2500 characters or less"); } }}
//               />
//               {descriptionError && ( <div className="text-red-500 text-sm">{descriptionError}</div> )}
//               <FileUpload
//                 handleDrop={handleDrop}
//                 handleDragOver={handleDragOver}
//                 setUploadedImageUrl={setUploadedUrl}
//                 labelName="Cohort image (optional)"
//               />
//               <FormButtons
//                 isButtonDisabled={isButtonDisabled}
//                 setIsFormSubmitted={setIsFormSubmitted}
//               />
//             </>
//           ) : (
//             <main id="feeBreakdownContainer" className={"grid gap-5"}>
//               <FeeBreakdownHeader />
//               <InitialItem 
//               initialItemAmount={tuition}
//               setInitialItemAmount={handleItemAmountChange}
//               itemAmountError={itemAmountError}
//               itemName="Tuition"
//               currency="NGN"
//               />
//               <ItemList
//                 items={loanBreakdowns}
//                 setItems={setLoanBreakdowns}
//                 handleDeleteItem={handleDeleteItem}
//                 setIsItemListValid={setIsItemListValid}
//                 setTotalAmount={setTotalAmount}
//               />
//               <div
//                 id={"Step2stickyContainer"}
//                 className={"sticky bottom-0 bg-meedlWhite"}
//               >
//                 <AddItemSection handleSelectClick={handleSelectClick} />
//                 <TotalInput total={totalAmount.toString()} componentId={"createCohort"} prefix={"₦"} />
//                 <section
//                   id="Step2formButtonsContainer"
//                   className={
//                     "md:flex grid gap-5 mt-3 md:justify-end md:items-end bg-meedlWhite"
//                   }
//                 >
//                   <Button
//                     id="CancelCohortButton"
//                     variant={"outline"}
//                     className={`text-meedlBlue font-bold border-solid border-meedlBlue w-full md:w-[8.75rem] h-[3.5625rem]`}
//                     onClick={() => setIsFormSubmitted(false)}
//                   >
//                     Back
//                   </Button>
                
//                     <Button
//                       id="CreateCohortButton"
//                       className={`text-meedlWhite font-bold ${
//                         createButtonDisabled || !isItemListValid
//                           ? "bg-neutral650 hover:bg-neutral650"
//                           : "bg-meedlBlue hover:bg-meedlBlue"
//                       } w-full md:w-[8.75rem] h-[3.5625rem]`}
//                        disabled={createButtonDisabled || !isItemListValid}
//                       type="submit"
//                     >
//                      {isLoading ? (
//                     <Isloading />
//                   ) : (
//                       "Create cohort"
//                   )}
//                     </Button>
                 
//                 </section>
//               </div>
//             </main>
//           )}
//         </form>
//         <div id="createCohortError"
//           className={`text-error500 flex justify-center items-center ${
//             error ? "mb-3" : ""
//           }`}
//         >
//           {error}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default CreateCohort;