'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {cabinetGroteskMediumBold} from "@/app/fonts";

const Index = () => {

    const router = useRouter();
    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }


    return (
        <div
            id={'createLoanOffer'}
            data-testid={'createLoanOffer'}
            className={` w-full h-full px-3 py-3 md:py-4  md:px-6  `}
        >
            <BackButton handleClick={backToLoanRequest} iconBeforeLetters={true} text={"Back"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>

            <div
                className={` grid  md: `}
            >
                <p className={` ${cabinetGroteskMediumBold.className} text-[#101828] text-[28px]  `}>Create loan offer</p>

            </div>
            
        </div>
    );
};

export default Index;