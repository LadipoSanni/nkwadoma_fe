'use client'
import React, {useEffect, useState} from 'react';
import {MdOutlineErrorOutline} from "react-icons/md";
import {inter500} from '@/app/fonts'
import BalanceCard from "@/reuseable/cards/BalanceCard/Index";
import MyInvestments from "@/features/financier/summary/myInvestments/Index"
import InvestmentMarketplace from '@/features/financier/summary/investmentMarketplace/Index'
import {useRouter} from 'next/navigation';
import styles from "./index.module.css"
import { useViewFinancierDashboardQuery } from '@/service/financier/api';
import {setFinancierType} from "@/redux/slice/financier/financier";
import { useAppDispatch} from "@/redux/store";
import dynamic from "next/dynamic";
import { NumericFormat } from 'react-number-format';

interface FinancierDashboardData {
    data?: {
        totalNumberOfInvestment?: number;
        totalAmountInvested?: number;
        portfolioValue?: number;
    };
}

const getFinancialCardData = (data: FinancierDashboardData) => {
    const defaultData = [
        {
            title: "Number of investments",
            amount: <NumericFormat value={0} displayType="text" thousandSeparator={true} />,
            linkText: "View"
        },
        {
            title: "Amount invested",
            amount: <NumericFormat value={0} displayType="text" thousandSeparator={true} prefix="₦" />,
            linkText: "View"
        },
        {
            title: "Portfolio value",
            amount: <NumericFormat value={0} displayType="text" thousandSeparator={true} prefix="₦" />,
            linkText: "View"
        }
    ];

    if (!data?.data) return defaultData;

    return [
        {
            title: "Number of investments",
            amount: <NumericFormat
                value={data.data.totalNumberOfInvestment || 0}
                displayType="text"
                thousandSeparator={true}
            />,
            linkText: "View"
        },
        {
            title: "Amount invested",
            amount: <NumericFormat
                value={data.data.totalAmountInvested || 0}
                displayType="text"
                thousandSeparator={true}
                prefix="₦"
            />,
            linkText: "View"
        },
        {
            title: "Portfolio value",
            amount: <NumericFormat
                value={data.data.portfolioValue || 0}
                displayType="text"
                thousandSeparator={true}
                prefix="₦"
            />,
            linkText: "View"
        }
    ];
};

const FinancierOverview = dynamic(
    () => Promise.resolve(FinancierOverviewContent),
    {ssr: false}
)

const FinancierOverviewContent = () => {
    const router = useRouter();
    const {data, isLoading, refetch} = useViewFinancierDashboardQuery({})
    const dispatch = useAppDispatch();
    const [showKycButton, setShowKycButton] = useState(false);

    const [isFromKycCompletion, setIsFromKycCompletion] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const referrer = document.referrer;
            if (referrer && referrer.includes('/kyc/political-exposure')) {
                setIsFromKycCompletion(true);
                setShowKycButton(false);
                refetch();
            }
        }
    }, [refetch]);

    useEffect(() => {
        if (data?.data?.financierType) {
            const type = data.data.financierType as 'INDIVIDUAL' | 'COOPERATE';
            dispatch(setFinancierType(type));
        }

        if (!isLoading && !isFromKycCompletion) {
            const timer = setTimeout(() => {
                const isAccredited = data?.data?.accreditationStatus === "VERIFIED";
                setShowKycButton(!isAccredited);

                if (!isAccredited) {
                    const refetchTimer = setTimeout(() => {
                        refetch();
                    }, 2000);

                    return () => clearTimeout(refetchTimer);
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [data, dispatch, isLoading, isFromKycCompletion, refetch]);

    const handleClick = () => {
        router.push('/kyc/identification')
    }

    return (
        <main className={`px-5 pr-5 h-[85vh] ${styles.container}  pb-8`}>

            {showKycButton ? (
                <button
                    onClick={()=> {handleClick()}}
                    className={`${inter500.className} h-16 w-full mt-[38px] md:p-5 py-4 px-3 flex gap-2 bg-warning150 border-[0.5px] border-warning650 rounded-[6px]`}>
                    <MdOutlineErrorOutline className={'h-[22px] w-[22px] text-warning650'}/>
                    <p className={'cursor-pointer text-warning650 leading-[150%] text-[14px] md:text-[16px]'}>Click here to complete your KYC</p>
                </button>
            ) : (
                <div></div>
            )}
            <section className={'mt-8'}>
                <BalanceCard cardData={getFinancialCardData(data)} />
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
