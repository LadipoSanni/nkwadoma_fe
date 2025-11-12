'use client'
import React from 'react';
import {inter, inter600} from '@/app/fonts';
import {formatAmount} from "@/utils/Format";
import { FiEye ,FiEyeOff } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import WalletButton from "@/reuseable/buttons/WalletButton";
import CircleArrow from "@/components/icons/CircleArrow";
import FundWallet from "@/components/icons/FundWallet";
import Withdraw from "@/components/icons/Withdraw";
import WalletConnect from "@/components/icons/WalletConnect";
import {useRouter} from "next/navigation";
import {store} from "@/redux/store";
import {setFundWalletFrom,setMakePaymentFrom} from "@/redux/slice/wallet";

interface Props {
    balance: number;
}

const WalletBalance = ({balance}:Props) => {
    const [isEyeOpen,setIsEyeOpen] = React.useState(false);
    const router = useRouter()

    const handleRouter = (routes: string) => {
        router.push(`${routes}`)
    }

    const renderWalletButton = (style: string) => {
        return(
            <div
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                }}
                className={`  px-3  md:px-0  mt-auto h-fit  ${style}  overflow-x-auto md:w-fit w-full  gap-4 `}>
                <WalletButton
                    text={'Make payment'}
                    icon={<CircleArrow height={'20'} width={'20'}/>}
                    handleClick={() => {
                        store.dispatch(setMakePaymentFrom('wallet'))
                        handleRouter(`/payment/make-payment`)
                    }}
                />
                <WalletButton
                    text={'Fund wallet'}
                    icon={<FundWallet height={'20'} width={'20'}/>}
                    handleClick={() =>  {
                        store.dispatch(setFundWalletFrom('wallet'))
                        handleRouter(`/fund-wallet`)
                    }}
                />
                <WalletButton
                    text={'Withdraw'}
                    icon={<Withdraw height={'20'} width={'20'}/>}
                    handleClick={() =>  {handleRouter(`/withdraw`)}}
                />
            </div>
        )
    }


    return (
        <div
            className={` w-full h-fit py-4 md:py-0   md:h-[13rem] grid md:flex md:justify-between rounded-md bg-gradient-to-r from-[#142854] to-[#093086] `}
        >
            <div
                className={` w-full flex justify-between   md:grid gap-5 pl-2  md:mt-auto md:mb-10   md:pl-10 md:h-fit  h-full   `}
            >
                <div className={` mt-auto mb-auto  `}>
                    <p className={` ${inter.className} text-white text-xs `}>Wallet balance</p>
                    <div className={` flex gap-2  w-fit  ${inter600.className} text-white   `}>
                        {isEyeOpen ?
                            <p id={'balance'} data-testid={'balance'} className={` ${inter600.className} text-xl  text-white md:text-3xl  `}>{formatAmount(balance)}</p>
                            :
                            <div id={'closeIcon'} data-testid={'closeIcon'} className={` flex gap-2 `}>
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                            </div>
                        }
                        {isEyeOpen ?
                            <FiEyeOff id={'closeEyeIcon'} data-testid={'closeEyeIcon'} className={` mt-auto mb-auto cursor-pointer `} onClick={ () => {setIsEyeOpen(!isEyeOpen)}} />
                            :
                            <FiEye  id={'upEyeIcon'} data-testid={'upEyeIcon'} className={` mt-auto mb-auto cursor-pointer`} onClick={ () => {setIsEyeOpen(!isEyeOpen)}} />
                        }

                    </div>
                </div>
                {renderWalletButton(` md:flex hidden `)}
                <div
                    className={` md:hidden flex mb-auto mt-0  md:mt-auto md:mb-0 lg:mb-0 lg:mt-auto  `}
                >
                    <WalletConnect/>
                </div>
            </div>
            <div
                className={` hidden md:flex lg:flex mb-auto mt-0  md:mt-auto md:mb-0 lg:mb-0 lg:mt-auto  `}
            >
                <WalletConnect/>
            </div>
            {renderWalletButton(` md:hidden lg:hidden flex `)}
        </div>
    );
};

export default WalletBalance;