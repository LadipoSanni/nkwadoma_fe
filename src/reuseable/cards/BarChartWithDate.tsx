import React from 'react';
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";
import TabSwitch from "@/reuseable/details/TabSwitch";
import MeedlBarChart from "@/reuseable/bar-chart";

interface Props {
    id: string;
    cardTile: string,
    performanceValue: string | number,
    currentMonthDate: string | number,
    changeCurrentMonth: (index: number) => void;
    displayDates: string[];
    chartData:  {month: string, value: number}[];
    onChange: (month: string) => void;

}

const BarChartWithDate = ({id,onChange, cardTile, displayDates, chartData,currentMonthDate, changeCurrentMonth, performanceValue}:Props) => {
    return (
        <div id={id} className={`w-full md:w-full  rounded-md md:rounded-md py-4 px-4 md:px-3 md:py-3 md:bg-white bg-white   border border-[#D7D7D7] md:border   `}>
             <div className={`bg-grey105 grid gap-4 md:grid md:gap-3  md:bg-grey105 `}>
                <PerformanceCard id={'incomeEarned'} isSmall={false} showContainerBorder={false} percentage={'26.8'} onChangeDate={onChange} showPerformancePercentage={false} maxWidth={'100%'} title={cardTile} value={performanceValue} isValueInPercentage={false} showMonthPick={true} didValueIncrease={true}/>
                <div className={` w-full md:w-full grid md:grid gap-3 md:gap-10 `}>
                    <div className={` md:px-4 px-4  `}>
                        <TabSwitch componentId={'myInvestmentBarChartTabSwitch'} currentTab={currentMonthDate}
                                   tabContent={displayDates} handleChange={changeCurrentMonth}/>
                    </div>

                    <MeedlBarChart dataKey={'value'} maxWidth={'100%'} maxHeight={'30rem'} chartData={chartData} componentId={'details'}/>
                </div>
            </div>
        </div>
    );
};

export default BarChartWithDate;