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
        <div className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] px-4 pb-6 md:border-r md:border-r-grey-200 `}>
            <Tabs  defaultValue={'loanInfo'}>
              <div className={` py-4 `}>
                  <TabsList className="grid w-fit px-0 md:grid-cols-2 lg:grid-cols-2   grid-cols-4">
                      <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInfo">Loan Information</TabsTrigger>
                      <TabsTrigger id={'repayment'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="repayment">Repayment</TabsTrigger>
                      <TabsTrigger id={'bioDetail'} className={`w-fit ${inter.className} md:hidden lg:hidden flex text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="bioDetails">Bio details</TabsTrigger>
                      <TabsTrigger id={'document'} className={`w-fit ${inter.className} md:hidden lg:hidden flex text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="documents">Documents</TabsTrigger>
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
                        <TabsContent value={'bioDetails'} className={` md:w-full flex lg:hidden md:hidden pt-3 w-full   `}>
                            <div className={` bg-grey105 ${isLoading ? 'animate-pulse ' : ''}  w-full rounded-md  `}>
                                {basicDetails?.map((item, index) => (
                                    <li key={"key" + index} className={'p-4  grid gap-9 rounded-md'}>
                                        <div
                                            className={`md:flex md:justify-between ${isLoading ? 'animate-pulse hidden ' : ''}  md:items-center md:gap-0 grid gap-3 `}>
                                            <div
                                                id={'name:'+item.label}
                                                className={` ${isLoading ? 'animate-pulse hidden ' : ''}  ${inter.className} break-all md:max-w-[40%] text-black300 text-[14px] `}>{item.label}</div>
                                            <div
                                                id={'name:'+item.value}
                                                className={` ${isLoading ? 'animate-pulse hidden ' : ''}  ${inter.className} break-all md:max-w-[50%]   text-black500 text-[14px] `}> {item.value ? item.value : 'Not provided'}</div>
                                        </div>
                                    </li>
                                ))
                                }
                            </div>
                        </TabsContent>
                    <TabsContent value={'documents'} className={` grid md:flex pt-3 gap-5  w-full  md:flex-col-2  `}>
                        {/*<Document/>*/}
                        <div className={` w-fit justify-self-center`}>No Document available</div>
                    </TabsContent>
                </div>
            </Tabs>


        </div>
    );
};

export default PmLoaneeLoanDetails;