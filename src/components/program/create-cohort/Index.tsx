import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FormButtons from "@/reuseable/buttons/FormButtons";
import {
    FeeBreakdownHeader,
    AddItemSection,
    ItemList
} from "@/reuseable/feeBreakdown";
import { CohortNameInput, FileUpload } from "@/reuseable/Input";
import { useCreateCohortMutation } from "@/service/admin/cohort_query";
import { format, parseISO } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import TotalInput from "@/reuseable/display/TotalInput";
import Isloading from "@/reuseable/display/Isloading";
import CustomQuillField from "@/reuseable/textArea/Custom-quill-field";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import DatePickerInput from "@/reuseable/Input/DatePickerInput";
import { Label } from "@/components/ui/label";



interface createCohortProps {
    setIsOpen?: (e: boolean) => void;

}



interface ApiError {
    status: number;
    data: {
        message: string;
    };
}

const CreateCohortInProgram: React.FC<createCohortProps> = ({ setIsOpen }) => {
    const currentProgramId = useSelector((state: RootState) => state.program.currentProgramId);

    const [startDate, setDate] = useState<Date>();
    const [name, setName] = useState("");
    const [cohortDescription, setDescription] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [createButtonDisabled, setCreateButtonDisabled] = useState(true)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loanBreakdowns, setLoanBreakdowns] = useState<{ itemName: string; itemAmount: string; currency: string }[]>([ { itemName: "Tuition", itemAmount: "", currency: "NGN" }  ]);
    const [imageUrl, setUploadedUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [isItemListValid, setIsItemListValid] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const [initialItemAmount, setInitialItemAmount] = useState("");
    const [createCohort, { isLoading }] = useCreateCohortMutation();


    const { toast } = useToast();

    useEffect(() => {
        if (name && startDate && !descriptionError) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, startDate, descriptionError]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setDescriptionError(null);
        // setIsSelectOpen(false);
        setIsButtonDisabled(true);
        setCreateButtonDisabled(true);
        setIsFormSubmitted(false);
        // setLoanBreakdowns([]);
        setLoanBreakdowns([{ itemName: "Tuition", itemAmount: "", currency: "NGN" }]);
        setError("");
        setUploadedUrl(null);
        setInitialItemAmount("0.00");
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
            const tuitionItem = loanBreakdowns.find(item => item.itemName === "Tuition");
            const tuitionAmount = tuitionItem? tuitionItem.itemAmount : "" ;
            const filteredLoanBreakdowns = loanBreakdowns.filter(item => item.itemName !== "Tuition");

            const formData = {
                name: name,
                programId: currentProgramId as string,
                startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
                cohortDescription: cohortDescription,
                imageUrl: imageUrl,
                loanBreakdowns: filteredLoanBreakdowns,
                tuitionAmount: tuitionAmount
            };
            try {
                const result = await createCohort(formData).unwrap();
                if(result){
                setIsFormSubmitted(true);
                resetForm();
                handleCloseModal()
                toast({
                    description: result.message,
                    status: "success",
                });
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

    const handleSelectClick = () => {
        setLoanBreakdowns([ loanBreakdowns[0],
            ...loanBreakdowns.slice(1),
            { itemName: "", itemAmount: "", currency: "NGN" }  ]);
    };

    const handleDeleteItem = (index: number) => {
        setLoanBreakdowns(loanBreakdowns.filter((_, i) => i !== index));
    };

    return (
        <div>

                <form
                    id="cohortForm"
                    // className={`grid gap-5 ${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`}
                    className='grid gap-5 grid-cols-1 gap-y-4 md:max-h-[57vh] max-h-[55vh] overflow-y-auto  pr-2'
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollbarGutter: "stable both-edge"
    
                    }}
                    // style={{ scrollbarGutter: "stable both-edge" }}
                    onSubmit={handleSubmit}
                >
                    {!isFormSubmitted ? (
                        <>
                            <div id="programDateContainer" className={"md:grid md:grid-cols-2 gap-3 "}>
                                <div className={`w-full`}>
                                    <CohortNameInput cohortName={name} setCohortName={setName} />
                                </div>
                                <div className={`w-full relative md:top-0 top-4 `}>
                                    <Label>Start date</Label>
                                    <div className="relative bottom-[8px]">
                                    <DatePickerInput
                                     selectedDate={typeof startDate === 'string' ? parseISO(startDate) : startDate}
                                     onDateChange={
                                        (date) => {
                                                        if (date) {
                                                          setDate(date);
                                                        }else {
                                                         setDate(undefined)
                                                        }
                                                      }
                                       } 
                                     className="rounded-md border-neutral650 text-[14px] text-[#6A6B6A] h-[53px]"
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className="relative bottom-0 md:bottom-4">
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
                            </div>

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
                                        "md:flex grid gap-5 mt-3 md:justify-end md:items-end bg-meedlWhite mb-4"
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
                                                : "bg-meedlBlue hover:bg-[#435376]"
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
        </div>
    );
};
export default CreateCohortInProgram;