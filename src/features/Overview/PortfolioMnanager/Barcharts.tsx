import React, {useState} from 'react';
import BarChartWithDate from "@/reuseable/cards/BarChartWithDate";

const Barcharts = () => {
    const initialDates = [
        {month: "Jan", value: 0},
        {month: "Feb", value: 0},
        {month: "March", value: 0},
    ]
    // const [chartData, setChartData] = useState<{month: string, value: number}[]>(initialDates);
    const [currentLoanBookPortfolioGrowth, setCurrentLoanBookPortfolioGrowth] = useState(0);
    const [currentAumPortfolioGrowth, setCurrentAumPortfolioGrowth] = useState(0);
    const [aumPortfolioGrowth, setaumPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);
    const [loanBookPortfolioGrowth, setloanBookPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);



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
        console.log(year)
    }

    const changeLoanYear = (year: string) => {
        console.log(year)
    }
    const LoanLifeSpan = [
        '2023',
        '2024',
        '2025'
    ]
    const AumLifeSpan = [
        '2023',
        '2024',
        '2025'
    ]

    return (
        <div className={` w-full md:w-full grid md:flex flex-col-2 md: gap-6 `}>
            <BarChartWithDate id={'AUMPortfolioGrowthRate'}
                              years={AumLifeSpan}
                              currentYear={'2024'}
                              displayDates={barChartTabContent}
                              currentMonthDate={currentAumPortfolioGrowth}
                              cardTile={'AUM portfolio growth rate'}
                              chartData={aumPortfolioGrowth}
                              changeCurrentMonth={handleBarChartTabChange}
                              performanceValue={0}
                              onChange={changeAumYear}
            />
            <BarChartWithDate id={'LoanBookPortfolioGrowthRate'}
                              years={LoanLifeSpan}
                              currentYear={'2023'}
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