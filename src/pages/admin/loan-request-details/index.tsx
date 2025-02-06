"use client"
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter, useSearchParams} from "next/navigation";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {cabinetGroteskMediumBold, cabinetGroteskRegular, inter} from "@/app/fonts";
import TabConnector from "@/reuseable/details/tab-connector";
import styles from "./index.module.css"
import {useViewLoanRequestDetailsQuery} from "@/service/admin/loan/loan-request-api";
import dynamic from 'next/dynamic'
import {Breakdown} from "@/reuseable/details/breakdown";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {store} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CreateLoanOffer from "@/reuseable/modals/createLoanOffer/Index";
import DeclineLoanModal from "@/reuseable/modals/declineLoan/Index";
import {loaneeLoanBreakDown} from "@/types/loan/loan-request.type";
import {getFirstLetterOfWord} from "@/utils/GlobalMethods";

const LoanDetailsContent = dynamic(
    () => Promise.resolve(LoanDetails),
    {ssr: false}
)

function LoanDetails() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentTab, setCurrentsTab] = useState(0);
    const [arrowDown, setArrowDown] = useState(false);
    const [openCreateLoanOffer, setOpenCreateLoanOffer] = useState(false)
    const [openDeclineLoanRequestModal, setOpenDeclineLoanRequestModal] = useState(false)
    const [breakDown, setBreakDown] = useState<{ itemName: string; itemAmount: string; }[]>()



    const getId = () => {
        if (searchParams) {
            const pathVariable = searchParams.get("id")
            if (pathVariable) {
                return pathVariable
            } else {
                return ""
            }
        } else {
            return ""
        }

    }
    const onSubmit   = (data: {amountApproved: string, loanProduct: string} ) => {
        // this is so it doesn't throw unuse variable error
        console.log("data: ", data)
    }
    const id: string = getId()
    const {data} = useViewLoanRequestDetailsQuery(id)
    const backToLoanRequest = () => {
        store.dispatch(setCurrentTab('Loan requests'))
        router.push("/loan/loan-request")
    }
    const loanRequestDetailsTab = [
        "Basic details",
        "Additional details",
        "Loan details"
    ]

    const toggleArrow = () => {
        if (!arrowDown) {
            setArrowDown(true)
        } else {
            setArrowDown(false)
        }
    };

    const startDate = dayjs(data?.data?.createdDate?.toString()).format('MMM D, YYYY')
    const cohortStartDate = dayjs(data?.data?.cohortStartDate?.toString()).format('MMM D, YYYY')

    const handleNext = () => {
        if (currentTab == 1){
            const item = getloaneeloanDetails();
            setBreakDown(item)
        }
        if (currentTab < loanRequestDetailsTab.length - 1) {
            setCurrentsTab(currentTab + 1);
        }
    };

    const handleBack = () => {
        if (currentTab > 0) {
            setCurrentsTab(currentTab - 1);
        }
    };

    const getloaneeloanDetails = () => {
        const loaneeeLoanBreakdowns =  data?.data?.loaneeLoanBreakdowns
        const loaneeloanBreakDown :{ itemName: string; itemAmount: string; }[] = [ ]
        loaneeeLoanBreakdowns?.forEach((element:loaneeLoanBreakDown) => loaneeloanBreakDown?.push({itemName: element?.itemName, itemAmount: element?.itemAmount} ) )
        return loaneeloanBreakDown;
    }

    const loanDetil = [
        {
            label: 'Tuition', value:
                <NumericFormat
                    id={'loanTuitionAmount'}
                    name={'loanTuitionAmount'}
                    type="text"
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'₦'}
                    className='bg-grey105 flex md:place-items-end '
                    value={data?.data?.tuitionAmount}
                />
        },
            {
                label: 'Start date', value: startDate
            },
        {
                label: 'Cohort start date', value: cohortStartDate
            },
        {
            label: 'Loan amount requested', value: <NumericFormat
                id={'loanAmountRequested'}
                name={'loanAmountRequested'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                className='bg-grey105 flex md:place-items-end '
                prefix={'₦'}
                value={data?.data?.loanAmountRequested}
            />
        },
        {
            label: 'Deposit', value: <NumericFormat
                id={'depositOnLoanRequestDetails'}
                name={'depositOnLoanRequestDetails'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                value={data?.data?.initialDeposit}
                className='bg-grey105 flex md:place-items-end'

            />
        },
        {
            label: 'Credit score', value:
                <div className={`flex gap-2 `}>
                    <span>Good</span>
                    <div
                        className={` w-fit md:w-fit md:h-fit h-fit md:py-0 py-0 md:px-1 px-1 md:rounded-md rounded-md border md:border border-green650 md:border-green650`}>
                        <span
                            className={`md:bg-green150 bg-green150 md:px-0.5 px-0.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-xs text-xs text-green750 md:text-green750 `}>{data?.data?.creditScore}</span>
                    </div>
                </div>
        },

    ]

    const basic = [
        {label: 'Gender', value: data?.data.userIdentity.gender},
        {label: 'Email address', value: data?.data.userIdentity.email},
        {label: 'Phone number', value: data?.data?.userIdentity.phoneNumber},
        {label: 'Date of birth', value: data?.data?.userIdentity.dateOfBirth},
        {label: 'Marital status', value: data?.data?.userIdentity.maritalStatus},
        {label: 'Nationality', value: data?.data?.userIdentity?.nationality},
        {label: 'State of origin ', value: data?.data?.userIdentity?.stateOfOrigin},
        {label: 'State of residence', value: data?.data?.userIdentity?.stateOfResidence},
        // {label: 'State of residence', value: data?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.stateOfResidence},
    ]

    const additional = [
        {label: 'Alternate email address', value: data?.data.alternateEmail},
        {label: 'Alternate phone number', value: data?.data.alternatePhoneNumber},
        {label: 'Alternate residential address', value: data?.data.alternateContactAddress},
        {
            label: 'Next of kin name',
            value: data?.data?.nextOfKin?.firstName && data?.data?.nextOfKin?.lastName
                ? `${data?.data?.nextOfKin?.firstName} ${data?.data?.nextOfKin?.lastName}`
                : 'Not provided'
        },
        {label: 'Next of kin email address', value: data?.data?.nextOfKin?.email},
        {label: 'Next of kin phone number', value: data?.data?.nextOfKin?.phoneNumber},
        {label: 'Next of kin relationship ', value: data?.data?.nextOfKin?.nextOfKinRelationship},

    ]



    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return basic;
            case 1:
                return additional;
            case 2:
                return loanDetil;

            default:
                return [];
        }
    };

    const open =  (value: boolean) => {
        setOpenCreateLoanOffer(value)
    }

    const setOpenDeclineOffer = (value: boolean) => {
        setOpenDeclineLoanRequestModal(value)
    }


    const userFirstLetter : string| undefined = data?.data?.firstName ?   getFirstLetterOfWord(data?.data?.firstName) + "" + getFirstLetterOfWord(data?.data?.lastName) : ''

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
                        <AvatarImage src={data?.data?.body?.data?.image} alt="@shadcn"/>
                        <AvatarFallback>{userFirstLetter}</AvatarFallback>
                    </Avatar>

                    <div
                        className={`grid gap-2 mt-4`}
                    >
                        <div id={'loaneeNameOnLoanRequestDetails'} data-testid={'loaneeNameOnLoanRequestDetails'}
                             className={`${cabinetGroteskRegular.className} text-black flex text-xl gap-2 md:flex md:gap-2 md:text-3xl  `}>
                            <span className={`${cabinetGroteskMediumBold.className} text-black  gap-2 text-3xl md:text-3xl`}>{data?.data?.firstName}</span>
                            <span className={`${cabinetGroteskMediumBold.className} text-black  gap-2 text-3xl  md:text-3xl`}>{data?.data?.lastName}</span>
                        </div>
                        <div
                            className={`flex gap-2   `}
                        >
                        <span id={'loaneeProgramOnLoanRequestDetails'} data-testid={'loaneeProgramOnLoanRequestDetails'}
                              className={`${inter.className} text-sm text-black400`}> {data?.data?.programName}</span>
                            <span
                                className={` w-1 h-1 mt-auto mb-auto rounded-full bg-[#D7D7D7] `}></span>
                            <span id={'loaneeCohortOnLoanRequestDetails'}
                                  data-testid={'loaneeCohortOnLoanRequestDetails'}
                                  className={`${inter.className} text-sm text-black400`}>{data?.data?.cohortName}</span>
                        </div>
                    </div>
                </div>
                <div
                    className={` ${styles.loanRequestDetails} md:w-fit h-full  w-full md:max-h-[70vh] md:h-fit border border-gray500 rounded-md md:px-4  grid gap-3 md:grid md:gap-3`}
                >
                    <div
                        className={` ${styles.tabConnector} md:w-fit py-3 pl-1 md:sticky md:top-0 md:py-3 md:bg-white h-fit md:h-fit  flex md:flex `}
                    >
                        <TabConnector tabNames={loanRequestDetailsTab} currentTab={currentTab}/>
                    </div>
                    <div className={`px-2 md:px-0`}>
                        <div className={`bg-grey105 `}>
                            {getCurrentDataList().map((item, index) => (
                                <li key={"key" + index} className={'p-5  grid gap-9 rounded-md'}>
                                    <div
                                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                        <div
                                            className={`  ${inter.className} text-black300 text-[14px] leading-[150%] font-normal`}>{item.label}</div>
                                        <div
                                            className={` ${inter.className}  text-black500 text-[14px] leading-[150%] font-normal`}> {item.value ? item.value : 'Not provided'}</div>
                                    </div>
                                </li>
                            ))
                            }
                            <div className={` px-3 pb-2`}>
                                {currentTab == 2 &&
                                    <Breakdown breakDown={breakDown}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                <div  className="md:sticky md:bottom-0 md:py-3 md:bg-white md:flex px-2 md:px-0 py-3 grid md:justify-end gap-5 mt-4">
                    {currentTab !== 0 && (
                        <Button
                            id={`backButtonOnIndex` + currentTab}
                            data-testid={`backButtonOnIndex` + currentTab}
                            className={` ${inter.className} w-full md:w-fit md:h-fit md:px-8 md:py-3 h-fit py-4 text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite`}
                            onClick={handleBack} disabled={currentTab === 0}>Back</Button>
                    )}
                    {currentTab === 2 &&
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <div
                                    id={`continueButtonOnIndex` + currentTab}
                                    data-testid={`continueButtonOnIndex` + currentTab}
                                    className={'w-full justify-center md:py-3 md:w-fit md:px-8 md:rounded-md text-white  md:text-meedlWhite rounded-md flex gap-2 h-fit py-4 bg-meedlBlue hover:bg-meedlBlue'}
                                    onClick={toggleArrow}
                                >
                                    Make decision
                                    {arrowDown ?
                                        <ChevronUpIcon
                                                            className={'h-5  cursor-pointer w-5 stroke-2 text-white'}

                                        />
                                        :
                                        <ChevronDownIcon className={'h-5  cursor-pointer w-5 stroke-2 text-white'} />
                                    }

                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent >
                                <DropdownMenuItem id={'loanRequestDetailsApproveLoanRequestButton'} data-testid={'loanRequestDetailsApproveLoanRequestButton'} onClick={() => {setOpenCreateLoanOffer(true)}} className={`md:text-meedleBlue text-meedlBlue hover:bg-[#EEF5FF] md:hover:bg-[#EEF5FF] rounded-md md:rounded-md `}>Approve loan request</DropdownMenuItem>
                                <DropdownMenuItem id={'loanRequestDetailsDeclineLoanRequestButton'} data-testid={'loanRequestDetailsDeclineLoanRequestButton'} onClick={() => {setOpenDeclineLoanRequestModal(true)}} className={`text-error500 md:hover:text-error500 md:text-error500 md:hover:bg-error50 rounded-md md:rounded-md`}>Decline loan request</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    }


                    {currentTab !== 2 &&

                    <button
                        id={`continueButtonOnIndex` + currentTab}
                        data-testid={`continueButtonOnIndex` + currentTab}
                        className={` ${inter.className} w-full justify-center md:py-3 md:w-fit md:px-8 md:rounded-md text-white  md:text-meedlWhite rounded-md flex gap-2 h-fit py-4 bg-meedlBlue hover:bg-meedlBlue`}
                        onClick={handleNext}
                        >
                        Continue

                    </button>
                    }
                    <CreateLoanOffer loanRequestId={getId()} isOpen={openCreateLoanOffer} setIsOpen={open} onSubmit={onSubmit} />
                    <DeclineLoanModal isOpen={openDeclineLoanRequestModal} loanRequestId={getId()} setIsOpen={setOpenDeclineOffer} loanProductId={id} title={"Decline loan request"} />

                </div>
            </div>
        </div>
</div>
)
}

export default LoanDetailsContent;