import React from 'react';
import SelectLoanTab from "@/components/selected-loan/SelectLoanTab";
import OrganizationAndFilter from "@/components/selected-loan/OrganizationAndFilter";

const SelectedLoanHeader = () => {
    return (
        <div
            id="SelectedLoanInnerHeader"
            className={`grid gap-3 mt-4  md:mr-auto md:ml-auto w-[88vw] mr-auto ml-auto h-fit md:w-[98%] md:h-fit`}>
          <SelectLoanTab/>
          <OrganizationAndFilter/>
        </div>
    );
};

export default SelectedLoanHeader;