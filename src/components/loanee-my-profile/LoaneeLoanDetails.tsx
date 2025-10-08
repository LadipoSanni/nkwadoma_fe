import React from 'react';
import { inter500} from '@/app/fonts'
import Details from './Details';
import styles from './index.module.css'
// import BasicDetails from "@/components/loanee-my-profile/BasicDetails";
// import Document from "@/components/loanee-my-profile/Document";
import {LoaneeDetails} from '@/types/loanee'
// import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
// import LoaneeRepayment from "@/components/loanee-my-profile/loaneeRepayment";
import {getItemSessionStorage} from "@/utils/storage";
import ViewDocument from "@/reuseable/details/ViewDocument";

interface props {
    data: LoaneeDetails;
    isLoading?: boolean;
    loaneeDocs?:  {label:string,value:string }[]

}

const LoaneeLoanDetails = ({data, isLoading,loaneeDocs}:props ) => {


    const userRole  = getItemSessionStorage("user_role")


    const renderLoaneeView = () => {
        return(
            <div className={` grid gap-4 `}>
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
                {/*<div className={` md:flex md:gap-4 grid gap-4 w-full  `}>*/}
                {/*    /!*<Details isLoading={isLoading}  id={'deptPercentage'}    maxWidth={'100%'} name={'Debt percentage'} value={data?.debtPercentage? data?.debtPercentage : 0} valueType={'percentage'} />*!/*/}
                {/*    /!*<Details isLoading={isLoading}  id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={data?.repaymentRate ?data?.repaymentRate : 0} valueType={'percentage'}  />*!/*/}
                {/*</div>*/}


            </div>
        )
    }

    const renderAdminView = () => {
        return(
            <div  className={` grid gap-4 `}>

                 <Details id={'loanAmount'} isLoading={isLoading} showAsWholeNumber={true}   maxWidth={'100%'} name={'Loan amount'} value={data?.amountReceived} valueType={'currency'} />
         <div className={` md:flex md:gap-4  grid gap-4    `}>
             <Details isLoading={isLoading}  id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount outstanding'} value={data?.amountOutstanding} valueType={'currency'} />
             <Details isLoading={isLoading} id={'AmountRepaid'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Amount repaid'} value={data?.amountRepaid} valueType={'currency'}  />
         </div>
         <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
             <Details isLoading={isLoading} id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? data?.interestRate?.toFixed(2) : 0} valueType={'percentage'} />
             <Details isLoading={isLoading} id={'interestIncured'}    maxWidth={'100%'} name={'Incurred interest'} value={data?.interestIncurred ?  Number(data?.interestIncurred)?.toFixed(2) : 0} valueType={'currency'}  />
         </div>
         <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
             <Details isLoading={isLoading} id={'deptPercentage'}    maxWidth={'100%'} name={'Debt percentage'} value={data?.debtPercentage ? Number(data?.debtPercentage)?.toFixed(2) :  "0.00"} valueType={'percentage'} />
             <Details isLoading={isLoading} id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={data?.repaymentPercentage ? Number(data?.repaymentPercentage)?.toFixed(2) : "0.00"} valueType={'percentage'}  />
         </div>
            </div>

        )
    }

    return (
        <div className={`  `}>
            <div id={'loaneeLoanDetails'}
                 data-testid={'loaneeLoanDetails'}
                 className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] px-4 pb-6 md:border-r md:border-r-grey-200] `}>
                <div className={` md:max-h-[60vh]  ${styles.container}   grid gap-4 w-full  `}>
                    <div className={` h-fit py-2 text-[18px] ${inter500.className}   `}>Loan information</div>
                    {userRole === 'LOANEE' ?
                        renderLoaneeView()
                        :
                        renderAdminView()
                    }
                </div>
            </div>
            <div className={` md:max-h-[60vh]  ${styles.container}  `}>
                <div className={` h-fit py-2 text-[18px] ${inter500.className}   `}>Document</div>

                { loaneeDocs?.length  && loaneeDocs?.length > 0 ?
                    <ViewDocument listOfDocument={loaneeDocs}/>
                :
                    <p>No document available</p>
                }
            </div>

        </div>
    );
};

export default LoaneeLoanDetails;