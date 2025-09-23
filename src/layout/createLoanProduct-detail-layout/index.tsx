'use client'
import React,{useState} from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation'
import { loanProductTab } from "@/types/tabDataTypes";
import {useAppSelector,store} from "@/redux/store";
import { cabinetGrotesk } from '@/app/fonts';
import Kebab from "@/reuseable/Kebab/Kebab";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FiMoreVertical } from 'react-icons/fi';
import TruncatedTextWithTooltip from '@/reuseable/tool-tip/Truncated-textWith-tooltip';
import {setIsEdit } from "@/redux/slice/loan-product/Loan-product";
import Modal from '@/reuseable/modals/TableModal';
import Image from 'next/image';
import { inter } from '@/app/fonts';
import DeleteModal from '@/reuseable/modals/Delete-modal';
import  DeleteLoanProduct  from '@/reuseable/details/DeleteCohort';

interface props {
    children: React.ReactNode;
}

function LoanProductDetailsLayout({children}:props) {
    const loanProductName = useAppSelector(state => (state?.loanProduct?.loanProductName))
    const totalNumberOfLoaneesInLoanProduct = useAppSelector(state => (state?.loanProduct?.totalNumberOfLoaneess))
    const [modalIsOpen,setIsModalOpen] = useState(false)
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [modalType,setModalType] = useState("")
    const router = useRouter()

    const handleBackButtonClick=()=> {
        router.push("/loan-product")
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
        if(totalNumberOfLoaneesInLoanProduct === 0){
          store.dispatch(setIsEdit(true))
          router.push("/loan-product/step-one")
        }else {
          setIsModalOpen(true)
          setModalType("update")
        }
   } else if(id === "3"){
     if(totalNumberOfLoaneesInLoanProduct === 0){
      setIsDeleteModal(true)
     }else{
      setIsModalOpen(true)
      setModalType("delete")
     }
   }
    
    }

  return (
    <div>
       <div className='px-6 md:px-8 md:py-3  py-4'>
        <BackButton id={'backorganizations'} textColor={'meedlBlue'} text={'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
        </div> 
        <div className='flex justify-between items-center pr-8'>
        <div className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
         <TruncatedTextWithTooltip
         text= {loanProductName}
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
        </div>
        <div>
        <TabSwitch tabData={loanProductTab} defaultTab='/organizations/detail'>
   {children}
    </TabSwitch>
        </div>
        <div>
          <Modal
           isOpen={modalIsOpen}
           closeOnOverlayClick={true}
           icon={Cross2Icon}
            headerTitle=''
           closeModal={() => {
             setIsModalOpen(false)
           }}
           styeleType="styleBodyTwo"
          >
          <div className={`${inter.className}`}>
            <div>
            <Image
             src={modalType === "update"? "/Icon - Warning.svg" : "/Inner circle (1).png"}
             alt='image'
             width={30}
             height={30}
             className={` ${modalType === "update"? "w-14" : "w-11"} `}
            />
            </div>
            <p className='mt-4 mb-5 text-[14px] text-[#475467]'> 
              {
                modalType === "update"? "Updates are restricted for loan products associated with existing loanees." : "Deletion is restricted for loan products associated with existing loanees."
              }
              
              </p>
          </div>
          </Modal>
        </div>
          <div>
           <DeleteModal
            isOpen={isDeleteModal}
            closeOnOverlayClick={true}
             width='auto'
            icon={Cross2Icon}
            closeModal={() => setIsDeleteModal(false)}
           >
            <DeleteLoanProduct
            setIsOpen={() => setIsDeleteModal(false)}
            headerTitle='loan product'
            title='loan product'
            id=""
            handleDelete={() => {}}
           
            />

           </DeleteModal>
          </div>
    </div>
  )
}

export default LoanProductDetailsLayout
