import React, {useState} from 'react';
import BarChartWithDate from "@/reuseable/cards/BarChartWithDate";

const Barcharts = () => {
    const initialDates = [
        {month: "Jan", value: 1},
        {month: "Jan", value: 1},
        {month: "Jan", value: 1},
    ]
    const [chartData, setChartData] = useState<{month: string, value: number}[]>(initialDates);
    const [currentPortfolioGrowth, setCurrentPortfolioGrowth] = useState(0);
    const [portfolioGrowth, setPortfolioGrowth] = useState<{month: string, value: number}[]>(initialDates);

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
        setCurrentPortfolioGrowth(index)
        if (index === 0) {
            setPortfolioGrowth(initialDates)
        }
        if (index === 1) {
            setPortfolioGrowth(SecondChartData)
        }
        if (index === 2) {
            setPortfolioGrowth(thirdChartData)
        }
    }


    return (
        <div className={` w-full md:w-full flex md:flex flex-col-2 md: gap-6 `}>
            <BarChartWithDate id={'AUM portfolio growth rate'}
                              displayDates={barChartTabContent}
                              currentMonthDate={currentPortfolioGrowth}
                              cardTile={'AUM portfolio growth rate'}
                              chartData={portfolioGrowth}
                              changeCurrentMonth={handleBarChartTabChange}
                              performanceValue={0}
            />
            <BarChartWithDate id={'AUM portfolio growth rate'}
                              displayDates={barChartTabContent}
                              currentMonthDate={currentPortfolioGrowth}
                              cardTile={'AUM portfolio growth rate'}
                              chartData={portfolioGrowth}
                              changeCurrentMonth={handleBarChartTabChange}
                              performanceValue={0}
            />
        </div>
    );
};

export default Barcharts;