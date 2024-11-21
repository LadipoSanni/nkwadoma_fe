'use client'
import React, {useState} from 'react';
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogOverlay} from '@/components/ui/dialog';
import {Form, FormProvider, useForm} from 'react-hook-form';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {cabinetGrotesk, inter} from "@/app/fonts";
import {MdClose, MdOutlineAdd, MdHorizontalRule, MdOutlineCameraAlt} from "react-icons/md";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";

interface IdentityVerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const IdentityVerificationModal: React.FC<IdentityVerificationModalProps> = ({isOpen, onClose}) => {
    const methods = useForm();
    const [isBVNOpen, setIsBVNOpen] = useState(false);
    const [isNINOpen, setIsNINOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    const onSubmit = () => {
        onClose();
        setIsSecondModalOpen(true);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]"/>
                <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6 py-5 px-5'}>
                    <DialogHeader className={'flex py-3'} id="createCohortDialogHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Provide
                            your details</DialogTitle>
                        <DialogClose asChild>
                            <button id="createCohortDialogCloseButton" className="absolute right-5">
                                <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950"/>
                            </button>
                        </DialogClose>
                    </DialogHeader>
                    <FormProvider {...methods}>
                        <Form className={`${inter.className}`} onSubmit={methods.handleSubmit(onSubmit)}>
                            <main className={'grid gap-5'}>
                                <div className={'grid gap-2'}>
                                    <Label htmlFor="bvn" className="block text-sm font-medium text-labelBlue">Bank
                                        verification number</Label>
                                    <Input
                                        type="number"
                                        id="bvn"
                                        name="bvn"
                                        placeholder="Enter BVN"
                                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                    />
                                    <Collapsible className={'bg-neutral250 rounded grid gap-2 py-2 px-3'}
                                                 open={isBVNOpen} onOpenChange={setIsBVNOpen}>
                                        <CollapsibleTrigger asChild>
                                            <div className={'flex justify-between cursor-pointer select-none'}>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>Why
                                                    do we need your Bank verification number?</p>
                                                {isBVNOpen ? <MdHorizontalRule id="tuitionBreakdownArrowUp"
                                                                               className={'h-5 w-5 text-primary200'}/> :
                                                    <MdOutlineAdd id="tuitionBreakdownArrowDown"
                                                                  className={'h-5 w-5 text-primary200'}/>}
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
                                        name="nin"
                                        placeholder="Enter NIN"
                                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                    />
                                    <Collapsible className={'bg-neutral250 rounded grid gap-2 py-2 px-3'}
                                                 open={isNINOpen} onOpenChange={setIsNINOpen}>
                                        <CollapsibleTrigger asChild>
                                            <div className={'flex justify-between cursor-pointer select-none'}>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}>Why
                                                    do we need your National identification number?</p>
                                                {isNINOpen ? <MdHorizontalRule id="tuitionBreakdownArrowUp"
                                                                               className={'h-5 w-5 text-primary200'}/> :
                                                    <MdOutlineAdd id="tuitionBreakdownArrowDown"
                                                                  className={'h-5 w-5 text-primary200'}/>}
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
                                            className="h-[3.5625rem] w-[8.75rem]  px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md">Continue
                                    </Button>
                                </div>
                            </main>
                        </Form>
                    </FormProvider>
                </DialogContent>
            </Dialog>

            <Dialog open={isSecondModalOpen} onOpenChange={setIsSecondModalOpen}>
                <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]"/>
                <DialogContent className={'max-w-[425px] md:max-w-[460px] [&>button]:hidden gap-6 py-5 px-5'}>
                    <DialogHeader className={'flex py-3'} id="secondModalHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Liveness
                            check</DialogTitle>
                    </DialogHeader>
                    <div className={`${inter.className} grid gap-5`}>
                        <div className={'h-20 w-20 rounded-full grid place-content-center bg-lightBlue500'}>
                            <MdOutlineCameraAlt className={'h-[36.571px] w-[36.571px]  text-meedlBlue'}/>
                        </div>
                        <div className={'grid gap-4'}>
                            <h1 className={'text-black500 text-[16px] leading-[150%] font-medium'}>Allow camera
                                access</h1>
                            <div className={'grid gap-3'}>
                                <p className={'text-black400 text-[14px] leading-[150%]'}>To continue the verification
                                    process, we need access to your device’s camera</p>
                                <p className={'text-black400 text-[14px] leading-[150%] self-stretch'}>Give your browser
                                    access a
                                    permission to user your camera by clicking the “Allow”
                                    button in the window in upper left corner or user your mobile device to pass the
                                    verification</p>
                            </div>
                            <div className="flex justify-end gap-5 mt-4">
                                <Button
                                    className="h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md">Continue
                                </Button>
                            </div>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default IdentityVerificationModal;