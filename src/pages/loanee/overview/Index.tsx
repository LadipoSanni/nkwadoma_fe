'use client'
import React,{useEffect,useState} from 'react';
import BalanceCard from '@/reuseable/cards/BalanceCard/Index';
import {inter, inter500} from '@/app/fonts';
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import {MdOutlineErrorOutline} from "react-icons/md";
import { store} from "@/redux/store";
import {setCurrentNavbarItem, setCurrentNavBottomItem} from "@/redux/slice/layout/adminLayout";
import {setCurrentStep,setIsAdditionalDetailComplete,setIsidentityVerified} from "@/service/users/loanRerralSlice";
import {useRouter} from "next/navigation";
import {useCheckLoaneeStatusQuery,useViewAllLoanRefferalsQuery} from "@/service/users/Loanee_query";
import dynamic from "next/dynamic";
import SkeletonForGrid from '@/reuseable/Skeleton-loading-state/Skeleton-for-grid';
import {setLoanReferralId} from "@/redux/slice/loan/selected-loan";


const loaneeCardData = [
    {
        title: "Wallet balance", amount: "₦0.00", linkText: "Go to wallet"
    },
    {
        title: "Loan balance", amount: "₦0.00", linkText: "Go to repayment"
    }
];

const LoaneeOverview = dynamic(
    () => Promise.resolve(Loanee),
    {ssr: false}
)

interface LoanReferral {
    id: string;
    loanReferralStatus: string
   
  }

const Loanee = () => {
    const router = useRouter()
    const {data, isLoading,refetch} = useCheckLoaneeStatusQuery({})
    const {data:loanRefferals} = useViewAllLoanRefferalsQuery({})
    const [loanRefferalStatus,setLoanRefferalStatus] = useState("")
     
    useEffect(() => {
        store.dispatch(setIsAdditionalDetailComplete(data?.data?.additionalDetailsCompleted))
        store.dispatch(setIsidentityVerified(data?.data?.identityVerified))

        const viewLoanRefferals = loanRefferals?.data?.body as LoanReferral[] | undefined;
        if(viewLoanRefferals && viewLoanRefferals.length > 0){
            const firstId = viewLoanRefferals[0].id;
            const loanRefferalStatus = viewLoanRefferals[0].loanReferralStatus
            setLoanRefferalStatus(loanRefferalStatus)
            store.dispatch(setLoanReferralId(firstId))
           
        }
        if(loanRefferalStatus === "AUTHORIZED" || data?.data?.identityVerified || data?.data?.additionalDetailsCompleted){
            refetch()
        }
    },[data,loanRefferals,refetch,loanRefferalStatus])


    const handleBannerClick = () => {
        store.dispatch(setCurrentNavbarItem("Verification"))
         store.dispatch(setCurrentNavBottomItem('Verification'))
        if(loanRefferalStatus !== "AUTHORIZED"){
            store.dispatch(setCurrentStep(0))
        }
        else 
        if(!data?.data?.identityVerified){
            store.dispatch(setCurrentStep(1))
        }else if(!data?.data?.additionalDetailsCompleted){
            store.dispatch(setCurrentStep(2))
        }
        router.push("/onboarding")
    }

    return (
        <main id={'OverviewTr'}
              className={` ${inter.className} h-full w-full pt-8 bg-learnSpaceWhite rounded-[8px] md:px-6`}>
               
                   
            { isLoading? <SkeletonForGrid/> :  <div> {!data?.data?.identityVerified || !data?.data?.additionalDetailsCompleted ?
               <div className='pr-2 lg:pr-0'>
                  <button
                onClick={() => {
                    handleBannerClick()
                }}
                className={`${inter500.className} h-16 w-full mb-[20px]   md:p- py-4 px-3 flex gap-2 bg-warning150 border-[0.5px] border-[#F7C164] rounded-[6px]`}>
                <MdOutlineErrorOutline className={'h-[22px] w-[22px] mt-auto mb-auto text-warning650'}/>
                <p className={` ${inter500.className} cursor-pointer mt-auto mb-auto text-warning650  text-[14px] md:text-[14px]`}>
                   {!data?.data?.identityVerified && data?.data?.additionalDetailsCompleted? "Identity verification is not successful, try again." : data?.data?.identityVerified && !data?.data?.additionalDetailsCompleted? "Additional details was not added, add additional detail" : "Identity verification is not successful, try again"}
                </p>
            </button>
               </div>
                : null }
       
            <BalanceCard cardData={loaneeCardData} />
              <div className='h-6 relative bottom-3'>
              <TableEmptyState
                name={'Repayment'}
                icon={
                    <Icon
                    icon="iconoir:hand-cash"
                    height="2.5rem"
                    width="2.5rem"
                    />
                }
                condition={true}
            />
              </div>
             </div>
        }
           
        </main>
    );
};

export default LoaneeOverview;