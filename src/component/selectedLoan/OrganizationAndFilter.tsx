import React from 'react';
import OrganizationNameAndChangeButton from "@/component/selectedLoan/OrganizationNameAndChangeButton";
import SearchAndFilterLoan from "@/component/selectedLoan/SearchAndFilterLoan";

const OrganizationAndFilter = () => {
    return (
        <div className={`md:flex md:place-content-between grid  w-[98%] ml-auto mr-auto mt-4 md:w-[99%] h-[6vh] md:h-[11vh] md:rounded`}>
            <OrganizationNameAndChangeButton/>
            <SearchAndFilterLoan/>
        </div>
    );
};

export default OrganizationAndFilter;