'use client'
import React, {useState} from 'react';
import {Trans} from "@/types/ButtonTypes";
import DropdownFilter from "@/reuseable/Dropdown/DropdownFilter";
import {months} from "@/utils/LoanProductMockData";
import {inter, inter500 } from '@/app/fonts';
import dayjs from "dayjs";
import {formatAmount} from "@/utils/Format";
import styles from '@/layout/meedl-layout/index.module.css'
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
interface Props {
    viewLittle?: boolean;
    data?: {date: string, details:Trans[]}[],
    onViewAllClick?: () => void,
}

const Transaction = ({viewLittle,data,onViewAllClick}:Props) => {
    const [year, setYear] = useState<number | string>('');
    const [displayedYear, setDisplayedYear] = useState('')
    const [displayedMonth, setDisplayedMonth] = useState('')
    const [selectedYear, setSelectedYear] = useState<string | number>("");
    const [selectedMonth, setSelectedMonth] = useState<string | number>("");
    const [selectedIndex, setSelectedIndex] = useState<number| string>('');

    const setMonthItem = (value: string | number) => {
        if (value === selectedMonth){
            setSelectedMonth('')
        }else {
            setSelectedMonth(value)
        }
    }


    const setYearItem = (value: string| number) => {
        if (value === selectedYear){
            setSelectedYear('')
        }else{
            setSelectedYear(value)
        }
    }


    const  getYea = (firstRepaymentYear: number,lastRepaymentYear: number) => {
        if (!firstRepaymentYear || !lastRepaymentYear) {
            if (firstRepaymentYear) return [firstRepaymentYear];
            if (lastRepaymentYear) return [lastRepaymentYear];
            return [];
        }

        const start = Math.min(firstRepaymentYear, lastRepaymentYear);
        const end = Math.max(firstRepaymentYear, lastRepaymentYear);

        const repaymentYears: number[] = [];
        for (let year = start; year <= end; year++) {
            repaymentYears.push(year);
        }

        return repaymentYears;
    }

    const handleFilterYear = () => {
        setYear(selectedYear)
        setDisplayedYear(String(selectedYear))
    }
    const clearMonthFilter = () => {
        setSelectedMonth('')
        setSelectedIndex(0)
        setDisplayedMonth('')
    }
    const filterMonth = () => {
        for (let i = 0; i < months.length; i++) {
            if (months[i] === selectedMonth) {
                setSelectedIndex(i + 1)
            }
        }
        setDisplayedMonth(String(String(selectedMonth)))
    }
    const clearYearFilter = () => {
        console.log(displayedMonth,displayedYear,year,  selectedIndex)
        setSelectedYear('')
        setYear('')
        setDisplayedYear('')
    }

    const getYears = getYea(2000, 2020)

    const getTransactionColors = (status: string) => {
        if (status === 'failed') {
            return {textBackgroundColor: '#FBE9E9', textColor: '#C1231D'}
        }else if (status === 'pending') {
            return {textBackgroundColor: '#FEF6E8', textColor: '#AD7311'}
        }else {
            return {textBackgroundColor: '#E6F2EA', textColor: '#045620'}

        }
    }


    return (
        <main
            id={'viewTransactions'}
            data-testid={'viewTransactions'}
            className={` w-full grid gap-2  `}
        >
            {viewLittle ?
            <div className={` md:w-full lg:w-full lg:flex  md:justify-between lg:justify-between md:flex flex w-full  justify-between    `}>
                <p className={` text-black text-base ${inter500.className}  `}>Recent transactions</p>
                {/*<p onClick={onViewAllClick} className={` text-meedlBlue underline mt-auto mb-auto text-base ${inter500.className} `}>View all</p>*/}
            </div>
            :
            <div
                className={` grid md:flex gap-3  `}
            >
                <p className={` mt-auto mb-auto text-[18px] ${inter500.className} text-[#212221]  `}>Transaction history</p>
                {/*<div className={` flex h-fit sm:w-full gap-2 sm:grid sm:grid-cols-2 w-fit md:w-fit lg:w-fit  `}>*/}
                    <DropdownFilter
                        title={'Filter by month'}
                        selectedItem={selectedMonth}
                        handleFilter={filterMonth}
                        items={months}
                        setSelectItem={setMonthItem}
                        clearFilter={clearMonthFilter}
                        placeholder={'Month'}
                    />

                    <DropdownFilter
                        title={'Filter by year'}
                        selectedItem={selectedYear}
                        handleFilter={handleFilterYear}
                        items={getYears}
                        setSelectItem={setYearItem}
                        clearFilter={clearYearFilter}
                        placeholder={'Year'}
                        sx={'grid grid-cols-5'}
                    />
                {/*</div>*/}
            </div>
            }
            <div
                className={` ${styles.noScrollBarBgColor} ${!viewLittle ? ` max-h-[70vh] overflow-y-scroll  ` : ``}  `}>
                <section className={` py-2 grid gap-3 `}>
                    {data?.map((item, index) => (
                        <main key={ "transaction"+index}
                              className={` grid gap-2 h-fit  `}
                              id={`transactions-${index}`}
                              data-testid={`transactions-${index}`}
                        >
                            {viewLittle ?
                            <div className={` w-full lg:flex md:flex justify-between `}>
                                <p id={`transactionDate-${index}`} data-testid={`transactionDate-${index}`} className={` text-[16px] ${inter.className} text-black `}>{dayjs(item?.date?.toString()).format('D MMM, YYYY')}</p>
                                {index === 0 && <p onClick={onViewAllClick}
                                    className={` text-meedlBlue cursor-pointer underline mt-auto mb-auto text-base ${inter500.className} `}>View
                                    all</p>
                                }                            </div>
                            :
                                <p id={`transactionDate-${index}`} data-testid={`transactionDate-${index}`} className={` text-[16px] ${inter.className} text-black `}>{dayjs(item?.date?.toString()).format('D MMM, YYYY')}</p>
                            }
                            <div className={`   `}>
                                <section id={`transactionsOn-${index}`} data-testid={`transactionsOn-${index}`}  className={` bg-[#F9F9F9] w-full grid gap-4 md:py-2  px-4 py-2  rounded-md md:px-4 `}>
                                    {item?.details?.map((detail,  detailsIndex) => (
                                        <div key={'ins' + detailsIndex} className={` grid gap-2  py-2  ' border-b border-b-[#D7D7D7]   `}>
                                    <span className={` flex justify-between `}>
                                        <p className={` text-[12px] max-w-[70%]  text-black ${inter.className} `}>{detail?.description}</p>
                                        <p className={`text-[12px] text-black ${inter.className}  `}> Paid via {detail?.paymentMode?.toLowerCase()}</p>
                                     </span>
                                            <div className={`  flex justify-between `}>
                                                <div  className={` text-[12px]   w-fit h-fit py-1 px-2 rounded-full  ${inter.className} text-[${getTransactionColors(detail?.status)?.textColor}] bg-[${getTransactionColors(detail?.status)?.textBackgroundColor}] `}>{capitalizeFirstLetters(detail?.status)}</div>
                                                <p  className={`md:text-[16px] lg:text-[16px] text-[12px]   ${inter.className} text-[${getTransactionColors(detail?.status)?.textColor}]  `}>{formatAmount(detail?.amount)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </main>
                    ))}
                </section>
            </div>
        </main>
    );
};

export default Transaction;