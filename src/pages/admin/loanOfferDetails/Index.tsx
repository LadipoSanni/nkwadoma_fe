"use client"
import React, { useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter, useSearchParams} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cabinetGroteskMediumBold, cabinetGroteskRegular, ibmPlexSans} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import {FaCircle} from "react-icons/fa6";
import {Breakdown} from "@/reuseable/details/breakdown";
import {store} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";
import {useViewLoanOfferDetailsQuery, useDisburseLoanOfferMutation} from "@/service/admin/loan/loan-offer-api";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import styles from "./index.module.css"
import dynamic from "next/dynamic";
import {getFirstLetterOfWord} from "@/utils/GlobalMethods";


const LoanOfferDetailsContent = dynamic(
    () => Promise.resolve(LoanOfferDetails),
    {ssr: false}
)

const LoanOfferDetails = () => {
    const router = useRouter();
    const [currentTab, setCurrentsTab] = useState(0);
    const searchParams = useSearchParams()
    const [disburseLoan] = useDisburseLoanOfferMutation()

    // useViewLoanOfferDetailsQuery
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
    const id: string = getId()
    const {data} = useViewLoanOfferDetailsQuery(id)

    console.log('data', data)
    const getLoaneeLoanBreakdown= () => {
        const loaneeLoanBreakDown = data?.data?.loaneeBreakdown
        const items :{itemAmount: string, itemName: string}[] = []
        loaneeLoanBreakDown?.forEach((loanBreakDown:{currency: string, itemAmount: string, itemName: string, loaneeLoanBreakdownId: string}) => (items ?.push({itemName: loanBreakDown?.itemName,itemAmount: loanBreakDown?.itemAmount})))
        return items;
    }
    const breakDown = getLoaneeLoanBreakdown();

    const backToLoanOffer = () => {
        store.dispatch(setCurrentTab('Loan offers'))
        router.push("/loan/loan-offer");
    };

    const loanOfferDetailsTab = [
        "Loan details",
        "Basic details",
        "Additional details",
        "Loan terms"
    ];




    const basicDetails = [
        {label: 'Gender', value: data?.data?.gender},
        {label: 'Email address', value: data?.data?.email},
        {label: 'Phone number', value: data?.data?.phoneNumer},
        {label: 'Date of birth', value: data?.data?.dateOfBirth},
        {label: 'Marital status', value: data?.data?.maritalStatus},
        {label: 'Nationality', value: data?.data?.nationality},
        {label: 'State of origin ', value: data?.data?.stateOfOrigin},
        {label: 'State of residence', value: data?.data?.stateOfResidence},
        {label: "Residential address", value: data?.data?.residentialAddress},
    ];

    const additionalDetails = [
        {label: 'Alternate email address', value: data?.data?.alternateEmail},
        {label: 'Alternate phone number', value: data?.data?.alternatePhoneNumber},
        {label: 'Alternate residential address', value: data?.data?.alternateContactAddress},
        {
            label: 'Next of kin name',
            value: data?.data?.nextOfKinFirstName + " " +data?.data?.nextOfKinLastName
        },
        {label: 'Next of kin email address', value: data?.data?.nextOfKinEmail},
        {label: 'Next of kin phone number', value: data?.data?.nextOfKinPhoneNumber},
        {label: 'Next of kin relationship ', value: data?.data?.nextOfKinRelationship},
    ];

    const loanDetails = [
        {label: "Tuition amount", value:  <NumericFormat
                id={'loanTuitionAmount'}
                name={'loanTuitionAmount'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                className='bg-grey105 flex md:place-items-end '
                value={data?.data?.tuitionAmount}
            />},
        {label: "Start date", value:
                 dayjs(data?.data?.startDate?.toString()).format('MMMM D, YYYY')
        },
        {label: "Loan amount requested", value: <NumericFormat
                id={'loanAmountRequested'}
                name={'loanAmountRequested'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                className='bg-grey105 flex md:place-items-end '
                prefix={'₦'}
                value={data?.data?.amountRequested}
            />},
        {label: "Deposit", value:  <NumericFormat
                id={'depositOnLoanRequestDetails'}
                name={'depositOnLoanRequestDetails'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                value={data?.data?.initialDeposit}
                className='bg-grey105 flex md:place-items-end'

            />},
        {
            label: "Credit score",
            value: <div className="flex gap-2"> <span
                className="flex py-[3px] px-1 items-center justify-center rounded-md border border-green650 bg-meedlWhite"><span
                className={`${ibmPlexSans.className} bg-green150 h-[15px] w-[26px] rounded-[3px] text-green750 text-[11px] leading-[18px] font-medium text-center`}>
                {data?.data?.body?.loanRequestResponse?.loaneeLoanBreakdowns?.[0]?.loanee?.creditScore}
            </span></span>
            </div>
        },
    ];
    const disburseLoanOffer = () => {

        const body = {
            loanOfferId: id,

        }

    }

    const handleNext = () => {
        if (currentTab === 3 ){

            disburseLoanOffer()
        }else {
            if (currentTab < loanOfferDetailsTab.length - 1) {
                setCurrentsTab(currentTab + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentTab > 0) {
            setCurrentsTab(currentTab - 1);
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

    const userFirstLetter : string| undefined = getFirstLetterOfWord(data?.data?.firstName) + "" + getFirstLetterOfWord(data?.data?.lastName)


    return (
        <div
            id={"loanOfferDetails"}
            data-testid={"loanOfferDetails"}
            className={`md:px-8 w-full h-full  px-3 pt-4 md:pt-4`}
        >
            <BackButton handleClick={backToLoanOffer} iconRight={true} text={"Back to loan offer"}
                        id={"loanOfferDetailsBackButton"} textColor={'#142854'}/>

            <div
                id={`ImageComponentOnLoanOfferDetails`}
                data-testid={`ImageComponentOnLoanOfferDetails`}
                className={`mt-10 mb-4 grid md:flex gap-3 h-fit md:justify-between md:gap-6 md:w-full md:h-fit`}
            >
                <div>
                    <Avatar id={'loaneeImageOnLoanOfferDetails'} data-testid={'loaneeImageOnLoanOfferDetails'}
                            className={`h-[5.625rem] w-[5.625rem] md:w-[7.5rem] md:h-[7.5rem]`}>
                        {/*`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`*/}
                        <AvatarImage src={data?.data?.image} alt="@shadcn"
                                     style={{objectFit: 'cover'}}/>
                        <AvatarFallback>{userFirstLetter}</AvatarFallback>
                    </Avatar>

                    <div className={`grid gap-1 mt-4`}>
                        <div id={'loaneeNameOnLoanRequestDetails'} data-testid={'loaneeNameOnLoanRequestDetails'}
                             className={`${cabinetGroteskRegular.className} text-black flex text-xl gap-2 md:flex md:gap-2 md:text-3xl  `}>
                            <span
                                className={`${cabinetGroteskMediumBold.className} text-black  gap-2 text-3xl md:text-3xl`}>{data?.data?.firstName}</span>
                            <span
                                className={`${cabinetGroteskMediumBold.className} text-black  gap-2 text-3xl  md:text-3xl`}>{data?.data?.lastName}</span>
                        </div>
                        <div className={`flex gap-2 items-center`}>
                            <p id={'loaneeProgramOnLoanOfferDetails'}
                               data-testid={'loaneeProgramOnLoanOfferDetails'}
                               className={` text-sm text-black400`}>{data?.data?.body?.loanRequestResponse?.programName}</p>
                            <FaCircle className={'h-1 w-1 text-blue550'}/>
                            <p id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoaOfferDetails'}
                               className={`text-sm text-black400`}>{data?.data?.body?.loanRequestResponse?.cohortName}</p>
                        </div>
                    </div>
                </div>
                <div
                    className={` ${styles.loanOfferDetails} md:w-fit h-full  w-full md:max-h-[70vh] md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid md:gap-3`}
                >

                    <div className={`${styles.tabConnector} md:w-fit pl-1  h-fit md:h-fit  flex md:flex `}>
                        <TabConnector tabNames={loanOfferDetailsTab} currentTab={currentTab}/>
                    </div>
                    <div className={``}>
                        <ul className={'bg-grey105  '}>
                            {currentTab === 3 ? (
                                <div className={`w-full px-4 md:w-full md:px-6 `}>
                                    {/*<LoanTermsAndConditions />*/}
                                </div>
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
                                        <Breakdown breakDown={breakDown}/>
                                    </div>
                                </section>
                            )}

                        </ul>
                    </div>
                    <div className="  md:flex grid md:justify-end gap-5 md:mt-0">
                        {currentTab !== 0 && (
                            <Button
                                className={'w-full md:w-fit md:px-6 md:py-4 h-fit py-4 text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite'}
                                onClick={handleBack} disabled={currentTab === 0}>Back</Button>
                        )}

                        <Button className={'w-full justify-center md:w-fit md:px-8 md:rounded-md text-white  md:text-meedlWhite rounded-md flex gap-2 h-fit py-4 bg-meedlBlue hover:bg-meedlBlue'}
                                onClick={handleNext}
                                // disabled={currentTab === loanOfferDetailsTab.length - 1}
                        >
                            {currentTab === 3 ? 'Disburse loan' : 'Continue'}
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanOfferDetailsContent;