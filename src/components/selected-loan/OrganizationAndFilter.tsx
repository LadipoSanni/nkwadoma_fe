import React from 'react';
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";

const OrganizationAndFilter = () => {
    return (
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 md:place-content-between md:flex md:mr-auto md:ml-auto ml-1 w-full h-fit md:w-full md:h-fit`}>
            <OrganizationNameAndChangeButton/>
            {/*<SearchAndFilterLoan/>*/}
        </div>
    );
};

export default OrganizationAndFilter;