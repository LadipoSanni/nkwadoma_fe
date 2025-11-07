"use client"
import React,{ useEffect, useState} from 'react'
import BackButton from "@/components/back-button";
import { inter } from '@/app/fonts';
import { useRouter } from 'next/navigation';
import { PaymentVerifiedIcon } from '@/reuseable/svg-icons/Icons';
import { formatAmount } from '@/utils/Format';
import PaymentTabs from '@/reuseable/tabs/paymentTabs';
import { setCurrentPaymentTypeTab } from '@/redux/slice/make-payment/payment';
import { store,useAppSelector } from '@/redux/store';
import LinkedAccount from '@/components/loanee/payment-type/Linked-account';
import Wallet from '@/components/loanee/payment-type/Wallet';
import Paystack from '@/components/loanee/payment-type/Paystack';
import { setWalletTab,setLinkedAccountTab } from '@/redux/slice/make-payment/payment';

function MakePayment() {
    const router = useRouter()
    const data = [
        {name: 'Wallet', id: 'wallet'},
        {name: 'Paystack', id: 'paystack'},
        {name: 'Link accounts', id: 'linkAccounts'},
    ]

    const selectPaymentTab = useAppSelector(state => state?.payment?.paymentTab)
     const currentState = useAppSelector(state => state?.payment?.walletTab)

     const linkedAccountCurrentState = useAppSelector(state => state?.payment?.linkedAccountTab)
    const [currentTab, setCurrentTab] = useState(selectPaymentTab)

    useEffect(() => {
            store.dispatch(setCurrentPaymentTypeTab(currentTab))
        }, [currentTab])

        const getCurrentDataList = () => {
            switch (currentTab) {
                case 0:
                    return <Wallet/>
                case 1:
                    return <Paystack/>
                case 2:
                    return <LinkedAccount/>
                default:
                    return [];
            }
        }

        const handleBackRoute = () => {
            if(currentTab === 0 && currentState === 1){
               store.dispatch(setWalletTab(0))
            }else if(currentTab === 2 &&  linkedAccountCurrentState === 1){
                store.dispatch(setLinkedAccountTab(0))
            }else {
              router.push("/payment")
            }
        }

  return (
    <div className={`${inter.className} px-6 py-6`}>
       <BackButton 
    id='routeButton'
    textColor={'meedlBlue'}
    text={'Back'} 
    iconBeforeLetters={true}
    handleClick={handleBackRoute}
    className='font-normal text-[14px]'
   />
    <section className='mt-5 md:px-10'>
        <div className='md:flex items-center justify-between md:border-b md:border-solid border-[#D7D7D7] pb-2'>
        <div className='grid grid-cols-1 gap-y-2'>
        <PaymentVerifiedIcon className="w-[38.21px] h-[38.21px] text-[#882204]" />
        <p className='font-medium text-[20px] text-[#212221]'>Make payment</p>
        </div>

        <div className='grid grid-cols-1 gap-y-2'>
         <p className='text-[#4D4E4D] text-[14px] font-normal md:flex justify-end'>Outstanding loan</p>
         <div>
            <p className='text-[#142854] text-[14px] font-normal md:flex justify-end'>Student living allowance loan for software engineering</p>
            <p className='text-[#142854] font-medium text-[20px] md:flex justify-end'>{formatAmount("3500000")}</p>
         </div>
        </div>
        </div>
        
        <div className=' w-full  bg-00 py-4 grid md:gap-[10vw]  md:flex md:justify-between  gap-6 lg:px-8'>
         <PaymentTabs
         tabCurrentTabIndex={currentTab}
         setTabCurrentTabIndex={setCurrentTab}
         id={'paymentTabs'} 
         tabElement={data} 
         header='Make payment via'
         width='lg:w-[30%]'
         />
         <div className='w-full relative bottom-5 md:bottom-0 md:top-4 lg:pr-16'>
         {getCurrentDataList()}
         </div>
        </div>
    </section>
    </div>
  )
}

export default MakePayment
