"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import BackButton from "@/components/back-button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cabinetGroteskRegular, inter, ibmPlexSans } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import { FaCircle } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Breakdown } from "@/reuseable/details/breakdown";
import { Checkbox } from "@/components/ui/checkbox";

const DeclineLoanModal = dynamic(
    () => import("@/reuseable/modals/declineLoan/Index"),
    { ssr: false }
);

interface LoanDetailsItem {
    label: string;
    value: string | React.ReactNode;
}

const AcceptLoanOfferDetails = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loanRequestId = "some-loan-39";
    const loanProductId = "some-loan-product-id";

    const backToLoanRequest = () => {
        router.push("/loan/loan-request");
    };

    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ];

    const basicDetails: LoanDetailsItem[] = [
        { label: "Gender", value: "Female" },
        { label: "Email address", value: "vanessa.oluchukwu@gmail.com" },
        { label: "Phone number", value: "+2348048950903" },
        { label: "Date of birth", value: "11 March, 1999" },
        { label: "Marital status", value: "Single" },
        { label: "Nationality", value: "Nigeria" },
        { label: "State of origin", value: "Imo" },
        { label: "State of residence", value: "Lagos" },
        { label: "Residential address", value: "316, Herbert Macaulay Way, Alagomeji, Sabo, Yaba" }
    ];

    const additionalDetails: LoanDetailsItem[] = [
        { label: "Alternate email address", value: "oluchukwuvanessa22@gmail.com" },
        { label: "Alternate phone number", value: "+2348095953713" },
        { label: "Alternate residential address", value: "300, Herbert Macaulay Way, Alagomeji, Sabo, Yaba" },
        { label: "Next of kin name", value: "Michael Oluchukwu" },
        { label: "Next of kin email address", value: "michael.oluchukwu@yahoo.com" },
        { label: "Next of kin phone number", value: "+23480960273902" },
        { label: "Next of kin relationship", value: "Brother" }
    ];

    const loanDetails: LoanDetailsItem[] = [
        { label: "Tuition amount", value: "₦3,500,000.00" },
        { label: "Start date", value: "13 Dec, 2023" },
        { label: "Loan amount requested", value: "₦4,000,000.00" },
        { label: "Deposit", value: "₦1,000,000.00" },
        {
            label: "Credit score",
            value: (
                <div className="flex gap-2">
                    Good
                    <span className="flex py-[3px] px-1 items-center justify-center rounded-md border border-green650 bg-meedlWhite">
                        <span className={`${ibmPlexSans.className} bg-green150 h-[15px] w-[26px] rounded-[3px] text-green750 text-[11px] leading-[18px] font-medium text-center`}>
                            670
                        </span>
                    </span>
                </div>
            )
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
                return basicDetails;
            case 1:
                return additionalDetails;
            case 2:
                return loanDetails;
            default:
                return [];
        }
    };

    return (
        <div
            id="loanRequestDetails"
            data-testid="loanRequestDetails"
            className={`w-full h-full ${inter.className}`}
        >
            <BackButton
                handleClick={backToLoanRequest}
                iconRight={true}
                text="Back to overview"
                id="loanRequestDetailsBackButton"
                textColor="#142854"
            />

            <div
                id="ImageComponentOnLoanRequestDetails"
                data-testid="ImageComponentOnLoanRequestDetails"
                className="mt-10 mb-4 grid md:flex gap-3 h-fit md:justify-between md:gap-6 md:w-full md:h-fit"
            >
                <div>
                    <Avatar
                        id="loaneeImageOnLoanRequestDetails"
                        data-testid="loaneeImageOnLoanRequestDetails"
                        className="h-[5.625rem] w-[5.625rem] md:w-[7.5rem] md:h-[7.5rem]"
                    >
                        <AvatarImage
                            src="/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg"
                            alt="@shadcn"
                            style={{ objectFit: 'cover' }}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1 mt-4">
                        <div
                            id="loaneeNameOnLoanRequestDetails"
                            data-testid="loaneeNameOnLoanRequestDetails"
                            className={`${cabinetGroteskRegular.className} font-medium text-meedlBlack text-[24px] md:text-[28px] leading-[120%]`}
                        >
                            Sarah Akinyemi
                        </div>
                        <div className="flex gap-2 items-center">
                            <p
                                id="loaneeProgramOnLoanRequestDetails"
                                data-testid="loaneeProgramOnLoanRequestDetails"
                                className="text-sm text-black400"
                            >
                                Product Design
                            </p>
                            <FaCircle className="h-1 w-1 text-blue550" />
                            <p
                                id="loaneeCohortOnLoanRequestDetails"
                                data-testid="loaneeCohortOnLoanRequestDetails"
                                className="text-sm text-black400"
                            >
                                Luminary
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-hidden overflow-y-auto md:w-[36.75rem] mt-4 w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid">
                    <div className="md:w-fit pl-1 h-fit md:h-fit flex md:flex">
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab} />
                    </div>
                    <div>
                        <ul className="h-64 bg-grey105 overflow-auto">
                            {getCurrentDataList().map((item, index) => (
                                <li key={index} className="p-5 grid gap-9 rounded-md">
                                    <div className="md:flex md:justify-between md:items-center md:gap-0 grid gap-3">
                                        <div className="text-black300 text-[14px] leading-[150%] font-normal">
                                            {item.label}
                                        </div>
                                        <div className="text-black500 text-[14px] leading-[150%] font-normal">
                                            {item.value}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {currentTab === 2 && (
                                <section>
                                    <div className="px-5">
                                        <Breakdown />
                                    </div>
                                    <div className="flex items-start gap-4 bg-grey105 p-5">
                                        <Checkbox
                                            id="confirmCheckbox"
                                            className="data-[state=checked]:bg-[#142854]"
                                            checked={isCheckboxChecked}
                                            onCheckedChange={(checked) => setIsCheckboxChecked(checked === true)}
                                        />
                                        <label
                                            htmlFor="confirmCheckbox"
                                            className="w-full text-black500 text-[14px] font-normal leading-[150%]"
                                        >
                                            I have read, understood and I agree with the{' '}
                                            <span className="cursor-pointer text-meedlBlue underline">
                                                Loan terms & conditions
                                            </span>
                                        </label>
                                    </div>
                                </section>
                            )}
                        </ul>
                    </div>

                    <div className="md:flex grid md:justify-end gap-5 mt-4">
                        {currentTab !== 0 && (
                            <Button
                                className="w-full md:w-[8.75rem] h-[3.5625rem] text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite"
                                onClick={handleBack}
                                disabled={currentTab === 0}
                            >
                                Back
                            </Button>
                        )}
                        {currentTab === loanRequestDetailsTab.length - 1 ? (
                            <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className={`flex gap-2 w-full md:w-[10.875rem] h-[3.5625rem] ${
                                            isCheckboxChecked ? 'bg-meedlBlue hover:bg-meedlBlue' : 'bg-blue100 hover:bg-blue100'
                                        }`}
                                        disabled={!isCheckboxChecked}
                                    >
                                        Make a decision
                                        {isDropdownOpen && isCheckboxChecked ? (
                                            <MdKeyboardArrowUp className="h-6 w-6 text-meedlWhite" />
                                        ) : (
                                            <MdKeyboardArrowDown className="h-6 w-6 text-meedlWhite" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                {isCheckboxChecked && (
                                    <DropdownMenuContent className="w-[176px] h-[86px] p-1 grid gap-1">
                                        <DropdownMenuItem
                                            className="rounded cursor-pointer p-2 flex items-center text-meedlBlue focus:text-meedlBlue hover:bg-lightBlue200"
                                            onSelect={() => console.log('Option 1 selected')}
                                        >
                                            Accept loan offer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="rounded cursor-pointer p-2 flex items-center text-error500 focus:text-error500 hover:bg-error150"
                                            onSelect={() => setIsModalOpen(true)}
                                        >
                                            Decline loan offer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>
                        ) : (
                            <Button
                                className="w-full md:w-[8.75rem] h-[3.5625rem] bg-meedlBlue hover:bg-meedlBlue"
                                onClick={handleNext}
                                disabled={currentTab === loanRequestDetailsTab.length - 1}
                            >
                                Continue
                            </Button>
                        )}

                        <DeclineLoanModal
                            isOpen={isModalOpen}
                            setIsOpen={setIsModalOpen}
                            loanRequestId={loanRequestId}
                            loanProductId={loanProductId}
                            title="Decline loan Offer"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcceptLoanOfferDetails;