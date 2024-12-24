"use client"
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter, useSearchParams} from "next/navigation";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import TabConnector from "@/reuseable/details/tab-connector";
import styles from "./index.module.css"
import {useViewLoanRequestDetailsQuery} from "@/service/admin/loan/loan-request-api";


function LoanDetails () {
    const router = useRouter()
    const [currentTab] = useState(0)
    const searchParams = useSearchParams()


    const getId  = () => {
        if (searchParams){
            const pathVariable = searchParams.get("id")
            if (pathVariable){
                return pathVariable
            }else {
                return ""
            }
        }else {
            return ""
        }

    }
    const id : string =  getId()
    const {data} = useViewLoanRequestDetailsQuery(id)
    console.log("datssa: ", data)

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
            className={`  md:px-8 w-full h-full  px-3 pt-4 md:pt-4 `}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to loan request"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>
            <div
                id={`ImageComponentOnLoanRequestDetails`}
                data-testid={`ImageComponentOnLoanRequestDetails`}
                className={`  mt-4 mb-4 grid md:flex gap-3 h-fit md:justify-between md:gap-6 md:w-full  md:h-fit   `}
            >

                <div>
                    <Avatar id={'loaneeImageOnLoanRequestDetails'} data-testid={'loaneeImageOnLoanRequestDetails'}
                            className={`h-[8rem] w-[8rem] md:w-[8rem] md:h-[8rem] `}>
                        <AvatarImage src={`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`} alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div
                        className={`grid gap-2 mt-4`}
                    >
                        <div id={'loaneeNameOnLoanRequestDetails'} data-testid={'loaneeNameOnLoanRequestDetails'}
                             className={`${cabinetGroteskRegular.className} text-black text-xl md:text-3xl  `}>Sarah
                            Akinyemi
                        </div>
                        <div
                            className={`flex gap-2  `}
                        >
                        <span id={'loaneeProgramOnLoanRequestDetails'} data-testid={'loaneeProgramOnLoanRequestDetails'}
                              className={`${inter.className} text-sm text-black400`}>Product Design</span>
                            <span
                                className={`${inter.className} text-sm text-black400 mt-auto mb-auto md:mt-auto md:mb-auto `}>.</span>
                            <span id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoanRequestDetails'}
                                  className={`${inter.className} text-sm text-black400`}>Luminary</span>
                        </div>
                        {/*<Button*/}
                        {/*    id={'loaneeCheckCreditScoreOnLoanRequestDetails'}*/}
                        {/*    data-testid={'loaneeCheckCreditScoreOnLoanRequestDetails'}*/}
                        {/*    className={`${inter.className} w-fit px-4 md:mt-2 text-sm font-semibold text-meedlBlue border border-meedlBlue`}*/}
                        {/*>*/}
                        {/*    Check credit score*/}
                        {/*</Button>*/}
                    </div>
                </div>
                <div
                    className={`  overflow-x-hidden overflow-y-auto md:w-fit mt-4   w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                >
                    <div
                        className={` ${styles.tabConnector} md:w-fit pl-1  h-fit md:h-fit  flex md:flex `}
                    >
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoanDetails;