import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cabinetGrotesk, inter } from '@/app/fonts';
import { setCurrentStep, setLoanReferralStatus } from '@/service/users/loanRerralSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const steps = [
    'Loan application details',
    'Verify your identity',
    'Current information',
    'Confirm loan application'
];

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

const SuccessDialog: React.FC<VerificationSuccessDialogProps> = ({ open, onClose, onContinue, title, message, buttonText, routeToOverview, stopCamera }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleContinue = () => {
        if (stopCamera) {
            stopCamera();
        }
        dispatch(setCurrentStep(steps.length - 1));
        dispatch(setLoanReferralStatus('AUTHORIZED'));
        onContinue();
        if (routeToOverview) {
            router.push('/overview');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            {/*<DialogOverlay className="bg-[rgba(52,64,84,0.70)] " />*/}
            <DialogContent className={'max-w-[350px] md:max-w-[416px] [&>button]:hidden gap-5 py-5 px-5'}>
                <DialogHeader>
                    <DialogTitle className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>
                        <Image id={'successIcon'} data-testid={'successIcon'} width={70} height={70} src={'/Icon - Success (1).svg'} alt={'success icon'} priority={true} />
                    </DialogTitle>
                </DialogHeader>
                <section className={`${inter.className} grid gap-7`}>
                    <div className={`grid gap-2`}>
                        <h1 className={`${cabinetGrotesk.className} text-black500 text-[24px] leading-[120%] font-medium`}>{title}</h1>
                        <p className={'text-gray1 text-[14px] leading-[150%] font-normal'}>{message}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button className="h-[3.5625rem] text-[14px] font-semibold leading-[150%] w-[8.75rem] px-5 py-3 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md" onClick={handleContinue}>
                            {buttonText}
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessDialog;