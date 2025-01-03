import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import {inter, cabinetGroteskRegular} from "@/app/fonts";
import {MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import styles from "./index.module.css"

const ChangeInstitutionModal = () => {


    return (
        // <Dialog.Root>
        //     <Dialog.Trigger asChild>
        //         <button id="changeOrganizationButton" data-testid={'changeOrganizationButton'}
        //                 className={` ${inter.className} text-meedlBlue pt-0.5 underline w-fit h-fit md:font-size-0.875rem md:font-light px-1 bg-blue500 rounded `}>Change
        //         </button>
        //     </Dialog.Trigger>
        //     <Dialog.Portal>
        //         <Dialog.Overlay className="fixed inset-0 bg-[#344054B2] data-[state=open]:animate-overlayShow"/>
        //         <Dialog.Content
        //             className="fixed left-1/2 top-1/2 md:h-[75vh] md:w-[30vw] h-[90vh] w-[90vw] grid grid-rows-3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-6 px-5 md:py-6 md:px-5  ">
        //             <Dialog.Title id={'titleAndCloseIcon'} data-testid={'titleAndCloseIcon'} className={`${cabinetGroteskRegular.className} text-2xl`}>
        //                     Organization
        //             </Dialog.Title>
        //             <Dialog.Description className="w-full md:w-full ">
        //                 <div className='relative mt-7 '>
        //                     <span className="absolute inset-y-0 left-0 flex items-center pr-4 pl-3">
        //                        <MdSearch className="h-5 w-5 pr-4 text-[#939CB0]"/>
        //                     </span>
        //                     <Input
        //                         id='searchOrganizationOn'
        //                         placeholder='Search'
        //                         className='w-full md:w-full rounded h-11 md:h-11 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 '
        //                     />
        //                 </div>
        //             </Dialog.Description>
        //             <div
        //                 className="bottom-0  md:bottom-1/2 md:flex md:justify-end h-fit flex  gap-4 md:h-fit md:bg-red-50  justify-end w-full md:w-full bg-red-300">
        //                 <button id={'cancel'} data-testid={'cancel'}
        //                         className={`border border-meedlBlue rounded-md text-sm h-fit w-fit px-10 py-4  text-meedlBlue `}>Cancel
        //                 </button>
        //                 <button id={'cancel'} data-testid={'cancel'}
        //                         disabled={true}
        //                         className={`border border-meedlBlue bg-meedlBlue rounded-md text-sm h-fit w-fit px-10 py-4  text-meedlWhite `}>Comfirm
        //                 </button>
        //
        //                 {/*</div>*/}
        //             </div>
        //         </Dialog.Content>
        //     </Dialog.Portal>
        // </Dialog.Root>
        <Dialog.Root>
            <Dialog.Trigger asChild>
                         <button id="changeOrganizationButton" data-testid={'changeOrganizationButton'}
                                 className={` ${inter.className} text-meedlBlue pt-0.5 underline w-fit h-fit md:font-size-0.875rem md:font-light px-1 bg-blue500 rounded `}>Change
                         </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-[#344054B2] data-[state=open]:animate-overlayShow"/>
                <Dialog.Content
                                className={`fixed left-1/2 top-1/2 ${styles.container} md:h-[75vh] md:w-[30vw] h-[90vh] w-[90vw] grid grid-rows-3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-6 px-5 md:py-6 md:px-5 `}>
                    <Dialog.Title  className={`${cabinetGroteskRegular.className} text-2xl`}>
                        Organization
                    </Dialog.Title>
                    <div
                        className={` ${styles.innerContainer}h-full md:h-full w-full md:w-full `}
                    >
                        <div className='relative  '>
                             <span className="absolute inset-y-0 left-0 flex items-center pr-4 pl-3">
                                <MdSearch className="h-5 w-5 pr-4 text-[#939CB0]"/>
                            </span>
                             <Input
                                                    id='searchOrganizationOn'
                                                    placeholder='Search'
                                                    className='w-full md:w-full rounded h-11 md:h-11 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 '
                                                />
                        </div>
                        <div className={`${styles.organizations}`}>

                        </div>

                        </div>
                        <div
                            className="absolute bottom-0  px-4 pb-4   md:flex md:justify-end h-fit  grid gap-3 md:gap-4  md:h-fit   w-full md:w-full ">
                            <Button
                                id={'cancel'} data-testid={'cancel'}
                                className={` border border-meedlBlue rounded-md text-sm h-fit md:w-fit md:px-10 md:py-4 py-5 w-full  text-meedlBlue`}
                            >
                                Cancel
                            </Button>
                            <Button id={'cancel'} data-testid={'cancel'}
                                    disabled={true}
                                    className={`border border-meedlBlue bg-meedlBlue rounded-md text-sm h-fit md:w-fit py-5 md:px-10 md:py-4 w-full text-meedlWhite `}>Confirm
                            </Button>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute right-4 top-6  inline-flex size-[25px]  "
                                aria-label="Close"
                            >
                                <Cross2Icon className={`text-[#939CB0] w-7 h-7`}/>
                            </button>
                        </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
)

}
export default ChangeInstitutionModal;