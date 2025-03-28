import React from 'react';
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";
import TabSwitch from "@/reuseable/details/TabSwitch";
import MeedlBarChart from "@/reuseable/bar-chart";

interface PerformanceProps {
    barChartTabContent: string[],
    currentBartChart: number,
    handleBarChartTabChange: (index: number) => void,
    chartData: {month: string, value: number}[],

}

const PerformanceDisplay = ({barChartTabContent, currentBartChart,handleBarChartTabChange, chartData}:PerformanceProps) => {
    return (
        <div>
            <PerformanceCard showContainerBorder={true} percentage={20} showPerformancePercentage={false} maxWidth={'100%'} title={'Amount invested'} value={20000000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
            <PerformanceCard showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'100%'} title={'New asset value '} value={20000000000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
            <div className={` w-[100%] md:w-[100%] h-fit md:h-fit b grid gap-4 md:flex md:gap-3  `}>
                <PerformanceCard isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'50%'} title={'Portfolio percentage'} value={30} isValueInPercentage={true} showMonthPick={false} didValueIncrease={true}/>
                <PerformanceCard isSmall={true} showContainerBorder={true} percentage={'26.8'} showPerformancePercentage={false} maxWidth={'50%'} title={'Talent funded '} value={30} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
            </div>
            <div className={`w-full md:w-full  rounded-md md:rounded-md py-4 px-4 md:px-3 md:py-3 md:bg-white bg-white   border border-[#D7D7D7] md:border   `}>
                <div className={`bg-grey105 grid gap-4 md:grid md:gap-3  md:bg-grey105 `}>
                    <PerformanceCard isSmall={false} showContainerBorder={false} percentage={'26.8'} showPerformancePercentage={true} maxWidth={'100%'} title={'Portfolio percentage'} value={30} isValueInPercentage={true} showMonthPick={false} didValueIncrease={true}/>
                    <div className={` w-full md:w-full grid md:grid gap-3 md:gap-3 `}>
                        <div className={` md:px-4 px-4  `}>
                            <TabSwitch componentId={'myInvestmentBarChartTabSwitch'} currentTab={currentBartChart}
                                       tabContent={barChartTabContent} handleChange={handleBarChartTabChange}/>
                        </div>

                        <MeedlBarChart dataKey={'value'} maxWidth={'100%'} maxHeight={'30rem'} chartData={chartData} componentId={'details'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceDisplay;