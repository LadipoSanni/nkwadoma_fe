"use client"
import React,{useState,useEffect} from 'react'
import { inter } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Label } from '@/components/ui/label';
import Isloading from "@/reuseable/display/Isloading";
import {store} from "@/redux/store";
import {useAppSelector} from "@/redux/store";
import { markStepCompleted } from '@/redux/slice/multiselect/vehicle-multiselect';
import { useRouter } from "next/navigation";
import CustomSelectId from '@/reuseable/Input/custom-select-id';
// import Multiselect from '@/reuseable/mult-select/multi-select';
import { MdDeleteOutline } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import style from "./multistep.module.css"
import { MultiSelect } from '@/reuseable/mult-select';
import Modal from '@/reuseable/modals/TableModal';
import InviteFinanciers from '@/components/portfolio-manager/fund/financier/financiers-step';
import {Cross2Icon} from "@radix-ui/react-icons";
import { useViewAllFinanciersQuery } from '@/service/admin/financier';
import { useChooseInvestmentVehicleVisibilityMutation } from '@/service/admin/fund_query';
import { useToast } from "@/hooks/use-toast";
import { clearDraftId,clearPublicVehicleUrl} from '@/redux/slice/vehicle/vehicle';


interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

interface Financier {
  id: string;
  investmentVehicleDesignation: string[];
}

const initialFormValue = {
  status: "",
  financiers: [{ id: "",  investmentVehicleDesignation: [] }] as Financier[],
  investmentVehicleId: ''
};

interface Financials {
  id: string,
  organizationName: string,
  userIdentity: {
    firstName: string,
    lastName: string,

  }
}

function ChooseVisibility() {
    const [copied, setCopied] = useState(false);
    const [selectedFinancierIds, setSelectedFinancierIds] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [pageNumber,setPageNumber] = useState(0)
    const investmentVehicleId = useAppSelector(state => (state?.vehicle?.setDraftId))
    const urlLink = useAppSelector(state => (state?.vehicle?.setPublicVehicleUrl))
    const [viewAllfinanciers,setAllfinanciers] = useState<Financials[]>([])
    const [hasNextPage, setNextPage] = useState(true);
    const [isFinancier,setFinancier] = useState(false)
    const [isError, setError] = useState("");
    const { toast } = useToast();
    const router = useRouter();
    const param = {
      pageNumber: pageNumber,
      pageSize: 10,
      }

     const {data,isLoading: isloading, isFetching} = useViewAllFinanciersQuery(param,{skip: !isFinancier})
     const [chooseVisibility, {isLoading}] = useChooseInvestmentVehicleVisibilityMutation()

    const validationSchema = Yup.object().shape({
      status: Yup.string().required("Visibility is required"),
      financiers: Yup.array().test(
        'private-validation',
        'At least one financier with investment vehicle designation is required for private funds',
        function(value) {
          if (this.parent.status === 'Private') {
            return (
              Array.isArray(value) &&
              value.length > 0 &&
              value.every(f => 
                f?.id && 
                Array.isArray(f?.investmentVehicleDesignation) && 
                f.investmentVehicleDesignation.length > 0
              )
            );
          }
          return true;
        }
      )
    });

    const completedStep = useAppSelector(state => (state?.vehicleMultistep?.completedSteps))
    const vehicleType = useAppSelector(state => (state.vehicle?.vehicleType))

    useEffect(()=> {
       if(data && data?.data && data?.data?.body){
           setAllfinanciers((prev) => {
            if(pageNumber === 0) {
               return data?.data?.body
            }
             const newFinanciers = data?.data?.body.filter(
              (newFinancier: Financials) => !prev.some((prevfinancier) => prevfinancier.id === newFinancier.id)
             );
             return [...prev, ...newFinanciers]
           });
           setNextPage(data?.data?.hasNextPage)
       }
    },[data, pageNumber]);

    const loadMore = () => {
      if (!isFetching && hasNextPage) {
          setPageNumber((prevPage) => prevPage + 1);
      }
  };
    
    const designations = [
      { label: "Lead", value: "LEAD" },
      { label: "Sponsor", value: "SPONSOR" },
      { label: "Investor", value: "INVESTOR" },
      { label: "Endower", value: "ENDOWER" },
      { label: "Donor", value: "DONOR" },
    ]
    
       useEffect(()=> {
         if(!completedStep.includes("setup")){
          router.push('/vehicle/setup');
         }
       },[completedStep, router])
    
    
    const handleSubmit = async (values: typeof initialFormValue) => {
        const formData = {
          investmentVehicleId: investmentVehicleId,
          visibility: values.status,
          financiers: values.financiers
        }
         try {
          const visibility = await chooseVisibility(formData).unwrap();
             if(visibility){
              toast({
                description: visibility.message,
                status: "success",
              });
              store.dispatch(clearDraftId())
              store.dispatch(clearPublicVehicleUrl())
              if(vehicleType === "commercial"){
                router.push("/vehicle/commercial-vehicle")
            }else {
                router.push("/vehicle/endownment-vehicle")
            }
             }
         } catch (err) {
          const error = err as ApiError;
          setError(error?.data?.message);
         }
     
        
    }

    const handleOpenModal = () => {
      setIsOpen(true)
    }

    const handleCopyLink = () => {
        const url = urlLink;
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); 
        });
      };

      const addFinancierRow = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue 
      ) => {
        setFieldValue('financiers', [
          ...values.financiers,
          { financierId: '', investmentVehicleDesignation: [] }, 
        ]);
      };

      const removeFinancierRow = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue,
        index: number
    ) => {
        const removedId = values.financiers[index].id;
        if (removedId) {
            setSelectedFinancierIds(selectedFinancierIds.filter(id => id !== removedId));
        }
        
        const newFinanciers = [...values.financiers];
        newFinanciers.splice(index, 1);
        setFieldValue('financiers', newFinanciers);
    };

      const updateFinancierId = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue,
        index: number,
        id: string
    ) => {
        const newFinanciers = [...values.financiers];
        const previousId = newFinanciers[index].id;

        let updatedSelectedIds = [...selectedFinancierIds];
        
        if (previousId) {
            updatedSelectedIds = updatedSelectedIds.filter(id => id !== previousId);
        }
        if (id) {
            updatedSelectedIds.push(id);
        }    
        setSelectedFinancierIds(updatedSelectedIds);
        newFinanciers[index] = {
            ...newFinanciers[index],
            id
        };
        setFieldValue('financiers', newFinanciers);
    };
    
      const updateFinancierRoles = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue,
        index: number,
        investmentVehicleDesignation: string[]
      ) => {
        const newFinanciers = [...values.financiers];
        newFinanciers[index] = {
          ...newFinanciers[index],
          investmentVehicleDesignation: investmentVehicleDesignation
        };
        setFieldValue('financiers', newFinanciers);
      };

  return (
    <div className={`${inter.className} `}>
        <div className='xl:px-[11rem] lg:px-8 grid grid-cols-1 gap-y-6 '>
        <div className='grid grid-cols-1 gap-y-1'>
        <h1 className='text-[18px] font-normal'>Visibility</h1>
        <p className='text-[14px] font-normal'>Select the visibility of your {vehicleType} fund</p>
       </div>
         <div>
        <Formik
        initialValues={initialFormValue}
        onSubmit={handleSubmit}
        validateOnMount={true}
        validationSchema={validationSchema}
         >
        {({
          // errors,
          isValid,
          // touched,
          setFieldValue,
          // setFieldError,
           values
        })=> (
            <Form className={`${inter.className}`}>
             <div className='grid grid-cols-1 gap-y-4 lg:pr-16 rounded-lg  md:max-h-[50vh]  overflow-y-auto'
                style={{
                    overflowY: "auto",
                    marginRight: "-10px",  
                    paddingRight: "10px",    
                  }}
             >
              <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'PUBLIC' ? 'border-[#142854]' : ''}`}
        onClick={() => setFieldValue('status', 'PUBLIC')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Public"
                value="PUBLIC"
                checked={values.status === 'PUBLIC'}
                onChange={() => setFieldValue('status', 'PUBLIC')}
                className="hidden" 
                id="public" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'PUBLIC' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'PUBLIC' && (
                  <svg
                    className="absolute w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[14px]">Public</span> 
            </label>
            <p className='text-[14px] font-normal px-8 text-[#6A6B6A]'>This {vehicleType} fund will be visible to the public</p>
            {values.status === "PUBLIC" && (
                      <div className='lg:px-8 mt-5'>
                      <div className="px-4 lg:flex items-center cursor-auto   lg:justify-between  bg-[#F9F9F9] py-3 rounded-lg">
                        <div className="text-[14px] text-[#212221] text-center lg:text-start lg:flex justify-center cursor-auto">
                        <p 
                        className="lg:max-w-[14rem]  truncate text-ellipsis whitespace-nowrap"
                        >
                         {urlLink}
                        </p>
                        </div>
                        <div className='flex justify-center mt-3 lg:mt-0'>
                        <Button
                          type="button"
                          onClick={handleCopyLink}
                          variant={'default'}
                          className="text-[12px] bg-[#D9EAFF] text-[#142854] px-4  rounded-2xl hover:bg-[#D9EAFF] transition font-semibold shadow-none "
                        >
                          {copied ? "Copied!" : "Copy link"}
                        </Button>
                        </div>
                        
                      </div>
                      </div>
                    )}
          </div>
          <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'PRIVATE' ? 'border-[#142854]' : ''}`}
        onClick={() => setFieldValue('status', 'PRIVATE')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Private"
                value="PRIVATE"
                checked={values.status === 'PRIVATE'}
                onChange={() => setFieldValue('status', "PRIVATE")}
                className="hidden" 
                id="private" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'PRIVATE' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'PRIVATE' && (
                  <svg
                    className="absolute w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[14px]">Private</span>
            </label>
            <p className='text-[14px] font-normal px-8 text-[#6A6B6A]'>This {vehicleType} fund will be visible to selected people</p>
            {
                values.status === "PRIVATE" && (
                  
                    <div className=' px-6 relative top-4 left-3  '>

                        <div className="lg:grid grid-cols-2 gap-4 hidden ">
                          
                      <Label className='text-[#212221]'>Financier</Label>
                      <Label className='text-[#212221]'>Role</Label>
                    </div>
                      <div className={`lg:-space-y-4 space-y-2 md:max-h-[35vh]  ${style.container}`}>
                        {
                           values.financiers.map((financier, index) => (
                            <div key={index} className=''>
                            <div className={`grid grid-cols-2 gap-4 items-center  `}>
                              <div className='hidden lg:block'>
                              <CustomSelectId
                                value={financier.id}
                                onChange={(value) => updateFinancierId(setFieldValue, values, index, value)}
                                selectContent={viewAllfinanciers}
                                placeholder="Select financier"
                                triggerId={`financier-select-${index}`}
                                className="w-full"
                                isItemDisabled={(item) => selectedFinancierIds.includes(item.id) && item.id !== financier.id}
                                additionalContent={({ closeDropdown }) => (
                                  <div className="relative py-2 top-1 px-2 flex items-center text-[#142854]">
                                    <div className="z-50">
                                      <MdAdd color="#142854" className="h-[16px] w-[16px]" />
                                    </div>
                                    <div className="relative right-3">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          handleOpenModal();
                                          closeDropdown(); 
                                        }}
                                        className="text-[#142854] border-none shadow-none"
                                      >
                                        Add new Financier
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                selectItemCss='text-[#6A6B6A]'
                                infinityScroll={{
                                  hasMore: hasNextPage,
                                  loadMore: loadMore,
                                  loader: isFetching
                                }}
                                isLoading={isloading}
                                isFinancier={setFinancier}
                                button={({ closeDropdown }) => (
                                  <div className="relative left-2 right-2 flex items-center justify-center ">
                                    <div className="z-50">
                                      <MdAdd color="#142854" className="h-[16px] w-[16px]" />
                                    </div>
                                    <div className="relative right-3">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          handleOpenModal();
                                          closeDropdown(); 
                                        }}
                                        className="text-black text-[12px] border-none shadow-none"
                                      >
                                        Add Financier
                                      </Button>
                                    </div>
                                  </div>
                                )}
                          />
                              </div>

                              <div className='flex items-center gap-2 relative bottom-1'>
                                <div className={`w-full hidden lg:block  ${index > 0? "pr-1" : "pr-6"}`}>
                                <MultiSelect
                                 modalPopover={true}
                                 options={designations}
                                onValueChange={(selectedRoles) => 
                                  updateFinancierRoles(setFieldValue, values, index, selectedRoles)
                                }
                                placeholder="Select roles"
                                className={`min-h-[48px]`}
                                restrictedItems={["LEAD","SPONSOR"]}
                                id='designationId'
                                selcetButtonId='designationbuttonId'
                              /> 
                                </div>
                             
                              <div className='hidden lg:block'>
                              {index > 0 && (
                                  <div className=''>
                                  <button
                                    type="button"
                                    onClick={() => removeFinancierRow(setFieldValue, values, index)}
                                    className="text-[#939CB0] "
                                  >
                                    <MdDeleteOutline className="h-5 w-5" />
                                  </button>
                                  </div>
                                
                                )}
                              </div>
                              </div>
                              
                            </div>
                            <div className='lg:hidden grid grid-cols-1 '>
                              <div>
                              <Label className='text-[#212221]'>Financier</Label>
                              <div className={`w-full -mt-2 `}>
                              <CustomSelectId
                                value={financier.id}
                                onChange={(value) => updateFinancierId(setFieldValue, values, index, value)}
                                selectContent={viewAllfinanciers}
                                placeholder="Select financier"
                                triggerId={`financier-select-${index}`}
                                className="w-full"
                                isItemDisabled={(item) => selectedFinancierIds.includes(item.id) && item.id !== financier.id}
                                additionalContent={({ closeDropdown }) => (
                                  <div className="relative py-2 top-1 px-2 flex items-center text-[#142854]">
                                    <div className="z-50">
                                      <MdAdd color="#142854" className="h-[16px] w-[16px]" />
                                    </div>
                                    <div className="relative right-3">
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          handleOpenModal();
                                          closeDropdown(); 
                                        }}
                                        className="text-[#142854] border-none shadow-none"
                                      >
                                        Add new Financier
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                selectItemCss='text-[#6A6B6A]'
                                infinityScroll={{
                                  hasMore: hasNextPage,
                                  loadMore: loadMore,
                                  loader: isFetching
                                }}
                                isLoading={isloading}
                                isFinancier={setFinancier}
                                button={({ closeDropdown }) => (
                                  <div className="relative left-2 right-2 flex items-center justify-center ">
                                  <div className="z-50">
                                    <MdAdd color="#142854" className="h-[16px] w-[16px]" />
                                  </div>
                                  <div className="relative right-3">
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        handleOpenModal();
                                        closeDropdown(); 
                                      }}
                                      className="text-black text-[12px] border-none shadow-none"
                                    >
                                      Add Financier
                                    </Button>
                                  </div>
                                </div>
                                )}
                                />
                                </div>
                              </div>
                              <div className='relative bottom-3'>
                              <Label className='text-[#212221]'>Role</Label>
                              <div className={`w-full mt-1`}>
                                 <MultiSelect
                                 modalPopover={true}
                                 options={designations}
                                onValueChange={(selectedRoles) => 
                                  updateFinancierRoles(setFieldValue, values, index, selectedRoles)
                                }
                                placeholder="Select roles"
                                className={`min-h-[48px]`}
                                restrictedItems={["LEAD","SPONSOR"]}
                                id='designationId'
                                selcetButtonId='designationbuttonId'
                                
                              /> 
                                </div>
                                <div className='lg:hidden mt-3'>
                              {index > 0 && (
                                  <div className=''>
                                  <button
                                    type="button"
                                    onClick={() => removeFinancierRow(setFieldValue, values, index)}
                                    className="text-[#939CB0] "
                                  >
                                    <MdDeleteOutline className="h-5 w-5" />
                                  </button>
                                  </div>
                                
                                )}
                              </div>
                              </div>
                            </div>
                            </div>
                           ))
                        }
                        
                      </div>
                      <div className='relative  lg:py-0 top-1 lg:top-0 flex items-center text-[#142854]'>
                          <div className='z-50'> <MdAdd color='#142854'className='h-[16px] w-[16px]'/> </div>
                        <div className='relative right-3 '>
                        <Button
                          type="button"
                          onClick={() => addFinancierRow(setFieldValue, values)}
                          className=" text-[#142854]  border-none  shadow-none"
                          >
                            Add 
                          </Button>   
                        </div>
                       
                        </div> 
                
                    </div>
                )
            }
          </div>
          <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'DEFAULT' ? 'border-[#142854]' : ''}`}
          onClick={() => setFieldValue('status', 'DEFAULT')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Default"
                value="DEFAULT"
                checked={values.status === 'DEFAULT'}
                onChange={() => setFieldValue('status', 'DEFAULT')}
                className="hidden" 
                id="default" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'DEFAULT' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'DEFAULT' && (
                  <svg
                    className="absolute w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-[14px]">Only me</span>
            </label>
            <p className='text-[14px] font-normal px-8 text-[#6A6B6A]'>This {vehicleType} fund will be visible to the creator</p>
          </div>
             </div>
             <div className="md:flex justify-end w-full mt-4">
                <button
                  id="submitInvestment"
                  className={`w-full md:w-24 h-[46px] rounded-md ${
                    !isValid
                      ? "bg-neutral650 cursor-auto text-white hover:bg-neutral650"
                      : "hover:bg-meedlBlue bg-meedlBlue text-white cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoading ? <Isloading /> : "Finish"}
                </button>
              </div>
            </Form>
            
        )

        }
       
         </Formik>
         <p
              className={`text-error500 flex justify-center items-center ${
                isError ? "mb-3" : ""
              }`}
            >
              {isError}
            </p>
         </div>
        </div>
        <Modal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          headerTitle='Invite new financier'
          closeOnOverlayClick={true}
          icon={Cross2Icon}
          width='36%'
          >
           <InviteFinanciers 
          //  investmentId={'1'} 
           setIsOpen={setIsOpen} 
          //  amountCommitedAndDesignationCondition={true}
          //  isDesignationRequired={true}
           context='Select the type of financial you want to add'
           />
          </Modal>
    </div>
  )
}

export default ChooseVisibility