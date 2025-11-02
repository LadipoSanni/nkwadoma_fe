import React from 'react';
import Image from "next/image";

const WalletBalance = () => {
    return (
        <div
            className={` w-full h-[12rem] flex justify-between rounded-md bg-gradient-to-r from-[#142854] to-[#093086] `}
        >
            <div></div>
            <div className={` mb-0 h-[6rem] bg-red-300 `}>
                <Image src={`/chart-02.svg`}
                       alt={''} width={130} height={160}
                       className={` mb-0 `}
                />
            </div>
        </div>
    );
};

export default WalletBalance;