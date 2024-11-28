import React from 'react';
import { cabinetGrotesk, inter } from '@/app/fonts';
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface VerificationSuccessDialogProps {
    open: boolean;
    onClose: () => void;
    onContinue: () => void;
}

const VerificationSuccessDialog: React.FC<VerificationSuccessDialogProps> = ({ open, onClose, onContinue  }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]" />
            <DialogContent className={'max-w-[425px] md:max-w-[460px] [&>button]:hidden gap-5 py-5 px-5'}>
                <DialogHeader>
                    <DialogTitle
                        className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>
                        <Image
                            id={'successIcon'}
                            data-testid={'successIcon'}
                            width={70}
                            height={70}
                            src={'/Icon - Success (1).svg'}
                            alt={'success icon'}
                            priority={true}
                        />
                    </DialogTitle>
                </DialogHeader>
                <section className={'grid gap-7'}>
                    <div className={`${inter.className} grid gap-2`}>
                        <h1 className={`${cabinetGrotesk.className} text-black500 text-[24px] leading-[120%] font-medium`}>Verification
                            successful</h1>
                        <p className={'text-gray1 text-[14px] leading-[150%] font-normal'}>Congratulations! You’ve
                            successfully completed the verification process</p>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md"
                            onClick={() => {
                                onContinue();
                            }}
                        >
                            Continue
                        </Button>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default VerificationSuccessDialog;