import React from 'react';
import SelectLoanTab from "@/component/selectedLoan/SelectLoanTab";
import OrganizationAndFilter from "@/component/selectedLoan/OrganizationAndFilter";

const SelectedLoanHeader = () => {
    return (
        <div
            id="SelectedLoanInnerHeader"
            className={`grid bg-purple-200 mt-4 md:mr-auto md:ml-auto  w-[88vw] mr-auto ml-auto h-[13rem] md:w-[98%] md:h-[22%]`}>
          <SelectLoanTab/>
          <OrganizationAndFilter/>
        </div>
    );
};

export default SelectedLoanHeader;