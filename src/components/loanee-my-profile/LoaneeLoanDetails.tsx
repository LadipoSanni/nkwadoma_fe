import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {inter500, inter} from '@/app/fonts'
import Details from './Details';
import styles from './index.module.css'
// import BasicDetails from "@/components/loanee-my-profile/BasicDetails";
import Document from "@/components/loanee-my-profile/Document";
import {LoaneeDetails} from '@/types/loanee'

interface props {
    data: LoaneeDetails;
}
const LoaneeLoanDetails = ({data}:props ) => {



    return (
        <div id={'loaneeLoanDetails'}
             data-testid={'loaneeLoanDetails'}
             className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] pt-6 pb-6 md:border-r md:border-r-grey-200] `}>
            <Tabs defaultValue={'loanInformation'} className={` pl-3 `}>
                <TabsList className={`grid  ${styles.details} max-w-[100%] w-[100%] sm:w-full lg:w-fit md:w-fit px-0 pb-2 lg:grid-cols-2 grid-cols-4   md:grid-cols-2 `}>
                    <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInformation">Loan information</TabsTrigger>
                    <TabsTrigger id={'document'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A]  md:hidden lg:hidden  flex   data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="document">Document</TabsTrigger>
                </TabsList>
                <div className={` md:max-h-[65vh] w-full  ${styles.container}`}>
                    <TabsContent className={` pr-6 pt-3 grid gap-4`} value="loanInformation">
                        <Details id={'loanAmount'}    maxWidth={'100%'} name={'Loan amount'} value={data?.loanAmount} valueType={'currency'} />
                        <div className={` md:flex md:gap-4  grid gap-4  w-full  `}>
                            <Details id={'amountOutstanding'}    maxWidth={'100%'} name={'Amount outstanding'} value={0} valueType={'currency'} />
                            <Details id={'AmountRepaid'}    maxWidth={'100%'} name={'Amount repaid'} value={data?.loaneeLoanDetail?.amountRepaid} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? data?.interestRate : 0} valueType={'percentage'} />
                            <Details id={'interestIncured'}    maxWidth={'100%'} name={'Interest incurred'} value={0} valueType={'percentage'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details id={'deptPercentage'}    maxWidth={'100%'} name={'Dept percentage'} value={0} valueType={'percentage'} />
                            <Details id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={0} valueType={'percentage'}  />
                        </div>
                    </TabsContent>

                    <TabsContent value={'document'} className={` pr-6 pt-3 grid gap-4`} >
                        <Document/>
                    </TabsContent>
                </div>
            </Tabs>

        </div>
    );
};

export default LoaneeLoanDetails;