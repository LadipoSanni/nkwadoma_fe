import React from 'react';
import {inter, inter500} from '@/app/fonts'
import Details from './Details';
import styles from './index.module.css'
// import BasicDetails from "@/components/loanee-my-profile/BasicDetails";
import Document from "@/components/loanee-my-profile/Document";
import {LoaneeDetails} from '@/types/loanee'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LoaneeRepayment from "@/components/loanee-my-profile/loaneeRepayment";

interface props {
    data: LoaneeDetails;
    isLoading?: boolean;
}
const LoaneeLoanDetails = ({data, isLoading}:props ) => {



    return (
        <div id={'loaneeLoanDetails'}
             data-testid={'loaneeLoanDetails'}
             className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] px-4 pb-6 md:border-r md:border-r-grey-200] `}>

             <Tabs defaultValue={'loanInfo'}>
                 <div className={` py-4 `}>
                     <TabsList className="grid w-fit px-0 md:grid-cols-2 lg:grid-cols-2   grid-cols-4">
                         <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInfo">Loan Information</TabsTrigger>
                         <TabsTrigger id={'repayment'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="repayment">Repayment</TabsTrigger>
                    </TabsList>
                 </div>
                <div className={`  md:max-h-[60vh]  grid gap-4 w-full  ${styles.container}`}>
                     <TabsContent value={'loanInfo'} className={` grid gap-3 `}>
                         <Details isLoading={isLoading} id={'loanAmount'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Loan amount'} value={data?.loanAmountApproved ? data?.loanAmountApproved : 0} valueType={'currency'} />
                         <div className={` md:flex md:gap-4  grid gap-4  w-full  `}>
                             <Details isLoading={isLoading} id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount outstanding'} value={data?.loanAmountOutstanding ? data?.loanAmountOutstanding : 0} valueType={'currency'} />
                             <Details isLoading={isLoading} id={'AmountRepaid'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Amount repaid'} value={data?.loanAmountRepaid ? data?.loanAmountRepaid : 0} valueType={'currency'}  />
                         </div>
                         <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                             <Details isLoading={isLoading} id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? data?.interestRate?.toFixed(2) : 0 } valueType={'percentage'} />
                             {/*<Details isLoading={isLoading}  id={'interestIncured'}    maxWidth={'100%'} name={'Interest incurred'} value={data?.interestIncurred ?data?.interestIncurred : 0} valueType={'percentage'}  />*/}
                             <Details isLoading={isLoading}  id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={data?.repaymentRate ?data?.repaymentRate?.toFixed(2) : 0} valueType={'percentage'}  />

                         </div>
                         <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                             {/*<Details isLoading={isLoading}  id={'deptPercentage'}    maxWidth={'100%'} name={'Debt percentage'} value={data?.debtPercentage? data?.debtPercentage : 0} valueType={'percentage'} />*/}
                             {/*<Details isLoading={isLoading}  id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={data?.repaymentRate ?data?.repaymentRate : 0} valueType={'percentage'}  />*/}
                         </div>
                         <div className={` pr-6 hidden  pt-3 md:hidden lg:hidden  gap-4`} >
                             <Document/>
                         </div>
                     </TabsContent>
                    <TabsContent value={'repayment'}>
                        <LoaneeRepayment loaneeId={data?.id}/>
                    </TabsContent>
                </div>
             </Tabs>

        </div>
    );
};

export default LoaneeLoanDetails;