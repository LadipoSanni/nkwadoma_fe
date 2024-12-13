"use client"
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cabinetGroteskRegular, inter, ibmPlexSans} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import {FaCircle} from "react-icons/fa6";
import {Breakdown} from "@/reuseable/details/breakdown";
import LoanTermsAndConditions from "@/reuseable/terms/loanTermsAndConditions/Index";

const LoanOfferDetails = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);

    const backToLoanRequest = () => {
        router.push("/loan/loan-request");
    };

    const loanRequestDetailsTab = [
        "Loan details",
        "Basic details",
        "Additional details",
        "Loan terms"
    ];

    const basicDetails = [
        {label: "Gender", value: "Female"},
        {label: "Email address", value: "vanessa.oluchukwu@gmail.com"},
        {label: "Phone number", value: "+2348048950903"},
        {label: "Date of birth", value: "11 March, 1999"},
        {label: "Marital status", value: "Single"},
        {label: "Nationality", value: "Nigeria"},
        {label: "State of origin", value: "Imo"},
        {label: "State of residence", value: "Lagos"},
        {label: "Residential address", value: "316, Herbert Macaulay Way, Alagomeji, Sabo, Yaba"}
    ];

    const additionalDetails = [
        {label: "Alternate email address", value: "oluchukwuvanessa22@gmail.com"},
        {label: "Alternate phone number", value: "+2348095953713"},
        {label: "Alternate residential address", value: "300, Herbert Macaulay Way, Alagomeji, Sabo, Yaba"},
        {label: "Next of kin name", value: "Michael Oluchukwu"},
        {label: "Next of kin email address", value: "michael.oluchukwu@yahoo.com"},
        {label: "Next of kin phone number", value: "+23480960273902"},
        {label: "Next of kin relationship", value: "Brother"}
    ];

    const loanDetails = [
        {label: "Tuition amount", value: "₦3,500,000.00"},
        {label: "Start date", value: "13 Dec, 2023"},
        {label: "Loan amount requested", value: "₦4,000,000.00"},
        {label: "Deposit", value: "₦1,000,000.00"},
        {
            label: "Credit score",
            value: <div className="flex gap-2">Good <span
                className="flex py-[3px] px-1 items-center justify-center rounded-md border border-green650 bg-meedlWhite"><span
                className={`${ibmPlexSans.className} bg-green150 h-[15px] w-[26px] rounded-[3px] text-green750 text-[11px] leading-[18px] font-medium text-center`}>670</span></span>
            </div>
        },
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

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return loanDetails;
            case 1:
                return basicDetails;
            case 2:
                return additionalDetails;

            default:
                return [];
        }
    };

    return (
        <div
            id={"loanRequestDetails"}
            data-testid={"loanRequestDetails"}
            className={`w-full h-full ${inter.className} pt-6 px-10`}
        >
            <BackButton handleClick={backToLoanRequest} iconRight={true} text={"Back to loan offer"}
                        id={"loanRequestDetailsBackButton"} textColor={'#142854'}/>

            <div
                id={`ImageComponentOnLoanRequestDetails`}
                data-testid={`ImageComponentOnLoanRequestDetails`}
                className={`mt-10 mb-4 grid md:flex gap-3 h-fit md:justify-between md:gap-6 md:w-full md:h-fit`}
            >
                <div>
                    <Avatar id={'loaneeImageOnLoanRequestDetails'} data-testid={'loaneeImageOnLoanRequestDetails'}
                            className={`h-[5.625rem] w-[5.625rem] md:w-[7.5rem] md:h-[7.5rem]`}>
                        <AvatarImage src={`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`} alt="@shadcn"
                                     style={{objectFit: 'cover'}}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className={`grid gap-1 mt-4`}>
                        <div id={'loaneeNameOnLoanRequestDetails'} data-testid={'loaneeNameOnLoanRequestDetails'}
                             className={`${cabinetGroteskRegular.className} font-medium  text-meedlBlack text-[24px] md:text-[28px] leading-[120%]`}>Sarah
                            Akinyemi
                        </div>
                        <div className={`flex gap-2 items-center`}>
                            <p id={'loaneeProgramOnLoanRequestDetails'}
                               data-testid={'loaneeProgramOnLoanRequestDetails'}
                               className={` text-sm text-black400`}>Product Design</p>
                            <FaCircle className={'h-1 w-1 text-blue550'}/>
                            <p id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoanRequestDetails'}
                               className={`text-sm text-black400`}>Luminary</p>
                        </div>
                    </div>
                </div>
                <div
                    className={`overflow-x-hidden overflow-y-auto md:w-[36.75rem]  mt-4 w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid`}
                >
                    <div className={` md:w-fit pl-1 h-fit md:h-fit flex md:flex`}>
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab}/>
                    </div>
                    <div>
                        <ul className={'h-64 bg-grey105   overflow-auto'}>
                            {currentTab === 3 ? (
                                <LoanTermsAndConditions />
                            ) : (
                                getCurrentDataList().map((item, index) => (
                                    <li key={index} className={'p-5  grid gap-9 rounded-md'}>
                                        <div
                                            className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                            <div
                                                className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</div>
                                            <div
                                                className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value}</div>
                                        </div>
                                    </li>
                                ))
                            )}
                            {currentTab === 0 && (
                                <section>
                                    <div className={'px-5'}>
                                        <Breakdown/>
                                    </div>
                                </section>
                            )}

                        </ul>
                    </div>
                    <div className="md:flex grid md:justify-end gap-5 mt-4">
                        {currentTab !== 0 && (
                            <Button
                                className={'w-full md:w-[8.75rem]  h-[3.5625rem] text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite'}
                                onClick={handleBack} disabled={currentTab === 0}>Back</Button>
                        )}

                        <Button className={'w-full md:w-[8.75rem] h-[3.5625rem] bg-meedlBlue hover:bg-meedlBlue'}
                                onClick={handleNext}
                                disabled={currentTab === loanRequestDetailsTab.length - 1}>
                            {currentTab === 3 ? 'Disburse loan' : 'Continue'}
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanOfferDetails;