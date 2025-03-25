import React from 'react';
import Index from "@/reuseable/bar-chart";
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";

const Page = () => {
    return (
        <div className={ ``}>
            <Index maxHeight={'20rem'} maxWidth={'30rem'} componentId={'e'} />
            <PerformanceCard maxWidth={'50%'}/>
        </div>
    );
};

export default Page;