"use client";
import React from "react";
import {loanProductData} from "@/utils/LoanProductMockData";
import Tables from "@/reuseable/table/LoanProductTable";
import {MdSearch} from "react-icons/md";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


function LoanProductPage() {

// const [createProduct, setCreateProduct] = React.useState(false)
//     const handleCreateButton = () => {
//               setCreateProduct(true)
//     }

    const handleRowClick =()=>{

    }


    const columns = [
        {
            title: 'Loan product',
            sortable: true,
            id: 'loanProductName'
        },
        {
            title: 'Loan product ',
            sortable: true,
            id: 'loanProductSponsor'
        },
        {
            title: 'Interest rate (%)',
            sortable: true,
            id: "interestRate"
        },
        {
            title: 'No. of loanees',
            sortable: true,
            id: 'noOfLoan'
        },
        {
            title: 'Cost of funds',
            sortable: true,
            id: 'costOfFund'
        },
        {
            title: 'Amount disbursed',
            sortable: true,
            id: 'AmountDisbursed'
        },
        {
            title: 'Amount repaid',
            sortable: true,
            id: 'AmountRepaid'
        },
        {
            title: 'Amount earned',
            sortable: true,
            id: 'AmountEarned'
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
                        type="search" id={`search`} placeholder={"Search"} required/>
                </div>
                <div id={`createProduct`}>
                    <Button variant={"secondary"}
                            size={"lg"}
                            className={`bg-meedlBlue h-12 py-5 px-6 hover:bg-meedlBlue focus-visible:ring-0 shadow-none`}
                            >Create loan product</Button>
                </div>
            </div>

            <div id={`table`} className={`pt-8`}>
                <Tables
                    tableData={loanProductData}
                    handleRowClick={handleRowClick}
                    tableHeader={columns}
                    tableHeight={52}
                    sx='cursor-pointer'
                    staticColunm="loanProductName"
                    staticHeader="Loan Product"
                    showKirkBabel={false}
                    kirkBabDropdownOption={dropDownOption}
                    tableCellStyle={"h-12"}
                    optionalRowsPerPage={10}
                />
            </div>
            <div className={`md:max-w-sm`} id={`AddTraineeDiv`}>
                {/*<TableModal*/}
                {/*    isOpen={createProduct}*/}
                {/*    closeModal={() => setCreateProduct(false)}*/}
                {/*    closeOnOverlayClick={true}*/}
                {/*    icon={Cross2Icon}*/}
                {/*    headerTitle={`Create loan Product`}*/}
                {/*    width="30%"*/}
                {/*>*/}
                {/*    <CreateLoanProduct setIsOpen={() => setCreateProduct(false)}/>*/}
                {/*</TableModal>*/}

            </div>
        </main>
    );
}

export default LoanProductPage;
