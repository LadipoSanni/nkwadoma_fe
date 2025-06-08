import React from 'react';
import {inter500} from '@/app/fonts'
import Details from './Details';
import styles from './index.module.css'
// import BasicDetails from "@/components/loanee-my-profile/BasicDetails";
import Document from "@/components/loanee-my-profile/Document";
import {LoaneeDetails} from '@/types/loanee'
import {getItemSessionStorage} from "@/utils/storage";

interface props {
    data: LoaneeDetails;
}
const LoaneeLoanDetails = ({data}:props ) => {

    const userRole  = getItemSessionStorage("user_role")


    return (
        <div id={'loaneeLoanDetails'}
             data-testid={'loaneeLoanDetails'}
             className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] px-4 pb-6 md:border-r md:border-r-grey-200] `}>
                <div id={'loanInfo'} className={`w-fit text-[18px] py-4 h-fit   text-[#212221] ${inter500.className} `}>Loan information</div>
                <div className={` ${userRole ===  'LOANEE' ? 'md:max-h-[65vh]' : 'md:max-h-[57vh]'} grid gap-4 w-full  ${styles.container}`}>
                        <Details id={'loanAmount'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Loan amount'} value={data?.loanAmount} valueType={'currency'} />
                        <div className={` md:flex md:gap-4  grid gap-4  w-full  `}>
                            <Details id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount outstanding'} value={0} valueType={'currency'} />
                            <Details id={'AmountRepaid'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Amount repaid'} value={data?.loaneeLoanDetail?.amountRepaid} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? data?.interestRate : 0} valueType={'percentage'} />
                            <Details id={'interestIncured'}    maxWidth={'100%'} name={'Interest incurred'} value={0} valueType={'percentage'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details id={'deptPercentage'}    maxWidth={'100%'} name={'Dept percentage'} value={0} valueType={'percentage'} />
                            <Details id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={0} valueType={'percentage'}  />
                        </div>
                    <div className={` pr-6 flex  pt-3 md:hidden lg:hidden grid gap-4`} >
                        <Document/>
                    </div>
                </div>
        </div>
    );
};

export default LoaneeLoanDetails;