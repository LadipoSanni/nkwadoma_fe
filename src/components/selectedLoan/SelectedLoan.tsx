import React from 'react';
import SelectedLoanHeader from "@/components/selectedLoan/SelectedLoanHeader";

type props = {
    children: React.ReactNode;
}

const SelectedLoan = ({children}: props) => {
    return (
        <div>
            <div id={'selectedLoanLayout'} className={`grid  h-[85vh] w-[97%] `}>
                <div id={'selectedLoanContainer'}
                     className={` grid rounded bg-white h-[86vh] md:h-[85vh] w-[89vw] md:w-[80vw]`}>
                    <SelectedLoanHeader/>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SelectedLoan;