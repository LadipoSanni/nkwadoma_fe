import React from 'react';
import SelectLoanTab from "@/component/selectedLoan/SelectLoanTab";
import InstitutionAndFilter from "@/component/selectedLoan/InstitutionAndFilter";

const SelectedLoanHeader = () => {
    return (
        <div className={`grid mt-4 md:mr-auto md:ml-auto ml-1 w-[98%] h-[20%] md:w-[98%] md:h-[22%]`}>
          <SelectLoanTab/>
          <InstitutionAndFilter/>
        </div>
    );
};

export default SelectedLoanHeader;