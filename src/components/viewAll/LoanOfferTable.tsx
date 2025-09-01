"use client"
import React, {ReactNode, useEffect} from "react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import {useAppSelector} from "@/redux/store";
import { useViewAllLoanOfferQuery } from "@/service/admin/loan/loan-offer-api";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";
import { resetNotification } from '@/redux/slice/notification/notification';
import { store } from "@/redux/store";
import {inter} from "@/app/fonts";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}


const Index = () => {
    const router = useRouter();
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const request ={
        pageSize: 100,
        pageNumber: 0,
        organizationId: clickedOrganization?.id || "",
    }
    const { data, isLoading} = useViewAllLoanOfferQuery(request,{refetchOnMountOrArgChange: true})

    useEffect(()=> {
       store.dispatch(resetNotification()) 
    })


    const getLoanOfferStatus = (mode?: string |ReactNode) => {
        console.log('mode: ', mode)
        switch (mode) {
            case 'ACCEPTED' :
                return <span className={` ${inter.className} bg-[#E6F2EA] text-[14px] text-[#045620] rounded-full w-fit h-fit py-1 px-2 `} >Accepted</span>
            case 'DECLINED':
                return <span className={` ${inter.className}  bg-[#FBE9E9] text-[14px] text-[#971B17] rounded-full w-fit h-fit py-1 px-2 `} >Declined</span>
            case 'OFFERED':
                return <span className={` ${inter.className} bg-[#FEF6E8] text-[14px] text-[#68442E] rounded-full w-fit h-fit py-1 px-2`}>Pending</span>
            case 'WITHDRAW':
                return <span className={`${inter.className}  bg-[#FBE9E9] text-[14px] text-[#971B17] rounded-full w-fit h-fit py-1 px-2  `}>Withdraw</span>
            default:
                return 'ttt';
        }
    }



    const loanOfferHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) =><div className='flex gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())} <div className={``}></div>{row.lastName}</div>  },
        { title: 'Status', sortable: true, id: 'status', selector: (row: TableRowData) =><div>{getLoanOfferStatus(row.status)}</div> },
        { title: 'Loan product', sortable: true, id: 'loanProduct', selector: (row: TableRowData) =>row.loanProductName },
        { title: 'Offer date', sortable: true, id: 'offerDate', selector: (row: TableRowData) => <div>{dayjs(row.dateOffered?.toString()).format('MMM D, YYYY')}</div> },
        { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountRequested)}</div>},
        { title: 'Amount approved', sortable: true, id: 'amountApproved', selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountApproved)}</div>}
    ];



    const handleRowClick = (ID: string | object | React.ReactNode) => {
        router.push(`/loan-offer-details?id=${ID}`);
    };


    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
        >
            {isLoading  ? (
                <div className={`w-full h-fit pb-5 md:w-full md:h-fit`}>
                    <SkeletonForTable />
                </div>
            ) :data?.data?.body?.length === 0 || !data  ?
                (
                    <TableEmptyState name={"loan offer"}   icon={
                        <Icon
                            icon="material-symbols:money-bag-outline"
                            height="2.5rem"
                            width="2.5rem"
                        />
                    } condition={true} descriptionId={clickedOrganization?.id ? 'There are no loan offers in this organization yet': `There are no loan offers available yet` }/>
                ) :
                (
                    <div className={` `}>

                        <Tables
                            tableData={data?.data?.body}
                            isLoading={isLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanOfferHeader}
                            tableHeight={54}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Cohort'
                            optionalFilterName='graduate'
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Index;
