"use client"
import React, {useState} from "react";
import {useGetLoanProductDetailsByIdQuery} from "@/service/admin/loan_product";
import {useAppSelector} from "@/redux/store";
import style from "@/components/portfolio-manager/organization/index.module.css"
import Detail from "@/components/loanee-my-profile/Details";
import BasicDetailTab from "@/reuseable/details/BasicDetailTab";
import BasicDetail from "@/reuseable/details/BasicDetail";
import ViewDocument from "@/reuseable/details/ViewDocument";

const Details = () => {

    const loanProductId = useAppSelector(state => (state?.loanProduct?.loanProductId))

    const {data: loanProduct, isLoading: loading} = useGetLoanProductDetailsByIdQuery({loanProductId: loanProductId})


    const dataList = [
        {label: "Fund product", value: loanProduct?.data.investmentVehicleName || ''},
        {label: "Product sponsor", value: loanProduct?.data.sponsor || ''},
        {label: "Bank partner", value: loanProduct?.data.bankPartner || ''},
        {label: 'Credit life insurance provider', value: loanProduct?.data?.CreditLifeInsuranceProvider},
        {label: "Health insurance provider", value: loanProduct?.data?.healthInsuranceProvider},
        {label: "Accomodation provider", value: loanProduct?.data.accomodaationProvider},
        {label: "Device provider", value: loanProduct?.data.deviceProvider},
    ];

    const documentData = [
        {label:"Mandate",value:loanProduct?.data?.mandate },
        {label:"Loan terms and condition",value:loanProduct?.data?.termsAndCondition},
        {label:"Loan disbursement terms",value:loanProduct?.data?.disbursementTerms }
    ]

    const tabData = [
        {
        value: "basicDetails",
        name: "Basic details",
        component: <div className={`px-2 ${style.detailContainer} max-h-[56vh] `}>
              <BasicDetail dataList={dataList} isLoading={loading}/>
                </div>
       },
       {
        value: "documents",
        name: "Documents",
        component: <div className={`px-2 relative top-3 ${style.detailContainer} max-h-[56vh] `}>
               <ViewDocument listOfDocument={documentData}/>
                 </div>
       }
]


    return (
        <div className='md:flex h-full mt-3'>
        <div className={` md:w-[62%] md:border-r md:border-r-gray-200 pr-4`}>
        <div className={`max-h-[62vh] ${style.loanDetailContainer}`}>
         <div  className='grid grid-cols-1 gap-y-5 mt-2'>
         <Detail  isLoading={loading}  id={'loanProductSize'}  showAsWholeNumber={false}  maxWidth={'100%'} name={'Loan product size'} value={loanProduct?.data?.loanProductSize} valueType={'currency'} className='w-full' />
         <Detail  isLoading={loading}  id={'amountAvailable'}  showAsWholeNumber={false}  maxWidth={'100%'} name={'Amount available'} value={loanProduct?.data?.totalAmountAvailable} valueType={'currency'} className='w-full' />
         <Detail isLoading={loading}  id={'disbursedAmount'}    maxWidth={'100%'} name={'Disbursed amount'} value={loanProduct?.data?.totalAmountDisbursed} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'outstandingLoan'}    maxWidth={'100%'} name={'Outstanding loan'} value={loanProduct?.data?.totalOutstandingLoan} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'amountRepaid'}    maxWidth={'100%'} name={'Amount repaid'} value={loanProduct?.data?.totalAmountRepaid} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'amountEarned'}    maxWidth={'100%'} name={'Amount earned'} value={loanProduct?.data?.totalAmountEarned} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'obligorLimit'}    maxWidth={'100%'} name={'Obligor limit'} value={loanProduct?.data?.obligorLoanLimit} valueType={'currency'} className='w-full'/>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-4'>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'costOfFund'}   maxWidth={'100%'} name={'Cost of fund'} value={Number(loanProduct?.data?.costOfFund)?.toFixed(2) || '0.00' } valueType={'percentage'}  className='w-full'/>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'interestRate'}   maxWidth={'100%'} name={'Interest rate'} value={Number(loanProduct?.data?.interestRate)?.toFixed(2) || '0.00' } valueType={'percentage'}  className='w-full'/>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-4'>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'costOfFund'}   maxWidth={'100%'} name={'Tenor'} value={loanProduct?.data?.tenor} valueType={'tenor'}   className='w-full'/>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'interestRate'}   maxWidth={'100%'} name={'Moratorium'} value={loanProduct?.data?.interestRate } valueType={'tenor'}  className='w-full'/>
         </div>
         </div>
        </div>
        </div>

        <div className='md:w-[38%] md:pl-2 mt-6 md:mt-2 mb-5 md:mb-0'>
           <BasicDetailTab
            tabData={tabData}
            defaultTabValue="basicDetails"
           />
        </div>
        </div>
    );
}

export default Details;