import React from 'react';
import SelectLoanTab from "@/component/selectedLoan/SelectLoanTab";
import OrganizationAndFilter from "@/component/selectedLoan/OrganizationAndFilter";

const SelectedLoanHeader = () => {
    return (
        <div
            id="SelectedLoanInnerHeader"
            className={`grid mt-4 md:mr-auto md:ml-auto ml-1 w-[98%] h-[20%] md:w-[98%] md:h-[22%]`}>
          <SelectLoanTab/>
          <OrganizationAndFilter/>
        </div>
    );
};

export default SelectedLoanHeader;