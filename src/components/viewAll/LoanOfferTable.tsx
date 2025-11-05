"use client"
import React, {ReactNode, useEffect,useState} from "react";
import {MdOutlinePeople} from "react-icons/md";
import Table from '@/reuseable/table/Table';
import {useRouter} from "next/navigation";
import {formatAmount} from "@/utils/Format";
import dayjs from "dayjs";
import {capitalizeFirstLetters} from "@/utils/GlobalMethods";
import { useViewAllLoanOfferQuery } from "@/service/admin/loan/loan-offer-api";
import { resetNotification } from '@/redux/slice/notification/notification';
import { store } from "@/redux/store";
import {inter} from "@/app/fonts";
import {setLoanOfferId} from "@/redux/slice/create/createLoanOfferSlice";
import { useSearchLoanOfferQuery } from '@/service/admin/loan/loan-request-api';
import { useLoanParams } from "./useLoanParams";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}


const Index = () => {
     const [hasNextPage,setNextPage] = useState(false)
     const [totalPage,setTotalPage] = useState(0)
     const router = useRouter();

    const { 
            params, 
            searchParams, 
            setPageNumber, 
            setPageSearchNumber, 
            hasSearchTerm 
        } = useLoanParams();

    const { data, isLoading, isFetching} = useViewAllLoanOfferQuery( params,{refetchOnMountOrArgChange: true})

    const { data: searchResult, isLoading: isSearchLoading, isFetching: isSearchFetching } = useSearchLoanOfferQuery(
        searchParams,
        { skip: !hasSearchTerm }
    );

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (hasSearchTerm ) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

    useEffect(() => {
            if ( hasSearchTerm  && searchResult && searchResult?.data) {
                setNextPage(searchResult?.data?.hasNextPage)
                setTotalPage(searchResult?.data?.totalPages)
                setPageSearchNumber(searchResult?.data?.pageNumber)
            }else if (! hasSearchTerm  && data && data.data){
                setNextPage(data?.data?.hasNextPage)
                setTotalPage(data?.data?.totalPages)
                setPageNumber(data?.data?.pageNumber)
            }
        },[data,searchResult, hasSearchTerm ,setPageNumber,setPageSearchNumber])

    useEffect(()=> {
       store.dispatch(resetNotification()) 
    })


    const getLoanOfferStatus = (mode?: string |ReactNode) => {
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
        { title: 'Loanee', sortable: true, id: 'firstName', selector: (row: TableRowData) =>capitalizeFirstLetters(row.firstName?.toString()) + " " + capitalizeFirstLetters(row.lastName?.toString()) },
        { title: 'Status', sortable: true, id: 'status', selector: (row: TableRowData) => getLoanOfferStatus(row.status)},
        { title: 'Loan product', sortable: true, id: 'loanProduct', selector: (row: TableRowData) =>row.loanProductName },
        { title: 'Offer date', sortable: true, id: 'offerDate', selector: (row: TableRowData) => dayjs(row.dateOffered?.toString()).format('MMM D, YYYY')},
        { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row: TableRowData) => formatAmount(row.amountRequested)},
        { title: 'Amount approved', sortable: true, id: 'amountApproved', selector: (row: TableRowData) => formatAmount(row.amountApproved)}
    ];



    const handleRowClick = (ID: string | object | React.ReactNode) => {
        if (typeof ID === "object"){
            //eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            store.dispatch(setLoanOfferId(String(ID?.id)))
        }
        router.push(`/loan-offer-details`);

    };


    return (
        <div data-testid={'mainDivContainer'} id={`mainDivContainer`}
        >
            
                    <div className={` `}>

                        <Table
                            tableData={getTableData()}
                            tableHeight={data?.data?.body?.length < 10 ? 60:hasSearchTerm &&  searchResult?.data?.body?.length < 10 ? 60 : undefined}
                            isLoading={isLoading || isFetching || isSearchFetching || isSearchLoading}
                            handleRowClick={handleRowClick}
                            tableHeader={loanOfferHeader}
                            sx='cursor-pointer'
                            staticColunm='firstName'
                            staticHeader='Loanee'
                            showKirkBabel={false}
                            icon={MdOutlinePeople}
                            sideBarTabName='Loan offer'
                            pageNumber={hasSearchTerm ? searchParams.pageNumber : params.pageNumber}
                            setPageNumber={hasSearchTerm ? setPageSearchNumber : setPageNumber}
                            totalPages={totalPage}
                            hasNextPage={hasNextPage}
                            condition={true}
                            tableCellStyle="h-12"
                            searchEmptyState={hasSearchTerm && searchResult?.data?.body?.length < 1}
                        />
                    </div>
        </div>
    );
}

export default Index;
