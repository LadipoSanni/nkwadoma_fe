import React from 'react';
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import SearchAndFilterLoan from "@/components/selected-loan/SearchAndFilterLoan";

const OrganizationAndFilter = () => {
    return (
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 bg-red-50 md:place-content-between md:flex md:mr-auto md:ml-auto ml-1 w-[70%] h-[98%] md:w-[98%] md:h-[22%]`}>
            <OrganizationNameAndChangeButton/>
            {/*<SearchAndFilterLoan/>*/}
        </div>
    );
};

export default OrganizationAndFilter;