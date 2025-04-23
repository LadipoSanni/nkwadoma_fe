import React, {useState} from 'react';
import BarChartWithDate from "@/reuseable/cards/BarChartWithDate";

const Barcharts = () => {
    const initialDates = [
        {month: "Jan", value: 1},
        {month: "Feb", value: 1},
        {month: "March", value: 1},
    ]
    const [chartData, setChartData] = useState<{month: string, value: number}[]>(initialDates);
    const [currentLoanBookPortfolioGrowth, setCurrentLoanBookPortfolioGrowth] = useState(0);
    const [currentAumPortfolioGrowth, setCurrentAumPortfolioGrowth] = useState(0);
    const [aumPortfolioGrowth, setaumPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);
    const [loanBookPortfolioGrowth, setloanBookPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);



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
    const barChartTabContent = [
        '3 months',
        '6 months',
        '9 months',
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
    const handleBarLoanBookChartTabChange = (index: number) => {
        setCurrentLoanBookPortfolioGrowth(index)
        if (index === 0) {
            setloanBookPortfolioGrowth(initialDates)
        }
        if (index === 1) {
            setloanBookPortfolioGrowth(SecondChartData)
        }
        if (index === 2) {
            setloanBookPortfolioGrowth(thirdChartData)
        }
    }

    const changeAumYear = (year: string) => {

    }

    const changeLoanYear = (year: string) => {

    }

    return (
        <div className={` w-full md:w-full grid md:flex flex-col-2 md: gap-6 `}>
            <BarChartWithDate id={'AUMPortfolioGrowthRate'}
                              displayDates={barChartTabContent}
                              currentMonthDate={currentAumPortfolioGrowth}
                              cardTile={'AUM portfolio growth rate'}
                              chartData={aumPortfolioGrowth}
                              changeCurrentMonth={handleBarChartTabChange}
                              performanceValue={0}
                              onChange={changeAumYear}
            />
            <BarChartWithDate id={'LoanBookPortfolioGrowthRate'}
                              displayDates={barChartTabContent}
                              currentMonthDate={currentLoanBookPortfolioGrowth}
                              cardTile={'Loan book portfolio growth rate'}
                              chartData={loanBookPortfolioGrowth}
                              changeCurrentMonth={handleBarLoanBookChartTabChange}
                              performanceValue={0}
                              onChange={changeLoanYear}
            />
        </div>
    );
};

export default Barcharts;