import React, {useState} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import {inter, cabinetGroteskRegular} from "@/app/fonts";
import {MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import styles from "./index.module.css"
import {organizations} from "../../../utils/LoanProductMockData";
import OrganizationImage from "@/reuseable/profile/Organization-image";
import {store, useAppSelector} from "@/redux/store";
import {setClickedOrganization} from "@/redux/slice/loan/selected-loan";
import AuthButton from "@/reuseable/buttons/AuthButton";

const ChangeInstitutionModal = () => {

    const currentTab = useAppSelector(state => state.selectedLoan.currentTab)
    // const clickedOrganizationId = useAppSelector(state => state.selectedLoan.clickedOrganizationId)
    const [current, setCurrent] = useState<number | string>('')
    const [disabled, setDisable] = React.useState(true)

    const handleClick = (id: string | number) => {
        if (id === current) {
            setCurrent('')
            setDisable(true)
        } else {
            setCurrent(id)
            setDisable(false)
        }
        store.dispatch(setClickedOrganization(id))

    }

    const handleContinue = () => {
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
                    className={`fixed left-1/2 top-1/2 ${styles.container} md:h-[75vh] md:w-fit h-[90vh] w-[90vw] grid grid-rows-3 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white py-6 px-5 md:py-6 md:px-5 `}>
                    <Dialog.Title className={`${cabinetGroteskRegular.className}  text-2xl`}>
                        Organization
                    </Dialog.Title>
                    <div
                        className={` ${styles.innerContainer}  h-full md:h-full w-full md:w-full `}
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
                        <div className={`${styles.organizations} py-2 grid gap-3 `}>
                            {
                                organizations.map((organization, index) => (
                                    <button key={organization.id} id={"index" + index}
                                            onClick={() => {
                                                handleClick(organization?.id)
                                            }}
                                            className={` ${styles.institutionMiniCard2} md:flex pl-3  md:place-items-center md:px-2 md:justify-between grid   w-[98%] h-[6rem] md:h-[4rem] rounded-md border ${organization.id === current ? `border-meedlBlue` : `border-[#ECECEC]`}   `}>

                                        <div
                                            className={`flex md:flex gap-3 place-items-center md:place-items-center `}
                                        >
                                            <div id={`radioGroupOnOrganizationModal`}
                                                 data-testid={`radioGroupOnOrganizationModal`}
                                                 className={`flex w-fit h-fit px-1 py-1 ring-1 ${organization.id === current ? `ring-meedlBlue` : `ring-[#ECECEC]`} rounded-full items-center space-x-2`}>
                                                <div id={`radioGroupCheeckedOnOrganizationModal`}
                                                     data-testid={`radioGroupCheeckedOnOrganizationModal`}
                                                     className={` w-[0.7rem] h-[0.7rem] rounded-full  ${organization.id === current ? `bg-meedlBlue md:bg-meedlBlue` : `bg-white`} `}></div>
                                            </div>
                                            <OrganizationImage
                                                size={'small'}
                                                src={organization?.pic}
                                                alt={'image'} id={'oranizationImageOnLoan'}/>
                                            <span
                                                className={` ${inter.className} text-black500 h-fit w-[3rem] bg-purple-50 `}>{organization.name}</span>
                                        </div>
                                        <div
                                            className={`flex md:flex bg-grey105 px-3 py-2 rounded-full w-fit h-fit   place-items-center gap-3 `}>
                                            <span className={`text-sm `}>{currentTab}</span>
                                            <div
                                                className={` w-fit h-fit ring-1 ring-[#E1EEFF] rounded-md  px-1 py-1 md:w-fit md:h-fit md:ring-1 md:ring-[#E1EEFF] md:rounded-md  md:px-1 md:py-1 `}
                                            >
                                                <div className={`bg-[#E1EEFF] py-1 px-1 h-[1rem] flex place-content-center w-fit`}>
                                                    <span className={`text-xs mt-auto mb-auto text-meedlBlue`}>263</span>
                                                </div>
                                            </div>

                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div
                        className="absolute bottom-0 px-4 pb-4   md:flex md:justify-end h-fit  grid gap-3 md:gap-4  md:h-fit   w-full md:w-full ">
                        <Dialog.Close asChild>
                            <Button
                                id={'cancel'} data-testid={'cancel'}
                                className={` border border-meedlBlue rounded-md text-sm h-fit md:w-fit md:px-10 md:py-4 py-4   text-meedlBlue`}
                            >
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <div className={`w-full  md:w-[8rem]`}>
                            <AuthButton
                                disable={disabled} backgroundColor={'#142854'} textColor={"white"}
                                id={"continueButtonOnOrganizationModal"}
                                height={'3.4rem'}
                                data-testid={`continueButtonOnOrganizationModal`}
                                buttonText={"continue"} width={"inherit"}
                                isLoading={false}
                                handleClick={handleContinue}
                            >

                            </AuthButton>
                        </div>
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