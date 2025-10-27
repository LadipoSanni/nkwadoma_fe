import React, { useState,useRef } from 'react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cabinetGrotesk, inter } from "@/app/fonts";
import { MdClose, MdHorizontalRule, MdOutlineAdd, MdOutlineCameraAlt } from "react-icons/md";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import CapturePhotoWithTips from "@/components/SmartCameraWrapper/capturePhotoWithTips/Index";
import { useUploadImageToCloudinary } from "@/utils/UploadToCloudinary";
import { useVerifyIdentityMutation } from "@/service/users/Loanee_query";
import WarningModal from "@/reuseable/modals/WarningDialog/WarningModal";
import {useAppSelector} from "@/redux/store";
import {encryptAction} from "@/app/encrypt/action";

interface IdentityVerificationModalProps {
    isOpen: boolean;
    loanReferralId: string;
    onClose: () => void;
    onThirdStepContinue: () => void;
}

interface ApiError {
    status: number;
    data: {
        message: string;
    }

}

type FormData = {
    bvn: string;
    nin: string;
    imageUrl: string;
    loanReferralId: string;
};

const IdentityVerificationModal: React.FC<IdentityVerificationModalProps> = ({
                                                                                 isOpen,
                                                                                 onClose,
                                                                                 onThirdStepContinue,
                                                                                 loanReferralId
                                                                             }) => {
    const methods = useForm<FormData>({ mode: 'onChange' });
    const [isBVNOpen, setIsBVNOpen] = useState(false);
    const [isNINOpen, setIsNINOpen] = useState(false);
    const [isDataError, setDataError] = useState("");
    const [loaneeIdentityData, setLoaneeIdentityData] = useState<FormData>({
        imageUrl: "",
        loanReferralId: "",
        bvn: "",
        nin: ""
    });
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [stream, setStream] = useState<MediaStream|null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [verifyIdentity] = useVerifyIdentityMutation();
    const videoRef = useRef<HTMLVideoElement>(null);
    const invitedLoaneeFromPmId = useAppSelector(state => state.selectedLoan.cohortLoaneeId)

    const {upload} = useUploadImageToCloudinary();

    const handleCapture = async (imageFile: File) => {
        loaneeIdentityData.imageUrl = await upload(imageFile,"loanee_verification");
        loaneeIdentityData.loanReferralId = invitedLoaneeFromPmId ? '' : loanReferralId;
        try {
            const formData: FormData = loaneeIdentityData;
            const data = await verifyIdentity(formData).unwrap();
            if (data) {
                onClose();
                if (data.data === "Identity verified") {
                    setErrorMessage("");
                    setShowSuccessDialog(true);
                } else if (data.data === "Identity not verified" || data.data === "Verification server down") {
                    setErrorMessage("Your verification is under review");
                    setShowSuccessDialog(true);
                }
            }
        } catch (error) {
            const err = error as ApiError;
            if (err.status === 400 && err.data?.message === "Verification server down") {
                setErrorMessage("Your verification is under review");
            } else if (err.status === 500) {
                setErrorMessage("Internal server error. Please try again later.");
            } else if (err.status === 404) {
                setErrorMessage("Verification service not found. Please contact support.");
            } else {
                setErrorMessage(err ? err.data?.message : "An error occurred");
            }
            setShowSuccessDialog(true);
        }
        setIsSecondModalOpen(false);
    };

    async  function  handleEncrypt(text: string) {
        return  await encryptAction(text);
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const encryptedBvn = await handleEncrypt(data.bvn);
        const encryptedNin = await handleEncrypt(data.nin);
        if (encryptedBvn && encryptedNin ){
            data.bvn = encryptedBvn;
            data.nin = encryptedNin;
            setLoaneeIdentityData(data);
            setIsSecondModalOpen(true);
            onClose();
        } else {
            setDataError("Unable to encrypt data. Please try again later.");
        }
    };


    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop() });
            // dispatch(clearCameraStream());
            setStream(null)
            if (videoRef.current) {
                videoRef.current.srcObject = null;        }
         }
    };
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                {/*<DialogOverlay className="bg-[rgba(52,64,84,0.70)] " />*/}
                <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6 py-5 pl-5 pr-2'}>
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
                        <form className={`${inter.className} pr-2  overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`} onSubmit={methods.handleSubmit(onSubmit)}>
                            <main className={'grid gap-5'}>
                                <div className={'grid gap-2'}>
                                    <Label htmlFor="bvn" className="block text-sm font-medium text-labelBlue">Bank
                                        verification number</Label>
                                    <Input
                                        type="number"
                                        id="bvn"
                                        {...methods.register("bvn", {
                                            required: "BVN is required",
                                            minLength: { value: 11, message: "BVN must be 11 digits" },
                                            maxLength: { value: 11, message: "BVN must be 11 digits" }
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
                                                all financial institutions.</p>
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
                                            minLength: { value: 11, message: "NIN must be 11 digits" },
                                            maxLength: { value: 11, message: "NIN must be 11 digits" }
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
                                                all financial institutions.</p>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </div>
                                <div className="md:flex grid md:justify-end gap-5 mt-3">
                                    <Button type="button" onClick={onClose}
                                            className="h-[3.5625rem] md:w-[8.75rem] w-full  border border-meedlBlue text-meedlBlue px-4 py-2 bg-gray-300 rounded-md"
                                            variant={'outline'}
                                            >Cancel
                                    </Button>
                                    <Button type="submit"
                                            className={`h-[3.5625rem] md:w-[8.75rem] w-full px-4 py-2 ${!methods.formState.isValid ? 'bg-[#D0D5DD] hover:bg-[#D0D5DD]' : 'bg-meedlBlue'}  text-white rounded-md`}
                                            disabled={!methods.formState.isValid}
                                            variant={'secondary'}
                                            >Continue
                                    </Button>
                                </div>
                                <p className={"text-red-800 text-[13px]"} id={"encryptionFailure"}>{isDataError}</p>
                            </main>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>

            <Dialog open={isSecondModalOpen && !showSuccessDialog} onOpenChange={setIsSecondModalOpen}>
                {/*<DialogOverlay className="bg-[rgba(52,64,84,0.70)] " />*/}
                <DialogContent 
                className={'max-w-[425px] md:max-w-[460px] [&>button]:hidden gap-6 py-5 px-5'}
                onInteractOutside={(e) => e.preventDefault()} 
                onEscapeKeyDown={(e) => e.preventDefault()}   
                >
                    <DialogHeader className={'flex py-3'} id="secondModalHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Liveness
                            check</DialogTitle>
                    </DialogHeader>

                    <div className={`${inter.className} grid gap-5`}>
                        {showCamera ? (
                            <CapturePhotoWithTips onCapture={handleCapture} />
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
                                        <button
                                          type='button'
                                            className=" h-[3.5625rem] w-[8.75rem] px-4 py-2  text-white rounded-md hover:bg-[#435376] bg-meedlBlue"
                                            onClick={() => {
                                                setShowCamera(true);
                                            }}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <WarningModal
                open={showSuccessDialog}
                onClose={() => setShowSuccessDialog(false)}
                onContinue={onThirdStepContinue}
                title={errorMessage ? 'Verification In Progress' : 'Verification successful'}
                message={errorMessage ? "Your verification is under review" : 'Congratulations! You’ve successfully completed the verification process'}
                buttonText={'Continue '}
                stopCamera={stopCamera}
            />

        </>
    );
};

export default IdentityVerificationModal;
