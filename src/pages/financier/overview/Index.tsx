import React from 'react';
import {MdOutlineErrorOutline} from "react-icons/md";
import {inter500} from '@/app/fonts'
import BalanceCard from "@/reuseable/cards/BalanceCard/Index";
import MyInvestments from "@/features/financier/summary/myInvestments/Index"
import InvestmentMarketplace from '@/features/financier/summary/investmentMarketplace/Index'

const FinancierOverview = () => {
    return (
        <main className={'px-5 h-[88vh] overflow-y-auto pb-8'}>
            <section>

            </section>
            <div
                className={`${inter500.className} h-16 w-full mt-[38px] p-5 flex gap-2 bg-warning150 border-[0.5px] border-warning650 rounded-[6px]`}>
                <MdOutlineErrorOutline className={'h-[22px] w-[22px] text-warning650'}/>
                <p className={'text-warning650 leading-[150%] text-[16px]'}>Click here to complete your KYC</p>
            </div>
            <section className={'mt-8'}>
                <BalanceCard/>
            </section>
            <div className={'mt-8'}>
                <MyInvestments />
            </div>
            <div className={'mt-8'}>
                <InvestmentMarketplace />
            </div>
        </main>
    );
};

export default FinancierOverview;