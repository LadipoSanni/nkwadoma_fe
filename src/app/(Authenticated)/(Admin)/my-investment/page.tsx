import React from 'react';
import Index from "@/reuseable/bar-chart";
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";

const Page = () => {
    return (
        <div>
            <Index maxHeight={'20rem'} maxWidth={'30rem'} componentId={'e'} />
            <PerformanceCard/>
        </div>
    );
};

export default Page;