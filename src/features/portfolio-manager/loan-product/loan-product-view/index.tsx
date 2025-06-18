"use client";

import React, { useEffect, useState } from "react";
import Table from '@/reuseable/table/Table';
import { MdOutlineInventory2, MdSearch } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchLoanProductQuery, useViewAllLoanProductQuery } from "@/service/admin/loan_product";
import { formatAmount } from "@/utils/Format";
import TableModal from "@/reuseable/modals/TableModal";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import CreateLoanProduct from "@/components/portfolio-manager/loan-product/Index";
import SkeletonForTable from "@/reuseable/Skeleton-loading-state/Skeleton-for-table";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {store} from "@/redux/store";
import {setClickedLoanProductId} from "@/redux/slice/loan/selected-loan";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const LoanProductPage = () => {
    const router = useRouter();
    const [allLoanee, setAllLoanProduct] = useState<TableRowData[]>([]);
    const [createProduct, setCreateProduct] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
     const [pageNumber,setPageNumber] = useState(0)
    
     const [seachPageNumber,setSearchPageNumber]= useState(0)
     const [searchHasNextPage,setSearchNextPage] = useState(false)

    const size = 10;
    const { data, isLoading } = useViewAllLoanProductQuery({ pageSize: size, pageNumber:pageNumber });
    const { data: searchResult, isLoading: isSearchLoading } = useSearchLoanProductQuery(
        { loanProductName: searchTerm, pageSize: size, pageNumber:seachPageNumber },
        { skip: !searchTerm }
    );

    useEffect(() => {
        if (searchTerm && searchResult && searchResult?.data) {
            const result = searchResult?.data?.body;
            setSearchNextPage(searchResult.data?.hasNextPage)
            setTotalPage(searchResult?.data?.totalPages)
           setSearchPageNumber(searchResult?.data?.pageNumber)
            setAllLoanProduct(result);
        } else if (!searchTerm && data && data?.data) {
            const result = data?.data?.body;
            setAllLoanProduct(result);
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }
    }, [data, searchTerm, searchResult]);

    useEffect(() => {
        if (data && data?.data) {
            const all = data?.data?.body;
            setAllLoanProduct(all);
        }
    }, [data]);

    const handleCreateButton = () => {
        setCreateProduct(true);
    };

    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setClickedLoanProductId(String(row?.id)))
        router.push('/loan-product/loan-product-details');
    };

    const loanProductHeader = [
        {
            title: 'Loan products',
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
            selector: (row: TableRowData) => row.interestRate
        },
        {
            title: 'No. of loanees',
            sortable: true,
            id: 'totalNumberOfLoanee',
            selector: (row: TableRowData) => row.totalNumberOfLoanee
        },
        {
            title: 'Cost of vehicle (%)',
            sortable: true,
            id: 'costOfFund',
            selector: (row: TableRowData) => row.costOfFund
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

    const dropDownOption = [
        {
            name: "View Program",
            id: "1"
        },
        {
            name: "Edit Program",
            id: "2"
        },
        {
            name: "Delete Program",
            id: "3"
        }
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

            <div id={`table`} className={`pt-8`}>
                {isLoading ? (
                    <div className={`w-full h-fit md:w-full md:h-full`}>
                        <SkeletonForTable />
                    </div>
                ) : searchTerm && searchResult && searchResult?.data?.body?.length === 0 ? (
                        <div className={`flex justify-center items-center text-center md:h-[40vh] h-[40%] w-full mt-40`}>
                            <SearchEmptyState name={"Loan product"} icon={MdSearch} />
                        </div>
                ) : allLoanee.length > 0 ? (
                    <Table
                        tableData={allLoanee}
                        handleRowClick={handleRowClick}
                        tableHeader={loanProductHeader}
                        tableHeight={58}
                        sx='cursor-pointer'
                        staticColunm="name"
                        staticHeader="loan product"
                        showKirkBabel={false}
                        kirkBabDropdownOption={dropDownOption}
                        tableCellStyle={"h-12"}
                        icon={MdOutlineInventory2}
                        sideBarTabName={"loan product"}
                        isLoading={isLoading || isSearchLoading}
                        condition={true}
                        totalPages={totalPage}
                        hasNextPage={searchTerm !== ""? searchHasNextPage : hasNextPage}
                        pageNumber={searchTerm !== ""? seachPageNumber :  pageNumber}
                        setPageNumber={searchTerm !== ""? setSearchPageNumber : setPageNumber}
                    />
                ) : ""}
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
