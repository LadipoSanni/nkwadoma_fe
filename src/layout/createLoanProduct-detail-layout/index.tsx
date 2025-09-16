'use client'
import React from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation'
import { loanProductTab } from "@/types/tabDataTypes";
import {useAppSelector} from "@/redux/store";
import { cabinetGrotesk } from '@/app/fonts';

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
        <div className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
         {loanProductName}
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
