"use client";
import React,{useState,useEffect} from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import { inter } from '@/app/fonts'
import InvestmentActionBar from '@/components/portfolio-manager/fund/Investment-action-bar'
// import { fund } from '@/utils/LoanRequestMockData/Index';
import { formatAmount} from '@/utils/Format';
import { MdOutlinePayments } from 'react-icons/md';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import CreateInvestmentVehicle from '@/components/portfolio-manager/fund/Create-investment-vehicle';
import { useRouter } from 'next/navigation'
import { setItemSessionStorage } from '@/utils/storage';
import { useGetAllInvestmentmentVehicleQuery } from '@/service/admin/fund_query';
import { formatMonthInDate } from '@/utils/Format';

interface TableRowData {
  [key: string]: string | number | null | React.ReactNode;
 }


const tabData = [
  {name:"Commercial funds",
      value: "commercialFund"
    },
    {
      name:"Endowment funds",
      value: "endowmentFund"
    },
]

 interface investmentVehicleProps extends TableRowData {
  id: string,
  name: string,
  investmentVehicleType: string,
  mandate: string,
  sponsors: string,
  tenure: string,
  size: number,
  rate: number,
  fundRaisingStatus: string,
  totalAmountInInvestmentVehicle: string,
  amountRaised: string,
  amountDisbursed: string,
  amountAvailable: string,
  totalIncomeGenerated: string,
  netAssetValue: string
}



const InvestmentVehicle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [viewAllInvestmentVehicle, setViewAllInvestmentVehicle] = useState<investmentVehicleProps[]>([]);

  const dataElement = {
    pageNumber: 0,
    pageSize: 200
}
 
 const { data: investmentVehicleData } = useGetAllInvestmentmentVehicleQuery(dataElement)
  const router = useRouter()


  useEffect(()=> {
    if(investmentVehicleData && investmentVehicleData.data) {
      setViewAllInvestmentVehicle(investmentVehicleData.data)
    }
  })

  const handleDraftClick = () => {

  }
   const handleCreateInvestmentVehicleClick = () => {
    setModalType('commercial');
    setIsModalOpen(true);
  }

  const handleCreateInvestmentDonorClick = () => {
     setModalType('endowment');
      setIsModalOpen(true);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
    // setSearchTerm(event.target.value);
    console.log(event)
  };
  
  const fundHeader = [
    { title: <div className='h-11 flex justify-center items-center'>Vehicle</div> , sortable: true, id: 'name', selector: (row:TableRowData ) => row.name},
    { title: 'Start Date', sortable: true, id: 'startDate', selector: (row:TableRowData ) => formatMonthInDate(row?.startDate)},
      { title: 'Tenure(Months)', sortable: true, id: 'tenure', selector: (row: TableRowData) => row.tenure },
      { title: 'vehicle Size', sortable: true, id: 'size', selector: (row:TableRowData) => <div className=''>{formatAmount(row.size)}</div> },
      { title: 'InterestRate (%)', sortable: true, id: ' rate', selector: (row:TableRowData) => row. rate},
      { title: 'Amount Collected', sortable: true, id: 'amountRaised', selector: (row:TableRowData) => <div className='ml-4'>{formatAmount(row.amountRaised)}</div> },
      { title: 'Amount Disbursed', sortable: true, id: ' amountDisbursed', selector: (row:TableRowData) => <div className='ml-6'>{formatAmount(row.amountDisbursed)}</div> },
      { title: 'Amount Available', sortable: true, id: 'amountAvailable', selector: (row:TableRowData) =>  <div className='ml-8'>{formatAmount(row.amountAvailable)}</div> },
  ]
    
    
  const handleRowClick = (row:TableRowData) => {
    router.push('/funds/details')  
    setItemSessionStorage('investmentVehicleId', String(row.id));
}


const commercial = viewAllInvestmentVehicle.filter( vehicle => vehicle.investmentVehicleType === 'COMMERCIAL');
const endowment = viewAllInvestmentVehicle.filter( vehicle => vehicle.investmentVehicleType === 'ENDOWMENT');
  
  const tabContent = [
    {
      actionBar: <div>
        <InvestmentActionBar 
           id='commercialFundId'
           value=''
           onChange={handleSearchChange}
           handleDraftClick={handleDraftClick}
           handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
        />
      </div>,
      value: "commercialFund",
      table: <div>
        <Tables
          tableData={commercial.slice().reverse()}
          handleRowClick={handleRowClick}
          tableHeader={fundHeader}
           tableHeight={52}
           sx='cursor-pointer'
           tableCellStyle={'h-12'}
            optionalRowsPerPage={10}
            staticHeader={'Vehicle'}
           staticColunm={'name'}
           icon={MdOutlinePayments}
           sideBarTabName='Fund'
           optionalFilterName='Commercial'
           condition={true}
        />
      </div>
    },
    {
      actionBar: <div>
         <InvestmentActionBar 
          id='endowmentFundId'
          value=''
          onChange={handleSearchChange}
          handleDraftClick={handleDraftClick}
          handleCreateInvestmentVehicleClick={handleCreateInvestmentDonorClick}
         />
      </div>,
      value: "endowmentFund",
      table: <div>
        <Tables
          tableData={endowment.slice().reverse()}
          handleRowClick={handleRowClick}
          tableHeader={fundHeader}
           tableHeight={52}
           optionalRowsPerPage={10}
           staticHeader={'Vehicle'}
           staticColunm={'name'}
            tableCellStyle={'h-12'}
            icon={MdOutlinePayments}
            sideBarTabName='Fund'
            optionalFilterName='Endowment'
            condition={true}
            sx='cursor-pointer'
        />
      </div>
    }
  ]


  return (
    <div className={`px-6 py-5 ${inter.className}`}>
     <Tabs defaultValue='commercialFund'>
      <TabsList className= {`z-50 `}>
      {tabData.map((tab,index) => (
            <TabsTrigger data-testid={`tabDataName${tab.value}`}  value={tab.value} key={index}>
                {tab.name}
          </TabsTrigger>
          ))}
      </TabsList>
      {
          tabContent.map((tab, index) => (
            <TabsContent key={index} value={tab.value}  className='mt-5'>
                <div className='mt-8'>
                  {tab.actionBar}
                </div>
                <div className='mt-6'>
                  {tab.table}
                </div>
            </TabsContent>
          ))
        }
     </Tabs>
      <div>
        {
          <TableModal
           isOpen={isModalOpen}
           closeModal={()=> setIsModalOpen(false)}
           className='pb-1'
           headerTitle='Create Investment'
           closeOnOverlayClick={true}
           icon={Cross2Icon}
          >
          
            {modalType === 'commercial' ? ( <CreateInvestmentVehicle setIsOpen={() => setIsModalOpen(false)} type='sponsor' investmentVehicleType='COMMERCIAL' />  ) : ( <CreateInvestmentVehicle setIsOpen={() => setIsModalOpen(false)} type='donor' investmentVehicleType='ENDOWMENT'/> )}
          </TableModal>
        }
      </div>
     
    </div>
  )
}

export default InvestmentVehicle