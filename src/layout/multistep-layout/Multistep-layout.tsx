'use client';
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { steps } from '@/types/tabDataTypes'
import BackButton from '@/components/back-button';
import {useAppSelector} from "@/redux/store";
import MultiStep from '@/reuseable/multiStep-component';


interface props {
    children: React.ReactNode;
}

function MultistepLayout({children}:props) {
    const pathname = usePathname();
  const router = useRouter();
  const currentStep = pathname?.split('/').pop() || 'setup';
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const vehicleType = useAppSelector(state => (state.vehicle?.vehicleType))
  const completedSteps = steps.slice(0, currentIndex).map(step => step.id);

  const handleBack=()=> {
    if(vehicleType === "commercial"){
        router.push("/vehicle/commercial-vehicle")
    }else {
        router.push("/vehicle/endownment-vehicle")
    }
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
        <div className="md:flex  md:gap-10">
     <div><MultiStep steps={steps} currentStep={currentStep} completedSteps={completedSteps}/></div> 
      
      <div className="w-full mt-4 md:mt-0 ">
        {children}
      </div>
    </div>
    </div>
  )
}

export default MultistepLayout
