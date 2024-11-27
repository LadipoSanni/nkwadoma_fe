'use client'
import React, {useState} from 'react';
import {MdClose, MdPersonOutline} from "react-icons/md";
import {cabinetGrotesk, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import {Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogClose} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

const AdditionalInformation: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div
                className={` ${inter.className} bg-grey105 w-full h-[22rem] gap-8 flex flex-col items-center justify-center`}>
                <div className={'md:h-20 md:w-20 h-[60px] w-[60px] bg-blue500 rounded-full grid place-content-center'}>
                    <MdPersonOutline className={'h-8 w-8 text-meedlBlue'}/>
                </div>
                <div className={'grid place-content-center place-items-center text-center gap-2'}>
                    <h1 className={`${cabinetGrotesk.className} md:w-[20.875rem] w-[13.75rem] md:text-[20px] text-[18px] leading-[120%] font-medium text-meedlBlack`}>Additional
                        information will appear here</h1>
                    <p className={'text-[14px] font-normal leading-[150%] text-#57595D w-[13.75rem] md:w-[317px]'}>To
                        add
                        your additional information,
                        click on the <span className={'font-semibold '}>add additional information</span> button</p>
                    <Button
                        className={'h-[2.8125rem] w-[13.75rem] mt-5 px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md'}
                        onClick={() => setIsModalOpen(true)}>Add additional information</Button>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]"/>
                <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6 py-5 px-5'}>
                    <DialogHeader className={'flex py-3'} id="createCohortDialogHeader">
                        <DialogTitle
                            className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Additional information</DialogTitle>
                        <DialogClose asChild>
                            <button id="createCohortDialogCloseButton" className="absolute right-5">
                                <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950"/>
                            </button>
                        </DialogClose>
                    </DialogHeader>
                        <form className={`${inter.className}`}>
                            <main className={'grid gap-5'}>
                                <div className={'grid gap-2'}>
                                    <Label htmlFor="bvn" className="block text-sm font-medium text-labelBlue">Alternate email address</Label>
                                    <Input
                                        type="email"
                                        id="alternateEmail"
                                        placeholder="Enter email adress"
                                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                    />

                                </div>

                                <div className={'grid gap-2'}>
                                    <Label htmlFor="nin" className="block text-sm font-medium text-labelBlue">National
                                        identification number</Label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        placeholder="Enter first name"
                                        className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                                    />
                                            </div>
                                <div className="flex justify-end gap-5 mt-3">
                                    <Button type="button"
                                            className="h-[3.5625rem] w-[8.75rem]  border border-meedlBlue text-meedlBlue px-4 py-2 bg-gray-300 rounded-md">Cancel
                                    </Button>
                                    <Button type="submit"
                                            className={`h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md`}
                                           >Continue
                                    </Button>
                                </div>
                            </main>
                        </form>
                </DialogContent>
            </Dialog>


        </>
    );
};

export default AdditionalInformation;