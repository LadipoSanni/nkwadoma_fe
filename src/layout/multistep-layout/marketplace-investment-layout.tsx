'use client';
import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import {marketplaceInvestment} from '@/types/tabDataTypes'
import BackButton from '@/components/back-button';
import MultiStep from '@/reuseable/multiStep-component';


interface props {
    children: React.ReactNode;
}

function MarketplaceInvestmentLayout({children}:props) {
    const pathname = usePathname();
    const router = useRouter();
    const currentStep = pathname?.split('/').pop() || 'transfer';
    const currentIndex = marketplaceInvestment.findIndex(step => step.id === currentStep);
    const completedSteps = marketplaceInvestment.slice(0, currentIndex).map(step => step.id);

    const handleBack=()=> {
        router.push("/marketplace")

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
                <div><MultiStep steps={marketplaceInvestment} currentStep={currentStep} completedSteps={completedSteps}/></div>

                <div className="w-full mt-4 md:mt-0 ">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MarketplaceInvestmentLayout
