import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {inter500, inter} from '@/app/fonts'
import Details from './Details';
import styles from './index.module.css'
import BasicDetails from "@/components/loanee-my-profile/BasicDetails";
import Document from "@/components/loanee-my-profile/Document";
import {LoaneeDetails} from '@/types/loanee'

interface props {
    data: LoaneeDetails;
}
const LoaneeLoanDetails = ({data}:props ) => {

    const basicData = data?.userIdentity
    const basicDetails = [
        {label: 'Gender', value: `${basicData?.gender ? basicData?.gender : 'Not provided'}`},
        {label: 'Date of birth', value: `${basicData?.dateOfBirth ? basicData?.dateOfBirth : 'Not provided'}`},
        {label: 'Marital status', value: `${basicData?.maritalStatus ? basicData?.maritalStatus : 'Not provided'}`},
        {label: 'Nationality', value: `${basicData?.nationality ? basicData?.nationality : 'Not provided'}`},
        {label: 'State of origin ', value: `${basicData?.stateOfOrigin ? basicData?.stateOfOrigin : 'Not provided'}`},
        {label: 'State of residence', value: `${basicData?.stateOfResidence ? basicData?.stateOfResidence : 'Not provided'}`},
        {label: 'Residential address', value: `${basicData?.residentialAddress ? basicData?.residentialAddress : 'Not provided'}`},
        {label: 'Phone number', value: `${basicData?.phoneNumber ? basicData?.phoneNumber : 'Not provided'}`},
        {label: 'Alternate residential address', value: `${basicData?.residentialAddress ? basicData?.residentialAddress : 'Not provided'}`},
        // {label: 'Alternate email address', value: ''},
        {label: 'Alternate email address', value: `${basicData?.alternateEmail? basicData?.alternateEmail : 'Not provided'}`},
        {label: 'Next of kin full name', value: `${basicData?.nextOfKinResponse}`},
        {label: 'Next of kin phone number', value: ''},
        {label: 'Next of kin residential address', value: ''},
        {label: 'Next of kin relationship ', value: ''},
        {label: 'Highest level of education ', value: ''},
        {label: 'Institution name ', value: data?.institutionName},
        {label: 'Program of study ', value: data?.programOfStudy},

    ]


    return (
        <div id={'loaneeLoanDetails'}
             data-testid={'loaneeLoanDetails'}
             className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] pt-6 pb-6 md:border-r md:border-r-grey-200] `}>
            <Tabs defaultValue={'loanInformation'} className={` pl-3 `}>
                <TabsList className={`grid  ${styles.details} max-w-[100%] w-[100%] sm:w-full lg:w-fit md:w-fit px-0 pb-2 lg:grid-cols-2 grid-cols-4   md:grid-cols-2 `}>
                    <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInformation">Loan information</TabsTrigger>
                    <TabsTrigger id={'loanProducte'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanProduct">Loan product</TabsTrigger>
                    <TabsTrigger id={'bioDetails'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] md:hidden lg:hidden  flex data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="bioInfo">Bio details</TabsTrigger>
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
                    <TabsContent value={'loanProduct'} className={` pr-6 pt-3 grid gap-4`} >
                        <div className={` md:flex md:gap-4 gap-4 grid w-full  `}>
                            <Details id={'amountRepaid'}    maxWidth={'100%'} name={'Amount repaid'}     value={data?.loaneeLoanDetail?.amountRepaid} valueType={'currency'} />
                            <Details id={'amountApproved'}    maxWidth={'100%'} name={'Amount approved'} value={0} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4   w-full  `}>
                            <Details id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? data?.interestRate : 0} valueType={'percentage'} />
                            <Details id={'Tenor'}    maxWidth={'100%'} name={'Tenor'} value={data?.tenor} valueType={'tenor'}  />
                        </div>
                        <Details id={'moratoriumPeriod'}    maxWidth={'50%'} name={'Moratorium period'} value={0} valueType={'tenor'}  />
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