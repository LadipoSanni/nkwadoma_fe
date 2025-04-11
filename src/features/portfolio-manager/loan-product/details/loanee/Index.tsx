"use client";
import React, {useState,useEffect} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import Tables from "@/reuseable/table/LoanProductTable";
import {useAppSelector} from "@/redux/store";
import {useGetAllLoaneeInALoanProductQuery, useSearchLoaneesInALoanProductQuery} from "@/service/admin/loan_product";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode ;
}

interface loanDetails extends TableRowData{
    firstName: string;
    lastName: string;
    performance: string;
    instituteName: string;
}

export function Loanees() {
    const id = useAppSelector(state => (state.selectedLoan.clickedLoanProductId))
    const [loanProductId] = useState(id);
    const [loanees, setLoanees] = useState<loanDetails[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [page] = useState(0);
    const size = 100;

    const {data: allLoanee, isLoading:allLoaneeIsLoading} = useGetAllLoaneeInALoanProductQuery({
        loanProductId: id,
        pageSize: size,
        pageNumber: page
    }, {refetchOnMountOrArgChange: true, skip: !loanProductId});

    const {data: searchResults, isLoading} = useSearchLoaneesInALoanProductQuery({
        loanProductId: id,
        name: searchTerm,
    }, {skip: !searchTerm || !loanProductId})

    useEffect(() => {
        if (searchTerm && searchResults?.data?.body) {
            setLoanees(searchResults.data.body);
        } else if (!searchTerm && allLoanee?.data?.body) {
            setLoanees(allLoanee.data.body);
        }
    }, [searchTerm, searchResults?.data?.body, allLoanee?.data?.body]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const LoanProductLoaneeHeader = [
        {title: "Name", sortable: true, id: "name",
            selector: (row: TableRowData) =>
                `${(row.firstName as string).charAt(0).toUpperCase()}${(row.firstName as string).slice(1).toLowerCase()} ${(row.lastName as string).charAt(0).toUpperCase()}${(row.lastName as string).slice(1).toLowerCase()}`
        },
        {title: "Status", sortable: true, id: "performance", selector: (row: TableRowData) => <span
                className={` pt-1 pb-1 pr-3 pl-3   rounded-xl ${row.performance  === "PERFORMANCE" ? "text-success600 bg-success50" : "text-error600 bg-error50"} `}>
                {row.performance ?? "No record"}
            </span>
        },
        {title: "Institution", sortable: true, id: "instituteName", selector: (row: TableRowData) => row.instituteName},

    ];
    return (
        <div>
            <div id={`loanProductTab2`} className={'grid gap-4'}>
                <SearchInput id={'loanProductLoaneeSearch'} value={searchTerm} onChange={handleSearchChange}/>
                <div>
                    {searchTerm && loanees.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='Loanee'/></div> :
                        <Tables
                            tableData={loanees}
                            tableHeader={LoanProductLoaneeHeader}
                            staticHeader={'Loanee'}
                            staticColunm={'name'}
                            tableHeight={45}
                            icon={MdOutlinePerson}
                            sideBarTabName={"Loanee"}
                            handleRowClick={() => {
                            }}
                            optionalRowsPerPage={10}
                            tableCellStyle={'h-12'}
                            condition={true}
                            isLoading={isLoading || allLoaneeIsLoading}
                        />}
                </div>
            </div>
        </div>
    );
}
