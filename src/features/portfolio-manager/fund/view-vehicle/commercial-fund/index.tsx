"use client";
import React,{useState,useEffect} from 'react'
import InvestmentActionBar from '@/components/portfolio-manager/fund/Investment-action-bar'
import {inter} from '@/app/fonts'
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import {MdSearch} from 'react-icons/md'
import Table from '@/reuseable/table/Table';
import {store} from "@/redux/store";
import {setCurrentVehicleId,setVehicleType} from "@/redux/slice/vehicle/vehicle";
import {formatMonthInDate} from '@/utils/Format';
import {formatAmount} from '@/utils/Format';
import {MdOutlinePayments} from 'react-icons/md';
import {useRouter} from 'next/navigation'
import {useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery,useSearchInvestmentVehicleByNameAndTypeQuery} from "@/service/admin/fund_query";
import { setInvestmentVehicleType } from '@/redux/slice/vehicle/vehicle';
import { resetAll,clearSaveCreateInvestmentField} from '@/redux/slice/vehicle/vehicle';
import { clearAll} from '@/redux/slice/multiselect/vehicle-multiselect';
import { useDebounce } from '@/hooks/useDebounce';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}


// interface investmentVehicleProps     {
//     id: string,
//     name: string,
//     investmentVehicleType: string,
//     mandate: string,
//     sponsors: string,
//     tenure: number,
//     size: number,
//     rate: number,
//     fundRaisingStatus?: string,
//     totalAmountInInvestmentVehicle: number,
//     amountRaised?: string,
//     amountDisbursed?: string,
//     totalAvailableAmount?: number,
//     totalIncomeGenerated?: string,
//     netAssetValue?: string
// }


function CommercialFund() {
    const [searchTerm, setSearchTerm] = useState('');
       const [pageNumber,setPageNumber] = useState(0)
        const [hasNextPage,setNextPage] = useState(false)
        const [totalPage,setTotalPage] = useState(0)
        const [pageSearchNumber,setPageSearchNumber] = useState(0)
        
        const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);
        
        const param = {
            investmentVehicleType: "COMMERCIAL",
             investmentVehicleStatus: "PUBLISHED",
            pageSize: 10,
            pageNumber: pageSearchNumber
        }
        const router = useRouter()
        
    
        const {data:investmentVehicleData,isLoading,isFetching} = useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
            pageSize: 10,
            pageNumber: pageNumber,
            investmentVehicleType: 'COMMERCIAL',
            investmentVehicleStatus: "PUBLISHED"
        })
        
         const {data: searchData,isFetching: isfetching,isLoading: isSearchLoading} = useSearchInvestmentVehicleByNameAndTypeQuery({ investmentVehicleName: debouncedSearchTerm,param},{skip: !debouncedSearchTerm})

         const getTableData = () => {
            if (!investmentVehicleData?.data?.body) return [];
            if (debouncedSearchTerm) return searchData?.data?.body || [];
            return investmentVehicleData?.data?.body;
        }
    
         useEffect(() => {
                 if (debouncedSearchTerm && searchData && searchData?.data) {
                     setNextPage(searchData?.data?.hasNextPage)
                     setTotalPage(searchData?.data?.totalPages)
                     setPageSearchNumber(searchData?.data?.pageNumber)
                 } else if (!debouncedSearchTerm && investmentVehicleData && investmentVehicleData.data) {
                    setNextPage(investmentVehicleData?.data?.hasNextPage)
                    setTotalPage(investmentVehicleData?.data?.totalPages)
                    setPageNumber(investmentVehicleData?.data?.pageNumber)
                 }
                 store.dispatch(resetAll())
                 store.dispatch(clearAll())
                 store.dispatch(clearSaveCreateInvestmentField())
             }, [debouncedSearchTerm, searchData, investmentVehicleData])
    
    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
    };

    const handleCommercialFundDraftClick = () => {
        router.push("/vehicle/draft")
        store.dispatch(setVehicleType("commercial"))
        store.dispatch(setInvestmentVehicleType("COMMERCIAL"))    
      
    }

    const handleCreateInvestmentVehicleClick = () => {
        router.push("/vehicle/setup")
        store.dispatch(setVehicleType("commercial"))
        store.dispatch(setInvestmentVehicleType("COMMERCIAL"))    
    }

     const handleRowClick = (row: TableRowData) => {
                store.dispatch(setCurrentVehicleId(String(row.id)));
                store.dispatch(setVehicleType("commercial"))
                router.push('/vehicle/details')
    }


        const fundHeader = [
                {
                    title: <div className='h-11 flex justify-center items-center'>Vehicle</div>,
                    sortable: true,
                    id: 'name',
                    selector: (row: TableRowData) => row.name
                },
                {
                    title: 'Start date',
                    sortable: true,
                    id: 'startDate',
                    selector: (row: TableRowData) => formatMonthInDate(row?.startDate)
                },
                {title: 'Tenure', sortable: true, id: 'tenure', selector: (row: TableRowData) => row.tenure},
                {
                    title: <div className='md:pr-5 md:pl-8 relative md:right-6 '>Vehicle size</div>,
                    sortable: true,
                    id: 'size',
                    selector: (row: TableRowData) => <div className="truncate">{formatAmount(row.size)}</div>
                },
                {
                    title: 'Interest rate(%)',
                    sortable: true,
                    id: ' rate',
                    selector: (row: TableRowData) => <div className="truncate">{row.rate}</div>
                },
                {
                    title: 'Amount collected',
                    sortable: true,
                    id: 'amountRaised',
                    selector: (row: TableRowData) => <div  className="truncate">{formatAmount(row.amountRaised)}</div>
                },
                {
                    title: 'Amount disbursed',
                    sortable: true,
                    id: ' amountDisbursed',
                    selector: (row: TableRowData) => <div className="truncate">{formatAmount(row.amountDisbursed)}</div>
                },
                {
                    title: 'Amount available',
                    sortable: true,
                    id: 'amountAvailable',
                    selector: (row: TableRowData) => <div className="truncate">{formatAmount(row.totalAvailableAmount)}</div>
                },
            ]

  return (
    <div className={` py-5 ${inter.className}`}>
      <div>
      <InvestmentActionBar
                    id='commercialFundId'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleDraftClick={handleCommercialFundDraftClick}
                    handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
                     buttonName='Set up commercial vehicle'
                />
      </div>
      <div>
            { !isTyping && debouncedSearchTerm && searchData?.data?.body.length === 0? <div>
                <SearchEmptyState icon={MdSearch} name='Commercial vehicle'/>
            </div> : <div  className='mt-6'>
                <Table
                tableData={getTableData()} 
                tableHeader={fundHeader}
                handleRowClick={handleRowClick}
                tableHeight={54}
                sx='cursor-pointer'
                tableCellStyle={'h-12'}
                optionalFilterName='commercial'
                condition={true}
                sideBarTabName='fund'
                icon={MdOutlinePayments}
                staticHeader={"Vehicle"}
                staticColunm={'name'}
                hasNextPage={hasNextPage}
                pageNumber={searchTerm !== ""? pageSearchNumber : pageNumber}
                setPageNumber={searchTerm !== ""? setPageSearchNumber :  setPageNumber}
                 totalPages={totalPage}
                 isLoading={isLoading || isSearchLoading || isFetching || isfetching}
                />
                </div>}
        </div>
       <div>
       </div>
       
    </div>
  )
}

export default CommercialFund
