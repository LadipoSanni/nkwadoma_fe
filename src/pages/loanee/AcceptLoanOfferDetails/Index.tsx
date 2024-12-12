"use client"
import React, { useState } from 'react';
import BackButton from "@/components/back-button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cabinetGroteskRegular, inter } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
// import styles from "./index.module.css";

const AcceptLoanOfferDetails = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);

    const backToLoanRequest = () => {
        router.push("/loan/loan-request");
    };

    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ];

    const dataList = [
        { label: "Alternate email address", value: "mariiam@gmail.com" },
        { label: "Alternate phone number", value: "+2347039393309" },
        { label: "Alternative residential address", value: "300, Herbert Macaulay Way, Alagomeji, Sabo, Yaba" },
        { label: "Next of kin", value: "Samuel koko" },
        { label: "Next of kin phone number", value: "0903849449" },
        { label: "Next of kin email address", value: "maria@gmail.com" },
        { label: "Next of kin relation", value: "brother" },
    ];

    const handleNext = () => {
        if (currentTab < loanRequestDetailsTab.length - 1) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handleBack = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={`w-full h-full `}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to overview"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'} />

            <div
                id={`ImageComponentOnLoanRequestDetails`}
                data-testid={`ImageComponentOnLoanRequestDetails`}
                className={`mt-4 mb-4 grid md:flex gap-3 h-fit md:justify-between md:gap-6 md:w-full md:h-fit`}
            >
                <div>
                    <Avatar id={'loaneeImageOnLoanRequestDetails'} data-testid={'loaneeImageOnLoanRequestDetails'}
                            className={`h-[8rem] w-[8rem] md:w-[8rem] md:h-[8rem]`}>
                        <AvatarImage src={`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className={`grid gap-2 mt-4`}>
                        <div id={'loaneeNameOnLoanRequestDetails'} data-testid={'loaneeNameOnLoanRequestDetails'}
                             className={`${cabinetGroteskRegular.className} text-black text-xl md:text-3xl`}>Sarah Akinyemi
                        </div>
                        <div className={`flex gap-2`}>
                            <span id={'loaneeProgramOnLoanRequestDetails'} data-testid={'loaneeProgramOnLoanRequestDetails'}
                                  className={`${inter.className} text-sm text-black400`}>Product Design</span>
                            <span className={`${inter.className} text-sm text-black400 mt-auto mb-auto md:mt-auto md:mb-auto`}>.</span>
                            <span id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoanRequestDetails'}
                                  className={`${inter.className} text-sm text-black400`}>Luminary</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`overflow-x-hidden overflow-y-auto md:w-fit mt-4 w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid`}
                >
                    <div className={` md:w-fit pl-1 h-fit md:h-fit flex md:flex`}>
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab} />
                    </div>
                    <div>
                        {currentTab === 0 && (
                            <div >
                                <ul className={'h-64 overflow-auto'}>
                                    {dataList.map((item, index) => (
                                        <li key={index} className={'bg-grey105 p-5  grid gap-9 rounded-md'}>
                                            <div
                                                className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                                <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</p>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value}</p>
                                            </div>

                                        </li>))}
                                </ul>
                            </div>
                        )}
                        {currentTab === 1 && (
                            <div>
                                <ul className={'h-64 overflow-auto'}>
                                    {dataList.map((item, index) => (
                                        <li key={index} className={'bg-grey105 p-5  grid gap-9 rounded-md'}>
                                            <div
                                                className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                                <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</p>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value}</p>
                                            </div>

                                        </li>))}
                                </ul>
                            </div>
                        )}
                        {currentTab === 2 && (
                            <div>
                                <ul className={'h-64 overflow-auto'}>
                                    {dataList.map((item, index) => (
                                        <li key={index} className={'bg-grey105 p-5  grid gap-9 rounded-md'}>
                                            <div
                                                className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                                <p className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</p>
                                                <p className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value}</p>
                                            </div>

                                        </li>

                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-5 mt-4">
                        <Button className={'w-full md:w-[8.75rem] h-[3.5625rem] text-meedlBlue border border-meedlBlue bg-meedlWhite   hover:bg-meedlWhite'}  onClick={handleBack} disabled={currentTab === 0}>Back</Button>
                        <Button className={'w-full md:w-[8.75rem] h-[3.5625rem] bg-meedlBlue hover:bg-meedlBlue'} onClick={handleNext} disabled={currentTab === loanRequestDetailsTab.length - 1}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptLoanOfferDetails;