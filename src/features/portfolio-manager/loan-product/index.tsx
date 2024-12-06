"use client";
import React, {useEffect, useState} from "react";
import Tables from "@/reuseable/table/LoanProductTable";
import {MdOutlineInventory2, MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSearchLoanProductQuery, useViewAllLoanProductQuery} from "@/service/admin/loan_product";
import {formatAmount} from "@/utils/Format";
import TableModal from "@/reuseable/modals/TableModal";
import {CreateLoanProduct} from "@/components/portfolio-manager/loan-product/createLoanProduct";
import {Cross2Icon} from "@radix-ui/react-icons";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

function LoanProductPage() {
    const [allLoanee, setAllLoanProduct] = useState([]);
    const [createProduct, setCreateProduct] = React.useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const size = 100;
    const number = 0;
    const {data, isLoading: isLoading} = useViewAllLoanProductQuery({pageSize: size, pageNumber: number})
    const { data: searchResult } = useSearchLoanProductQuery(
        { loanProductName: searchTerm },
        { skip: !searchTerm }
    );
    useEffect(() => {
        if (searchTerm && searchResult && searchResult?.data) {
            const result = searchResult?.data
            setAllLoanProduct(result)
        } else if(!searchTerm && data && data?.data) {
            const result = data?.data?.body
            setAllLoanProduct(result)
        }
    }, [data,searchTerm,searchResult ])

    useEffect(() => {
        if (data && data?.data) {
            const all = data?.data?.body;
            setAllLoanProduct(all)
        }
    }, [data])

    const handleCreateButton = () => {
              setCreateProduct(true)
    }

    const handleRowClick = () => {

    }


    const loanProductHeader = [
        {title: 'loan products', sortable: true, id: 'name', selector: (row: TableRowData) => row.name},
        {
            title: 'Fund product',
            sortable: true,
            id: 'bankPartner',
            selector: (row: TableRowData) => row.bankPartner ?? "0"
        },
        {
            title: 'Interest rate (%)',
            sortable: true,
            id: "interestRate",
            selector: (row: TableRowData) => formatAmount(row.interestRate)
        },
        {
            title: 'No. of loanees',
            sortable: true,
            id: 'numberOfLoanees',
            selector: (row: TableRowData) => formatAmount(row.numberOfLoanees)
        },
        {
            title: 'Cost of funds',
            sortable: true,
            id: 'costOfFund',
            selector: (row: TableRowData) => formatAmount(row.costOfFund)
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
    ]

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
    ]


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
                        type="search" id={`search`} value={searchTerm} placeholder={"Search"} onChange={(e) => setSearchTerm(e.target.value)}
                        required/>
                </div>
                <div id={`createProduct`}>
                    <Button variant={"secondary"}
                            size={"lg"}
                            className={`bg-meedlBlue h-12 py-5 px-6  w-full hover:bg-meedlBlue focus-visible:ring-0 shadow-none`}
                    >Create loan product</Button>
                </div>
            </div>

            <div id={`table`} className={`pt-8`}>
                <Tables
                    tableData={allLoanee}
                    handleRowClick={handleRowClick}
                    tableHeader={loanProductHeader}
                    tableHeight={52}
                    sx='cursor-pointer'
                    staticColunm="loanProductName"
                    staticHeader="Loan Product"
                    showKirkBabel={false}
                    kirkBabDropdownOption={dropDownOption}
                    tableCellStyle={"h-12"}
                    optionalRowsPerPage={10}
                    icon={MdOutlineInventory2}
                    sideBarTabName={"Loan products"}
                    isLoading={isLoading}
                    condition={true}
                />
            </div>
            <div className={`md:max-w-sm`} id={`AddTraineeDiv`}>
                <TableModal
                    isOpen={createProduct}
                    closeModal={() => setCreateProduct(false)}
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    headerTitle={`Create loan Product`}
                    width="30%"
                >
                    <CreateLoanProduct setIsOpen={() => setCreateProduct(false)}/>
                </TableModal>

            </div>
        </main>
    );
}

export default LoanProductPage;
