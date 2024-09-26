import React from 'react';
import SelectLoanTab from "@/component/selectedLoan/SelectLoanTab";

const SelectedLoanHeader = () => {
    return (
        <div className={`grid mt-4 md:mr-auto md:ml-auto ml-1 w-[98%] h-[20%] md:w-[98%] md:h-[22%]`}>
          <SelectLoanTab/>
        </div>
    );
};

export default SelectedLoanHeader;