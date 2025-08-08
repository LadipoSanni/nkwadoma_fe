import React from 'react'
import { inter } from '@/app/fonts';

interface Props{
    currentStep: number;
    totalSteps: number;
   
}


function CenterMultistep({currentStep,totalSteps}: Props) {
  return (
    <div className={`mb-6 ${inter.className}`}>
      <p className="text-sm font-medium text-[#4D4E4D]">
        Step {currentStep} of {totalSteps}
      </p>
      <div className="flex mt-1 w-20">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 mx-[1px] rounded-full ${
              i < currentStep ? 'bg-[#142854]' : 'bg-[#D9EAFF]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default CenterMultistep
