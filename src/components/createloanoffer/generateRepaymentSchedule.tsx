'use client'
import React from 'react';
import {cabinetGroteskMediumBold600, inter700} from "@/app/fonts";
import Details from "@/components/loanee-my-profile/Details";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import InfiniteScrollTable from "@/reuseable/table/InfiniteScrollTable";
import {repaymentSchedule} from "@/utils/LoanRequestMockData/index";

interface viewAllType {
    principalAmount: string
    date: string
    amountPaid: string
    outStanding:string
    outstanding:number
    totalPayment: string
}

const GenerateRepaymentSchedule = () => {

    const tableHeader =  [
        { title: 'Date', sortable: true, id: 'date', selector: (row: viewAllType) =><div>{dayjs(row.date?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Principal amount', sortable: true, id: 'principalAmount', selector: (row:  viewAllType) => <div className=''>{formatAmount(row.principalAmount)}</div>},
        { title: 'Amount paid', sortable: true, id: 'amountPaid', selector: (row: viewAllType) => <div className=''>{formatAmount(row.amountPaid)}</div>},
        { title: 'Outstanding', sortable: true, id: 'outstanding', selector: (row: viewAllType) =><div>{formatAmount(row.outStanding?.toString())}</div> },
        { title: 'Total payment', sortable: true, id: 'totalPayment', selector: (row: viewAllType) =><div>{formatAmount(row.totalPayment?.toString())}</div> },

    ]


    return (
        <div
            id={'generateRepaymentScheduleComponent'}
            data-testid={'generateRepaymentScheduleComponent'}
            className={` w-full grid gap-6  h-full px-2 py-2 `}
        >
            <div className={`w-full h-fit flex justify-between `}>
                <h4 className={` ${cabinetGroteskMediumBold600.className} text-[#101828] text-[28px] text-  `}>Generate repayment schedule</h4>
                <button id={'confirmRepaymentButton'} data-tesid={'confirmRepaymentButton'} className={` rounded-md text-[14px] ${inter700.className}  w-fit h-fit py-1 px-2 bg-meedlBlue text-white  `}>Confirm repayment schedule</button>
            </div>
            <div className={` grid  md:flex gap-3  `}>
                <div className={` w-[50%] `}>
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'total'} showAsWholeNumber={false}    name={'Sum total'} value={'200000'} valueType={'currency'}  />
                </div>
                <div className={`w-[50%] grid md:flex gap-3  `}>
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'totalamountEarned'} showAsWholeNumber={false}    name={'Tenor'} value={'9'} valueType={'years'}  />
                    <Details showIcon={false} isLoading={false} sx={` w-full md:w-[100%] `} id={'totalamountEarned'} showAsWholeNumber={false}    name={'Tenor'} value={'0'} valueType={'years'}  />
                </div>
            </div>
            <InfiniteScrollTable
                tableData={repaymentSchedule}
                tableHeader={tableHeader}
                tableHeight={50}
                staticHeader={'Date'}
                staticColumn={'Date'}
            />

        </div>
    );
};

export default GenerateRepaymentSchedule;