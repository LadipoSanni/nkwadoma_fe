'use client';
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { createLoanProductSteps } from '@/types/tabDataTypes'
import BackButton from '@/components/back-button';
import MultiStep from '@/reuseable/multiStep-component';
import {cabinetGrotesk} from "@/app/fonts";

interface props {
    children: React.ReactNode;
}

function CreateLoanProductStep({children}:props) {
   const pathname = usePathname();
   const router = useRouter();
   const currentStep = pathname?.split('/').pop() || 'stepOne';
   const currentIndex =createLoanProductSteps.findIndex(step => step.id === currentStep);
   const completedSteps = createLoanProductSteps.slice(0, currentIndex).map(step => step.id);

   const handleBack=()=> {
       router.push("/loan-product")
  }

  return (
    <div className='md:px-10 px-4  py-4 grid grid-cols-1 gap-y-10'>
        <div>
         <BackButton
           id="createFundBackButton" 
           handleClick={handleBack}
           iconBeforeLetters={true}
           text='Back'
           textColor='' 
         />
        </div>
         <div className={`md:px-10 px-8 text-[28px] font-medium ${cabinetGrotesk.className}`}>
                    {/* {organizationName} */}
                </div>
        <div className="md:flex  md:gap-10">
     <div><MultiStep steps={createLoanProductSteps} currentStep={currentStep} completedSteps={completedSteps}/></div> 
      
      <div className="w-full mt-4 md:mt-0 ">
        {children}
      </div>
    </div>
    </div>
  )
}

export default CreateLoanProductStep
