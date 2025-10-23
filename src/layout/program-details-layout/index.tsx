'use client'
import React,{useState} from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation'
import {programDetailTab} from "@/types/tabDataTypes";
import {useAppSelector,store} from "@/redux/store";
import { cabinetGrotesk } from '@/app/fonts';
import Kebab from "@/reuseable/Kebab/Kebab";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FiMoreVertical } from 'react-icons/fi';
import TruncatedTextWithTooltip from '@/reuseable/tool-tip/Truncated-textWith-tooltip';
import Modal from '@/reuseable/modals/TableModal';
import CreateProgram from "@/components/program/create-program";
import DeleteModal from '@/reuseable/modals/Delete-modal';
import {useDeleteProgramMutation} from '@/service/admin/program_query';
import Delete from "@/reuseable/details/DeleteCohort";
import {useToast} from "@/hooks/use-toast"
import DeletionRestrictionMessageProps from "@/components/cohort/DeletionRestrictionMessageProps";
import {Skeleton} from '@/components/ui/skeleton'
import { resetInitialProgramFormValue } from '@/redux/slice/program/programSlice';

interface props {
    children: React.ReactNode;
}


interface ApiError {
  status: number;
  data: {
      message: string;
  };
}

function ProgramLayout({children}:props) {
    const programId = useAppSelector(state => (state.program.currentProgramId))
    const programCurrentDetail = useAppSelector(state => (state?.program?.currentProgramDetailData))
    const [modalIsOpen,setIsModalOpen] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [modalType,setModalType] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const [deleteItem, {isLoading}] = useDeleteProgramMutation()

    const {toast} = useToast()

    const handleBackButtonClick=()=> {
        store.dispatch(resetInitialProgramFormValue())
        router.push("/program")
   }

   const dropDownOption = [
  
    {
      name: "Update",
      id: "1"
    },
   
   {
      name: "Delete",
      id: "3"
    }
  
  ]

  const handleDropdownClick = (id:string) => {
      if(id === "1") {
        if(programCurrentDetail?.numberOfLoanee === 0){
          setIsModalOpen(true)
          setModalType("update")
        } else {
          setIsModalOpen(true)
          setModalType("update")
        }
        
   } else if(id === "3"){
     if(programCurrentDetail?.numberOfLoanee === 0){
      setIsDeleteModal(true)
     }else{
      setIsModalOpen(true)
      setModalType("delete")
     }
   }
    
    }

    const handleDeleteAProgram = async (id: string) => {

      try {
          const itemDeleted = await deleteItem({id}).unwrap();
          if (itemDeleted) {
            setIsDeleteModal(false)
                  toast({
                      description: itemDeleted?.message,
                      status: "success",
                      duration: 2000
                  })
              router.push('/program')
          }

      } catch (error) {
          const err = error as ApiError;
          setError(err?.data?.message  )
      }
  }

  return (
    <div>
       <div className='px-6 md:px-8 md:py-3  py-4'>
        <BackButton id={'backorganizations'} textColor={'meedlBlue'} text={'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
        </div> 
       { programCurrentDetail?.isLoading === true ? <Skeleton className="h-12 w-[100px] bg-[#F6F6F6] "/> : <div className='flex justify-between items-center pr-8'>
        <div className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
         <TruncatedTextWithTooltip
         text= {programCurrentDetail?.programName || ""}
         className="max-w-[258px] md:max-w-[600px] "
         />
        </div>
         <div className='bg-[#F6F6F6] rounded-full w-8 h-8 flex items-center justify-center'>
          <Kebab
           icon={FiMoreVertical}
           kebabOptions={dropDownOption}
           handleDropDownClick={handleDropdownClick}
           contentStyle='min-w-[7rem] p-[1px] px-1'
           className='relative bottom-[1px] mt-1'
           />
         </div>
        </div>}
        <div>
        <TabSwitch tabData={programDetailTab} defaultTab='/organizations/detail' backClickRoutePath="/program" >
   {children}
    </TabSwitch>
        </div>
        <div>
          <Modal
           isOpen={modalIsOpen}
           closeOnOverlayClick={true}
           icon={Cross2Icon}
            headerTitle={modalType === "update" && programCurrentDetail?.numberOfLoanee === 0? "Edit program" : ""}
           closeModal={() => {
             setIsModalOpen(false)
           }}
           styeleType={ modalType === "delete" || (modalType === "update" && programCurrentDetail?.numberOfLoanee && programCurrentDetail?.numberOfLoanee > 0)? "styleBodyTwo" : "styleBody"}
          >
          
          { programCurrentDetail?.numberOfLoanee && programCurrentDetail?.numberOfLoanee > 0 && modalType === "update"?  <DeletionRestrictionMessageProps 
                     image= "/Icon - Warning.svg"
                    message={`This program can not be updated because it has Cohort that contains ${programCurrentDetail?.numberOfLoanee && programCurrentDetail?.numberOfLoanee > 1? "loanees" : "loanee"}`}
                    /> :
             modalType === "update"? <CreateProgram
             setIsOpen={setIsModalOpen}
             isEdit={true}
         /> : 
             <DeletionRestrictionMessageProps 
             message={`This program can not be deleted because it has Cohort that contains ${programCurrentDetail?.numberOfLoanee && programCurrentDetail?.numberOfLoanee > 1? "loanees" : "loanee"}`}
             /> 
          }
          </Modal>
        </div>
          <div>
           <DeleteModal
            isOpen={isDeleteModal}
            closeOnOverlayClick={true}
             width='auto'
            icon={Cross2Icon}
            closeModal={() => {
              setIsDeleteModal(false)
              setError("")
            }
            }
           >
            <Delete
            setIsOpen={() =>{ 
              setIsDeleteModal(false)
              setError("")
            }}
            headerTitle={'Program'}
            title={'program'}
            id={programId}
            handleDelete={handleDeleteAProgram}
            isLoading={isLoading}
            errorDeleting={error}
            />


           </DeleteModal>
          </div>
    </div>
  )
}

export default ProgramLayout
