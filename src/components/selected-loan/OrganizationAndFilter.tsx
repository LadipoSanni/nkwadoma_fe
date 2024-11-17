import React from 'react';
import {Input} from '@/components/ui/input'
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import {MdSearch} from "react-icons/md";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon} from "@radix-ui/react-icons";

const OrganizationAndFilter = () => {
    return (
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 md:place-content-between md:grid md:mr-auto md:ml-auto  w-full h-fit md:w-full md:h-fit`}>
            <OrganizationNameAndChangeButton/>
            <div
                id="filterAndSearchComponent"
                data-testid="filterAndSearchComponent"
                className={`flex gap-1 w-fit h-fit md:w-fit md:h-fit md:flex md:gap-1`}
            >
                <div className='relative'>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                       <MdSearch className="h-6 w-6 text-grey200"/>
                    </span>
                    <Input
                        id='searchLoan'
                        placeholder='Search'
                        className='w-full lg:w-80 rounded h-11 md:h-9 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10'
                    />
                </div>
                <Button
                    id={'filterLoanButton'}
                    data-testid="filterLoanButton"
                    className={` text-sm gap-2 md:text-xs  w-fit px-2 md:w-1/5 h-11 md:h-9 rounded bg-neutral100 hover:bg-neutral100 text-black border border-[#D0D5DD] shadow-none `}
                >
                    Program
                    <ChevronDownIcon className="h-4 w-4 md:h-8 md:w-8 font-semibold" />
                </Button>
            </div>
        </div>
    );
};

export default OrganizationAndFilter;