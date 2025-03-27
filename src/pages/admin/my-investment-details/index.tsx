'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import {cabinetGroteskMediumBold, inter, inter500} from "@/app/fonts";
import dayjs from "dayjs";
import TabSwitch from "@/reuseable/details/TabSwitch";
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";

const MyInvestmentDetails = () => {
    const [currentTab, setCurrentsTab] = useState(0);


    const handleBackButton = () => {

    }
    // const investmentStartDate = dayjs(data?.data?.createdDate?.toString()).format('MMM D, YYYY')


    const investmentBasicDetails = [
        {label: 'Investment start date', value: '23 jan,2024'},
        {label: 'Date invested', value: '21, june, 2023'},
        {label: 'Maturity date', value: '21, june, 2023 '},
        {label: 'Status', value: <div>
                        Fundraising <span className={`border border-green650 md:border md:text-[12px] text-green750 md:text-green750 text-[12px] ${inter500.className} w-fit md:w-fit h-fit md:h-fit px-1 py-1 md:py-1 md:px-1 rounded-md md:rounded-md  md:border-green650 `}>Open</span>
                                  </div>
        },
    ]

    const tabContent = [
        'Performance',
        'Mandate',
    ]

    const handleTabChange = (index: number) => {
        setCurrentsTab(index)
    }


    return (
        <div className={`md:h-[100%] pt-3 px-3 grid md:grid gap-5 md:gap-6 md:pt-4 md:px-8 w-full h-full md:w-full `}>
            <BackButton id={'backToViewMyInvestments'} text={'Back to investment'} textColor={'#142854'} handleClick={handleBackButton} iconBeforeLetters={true} />
            <div className={`w-full h-full md:w-full grid md:flex md:justify-between md:h-[100%] `}>
                <div className={`w-full md:w-[33%] grid gap-4 md:grid md:gap-4 h-fit md:h-fit `}>
                    <div className={` w-full md:w-full h-[15rem] md:h-[12rem] rounded-md md:rounded-md bg-[#D9EAFF] md:bg-[#D9EAFF] `}>

                    </div>

                    <p className={` ${cabinetGroteskMediumBold.className}  md:text-[32px] text-[24px] md:text-[#212221] `}>Software Engineering Fund</p>
                    <div className={` bg-grey105 md:bg-grey105 grid h-fit md:h-fit  gap-8 px-3  `}>
                        {investmentBasicDetails.map((item, index) => (
                            <li key={"key" + index} className={' grid gap-9 rounded-md'}>
                                <div
                                    className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                    <div
                                        className={`  ${inter.className} text-black300 text-[14px]  font-normal`}>{item.label}</div>
                                    <div
                                        className={` ${inter.className}  text-black500 text-[14px] le font-normal`}> {item.value ? item.value : 'Not provided'}</div>
                                </div>
                            </li>
                        ))}
                    </div>

                    <p></p>
                </div>
                <div className={`md:w-[60%] w-full  md:max-h-[99%]`}>
                    <TabSwitch componentId={'disbursedLoanTabSwitch'} currentTab={currentTab}
                               tabContent={tabContent} handleChange={handleTabChange}/>
                    <div className={`w-full md:w-full pt-4 grid gap-4  `}>
                        <PerformanceCard showContainerBorder={true} percentage={20} showPerformancePercentage={false} maxWidth={'100%'} title={'Amount invested'} value={20000000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
                        <PerformanceCard showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'100%'} title={'New asset value '} value={20000000000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
                        <div className={` w-[100%] md:w-[100%] h-fit md:h-fit b flex md:flex md:gap-3  `}>
                            {/*<PerformanceCard isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'50%'} title={'Portfolio percentage'} value={30} isValueInPercentage={true} showMonthPick={false} didValueIncrease={true}/>*/}
                            <PerformanceCard isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={false} maxWidth={'50%'} title={'Talent funded '} value={30} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyInvestmentDetails;