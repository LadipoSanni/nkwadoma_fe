import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {inter500, inter} from '@/app/fonts'
import Details from './Details';
import styles from './index.module.css'
import BasicDetails from "@/components/loanee-my-profile/BasicDetails";
import Document from "@/components/loanee-my-profile/Document";

const LoaneeLoanDetails = () => {

    const basicDetails = [
        {label: 'Gender', value: ''},
        {label: 'Date of birth', value: ''},
        {label: 'Marital status', value: ''},
        {label: 'Nationality', value: ''},
        {label: 'State of origin ', value: ''},
        {label: 'State of residence', value: ''},
        {label: 'Residential address', value: ''},
        {label: 'Phone number', value: ''},
        {label: 'Alternate residential address', value: ''},
        {label: 'Alternate email address', value: ''},
        {label: 'Alternate email address', value: ''},
        {label: 'Next of kin full name', value: ''},
        {label: 'Next of kin phone number', value: ''},
        {label: 'Next of kin residential address', value: ''},
        {label: 'Next of kin relationship ', value: ''},
        {label: 'Highest level of education ', value: ''},
        {label: 'Institution name ', value: ''},
        {label: 'Program of study ', value: ''},

    ]


    return (
        <div id={'loaneeLoanDetails'}
             data-testid={'loaneeLoanDetails'}
             className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] pt-6 pb-6 md:border-r md:border-r-grey-200] `}>
            <Tabs defaultValue={'loanInformation'} className={` pl-3 `}>
                <TabsList className="grid w-fit px-0 pb-2 lg:grid-cols-2 grid-cols-4   md:grid-cols-2 ">
                    <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInformation">Loan information</TabsTrigger>
                    <TabsTrigger id={'loanProducte'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanProduct">Loan product</TabsTrigger>
                    <TabsTrigger id={'bioDetails'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] md:hidden lg:hidden  flex data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="bioInfo">Bio details</TabsTrigger>
                    <TabsTrigger id={'document'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A]  md:hidden lg:hidden  flex   data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="document">Document</TabsTrigger>
                </TabsList>
                <div className={` md:max-h-[65vh] w-full  ${styles.container}`}>
                    <TabsContent className={` pr-6 pt-3 grid gap-4`} value="loanInformation">
                        <Details id={'loanAmount'}    maxWidth={'100%'} name={'Loan amount'} value={20000} valueType={'currency'} />
                        <div className={` md:flex md:gap-4  grid gap-4  w-full  `}>
                            <Details id={'amountOutstanding'}    maxWidth={'100%'} name={'Amount outstanding'} value={20000} valueType={'currency'} />
                            <Details id={'AmountRepaid'}    maxWidth={'100%'} name={'Amount repaid'} value={20000} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={20} valueType={'percentage'} />
                            <Details id={'interestIncured'}    maxWidth={'100%'} name={'Interest incurred'} value={40} valueType={'percentage'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details id={'deptPercentage'}    maxWidth={'100%'} name={'Dept percentage'} value={20} valueType={'percentage'} />
                            <Details id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={40} valueType={'percentage'}  />
                        </div>
                    </TabsContent>
                    <TabsContent value={'loanProduct'} className={` pr-6 pt-3 grid gap-4`} >
                        <div className={` md:flex md:gap-4 gap-4 grid w-full  `}>
                            <Details id={'amountRepaid'}    maxWidth={'100%'} name={'Amount repaid'}     value={111178988987898881} valueType={'currency'} />
                            <Details id={'amountApproved'}    maxWidth={'100%'} name={'Amount approved'} value={403348788888946677} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4   w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={20} valueType={'percentage'} />
                            <Details id={'Tenor'}    maxWidth={'100%'} name={'Tenor'} value={72} valueType={'tenor'}  />
                        </div>
                        <Details id={'moratoriumPeriod'}    maxWidth={'50%'} name={'Moratorium period'} value={72} valueType={'tenor'}  />
                    </TabsContent>
                    <TabsContent value={'bioInfo'} className={` pr-6 pt-3 grid gap-4`} >
                        <BasicDetails basicDetails={basicDetails}/>
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