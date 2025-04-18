'use client'
import React from 'react'
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation';

function BackToInvestmentVehicleDetail() {
    const router = useRouter()

    const handleBack = () => {
       router.push("/vehicle/details")
    }
  return (
    <div className='mb-16 mt-7 px-10'>
      <BackButton
        handleClick={handleBack}
        iconBeforeLetters={true}
        text={"Back"}
        textColor={'#142854'}
        id={"backButtonToVehicleDetail"}
      />
    </div>
  )
}

export default  BackToInvestmentVehicleDetail
