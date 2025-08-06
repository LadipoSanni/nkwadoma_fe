import React from 'react';
import styles from '@/features/Overview/index.module.css';
import Details from "@/components/loanee-my-profile/Details";

const ViewAllLoaneeOverview = () => {
    return (
        <div
            id={'viewAllLoaneeOverviewContainer'}
            data-testid={'viewAllLoaneeOverviewContainer'}
            className={`w-full h-full grid gap-4 px-4 py-6   `}
        >
            <div
                id={'viewAllLoaneeTotalOverviewContainer'}
                data-testid={'viewAllLoaneeTotalOverviewContainer'}
                className={` w-full h-full flex gap-4  ${styles.overviewCard}   `}
            >
                <Details isLoading={false} sx={`  w-[20em] md:w-full  `} name={'No. of loanees'} valueType={'digit'}  id={'totalNumberOfLoanees'} showAsWholeNumber={false}  value={'0'}/>
                <Details isLoading={false} sx={` w-[20em] md:w-full `} id={'historicalDept'} showAsWholeNumber={false}    name={'Historical debt'} value={''} valueType={'currency'}  />
                <Details isLoading={false} sx={` w-[20em] md:w-full `} id={'totalOutstanding'} showAsWholeNumber={false}    name={'Total outstanding'} value={''} valueType={'currency'}  />
            </div>
        </div>
    );
};

export default ViewAllLoaneeOverview;