"use client"
import React,{useEffect} from 'react';
import SelectedLoanHeader from "@/components/selected-loan/SelectedLoanHeader";
import styles from "./SelectedLoan.module.css"
import { resetAll,clearSaveCreateInvestmentField} from '@/redux/slice/vehicle/vehicle';
import {store} from "@/redux/store";

interface props  {
    children: React.ReactNode;
}


const SelectedLoan = ({children}: props) => {

    useEffect(() => {
        store.dispatch(resetAll())
        store.dispatch(clearSaveCreateInvestmentField())
    },[])

    return (
        <div>
            <div id={'selectedLoanLayout'} className={` ${styles.layout}  grid md:grid  absolute gap-1 h-[100%] w-[100%] md:h-[100%] md:w-[100%] pr-2 md:pr-0`}>
                    <SelectedLoanHeader/>
                    <div id={'childrenOnLoan'}
                         data-testid={'childrenOnLoan'}
                         className={` relative bottom-0 overflow-auto md:overflow-auto md:px-3  md:pb-2  md:w-full mr-auto ml-auto h-auto  w-[97%]  rounded `}
                    >
                        {children}

                    </div>
            </div>
        </div>
    );
};

export default SelectedLoan;