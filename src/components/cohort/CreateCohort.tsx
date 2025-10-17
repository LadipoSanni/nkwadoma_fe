import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { inter } from "@/app/fonts";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useGetAllProgramsQuery } from "@/service/admin/program_query";
import ProgramSelect from "@/reuseable/select/ProgramSelect";
import DatePickerInput from "@/reuseable/Input/DatePickerInput";
import { format, parseISO } from "date-fns";
import QuillFieldEditor from "@/reuseable/textArea/Quill-field";
import { formatPlaceName } from "@/utils/GlobalMethods";
import CostField from "@/features/portfolio-manager/loan-product/createLoanProduct/VendorCostField";
import CurrencySelectInput from "@/reuseable/Input/CurrencySelectInput";

interface idProps {
    cohortId?: string;
    setIsOpen?: (e: boolean) => void;
}

interface viewAllProgramProps {
    id?: string;
    name: string;
}

function CreateCohort({ setIsOpen }: idProps) {
    const initialFormValue = {
        name: "",
        programId: "",
        startDate: "",
        cohortDescription: "",
        tuitionAmount : ""
    };

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const size = 10;
    const [isProgram, setIsprogram] = useState(false);
    const [programView, setProgramView] = useState<viewAllProgramProps[]>([]);
    const [hasNextPage, setNextPage] = useState(true);
    const [step,setNextStep] = useState(1);
    const [selectCurrency, setSelectCurrency] = useState("NGN");

    const { data, isLoading: programIsLoading, isFetching } = useGetAllProgramsQuery(
        { pageSize: size, pageNumber: pageNumber },
        { skip: !isProgram, refetchOnMountOrArgChange: true }
    );

    const handleClose = () => {
        if(setIsOpen){
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if (data && data?.data) {
            setProgramView((prev) => {
                if (pageNumber === 0) {
                    return [...data.data.body].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                }
                const newPrograms = data.data.body.filter(
                    (newProgram: viewAllProgramProps) =>
                        !prev.some((prevItem) => prevItem.id === newProgram.id)
                );
                return [...prev, ...newPrograms].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            });
            setNextPage(data?.data?.hasNextPage);
        }
    }, [data, pageNumber]);

    const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .trim()
          .required("Cohort name is required"),
        programId: Yup.string()
           .required("Program is required"),
         startDate: Yup.date()
            .required("Start date is required")
            .nullable()
            ,
     cohortDescription: Yup.string()
                .trim()
                .max(2500, "Cohort description must be 2500 characters or less"),
            
    });

    const validationStepTwoSchema = Yup.object().shape({
        tuition: Yup.string()
            .trim()
            .required("Tuition is required"),
    });

    const handleSubmit = (values: typeof initialFormValue) => {
        console.log("Form values:", values);
        console.log("Program ID:", values.programId);
        // Your submit logic here
    };

    function handleNextStep() {
        if(step === 1 ) {
            setNextStep(2)
        }else {
            setNextStep(1)
        }
    }


    return (
        <div>
            <Formik
                initialValues={initialFormValue}
                onSubmit={handleSubmit}
                validationSchema={step === 1? validationSchema : validationStepTwoSchema}
                validateOnChange={true}
                validateOnBlur={true} 
                validateOnMount={true}
            >
                {({ values, errors, isValid, touched, setFieldValue }) => {

                    const handleProgramSelect = (programName: string) => {
                        const selectedProgram = programView.find((program) => program.name === programName);
                        if (selectedProgram) {
                            setFieldValue("programId", selectedProgram.id || "");
                        }
                    };

                    const selectedProgramName = programView.find(program => program.id === values.programId)?.name || null;

                    return (
                        <Form className={`${inter.className}`}>
                             <div>
                                { step === 2 && <div className="bg-[#D9EAFF] text-[14px] py-1  rounded-md w-[220px] mb-8 md:mb-6 mt-2 text-[#142854] flex items-center justify-center">
                                  Setup cohort fee breakdown
                                </div>}
                             </div>
                            <div
                                className=" md:max-h-[55vh] max-h-[55vh] overflow-y-auto"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    scrollbarGutter: "stable both-edge"
                                }}
                            >
                              { step === 1 ? <div className="grid grid-cols-1 gap-y-4">
                                <div className="">
                                    <Label htmlFor="cohortName">Cohort name</Label>
                                    <Field
                                        id="editCohortName"
                                        name="name"
                                        className="w-full p-3 border rounded focus:outline-none mt-2 text-[14px]"
                                        placeholder="Enter cohort name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value;
                                        const formattedValue = formatPlaceName(value,true);
                                        const cleanedValue = formattedValue.replace(/[^a-zA-Z0-9'_&\-\s]/g, '');
                                        if (cleanedValue.length > 0 && !/^[a-zA-Z0-9]/.test(cleanedValue)) {
                                            
                                            setFieldValue("name", cleanedValue.substring(1));
                                        } else {
                                            setFieldValue("name", cleanedValue);
                                        }
                                     }}
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
                                <div>
                                    <ProgramSelect
                                        selectedProgram={selectedProgramName}
                                        setSelectedProgram={handleProgramSelect}
                                        isSelectOpen={isSelectOpen}
                                        setIsSelectOpen={setIsSelectOpen}
                                        selectOptions={programView}
                                        setId={(id) => setFieldValue("programId", id)} 
                                        label={"Program"}
                                        placeholder={"Select program"}
                                        isLoading={programIsLoading}
                                        onOpenChange={(open) => setIsprogram(open)}
                                        infinityScroll={{
                                            hasMore: hasNextPage,
                                            loadMore: loadMore,
                                            loader: isFetching
                                        }}
                                    />
                                    
                                    {errors.programId && touched.programId && (
                                        <div className="text-red-500 text-sm mt-1">
                                            {errors.programId}
                                        </div>
                                    )}
                                  
                                </div>

                                <div className="relative md:bottom-1">
                                <Label htmlFor="startDate">Start date</Label> 
                                <DatePickerInput
                                        selectedDate={parseISO(values.startDate ?? "")}
                                        onDateChange={(date) => {
                                        if (date) {
                                        const formattedDate = format(date, "yyyy-MM-dd");
                                        setFieldValue("startDate", formattedDate); 
                                    } else {
                                        setFieldValue("startDate", ""); 
                                    }
                                                    }}
                                        className="p-6 mt-2"
                                        
                                    />
                                    {errors.startDate && touched.startDate && (
                                        <ErrorMessage
                                        name="startDate"
                                        component="div"
                                        id="startDateError"
                                        className="text-red-500 text-sm"
                                        />
                                    )}
                                </div>
                                </div>

                                <div className="relative md:bottom-6">
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

                </div> : 
                                    
                <div className="mt-3 md:mt-0">
                   <div className="grid md:grid-cols-2 gap-3 items-center">
                    <p className="border-solid border-[1px] h-12 px-2 rounded-md relative bottom-1 flex items-center">
                    Tuition
                    </p>
                    <div className="flex items-center gap-2">
                    <CurrencySelectInput
                    selectedcurrency={selectCurrency}
                    setSelectedCurrency={setSelectCurrency}
                    className="h-[3.2rem]"
                   />
                   <CostField
                    value={values.tuitionAmount}
                    onChange={(value: string) => { 
                        setFieldValue(`tuitionAmount`, value);
                        // validateNumber("costOfService", setFieldValue);
                    }}
                />   
                    </div>
                    

                   </div>
                        
                 </div>
}
            
             <div className='w-full border-[#D7D7D7] border-[0.6px] mt-2' />

              {  step === 1? <div className="mt-3 md:flex justify-between items-center mb-3">
                <div className="mb-4 md:mb-0">
                <Button
                variant={'outline'}
                type='reset'
                className='w-full md:w-36 h-[57px]  border-solid border-[#142854] text-[#142854]'
                onClick={handleClose}
                id='CancelInviteOrganization'
                >
                Cancel
                </Button>
                </div>    

                <div>
                <button
            id='continueOrganization'
            type='button'
            className={`w-full md:w-36 h-[57px]  rounded-md ${
            !isValid ? " cursor-not-allowed bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white "  : "bg-meedlBlue text-meedlWhite hover:bg-[#435376] focus:bg-[#142854]"
            }`}
            onClick={(e) => {
            e.preventDefault();  
            if (isValid) {
                handleNextStep();
                }
            
        }}
            disabled={!isValid }
        >
            Continue
            </button>   
                </div>   

                </div> 
                : 
                <div className="mt-3 md:flex justify-between items-center mb-3">
                <div className="mb-4 md:mb-0">
                <Button
                variant={'outline'}
                type='reset'
                className='w-full md:w-36 h-[57px]  border-solid border-[#142854] text-[#142854]'
                onClick={handleNextStep}
                id='CancelInviteOrganization'
                >
                Back
                </Button>
                </div>    

                <div>
                <button
            id='continueOrganization'
            type='submit'
            className={`w-full md:w-36 h-[57px]  rounded-md ${
            !isValid ? " cursor-not-allowed bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white "  : "bg-meedlBlue text-meedlWhite hover:bg-[#435376] focus:bg-[#142854]"
            }`}
            disabled={!isValid }
        >
            Create
            </button>   
                </div>   

                </div> 
                }
                </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default CreateCohort;