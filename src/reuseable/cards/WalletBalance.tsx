import React from 'react';
import Image from "next/image";
import {inter, inter600} from '@/app/fonts';
import {formatAmount} from "@/utils/Format";
import { FiEye ,FiEyeOff } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { Button } from '@/components/ui/button';

const WalletBalance = () => {
    const [isEyeOpen,setIsEyeOpen] = React.useState(false);
    return (
        <div
            className={` w-full h-[14rem] flex justify-between rounded-md bg-gradient-to-r from-[#142854] to-[#093086] `}
            // className={`relative w-full h-[12rem] rounded-md bg-red-200 `}
        >
            <div
                className={` w-full grid mt-auto mb-auto   pl-4 h-fit    `}
            >
                <div>
                    <p className={` ${inter.className} text-white text-xs `}>Wallet balance</p>
                    <div className={` flex gap-2  w-fit  ${inter600.className} text-white   `}>
                        {isEyeOpen ?
                            <p className={` ${inter600.className} text-white text-3xl  `}>{formatAmount(20000000)}</p>
                            :
                            <div className={` flex gap-2 `}>
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />
                                <GoDotFill className={` text-white `} />

                            </div>
                        }
                        {isEyeOpen ?
                            <FiEyeOff className={` mt-auto mb-auto `} onClick={ () => {setIsEyeOpen(!isEyeOpen)}} />
                            :
                            <FiEye className={` mt-auto mb-auto `} onClick={ () => {setIsEyeOpen(!isEyeOpen)}} />
                        }

                    </div>
                </div>
                <div>
                    <Button
                        className={` flex  `}
                    >
                        <HugeiconsIcon
                            icon={CircleArrowDataTransferHorizontalIcon}
                            size={24}
                            color="#142854"
                            strokeWidth={1.5}
                        />
                    </Button>
                </div>
            </div>
            <div className={` relative w-[23%] mt-auto h-[80%] b `}>
                <Image
                    src={`/chart-02.svg`}
                    fill
                    alt={''}
                    // width={100} height={100}
                    className={` object-cover `}
                >

                </Image>
            </div>
            {/*<HugeiconsIcon icon={Chart02Icon} className={` w-[16%] mt-auto h-[78%] font-thin `} color={'#FCF992'} />*/}
        </div>
    );
};

export default WalletBalance;