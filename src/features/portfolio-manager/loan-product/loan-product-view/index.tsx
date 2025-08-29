"use client";

import React, { useEffect, useState } from "react";
import Table from '@/reuseable/table/Table';
import { MdOutlineInventory2, MdSearch } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchLoanProductQuery, useViewAllLoanProductQuery } from "@/service/admin/loan_product";
import { formatAmount,formatToTwoDecimals } from "@/utils/Format";
import TableModal from "@/reuseable/modals/TableModal";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import CreateLoanProduct from "@/components/portfolio-manager/loan-product/Index";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {store} from "@/redux/store";
// import {setClickedLoanProductId} from "@/redux/slice/loan/selected-loan";
import { useDebounce } from '@/hooks/useDebounce';
import { resetAll,clearSaveCreateInvestmentField} from '@/redux/slice/vehicle/vehicle';
import { setLoanProductId,setLoanProductName } from "@/redux/slice/loan-product/Loan-product";
import styles from "../index.module.css"

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const LoanProductPage = () => {
    const router = useRouter();
    const [createProduct, setCreateProduct] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
     const [pageNumber,setPageNumber] = useState(0)
    
     const [seachPageNumber,setSearchPageNumber]= useState(0)
     const [searchHasNextPage,setSearchNextPage] = useState(false)

     const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const size = 10;
    const { data, isLoading,isFetching } = useViewAllLoanProductQuery({ pageSize: size, pageNumber:pageNumber });
    const { data: searchResult, isLoading: isSearchLoading, isFetching: isfetching } = useSearchLoanProductQuery(
        { loanProductName: debouncedSearchTerm, pageSize: size, pageNumber:seachPageNumber },
        { skip: !debouncedSearchTerm }
    );

    const getTableData = () => {
        if (!data?.data?.body) return [];
        if (debouncedSearchTerm) return searchResult?.data?.body || [];
        return data?.data?.body;
    }

    useEffect(() => {
        if (debouncedSearchTerm && searchResult && searchResult?.data) {
            setSearchNextPage(searchResult.data?.hasNextPage)
            setTotalPage(searchResult?.data?.totalPages)
           setSearchPageNumber(searchResult?.data?.pageNumber)
        } else if (!debouncedSearchTerm && data && data?.data) {
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }
         store.dispatch(resetAll())
        store.dispatch(clearSaveCreateInvestmentField())
    }, [data,debouncedSearchTerm, searchResult]);


    const handleCreateButton = () => {
        setCreateProduct(true)
        // router.push('/loan-product/stepOne');
    };

    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setLoanProductId(String(row?.id)))
        store.dispatch(setLoanProductName(String(row?.name)))
        router.push('/loan-product/loan-product-details');
    };

    const loanProductHeader = [
        {
            title: 'Loan product',
            sortable: true,
            id: 'name',
            selector: (row: TableRowData) => row.name
        },
        {
            title: 'Fund product',
            sortable: true,
            id: 'investmentVehicleName',
            selector: (row: TableRowData) => row.investmentVehicleName ?? "fund product"
        },
        {
            title: 'Interest rate (%)',
            sortable: true,
            id: "interestRate",
            selector: (row: TableRowData) => formatToTwoDecimals(row.interestRate)
        },
        {
            title: 'No. of loanee',
            sortable: true,
            id: 'totalNumberOfLoanee',
            selector: (row: TableRowData) => row.totalNumberOfLoanee
        },
        {
            title: 'Cost of fund (%)',
            sortable: true,
            id: 'costOfFund',
            selector: (row: TableRowData) => formatToTwoDecimals(row.costOfFund)
        },
        {
            title: 'Amount disbursed',
            sortable: true,
            id: 'totalAmountDisbursed',
            selector: (row: TableRowData) => formatAmount(row.totalAmountDisbursed)
        },
        {
            title: 'Amount repaid',
            sortable: true,
            id: 'totalAmountRepaid',
            selector: (row: TableRowData) => formatAmount(row.totalAmountRepaid)
        },
        {
            title: 'Amount earned',
            sortable: true,
            id: 'totalAmountEarned',
            selector: (row: TableRowData) => formatAmount(row.totalAmountEarned)
        },
    ];

   

    return (
        <main id={`mainDiv`} className={`px-5 py-6`}>
            <div id={`searchAndCreateProduct`} className={`flex md:flex-row md:justify-between flex-col gap-5 `}>
                <div className="relative" id={`searchDiv`}>
                    <div
                        className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                        id={`searchIcon`}>
                        <MdSearch className="h-5 w-5 text-grey200"/>
                    </div>
                    <Input
                        className='w-full lg:w-80 h-12 focus-visible:outline-0 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10'
                        type="search" id={`search`} value={searchTerm} placeholder={"Search"}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required/>
                </div>
                <div id={`createProduct`}>
                    <Button variant={"secondary"}
                            size={"lg"}
                            onClick={handleCreateButton}
                            className={`bg-meedlBlue h-12 py-5 px-6  w-full   shadow-none`}
                    >Create loan product</Button>
                </div>
            </div>

            <div 
            id={`table`} 
            className={` max-h-[68vh] mt-8 ${styles.container}`}
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',  
                  }}
            >
                {isLoading ? (
                    <div className={`w-full h-fit md:w-full md:h-full`}>
                        <SkeletonForTable />
                    </div>
                ) : !isTyping && debouncedSearchTerm && searchResult && searchResult?.data?.body?.length === 0 ? (
                        <div className={`flex justify-center items-center text-center md:h-[40vh] h-[40%] w-full`}>
                            <SearchEmptyState name={"Loan product"} icon={MdSearch} />
                        </div>
                ) :  (
                    <Table
                        tableData={getTableData()}
                        handleRowClick={handleRowClick}
                        tableHeader={loanProductHeader}
                        tableHeight={59}
                        sx='cursor-pointer'
                        staticColunm="name"
                        staticHeader="loan product"
                        tableCellStyle={"h-12"}
                        icon={MdOutlineInventory2}
                        sideBarTabName={"loan product"}
                        isLoading={isLoading || isSearchLoading || isFetching || isfetching}
                        condition={true}
                        totalPages={totalPage}
                        hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPage}
                        pageNumber={searchTerm !== ""? seachPageNumber :  pageNumber}
                        setPageNumber={searchTerm !== ""? setSearchPageNumber : setPageNumber}
                    />
                ) }
            </div>
            <div className={`md:max-w-sm`} id={`CreateLoanProduct`}>
                <TableModal
                    isOpen={createProduct}
                    closeModal={() => setCreateProduct(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    headerTitle={`Create loan product`}
                    width="36%"
                >
                    <CreateLoanProduct setIsOpen={() => setCreateProduct(false)} />
                </TableModal>
            </div>
        </main>
    );
}

export default LoanProductPage;
