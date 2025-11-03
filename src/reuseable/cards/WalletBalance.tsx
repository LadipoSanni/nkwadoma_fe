import React from 'react';
import Image from "next/image";
import {inter, inter600} from '@/app/fonts';
import {formatAmount} from "@/utils/Format";
import { HugeiconsIcon } from '@hugeicons/react'
import { Chart02Icon } from '@hugeicons/core-free-icons'

const WalletBalance = () => {
    return (
        <div
            className={` w-full h-[15rem] flex justify-between rounded-md bg-gradient-to-r from-[#142854] to-[#093086] `}
            // className={`relative w-full h-[12rem] rounded-md bg-red-200 `}
        >
            <div
                className={` w-full grid   items-center pl-4 h-fit    `}
            >
                <p className={` ${inter.className} text-white text-xs `}>Wallet balance</p>
                <div className={`  ${inter600.className} text-white text-3xl  `}>
                    <p>{formatAmount(20000000)}</p>
                </div>

            </div>
            {/*<div className={` relative w-[16%] mt-auto h-[78%] b `}>*/}
            {/*    <Image*/}
            {/*        src={`/chart-02.svg`}*/}
            {/*        fill*/}
            {/*        alt={''}*/}
            {/*        // width={100} height={100}*/}
            {/*        className={` object-cover `}*/}
            {/*    >*/}

            {/*    </Image>*/}
            {/*</div>*/}
            <HugeiconsIcon icon={Chart02Icon} />
        </div>
    );
};

export default WalletBalance;