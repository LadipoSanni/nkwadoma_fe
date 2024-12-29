'use client'
import React from 'react';
import BackButton from "@/components/back-button";
import {store} from "@/redux/store";
import {setCurrentTab} from "@/redux/slice/loan/selected-loan";

const Index = () => {

    const backToViewAllDisbursedLoan = () => {
        store.dispatch(setCurrentTab('Disbursed loan'))
        router.push('/loan/loan-disbursal')

    }

    return (
        <div
            id={'disbursedLoanMainContainer'}
            data-testid={'disbursedLoanMainContainer'}
            className={'md:px-8 w-full h-full  px-3 pt-4 md:pt-4'}
        >
            <BackButton handleClick={backToViewAllDisbursedLoan} iconRight={true} text={"Back to disbursed loan"}
                        id={"disbursedLoanDetailsBackButton"} textColor={'#142854'}/>
        </div>
    );
};

export default Index;