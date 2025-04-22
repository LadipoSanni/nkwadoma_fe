import React from "react";
import SuccessIcon from '../../../public/Icon - Success (1).svg'
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {inter, cabinetGrotesk} from "@/app/fonts";
import {useRouter} from "next/navigation";
import ToastPopUp from "@/reuseable/notification/ToastPopUp";

interface ConfirmTransferProps {
    headerTitle: string,
    amount: string,
}



const ConfirmTransferDialogue: React.FC<ConfirmTransferProps> = ({headerTitle, amount}) => {
    const router = useRouter();
    const toastPopUp = ToastPopUp({
        description: `Successfully transferred ${amount}`,
        status: "success",
    });

    const handleMarketPlace = async () => {
        router.push("/marketplace");
        toastPopUp.showToast();
    };
    return (
        <div id={`Success modal`} data-testid="Successful transfer modal">

            <Image id={`Successimage`} src={SuccessIcon} alt={"Success Icon"}
                   className={`md:w-[5rem] w-[4rem] md:h-[5rem] h-[4rem]`}
                   width={200}
                   height={200}
                   loading= "lazy"
            />
            <div id={`titleAndMessageDiv`} className={`pt-3`}>
                <h1 id={"titleId"}
                    className={`${cabinetGrotesk.className} text-2xl font-medium leading-7 text-meedlBlack`}>Transfer {headerTitle}
                </h1>

                <p id={`messageId`}
                   className={`pt-3  text-sm font-normal leading-6 text-grey450 md:w-[22rem]`}>Congratulations! You’ve
                    successfully completed the transfer of {amount} to Meedl Africa</p>
            </div>

            <div id={`goToMarketButton`} className={`flex flex-row md:justify-end w-full gap-3 py-6`}>
                <Button size={'lg'} variant={'secondary'}
                        className={`${inter.className} h-12 md:w-36 w-full bg-meedlBlue text-sm py-3 px-5 font-semibold leading-6 text-meedlWhite`}
                        id="MarketButton"
                        onClick={handleMarketPlace}>
                    Go to marketplace
                </Button>
            </div>

        </div>
    )
}

export default ConfirmTransferDialogue