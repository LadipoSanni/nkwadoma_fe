import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cabinetGrotesk, inter } from '@/app/fonts';
import { setCurrentStep, setLoanReferralStatus } from '@/service/users/loanRerralSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store';

interface VerificationSuccessDialogProps {
    open: boolean;
    onClose: () => void;
    onContinue: () => void;
    title: string;
    message: string;
    buttonText: string;
    routeToOverview?: boolean;
    stopCamera?: () => void;
}

const steps = [
    'Loan application details',
    'Verify your identity',
    'Current information',
    'Confirm loan application'
];

const WarningModal = ({ open, onClose, onContinue, title, message, buttonText, routeToOverview, stopCamera }: VerificationSuccessDialogProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
     const isAdditionalDetailComplete = useAppSelector(store => store?.loanReferral?.isAdditionalDetailComplete)

    const handleContinue = () => {
        if (stopCamera) {
            stopCamera();
        }
        if(isAdditionalDetailComplete){
            router.push('/overview');
        }else{
         dispatch(setCurrentStep(steps.length - 1));
         onContinue();
        }
        dispatch(setLoanReferralStatus('AUTHORIZED'));
        if (routeToOverview) {
            router.push('/overview');
        }
    };

    return (
        <Dialog  open={open} onOpenChange={onClose}>
            <DialogContent 
            id={'warningModalOnVerification'} className={'max-w-[350px] md:max-w-[416px] [&>button]:hidden gap-5 py-5 px-5'}
            onInteractOutside={(e) => e.preventDefault()} 
            onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle  className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>
                        <Image id={'warningIcon'} data-testid={'warningIcon'} width={70} height={70} src={'/Icon - Warning.svg'} alt={'warning icon'} priority={true} />
                    </DialogTitle>
                </DialogHeader>
                <section className={`${inter.className} grid gap-7`}>
                    <div className={`grid gap-2`}>
                        <h1 id={'modalTitle'} className={`${cabinetGrotesk.className} text-black500 text-[24px] leading-[120%] font-medium`}>{title}</h1>
                        <p  id={'modalMessage'} className={'text-gray1 text-[14px] leading-[150%] font-normal'}>{message}</p>
                    </div>
                    <div className="flex justify-end">
                        <button 
                        id={'actionButton'} 
                        className="h-[3.5625rem] text-[14px] font-semibold leading-[150%] w-[8.75rem] px-5 py-3  text-white rounded-md hover:bg-[#435376] bg-meedlBlue" 
                        onClick={handleContinue}
                         type='button'
                        >
                            {buttonText}
                        </button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default WarningModal;