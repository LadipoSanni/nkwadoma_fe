'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {store, useAppSelector} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";
import {useRouter} from "next/navigation";
import {cabinetGroteskRegular, inter} from "@/app/fonts";
import styles from "@/pages/admin/loan-request-details/index.module.css";
import {Breakdown} from "@/reuseable/details/breakdown";
import {NumericFormat} from "react-number-format";
import dayjs from "dayjs";
import TabSwitch from "@/reuseable/details/TabSwitch";
import {useViewDisbursedLoanDetailsQuery} from "@/service/admin/loan/Loan-disbursal-api";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";
import {Card} from "@/components/ui/card";


interface LoaneeLoanBreakDown {
    itemName: string;
    itemAmount: number;
}

const Index = () => {
    const clickedDisbursedLoanId = useAppSelector(state => state.selectedLoan.clickedDisbursedLoanIdNumber)
    const router = useRouter()
    const [currentTab, setCurrentsTab] = useState(0);
    const {data: details, isLoading} = useViewDisbursedLoanDetailsQuery(clickedDisbursedLoanId as string)

    const backToViewAllDisbursedLoan = () => {
        store.dispatch(setCurrentTab('Disbursed loan'))
        router.push('/loan/loan-disbursal')
    }

    const breakDown = details?.data.loaneeLoanBreakDowns.map((item: LoaneeLoanBreakDown) => ({
        itemName: item.itemName,
        itemAmount: `₦${item.itemAmount.toLocaleString()}`,
    })) || [];

    const tabContent = [
        'Loan details',
        'Basic details',
        'Additional details'
    ]

    const handleTabChange = (index: number) => {
        setCurrentsTab(index)
    }

    const basicDetails = [
        {label: 'Gender', value: details?.data.userIdentity.gender},
        {label: 'Email address', value: details?.data.userIdentity.email},
        {label: 'Phone number', value: details?.data.userIdentity.phoneNumber},
        {label: 'Date of birth', value: details?.data.userIdentity.dateOfBirth},
        {label: 'Marital status', value: details?.data.userIdentity.maritalStatus},
        {label: 'Nationality', value: details?.data.userIdentity.nationality},
        {label: 'State of origin', value: details?.data.userIdentity.stateOfOrigin},
        {label: 'State of residence', value: details?.data.userIdentity.stateOfResidence},
    ];
    const createdDate = dayjs(details?.data.createdDate?.toString()).format('MMM D, YYYY');
    const startDate = dayjs(details?.data.startData?.toString()).format('MMM D, YYYY');

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
                    disabled={true}
                    prefix={'₦'}
                    className='bg-grey105 flex md:place-items-end '
                    value={details?.data.tuitionAmount}
                />
        },
        { label: 'Start date', value: startDate},
        { label: 'Created date', value: createdDate},
        {
            label: 'Loan amount requested', value: <NumericFormat
                id={'LoanAmountRequestedOnDisbursedLoanDetails'}
                name={'LoanAmountRequestedOnDisbursedLoanDetails'}
                type="text"
                thousandSeparator=","
                decimalScale={2}
                fixedDecimalScale={true}
                disabled={true}
                // value={'200000'}
                prefix={'₦'}
                value={details?.data.loanAmountRequested}
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
                value={details?.data.initialDeposit}
                disabled={true}
                // placeholder={${detail.itemName}}
                // className="w-full p-3 h-[3.2rem] border rounded focus:outline-none"
                className='bg-grey105 flex md:place-items-end'
            />
        },


    ]

    const alternate = [
        {label: 'Alternate email address', value: details?.data.userIdentity.alternateEmail},
        {label: 'Alternate phone number', value: details?.data.userIdentity.alternatePhoneNumber},
        {label: 'Alternate residential address', value: details?.data.userIdentity.alternateContactAddress},
        {
            label: 'Next of kin name',
            value: `${details?.data.nextOfKin.firstName} ${details?.data.nextOfKin.lastName}`
        },
        {label: 'Next of kin email address', value: details?.data.nextOfKin.email},
        {label: 'Next of kin phone number', value: details?.data.nextOfKin.phoneNumber},
        {label: 'Next of kin relationship', value: details?.data.nextOfKin.nextOfKinRelationship},
    ];

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
    const getInitials = (name: string): string => {
        const nameArray = name.split(' ');
        let initials = nameArray.map(word => word[0]).join('');
        if (initials.length > 2) {
            initials = initials.slice(0, 2);
        }
        return initials.toUpperCase();
    };

    const initial = getInitials(`${details?.data.firstName} ${details?.data.lastName}`);

    return (
        <>{isLoading ? (<Skeleton/>) : (
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
                        <Card id={"loaneeImageOnDisbursedLoanDetails"} data-testid={"loaneeImageOnDisbursedLoanDetails"}
                            // className={`h-[8rem] w-[8rem] md:w-[8rem] md:h-[8rem]`}
                              className="rounded-lg md:max-w-md "
                        >
                            {details?.data.image ? (
                                <Image
                                    src={details?.data.image}
                                    alt="Cohort DetailsImageSection"
                                    width={500}
                                    height={500}
                                    className="w-full rounded-md h-64 object-cover"
                                    data-testid="cohort-image"
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 md:w-40 md:h-40 flex bg-[#F0F2F4] rounded-full justify-center items-center">
                                    {initial}
                                </div>
                            )}
                        </Card>
                        <div
                            className={`grid gap-2 mt-4`}
                        >
                            <div id={'loaneeNameOnDisbursedLoanDetails'}
                                 data-testid={'loaneeNameOnDisbursedLoanDetails'}
                                 className={`${cabinetGroteskRegular.className} text-black text-xl md:text-3xl  `}>{details?.data.firstName + ' ' + details?.data.lastName}
                            </div>
                            <div
                                className={`flex gap-2  `}
                            >
                        <span id={'loaneeProgramOnDisbursedLoanDetails'}
                              data-testid={'loaneeProgramOnDisbursedLoanDetails'}
                              className={`${inter.className} text-sm text-black400`}>{details?.data.programName}</span>
                                <span
                                    className={`${inter.className} text-sm text-black400 mt-auto mb-auto md:mt-auto md:mb-auto `}>.</span>
                                <span id={'loaneeCohortOnDisbursedLoanDetails'}
                                      data-testid={'loaneeCohortOnDisbursedLoanDetails'}
                                      className={`${inter.className} text-sm text-black400`}>{details?.data.cohortName}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`  overflow-x-hidden overflow-y-auto md:w-[35rem] mt-4   w-full md:h-fit border border-gray500 rounded-md md:px-4 md:py-4 py-3 grid gap-3 md:grid `}
                    >
                        <div
                            className={` ${styles.tabConnector} md:w-full pl-1  h-fit md:h-fit  flex md:flex `}

                        >
                            <TabSwitch componentId={'disbursedLoanTabSwitch'} currentTab={currentTab}
                                       tabContent={tabContent} handleChange={handleTabChange}/>
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
                                                className={'text-black500 text-[14px] leading-[150%] font-normal'}> {item.value ? item?.value : 'Not provided'}</div>
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
        )}
        </>
    );
};

export default Index;