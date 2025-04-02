import React from 'react';
import {inter, inter500} from "@/app/fonts";

const BeneficialOwnerStep = () => {
    return (
        <main className={`${inter.className} xl:px-36  grid-cols-1 gap-y-6  grid gap-10`}>
            <div className={`${inter500.className} grid gap-1`}>
                <h1 className={`text-meedlBlack text-[18px] leading-[150%] font-medium`}>Source of funds</h1>
                <p className={`text-black400 text-[14px] leading-[150%] font-normal`}>Add source</p>
            </div>

        </main>
    );
};

export default BeneficialOwnerStep;