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

interface Financier {
  financierId: string;
  role: string[];
}

const initialFormValue = {
  status: "",
  financiers: [{ financierId: "", role: [] }] as Financier[],
  investmentId: ''
};

function ChooseVisibility() {
    const [copied, setCopied] = useState(false);
    const [selectedFinancierIds, setSelectedFinancierIds] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    

    const validationSchema = Yup.object().shape({
        status: Yup.string().required("Visibility is required"),
        financiers: Yup.array().test(
          'private-validation',
          'At least one financier with role is required for private funds',
          function(value) {
            if (this.parent.status === 'Private') {
              return (
                Array.isArray(value) &&
                value.length > 0 &&
                value.every(f => f.financierId && f.role.length > 0)
              );
            }
            return true;
          }
        )
      });


    const isLoading = false
    const completedStep = useAppSelector(state => (state?.vehicleMultistep.completedSteps))
    const vehicleType = useAppSelector(state => (state.vehicle.vehicleType))
    
   
    const financiersData = [
      { id: '1', name: 'Joseph Isa' },
      { id: '2', name: 'Philip Adebayo' },
      { id: '3', name: 'Victoria Ezeoke' },
      { id: '4', name: 'Michael Opuogbo' },
      { id: '5', name: 'Stephen Okeke' },
      { id: '6', name: 'Timothy Usman' },
    ];

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
    
    
    const handleSubmit = (values: typeof initialFormValue) => {
        store.dispatch(markStepCompleted("setup"))
      if(vehicleType === "commercial"){
        router.push("/vehicle/commercial-vehicle")
    }else {
        router.push("/vehicle/endownment-vehicle")
    }
        console.log(values)
      
        
    }

    const handleOpenModal = () => {
      setIsOpen(true)
    }

    const handleCopyLink = () => {
        const url = "meedl.com/tech5investment";
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
        //   setTimeout(() => setCopied(false), 2000); 
        });
      };

      const addFinancierRow = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue 
      ) => {
        setFieldValue('financiers', [
          ...values.financiers,
          { financierId: '', role: [] }, 
        ]);
      };

      const removeFinancierRow = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue,
        index: number
    ) => {
        const removedId = values.financiers[index].financierId;
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
        financierId: string
    ) => {
        const newFinanciers = [...values.financiers];
        const previousId = newFinanciers[index].financierId;

        let updatedSelectedIds = [...selectedFinancierIds];
        
        if (previousId) {
            updatedSelectedIds = updatedSelectedIds.filter(id => id !== previousId);
        }
        if (financierId) {
            updatedSelectedIds.push(financierId);
        }    
        setSelectedFinancierIds(updatedSelectedIds);
        newFinanciers[index] = {
            ...newFinanciers[index],
            financierId
        };
        setFieldValue('financiers', newFinanciers);
    };
    
      const updateFinancierRoles = (
        setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
        values: typeof initialFormValue,
        index: number,
        roles: string[]
      ) => {
        const newFinanciers = [...values.financiers];
        newFinanciers[index] = {
          ...newFinanciers[index],
          role: roles
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
                    // scrollbarWidth: "thin", 
                    // scrollbarColor: "#142854 #f1f1f1",  
                  }}
             >
              <div 
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'Public' ? 'border-[#142854]' : ''}`}
        onClick={() => setFieldValue('status', 'Public')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Public"
                value="Public"
                checked={values.status === 'Public'}
                onChange={() => setFieldValue('status', 'Public')}
                className="hidden" 
                id="public" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'Public' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'Public' && (
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
            {values.status === "Public" && (
                      <div className='lg:px-8 mt-5'>
                      <div className="px-4 lg:flex items-center cursor-auto   lg:justify-between  bg-[#F9F9F9] py-3 rounded-lg">
                        <p className="text-[14px] text-[#212221] text-center lg:text-start lg:flex justify-center cursor-auto">
                          meedl.com/tech5investment
                        </p>
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
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'Private' ? 'border-[#142854]' : ''}`}
        onClick={() => setFieldValue('status', 'Private')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Private"
                value="Private"
                checked={values.status === 'Private'}
                onChange={() => setFieldValue('status', "Private")}
                className="hidden" 
                id="private" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'Private' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'Private' && (
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
                values.status === "Private" && (
                  
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
                                value={financier.financierId}
                                onChange={(value) => updateFinancierId(setFieldValue, values, index, value)}
                                selectContent={financiersData}
                                placeholder="Select financier"
                                triggerId={`financier-select-${index}`}
                                className="w-full"
                                isItemDisabled={(item) => selectedFinancierIds.includes(item.id) && item.id !== financier.financierId}
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
                                value={financier.financierId}
                                onChange={(value) => updateFinancierId(setFieldValue, values, index, value)}
                                selectContent={financiersData}
                                placeholder="Select financier"
                                triggerId={`financier-select-${index}`}
                                className="w-full"
                                isItemDisabled={(item) => selectedFinancierIds.includes(item.id) && item.id !== financier.financierId}
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
          className={`py-5  border-[1px] rounded-xl cursor-pointer px-4 ${values.status === 'Default' ? 'border-[#142854]' : ''}`}
          onClick={() => setFieldValue('status', 'Default')}
          >
          <label className="flex items-center space-x-2 ">
              <input
                type="radio"
                name="Default"
                value="Default"
                checked={values.status === 'Default'}
                onChange={() => setFieldValue('status', 'Default')}
                className="hidden" 
                id="default" 
              />
              <span className="relative w-4 h-4 border-[1px] border-[#D7D7D7] rounded-full flex items-center justify-center cursor-pointer">
                {values.status === 'Default' && (
                  <span className="absolute w-4 h-4 bg-meedlBlue rounded-full"></span>
                )}
                {values.status === 'Default' && (
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
           investmentId={'1'} 
           setIsOpen={setIsOpen} 
           amountCommitedAndDesignationCondition={true}
           isDesignationRequired={true}
           context='Select the type of financial you want to add'
           />
          </Modal>
    </div>
  )
}

export default ChooseVisibility