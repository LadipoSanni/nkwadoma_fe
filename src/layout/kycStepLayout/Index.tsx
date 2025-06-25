'use client';
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { kycSteps } from '@/types/tabDataTypes'
import BackButton from '@/components/back-button';
import MultiStep from '@/reuseable/multiStep-component';
import {inter} from "@/app/fonts";


interface props {
    children: React.ReactNode;
}

function KycStepLayout({children}:props) {
    const pathname = usePathname();
    const router = useRouter();
    const currentStep = pathname?.split('/').pop() || 'identification';
    const currentIndex = kycSteps.findIndex(step => step.id === currentStep);
    const completedSteps = kycSteps.slice(0, currentIndex).map(step => step.id);

    const handleBack=()=> {
            router.push("/Overview")
    }
    return (
        <div className={`${inter.className} md:px-10 px-4  py-4 grid grid-cols-1 gap-y-10`}>
            <div>
                <BackButton
                    id="createFundBackButton"
                    handleClick={handleBack}
                    iconBeforeLetters={true}
                    text='Back'
                    textColor=''
                />
            </div>
            <div className="md:flex  md:gap-5">
                <div><MultiStep steps={kycSteps} currentStep={currentStep} completedSteps={completedSteps}/></div>

                <div className="w-full mt-4 md:mt-0 ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default KycStepLayout
