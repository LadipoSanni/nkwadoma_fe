'use client'
import React, {useState} from 'react';
import styles from '@/features/Overview/index.module.css';
import Details from "@/components/loanee-my-profile/Details";
import SearchInput from "@/reuseable/Input/SearchInput";

const ViewAllLoaneeOverview = () => {
    const [searchTerm, setSearchTerm] = useState('');


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('searchTerm', searchTerm);
        setSearchTerm(event.target.value);
    };

    return (
        <div
            id={'viewAllLoaneeOverviewContainer'}
            data-testid={'viewAllLoaneeOverviewContainer'}
            className={`w-full h-full grid gap-4 px-4 py-6   `}
        >
            <div
                id={'viewAllLoaneeTotalOverviewContainer'}
                data-testid={'viewAllLoaneeTotalOverviewContainer'}
                className={` w-full h-full flex gap-4   ${styles.overviewCard}   `}
            >
                <Details isLoading={false} sx={`  w-[20em] md:w-[100%]  `} name={'No. of loanees'} valueType={'digit'}  id={'totalNumberOfLoanees'} showAsWholeNumber={false}  value={'0'}/>
                <Details isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'historicalDept'} showAsWholeNumber={false}    name={'Historical debt'} value={''} valueType={'currency'}  />
                <Details isLoading={false} sx={` w-[20em] md:w-[100%] `} id={'totalOutstanding'} showAsWholeNumber={false}    name={'Total outstanding'} value={''} valueType={'currency'}  />
            </div>
            <div
                id={'tableAndSearchContainer'}
                data-testid={'tableAndSearchContainer'}
                className={`grid gap-4 `}

            >
                <SearchInput
                    id={'searchField'}
                    value={'search by name'}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
};

export default ViewAllLoaneeOverview;