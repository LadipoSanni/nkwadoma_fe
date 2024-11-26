'use client'
import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from '@/components/ui/dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cabinetGrotesk, inter } from "@/app/fonts";
import { MdClose, MdOutlineAdd, MdHorizontalRule, MdOutlineCameraAlt } from "react-icons/md";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { SubmitHandler } from 'react-hook-form';
import SmartCameraWrapper from '@/components/SmartCameraWrapper/Index';
import Image from "next/legacy/image";

interface IdentityVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onThirdStepContinue: () => void;
}

type FormData = {
    bvn: number;
    nin: number;
};

const IdentityVerificationModal: React.FC<IdentityVerificationModalProps> = ({ isOpen, onClose, onThirdStepContinue }) => {
    const methods = useForm<FormData>({ mode: 'onChange' });
    const [isBVNOpen, setIsBVNOpen] = useState(false);
    const [isNINOpen, setIsNINOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [thirdStep, setThirdStep] = useState(false);

    const postContent = async (data: {
        partner_params: { libraryVersion: string; permissionGranted: boolean };
        images: { file: string; image_type_id: number; image: string }[]
    }) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("/", options);

            if (!response.ok) {
                const text = await response.text();
                console.error(`Request failed with status ${response.status}:`, text);
                throw new Error(`Request failed with status ${response.status}`);
            }
            return;

        } catch (e) {
            console.error('Error during postContent:', e);
            throw e;
        }
    };

    const handlePublish = async (data: { partner_params: { libraryVersion: string; permissionGranted: boolean }; images: { file: string; image_type_id: number; image: string }[] }) => {
        try {
            const response = await postContent(data);
            console.log('Liveness check result:', response);

            setShowCamera(false);
            setIsSecondModalOpen(false);
            setThirdStep(true);
        } catch (error) {
            console.error('Liveness check failed:', error);

            setShowCamera(false);
            setIsSecondModalOpen(false);
            setThirdStep(false);
        }
    };

    const onSubmit: SubmitHandler<FormData> = (data) => {
        try {
            const formData: FormData = {
                bvn: Number(data.bvn),
                nin: Number(data.nin)
            };
            console.log(formData);
            onClose();
            setIsSecondModalOpen(true);
        } catch (error) {
            console.error("Error while submitting form:", error);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]" />
                <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6 py-5 px-5'}>
                    <DialogHeader className={'flex py-3'} id="createCohortDialogHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Provide
                            your details</DialogTitle>
                        <DialogClose asChild>
                            <button id="createCohortDialogCloseButton" className="absolute right-5">
                                <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950" />
                            </button>
                        </DialogClose>
                    </DialogHeader>
                    <FormProvider {...methods}>
                        <form className={`${inter.className}`} onSubmit={methods.handleSubmit(onSubmit)}>
                            <main className={'grid gap-5'}>
                                <div className={'grid gap-2'}>
                                    <Label htmlFor="bvn" className="block text-sm font-medium text-labelBlue">Bank
                                        verification number</Label>
                                    <Input
                                        type="number"
                                        id="bvn"
                                        {...methods.register("bvn", {
                                            required: "BVN is required",
                                            minLength: { value: 11, message: "BVN must be exactly 11 digits" },
                                            maxLength: { value: 11, message: "BVN must be exactly 11 digits" }
                                        })}
                                        placeholder="Enter BVN"
                                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                    />
                                    {methods.formState.errors.bvn &&
                                        <p className="text-red-500 text-sm">{methods.formState.errors.bvn.message}</p>}
                                    <Collapsible className={'bg-neutral250 rounded grid gap-2 py-2 px-3'}
                                                 open={isBVNOpen} onOpenChange={setIsBVNOpen}>
                                        <CollapsibleTrigger asChild>
                                            <div className={'flex justify-between cursor-pointer select-none'}>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>Why
                                                    do we need your Bank verification number?</p>
                                                {isBVNOpen ? <MdHorizontalRule id="tuitionBreakdownArrowUp"
                                                                               className={'h-5 w-5 text-primary200'} /> :
                                                    <MdOutlineAdd id="tuitionBreakdownArrowDown"
                                                                  className={'h-5 w-5 text-primary200'} />}
                                            </div>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <p className="text-black400 text-[14px] leading-[150%] font-normal">We
                                                request for your BVN to verify your identity and confirm that the
                                                account you registered with is yours. It is also a KYC requirement for
                                                all financial institutions by the Central Bank of Nigeria (CBN).</p>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                                <div className={'grid gap-2'}>
                                    <Label htmlFor="nin" className="block text-sm font-medium text-labelBlue">National
                                        identification number</Label>
                                    <Input
                                        type="number"
                                        id="nin"
                                        {...methods.register("nin", {
                                            required: "NIN is required",
                                            minLength: { value: 11, message: "NIN must be exactly 11 digits" },
                                            maxLength: { value: 11, message: "NIN must be exactly 11 digits" }
                                        })}
                                        placeholder="Enter NIN"
                                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                    />
                                    {methods.formState.errors.nin &&
                                        <p className="text-red-500 text-sm">{methods.formState.errors.nin.message}</p>}
                                    <Collapsible className={'bg-neutral250 rounded grid gap-2 py-2 px-3'}
                                                 open={isNINOpen} onOpenChange={setIsNINOpen}>
                                        <CollapsibleTrigger asChild>
                                            <div className={'flex justify-between cursor-pointer select-none'}>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>Why
                                                    do we need your National identification number?</p>
                                                {isNINOpen ? <MdHorizontalRule id="tuitionBreakdownArrowUp"
                                                                               className={'h-5 w-5 text-primary200'} /> :
                                                    <MdOutlineAdd id="tuitionBreakdownArrowDown"
                                                                  className={'h-5 w-5 text-primary200'} />}
                                            </div>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <p className="text-black400 text-[14px] leading-[150%] font-normal">We
                                                request for your NIN to verify your identity and confirm that the
                                                account you registered with is yours. It is also a KYC requirement for
                                                all financial institutions by the Central Bank of Nigeria (CBN).</p>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                                <div className="flex justify-end gap-5 mt-3">
                                    <Button type="button" onClick={onClose}
                                            className="h-[3.5625rem] w-[8.75rem]  border border-meedlBlue text-meedlBlue px-4 py-2 bg-gray-300 rounded-md">Cancel
                                    </Button>
                                    <Button type="submit"
                                            className={`h-[3.5625rem] w-[8.75rem] px-4 py-2 ${!methods.formState.isValid ? 'bg-[#D0D5DD]' : 'bg-meedlBlue'} hover:bg-meedlBlue text-white rounded-md`}
                                            disabled={!methods.formState.isValid}>Continue
                                    </Button>
                                </div>
                            </main>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>

            <Dialog open={isSecondModalOpen} onOpenChange={setIsSecondModalOpen}>
                <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]" />
                <DialogContent className={'max-w-[425px] md:max-w-[460px] [&>button]:hidden gap-6 py-5 px-5'}>
                    <DialogHeader className={'flex py-3'} id="secondModalHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Liveness
                            check</DialogTitle>
                    </DialogHeader>
                    <div className={`${inter.className} grid gap-5`}>
                        {showCamera ? (
                            <SmartCameraWrapper onPublish={handlePublish} />
                        ) : (
                            <>
                                <div className={'h-20 w-20 rounded-full grid place-content-center bg-lightBlue500'}>
                                    <MdOutlineCameraAlt className={'h-[36.571px] w-[36.571px]  text-meedlBlue'} />
                                </div>
                                <div className={'grid gap-4'}>
                                    <h1 className={'text-black500 text-[16px] leading-[150%] font-medium'}>Allow camera
                                        access</h1>
                                    <div className={'grid gap-3'}>
                                        <p className={'text-black400 text-[14px] leading-[150%]'}>To continue the
                                            verification process, we need access to your device’s camera</p>
                                        <p className={'text-black400 text-[14px] leading-[150%] self-stretch'}>Give your
                                            browser access a permission to user your camera by clicking the “Allow”
                                            button in the window in upper left corner or user your mobile device to pass
                                            the verification</p>
                                    </div>
                                    <div className="flex justify-end gap-5 mt-4">
                                        <Button
                                            className="h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md"
                                            onClick={() => {
                                                console.log('Setting showCamera to true');
                                                setShowCamera(true);
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={thirdStep} onOpenChange={setThirdStep}>
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
                                onClick={onThirdStepContinue}
                            >
                                Continue
                            </Button>
                        </div>
                    </section>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default IdentityVerificationModal;