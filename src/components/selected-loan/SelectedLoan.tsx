import React from 'react';
import SelectedLoanHeader from "@/components/selected-loan/SelectedLoanHeader";
import styles from "./SelectedLoan.module.css"

type props = {
    children: React.ReactNode;
}

const SelectedLoan = ({children}: props) => {
    return (
        <div>
            <div id={'selectedLoanLayout'} className={` ${styles.layout} grid absolute gap-1 h-[100%] w-[100%] md:h-[100%] md:w-[100%] `}>
                {/*<div id={'selectedLoanContainer'}*/}
                {/*     className={` grid gap-2 `}>*/}
                    <SelectedLoanHeader/>
                    <div id={'childrenOnLoan'}
                         data-testid={'childrenOnLoan'}
                         className={`bg-pink-50 relative bottom-0 overflow-auto md:overflow-auto md:px-2  md:bg-pink-50 md:w-full mr-auto ml-auto h-auto  w-[97%]  rounded `}
                    >
                        {children}

                    </div>
            </div>
        </div>
    );
};

export default SelectedLoan;