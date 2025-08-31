'use client'
import React, {useState} from 'react';
import {PieCharts} from "@/reuseable/pieChart";
import BarChartWithDate from "@/reuseable/cards/BarChartWithDate";
import Details from "@/components/loanee-my-profile/Details";

const Investment = () => {


    const initialDates = [
        {month: "Jan", value: 0},
        {month: "Feb", value: 0},
        {month: "March", value: 0},
    ]
    const [currentAumPortfolioGrowth, setCurrentAumPortfolioGrowth] = useState(0);
    const [aumPortfolioGrowth, setaumPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);
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

    const loanChartData = [
        { browser: "Commercial", visitors: 70, fill: "#FBE2B7" },
        { browser: "Endowment", visitors: 30, fill: "#D9EAFF" },

    ]
    const financierChartData = [
        { browser: "Invididual", visitors: 40, fill: "#B5DFC3" },
        { browser: "Cooperate", visitors: 60, fill: "#F2BCBA" },

    ]
    return (
        <div
            id={'investmentOverview'}
            data-testid={'investmentOverview'}
            className={` grid gap-6  `}
        >
           <div
               className={` grid md:grid-cols-2 gap-4 `}
           >
               <PieCharts
                   chartData={loanChartData}
                   title={'Investment vehicle breakdown'}
                   dataKey={'investmentBreakdown'}
               />
               <PieCharts
                   chartData={financierChartData}
                   title={'Financiers breakdown'}
                   dataKey={'financiersBreakdown'}
               />
           </div>

           <div className={` grid grid-cols-2  gap-4   w-full `}>
               <BarChartWithDate id={'AUMPortfolioGrowthRate'}
                                 years={AumLifeSpan}
                                 currentYear={year?.toString()}
                                 displayDates={barChartTabContent}
                                 currentMonthDate={currentAumPortfolioGrowth}
                                 cardTile={'AUM portfolio growth rate'}
                                 chartData={aumPortfolioGrowth}
                                 changeCurrentMonth={handleBarChartTabChange}
                                 performanceValue={0}
                                 onChange={changeAumYear}
                                 mediumHeightOnWebview={true}

               />
               <div className={` grid gap-3 `}>
                   <Details  isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'netAumReturn'} showAsWholeNumber={false}    name={'Net AUM return'} value={'92500000'} valueType={'currency'}  />
                   <Details  isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'totalCustodian'} showAsWholeNumber={false}    name={'Total custodian/trustee fee'} value={'92500000'} valueType={'currency'}  />
                   <Details  isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'totalFundManager'} showAsWholeNumber={false}    name={'Total fund manager fee'} value={'92500000'} valueType={'currency'}  />

               </div>

           </div>
            
        </div>
    );
};

export default Investment;