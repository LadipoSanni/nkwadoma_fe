'use client'
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import {inter} from '@/app/fonts'
import { Button } from '@/components/ui/button';
import { formatAmount } from '@/utils/Format';
import { Book } from "lucide-react";
import Modal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation'
import InviteFinanciers from '@/components/portfolio-manager/fund/financier/financiers-step';
import {useAppSelector} from "@/redux/store";
import { useSearchFinancierQuery,useViewFinanciersByInvestmentmentVehicleQuery } from '@/service/admin/financier';
import Table from '@/reuseable/table/Table';
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import { setCurrentFinancierId,setFinancierMode } from '@/redux/slice/financier/financier';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
import  {MdSearch} from 'react-icons/md';
import {store} from "@/redux/store";
import { resetNotification } from '@/redux/slice/notification/notification';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface financials {
  financierType: string,
  organizationName: string,
  userIdentity: {
    email: string,
    firstName: string,
    lastName: string,

  }

}

type viewAllfinancier = financials & TableRowData




function Financiers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const currentVehicleId = useAppSelector(state => (state.vehicle.currentVehicleId))
    const [investmentId] = useState(currentVehicleId);
     const [hasNextPage,setNextPage] = useState(false)
     const [totalPage,setTotalPage] = useState(0)
     const [pageNumber,setPageNumber] = useState(0)
     const [financiers, setFinanciers] = useState<viewAllfinancier[]>([])
    const param = {
      pageNumber: pageNumber,
      pageSize: 10,
      investmentVehicleId: currentVehicleId
      }

      useEffect(()=> {
              store.dispatch(resetNotification())
          })
      

    const {data,isLoading} = useViewFinanciersByInvestmentmentVehicleQuery(param,{skip: !currentVehicleId})
    const {data:searchData} = useSearchFinancierQuery({name:searchTerm, pageNumber: pageNumber, pageSize: 10,investmentVehicleId: currentVehicleId},{skip: !searchTerm})

    useEffect(()=>{
      if(searchTerm && searchData && searchData?.data){
        const result = searchData?.data?.body
        setFinanciers(result)
        setNextPage(searchData?.data?.hasNextPage)
        setTotalPage(searchData?.data?.totalPages)
        setPageNumber(searchData?.data?.pageNumber)
    }
    else if(!searchTerm && data && data.data){
       setFinanciers(data?.data?.body)
       setNextPage(data?.data?.hasNextPage)
       setTotalPage(data?.data?.totalPages)
       setPageNumber(data?.data?.pageNumber)
      }
   },[searchTerm, searchData,data])

    const handleOpenModal = () => {
      setIsOpen(true)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

     const handleRowClick = (row:TableRowData) => {
            store.dispatch(setCurrentFinancierId(String(row?.id)))
             store.dispatch(setFinancierMode("investment"))
             router.push('/funds/financier-details')
           
            
        }

    const financierHeader = [
      { title: 'Financier', sortable: true, id: 'name', selector: (row:viewAllfinancier ) => row?.financierType === "INDIVIDUAL"? row.userIdentity?.firstName + " " + row.userIdentity?.lastName : row?.organizationName},
      { title: <div className='relative md:left-4'>Type</div>, id: 'type', selector: (row:viewAllfinancier) => (
        <span className={`${row.financierType ===  "INDIVIDUAL" ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] px-2 h-5`}>
    {capitalizeFirstLetters(row.financierType)}
</span>
    ) },
      { title: 'No. of investments', sortable: true, id: 'number_of_investments', selector: (row:viewAllfinancier) => row.number_of_investments|| 0 },
      { title: 'Amount invested', sortable: true, id: 'amount_invested', selector: (row:viewAllfinancier) => formatAmount(row.amount_invested)},
      { title: 'Amount earned', sortable: true, id: 'amount_earned', selector: (row:viewAllfinancier) =>formatAmount(row.amount_earned)},
      { title: 'Payout', sortable: true, id: 'payout', selector: (row:viewAllfinancier) => formatAmount(row.payout)},
      { title: 'Portfolio value', sortable: true, id: 'portfolio_value', selector: (row:viewAllfinancier) => formatAmount(row.portfolio_value)},
  
    ]
  return (
    <div  className={`${inter.className}`}>
        <div className={'md:flex  md:justify-between gap-5 grid'}>
        <SearchInput
            id={'financiersSearchInput'}
             value={searchTerm}
            onChange={handleSearchChange}
         />     
         <Button
         
          variant={"secondary"}
          size={"lg"}
          id='inviteFinancierModal'
          className={` bg-meedlBlue text-meedlWhite  h-12 flex justify-center items-center md:max-w-32 w-full cursor-pointer`}
          // className={` bg-neutral650 text-meedlWhite  h-12 flex justify-center items-center md:max-w-32 w-full cursor-auto`}
          onClick={handleOpenModal}
         >
          Invite financier
         </Button>
        </div>
        <div className='mt-6 '>
        {searchTerm && financiers.length === 0 ? (
              <div>
                  <SearchEmptyState icon={MdSearch} name="Financier" />
              </div>
          ) : (
          <Table
             tableData={financiers}
             tableHeader={financierHeader}
             handleRowClick={handleRowClick}
             tableHeight={52}
            icon={<Book/>}
            sideBarTabName='financier'
            condition={true}
            staticHeader={"financier"}
            staticColunm={"name"}
            sx='cursor-pointer'
            hasNextPage={hasNextPage}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalPages={totalPage}
            isLoading={isLoading}
          />
          )}
        </div>
        <div>
          <Modal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          headerTitle='Invite financier'
          closeOnOverlayClick={true}
          icon={Cross2Icon}
          width='36%'
          >
           <InviteFinanciers 
           investmentId={investmentId} 
           setIsOpen={setIsOpen} 
           amountCommitedAndDesignationCondition={true}
           isDesignationRequired={true}
           />
          </Modal>
        </div>
    </div>
  )
}

export default Financiers