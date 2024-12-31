'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {store} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import styles from "@/pages/admin/loan-request-details/index.module.css";
import {Breakdown} from "@/reuseable/details/breakdown";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import TabSwitch from "@/reuseable/details/TabSwitch";

const Index = () => {
    const router = useRouter()
    const [currentTab, setCurrentsTab] = useState(0);


    const backToViewAllDisbursedLoan = () => {
        store.dispatch(setCurrentTab('Disbursed loan'))
        router.push('/loan/loan-disbursal')

    }

    const tabContent = [
        'Loan details',
        'Basic details',
        'Additional details'
    ]

    const breakDown = [
        {itemName: 'tuition', itemAmount: '$2000'},
        {itemName: 'skincare', itemAmount: '$2000'},
        {itemName: 'head', itemAmount: '$2000'},

    ]

    const handleTabChange= ( index:number) => {
        setCurrentsTab(index)
    }

    const basicDetails = [
        {label: 'Gender', value: ''},
        {label: 'Email address', value: ''},
        {label: 'Phone number', value: ''},
        {label: 'Date of birth', value: ''},
        {label: 'Marital status', value:''},
        {label: 'Nationality', value: ''},
        {label: 'State of origin ', value: ''},
        {label: 'State of residence', value: ''},
    ]

    const loanDetails = [
        {
            label: 'Tuition', value:
                <NumericFormat
                    id={'loanTuitionAmountOnDisbursedLoan'}
                    name={'loanTuitionAmountOnDisbursedLoan'}
                    type="text"
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={true}
                    // value={'200000'}
                    prefix={'₦'}
                    className='bg-grey105 flex md:place-items-end '
                    value={''}
                />
        },
        {
            label: 'Start date', value:
            // dayjs(data?.data?.body?.data?.createdDate?.toString()).format('MMMM D, YYYY')
                dayjs(''?.toString()).format('MMMM D, YYYY')

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
                value={''}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"

            />
        },
        {
            label: 'Loan amount requested', value: <NumericFormat
                id={'LoanAmountRequestedOnDisbursedLoanDetails'}
                name={'LoanAmountRequestedOnDisbursedLoanDetails'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                // value={'200000'}
                prefix={'₦'}
                value={''}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                className='bg-grey105 flex md:place-items-end'

            />
        },
        {
            label: 'Deposit', value: <NumericFormat
                id={'depositOnDisbursedLoanDetails'}
                name={'depositOnDisbursedLoanDetails'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                // value={'200000'}
                prefix={'₦'}
                value={''}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                className='bg-grey105 flex md:place-items-end'

            />
        },


    ]

    const alternate = [
        // {label: 'Alternate email address', value: data?.data?.body?.data?.alternateEmail},
        // {label: 'Alternate phone number', value: data?.data?.body?.data?.alternatePhoneNumber},
        // {label: 'Alternate residential address', value: data?.data?.body?.data?.alternateContactAddress},
        // {
        //     label: 'Next of kin name',
        //     value: data?.data?.body?.data?.nextOfKin?.firstName + " " + data?.data?.body?.data?.nextOfKin?.lastName
        // },
        // {label: 'Next of kin email address', value: data?.data?.body?.data?.nextOfKin?.email},
        // {label: 'Next of kin phone number', value: data?.data?.body?.data?.nextOfKin?.phoneNumber},
        // {label: 'Next of kin relationship ', value: data?.data?.body?.data?.nextOfKin?.nextOfKinRelationship},
        {label: 'Alternate email address', value: ''},
        {label: 'Alternate phone number', value: ''},
        {label: 'Alternate residential address', value: ''},
        {
            label: 'Next of kin name',
            value: '' + " " + ''
        },
        {label: 'Next of kin email address', value: '' +
                ''},
        {label: 'Next of kin phone number', value: ''},
        {label: 'Next of kin relationship ', value: ''},


    ]

    const getCurrentDataList = () => {
        switch (currentTab) {
            case 0:
                return loanDetails;
            case 1:
                return basicDetails;
            case 2:
                return alternate;

            default:
                return [];
        }
    };

    return (
        <div
            id={'disbursedLoanMainContainer'}
            data-testid={'disbursedLoanMainContainer'}
            className={'md:px-8 w-full h-full  px-3 pt-4 md:pt-4'}
        >
            <BackButton handleClick={backToViewAllDisbursedLoan} iconRight={true} text={"Back to disbursed loan"}
                        id={"disbursedLoanDetailsBackButton"} textColor={'#142854'}/>
            <div
                id={'disbursedLoanDetailsPageContainer'}
                data-testid={'disbursedLoanDetailsPageContainer'}
                className={` md:flex md:justify-between  md-8 w-full h-full  px-3 pt-4 md:pt-4 `}
            >
                <div>
                    <Avatar id={'loaneeImageOnDisbursedLoanDetails'} data-testid={'loaneeImageOnDisbursedLoanDetails'}
                            className={`h-[8rem] w-[8rem] md:w-[8rem] md:h-[8rem] `}>
                        <AvatarImage src={`/234d70b3-ec71-4d68-8696-5f427a617fb7.jpeg`} alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div
                        className={`grid gap-2 mt-4`}
                    >
                        <div id={'loaneeNameOnDisbursedLoanDetails'} data-testid={'loaneeNameOnDisbursedLoanDetails'}
                             className={`${cabinetGroteskRegular.className} text-black text-xl md:text-3xl  `}>Sarah
                            Akinyemi
                        </div>
                        <div
                            className={`flex gap-2  `}
                        >
                        <span id={'loaneeProgramOnDisbursedLoanDetails'} data-testid={'loaneeProgramOnDisbursedLoanDetails'}
                              className={`${inter.className} text-sm text-black400`}>Product Design</span>
                            <span
                                className={`${inter.className} text-sm text-black400 mt-auto mb-auto md:mt-auto md:mb-auto `}>.</span>
                            <span id={'loaneeCohortOnDisbursedLoanDetails'}
                                  data-testid={'loaneeCohortOnDisbursedLoanDetails'}
                                  className={`${inter.className} text-sm text-black400`}>Luminary</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`  overflow-x-hidden overflow-y-auto md:w-[35rem] mt-4   w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                >
                    <div
                        className={` ${styles.tabConnector} md:w-full pl-1  h-fit md:h-fit  flex md:flex `}

                    >
                        <TabSwitch componentId={'disbursedLoanTabSwitch'} currentTab={currentTab} tabContent={tabContent} handleChange={handleTabChange}/>
                    </div>
                    <div className={`px - 2`}>
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
                                {currentTab == 0 &&
                                    <Breakdown breakDown={breakDown}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Index;