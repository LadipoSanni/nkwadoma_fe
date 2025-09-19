'use client'
import React from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation'
import { loanProductTab } from "@/types/tabDataTypes";
import {useAppSelector} from "@/redux/store";
import { cabinetGrotesk } from '@/app/fonts';
import Kebab from "@/reuseable/Kebab/Kebab";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FiMoreVertical } from 'react-icons/fi';

interface props {
    children: React.ReactNode;
}

function LoanProductDetailsLayout({children}:props) {
    const loanProductName = useAppSelector(state => (state?.loanProduct?.loanProductName))
    const router = useRouter()

    const handleBackButtonClick=()=> {
        router.push("/loan-product")
   }
  return (
    <div>
       <div className='px-6 md:px-8 md:py-3  py-4'>
        <BackButton id={'backorganizations'} textColor={'meedlBlue'} text={'Back'} iconBeforeLetters={true} handleClick={handleBackButtonClick}/> 
        </div> 
        <div className='flex justify-between items-center pr-8'>
        <p className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
         {loanProductName}
        </p>
         <div className='bg-[#F6F6F6] rounded-full w-8 h-8 flex items-center justify-center'>
          <Kebab
           icon={FiMoreVertical}
           />
         </div>
        </div>
        <div>
        <TabSwitch tabData={loanProductTab} defaultTab='/organizations/detail'>
   {children}
    </TabSwitch>
        </div>
    </div>
  )
}

export default LoanProductDetailsLayout
