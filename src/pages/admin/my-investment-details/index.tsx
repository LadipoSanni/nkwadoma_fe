'use client'
import React, {useState} from 'react';
import BackButton from "@/components/back-button";
import { cabinetGroteskMediumBold600, inter, inter500} from "@/app/fonts";
// import dayjs from "dayjs";
import TabSwitch from "@/reuseable/details/TabSwitch";
import styles from './index.module.css';
import PerformanceDisplay from "@/pages/admin/my-investment-details/performanceDisplay";
import InvestmentMandate from "@/pages/admin/my-investment-details/investment-mandate";


const MyInvestmentDetails = () => {
    const [currentTab, setCurrentsTab] = useState(0);
    const [currentBartChart, setCurrentBartChart] = useState(0);
    const initialChartData = [
            { month: "Jan", value: 186, },
            { month: "Feb", value: 305,  },
            { month: "March", value: 237, },
    ]
    const [chartData, setChartData] = useState<{month: string, value: number}[]>(initialChartData);

    const handleBackButton = () => {

    }
    // const investmentStartDate = dayjs(data?.data?.createdDate?.toString()).format('MMM D, YYYY')

    const SecondChartData = [
        { month: "Jan", value: 186, },
        { month: "Feb", value: 505,  },
        { month: "March", value: 237, },
        { month: "April", value: 73, },
        { month: "May", value: 209,  },
        { month: "June", value: 214,  },
    ]

    const thirdChartData = [
        { month: "Jan", value: 186, },
        { month: "Feb", value: 305,  },
        { month: "March", value: 237, },
        { month: "April", value: 73, },
        { month: "May", value: 209,  },
        { month: "June", value: 214,  },
        { month: "july", value: 73, },
        { month: "August", value: 209,  },
        { month: "September", value: 214,  },
    ]



    const investmentBasicDetails = [
        {label: 'Investment start date', value: '23 jan,2024'},
        {label: 'Date invested', value: '21, june, 2023'},
        {label: 'Maturity date', value: '21, june, 2023 '},
        {label: 'Status', value:
                <div className={`flex gap-2 md:gap-2 md:flex`}>
                        Fundraising
                    <div
                        className={` w-fit md:w-fit md:h-fit h-fit md:py-0 py-0 md:px-1 px-1 md:rounded-md rounded-md border md:border border-green650 md:border-green650`}>
                        <span
                            className={` ${inter500.className} md:bg-green150 bg-green150 md:px-0.5 px-0.5 md:rounded-md rounded-md md:py-0.5 py-0.5 md:text-[11px] text-[14px] text-green750 md:text-green750 `}>Open</span>
                    </div>
                </div>
        },
    ]

    const tabContent = [
        'Performance',
        'Mandate',
    ]
    const barChartTabContent = [
        '3 months',
        '6 months',
        '9 months',
    ]
    const handleBarChartTabChange = (index: number) => {
        setCurrentBartChart(index)
        if (index === 0) {
            setChartData(initialChartData)
        }
        if (index === 1) {
            setChartData(SecondChartData)
        }
        if (index === 2) {
            setChartData(thirdChartData)
        }
    }
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

                    <p id={'titleOnInvestmentetails'} className={` ${cabinetGroteskMediumBold600.className}  md:text-[32px] text-[24px] md:text-[#212221] `}>Software Engineering Fund</p>
                    <div className={` bg-grey105 md:bg-grey105 grid h-fit md:h-fit  gap-8 py-3 md:py-3 px-3  `}>
                        {investmentBasicDetails.map((item, index) => (
                                <div key={"key" + index}
                                     className={'md:flex md:justify-between md:items-center md:gap-0 grid gap-3 '}>
                                    <p
                                        id={'label' + index}
                                        className={`  ${inter.className} text-black300 text-[14px]  font-normal`}>{item.label}</p>
                                    <div
                                        id={'value' + index}
                                        className={` ${inter.className}  text-black500 text-[14px] le font-normal`}> {item.value ? item.value : 'Not provided'}</div>
                                </div>
                        ))}
                    </div>

                    <p></p>
                </div>
                <div className={`md:w-[60%] w-full grid md:grid gap-2 md:gap-2  md:max-h-[99%]`}>
                    <TabSwitch componentId={'myInvestmentDetailsTabSwitch'} currentTab={currentTab}
                               tabContent={tabContent} handleChange={handleTabChange}/>
                        <div className={`w-full ${styles.container} md:w-full md:max-h-[70vh] md:overf  pt-4 grid gap-4  `}>
                            {currentTab === 0 ?
                            <PerformanceDisplay barChartTabContent={barChartTabContent} currentBartChart={currentBartChart} chartData={chartData} handleBarChartTabChange={handleBarChartTabChange} />
                                :
                                <InvestmentMandate/>
                            }
                        </div>

                </div>

            </div>
        </div>
    );
};

export default MyInvestmentDetails;