'use client'
import React from 'react'
import TabSwitch from '../tabLayoutTwo';
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation'
import { loanProductTab } from "@/types/tabDataTypes";
import {useAppSelector} from "@/redux/store";
import { cabinetGrotesk } from '@/app/fonts';
import Kebab from "@/reuseable/Kebab/Kebab";
// import { Cross2Icon } from "@radix-ui/react-icons";
import { FiMoreVertical } from 'react-icons/fi';
import TruncatedTextWithTooltip from '@/reuseable/tool-tip/Truncated-textWith-tooltip';

interface props {
    children: React.ReactNode;
}

function LoanProductDetailsLayout({children}:props) {
    const loanProductName = useAppSelector(state => (state?.loanProduct?.loanProductName))
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
        router.push("/loan-product/step-one")
   }
    
    //   else if(id === "2") {
    //     setCohortId(String(row.id))
    //     if(cohortId){
    //       await refetch()
    //       setTimeout(()=>{ setIsOpen(true)},800)
    //     }
    //     setTimeout(()=>{ setIsOpen(true)},800)
        
      
    //   }
    //   else {
    //     setCohortId(String(row.id))
    //     setIsDeleteOpen(true)
    //   }
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
         <div className='bg-[#F6F6F6] rounded-full w-8 h-8  items-center justify-center hidden'>
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
    </div>
  )
}

export default LoanProductDetailsLayout
