'use client'
import React, {useState} from 'react';
import {PieCharts} from "@/reuseable/pieChart";
import BarChartWithDate from "@/reuseable/cards/BarChartWithDate";
import Details from "@/components/loanee-my-profile/Details";

const Loan = () => {
    const initialDates = [
        {month: "Jan", value: 0},
        {month: "Feb", value: 0},
        {month: "March", value: 0},
    ]
    const [currentAumPortfolioGrowth, setCurrentAumPortfolioGrowth] = useState(0);
    const [aumPortfolioGrowth, setaumPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);

    const loanChartData = [
        { browser: "Uploaded", visitors: 35, fill: "#FBE2B7" },
        { browser: "Referred", visitors: 20, fill: "#D9EAFF" },
        { browser: "Offered", visitors: 18.4, fill: "#FFB0B0" },
        { browser: "Requested", visitors: 10, fill: "#B5DFC3" },
        { browser: "Disbursed", visitors: 20.8, fill: "#FCD5BC" },

    ]
    const timeStamp = Date.now()
    const dateStamp = new Date(timeStamp)
    const year = dateStamp.getFullYear()
    const AumLifeSpan = [
        year?.toString(),
    ]
    const barChartTabContent = [
        '3 months',
        '6 months',
        '9 months',
    ]
    const SecondChartData = [
        { month: "Jan", value: 0, },
        { month: "Feb", value: 0,  },
        { month: "March", value: 0, },
        { month: "April", value: 0, },
        { month: "May", value: 0,  },
        { month: "June", value: 0,  },
    ]

    const thirdChartData = [
        { month: "Jan", value: 0, },
        { month: "Feb", value: 0,  },
        { month: "March", value: 0, },
        { month: "April", value: 0, },
        { month: "May", value: 0,  },
        { month: "June", value: 0,  },
        { month: "july", value: 0, },
        { month: "August", value: 0,  },
        { month: "September", value: 0,  },
    ]
    const handleBarChartTabChange = (index: number) => {
        setCurrentAumPortfolioGrowth(index)
        if (index === 0) {
            setaumPortfolioGrowth(initialDates)
        }
        if (index === 1) {
            setaumPortfolioGrowth(SecondChartData)
        }
        if (index === 2) {
            setaumPortfolioGrowth(thirdChartData)
        }
    }
    const changeAumYear = (year: string) => {
        console.log(year)
    }

    return (
        <div
            id={'loanOverview'}
            data-testid={'loanOverview'}
            className={` grid md:grid-cols-2 gap-4 `}
        >

            <PieCharts
                chartData={loanChartData}
                title={'Geography breakdown'}
                dataKey={'geographyBreakdown'}
            />
            <BarChartWithDate id={'LoanBookPortfolioGrowthRate'}
                              years={AumLifeSpan}
                              currentYear={year?.toString()}
                              displayDates={barChartTabContent}
                              currentMonthDate={currentAumPortfolioGrowth}
                              cardTile={'Loan book portfolio growth rate'}
                              chartData={aumPortfolioGrowth}
                              changeCurrentMonth={handleBarChartTabChange}
                              performanceValue={0}
                              onChange={changeAumYear}
                              mediumHeightOnWebview={true}
            />

            <Details showIcon={true} isLoading={false} sx={` w-full md:w-[100%] `} id={'historicalDebt'} showAsWholeNumber={false}    name={'Historical debt'} value={'92500000'} valueType={'currency'}  />
            <Details showIcon={true} isLoading={false } sx={` w-full md:w-[100%] `} id={'disbursedLoan'} showAsWholeNumber={false}    name={'Disbursed loan'} value={'59500000'} valueType={'currency'}  />
            <div className={` flex gap-3  `}>
                <Details showIcon={false} isLoading={false } sx={` w-[20em] md:w-[100%] `} id={'totalLoanee'} showAsWholeNumber={true}    name={'Total loanee'} value={'5900'} valueType={'digit'}  />
                <Details showIcon={false} isLoading={false } sx={` w-[20em] md:w-[100%] `} id={'totalOrganizations'} showAsWholeNumber={true}    name={'Total organizations'} value={'46'} valueType={'digit'}  />
            </div>
            <Details showIcon={true} isLoading={false } sx={` w-full md:w-[100%] `} id={'totalamountEarned'} showAsWholeNumber={false}    name={'Total amount earned'} value={'329087787'} valueType={'currency'}  />
            <Details showIcon={true} isLoading={false } sx={` w-full md:w-[100%] `} id={'netLaonPortfolioReturn'} showAsWholeNumber={false}    name={'Net loan portfolio return'} value={'59500000'} valueType={'currency'}  />
            <div className={` w-full md:w-[50%] sm:w-[50%]  `}>
                <Details showIcon={true} isLoading={false } sx={` w-[20em] md:w-[100%] `} id={'totalLoanProduct'} showAsWholeNumber={false}    name={'Total loan products'} value={'32'} valueType={'digit'}  />
            </div>
        </div>
    );
};

export default Loan;