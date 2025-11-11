'use client'
import React, { useMemo } from 'react'
import { inter } from '@/app/fonts'
import { Button } from '@/components/ui/button'
import styles from "./index.module.css"
import { formatAmount } from '@/utils/Format';
import {FiEye, FiEyeOff} from "react-icons/fi";
import { WalletAddIcon } from '@/reuseable/svg-icons/Icons';
import BackButton from "@/components/back-button";
import LinkAccount from './Link-account'
import { TransactionHistory } from '@/reuseable/transactions/Transaction-history'
import { transactionsHistory } from '@/utils/LoanRequestMockData/cohortProduct';
import { useRouter } from 'next/navigation'
// import ButtonAndSearch from '@/reuseable/action-bars/Button-and-search'

export const bankAccounts = [
  {
    "bankName": "Guaranty Trust Bank",
    "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/GTBank_logo.svg/1024px-GTBank_logo.svg.png",
    "accountNumber": "0234567890",
    "id" : "146534"
  },
  {
    "bankName": "First Bank of Nigeria",
    "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/First_Bank_of_Nigeria_logo.png/250px-First_Bank_of_Nigeria_logo.png",
    "accountNumber": "1234567890",
    "id" : "876454"
  },
  {
    "bankName": "Access Bank",
    "logo": "https://www.processmaker.com/wp-content/uploads/2019/10/Access_Bank_Logo.png",
    "accountNumber": "0701234567",
    "id" : "8769084"
  },
  {
    "bankName": "Zenith Bank",
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTMKt8Moub0IgEgzazp20zubI8u-9pIJlV2A&s",
    "accountNumber": "1012345678",
    "id" : "87645684"
  },
  {
    "bankName": "United Bank for Africa",
    "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsmlHU9WtMqUjvqMVTfVK7T4EFYBHPHQvIEQ&s",
    "accountNumber": "1001234567",
    "id" : "8769865484"
  }
]

function Payment() {

    const bankAccount = {
            bankName: "Access Bank Nigeria Limited",
            logo: "https://www.processmaker.com/wp-content/uploads/2019/10/Access_Bank_Logo.png",
            accountNumber: "0701234567",
    }
    const [showWalletBalance, setShowWalletBalance] = React.useState(false);

        

  const latestTransactions = useMemo(() => {
    if (transactionsHistory.length === 0) return [];
    
    const transactionsWithDates = transactionsHistory.map(transaction => ({
        ...transaction,
        dateObject: new Date(transaction.date)
    }));
    
    const latestDate = new Date(Math.max(...transactionsWithDates.map(t => t.dateObject.getTime())));
    
    const latestDateString = transactionsWithDates.find(t => 
        t.dateObject.getTime() === latestDate.getTime()
    )?.date;
    
    return transactionsHistory.filter(transaction => 
        transaction.date === latestDateString
    );
}, []);

const router = useRouter()

  return (
    <div className={`pt-5 px-2   md:px-16 h-[81vh] ${inter.className} ${styles.container} mb-80`}>
        <div className='relative md:right-7 right-1 grid grid-cols-1 gap-y-6'>
      <section id='sectionOne' className='grid md:grid-cols-2 grid-cols-1 gap-x-4 '> 
        <div className='bg-[#F0F0F0] py-3 px-5 rounded-lg border-solid border-[#F9F9F9] border-[1px]'>
            <p className='font-bold mt-3 text-[#212221]'>Outstanding loan</p>
            <div className='mt-6 grid grid-cols-1 gap-y-4'>
            <div className='flex  gap-2'>
            <p className='text-[#212221] text-[14px] font-normal w-28  lg:w-20'>Loan type:</p><p className=' text-[#212221] font-medium'>Student living allowance loan for learners</p>
            </div>
            <div className='flex  gap-2'>
            <p className='text-[#212221] text-[14px] font-normal w-13 '>Amount:</p><p className='ml-6 text-[#212221] font-medium'>₦5,000,000.00 </p>
            </div>
            </div>
            <div className='mt-8 mb-2'>
             <Button
              variant={`secondary`}
             className='h-[37px] font-bold w-[141px] text-[14px]'
             id='makePayment'
             data-testid={"makePaymentTextId"}
             onClick={() => {router.push("/payment/make-payment")}}
             >
                Make payment
             </Button>
            </div>
        </div>

        <div className='border-solid border-[#ECECEC] border-[1px] rounded-lg flex flex-col mt-4 md:mt-0'>
  <div className='mt-3 text-[#142854] py-3 px-5 flex-1'>
    <p className='text-[12px] font-medium'>Wallet balance</p>
    <div className='flex h-fit items-center gap-2'>
        {showWalletBalance ? <span className='font-semibold text-[30px]'>{formatAmount(0)}</span> : <p className='font-semibold  h-fit   mt-auto text-[30px]'>....</p> }
        {showWalletBalance ? <FiEyeOff  onClick={() => [setShowWalletBalance(!showWalletBalance)]} color='black'/> : <FiEye className={`  mb-1  mt-auto `}  onClick={() => [setShowWalletBalance(!showWalletBalance)]} color='black'/>}
    </div>
    <div className='mt-4'>
      <Button
          onClick={() => {router.push('/fund-wallet')}}
        variant={"outline"}
        className='w-full md:w-[289px] rounded-full h-[40px] bg-[#F3F8FF] hover:bg-[#E8F2FF] text-[#142854] font-normal flex items-center justify-center'
      >
        <WalletAddIcon className="w-5 h-5" /> 
        <span className='ml-2'>Fund wallet</span>
      </Button>
    </div>
  </div>
  <div className='h-[54px]  w-full bg-[#F6F6F6] rounded-b-lg flex items-center justify-end mt-1 px-4 '>
   <BackButton 
    id='routeButton'
    textColor={'meedlBlue'}
    text={'View'} 
    iconBeforeLetters={false}
    handleClick={() => {router.push('/wallet')}}
    className='font-medium text-[16px] mr-2'
    sx='text-[20px]'
   />
  </div>
</div>    
      </section>
    
  <section id='sectionTwo'>
   <LinkAccount
    bankAccount={bankAccount}
    numberOfAccounts={bankAccounts.length}
    handleRouteClick={()=> {router.push("/payment/link-account")}}
   />
  </section>

  <section id='sectionThree'>
   <p className='font-medium text-meedlBlue'>Payment history</p>
    <div className={`${transactionsHistory.length === 0? "mb-24 md:mb-0 " : "mt-3"}`}>
      <TransactionHistory
       transactions={latestTransactions}
      //  currentPage={0}
      //  totalPages={1}
      //  onPageChange={()=>{}}

       handleViewAll={()=>{router.push("/payment/payment-history")}}
      />
    </div>
  </section>
    </div>
    </div>
  )
}

export default Payment
