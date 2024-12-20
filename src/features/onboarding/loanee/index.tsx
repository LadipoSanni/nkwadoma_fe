'use client';

import React, {useEffect, useState} from 'react';
import { cabinetGrotesk, inter } from '@/app/fonts';
import Connector from '@/components/common/Connector';
import { Button } from '@/components/ui/button';
import StepContent from '@/features/onboarding/stepContent/Index';
import dynamic from 'next/dynamic';
import {
    useLazyIsIdentityVerifiedQuery, useRespondToLoanReferralMutation,
    useViewLoanReferralDetailsQuery
} from "@/service/users/Loanee_query";
import {useRouter} from "next/navigation";


const DynamicIdentityVerificationModal = dynamic(() => import('@/reuseable/modals/IdentityVerificationModal'), {
    ssr: false
});

const steps = [
    'Loan application details',
    'Verify your identity',
    'Current information',
    'Confirm loan application'
];

const LoaneeOnboarding = () => {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [loanReferralId, setLoanReferralId] = useState("");
    const {data, isLoading: loanReferralDetailsIsLoading} = useViewLoanReferralDetailsQuery({})
    const [respondToLoanReferral ]= useRespondToLoanReferralMutation({})
    const [triggerVerification, { data: verificationFirstResponse }] = useLazyIsIdentityVerifiedQuery();
    const [loaneeLoanDetail, setLoaneeLoanDetail] = useState({
        tuitionAmount: "0.00",
        amountRequested: "0.00",
        initialDeposit: "0.00",
        referredBy: "",
    })
    function viewLoanReferralDetails  (){
        if (data?.statusCode === "OK" &&  data?.data?.id){
            setLoanReferralId((prevId) => {
                return data.data.id || prevId;
            });
        }
        if (data?.statusCode === "OK" && data?.data) {
            const backendDetails = data.data;
            setLoaneeLoanDetail(prevState => {
                const newDetails = {
                    tuitionAmount: backendDetails.tuitionAmount?.toString() || "0.00",
                    amountRequested: backendDetails.amountRequested?.toString() || "0.00",
                    initialDeposit: backendDetails.initialDeposit?.toString() || "0.00",
                    referredBy: backendDetails.referredBy
                };
                if (
                    prevState.tuitionAmount !== newDetails.tuitionAmount ||
                    prevState.amountRequested !== newDetails.amountRequested ||
                    prevState.initialDeposit !== newDetails.initialDeposit ||
                    prevState.referredBy !== newDetails.referredBy
                ) {
                    return newDetails;
                }
                return prevState;
            });
            if (backendDetails.loanReferralStatus === "AUTHORIZED"){
                setCurrentStep(1)
                router.push("/overview");
            }
        }
    }
    useEffect(() => {
            viewLoanReferralDetails()
    }, [loanReferralDetailsIsLoading]);
    const handleThirdStepContinue = () => {
        setShowModal(false);
        setCurrentStep(2);
    };
    const handleAcceptLoanReferral = async () =>{
        triggerVerification({ loanReferralId });
        const requestData = {
            "id": loanReferralId,
            "loanReferralStatus": "ACCEPTED"
        }
        const response = await respondToLoanReferral(requestData).unwrap()
        console.log(response)

        if (verificationFirstResponse?.data === "Identity Not Verified") {
            console.log(verificationFirstResponse.data)
        }
    }
    const handleNext = ()=>{
        if (currentStep === 0){
            handleAcceptLoanReferral()
        }
        if (currentStep === 1) {
            setShowModal(true);
        } else {
            setCurrentStep(currentStep + 1);
        }

    }
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
                    {steps.map((step, index) => (
                        <div key={index} id={`loanApplicationStep${index}`} className={'flex gap-2'}>
                            <Connector
                                showLine={index < steps.length - 1}
                                isActive={index === currentStep}
                                isCompleted={index < currentStep}
                            />
                            <p id={`loanApplicationStepText${index}`}
                               className={`text-[14px] leading-[150%] ${index <= currentStep ? 'text-meedlBlue' : 'text-blue300'}`}>
                                {step}
                            </p>
                        </div>
                    ))}
                </aside>
                <section id="loanApplicationDetailsSection"
                         className={'grid md:p-5 py-5 px-3 md:gap-[22px] gap-5 md:w-[43vw] w-full md:max-h-[calc(100vh-19rem)] md:overflow-y-auto rounded-md border border-lightBlue250 '}>
                    <h2 id="loanApplicationDetailsTitle"
                        className={`${cabinetGrotesk.className} text-labelBlue md:text-[20px] text-[16px] leading-[120%]`}>
                        {currentStep === 0 && 'Loan application details'}
                        {currentStep === 1 && 'Verify your identity'}
                        {currentStep === 2 && 'Current information'}
                        {currentStep === 3 && 'Confirm loan referral acceptance'}
                    </h2>
                    <StepContent step={currentStep} setCurrentStep={setCurrentStep} loaneeLoanDetail={loaneeLoanDetail} />
                    {currentStep === 1 && (
                        <DynamicIdentityVerificationModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onThirdStepContinue={handleThirdStepContinue}
                            loanReferralId={loanReferralId}
                        />
                    )}
                    {(currentStep === 0 || currentStep === 1) && (
                        <Button
                            id="continueButton"
                            className={'bg-meedlBlue text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem] hover:bg-meedlBlue focus:bg-meedlBlue'}
                            onClick={handleNext}
                        >
                            {currentStep === 1 ? 'Start identity verification' : 'Continue'}
                        </Button>
                    )}
                </section>
            </div>
        </div>
    );
};

export default LoaneeOnboarding;