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

const LoanDetailsContent = dynamic(
    () => Promise.resolve(LoanDetails),
    {ssr: false}
)

function LoanDetails() {
    const router = useRouter()
    const searchParams = useSearchParams()
    // const [breakdown] = useState<[]>([]);
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

    // const breakDown = [
    //     {itemName: 'tuition', itemAmount: '$2000'},
    //     {itemName: 'skincare', itemAmount: '$2000'},
    //     {itemName: 'head', itemAmount: '$2000'},
    //
    // ]
    const toggleArrow = () => {
        if (arrowDown) {
            setArrowDown(false)
        } else {
            setArrowDown(true)
        }
    };




    const handleNext = () => {
        if (currentTab == 1){
            const item = getloaneeloanDetails();
            setBreakDown(item)
            console.log('item:: ', item, "bress: ", breakDown)
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
    // const jj =  [
    //     {itemName: 'shoe', itemAmount: '2000'},
    //     {itemName: 'shoe', itemAmount: '2000'},
    //     {itemName: 'shoe', itemAmount: '2000'},
    //     {itemName: 'shoe', itemAmount: '2000'},
    //
    // ]
    const getloaneeloanDetails = () => {
        const loaneeeLoanBreakdowns =  data?.data?.body?.data?.loaneeLoanBreakdowns
        const loaneeloanBreakDown :{ itemName: string; itemAmount: string; }[] = [ ]
        loaneeeLoanBreakdowns?.forEach((element:loaneeLoanBreakDown) => loaneeloanBreakDown?.push({itemName: element?.itemName, itemAmount: element?.itemAmount} ) )
        // console.log("jj: ", jj, "jjk", loaneeloanBreakDown)
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
                    // value={'200000'}
                    prefix={'₦'}

                    className='bg-grey105 flex md:place-items-end '

                    value={data?.data?.body?.data?.tuitionAmount}
                    // placeholder={${detail.itemName}}
                    // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"

                />
        },
        {
            label: 'Start date', value:
            // dayjs(data?.data?.body?.data?.createdDate?.toString()).format('MMMM D, YYYY')
                dayjs(data?.data?.body?.data?.createdDate?.toString()).format('MMMM D, YYYY')

        },
        {
            label: 'Loan amount requested', value: <NumericFormat
                id={'loanAmountRequested'}
                name={'loanAmountRequested'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                // value={'200000'}
                className='bg-grey105 flex md:place-items-end '
                prefix={'₦'}
                value={data?.data?.body?.data?.loanAmountRequested}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"

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
                // value={'200000'}
                prefix={'₦'}
                value={data?.data?.body?.data?.initialDeposit}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                className='bg-grey105 flex md:place-items-end'

            />
        },
        {
            label: 'Credit score', value:
            // data?.data?.body?.data
                <div className={`flex gap-2 `}>
                    <span>Good</span>
                    <div
                        className={` w-fit md:w-fit md:h-fit h-fit md:py-0 py-0 md:px-1 px-1 md:rounded-md rounded-md border md:border border-green650 md:border-green650`}>
                        <span
                            className={`md:bg-green150 bg-green150 md:px-0.5 px-0.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-xs text-xs text-green750 md:text-green750 `}>234</span>
                    </div>
                </div>
        },

    ]

    const basic = [
        {label: 'Gender', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.gender},
        {label: 'Email address', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.email},
        {label: 'Phone number', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.phoneNumer},
        {label: 'Date of birth', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.dateOfBirth},
        {label: 'Marital status', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.maritalStatus},
        {label: 'Nationality', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.nationality},
        {label: 'State of origin ', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.stateOfOrigin},
        {label: 'State of residence', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.stateOfResidence},
    ]

    const additional = [
        {label: 'Alternate email address', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.alternateEmail},
        {label: 'Alternate phone number', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.alternatePhoneNumber},
        {label: 'Alternate residential address', value: data?.data?.body?.data?.loaneeLoanBreakdowns?.[0]?.loanee?.userIdentity?.alternateContactAddress},
        {
            label: 'Next of kin name',
            value: data?.data?.body?.data?.nextOfKin?.firstName + " " + data?.data?.body?.data?.nextOfKin?.lastName
        },
        {label: 'Next of kin email address', value: data?.data?.body?.data?.nextOfKin?.email},
        {label: 'Next of kin phone number', value: data?.data?.body?.data?.nextOfKin?.phoneNumber},
        {label: 'Next of kin relationship ', value: data?.data?.body?.data?.nextOfKin?.nextOfKinRelationship},

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
                            <span id={'loaneeCohortOnLoanRequestDetails'}
                                  data-testid={'loaneeCohortOnLoanRequestDetails'}
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
                    <div className={`px-2 md:px-0`}>
                        <div className={`bg-grey105 `}>
                            {getCurrentDataList().map((item, index) => (
                                <li key={"key" + index} className={'p-5  grid gap-9 rounded-md'}>
                                    <div
                                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                        <div
                                            className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</div>
                                        <div
                                            className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value}</div>
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
                <div  className="md:flex px-2 md:px-0 grid md:justify-end gap-5 mt-4">
                    {currentTab !== 0 && (
                        <Button
                            id={`backButtonOnIndex` + currentTab}
                            data-testid={`backButtonOnIndex` + currentTab}
                            className={'w-full md:w-fit md:px-6 md:py-4 h-fit py-4 text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite'}
                            onClick={handleBack} disabled={currentTab === 0}>Back</Button>
                    )}

                    <div
                        id={`continueButtonOnIndex` + currentTab}
                        data-testid={`continueButtonOnIndex` + currentTab}
                        className={'w-full justify-center md:w-fit md:px-8 md:rounded-md text-white  md:text-meedlWhite rounded-md flex gap-2 h-fit py-4 bg-meedlBlue hover:bg-meedlBlue'}
                        onClick={handleNext}
                        // disabled={currentTab === loanRequestDetailsTab.length - 1}>
                        >
                        {currentTab === 2 ? 'Make decision ' : 'Continue'}
                        {currentTab == 2 &&
                            <div className={''} >
                                {arrowDown ?
                                    <ChevronUpIcon
                                        id={'downIcon'}

                                        className={'h-5  cursor-pointer w-5 stroke-2 text-white'}
                                        onClick={toggleArrow}/>
                                    :
                                   <DropdownMenu>
                                       <DropdownMenuTrigger >
                                           <ChevronDownIcon
                                               className={'h-5  cursor-pointer w-5 stroke-2 text-white'}
                                               onClick={() => {setArrowDown(true)}}/>
                                       </DropdownMenuTrigger>
                                       <DropdownMenuContent >
                                            <DropdownMenuItem id={'loanRequestDetailsApproveLoanRequestButton'} data-testid={'loanRequestDetailsApproveLoanRequestButton'} onClick={() => {setOpenCreateLoanOffer(true)}} className={`md:text-meedleBlue text-meedlBlue hover:bg-[#EEF5FF] md:hover:bg-[#EEF5FF] rounded-md md:rounded-md `}>Approve loan request</DropdownMenuItem>
                                            <DropdownMenuItem id={'loanRequestDetailsDeclineLoanRequestButton'} data-testid={'loanRequestDetailsDeclineLoanRequestButton'} onClick={() => {setOpenDeclineLoanRequestModal(true)}} className={`text-error500 md:hover:text-error500 md:text-error500 md:hover:bg-error50 rounded-md md:rounded-md`}>Decline loan request</DropdownMenuItem>
                                       </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                            </div>
                        }
                    </div>
                    <CreateLoanOffer loanRequestId={getId()} isOpen={openCreateLoanOffer} setIsOpen={open} onSubmit={onSubmit} />
                    <DeclineLoanModal isOpen={openDeclineLoanRequestModal} loanRequestId={getId()} setIsOpen={open} loanProductId={""} title={""}/>

                </div>
            </div>
        </div>
</div>
)
}

export default LoanDetailsContent;