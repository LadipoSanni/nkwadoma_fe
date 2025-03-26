import React from 'react';
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";

const Page = () => {
    return (
        <div className={ ` w-[100%] h-full `}>
            {/*<Index maxHeight={'20rem'} maxWidth={'30rem'} componentId={'e'} />*/}
            <PerformanceCard showContainerBorder={false} percentage={20} showPerformancePercentage={true} maxWidth={'100%'} title={'Percentage '} value={20000} isValueInPercentage={false} showMonthPick={false} didValueIncrease={false}/>
        </div>
    );
};

export default Page;