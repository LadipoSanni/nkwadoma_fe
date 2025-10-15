"use client"
import React,{useEffect} from "react";
import {useGetLoanProductDetailsByIdQuery} from "@/service/admin/loan_product";
import {useAppSelector,store} from "@/redux/store";
import style from "@/components/portfolio-manager/organization/index.module.css"
import Detail from "@/components/loanee-my-profile/Details";
import BasicDetailTab from "@/reuseable/details/BasicDetailTab";
import BasicDetail from "@/reuseable/details/BasicDetail";
import ViewDocument from "@/reuseable/details/ViewDocument";
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import { setLoanProductField,setLoanProductFieldStepTwo,setTotalNumberOfLoanees,setLoanProductName,setFundroductId} from "@/redux/slice/loan-product/Loan-product";
import { setFundProductAvailableAmount } from "@/redux/slice/loan/selected-loan";
import {useGetInvestmentVehicleDetailQuery} from '@/service/admin/fund_query';
import { formatAmount } from "@/utils/Format";

const Details = () => {

    const loanProductId = useAppSelector(state => (state?.loanProduct?.loanProductId))

    const {data: loanProduct, isLoading: loading} = useGetLoanProductDetailsByIdQuery({loanProductId: loanProductId},{refetchOnMountOrArgChange: true})

    const {data} = useGetInvestmentVehicleDetailQuery({id: loanProduct?.data?.investmentVehicleId }, {skip: !loanProduct?.data?.investmentVehicleId ,refetchOnMountOrArgChange: !loanProduct?.data?.investmentVehicleId? false : true});

    // const getVendorByProductType = (vendors: string, productType: string) => {
    //     if (!vendors || !Array.isArray(vendors)) return 'Not provided';
        
    //     const vendor = vendors.find(v => v.product === productType);
    //     return vendor ? vendor.vendorName : 'Not provided';
    //   };

    const renderVendors = (vendors: Array<{vendorName: string; providerServices: string[],costOfService: number, duration: number}>) => {
      if (!vendors || !Array.isArray(vendors) || vendors.length === 0) {
          return 'Not provided';
      }
      
      return (
          <div className="space-y-5">
              {vendors.map((vendor, index) => (
                  <div key={index} className="flex flex-col border-b-[1px] border-solid pb-2">
                      <span className="text-sm text-[#4D4E4D]"> <span className="font-medium text-black">Provider: </span>{capitalizeFirstLetters(vendor.vendorName)}</span>
                      {vendor.providerServices && vendor.providerServices.length > 0 && (
                          <span className="text-sm text-[#4D4E4D] mt-1">
                            <span className="font-medium text-black"> Service:</span>  {vendor.providerServices.map(service => capitalizeFirstLetters(service)).join(', ')}
                          </span>
                      )}
                      <span className="text-sm text-[#4D4E4D] mt-1"> <span className="font-medium text-black">Cost of service: </span>{formatAmount(vendor?.costOfService)}</span> 
                      <span className="text-sm mt-1 text-[#4D4E4D]"> <span className="font-medium text-black">Duration: </span>{vendor?.duration}</span>

                  </div>
              ))}
          </div>
      );
  };


      useEffect(() => {
        const loanProductDetails = {
          productName:  loanProduct?.data?.name,
          investmentVehicleId:loanProduct?.data?.investmentVehicleId ,
          costOfFunds:loanProduct?.data?.costOfFund ,
          tenor: loanProduct?.data?.tenor,
          loanProductSize: loanProduct?.data?.loanProductSize ,
          minimumRepaymentAmount: loanProduct?.data?.minRepaymentAmount ,
          moratorium:loanProduct?.data?.moratorium ,
          interest: loanProduct?.data?.interestRate,
          obligorLimit:loanProduct?.data?.obligorLoanLimit,
          loanProductMandate: loanProduct?.data?.mandate,
          loanProductTermsAndCondition: loanProduct?.data?.termsAndCondition,
          sponsors: loanProduct?.data?.sponsors,
          fundProduct: loanProduct?.data?.investmentVehicleName,
          id: loanProduct?.data?.id
        }

        const basicDetails = {
          bankPartner: loanProduct?.data?.bankPartner,
          vendor: loanProduct?.data?.vendors,
          disbursementTerms: loanProduct?.data?.disbursementTerms
        }
         store.dispatch(setLoanProductField(loanProductDetails))
         store.dispatch(setLoanProductFieldStepTwo(basicDetails))
         store.dispatch(setTotalNumberOfLoanees(loanProduct?.data?.totalNumberOfLoanee))
         store.dispatch(setFundProductAvailableAmount(data?.data?.totalAvailableAmount))
         store.dispatch(setLoanProductName(loanProduct?.data?.name))
         store.dispatch(setFundroductId(loanProduct?.data?.investmentVehicleId))
      },[loanProduct,data])


    const dataList = [
        {label: "Fund product", value: loanProduct?.data.investmentVehicleName || ''},
        {
            label: "Product sponsors", 
            value: loanProduct?.data.sponsors && loanProduct.data.sponsors.length > 0 
              ? loanProduct.data.sponsors.map((sponsor: { name: string; }) => capitalizeFirstLetters(sponsor.name)).join(', ')
              : 'Not provided'
          },
        {label: "Bank partner", value: loanProduct?.data.bankPartner || ''},
        {
          label: "Service providers", 
          value: renderVendors(loanProduct?.data.vendors)
      }
       
    ];

    const documentData = [
        {label:"Mandate",value:loanProduct?.data?.mandate },
        {label:"Loan terms and condition",value:loanProduct?.data?.termsAndCondition},
        // {label:"Loan disbursement terms",value:loanProduct?.data?.disbursementTerms }
    ]

    const tabData = [
        {
        value: "basicDetails",
        name: "Basic details",
        component: <div className={`px-2 ${style.detailContainer} max-h-[52vh] `}>
              <div className="mb-8">
              <BasicDetail dataList={dataList} isLoading={loading}/>
              </div>
                </div>
       },
       {
        value: "documents",
        name: "Documents",
        component: <div className={`px-2 relative top-3 ${style.detailContainer} max-h-[52vh] `}>
               <div className="mb-8">
               <ViewDocument listOfDocument={documentData}/>
               </div>
                 </div>
       }
]


    return (
        <div className='md:flex h-full mt-3 mb-4'>
        <div className={` md:w-[62%] md:border-r md:border-r-gray-200 pr-4 mb-7`}>
        <div className={`max-h-[62vh] ${style.loanDetailContainer}`}>
         <div  className='grid grid-cols-1 gap-y-5 mt-2'>
         <Detail  isLoading={loading}  id={'loanProductSize'}  showAsWholeNumber={false}  maxWidth={'100%'} name={'Loan product size'} value={loanProduct?.data?.loanProductSize} valueType={'currency'} className='w-full' />
         <Detail  isLoading={loading}  id={'amountAvailable'}  showAsWholeNumber={false}  maxWidth={'100%'} name={'Amount available'} value={loanProduct?.data?.totalAmountAvailable} valueType={'currency'} className='w-full' />
         <Detail isLoading={loading}  id={'disbursedAmount'}    maxWidth={'100%'} name={'Disbursed amount'} value={loanProduct?.data?.totalAmountDisbursed} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'outstandingLoan'}    maxWidth={'100%'} name={'Outstanding loan'} value={loanProduct?.data?.totalOutstandingLoan} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'amountRepaid'}    maxWidth={'100%'} name={'Amount repaid'} value={loanProduct?.data?.totalAmountRepaid} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'amountEarned'}    maxWidth={'100%'} name={'Amount earned'} value={loanProduct?.data?.totalAmountEarned} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading}  id={'obligorLimit'}    maxWidth={'100%'} name={'Obligor limit'} value={loanProduct?.data?.obligorLoanLimit} valueType={'currency'} className='w-full'/>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'beneficiaries'}   maxWidth={'100%'} name={'Total number of beneficiaries'} value={loanProduct?.data?.totalNumberOfLoanee } valueType={'digit'}  className='w-full'/>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-4'>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'costOfFund'}   maxWidth={'100%'} name={'Cost of fund'} value={Number(loanProduct?.data?.costOfFund)?.toFixed(2) || '0.00' } valueType={'percentage'}  className='w-full'/>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'interestRate'}   maxWidth={'100%'} name={'Interest rate'} value={Number(loanProduct?.data?.interestRate)?.toFixed(2) || '0.00' } valueType={'percentage'}  className='w-full'/>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-4'>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'costOfFund'}   maxWidth={'100%'} name={'Tenor'} value={loanProduct?.data?.tenor} valueType={'tenor'}   className='w-full'/>
         <Detail isLoading={loading} showAsWholeNumber={true}  id={'moratorium'}   maxWidth={'100%'} name={'Moratorium'} value={loanProduct?.data?.moratorium } valueType={'tenor'}  className='w-full'/>
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