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
import {inter} from "@/app/fonts";
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
        <Dialog.Root  open={open}>
            <Dialog.Trigger className={` ${inter.className} text-blue300 pt-0.5 underline w-fit h-fit md:text-xs md:font-light px-1 bg-blue500 rounded `} asChild>
                <button onClick={()=> {setOpen(true)}} id="changeOrganizationButton" data-testid={'changeOrganizationButton'}
                     className={` ${inter.className} text-blue300 pt-0.5 underline w-fit h-fit md:text-xs md:font-light px-1 bg-blue500 rounded `}>Change
                </button>
            </Dialog.Trigger>
            <Dialog.Portal >
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Make changes to your profile here. Click save when you are done.
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="name">
                            Name
                        </label>
                        <input className="Input" id="name" defaultValue="Pedro Duarte" />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="username">
                            Username
                        </label>
                        <input className="Input" id="username" defaultValue="@peduarte" />
                    </fieldset>
                    <div
                        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                    >
                        <Dialog.Close asChild>
                            <button className="Button green">Save changes</button>
                        </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
export default ChangeInstitutionModal;