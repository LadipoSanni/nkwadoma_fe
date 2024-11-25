'use client'
import React, { useState } from 'react';
import { cabinetGrotesk, inter } from '@/app/fonts';
import Connector from "@/components/common/Connector";
import { Button } from "@/components/ui/button";
import StepContent from '@/features/onboarding/stepContent/Index';
// import SmartCameraWrapper from '@/components/SmartCameraWrapper/Index';
import IdentityVerificationModal from '@/reuseable/modals/IdentityVerificationModal';

const steps = [
    'Loan application details',
    'Verify your identity',
    'Additional information',
    'Confirm loan application'
];

// interface PublishData {
//     partner_params: {
//         libraryVersion: string;
//         permissionGranted: boolean;
//     };
//     images: {
//         file: string;
//         image_type_id: number;
//         image: string;
//     }[];
// }

const LoaneeOnboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showModal, setShowModal] = useState(false);
    // const [showCamera, setShowCamera] = useState(false);

    // const handlePublish = async (data: PublishData) => {
    //     try {
    //         const response = await postContent(data);
    //         console.log('Liveness check result:', response);
    //         setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    //         // setShowCamera(false);
    //         setShowModal(false);
    //     } catch (error) {
    //         console.error('Liveness check failed:', error);
    //     }
    // };

    // const postContent = async (data: PublishData) => {
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     };
    //
    //     try {
    //         const response = await fetch("/", options);
    //         const json = await response.json();
    //         return json;
    //     } catch (e) {
    //         throw e;
    //     }
    // };

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
                                <Connector
                                    showLine={index < steps.length - 1}
                                    isActive={index === currentStep}
                                    isCompleted={index < currentStep}
                                />
                                <p id={`loanApplicationStepText${index}`}
                                   className={`text-[14px] leading-[150%] ${index <= currentStep ? 'text-meedlBlue' : 'text-blue300'}`}>{step}</p>
                            </div>
                        ))
                    }
                </aside>
                <section id="loanApplicationDetailsSection"
                         className={'grid md:p-5 py-5 px-3 md:gap-[22px] gap-5 md:w-[43vw] w-full md:max-h-[calc(100vh-19rem)] md:overflow-y-auto rounded-md border border-lightBlue250 '}>
                    <h2 id="loanApplicationDetailsTitle"
                        className={`${cabinetGrotesk.className} text-labelBlue md:text-[20px] text-[16px] leading-[120%]`}>
                        {currentStep === 0 && 'Loan application details'}
                        {currentStep === 1 && 'Verify your identity'}
                        {currentStep === 2 && 'Additional information'}
                        {currentStep === 3 && 'Confirm loan referral acceptance'}
                    </h2>
                    <StepContent step={currentStep}/>
                    {/* {currentStep === 1 && showCamera && <SmartCameraWrapper onPublish={handlePublish} onClose={() => setShowCamera(false)} />} */}
                    {currentStep === 1 && <IdentityVerificationModal isOpen={showModal} onClose={() => setShowModal(false)} />}
                    <Button id="continueButton"
                            className={'bg-meedlBlue text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem]  hover:bg-meedlBlue focus:bg-meedlBlue'}
                            onClick={() => currentStep === 1 ? setShowModal(true) : setCurrentStep((prevStep) => (prevStep + 1) % steps.length)}>
                        {currentStep === 1 ? 'Start identity verification' : 'Continue'}
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default LoaneeOnboarding;