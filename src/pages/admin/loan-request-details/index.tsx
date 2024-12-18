"use client"
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
// useSearchParams
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import styles from "./index.module.css"
// import {useViewLoanRequestDetailsQuery} from "@/service/admin/loan/loan-request-api";
// import LoanDetailsCard from "@/reuseable/cards/loan-details-card";


const LoanDetails = () => {
    const router = useRouter()
    const [currentTab] = useState(0)
    // const pathName = pa
    // const searchParams = useSearchParams()
    // // @ts-expect-error
    // const loanRequestId =  searchParams.get('id')
    // const {data} = useViewLoanRequestDetailsQuery(loanRequestId)
    // console.log("datssa: ", data)


    const backToLoanRequest = () => {
        router.push("/loan/loan-request")
    }

    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ]
    // const dataList = [
    //     {label: "Alternate email address", value: "mariiam@gmail.com"},
    //     {label: "Alternate phone number", value: "+2347039393309"},
    //     {label: "Alternative residential address", value: "300, Herbert Macaulay Way, Alagomeji, Sabo, Yaba"},
    //     {label: "Next of kin", value: "Samuel koko"},
    //     {label: "Next of kin phone number", value: "0903849449"},
    //     {label: "Next of kin email address", value: "maria@gmail.com"},
    //     {label: "Next of kin relation", value: "brother"},
    //
    // ];
    // const componentSteps : {
    //     'step1': <LoanDetailsCard dataList={dataList} id={"basicDetailsOnLoanDetails"} showNextButton={true}
    //                      backButtonId={"continueToLoan"} nextButtonTittle={'continue'}/>,
    //     'step2' : <LoanDetailsCard dataList={dataList} id={"basicDetailsOnLoanDetails"} showNextButton={true}
    //                      backButtonId={"continueToLoan"} nextButtonTittle={'continue'}/>,
    //     'step3':<LoanDetailsCard dataList={dataList} id={"basicDetailsOnLoanDetails"} showNextButton={true}
    //                      backButtonId={"continueToLoan"} nextButtonTittle={'continue'}/>
    //
    // }

    // const component = [
    //     {
    //         "basicDetails": <LoanDetailsCard dataList={dataList} id={"basicDetailsOnLoanDetails"} showNextButton={true}
    //                                          backButtonId={"continueToLoan"} nextButtonTittle={'continue'}/>
    //     },
    //     {"AdditionalDetails": <LoanDetailsCard id={"basicDetailsOnLoanDetails"}/>},
    //     {"LoanDetails": <LoanDetailsCard id={"basicDetailsOnLoanDetails"}/>}
    //
    // ]

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={`  md:px-8 w-full h-full  px-3 pt-4 md:pt-4 `}
            // className={`w-full h-full md:grid grid gap-2 md:px-8 px-4 pt-4 md:pt-4  md:w-full md:h-full  `}
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
                    className={`  overflow-x-hidden overflow-y-auto md:w-fit mt-4   w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                >
                    <div
                        className={` ${styles.tabConnector} md:w-fit pl-1  h-fit md:h-fit  flex md:flex `}
                    >
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab}/>
                    </div>
                    {/*<LoanDetailsCard/>*/}
                   {/*<div>*/}
                   {/*    {componentSteps[currentTab]}*/}
                   {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;