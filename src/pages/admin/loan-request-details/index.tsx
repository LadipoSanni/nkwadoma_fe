"use client"
import React, {useState} from 'react';
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
import LoanDetailsCard from "@/reuseable/cards/loan-details-card";



const LoanDetails = () => {
    const router = useRouter()
    const [currentTab, setCurrentTab] = useState(0)

    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }

    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ]
    const dataList = [
        {label: "Alternate email address", value: "mariiam@gmail.com"},
        {label: "Alternate phone number", value: "+2347039393309"},
        {label: "Alternative residential address", value: "300, Herbert Macaulay Way, Alagomeji, Sabo, Yaba"},
        {label: "Next of kin", value: "Samuel koko"},
        {label: "Next of kin phone number", value: "0903849449"},
        {label: "Next of kin email address", value: "maria@gmail.com"},
        {label: "Next of kin relation", value: "brother"},

    ];

    const component = [
        {"basicDetails": <LoanDetailsCard dataList={dataList} id={"basicDetailsOnLoanDetails"} showNextButton={true} backButtonId={"continueToLoan"} nextButtonTittle={'continue'} />},
        {"AdditionalDetails": <LoanDetailsCard id={"basicDetailsOnLoanDetails"} />},
        {"LoanDetails": <LoanDetailsCard id={"basicDetailsOnLoanDetails"}/>}

    ]

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={` ${styles.container}  md:px-8 w-full h-full   px-4 pt-4 md:pt-4 `}
            // className={`w-full h-full md:grid grid gap-2 md:px-8 px-4 pt-4 md:pt-4  md:w-full md:h-full  `}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to loan request"} id={"loanRequestDetailsBackButton"} textColor={'#142854'}  />
            <div
                id={`loanRequestDetailsComponent`}
                data-testid={'loanRequestDetailsComponent'}
                className={`  overflow-y-auto md:overflow-y-hidden  grid grid-rows-2 w-full h-lvh md:flex  md:justify-between  pt-8 md:pt-4  md:w-full md:h-full  `}
                // className={` w-full h-full md:w-full md:h-full rounded bg-lime-400 md:bg-lime-400 `}
            >
                <div
                    id={`ImageComponentOnLoanRequestDetails`}
                    data-testid={`ImageComponentOnLoanRequestDetails`}
                    className={` bg-red-300 grid gap-3 h-fit md:grid md:gap-6 md:w-fit md:h-fit   `}
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
                            className={`flex gap-2  `}
                        >
                            <span id={'loaneeProgramOnLoanRequestDetails'} data-testid={'loaneeProgramOnLoanRequestDetails'} className={`${inter.className} text-sm text-black400`}>Product Design</span>
                            <span className={`${inter.className} text-sm text-black400 mt-auto mb-auto md:mt-auto md:mb-auto `}>.</span>
                            <span id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoanRequestDetails'} className={`${inter.className} text-sm text-black400`}>Luminary</span>
                        </div>
                        <Button
                            id={'loaneeCheckCreditScoreOnLoanRequestDetails'}
                            data-testid={'loaneeCheckCreditScoreOnLoanRequestDetails'}
                            className={`${inter.className} w-fit px-4 md:mt-2 text-sm font-semibold text-meedlBlue border border-meedlBlue`}
                        >
                            Check credit score
                        </Button>
                    </div>
                </div>
                <div
                    className={`  overflow-x-hidden overflow-y-auto md:w-fit  w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 px-3 py-3 grid gap-1 md:grid `}
                >
                   <div
                       className={` overflow-x-auto md:w-fit w-full h-[10px] md:h-fit  flex md:flex `}
                   >
                      <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab}/>
                   </div>
                    <LoanDetailsCard dataList={dataList} id={"basicDetailsOnLoanDetails"} showNextButton={true} backButtonId={"continueToLoan"} nextButtonTittle={'continue'} />

                </div>
            </div>
        </div>
    );
};

export default LoanDetails;