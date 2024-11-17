import React from 'react';
import {Input} from '@/components/ui/input'
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import {MdSearch} from "react-icons/md";

const OrganizationAndFilter = () => {
    return (
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 md:place-content-between md:grid md:mr-auto md:ml-auto ml-1 w-full h-fit md:w-full md:h-fit`}>
            <OrganizationNameAndChangeButton/>
            {/*<SearchAndFilterLoan/>*/}
            <div
                id="filterAndSearchComponent"
                data-testid="filterAndSearchComponent"
                className={`flex gap-1 w-fit h-fit md:w-fit md:h-fit md:flex md:gap-1`}
            >
               T <div className='relative'>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                       <MdSearch className="h-6 w-6 text-grey200"/>
                    </span>
                    <Input
                        id='searchLoan'
                        placeholder='Search'
                        className='w-full lg:w-80 rounded h-9 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10'
                    />
                </div>
            </div>
        </div>
    );
};

export default OrganizationAndFilter;