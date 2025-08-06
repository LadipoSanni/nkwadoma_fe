import React from 'react';
import styles from '@/features/Overview/index.module.css';
import Details from "@/components/loanee-my-profile/Details";

const ViewAllLoaneeOverview = () => {
    return (
        <div
            id={'viewAllLoaneeOverviewContainer'}
            data-testid={'viewAllLoaneeOverviewContainer'}
            className={`w-full h-full px-6 py-6   `}
        >
            <div
                id={'viewAllLoaneeTotalOverviewContainer'}
                data-testid={'viewAllLoaneeTotalOverviewContainer'}
                className={` w-full h-full flex gap-4  ${styles.overviewCard}   `}
            >
                <Details isLoading={false} sx={`  w-[20em] md:w-full  `} name={'No. of loanees'} valueType={'digit'}  id={'totalNumberOfLoanees'} showAsWholeNumber={false}   maxWidth={'100%'}  value={'10000'}/>
                <Details isLoading={false} sx={` w-[20em] md:w-full `} id={'loaneeTotalLoaneOutstanding'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount outstanding '} value={''} valueType={'currency'}  />
                <Details isLoading={false} sx={` w-[20em] md:w-full `} id={'loaneeTotalAmountRepaid'} showAsWholeNumber={false}   maxWidth={'100%'} name={'Total amount repaid '} value={''} valueType={'currency'}  />

            </div>
        </div>
    );
};

export default ViewAllLoaneeOverview;