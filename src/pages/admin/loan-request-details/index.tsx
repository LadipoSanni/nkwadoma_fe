"use client"
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";



const LoanDetails = () => {
    const router = useRouter()

    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={`w-full h-full md:flex grid gap-2 md:px-8 px-4 pt-4 md:pt-4  md:w-full md:h-full  `}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to loan request"} id={"loanRequestDetailsBackButton"} textColor={'#142854'}  />
        </div>
    );
};

export default LoanDetails;