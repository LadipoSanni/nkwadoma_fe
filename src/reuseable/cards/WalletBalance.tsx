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

interface Props {
    balance: number;
}

const WalletBalance = ({balance}:Props) => {
    const [isEyeOpen,setIsEyeOpen] = React.useState(false);
    return (
        <div
            className={` w-full h-[13rem] flex justify-between rounded-md bg-gradient-to-r from-[#142854] to-[#093086] `}
        >
            <div
                className={` w-full grid gap-5  mt-auto mb-10   pl-10 h-fit    `}
            >
                <div>
                    <p className={` ${inter.className} text-white text-xs `}>Wallet balance</p>
                    <div className={` flex gap-2  w-fit  ${inter600.className} text-white   `}>
                        {isEyeOpen ?
                            <p id={'balance'} data-testid={'balance'} className={` ${inter600.className} text-white text-3xl  `}>{formatAmount(balance)}</p>
                            :
                            <div id={'closeIcon'} data-testid={'closeIcon'} className={` flex gap-2 `}>
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                            </div>
                        }
                        {isEyeOpen ?
                            <FiEyeOff id={'closeEyeIcon'} data-testid={'closeEyeIcon'} className={` mt-auto mb-auto `} onClick={ () => {setIsEyeOpen(!isEyeOpen)}} />
                            :
                            <FiEye  id={'upEyeIcon'} data-testid={'upEyeIcon'} className={` mt-auto mb-auto `} onClick={ () => {setIsEyeOpen(!isEyeOpen)}} />
                        }

                    </div>
                </div>
                <div className={` flex gap-4 `}>
                    <WalletButton
                        text={'Make payment'}
                        icon={<CircleArrow height={'20'} width={'20'}/>}
                    />
                    <WalletButton
                        text={'Fund wallet'}
                        icon={<FundWallet height={'20'} width={'20'}/>}
                    />
                    <WalletButton
                        text={'Withdraw'}
                        icon={<Withdraw height={'20'} width={'20'}/>}
                    />
                </div>
            </div>
            <div
                className={`  mt-auto  `}
            >
                <WalletConnect/>
            </div>
        </div>
    );
};

export default WalletBalance;