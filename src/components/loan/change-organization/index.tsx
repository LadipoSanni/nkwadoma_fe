import React, {useState} from "react";
// import {
//     DialogDescription,
//     Root,
//     DialogTitle,
//     DialogPortal,
//     DialogTrigger,
//     DialogContent,
//     DialogOverlay,
//     Close,
//
// } from "@radix-ui/react-dialog";
import * as Dialog from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
// import "./styles.css";
import {inter, cabinetGroteskRegular} from "@/app/fonts";
import {MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
// interface props {
// open: boolean,
// onOpenChange: (state: boolean) => void
// }

const ChangeInstitutionModal = () => {

    const [open, setOpen] = React.useState(false)
    if (open) {
        console.log('ajhbs')
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button id="changeOrganizationButton" data-testid={'changeOrganizationButton'}
                        className={` ${inter.className} text-meedlBlue pt-0.5 underline w-fit h-fit md:font-size-0.875rem md:font-light px-1 bg-blue500 rounded `}>Change
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[#344054B2] data-[state=open]:animate-overlayShow"/>
                <Dialog.Content
                    className="fixed left-1/2 top-1/2 md:h-[80vh] md:w-[30vw] h-[90vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-6 px-5 md:py-6 md:px-5  ">
                    <Dialog.Title className={` flex justify-between  w-full `}>
                        <div id={`organizationText`} data-testid={`organizationText`}
                             className={`${cabinetGroteskRegular.className} text-2xl`}>
                            Organization
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className=""
                                aria-label="Close"
                            >
                                <Cross2Icon className={'w-5 h-5 text-[#939CB0] '}/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Title>
                    <Dialog.Description className="w-full md:w-full ">
                        <div className='relative mt-7 '>
                            <span className="absolute inset-y-0 left-0 flex items-center pr-4 pl-3">
                               <MdSearch className="h-5 w-5 text-[#939CB0]"/>
                            </span>
                            <Input
                                id='searchOrganizationOn'
                                placeholder='Search'
                                className='w-full md:w-full rounded h-11 md:h-11 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 '
                            />
                        </div>
                    </Dialog.Description>
                    <div className="mt-[25px] flex justify-end">
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
export default ChangeInstitutionModal;