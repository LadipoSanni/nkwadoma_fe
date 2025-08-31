'use client'
import React, {useState} from 'react';
import {PieCharts} from "@/reuseable/pieChart";
import BarChartWithDate from "@/reuseable/cards/BarChartWithDate";

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
            />
            
        </div>
    );
};

export default Loan;