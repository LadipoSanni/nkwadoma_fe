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
import { clearAll } from '@/redux/slice/multiselect/vehicle-multiselect';




interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}


interface investmentVehicleProps     {
    id: string,
    name: string,
    investmentVehicleType: string,
    mandate: string,
    sponsors: string,
    tenure: number,
    size: number,
    rate: number,
    fundRaisingStatus?: string,
    totalAmountInInvestmentVehicle: number,
    amountRaised?: string,
    amountDisbursed?: string,
    totalAvailableAmount?: number,
    totalIncomeGenerated?: string,
    netAssetValue?: string
}

function EndownmentFund() {
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber,setPageNumber] = useState(0)
    const [viewAllInvestmentVehicle, setViewAllInvestmentVehicle] = useState<investmentVehicleProps[]>([]);
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const param = {
        investmentVehicleType: "ENDOWMENT",
        investmentVehicleStatus: "PUBLISHED",
        pageSize: 10,
        pageNumber: pageNumber
    }
    const router = useRouter()

    const {data:investmentVehicleData,isLoading} = useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery({
        pageSize: 10,
        pageNumber: pageNumber,
        investmentVehicleType: 'ENDOWMENT',
        investmentVehicleStatus: "PUBLISHED",
    })

     const {data: searchData} = useSearchInvestmentVehicleByNameAndTypeQuery({ investmentVehicleName: searchTerm,param},{skip: !searchTerm})

     useEffect(() => {
             if (searchTerm && searchData && searchData?.data) {
                 const result = searchData?.data?.body
                 setViewAllInvestmentVehicle(result)
                 setNextPage(searchData?.data?.hasNextPage)
                 setTotalPage(searchData?.data?.totalPages)
                 setPageNumber(searchData?.data?.pageNumber)
             } else if (investmentVehicleData && investmentVehicleData.data) {
                 setViewAllInvestmentVehicle(investmentVehicleData?.data?.body)
                  setNextPage(investmentVehicleData?.data?.hasNextPage)
                  setTotalPage(investmentVehicleData?.data?.totalPages)
                  setPageNumber(investmentVehicleData?.data?.pageNumber)
             }
             store.dispatch(resetAll())
             store.dispatch(clearAll())
              store.dispatch(clearSaveCreateInvestmentField())
         }, [searchTerm, searchData, investmentVehicleData])

     

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
    };

    const handleEndowerFundDraftClick = () => {
        router.push("/vehicle/draft")
        store.dispatch(setVehicleType("endowment")) 
        store.dispatch(setInvestmentVehicleType("ENDOWMENT")) 
    
    }

    const handleCreateInvestmentVehicleClick = () => {
        router.push("/vehicle/setup")
        store.dispatch(setVehicleType("endowment")) 
        store.dispatch(setInvestmentVehicleType("ENDOWMENT"))    
    }


    const handleRowClick = (row: TableRowData) => {
            store.dispatch(setCurrentVehicleId(String(row.id)));
            store.dispatch(setVehicleType("endowment"))
            router.push('/vehicle/details')
        }

        const tableData = viewAllInvestmentVehicle as unknown as TableRowData[]
    

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
            {title: 'Tenure(months)', sortable: true, id: 'tenure', selector: (row: TableRowData) => row.tenure},
            {
                title: <div className='md:pr-5 md:pl-8 relative md:right-6 '>Vehicle size</div>,
                sortable: true,
                id: 'size',
                selector: (row: TableRowData) => <div className=''>{formatAmount(row.size)}</div>
            },
            {
                title: 'Interest rate(%)',
                sortable: true,
                id: ' rate',
                selector: (row: TableRowData) => <div>{row.rate}</div>
            },
            {
                title: 'Amount collected',
                sortable: true,
                id: 'amountRaised',
                selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountRaised)}</div>
            },
            {
                title: 'Amount disbursed',
                sortable: true,
                id: ' amountDisbursed',
                selector: (row: TableRowData) => <div className=''>{formatAmount(row.amountDisbursed)}</div>
            },
            {
                title: 'Amount available',
                sortable: true,
                id: 'amountAvailable',
                selector: (row: TableRowData) => <div className=''>{formatAmount(row.totalAvailableAmount)}</div>
            },
        ]

  return (
    <div className={`py-5 ${inter.className}`}>
      <div>
      <InvestmentActionBar
                    id='endowmentFundId'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleDraftClick={handleEndowerFundDraftClick}
                    handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
                    buttonName='Set up endowment vehicle'
                />
      </div>
        <div>
            { searchTerm && viewAllInvestmentVehicle.length === 0? <div>
                <SearchEmptyState icon={MdSearch} name='Endowment vehicle'/>
            </div> : <div  className='mt-6'>
                <Table
                tableData={tableData} 
                tableHeader={fundHeader}
                handleRowClick={handleRowClick}
                tableHeight={54}
                sx='cursor-pointer'
                tableCellStyle={'h-12'}
                optionalFilterName='endownment'
                condition={true}
                sideBarTabName='fund'
                icon={MdOutlinePayments}
                staticHeader={"Vehicle"}
                staticColunm={'name'}
                hasNextPage={hasNextPage}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                 totalPages={totalPage}
                 isLoading={isLoading}
                />
                </div>}
        </div>
       <div>
       </div>
    </div>
  )
}

export default EndownmentFund

