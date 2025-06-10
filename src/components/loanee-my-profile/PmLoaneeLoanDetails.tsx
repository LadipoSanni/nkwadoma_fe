import React from 'react';
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, inter500} from "@/app/fonts";
import Details from "@/components/loanee-my-profile/Details";
import styles from './index.module.css'
import LoaneeRepayment from "@/components/loanee-my-profile/loaneeRepayment";
import {LoaneeDetails} from "@/types/loanee";


interface props{
    data?: LoaneeDetails;
    loaneeId:string;
    isLoading: boolean
}

const PmLoaneeLoanDetails = ({data, loaneeId, isLoading}: props) => {




    return (
        <div className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] px-4 pb-6 md:border-r md:border-r-grey-200 `}>
            <Tabs  defaultValue={'loanInfo'}>
              <div className={` py-4 `}>
                  <TabsList className="grid w-fit px-0   grid-cols-2">
                      <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInfo">Loan Information</TabsTrigger>
                      <TabsTrigger id={'repayment'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="repayment">Repayment</TabsTrigger>
                  </TabsList>
              </div>
                <div className={`md:max-h-[55vh]  grid gap-4 w-full  ${styles.container} `}>
                    <TabsContent value={'loanInfo'} className={` grid gap-3 `}>
                        <Details id={'loanAmount'} isLoading={isLoading} showAsWholeNumber={true}   maxWidth={'100%'} name={'Loan amount'} value={data?.loanAmount} valueType={'currency'} />
                        <div className={` md:flex md:gap-4  grid gap-4  w-full  `}>
                            <Details isLoading={isLoading}  id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount outstanding'} value={data?.loaneeLoanDetail?.amountOutstanding} valueType={'currency'} />
                            <Details isLoading={isLoading} id={'AmountRepaid'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Amount repaid'} value={data?.loaneeLoanDetail?.amountRepaid} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details isLoading={isLoading} id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? data?.interestRate : 0} valueType={'percentage'} />
                            <Details isLoading={isLoading} id={'interestIncured'}    maxWidth={'100%'} name={'Interest incurred'} value={0} valueType={'percentage'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details isLoading={isLoading} id={'deptPercentage'}    maxWidth={'100%'} name={'Dept percentage'} value={0} valueType={'percentage'} />
                            <Details isLoading={isLoading} id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={0} valueType={'percentage'}  />
                        </div>
                    </TabsContent>
                    <TabsContent className={'  py-0 h-full  '} value={'repayment'}>
                        <LoaneeRepayment loaneeId={loaneeId}/>
                    </TabsContent>
                </div>
            </Tabs>


        </div>
    );
};

export default PmLoaneeLoanDetails;