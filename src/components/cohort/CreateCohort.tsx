
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
import { MdAdd } from 'react-icons/md';
import {MdOutlineDelete} from "react-icons/md";
import TotalInput from "@/reuseable/display/TotalInput";
import { setCreateCohortField,resetCreateCohortField } from "@/redux/slice/create/cohortSlice";
import { useAppSelector,store } from "@/redux/store";
import CenterMultistep from '@/reuseable/multiStep-component/Center-multistep';
import { useCreateCohortMutation,useEditCohortMutation } from "@/service/admin/cohort_query";
import Isloading from "@/reuseable/display/Isloading";
import { useToast } from "@/hooks/use-toast";

interface Props {
    isEdit?:boolean;
    setIsOpen?: (e: boolean) => void;
}

interface viewAllProgramProps {
    id?: string;
    name: string;
}

export interface LoanBreakDowns{
    currency :  string,
    itemAmount : string,
    itemName : string,
}

interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

function CreateCohort({ setIsOpen,isEdit }: Props) {
    const createCohortField = useAppSelector(state => (state?.cohort?.createCohortField))
    const currentProgramId = useAppSelector(state => (state?.program?.currentProgramId))
    const currentProgramName = useAppSelector(state => (state?.cohort?.programName))
     
    const initialFormValue = {
         id: createCohortField?.id || "",
        name: createCohortField?.name || "",
        programId: createCohortField?.programId || currentProgramId || "",
        startDate: createCohortField?.startDate || "",
        cohortDescription: createCohortField?.cohortDescription || "",
        tuitionAmount : createCohortField?.tuitionAmount || "",
        loanBreakDowns: createCohortField?.loanBreakDowns || [] as LoanBreakDowns[]
    };

    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const size = 10;
    const [isProgram, setIsprogram] = useState(true);
    const [programView, setProgramView] = useState<viewAllProgramProps[]>([]);
    const [hasNextPage, setNextPage] = useState(true);
    const [selectCurrency, setSelectCurrency] = useState("NGN");
    const [stepTwoErrors, setStepTwoErrors] = useState<{tuitionAmount?: string}>({});
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState("");
    const { toast } = useToast();
    const [createCohort, { isLoading }] = useCreateCohortMutation();
    const [editCohort, { isLoading:editIsloading }] = useEditCohortMutation();
    
    const maxChars = 2500;

    const { data, isLoading: programIsLoading, isFetching } = useGetAllProgramsQuery(
        { pageSize: size, pageNumber: pageNumber },
        { skip: !isProgram, refetchOnMountOrArgChange: true }
    );

    const handleClose = () => {
        if(setIsOpen){
            setIsOpen(false)
            store.dispatch(resetCreateCohortField())
        }
    }

         const handleFormChange = (field: string, value: string | LoanBreakDowns[]) => {
        const currentField = createCohortField || {
            id: "",
            name: "",
            programId: "",
            startDate: "",
            cohortDescription: "",
            tuitionAmount: "",
            programName: "",
            loanBreakDowns: []
        };
        
        store.dispatch(setCreateCohortField({
            ...currentField,
            [field]: value   
        }));
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

    useEffect(() => {
        if (currentStep  === 1) {
            setStepTwoErrors({});
        }
    }, [currentStep]);

    const loadMore = () => {
        if (!isFetching && hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    const extractPlainText = (html: string): string => {
        if (!html) return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        return text.replace(/\s+/g, ' ').trim();
      };
    

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required("Cohort name is required"),
        programId: Yup.string()
            .required("Program is required"),
        startDate: Yup.date()
            .required("Start date is required")
            .nullable(),
        cohortDescription: Yup.string()
            .trim()
            .test('maxChars', 'Cohort description must be 2500 characters or less', (value) => {
                if (!value) return true; 
                const textContent = extractPlainText(value);
                return textContent.length <= maxChars;
              }),
        tuitionAmount: Yup.string().optional()
    });

    const validateStepTwo = (values: typeof initialFormValue) => {
        const errors: {tuitionAmount?: string} = {};
        
        if (!values.tuitionAmount || values.tuitionAmount.trim() === '') {
            errors.tuitionAmount = "Tuition is required";
        }
        
        return errors;
    };


   
    const validateItemName = (itemName: string, index: number, loanBreakDowns: LoanBreakDowns[]) => {
        const isDuplicate = loanBreakDowns.some((item, i) => 
          i !== index && item.itemName?.toLowerCase().trim() === itemName.toLowerCase().trim()
        );
        
        if (isDuplicate) {
          return "Item name already exists";
        }
        
        return "";
      };

      const hasDuplicateItemNames = (loanBreakDowns: LoanBreakDowns[]): boolean => {
        const itemNames = loanBreakDowns
          .map(item => item.itemName?.toLowerCase().trim())
          .filter(name => name && name !== ''); 
        
        const uniqueNames = new Set(itemNames);
        return itemNames.length !== uniqueNames.size;
      };

    const handleSubmit = async (values: typeof initialFormValue) => {
       const formData = {
              id: values?.id,
               name: values?.name,
               programId: values?.programId,
               startDate: values?.startDate,
               cohortDescription: values?.cohortDescription,
               loanBreakdowns: values?.loanBreakDowns,
               tuitionAmount: values?.tuitionAmount
             };
             try {
                if(!isEdit){
                  const result = await createCohort(formData).unwrap(); 
                  if(result){
                    handleClose()
                    toast({
                      description: result.message,
                      status: "success",
                    });
                  }
                } else {
                    const result = await editCohort({ data: formData }).unwrap(); 
                  if(result){
                    handleClose()
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
        
       
    };

    const areCurrentloanBreakDownValid = (loanBreakDowns: LoanBreakDowns[]) => {
        return loanBreakDowns.every(BreakDowns => 
            BreakDowns.currency && 
            BreakDowns.itemName && 
            BreakDowns.itemAmount 
         
        );
      };

       const isStepTwoValid = (values: typeof initialFormValue) => {
        const errors = validateStepTwo(values);
        return Object.keys(errors).length === 0;
    };
   
   const nextStep = async () => {
              setCurrentStep(currentStep + 1);
          };
   
          const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div>
      <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true} 
      >
        {({errors, isValid, touched, setFieldValue, values}) =>
 { 


                const handleProgramSelect = (programName: string) => {
                        const selectedProgram = programView.find((program) => program.name === programName);
                        if (selectedProgram) {
                            setFieldValue("programId", selectedProgram.id || "");
                            // handleFormChange("programName", selectedProgram.name || "");
                        }
                    };

                    const selectedProgramName = programView.find(program => program.id === values.programId)?.name || null;

                    const handleTuitionChange = (value: string) => {
                        setFieldValue(`tuitionAmount`, value);
                        handleFormChange(`tuitionAmount`, value);
                        
                        if (value.trim() === '') {
                            setStepTwoErrors({ tuitionAmount: "Tuition is required" });
                        } else {
                            setStepTwoErrors({}); 
                        }
                    };

                    const isFormValid = currentStep === 1 ? isValid : isStepTwoValid(values);

                    const calculateTotalCost = () => {
                        let total = 0;
                        
                        if (values.tuitionAmount) {
                          const tuition = parseFloat(values.tuitionAmount.replace(/,/g, '')) || 0;
                          total += tuition;
                        }
                        
                        if (values.loanBreakDowns && values.loanBreakDowns.length > 0) {
                          values.loanBreakDowns.forEach(item => {
                            if (item.itemAmount) {
                              const itemCost = parseFloat(item.itemAmount.replace(/,/g, '')) || 0;
                              total += itemCost;
                            }
                          });
                        }
                        
                        return total;
                      };
                    
                      const totalCost = calculateTotalCost();
            
            return (
        <Form className={`${inter.className}`}>
         <div >
         <CenterMultistep currentStep={currentStep} totalSteps={2} />
         {
            currentStep=== 1? (
                <div>
                <div className="space-y-4 h-full md:max-h-[55vh] max-h-[55vh] overflow-y-auto"
                 style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',  
                      }}
                >
                                    <div>
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
                                                handleFormChange("name", cleanedValue.substring(1));
                                            } else {
                                                setFieldValue("name", cleanedValue);
                                                handleFormChange("name", cleanedValue);
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
                                
                                <div className={`grid  gap-4 ${!currentProgramId? "md:grid-cols-2" : ""}`}>
                                  { !currentProgramId &&  <div>
                                        <ProgramSelect
                                            selectedProgram={selectedProgramName  || currentProgramName}
                                            setSelectedProgram={handleProgramSelect}
                                            isSelectOpen={isSelectOpen}
                                            setIsSelectOpen={setIsSelectOpen}
                                            selectOptions={programView}
                                            setId={(id) => {
                                                setFieldValue("programId", id)
                                                handleFormChange("programId", id);
                                            }} 
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
                                    </div>}

                                    <div>
                                    <Label htmlFor="startDate">Start date</Label> 
                                    <DatePickerInput
                                            selectedDate={parseISO(values.startDate ?? "")}
                                            onDateChange={(date) => {
                                            if (date) {
                                            const formattedDate = format(date, "yyyy-MM-dd");
                                            setFieldValue("startDate", formattedDate); 
                                            handleFormChange("startDate",formattedDate);
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

                                <div className="relative bottom-6 ">
                                    <Label htmlFor="cohortDescription">Cohort description</Label>
                                   
                                    <QuillFieldEditor
                                        name="cohortDescription"
                                        errorMessage=""
                                        errors={{ cohortDescription: errors.cohortDescription }}
                                        touched={{ cohortDescription: touched.cohortDescription }}
                                        onExternalChange={(value) => handleFormChange("cohortDescription", value)}
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
            </div>
                
         <div className='w-full border-[#D7D7D7] border-[0.6px] mt-4 md;mt-0' />
         <div className='md:flex gap-4 justify-end mt-5 mb-3'>
         <Button
            variant={'outline'}
            type='reset'
            className='w-full md:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
            onClick={ handleClose}
            id='CancelInviteOrganization'
        >
           Cancel
        </Button>

        <button
            id='continueCreate'
            type='button'
            className={`w-full md:w-36 h-[57px] rounded-md ${
                !isValid ? "cursor-not-allowed bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white" : "bg-meedlBlue text-meedlWhite hover:bg-[#435376] focus:bg-[#142854]"
            }`}
            onClick={(e) => {
                e.preventDefault();  
                if (isValid) {
                    nextStep();
                }
            }}
            disabled={!isValid}  
        >
            Continue
    </button> 
            </div>
                </div>
            
            ) : (
<div >
<div className=" ">
<div className="bg-[#D9EAFF] text-[14px] py-1 rounded-md w-[220px] mb-8 md:mb-4 text-[#142854] flex items-center justify-center ">
                                Setup cohort fee breakdown
                               </div>
                <div>

                    <div className="grid md:grid-cols-2 gap-3 items-center">
                        <p className="relative bottom-1 border-solid border-[1px] h-12 px-2 rounded-md flex items-center">
                            Tuition
                        </p>
                        <div className="flex items-center gap-2 relative bottom-3 md:bottom-0">
                                <CurrencySelectInput
                                    selectedcurrency={selectCurrency}
                                    setSelectedCurrency={setSelectCurrency}
                                    className="h-[3.2rem]"
                                />
                                <CostField
                                    value={values.tuitionAmount}
                                    onChange={handleTuitionChange} 
                                />   
                            </div>
                        </div>
                    
                        {stepTwoErrors.tuitionAmount && (
                            <div className="text-red-500 text-sm relative bottom-2">
                                {stepTwoErrors.tuitionAmount}
                            </div>
                        )} 
                    </div>   
                    
                    <div className="relative  bottom-2 md:bottom-3">
                        <FieldArray name="loanBreakDowns">
                            {({ push, remove }) => (
                                <div className="">
                                    {values.loanBreakDowns?.map((breakdown, index) =>  { 

                                      const itemNameError = validateItemName(breakdown.itemName, index, values.loanBreakDowns || []);   
                                        return (   
                                        <div key={index}>
                                        <div className="grid md:grid-cols-2 gap-3 items-center md:h-[70px] h-[140px] mt-4 md:mt-0">
                                            <div>
                                            <Field
            id={`loanBreakDowns.${index}.itemName`}
            name={`loanBreakDowns.${index}.itemName`}
            className="w-full h-[50px] p-3 border rounded focus:outline-none text-[14px] relative bottom-1"
            placeholder="Enter item name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                const formattedValue = formatPlaceName(value,true);
                const cleanedValue = formattedValue.replace(/[^a-zA-Z0-9'_&\-\s]/g, '');
                let finalValue = cleanedValue;
                
                if (cleanedValue.length > 0 && !/^[a-zA-Z0-9]/.test(cleanedValue)) {
                    finalValue = cleanedValue.substring(1);
                }
                
                setFieldValue(`loanBreakDowns.${index}.itemName`, finalValue);
            
                const updatedBreakDowns = [...(values.loanBreakDowns || [])];
                updatedBreakDowns[index] = {
                    ...updatedBreakDowns[index],
                    itemName: finalValue
                };
                handleFormChange("loanBreakDowns", updatedBreakDowns);
            }}
        /> 
        
                                            </div>
                                            <div className="flex items-center gap-2 relative bottom-3 md:bottom-0 ">
                                            <CurrencySelectInput
                                                selectedcurrency={breakdown.currency || "NGN"}
                                                setSelectedCurrency={(currency) => {
                                                    setFieldValue(`loanBreakDowns.${index}.currency`, currency);
                                            
                                                    const updatedBreakDowns = [...(values.loanBreakDowns || [])];
                                                    updatedBreakDowns[index] = {
                                                        ...updatedBreakDowns[index],
                                                        currency: currency
                                                    };
                                                    handleFormChange("loanBreakDowns", updatedBreakDowns);
                                                }}
                                                className="h-[3.2rem]"
                                            />
                                                <CostField
                                                    value={breakdown.itemAmount || ""}
                                                    onChange={(value: string) => {
                                                        setFieldValue(`loanBreakDowns.${index}.itemAmount`, value);
                                                        
                                                        const updatedBreakDowns = [...(values.loanBreakDowns || [])];
                                                        updatedBreakDowns[index] = {
                                                            ...updatedBreakDowns[index],
                                                            itemAmount: value
                                                        };
                                                        handleFormChange("loanBreakDowns", updatedBreakDowns);
                                                    }}
                                                />
                                                
                                                <div 
                                                className="cursor-pointer text-blue200"
                                                onClick={() => remove(index)}
                                                >
                                                
                                                    <MdOutlineDelete className="h-5 w-[18px]" /> 
                                                
                                        </div>
                                            </div>
                                        </div>
                                        {itemNameError && (
                                                <div className="text-red-500 text-sm mt-1">{itemNameError}</div>
                                            )}
                                        </div>
                                    ) } )
                                    }
                                    
                                    
                                    <div className="relative top-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => {
                                                push({
                                                    currency: "NGN",
                                                    itemAmount: "",
                                                    itemName: ""
                                                });
                                            }}
                                            className={`text-[#142854] border-none shadow-none hover:bg-white px-0 ${!values.tuitionAmount || !areCurrentloanBreakDownValid(values?.loanBreakDowns) ||
                                                hasDuplicateItemNames(values.loanBreakDowns || [])  ? 'opacity-50 cursor-not-allowed' : ''}`}
                                           
                                                disabled={!values.tuitionAmount || !areCurrentloanBreakDownValid(values?.loanBreakDowns) ||
                                                hasDuplicateItemNames(values.loanBreakDowns || [])} 
                                        >
                                            <MdAdd color="#142854" className="h-[16px] w-[16px]"  />
                                            Add Item
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>
                        <div className="relative top-2 mb-3 md:mb-1">
                        <TotalInput total={totalCost.toString()} componentId={"createCohort"} prefix={"₦"} />
                        </div>
                    </div>
                </div>
        <div className=''>
            <div className='w-full border-[#D7D7D7] border-[0.6px]'></div>
            <div className='md:flex gap-4 justify-end mt-5 mb-3'>
            <Button
            variant={'outline'}
            type='reset'
            className='w-full md:w-36 h-[57px] mb-4 border-solid border-[#142854] text-[#142854]'
            onClick={ prevStep}
            id='CancelInviteOrganization'
            >
           Back
           </Button>
                <button
            id='continueOrganization'
            type='submit'
            className={`w-full md:w-36 h-[57px] rounded-md ${
                !isFormValid || !areCurrentloanBreakDownValid(values?.loanBreakDowns) || hasDuplicateItemNames(values.loanBreakDowns || [])? "cursor-not-allowed bg-[#D7D7D7] hover:bg-[#D7D7D7] text-white" : "bg-meedlBlue text-meedlWhite hover:bg-[#435376] focus:bg-[#142854]"
            }`}
            disabled={!isFormValid || !areCurrentloanBreakDownValid(values?.loanBreakDowns) || hasDuplicateItemNames(values.loanBreakDowns || [])}
        >
          {isLoading || editIsloading ? (
                    <Isloading />
                  ) : (
                     !isEdit ? "Create cohort" : "Edit cohort"
                  )}
        </button>   
            </div>
        </div>
        </div>
            )
         }
         </div>
         {
            <div
                className={`text-error500 flex justify-center items-center text-center relative bottom-5`}>
                    {error}
                    </div>
        }
        </Form>
        )}
        }

      </Formik>
    </div>
  )
}

export default CreateCohort


