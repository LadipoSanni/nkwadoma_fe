"use client"
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import Image from "next/image"



const LoanDetails = () => {
    const router = useRouter()

    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={`md:px-8 px-4 pt-4 md:pt-4 `}
            // className={`w-full h-full md:grid grid gap-2 md:px-8 px-4 pt-4 md:pt-4  md:w-full md:h-full  `}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to loan request"} id={"loanRequestDetailsBackButton"} textColor={'#142854'}  />
            <div
                id={`loanRequestDetailsComponent`}
                data-testid={'loanRequestDetailsComponent'}
                className={`w-full h-full md:flex grid gap-2 pt-8 md:pt-4  md:w-full md:h-full  `}
                // className={` w-full h-full md:w-full md:h-full rounded bg-lime-400 md:bg-lime-400 `}
            >
                <div
                    id={`ImageComponentOnLoanRequestDetails`}
                    data-testid={`ImageComponentOnLoanRequestDetails`}
                    className={` grid md:grid`}
                >
                    <Image
                        id={'meddleMainLogoOnAdminLayout'}
                        data-testid={'meddleMainLogoOnAdminLayout'}
                        width={100}
                        height={100}
                        src={'/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg'}
                    />

                </div>
            </div>
        </div>
    );
};

export default LoanDetails;