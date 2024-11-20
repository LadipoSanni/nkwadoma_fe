"use client"
import React from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import styles from "./index.module.css"



const LoanDetails = () => {
    const router = useRouter()

    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }

    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ]

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={`  md:px-8 px-4 pt-4 md:pt-4 `}
            // className={`w-full h-full md:grid grid gap-2 md:px-8 px-4 pt-4 md:pt-4  md:w-full md:h-full  `}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to loan request"} id={"loanRequestDetailsBackButton"} textColor={'#142854'}  />
            <div
                id={`loanRequestDetailsComponent`}
                data-testid={'loanRequestDetailsComponent'}
                className={`w-full h-full md:flex md:justify-between grid gap-2 pt-8 md:pt-4  md:w-full md:h-full  `}
                // className={` w-full h-full md:w-full md:h-full rounded bg-lime-400 md:bg-lime-400 `}
            >
                <div
                    id={`ImageComponentOnLoanRequestDetails`}
                    data-testid={`ImageComponentOnLoanRequestDetails`}
                    className={` grid gap-3 md:grid md:gap-6 `}
                >

                    <Avatar id={'loaneeImageOnLoanRequestDetails'} data-testid={'loaneeImageOnLoanRequestDetails'} className={`h-[8rem] w-[8rem] md:w-[8rem] md:h-[8rem] `}>
                        <AvatarImage  src={`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div
                        className={`grid gap-2`}
                    >
                        <div id={'loaneeNameOnLoanRequestDetails'} data-testid={'loaneeNameOnLoanRequestDetails'} className={`${cabinetGroteskRegular.className} text-black text-xl md:text-3xl  `}>Sarah Akinyemi</div>
                        <div
                            className={`flex gap-2`}
                        >
                            <span id={'loaneeProgramOnLoanRequestDetails'} data-testid={'loaneeProgramOnLoanRequestDetails'} className={`${inter.className} text-sm text-black400`}>Product Design</span>
                            <span className={`${inter.className} text-sm text-black400`}>.</span>
                            <span id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoanRequestDetails'} className={`${inter.className} text-sm text-black400`}>Luminary</span>
                        </div>
                        <Button
                            id={'loaneeCheckCreditScoreOnLoanRequestDetails'}
                            data-testid={'loaneeCheckCreditScoreOnLoanRequestDetails'}
                            className={`${inter.className} w-fit px-4 text-sm font-semibold text-meedlBlue border border-meedlBlue`}
                        >
                            Check credit score
                        </Button>
                    </div>
                </div>
                <div
                    className={` ${styles.mainDetails} w-[100%] overflow-x-auto  md:w-fit px-2 py-4 h-fit border border-gray500 rounded-md `}
                >
                    <div
                        className={` w-[70%] ${styles.tabConnector}   `}
                    >
                        <TabConnector tabNames={loanRequestDetailsTab}/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;