import React from 'react';
import SelectedLoanHeader from "@/components/selected-loan/SelectedLoanHeader";

type props = {
    children: React.ReactNode;
}

const SelectedLoan = ({children}: props) => {
    return (
        <div>
            <div id={'selectedLoanLayout'} className={`grid  h-[100%] w-[100%] `}>
                <div id={'selectedLoanContainer'}
                     className={` grid gap-2 `}>
                    <SelectedLoanHeader/>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SelectedLoan;