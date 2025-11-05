"use client"
import React, { useState } from 'react'
import BackButton from "@/components/back-button";
import { inter } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import { bankAccounts } from './Payment';
import Image from 'next/image';
import { getInitial } from '@/utils/GlobalMethods';
import styles from "./index.module.css"
import { Button } from '@/components/ui/button';
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from '@radix-ui/react-icons';
import AddAccount from '@/components/loanee/Add-account';

function ViewLinkedAccount() {
    const router = useRouter()
    const [isOpen, setIsopen] = useState(false)

    const handleIsModalOpen = () => {
      setIsopen(true)
    }

  return (
    <div className={`${inter.className} px-6 py-6`}>
     <BackButton 
    id='routeButton'
    textColor={'meedlBlue'}
    text={'Back'} 
    iconBeforeLetters={true}
    handleClick={()=>{router.push("/payment")}}
    className='font-normal text-[14px]'
   />
     <div className='flex flex-col items-center justify-center mt-16 gap-y-2' >
        <p className='text-[#212221] font-medium'>Linked accounts</p>
        <p className='text-[14px] font-normal text-[#212221] px-[50px] md:px-[200px] lg:px-[350px] text-center'>Link another account for smooother nd faster payments. Easily switch between accounts to stay in control of how you pay.</p>
        <div className=' w-full px-[10px] md:px-[200px] lg:px-[335px] mt-2'>
        <div className='bg-[#F9F9F9] py-2 rounded-lg '>
        <section className={`h-[40vh] ${styles.container}`}>
            {
                
              bankAccounts?.map((account, index)=> {
                const initials = getInitial(account?.bankName)
                return (
               <div className={`px-8 py-3 `} key={index}>
                <div className='flex items-center gap-2 border-solid border-b border-[#D7D7D7]'>
                <div>
                {account.logo? <Image
                          src={account.logo}
                          alt={"bank-image"}
                          height={20}
                          width={20}
                          className="w-[27px] h-[27px] rounded-full"
                        /> : <div className="w-[27px] h-[27px] text-[12px] flex items-center justify-center rounded-full bg-[#F3F8FF]">
                           {initials}
                          </div>}
              </div>
               <div>
               <p className='text-[#212221] font-medium'>{account?.bankName}</p>
                <p className='text-[#4D4E4D] font-normal text-[14px] mb-1'>{account?.accountNumber}</p>
               </div>
               </div>
               </div>
  )})   
            }
            </section>
            <div className='flex items-center justify-end  relative bottom-7'>
                <Button
                variant={'ghost'}
                className='text-[#142854] text-[14px] font-medium'
                onClick={handleIsModalOpen}
                >
                + Add new account   
                </Button>
               
            </div>
        </div>
        </div>
     </div>
     <div>
      <Modal
       isOpen={isOpen}
       closeModal={()=> setIsopen(false)}
       closeOnOverlayClick={true}
        icon={Cross2Icon}
        styeleType='styleBodyThree'
      >
        <AddAccount/>
      </Modal>
     </div>
    </div>
  )
}

export default ViewLinkedAccount
