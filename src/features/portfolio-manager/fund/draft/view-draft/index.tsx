"use client"
import React,{useState,useEffect} from 'react'
import BackButton from '@/components/back-button';
import {useAppSelector} from "@/redux/store";
import { useRouter } from 'next/navigation';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'
import Table from '@/reuseable/table/Table';
import SearchInput from "@/reuseable/Input/SearchInput";
import {formatMonthInDate} from '@/utils/Format';
import {formatAmount} from '@/utils/Format';
import {MdOutlinePayments} from 'react-icons/md';
import {useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery} from "@/service/admin/fund_query";
import { setCreateInvestmentField,setDraftId,clearDraftId} from '@/redux/slice/vehicle/vehicle';
import {store} from "@/redux/store";


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



function ViewDraft() {
    const router = useRouter();
    const vehicleType = useAppSelector(state => (state.vehicle?.vehicleType))
    const investmentType = useAppSelector(state => (state?.vehicle?.setInvestmentVehicleType))
    // const savedFormData = useAppSelector(state => (state?.vehicle?.CreateInvestmentField))
    // const draftId = useAppSelector(state => (state?.vehicle?.setDraftId))
    const [searchTerm, setSearchTerm] = useState("")
    const [pageNumber, setPageNumber] = useState(0);
     const [hasNextPage,setNextPage] = useState(false)
     const [totalPage,setTotalPage] = useState(0)
      const [investmentVehicleDraft, setinvestmentVehicleDraft] = useState<investmentVehicleProps[]>([]);

    const { data, isLoading} = useGetInvestmentVehiclesByTypeAndStatusAndFundRaisingQuery(
            {
                pageSize: 10,
                pageNumber,
                investmentVehicleType : investmentType,
                investmentVehicleStatus: "DRAFT",
            },
            { refetchOnMountOrArgChange: true }
        );


 useEffect(() => {
        
    if(data && data.data) {
        setinvestmentVehicleDraft(data?.data?.body)
       setNextPage(data.data?.hasNextPage)
       setTotalPage(data.data?.totalPages)
       setPageNumber(data?.data?.pageNumber)
    }
   },[data])

const handleRowClick = (row: TableRowData) => {
       store.dispatch(setDraftId(String(row?.id)))
    const investmentVehicleData  = {
        id: String(row?.id),
        name: String(row?.name),
        investmentVehicleType: String(row?.investmentVehicleType),
        mandate: String(row?.mandate),
        tenure: String(row?.tenure),
        size: String(row?.size),
        rate: String(row?.rate),
        trustee: String(row?.trustee),
        custodian: String(row?.custodian),
        bankPartner: String(row?.bankPartner),
        fundManager: String(row?.fundManager),
        startDate: row?.startDate ? String(row.startDate) : "",
        minimumInvestmentAmount:String(row?.minimumInvestmentAmount),
        sponsors: '',
       }
    store.dispatch(setCreateInvestmentField(investmentVehicleData))
    router.push('/vehicle/setup')
    }

    const handleBack=()=> {
        store.dispatch(clearDraftId())
        if(vehicleType === "commercial"){
            router.push("/vehicle/commercial-vehicle")
        }else {
            router.push("/vehicle/endownment-vehicle")
        }
       }

       const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
       }

       const draftHeader = [
        {
                            title: <div className='h-11 flex justify-center items-center'>Vehicle</div>,
                            sortable: true,
                            id: 'name',
                            selector: (row: TableRowData) => row.name
                        },
                        {
                            title: <div className='lg:pl-6 '>Start Date</div>,
                            sortable: true,
                            id: 'startDate',
                            selector: (row: TableRowData) => <div>{row?.startDate? formatMonthInDate(row?.startDate): "_"}</div> 
                        },
                        {title: 'Tenure(months)', sortable: true, id: 'tenure', selector: (row: TableRowData) => <div>{row.tenure?row.tenure: "-"}</div>},
                        {
                            title: <div className='md:pr-5 md:pl-8 relative md:right-6 '>vehicle size</div>,
                            sortable: true,
                            id: 'size',
                            selector: (row: TableRowData) => <div className=''>{row.size? formatAmount(row.size): "_"}</div>
                        },
                        {
                            title: 'Interest rate(%)',
                            sortable: true,
                            id: ' rate',
                            selector: (row: TableRowData) => <div>{row.rate?row.rate : "_"}</div>
                        },
                        {
                            title: 'Amount collected',
                            sortable: true,
                            id: 'amountRaised',
                            selector: (row: TableRowData) => <div className='ml-4'>{row.amountRaised? formatAmount(row.amountRaised) : "-"}</div>
                        },
                        {
                            title: 'Amount disbursed',
                            sortable: true,
                            id: ' amountDisbursed',
                            selector: (row: TableRowData) => <div className='ml-6'>{row.amountDisbursed? formatAmount(row.amountDisbursed): "_"}</div>
                        },
                        {
                            title: 'Amount available',
                            sortable: true,
                            id: 'amountAvailable',
                            selector: (row: TableRowData) => <div className='ml-8'>{row.amountAvailable? formatAmount(row.amountAvailable): "_"}</div>
                        },
       ]

       const tableData = investmentVehicleDraft as unknown as TableRowData[]
       

  return (
    <div className='px-5 py-5'>
       <div>
         <BackButton
           id="createFundBackButton" 
           handleClick={handleBack}
           iconBeforeLetters={true}
           text='Back'
           textColor='' 
         />
        </div>
        <div className='mt-4 text-[24px] mb-3'>
            <p>Draft</p>
        </div>
          <div className='grid grid-cols-1 gap-y-4'>
        <div>
         <SearchInput
          id='searchDraft'
          value={searchTerm}
          onChange={handleChange}
         />
        </div>
         <div>
           <Table
           tableData={tableData} 
           tableHeader={draftHeader}
           handleRowClick={handleRowClick}
           tableHeight={50}
            sx='cursor-pointer'
            tableCellStyle={'h-12'}
            //  optionalFilterName='draft'
             condition={true}
             sideBarTabName='draft'
             icon={MdOutlinePayments}
             staticHeader={"Vehicle"}
             staticColunm={'name'}
             hasNextPage={hasNextPage}
             pageNumber={pageNumber}
             setPageNumber={setPageNumber}
             totalPages={totalPage}
             isLoading={isLoading}
           />
         </div>
         </div>
    </div>
  )
}

export default ViewDraft
