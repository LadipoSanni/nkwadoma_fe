'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {RootState, store, useAppSelector} from '@/redux/store';
import { setLoanReferralStatus, setCurrentStep, setLoaneeIdentityVerifiedStatus } from '@/service/users/loanRerralSlice';
import { useViewLoanReferralDetailsQuery, useRespondToLoanReferralMutation } from "@/service/users/Loanee_query";
import { Button } from '@/components/ui/button';
import StepContent from '@/features/onboarding/stepContent/Index';
import dynamic from 'next/dynamic';
import { cabinetGrotesk, inter } from '@/app/fonts';
import Connector from '@/components/common/Connector';
import {setCurrentNavbarItem, setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";
import Isloading from "@/reuseable/display/Isloading";
import { useToast } from "@/hooks/use-toast";

const DynamicIdentityVerificationModal = dynamic(() => import('@/reuseable/modals/IdentityVerificationModal'), {
    ssr: false
});

const steps = [
    'Loan application details',
    'Verify your identity',
    'Current information',
    'Confirm loan application'
];

interface BackendDetails {
    loanReferralStatus: string;
    id: string;
}

interface ApiError {
    status: number;
    data: {
      message: string;
    };
  }

const LoaneeOnboarding = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentStep } = useSelector((state: RootState) => state.loanReferral);
    const [showModal, setShowModal] = useState(false);
    const id = useAppSelector(state => state.selectedLoan.loanReferralId)
    const { data, isLoading: loanReferralDetailsIsLoading } = useViewLoanReferralDetailsQuery(id,{skip: !id});
    const [respondToLoanReferral, {isLoading}] = useRespondToLoanReferralMutation({});
    const [loanReferralId, setLoanReferralId] = useState("");
    const [backendDetails, setBackendDetails] = useState<BackendDetails | null>(null);
    const { toast } = useToast();

    

    useEffect(() => {
        if ( data?.data?.identityVerified  === true  ){
            dispatch(setLoaneeIdentityVerifiedStatus(true))
            store.dispatch(setCurrentNavBottomItem('Overview'))
            store.dispatch(setCurrentNavbarItem('Overview'))
            // router.push('/overview')
        }
        if (data?.statusCode === "OK" && data?.data?.id) {
            setLoanReferralId(data?.data?.id);
            dispatch(setLoanReferralStatus(data?.data?.loanReferralStatus));
            store.dispatch(setCurrentNavBottomItem('Verification'))
            store.dispatch(setCurrentNavbarItem('Verification'))
        }

        if (data?.statusCode === "OK" && data?.data) {
            setBackendDetails(data.data);
        }

    }, [data, loanReferralDetailsIsLoading, currentStep,dispatch,router]);




    const handleNext = () => {
        if (currentStep === 0) {
            if (backendDetails?.loanReferralStatus === "PENDING") {
                handleAcceptLoanReferral();
            } else if (backendDetails?.loanReferralStatus === "AUTHORIZED") {
                dispatch(setCurrentStep(currentStep + 1));
            }
        } else if (currentStep === 1) {
            setShowModal(true);
        } else {
            dispatch(setCurrentStep(currentStep + 1));
        }
    };

    const handleAcceptLoanReferral = async () => {
        try {
            const requestData = {
                id: loanReferralId,
                loanReferralStatus: "ACCEPTED"
            };
            if (requestData.id) {
               const result =  await respondToLoanReferral(requestData).unwrap();
               if(result && !data?.data?.identityVerified ){
                dispatch(setCurrentStep(currentStep + 1));
               }else {
                store.dispatch(setCurrentNavBottomItem('Overview'))
                router.push("/overview")
               }
            } 

           
            
        } catch (err) {
            const error = err as ApiError;
            toast({
                description: error?.data?.message || "Error occured",
                status: "error",
            })
        }
       
    };

    

     const acceptAndRouteToOverview = () => {
        handleAcceptLoanReferral()
        toast({
            description: "Loan Referral accepted successfully",
            status: "success",
        })
       
     }

    const handleThirdStepContinue = () => {
        setShowModal(false);
        dispatch(setCurrentStep(2));
    };

    return (
        <div id="loanApplicationDetailsContainer" className={`md:overflow-visible overflow-y-auto h-[calc(100vh-8rem)] md:h-auto grid pr-1.5 md:gap-[58px] gap-6 md:px-10 ${inter.className}`}>
            <header id="loanReferralAcceptanceHeader" className={'flex items-start border-b-lightBlue250 border-b border-solid w-full py-5'}>
                <h1 id="loanReferralAcceptanceTitle" className={`${cabinetGrotesk.className} md:text-[28px] text-[16px] leading-[120%]`}>Loan referral acceptance process</h1>
            </header>
            <div id="loanApplicationStepsContainer" className={'md:flex md:justify-between grid gap-5 md:gap-0'}>
                <aside id="loanApplicationStepsAside" className={'inline-flex flex-col items-start gap-1'}>
                    {steps.map((step, index) => (
                        <div key={index} id={`loanApplicationStep${index}`} className={'flex gap-2'}>
                            <Connector showLine={index < steps.length - 1} isActive={index === currentStep} isCompleted={index < currentStep} />
                            <p id={`loanApplicationStepText${index}`} className={`text-[14px] leading-[150%] ${index <= currentStep ? 'text-meedlBlue' : 'text-blue300'}`}>
                                {step}
                            </p>
                        </div>
                    ))}
                </aside>
                <section id="loanApplicationDetailsSection" className={'grid md:p-5 py-5 px-3 md:gap-[22px] gap-5 md:w-[43vw] w-full rounded-md border border-lightBlue250'}>
                    <h2 id="loanApplicationDetailsTitle" className={`${cabinetGrotesk.className} text-labelBlue md:text-[20px] text-[16px] leading-[120%] font-bold`}>
                        {currentStep === 0 && 'Loan application details'}
                        {currentStep === 1 && 'Verify your identity'}
                        {currentStep === 2 && 'Additional information'}
                        {currentStep === 3 && 'Confirm loan referral acceptance'}
                    </h2>
                    <div className='md:max-h-[calc(100vh-26rem)] md:overflow-y-auto pr-4'>
                    <StepContent step={currentStep} setCurrentStep={(step) => dispatch(setCurrentStep(step))} loaneeLoanDetail={data?.data} />
                    </div>
                    
                    {currentStep === 1 && (
                        <DynamicIdentityVerificationModal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            onThirdStepContinue={handleThirdStepContinue}
                            loanReferralId={loanReferralId}
                        />
                    )}
                    { data?.data?.identityVerified ? (
                         <Button
                         id="acceptButton"
                         onClick={acceptAndRouteToOverview}
                         disabled={data?.data?.loanReferralStatus === "AUTHORIZED" || isLoading}
                         variant={'secondary'}
                         className={`${data?.data?.loanReferralStatus === "AUTHORIZED"? "bg-neutral650 cursor-auto hover:bg-neutral650" : "bg-meedlBlue"} text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem]`}
                         >
                             {
                               isLoading ? <Isloading/> : "Accept"  
                             }
                             
                         </Button>
                    ) : !data?.data?.identityVerified && (currentStep === 0 || currentStep === 1) && (
                         <Button
                         id="continueButton"
                         className={'bg-meedlBlue text-meedlWhite text-[14px] font-semibold leading-[150%] rounded-md self-end py-3 px-5 justify-self-end h-[2.8125rem]'}
                         onClick={handleNext}
                         disabled={isLoading}
                         variant={'secondary'}
                     >
                         { isLoading ? <Isloading/> :
                             <>
                                 {currentStep === 1 ? 'Start identity verification' : 'Continue'}
                             </>
                         }

                     </Button>
                    )
                }
                </section>
            </div>
        </div>
    );
};

export default LoaneeOnboarding;