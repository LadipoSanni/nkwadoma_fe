'use client'
import React, { useState } from 'react';
// import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { cabinetGrotesk, inter } from '@/app/fonts';
import Connector from "@/components/common/Connector";
import { Button } from "@/components/ui/button";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import StepContent from '@/features/onboarding/stepContent/Index';

const steps = [
    'Loan application details',
    'Verify your identity',
    'Additional information',
    'Confirm loan application'
];

const LoaneeOnboarding = () => {
    // const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div id="loanApplicationDetailsContainer"
             className={`md:overflow-visible overflow-y-auto h-[calc(100vh-8rem)] md:h-auto grid pr-1.5 md:gap-[58px] gap-6 ${inter.className}`}>
            <header id="loanReferralAcceptanceHeader"
                    className={'flex items-start border-b-lightBlue250 border-b border-solid w-full  py-5'}>
                <h1 id="loanReferralAcceptanceTitle"
                    className={`${cabinetGrotesk.className} md:text-[28px] text-[16px] leading-[120%]`}>Loan referral
                    acceptance process</h1>
            </header>
            <div id="loanApplicationStepsContainer" className={'md:flex md:justify-between grid gap-5 md:gap-0'}>
                <aside id="loanApplicationStepsAside" className={'inline-flex flex-col items-start gap-1'}>
                    {
                        steps.map((step, index) => (
                            <div key={index} id={`loanApplicationStep${index}`} className={'flex gap-2'}>
                                <Connector showLine={index < steps.length - 1}/>
                                <p id={`loanApplicationStepText${index}`}
                                   className={'text-meedlBlue text-[14px] leading-[150%]'}>{step}</p>
                            </div>
                        ))
                    }
                </aside>
                <section id="loanApplicationDetailsSection"
                         className={'grid md:p-5 py-5 px-3 md:gap-[22px] gap-5 md:w-[43vw] w-full md:max-h-[calc(100vh-19rem)] md:overflow-y-auto rounded-md border border-lightBlue250 '}>
                    <h2 id="loanApplicationDetailsTitle"
                        className={`${cabinetGrotesk.className} text-labelBlue md:text-[20px] text-[16px] leading-[120%]`}>Loan
                        application details</h2>
                        <StepContent step={currentStep} />
                    <Button id="continueButton"
                            className={'bg-meedlBlue rounded-md  h-[2.8125rem] w-[6.375rem] self-end justify-self-end hover:bg-meedlBlue focus:bg-meedlBlue'}
                            onClick={() => setCurrentStep((prevStep) => (prevStep + 1) % steps.length)}>
                        Continue
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default LoaneeOnboarding;
// LoaneeOnboarding