"use client";
import React, {useState,useEffect} from 'react';
import SearchInput from "@/reuseable/Input/SearchInput";
import SearchEmptyState from "@/reuseable/emptyStates/SearchEmptyState";
import {MdOutlinePerson, MdSearch} from "react-icons/md";
import {useAppSelector} from "@/redux/store";
import {useGetAllLoaneeInALoanProductQuery, useSearchLoaneesInALoanProductQuery} from "@/service/admin/loan_product";
import { useDebounce } from '@/hooks/useDebounce';
import Table from '@/reuseable/table/Table';
import { formatAmount,formatToTwoDecimals,formatPercentage } from '@/utils/Format';
import styles from "@/components/super-admin/staff/index.module.css"
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from "@radix-ui/react-icons";
import LoaneeModalDetail from './Loanee-modalDetail';
import {capitalizeFirstLetters,getLoanStatusDisplay} from "@/utils/GlobalMethods";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode ;
}

export interface LoanMetrics {
    instituteName: string;
    amountEarned: string; 
    amountDisbursed: string; 
    loaneeName: string;
    loanOutstanding: string; 
    performance: string;
    interestEarned: string;
    amountRepaid: string;

}




export function Loanees() {
    const id = useAppSelector(state => (state?.loanProduct?.loanProductId))
    const [loanProductId] = useState(id);
    const [searchTerm, setSearchTerm] = useState('');
    const [page,setPageNumber] = useState(0);
    const [pageSearchNumber, setSearchPageNumber] = useState(0)
    const [totalPage,setTotalPage] = useState(0)
     const [hasNextPage,setNextPage] = useState(false)
     const [searchHasasNextPage,setSearchNextPage] = useState(false)
     const [isOpen,setIsOpen] = useState(false)
     const [loanMetrics, setLoanMetrics] = useState<LoanMetrics>({
        instituteName: "",
        amountEarned: "",
        amountDisbursed: "",
        loaneeName: "",
        loanOutstanding: "",
        performance: "",
        interestEarned: "",
        amountRepaid: ""
    });
    const size = 10;

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const {data: allLoanee, isLoading:allLoaneeIsLoading,isFetching} = useGetAllLoaneeInALoanProductQuery({
        loanProductId: id,
        pageSize: size,
        pageNumber: page
    }, { skip: !loanProductId});

    const {data: searchResults, isLoading,isFetching: isfetching} = useSearchLoaneesInALoanProductQuery({
        loanProductId: id,
        name: debouncedSearchTerm,
        pageSize: size,
        pageNumber: pageSearchNumber
    }, {skip: !debouncedSearchTerm|| !loanProductId})


    useEffect(() => {
        if(!debouncedSearchTerm){
            setSearchPageNumber(0)
        }
    },[debouncedSearchTerm])

    useEffect(() => {
        if (debouncedSearchTerm && searchResults?.data?.body) {
            setSearchNextPage(searchResults?.data?.hasNextPage)
            setTotalPage(searchResults?.data?.totalPages)
            setSearchPageNumber(searchResults?.data?.pageNumber)
        } else if (!debouncedSearchTerm && allLoanee?.data?.body) {
            setNextPage( allLoanee?.data?.hasNextPage)
            setTotalPage( allLoanee?.data?.totalPages)
            setPageNumber( allLoanee?.data?.pageNumber)
        }
    }, [debouncedSearchTerm, searchResults, allLoanee]);

    const getTableData = () => {
        if (!allLoanee?.data?.body) return [];
        if (debouncedSearchTerm) return searchResults?.data?.body || [];
        return allLoanee?.data?.body;
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


      const handleRowClick = (row: TableRowData) => {
        const fullName = capitalizeFirstLetters(row?.firstName?.toString())  + " " + capitalizeFirstLetters(row.lastName?.toString()) 
        setLoanMetrics({
            instituteName: row?.instituteName as string,
            amountEarned: formatAmount(row?.amountEarned),
            amountDisbursed: formatAmount(row?.amountDisbursed),
            loaneeName: fullName,
            loanOutstanding: formatAmount(row?.loanOutstanding),
            performance: row?.performance as string,
            interestEarned:formatPercentage(row?.interestEarned),
            amountRepaid: formatAmount(row?.amountRepaid)
        })
         setIsOpen(true)
     }

    const LoanProductLoaneeHeader = [
        {title: "Name", sortable: true, id: "name",
            selector: (row: TableRowData) =>
                `${(row.firstName as string).charAt(0).toUpperCase()}${(row.firstName as string).slice(1).toLowerCase()} ${(row.lastName as string).charAt(0).toUpperCase()}${(row.lastName as string).slice(1).toLowerCase()}`
        },
        {title: "Organization", sortable: true, id: "instituteName", selector: (row: TableRowData) => row.instituteName},
        {title: <div className=''>Loan status</div>, sortable: true, id: "performance", selector: (row: TableRowData) => <span
                className={` pt-1 pb-1 pr-3 pl-3 truncate  rounded-xl ${row.performance  === "PERFORMING" ? "text-[#063F1A] bg-[#D0D5DD]" : row.performance  === "IN_MORATORIUM" ?  "bg-[#FEF6E8] text-[#66440A]" : "text-[#C1231D] bg-[#FBE9E9]" } `}>
                {getLoanStatusDisplay(row.performance as string) }
            </span>
        },
        {title: <div className='md:relative left-6 z-50'>Interest earned(%)</div>, sortable: true, id: "interestEarned", selector: (row: TableRowData) => <div className='truncate md:relative left-6 z-10'>{formatToTwoDecimals(row?.interestEarned)}</div>},
        {title: "Amount disbursed", sortable: true, id: "amountDisbursed", selector: (row: TableRowData) => formatAmount(row?.amountDisbursed)},
        {title: "Loan outstanding", sortable: true, id: "loanOutstanding", selector: (row: TableRowData) => formatAmount(row?.loanOutstanding)},

    ];
    return (
        <div 
        className={` max-h-[63vh] mb-4 ${styles.container}`}
        style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',  
              }}
        >
            <div id={`loanProductTab2`} className={'grid gap-4 mt-5'}>
                <SearchInput id={'loanProductLoaneeSearch'} value={searchTerm} onChange={handleSearchChange}/>
                <div>
                    {!isTyping && debouncedSearchTerm && searchResults?.data.body.length === 0 ? <div><SearchEmptyState icon={MdSearch} name='loanee'/></div> :
                        <Table
                            tableData={getTableData()}
                            tableHeader={LoanProductLoaneeHeader}
                            staticHeader={'loanee'}
                            staticColunm={'name'}
                            tableHeight={ allLoanee?.data?.body?.length < 10 || searchResults?.data?.body?.length < 10 ? 60 : undefined}
                            icon={MdOutlinePerson}
                            sideBarTabName={"loanee"}
                            handleRowClick={handleRowClick}
                            tableCellStyle={'h-12'}
                            condition={true}
                            isLoading={isLoading || allLoaneeIsLoading || isFetching || isfetching}
                            hasNextPage={searchTerm? searchHasasNextPage : hasNextPage}
                            pageNumber={searchTerm? pageSearchNumber : page}
                            setPageNumber={searchTerm? setSearchPageNumber : setPageNumber}
                            totalPages={totalPage}
                            sx='cursor-pointer'
                        />}
                </div>
            </div>

            <div>
                <Modal
                 isOpen={isOpen}
                 closeModal={()=> setIsOpen(false)}
                 className='pb-1'
                closeOnOverlayClick={true}
                icon={Cross2Icon}
                 width='36%'
                 styeleType='styleBodyTwo'
                >
         <LoaneeModalDetail
          loanMetricsObject={loanMetrics}
         />
                </Modal>
            </div>
        </div>
    );
}
