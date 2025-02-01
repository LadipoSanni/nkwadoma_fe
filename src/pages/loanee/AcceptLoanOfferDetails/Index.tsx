'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter, useSearchParams} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import {FaCircle} from "react-icons/fa6";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {Breakdown} from "@/reuseable/details/breakdown";
import {Checkbox} from "@/components/ui/checkbox";
import {useViewLoanOfferDetailsQuery, useRespondToLoanOfferMutation} from "@/service/admin/loan/loan-offer-api";
import dynamic from "next/dynamic";
import {useToast} from "@/hooks/use-toast";
import {getFirstLetterOfWord} from "@/utils/GlobalMethods";
import styles from "@/pages/admin/loanOfferDetails/index.module.css";

const AcceptLoanOfferDetails = dynamic(
    () => Promise.resolve(AcceptLoanOffer),
    {ssr: false}
)

const AcceptLoanOffer: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()
    const getUserToken = () => {
        if (searchParams) {
            const pathVariable = searchParams.get("loanOfferId")
            if (pathVariable) {
                return pathVariable
            } else {
                return ''
            }
        } else {
            return ""
        }
    }

    const loanOfferId: string = getUserToken()

    const { data } = useViewLoanOfferDetailsQuery(loanOfferId);
    const [respondToLoanOffer] = useRespondToLoanOfferMutation();

    const backToOverview = () => {
        router.push("/overview");
    };

    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ];

    const getCurrentDataList = () => {
        if (!data || !data.data) return [];

        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            dateOfBirth,
            stateOfOrigin,
            maritalStatus,
            stateOfResidence,
            nationality,
            residentialAddress,
            alternateEmail,
            alternatePhoneNumber,
            alternateContactAddress,
            nextOfKinEmail,
            nextOfKinPhoneNumber,
            nextOfKinRelationship,
            nextOfKinFirstName,
            nextOfKinLastName,
            nextOfKinContactAddress,
            tuitionAmount,
            initialDeposit,
            amountRequested,
            amountReceived,
            loanBreakdown
        } = data.data;

        switch (currentTab) {
            case 0:
                return [
                    { label: "First Name", value: firstName },
                    { label: "Last Name", value: lastName  },
                    { label: "Email address", value: email },
                    { label: "Phone number", value: phoneNumber  },
                    { label: "Date of birth", value: dateOfBirth  },
                    { label: "Marital status", value: maritalStatus  },
                    { label: "Nationality", value: nationality },
                    { label: "State of origin", value: stateOfOrigin },
                    { label: "State of residence", value: stateOfResidence },
                    { label: "Residential address", value: residentialAddress }
                ];
            case 1:
                return [
                    { label: "Alternate email address", value: alternateEmail },
                    { label: "Alternate phone number", value: alternatePhoneNumber },
                    { label: "Alternate residential address", value: alternateContactAddress  },
                    { label: "Next of kin name", value: `${nextOfKinFirstName} ${nextOfKinLastName}`},
                    { label: "Next of kin email address", value: nextOfKinEmail },
                    { label: "Next of kin phone number", value: nextOfKinPhoneNumber  },
                    { label: "Next of kin relationship", value: nextOfKinRelationship },
                    { label: "Next of kin contact address", value: nextOfKinContactAddress  }
                ];
            case 2:
                return [
                    { label: "Tuition amount", value: tuitionAmount  },
                    { label: "Initial deposit", value: initialDeposit },
                    { label: "Loan amount requested", value: amountRequested  },
                    { label: "Amount received", value: amountReceived  },
                    { label: "Loan breakdown", value: loanBreakdown  }
                ];
            default:
                return [];
        }
    };

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
    const {toast } = useToast()

    const handleAccept = async () => {
        const payload = {
            loanOfferId: loanOfferId,
            loaneeResponse: 'ACCEPTED' as const
        };

        try {
            const response = await respondToLoanOffer(payload);
            if ('error' in response) {
                const errorMessage = (response.error as { message?: string }).message || 'Error occurred, please try again';
                toast({
                    description: errorMessage,
                    status: 'error'
                });
                return;
            }
            toast({
                description: 'Loan offer accepted successfully',
                status: 'success'
            });
            router.push('/overview');
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : 'Error occurred, please try again';
            toast({
                description: errorMessage,
                status: 'error'
            });
        }
    };

    const handleDecline = async () => {
        const payload = {
            loanOfferId: loanOfferId,
            loaneeResponse: 'DECLINED' as const
        };

        try {
            const response = await respondToLoanOffer(payload);
            if ('error' in response) {
                const errorMessage = (response.error as { message?: string }).message || 'Error occurred, please try again';
                toast({
                    description: errorMessage,
                    status: 'error'
                });
                return;
            }
            toast({
                description: 'Loan offer declined',
                status: 'success'
            });
            router.push('/overview');
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : 'Error occurred, please try again';
            toast({
                description: errorMessage,
                status: 'error'
            });
        }
    };

    const userFirstLetter : string| undefined = data?.data?.firstName ? getFirstLetterOfWord(data?.data?.firstName) + "" + getFirstLetterOfWord(data?.data?.lastName) : ''


    return (
        <div
            id="loanRequestDetails"
            data-testid="loanRequestDetails"
            className={`w-full h-full ${inter.className}`}
        >
            <BackButton
                handleClick={backToOverview}
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
                            src={data?.data?.image}
                            alt="@shadcn"
                            style={{ objectFit: 'cover' }}
                        />
                        <AvatarFallback>{userFirstLetter}</AvatarFallback>
                    </Avatar>

                    <div className="grid gap-1 mt-4">
                        <div
                            id="loaneeNameOnLoanRequestDetails"
                            data-testid="loaneeNameOnLoanRequestDetails"
                            className={`${cabinetGroteskRegular.className} font-medium text-meedlBlack text-[24px] md:text-[28px] leading-[120%]`}
                        >
                            {data?.data.firstName} {data?.data.lastName}
                        </div>
                        <div className="flex gap-2 items-center">
                            <p
                                id="loaneeProgramOnLoanRequestDetails"
                                data-testid="loaneeProgramOnLoanRequestDetails"
                                className="text-sm text-black400"
                            >
                                {data?.data.programName}
                            </p>
                            <FaCircle className="h-1 w-1 text-blue550" />
                            <p
                                id="loaneeCohortOnLoanRequestDetails"
                                data-testid="loaneeCohortOnLoanRequestDetails"
                                className="text-sm text-black400"
                            >
                                {data?.data.cohortName}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.loanOfferDetails} md:w-fit  h-fit  w-full md:max-h-[70vh] md:h-fit border border-gray500 rounded-md md:px-4 grid gap-3 md:grid md:gap-3`}>

                    <div className={` ${styles.tabConnector} md:sticky md:top-0 md:py-3 md:bg-white md:w-fit pl-1 px-3 py-3 h-fit md:h-fit  flex md:flex`}>
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab} />
                    </div>
                    <div>
                        <ul className=" bg-grey105 ">
                            {getCurrentDataList().map((item, index) => (
                                <li key={index} className="p-5 grid gap-9 rounded-md">
                                    <div className="md:flex md:justify-between md:items-center md:gap-0 grid gap-3">
                                        <div className="text-black300 text-[14px] leading-[150%] font-normal">
                                            {item.label}
                                        </div>
                                        <div className="text-black500 text-[14px] leading-[150%] font-normal">
                                            {item.value ? item.value : 'Not provided'}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {currentTab === 2 && (
                                <section>
                                    <div className="px-5">
                                        <Breakdown breakDown={data?.data?.loaneeBreakdown}/>
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

                    <div className="md:sticky md:bottom-0 pb-3 md:py-3 md:bg-white md:flex   w-full justify-center grid md:justify-end gap-5 md:mt-0">
                        {currentTab !== 0 && (
                            <Button
                                className="w-[80vw] mr-auto ml-auto  md:w-[8.75rem] h-[3.5625rem] text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite"
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
                                            onSelect={handleAccept}
                                        >
                                            Accept loan offer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="rounded cursor-pointer p-2 flex items-center text-error500 focus:text-error500 hover:bg-error150"
                                            onSelect={handleDecline}
                                        >
                                            Decline loan offer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>
                        ) : (
                            <Button
                                className="w-[80vw] mr-auto ml-auto md:w-[8.75rem] h-[3.5625rem] bg-meedlBlue hover:bg-meedlBlue"
                                onClick={handleNext}
                                disabled={currentTab === loanRequestDetailsTab.length - 1}
                            >
                                Continue
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AcceptLoanOfferDetails;