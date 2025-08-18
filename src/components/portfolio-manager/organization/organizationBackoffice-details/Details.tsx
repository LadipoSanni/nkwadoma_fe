'use client'
import React from 'react';
import style from "../index.module.css";
import Details from "@/components/loanee-my-profile/Details";
import { inter } from '@/app/fonts';
import {useGetDetailsOfOrganizationQuery} from "@/service/admin/organization";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { ensureHttpsUrl } from "@/utils/GlobalMethods";
import { formatNumberWithCommas } from '@/utils/Format';
import SkeletonForSidebar from '@/reuseable/Skeleton-loading-state/Skeleton-for-sidebar';

function Detail() {
      const {data:organizationDetails, isLoading} = useGetDetailsOfOrganizationQuery({})
       const organizationLink = ensureHttpsUrl(organizationDetails?.data.websiteAddress);

    const dataList = [
     { label: "Website", value: organizationLink || "Not provided" },
        { label: "Phone number", value: organizationDetails?.data.phoneNumber },
        {
          label: "Status",
          value: (
            <span
              id="status"
              className={`rounded-[32px] h-[21px]  flex items-center justify-center ${
                organizationDetails?.data.activationStatus === "ACTIVE"
                  ? "bg-[#E7F5EC] text-[#063F1A] w-16"
                  : organizationDetails?.data.activationStatus === "DECLINED" ||  organizationDetails?.data.activationStatus === "DEACTIVATED"? " bg-[#FBE9E9] text-[#971B17] w-24" : "bg-[#FEF6E8] text-[#66440A] w-16"
              }`}
            >
              {capitalizeFirstLetters(organizationDetails?.data.activationStatus?.toLowerCase())}
            </span>
          ),
        },
        {
          label: "Address",
          value: organizationDetails?.data.address || "Not provided",
        },
        {
          label: "Number of programs",
          value:  formatNumberWithCommas(organizationDetails?.data.numberOfPrograms),
        },
        { label: "Number of cohorts", value: formatNumberWithCommas(organizationDetails?.data.numberOfCohort) },
        {
          label: "Number of loanees",
          value: formatNumberWithCommas(organizationDetails?.data.numberOfLoanees),
        },
        { label: "Still in training", value: formatNumberWithCommas(organizationDetails?.data?.stillInTraining) },
      ];

return (
 <div className='md:flex h-full'>
  
   <div className={` md:w-[62%] md:border-r md:border-r-gray-200 pr-4`}>
     <p className={`text-[16px mb-2 mt-[1] ${inter.className}`}>Loan details</p>
      <div className={`${style.orgDetailContainer}`}>
      <div className='grid grid-cols-1 gap-y-5 mt-2'>
     <Details isLoading={isLoading}  id={'historicalDebt'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Historical debt'} value={organizationDetails?.data.totalAmountReceived} valueType={'currency'} className='w-full'/>
     <Details isLoading={isLoading}  id={'amountRepaid '}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount repaid '} value={organizationDetails?.data.totalDebtRepaid} valueType={'currency'}  className='w-full'/>
     <Details isLoading={isLoading}  id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount outstanding'} value={organizationDetails?.data?.totalCurrentDebt} valueType={'currency'}  className='w-full'/>
     <Details isLoading={isLoading}  id={'repaymentRate'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Repayment rate'} value={organizationDetails?.data?.repaymentRate?.toFixed(2)} valueType={'percentage'}  className='w-full'/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-4'>
      <Details isLoading={isLoading}  id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Total loan requests'} value={organizationDetails?.data?.loanRequestCount} valueType={'digit'}  className='w-full'/>
      <Details isLoading={isLoading}  id={'totalPendingOffers'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Total pending offers'} value={organizationDetails?.data?.pendingLoanOfferCount} valueType={'digit'}  className='w-full'/>
      </div>
     </div>
      </div>
   </div>
   <div className='md:w-[38%] flex items-start pl-4 mt-5 md:mt-0 mb-5 md:mb-0'>
   <div>
   <p className={`text-[16px mb-2 mt-[1] ${inter.className}`}> Organization details</p>
     
    { isLoading? <div><SkeletonForSidebar/></div> 
    : <div className={`grid grid-cols-1 gap-y-5 mt-4 ${style.orgDetailContainer}  ${inter.className}`}>
    {dataList?.map((item, index) => (
<div 
 id={`data-item-${index}`} 
 data-testid={`data-item-${index}`}
 key={index}
 className="font-medium text-sm grid grid-cols-1 gap-y-2"
>
 <div className="text-black300">
   <span className={`text-[14px] ${inter.className}`}>{item.label}</span>
 </div>
 <div className="text-meedlBlack">
   {item.label === "Website" && organizationDetails?.data.websiteAddress !== "" ? (
     <a
       href={organizationLink}
       target="_blank"
       rel="noopener noreferrer"
       className="text-meedlBlue text-[14px] font-medium leading-[150%] underline"
     >
       {organizationDetails?.data.websiteAddress}
     </a>
   ) : (
     <span className={`text-[14px] ${inter.className}`}>
       {item.value}
     </span>
   )}
 </div>
</div>
))}
 </div> }
     </div>
   </div>
 </div>
);
}

export default Detail
