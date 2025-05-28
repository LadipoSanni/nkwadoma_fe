import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {inter500, inter} from '@/app/fonts'
import PerformanceCard from "@/reuseable/cards/perfomance-card/performanceCard";
import Details from './Details';
import styles from './index.module.css'
// import {formateDigits} from "@/utils/Format";

const LoaneeLoanDetails = () => {
    return (
        <div id={'loaneeLoanDetails'}
             data-testid={'loaneeLoanDetails'}
             className={`md:h-[74vh] md:w-[60%] sm:w-full w-full md:border-r md:border-r-grey-200] `}>
            <Tabs defaultValue={'loanInformation'} className={`pt-6 pl-3 `}>
                <TabsList className="grid w-fit px-0 pb-2  grid-cols-2">
                    <TabsTrigger className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInformation">Loan information</TabsTrigger>
                    <TabsTrigger className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanProduct">Loan product</TabsTrigger>
                </TabsList>
                <div className={` max-h-[65vh] ${styles.container}`}>
                    <TabsContent className={` pr-6 pt-3 grid gap-4`} value="loanInformation">
                        <PerformanceCard id={'loanAmount'}  isSmall={false} showContainerBorder={true} percentage={'0'} showPerformancePercentage={false} maxWidth={'100%'} title={'Loan amount'} value={20000} isFigure={false} isValueInPercentage={false} showMonthPick={false} didValueIncrease={true}/>
                        <div className={` md:flex md:gap-2  grid gap-4  w-full  `}>
                            <Details id={'amountOutstanding'}    maxWidth={'100%'} name={'Amount outstanding'} value={20000} valueType={'currency'} />
                            <Details id={'AmountRepaid'}    maxWidth={'100%'} name={'Amount repaid'} value={20000} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-2 grid gap-4 w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={20} valueType={'percentage'} />
                            <Details id={'interestIncured'}    maxWidth={'100%'} name={'Interest incurred'} value={40} valueType={'percentage'}  />
                        </div>
                        <div className={` md:flex md:gap-2 grid gap-4 w-full  `}>
                            <Details id={'deptPercentage'}    maxWidth={'100%'} name={'Dept percentage'} value={20} valueType={'percentage'} />
                            <Details id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={40} valueType={'percentage'}  />
                        </div>
                    </TabsContent>
                    <TabsContent value={'loanProduct'} className={` pr-6 pt-3 grid gap-4`} >
                        <div className={` md:flex md:gap-2 gap-4 grid w-full  `}>
                            <Details id={'amountRepaid'}    maxWidth={'100%'} name={'Amount repaid'} value={11111} valueType={'currency'} />
                            <Details id={'amountApproved'}    maxWidth={'100%'} name={'Amount approved'} value={4033494} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-2 grid gap-4   w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={20} valueType={'percentage'} />
                            <Details id={'Tenor'}    maxWidth={'100%'} name={'Tenor'} value={72} valueType={'tenor'}  />
                        </div>
                        <Details id={'moratoriumPeriod'}    maxWidth={'50%'} name={'Moratorium period'} value={72} valueType={'tenor'}  />

                    </TabsContent>
                </div>
            </Tabs>

        </div>
    );
};

export default LoaneeLoanDetails;