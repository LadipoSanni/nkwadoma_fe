"use client"
import React from "react";
import {MdOutlinePeople} from "react-icons/md";
import Tables from "@/reuseable/table/index";
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import {useAppSelector} from "@/redux/store";
import { useViewAllLoanOfferQuery , useViewLoanInAnOrganizationQuery} from "@/service/admin/loan/loan-offer-api";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {Icon} from "@iconify/react";



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}
interface viewAllLoanOfferProps{
    id: string,
    amountRequested: number,
    amountApproved: number,
    dateOffered: string,
    loanProductName: string,
    firstName: string,
    lastName: string,
    loanOfferResponse: string
}

const Index = () => {
    const router = useRouter();
    const request ={
        pageSize: 100,
        pageNumber: 0
    }
    const clickedOrganization = useAppSelector(state => state.selectedLoan.clickedOrganization);
    const { data, isLoading} = useViewAllLoanOfferQuery(request)
    const requestBody = {
        pageNumber: 0,
        pageSize: 100,
        organizationId: clickedOrganization?.id
    }
    const {data: viewAllLoanOffersInAnOrganizationData, isLoading:isLoadingOrganizationLoanOffer } = useViewLoanInAnOrganizationQuery(requestBody, {skip:!clickedOrganization})
    const sortedViewAllLoanOffer = (data?.data?.body.slice() ?? []).sort((a:viewAllLoanOfferProps, b:viewAllLoanOfferProps) => new Date(b.dateOffered).getTime() - new Date(a.dateOffered).getTime())
    const sortedViewAllLoanOfferInAnOrg = (viewAllLoanOffersInAnOrganizationData?.data?.body.slice() ?? []).sort((a:viewAllLoanOfferProps, b:viewAllLoanOfferProps) => new Date(b.dateOffered).getTime() - new Date(a.dateOffered).getTime())

    console.log('')
    const loanOfferHeader = [
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) =><div className='flex gap-2 '>{capitalizeFirstLetters(row.firstName?.toString())} <div className={``}></div>{row.lastName}</div>  },
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
            //  className={`grid md:px-3 md:overflow-hidden  md:pb-3 place-items-center w-full md:w-full md:h-full md:grid md:place-items-center  h-full `}
        >
            {isLoading || isLoadingOrganizationLoanOffer ? (
                <div className={`w-full h-fit pb-5 md:w-full md:h-fit`}>
                    <SkeletonForTable />
                </div>
            ) :sortedViewAllLoanOfferInAnOrg.length === 0 || data?.data?.body?.length === 0 ?
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
                            tableData={clickedOrganization?.id  ? sortedViewAllLoanOfferInAnOrg : sortedViewAllLoanOffer}
                            isLoading={isLoading || isLoadingOrganizationLoanOffer}
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
