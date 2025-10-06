'use client'
import Details from '@/components/loanee-my-profile/Details';
import React from 'react';
import styles from '@/components/loanee-my-profile/index.module.css'
import {inter500} from '@/app/fonts';
import {useAppSelector} from "@/redux/store";
import {useGetCohortDetailsBreakdownQuery, useViewCohortDetailsQuery} from "@/service/admin/cohort_query";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {CohortItems} from "@/types/loan/loan-request.type";
import QuillRenderer from '@/components/RenderDangerousHtml';



const DetailsComponent = () => {
    const cohortId = useAppSelector(store => store?.cohort?.setCohortId)
    const {data: cohortDetails, isLoading, isFetching } = useViewCohortDetailsQuery({
        cohortId: cohortId
    }, {refetchOnMountOrArgChange: true});
    const {data: cohortBreakDown} = useGetCohortDetailsBreakdownQuery({cohortId: cohortId}, {skip: !cohortId})
    const selectedCohortInOrganizationType = useAppSelector(store => store?.cohort?.selectedCohortInOrganizationType)


    const cohort: {name: string, value: string, valueType: 'percentage'| 'digit'| 'currency' | 'tenor' | 'years', id:string}[] = [
        {name: 'Total amount disbursed', value: cohortDetails?.data?.amountReceived , valueType: 'currency', id: 'totalAmount'},
        {name: 'Total amount repaid', value: cohortDetails?.data?.totalAmountRepaid , valueType: 'currency', id: 'totalRepaid'},
        {name: 'Total amount outstanding', value: cohortDetails?.data?.amountOutstanding , valueType: 'currency', id: 'totalOutstanding'},
        {name: 'Average starting salary', value: cohortDetails?.data?.averageStartingSalary , valueType: 'currency', id: 'averageStartingSalary'},
        {name: 'Tuition amount', value: cohortDetails?.data?.tuitionAmount , valueType: 'currency', id: 'tuitionAmount'},
  ]

    const cohort2: {name: string, value: string, valueType: 'percentage'| 'digit'| 'currency' | 'tenor' | 'years', id:string}[] = [
        {name: 'Total loanees', value: cohortDetails?.data?.numberOfLoanees , valueType: 'digit', id: 'totalLoanees'},
        {name: 'Total dropouts', value: cohortDetails?.data?.numberOfDropout , valueType: 'digit', id: 'totalDropouts'},
        {name: 'Total employed', value: cohortDetails?.data?.numberEmployed , valueType: 'digit', id: 'totalEmployed'},
        {name: 'Employment rate', value: cohortDetails?.data?.totalAmountRepaid , valueType: 'percentage', id: 'employmentRate'},
        {name: 'Repayment rate', value: cohortDetails?.data?.repaymentRate , valueType: 'percentage', id: 'repaymentRate'},
    ]

    const cohort3 = [
        {title: 'Description', id: 'programDiscription', value:
            <div>
               <QuillRenderer html={cohortDetails?.data?.cohortDescription || ""}/>
            </div>
        },
        {title: 'Program', id:'programname', value: <span className={` text-meedlBlue bg-[#F3F8FF] rounded-full w-fit h-fit  max-w-[100%] px-4 py-2  `}>{cohortDetails?.data?.programName}</span>},
        {title: 'Status', id: 'status', value: <span className={`rounded-full ${selectedCohortInOrganizationType === 'GRADUATED' ? 'text-[#636363] bg-[#F6F6F6]  '  :selectedCohortInOrganizationType === 'INCOMING'  ? 'text-[#66440A] bg-[#FEF6E8] ' :" bg-[#E7F5EC] text-[#063F1A] "}   h-fit w-fit px-2 py-2   text-[14px] `}>{capitalizeFirstLetters(cohortDetails?.data?.cohortStatus)}</span>},
        {title: 'Start date',id:'startDate', value: <span className={` ${inter500.className} text-[#212221] text-[14px] `}>{dayjs(cohortDetails?.data?.startDate?.toString()).format('MMM D, YYYY')}</span>},
        {title: 'End  date',id:'endDate', value: <span className={` ${inter500.className} text-[#212221] text-[14px] `}>{dayjs(cohortDetails?.data?.expectedEndDate?.toString()).format('MMM D, YYYY')}</span>},


    ]

    return (
        <div
            className={`w-full md:flex lg:flex h-full `}
        >
            <div
                className={` md:w-[60%] grid gap-4 ${styles.container} mt-4 md:max-h-[60vh] pr-2 overflow-y-scroll `}
            >
                {cohort?.map((item, i) => (
                    <Details
                        key={'index'+i}
                        id={item.id} name={item.name} valueType={item.valueType}
                        value={item.value}
                        isLoading={isLoading || isFetching}
                    />
                ))}
                <div className={` md:grid ${cohortBreakDown?.data?.length === 1 ? 'md:grid-cols-1' :  'md:grid-cols-2 '} md:gap-4  `}>
                    {cohortBreakDown?.data?.map((item: CohortItems , i: number) => (
                        <Details
                            isLoading={isLoading || isFetching}
                            key={'index'+i}
                            id={item.loanBreakdownId} name={item.itemName} valueType='currency'
                            value={item.itemAmount}
                        />
                    ))}
                </div>

                {/*<div className={` md:grid md:grid-cols-2 md:gap-4  grid gap- `}>*/}
                    {cohort2?.map((item, i) => (
                        <Details
                            isLoading={isLoading || isFetching}
                            key={'index'+i}
                            id={item.id} name={item.name} valueType={item.valueType}
                            value={item.value}
                        />
                    ))}
                {/*</div>*/}
            </div>
            <div
                className={` ${styles.container} overflow-x-hidden md:max-w-[35%] grid gap-3  md:w-[35%] pt-3 pl-3  md:border-l md:border-l-[#ECECEC] md:h-[60vh] `}
            >
                {cohort3?.map((item, i) => (
                    <div
                        key={'index'+i}
                        className={` grid gap-3 h-fit  mb-2   `}
                        id={item.id}
                        data-testid={item.id}
                    >
                        <p className={` text-[#6A6B6A] text-[14px]  `}>{item.title}</p>
                        {item.value}
                    </div>
                ))}

            </div>
            
        </div>
    );
};

export default DetailsComponent;