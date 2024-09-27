import React from 'react';
import OrganizationNameAndChangeButton from "@/component/selectedLoan/OrganizationNameAndChangeButton";
import SearchAndFilterLoan from "@/component/selectedLoan/SearchAndFilterLoan";

const OrganizationAndFilter = () => {
    return (
        <div
            id="organzationAndFilterComponent"
            className={`grid bg-amber-500 md:place-content-between md:flex md:mr-auto md:ml-auto ml-1 w-[70%] h-[98%] md:w-[98%] md:h-[22%]`}>
            <OrganizationNameAndChangeButton/>
            <SearchAndFilterLoan/>
        </div>
    );
};

export default OrganizationAndFilter;