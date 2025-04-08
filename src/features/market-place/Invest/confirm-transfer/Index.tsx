"use client";
import React from 'react'
import {Button} from "@/components/ui/button";
import {inter} from "@/app/fonts";
import {useRouter} from 'next/navigation';
import {Cross2Icon} from "@radix-ui/react-icons";
import DeleteModal from "@/reuseable/modals/Delete-modal";
import ConfirmTransferDialogue from "@/reuseable/modals/ConfirmTransferDualogue";


function ConfirmTransfer() {
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

    const router = useRouter();

    const HandleBack = () => {
        router.push('/marketplace/transfer');
    }

    const HandleConfirm = () => {
        setIsConfirmOpen(true)
    }
    const accountInfo = [
        {label: 'Bank name', value: 'Paystack-Titan'},
        {label: 'Account number', value: '3909884674'},
        {label: 'Account name', value: 'Meedl Africa'},
    ]

    return (
        <div id={`confirmTransferDiv`} test-dataid={`confirmTransferDiv`} className={`${inter.className} `}>
            <div id={`infoDesk`} className='xl:px-36 grid grid-cols-1 gap-5 lg:w-5/6 md:4/5 w-full'>
                <div id={`titleAndMessage`} className='grid grid-cols-1 gap-y-1'>
                    <h1 id={"confirm"} className='text-[18px] font-normal'>Confirm transfer</h1>
                    <p id={`messageId`} className='text-[14px] font-normal'>Add the investment amount and the investment terms and
                        conditions</p>
                </div>
                <div id={`acctDetailsAndButton`}>
                    <div id={`accountDetId`}>
                        <div id={`accountAndValue`}
                            className="bg-[#F9F9F9] h-fit md:grid rounded-sm p-5 w-full md:space-y-9 space-y-6">
                            {accountInfo?.map((item, index) => (
                                <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                     key={"key" + index}
                                     className="flex md:flex-row flex-col w-full md:justify-between gap-3 font-normal text-meedlBlack text-[14px]">
                                    <div id={`itemsId`}
                                         className={` ${inter.className} text-[#6A6B6A] text-[14px] font-normal`}>
                                        <span id={`item`}>{item.label}</span>
                                    </div>
                                    <div id={`valueId`}
                                         className={`${inter.className}  text-[#212221] text-[14px] font-normal`}>
                                        <span id={`value`}>{item.value ? item.value : 'Not provided'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id={"twoButtonsId"}
                            className="flex md:flex-row flex-col md:justify-between md:gap-0 gap-5 mt-6 w-full md:mb-0">
                            <Button id={`backButton`} type={'button'} variant={"outline"} size={"lg"}
                                    className={`w-full md:w-20 py-3 px-5 bg-meedlWhite border-meedlBlue cursor-pointer`}
                                    onClick={HandleBack}>
                                Back
                            </Button>
                            <Button
                                id='ConfirmButton'
                                variant={"secondary"}
                                size={"lg"}
                                className={` w-full font md:w-32 py-3 px-5 bg-meedlBlue cursor-pointer`}
                                type="button"
                                onClick={HandleConfirm}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal
                isOpen={isConfirmOpen}
                closeOnOverlayClick={true}
                closeModal={() => setIsConfirmOpen(false)}
                icon={Cross2Icon}
                width='auto'
            >
                <ConfirmTransferDialogue
                    headerTitle='complete'
                    amount='₦2,000,000'
                />
            </DeleteModal>
        </div>
    )
}

export default ConfirmTransfer
