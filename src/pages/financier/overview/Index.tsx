'use client'
import React from 'react';
import {MdOutlineErrorOutline} from "react-icons/md";
import {inter500} from '@/app/fonts'
import BalanceCard from "@/reuseable/cards/BalanceCard/Index";
import MyInvestments from "@/features/financier/summary/myInvestments/Index"
import InvestmentMarketplace from '@/features/financier/summary/investmentMarketplace/Index'
import {useRouter} from 'next/navigation';
import styles from "./index.module.css"

const financialCardData = [
    {
        title: "Number of investments", amount: "0", linkText: "View"
    },
    {
        title: "Amount invested", amount: "0", linkText: "View"
    },
    {
        title: "Portfolio value", amount: "0", linkText: "View"
    }
];

const FinancierOverview = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/kyc/identification')
    }
    return (
        <main className={`px-5 h-[85vh] ${styles.container}  pb-8`}>

            <button
                onClick={()=> {handleClick()}}
                className={`${inter500.className} h-16 w-full mt-[38px] md:p-5 py-4 px-3 flex gap-2 bg-warning150 border-[0.5px] border-warning650 rounded-[6px]`}>
                <MdOutlineErrorOutline className={'h-[22px] w-[22px] text-warning650'}/>
                <p  className={'cursor-pointer text-warning650 leading-[150%] text-[14px] md:text-[16px]'}>Click here to complete your KYC</p>
            </button>
            <section className={'mt-8'}>
                <BalanceCard cardData={financialCardData} />
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