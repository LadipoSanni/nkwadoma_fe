"use client";
import React,{useState,useEffect} from 'react'
import InvestmentActionBar from '@/components/portfolio-manager/fund/Investment-action-bar'
import {inter} from '@/app/fonts'
import Draft from "@/features/portfolio-manager/fund/draft/Index";
import CreateInvestmentVehicle from '@/components/portfolio-manager/fund/Create-investment-vehicle';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import { useGetInvestmentVehiclesByTypeAndStatusQuery } from '@/service/admin/fund_query';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import {MdSearch} from 'react-icons/md'
import {useSearchInvestmentVehicleByNameQuery} from '@/service/admin/fund_query'
import Table from '@/reuseable/table/Table';
import {store} from "@/redux/store";
import {setCurrentVehicleId} from "@/redux/slice/vehicle/vehicle";
import {formatMonthInDate} from '@/utils/Format';
import {formatAmount} from '@/utils/Format';
import {MdOutlinePayments} from 'react-icons/md';
import {useRouter} from 'next/navigation'



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
    amountAvailable?: string,
    totalIncomeGenerated?: string,
    netAssetValue?: string
}

function EndownmentFund() {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalType, setModalType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageNumber,setPageNumber] = useState(0)
    const [viewAllInvestmentVehicle, setViewAllInvestmentVehicle] = useState<investmentVehicleProps[]>([]);
    const [status,setStatus] = useState("PUBLISHED")
    const [hasNextPage,setNextPage] = useState(false)
    const totalPage = 1
    const router = useRouter()

    const {data:investmentVehicleData} = useGetInvestmentVehiclesByTypeAndStatusQuery({
        pageSize: 10,
        pageNumber: pageNumber,
        type: 'ENDOWMENT',
        status: status
    })
     const {data: searchData} = useSearchInvestmentVehicleByNameQuery(searchTerm, {skip: !searchTerm})

     useEffect(() => {
             if (searchTerm && searchData && searchData?.data) {
                 const result = searchData?.data
                 setViewAllInvestmentVehicle(result)
             } else if (investmentVehicleData && investmentVehicleData.data) {
                 setViewAllInvestmentVehicle(investmentVehicleData?.data)
                //  setNextPage(investmentVehicleData?.hasNextPage)
                 setStatus(status)
             }
         }, [searchTerm, searchData, investmentVehicleData])

     console.log(investmentVehicleData)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
    };

    const handleCommercialFundDraftClick = () => {
        setModalType("draft")
        setIsModalOpen(true);
        setStatus("DRAFT")
    }

    const handleCreateInvestmentVehicleClick = () => {
        setModalType("createEndownmentVehicle")
        setIsModalOpen(true);
    }


    const handleRowClick = (row: TableRowData) => {
            store.dispatch(setCurrentVehicleId(String(row.id)));
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
                title: 'Start Date',
                sortable: true,
                id: 'startDate',
                selector: (row: TableRowData) => formatMonthInDate(row?.startDate)
            },
            {title: 'Tenure(months)', sortable: true, id: 'tenure', selector: (row: TableRowData) => row.tenure},
            {
                title: <div className='md:pr-5 md:pl-8 relative md:right-6 '>vehicle size</div>,
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
                selector: (row: TableRowData) => <div className='ml-4'>{formatAmount(row.amountRaised)}</div>
            },
            {
                title: 'Amount disbursed',
                sortable: true,
                id: ' amountDisbursed',
                selector: (row: TableRowData) => <div className='ml-6'>{formatAmount(row.amountDisbursed)}</div>
            },
            {
                title: 'Amount available',
                sortable: true,
                id: 'amountAvailable',
                selector: (row: TableRowData) => <div className='ml-8'>{formatAmount(row.amountAvailable)}</div>
            },
        ]

  return (
    <div className={`py-5 ${inter.className}`}>
      <div>
      <InvestmentActionBar
                    id='endowmentFundId'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleDraftClick={handleCommercialFundDraftClick}
                    handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
                    buttonName='Set up endownment fund'
                />
      </div>
        <div>
            { searchTerm && viewAllInvestmentVehicle.length === 0? <div>
                <SearchEmptyState icon={MdSearch} name='Endowment fund'/>
            </div> : <div  className='mt-6'>
                <Table
                tableData={tableData} 
                tableHeader={fundHeader}
                handleRowClick={handleRowClick}
                tableHeight={52}
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
                />
                </div>}
        </div>
       <div>
        <TableModal
          isOpen={isModalOpen}
                    closeModal={()=> setIsModalOpen(false)}
                    className='pb-1'
                    headerTitle={modalType === "createEndownmentVehicle"? "Create Investment Vehicle" : "Draft" }
                    closeOnOverlayClick={true}
                    icon={Cross2Icon}
                    width={"38%"}
        >
            {modalType === "createEndownmentVehicle"? (<CreateInvestmentVehicle setIsOpen={() => setIsModalOpen(false)} type='donor' investmentVehicleType='ENDOWMENT' />): (  <Draft setIsOpen={() => setIsModalOpen(false)} type='donor' investmentVehicleType='ENDOWMENT'/>)}

        </TableModal>
       </div>
    </div>
  )
}

export default EndownmentFund

