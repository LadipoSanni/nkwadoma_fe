'use client'
import React, { useState } from 'react'
import BackButton from "@/components/back-button";
import { useRouter } from 'next/navigation';
import { inter } from '@/app/fonts';
import DropdownFilter from "@/reuseable/Dropdown/DropdownFilter";
import {months} from "@/utils/LoanProductMockData";
import { transactionsHistory } from '@/utils/LoanRequestMockData/cohortProduct';
// import { getPaginatedData } from '@/utils/Mock-paginated-data';
import { TransactionHistory } from '@/reuseable/transactions/Transaction-history';
import styles from "./index.module.css"

function PaymentHistory() {
const [selectedYear, setSelectedYear] = useState<string | number>("");
const [selectedMonth, setSelectedMonth] = useState<string | number>("");
const [displayedMonth, setDisplayedMonth] = useState('')
const [selectedIndex, setSelectedIndex] = useState<number| string>('');
const [year, setYear] = useState<number | string>('');
const [displayedYear, setDisplayedYear] = useState('')
const router = useRouter()

const handle =() => {
  if(displayedMonth && selectedIndex && year && displayedYear){
     return ""
  }
}

// const [pageNumber, setPageNumber] = useState(0);
//   const pageSize = 20;

//   const pagination = useMemo(() => {
//     return getPaginatedData(
//       pageNumber,
//       pageSize,
//       transactionsHistory,
//       setPageNumber
//     );
//   }, [pageNumber, transactionsHistory]);



const setMonthItem = (value: string | number) => {
    if (value === selectedMonth){
        setSelectedMonth('')
    }else {
        setSelectedMonth(value)
    }

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

    const handleFilterYear = () => {
        setYear(selectedYear)
        setDisplayedYear(String(selectedYear))
    }

    const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];

    const setYearItem = (value: string| number) => {
        if (value === selectedYear){
            setSelectedYear('')
        }else{
            setSelectedYear(value)
        }
    }

    const clearYearFilter = () => {
        setSelectedYear('')
        setYear('')
        setDisplayedYear('')
    }

  return (
    <div className={`${inter.className} px-6 py-6`}>
     <BackButton 
    id='routeButton'
    textColor={'meedlBlue'}
    text={'Back'} 
    iconBeforeLetters={true}
    handleClick={()=>{router.push("/payment")}}
    className='font-normal text-[14px]'
   />
   <div className='mt-4 flex  items-center  gap-6 '>
     <p className='font-medium text-[#212221] relative top-1'>Payment history</p>
     <div className={`flex gap-3  `}>
        <DropdownFilter
         title={'Filter by month'}
          selectedItem={selectedMonth}
          handleFilter={filterMonth}
          items={months}
          setSelectItem={setMonthItem}
          clearFilter={clearMonthFilter}
          placeholder={'Month'}
          className='sm:w-[90px] px-2 text-[#212221] font-normal cursor-pointer'
        />

<DropdownFilter
    title={'Filter by year'}
    selectedItem={selectedYear}
    handleFilter={handleFilterYear}
    items={years}
    setSelectItem={setYearItem}
    clearFilter={clearYearFilter}
    placeholder={'Year'}
    sx={'grid grid-cols-5'}
     className='sm:w-20 text-[#212221] font-normal cursor-pointer'
/>
     </div>
   </div>

   <div className='mt-10'>
   <TransactionHistory
    transactions={transactionsHistory}
    // currentPage={pagination.pageNumber}
    // totalPages={pagination.totalPages}
    // onPageChange={setPageNumber}
    // hasNextPage={pagination.hasNextPage}
    className={`h-[61vh] ${styles.container}`}

    />
   </div>
   <div className='hidden' onClick={handle}>

   </div>
    </div>
  )
}

export default PaymentHistory
