import React from 'react';
import {Tabs, TabsList, TabsTrigger, TabsContent} from "@/components/ui/tabs";
import {inter, inter500} from "@/app/fonts";
import Details from "@/components/loanee-my-profile/Details";
import styles from './index.module.css'
import LoaneeRepayment from "@/components/loanee-my-profile/loaneeRepayment";

export interface LoaneeBasicDetails
{
    "firstName": string,
    "lastName": string,
    "amountReceived": number | string,
    "amountPaid": number,
    "amountOutstanding": number,
    "interestRate": number,
    "debtPercentage": number,
    "repaymentPercentage": number,
    "gender": string,
    "dateOfBirth": string,
    "maritalStatus": string,
    "nationality": string,
    "stateOfOrigin": string,
    "stateOfResidence": string,
    "residentialAddress": string,
    "phoneNumber": string,
    "alternateEmail": string,
    "alternatePhoneNumber": string,
    "alternateContactAddress": string,
    "alternateResidenceAddress": string,
    "nextOfKinPhoneNumber": string,
    "nextOfKinFirstName": string,
    "nextOfKinLastName": string,
    "nextOfKinResidentialAddress": string,
    "nextOfKinRelationship": string,
    "highestLevelOfEducation": string,
    "programName": string,
    "organizationName": string,
    amountRepaid: number,
    interestIncurred: string,
}

interface props{
    data?: LoaneeBasicDetails;
    loaneeId:string;
    isLoading: boolean
}

const PmLoaneeLoanDetails = ({data, loaneeId, isLoading}: props) => {


    const nextOfFullName = data?.nextOfKinFirstName + ' ' + data?.nextOfKinLastName

    const basicDetails = [
        {label: 'Gender', value: `${data?.gender ? data?.gender : 'Not provided'}`},
        {label: 'Date of birth', value: `${data?.dateOfBirth ? data?.dateOfBirth : 'Not provided'}`},
        {label: 'Marital status', value: `${data?.maritalStatus ? data?.maritalStatus : 'Not provided'}`},
        {label: 'Nationality', value: `${data?.nationality ? data?.nationality : 'Not provided'}`},
        {label: 'State of origin ', value: `${data?.stateOfOrigin ? data?.stateOfOrigin : 'Not provided'}`},
        {label: 'State of residence', value: `${data?.stateOfResidence ? data?.stateOfResidence : 'Not provided'}`},
        {label: 'Residential address', value: `${data?.residentialAddress ? data?.residentialAddress : 'Not provided'}`},
        {label: 'Phone number', value: `${data?.phoneNumber ? data?.phoneNumber : 'Not provided'}`},
        {label: 'Alternate residential address', value: `${data?.residentialAddress ? data?.residentialAddress : 'Not provided'}`},
        {label: 'Alternate email address', value: `${data?.alternateEmail? data?.alternateEmail : 'Not provided'}`},
        {label: 'Next of kin full name', value: nextOfFullName},
        {label: 'Next of kin phone number', value: `${data?.nextOfKinPhoneNumber ? data?.nextOfKinPhoneNumber : 'Not provided'}`},
        {label: 'Next of kin residential address', value: `${data?.nextOfKinResidentialAddress ? data?.nextOfKinResidentialAddress : 'Not provided'}`},
        {label: 'Next of kin relationship ', value: `${data?.nextOfKinRelationship ? data?.nextOfKinRelationship : 'Not provided'}`},
        {label: 'Highest level of education ', value: `${data?.highestLevelOfEducation ? data?.highestLevelOfEducation : `Not provided`}`},
        {label: 'Institution name ', value: `${data?.organizationName ? data?.organizationName : 'Not provided'}`},
        {label: 'Program of study ', value: `${data?.programName ? data?.programName : 'Not provided'}`},

    ]

    return (
        <div className={`md:max-h-fit md:w-[55%] sm:w-[100%] w-[100%] px-4 pb-6 md:border-r md:border-r-grey-200 `}>
            <Tabs  defaultValue={'loanInfo'}>
              <div className={` py-4 `}>
                  <TabsList className="w-full md:w-fit lg:w-fit ">
                    <div className={`w-full ${styles.container}  flex h-fit `}>
                        <TabsTrigger id={'loanInfo'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="loanInfo">Loan Information</TabsTrigger>
                        <TabsTrigger id={'repayment'} className={`w-fit ${inter.className} text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="repayment">Repayment</TabsTrigger>
                        <TabsTrigger id={'bioDetail'} className={`w-fit ${inter.className} md:hidden lg:hidden flex text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="bioDetails">Bio details</TabsTrigger>
                        <TabsTrigger id={'document'} className={`w-fit ${inter.className} md:hidden lg:hidden flex text-[14px] text-[#6A6B6A] data-[state=active]:text-[#212221] data-[state=active]:border data-[state=active]:border-grey-200 data-[state=active]:${inter500.className} `} value="documents">Documents</TabsTrigger>
                    </div>
                  </TabsList>
              </div>
                <div className={`md:max-h-[55vh]  py-0  grid gap-4 w-full  ${styles.container} `}>
                    <TabsContent value={'loanInfo'} className={` grid gap-3 `}>
                        <Details id={'loanAmount'} isLoading={isLoading} showAsWholeNumber={true}   maxWidth={'100%'} name={'Loan amount'} value={data?.amountReceived} valueType={'currency'} />
                        <div className={` md:flex md:gap-4  grid gap-4  w-full  `}>
                            <Details isLoading={isLoading}  id={'amountOutstanding'}  showAsWholeNumber={true}  maxWidth={'100%'} name={'Amount outstanding'} value={data?.amountOutstanding} valueType={'currency'} />
                            <Details isLoading={isLoading} id={'AmountRepaid'} showAsWholeNumber={true}   maxWidth={'100%'} name={'Amount repaid'} value={data?.amountRepaid} valueType={'currency'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details isLoading={isLoading} id={'interest'}    maxWidth={'100%'} name={'Interest'} value={data?.interestRate ? Math.ceil(data?.interestRate) : 0} valueType={'percentage'} />
                            <Details isLoading={isLoading} id={'interestIncured'}    maxWidth={'100%'} name={'Incurred interest'} value={data?.interestIncurred ?  Math.ceil(Number(data?.interestIncurred)) : 0} valueType={'percentage'}  />
                        </div>
                        <div className={` md:flex md:gap-4 grid gap-4 w-full  `}>
                            <Details isLoading={isLoading} id={'deptPercentage'}    maxWidth={'100%'} name={'Debt percentage'} value={Math.ceil(Number(data?.debtPercentage))} valueType={'percentage'} />
                            <Details isLoading={isLoading} id={'repaymentPercentage'}    maxWidth={'100%'} name={'Repayment percentage'} value={Math.ceil(Number(data?.repaymentPercentage))} valueType={'percentage'}  />
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