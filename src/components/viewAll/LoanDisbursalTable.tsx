"use client"
import React,{useEffect,useState} from "react";
import {Icon} from "@iconify/react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {store, useAppSelector} from "@/redux/store";
import {
    useViewAllLoanDisbursalQuery
} from "@/service/admin/loan/Loan-disbursal-api";
import {setClickedDisbursedLoanIdNumber} from "@/redux/slice/loan/selected-loan";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import TableEmptyState from "@/reuseable/emptyStates/TableEmptyState";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useSearchLoanDisbursalQuery } from '@/service/admin/loan/loan-request-api';
import { useDebounce } from '@/hooks/useDebounce';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function Index() {
    const router = useRouter();
     const [pageNumber, setPageNumber] = React.useState(0);
     const [pageSearchNumber,setPageSearchNumber] = useState(0)
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
   
    const clickedOrganizationId = useAppSelector(state => state.selectedLoan?.clickedOrganization)
    const searchTerm = useAppSelector(state => state?.selectedLoan?.searchLoan)

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const request = {
        pageSize: 10,
        pageNumber: pageNumber,
       
    }

    const viewAllPropswWithId = {
        pageSize:10,
        pageNumber:pageNumber,
        organizationId: clickedOrganizationId?.id ,
    }

    const searchParam = {
        name:debouncedSearchTerm,
        pageSize:10,
        pageNumber:pageSearchNumber,
      
    }

    const searchParamWithOrg = {
        name:debouncedSearchTerm,
        pageSize:10,
        pageNumber:pageSearchNumber,
        organizationId: clickedOrganizationId?.id,
    }


    const {data, isLoading, isFetching } = useViewAllLoanDisbursalQuery(clickedOrganizationId?.id? viewAllPropswWithId : request,{refetchOnMountOrArgChange: true})


    const {data: searchResult,isLoading: isSearchLoading,isFetching:isSearchFetching} = useSearchLoanDisbursalQuery(clickedOrganizationId?.id? searchParamWithOrg : searchParam,{skip: !debouncedSearchTerm})

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (debouncedSearchTerm) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

     useEffect(() => {
            if (debouncedSearchTerm && searchResult && searchResult?.data) {
                setNextPage(searchResult?.data?.hasNextPage)
                setTotalPage(searchResult?.data?.totalPages)
                setPageSearchNumber(searchResult?.data?.pageNumber)
            }else if (!debouncedSearchTerm && data && data.data){
                setNextPage(data?.data?.hasNextPage)
                setTotalPage(data?.data?.totalPages)
                setPageSearchNumber(data?.data?.pageNumber)
            }
        },[data,searchResult,debouncedSearchTerm])
    


    const loanDisbursalHeader = [
        {
            title: 'Loanee',
            sortable: true,
            id: 'firstName',
            selector: (row: TableRowData) => capitalizeFirstLetters(row.firstName?.toString()) + " " +  capitalizeFirstLetters(row.lastName?.toString()) },
        {title: 'Program', sortable: true, id: 'program', selector: (row: TableRowData) => row.programName},
        {title: 'Cohort', sortable: true, id: 'cohort', selector: (row: TableRowData) => row.cohortName},
        {
            title: 'Offer date',
            sortable: true,
            id: 'startDate',
            selector: (row: TableRowData) =>dayjs(row.offerDate?.toString()).format('MMMM D, YYYY')
        },
        {
            title: 'Loan start date',
            sortable: true,
            id: 'requestDate',
            selector: (row: TableRowData) =>dayjs(row.startDate?.toString()).format('MMMM D, YYYY')
        },
        {
            title: 'Deposit',
            sortable: true,
            id: 'initialDeposit',
            selector: (row: TableRowData) => formatAmount(row.initialDeposit)
        },
        {
            title: 'Amount requested',
            sortable: true,
            id: 'amountRequested',
            selector: (row: TableRowData) =>formatAmount(row.loanAmountRequested)
        }
    ];

    const handleRowClick = (ID: string | object | React.ReactNode) => {
        if (typeof ID === "object"){
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            store.dispatch(setClickedDisbursedLoanIdNumber(ID?.id))
        }
        router.push(`/disbursed-loan-details`);
    };

    return (
        <div data-testid={'LoanDisbursalMainDivContainer'} id={`LoanDisbursalMainDivContainer`}
        >
            {isLoading  ? (
                <div className={`w-full h-fit pb-5 md:w-full md:h-fit`}>
                    <SkeletonForTable/>
                </div>
            ) : data?.data?.body?.length === 0 || !data ?
                (
                    <TableEmptyState name={"loan disbursal"}   icon={
                        <Icon
                            icon="material-symbols:money-bag-outline"
                            height="2.5rem"
                            width="2.5rem"
                        />
                    } condition={true} descriptionId={clickedOrganizationId?.id ? 'There are no loan disbursal in this organization yet' : `There are no loan disbursal available yet`}/>
                ) :
                (
                    <div className={``}>
                        <Table
                            tableData={getTableData()}
                            isLoading={isLoading || isFetching || isSearchFetching || isSearchLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanDisbursalHeader}
                            tableHeight={data?.data?.body?.length < 10 ? 60:searchTerm &&  searchResult?.data?.body?.length < 10 ? 60 : undefined}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Disbursed loans'
                            condition={true}
                            totalPages={totalPage}
                            hasNextPage={hasNextPage}
                            pageNumber={searchTerm !== ""? pageSearchNumber : pageNumber}
                            setPageNumber={searchTerm !== ""? setPageSearchNumber :  setPageNumber}
                            tableCellStyle="h-12"
                            searchEmptyState={!isTyping && debouncedSearchTerm?.length > 0 && searchResult?.data?.body?.length < 1 }
                        />
                    </div>
                )
            }
        </div>
    );
}

export default Index;