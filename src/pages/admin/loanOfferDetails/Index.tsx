"use client"
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {useRouter, useSearchParams} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cabinetGroteskRegular, inter, ibmPlexSans} from "@/app/fonts";
import {Button} from "@/components/ui/button";
import TabConnector from "@/reuseable/details/tab-connector";
import {FaCircle} from "react-icons/fa6";
import {Breakdown} from "@/reuseable/details/breakdown";
import LoanTermsAndConditions from "@/reuseable/terms/loanTermsAndConditions/Index";
import {store} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";
import {useViewLoanOfferDetailsQuery} from "@/service/admin/loan/loan-offer-api";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import styles from "@/pages/admin/loan-request-details/index.module.css"


const LoanOfferDetails = () => {
    const router = useRouter();
    const [currentTab, setCurrentsTab] = useState(0);
    const searchParams = useSearchParams()
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
    console.log('data: ', data)
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

    const  loanOfferDetails =  data?.data?.body?.loanRequestResponse



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
        {label: "Tuition amount", value:  <NumericFormat
                id={'loanTuitionAmount'}
                name={'loanTuitionAmount'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                // value={'200000'}
                prefix={'₦'}

                className='bg-grey105 flex md:place-items-end '

                value={data?.data?.body?.loanRequestResponse?.tuitionAmount}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"

            />},
        {label: "Start date", value:
                 dayjs(data?.data?.body?.loanRequestResponse?.createdDate?.toString()).format('MMMM D, YYYY')
        },
        {label: "Loan amount requested", value: <NumericFormat
                id={'loanAmountRequested'}
                name={'loanAmountRequested'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                // value={'200000'}
                className='bg-grey105 flex md:place-items-end '
                prefix={'₦'}
                value={data?.data?.body?.loanRequestResponse?.loanAmountRequested}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"

            />},
        {label: "Deposit", value:  <NumericFormat
                id={'depositOnLoanRequestDetails'}
                name={'depositOnLoanRequestDetails'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'₦'}
                value={data?.data?.body?.loanRequestResponse?.initialDeposit}
                className='bg-grey105 flex md:place-items-end'

            />},
        {
            label: "Credit score",
            value: <div className="flex gap-2">Good <span
                className="flex py-[3px] px-1 items-center justify-center rounded-md border border-green650 bg-meedlWhite"><span
                className={`${ibmPlexSans.className} bg-green150 h-[15px] w-[26px] rounded-[3px] text-green750 text-[11px] leading-[18px] font-medium text-center`}>
                {data?.data?.body?.loanRequestResponse?.loaneeLoanBreakdowns?.[0]?.loanee?.creditScore}
            </span></span>
            </div>
        },
    ];

    const handleNext = () => {
        if (currentTab < loanOfferDetailsTab.length - 1) {
            setCurrentsTab(currentTab + 1);
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
                        <AvatarImage src={`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`} alt="@shadcn"
                                     style={{objectFit: 'cover'}}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className={`grid gap-1 mt-4`}>
                        <div id={'loaneeNameOnLoanOfferDetails'} data-testid={'loaneeNameOnLoanOfferDetails'}
                             className={`${cabinetGroteskRegular.className} font-medium  text-meedlBlack text-[24px] md:text-[28px] leading-[120%]`}>Sarah
                            Akinyemi
                        </div>
                        <div className={`flex gap-2 items-center`}>
                            <p id={'loaneeProgramOnLoanOfferDetails'}
                               data-testid={'loaneeProgramOnLoanOfferDetails'}
                               className={` text-sm text-black400`}>Product Design</p>
                            <FaCircle className={'h-1 w-1 text-blue550'}/>
                            <p id={'loaneeCohortOnLoanRequestDetails'} data-testid={'loaneeCohortOnLoaOfferDetails'}
                               className={`text-sm text-black400`}>Luminary</p>
                        </div>
                    </div>
                </div>
                <div
                    className={` overflow-x-hidden overflow-y-auto md:w-[50%]    w-full md:h-[70vh] border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid`}
                >

                    {/*<div className={`${styles.tabConnector} md:w-fit pl-1  h-fit md:h-fit  flex md:flex `}>*/}
                    {/*    <TabConnector tabNames={loanOfferDetailsTab} currentTab={currentTab}/>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <ul className={'bg-grey105  '}>*/}
                    {/*        {currentTab === 3 ? (*/}
                    {/*            <LoanTermsAndConditions />*/}
                    {/*        ) : (*/}
                    {/*            getCurrentDataList().map((item, index) => (*/}
                    {/*                <li key={index} className={'p-5  grid gap-9 rounded-md'}>*/}
                    {/*                    <div*/}
                    {/*                        className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>*/}
                    {/*                        <div*/}
                    {/*                            className={'text-black300 text-[14px] leading-[150%] font-normal'}>{item.label}</div>*/}
                    {/*                        <div*/}
                    {/*                            className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value}</div>*/}
                    {/*                    </div>*/}
                    {/*                </li>*/}
                    {/*            ))*/}
                    {/*        )}*/}
                    {/*        {currentTab === 0 && (*/}
                    {/*            <section>*/}
                    {/*                <div className={'px-5'}>*/}
                    {/*                    <Breakdown/>*/}
                    {/*                </div>*/}
                    {/*            </section>*/}
                    {/*        )}*/}

                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div className="md:flex grid md:justify-end gap-5 mt-4">*/}
                    {/*    {currentTab !== 0 && (*/}
                    {/*        <Button*/}
                    {/*            className={'w-full md:w-[8.75rem]  h-[3.5625rem] text-meedlBlue border border-meedlBlue bg-meedlWhite hover:bg-meedlWhite'}*/}
                    {/*            onClick={handleBack} disabled={currentTab === 0}>Back</Button>*/}
                    {/*    )}*/}

                    {/*    <Button className={'w-full md:w-[8.75rem] h-[3.5625rem] bg-meedlBlue hover:bg-meedlBlue'}*/}
                    {/*            onClick={handleNext}*/}
                    {/*            disabled={currentTab === loanOfferDetailsTab.length - 1}>*/}
                    {/*        {currentTab === 3 ? 'Disburse loan' : 'Continue'}*/}
                    {/*    </Button>*/}

                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default LoanOfferDetails;