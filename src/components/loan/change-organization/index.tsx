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
import { Cross2Icon } from "@radix-ui/react-icons";
// import "./styles.css";
import {inter, cabinetGroteskRegular} from "@/app/fonts";
// interface props {
    // open: boolean,
    // onOpenChange: (state: boolean) => void
// }

const ChangeInstitutionModal = () => {

    const [open, setOpen] = React.useState(false)
    if (open ){
        console.log('ajhbs')
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
                         <button  id="changeOrganizationButton" data-testid={'changeOrganizationButton'}
                             className={` ${inter.className} text-blue300 pt-0.5 underline w-fit h-fit md:text-xs md:font-light px-1 bg-blue500 rounded `}>Change
                        </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[#344054B2] data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title className={` flex justify-between bg-red-300 w-full `}>
                        <div id={`organizationText`} data-testid={`organizationText`} className={`${cabinetGroteskRegular.className} text-2xl`}>
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
                    <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        Make changes to your profile here. Click save when you're done.
                    </Dialog.Description>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <label
                            className="w-[90px] text-right text-[15px] text-violet11"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                            id="name"
                            defaultValue="Pedro Duarte"
                        />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                        <label
                            className="w-[90px] text-right text-[15px] text-violet11"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                            id="username"
                            defaultValue="@peduarte"
                        />
                    </fieldset>
                    <div className="mt-[25px] flex justify-end">
                        <Dialog.Close asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none">
                                Save changes
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
export default ChangeInstitutionModal;