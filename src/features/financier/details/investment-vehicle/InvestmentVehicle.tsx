'use client'
import React,{useState,useEffect} from 'react'
import SearchInput from "@/reuseable/Input/SearchInput";
import {inter} from '@/app/fonts'
import { formatAmount } from '@/utils/Format';
import { Book } from "lucide-react";
import { useRouter } from 'next/navigation'
import {useAppSelector} from "@/redux/store";
import {useViewFinancierVehiclesQuery} from '@/service/admin/financier';
import Table from '@/reuseable/table/Table';
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import {setFinancierInvestmentVehicleId, setFinancierMode} from '@/redux/slice/financier/financier';
import {store} from "@/redux/store";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface financials {
    investmentVehicleType: string,
    organizationName: string,
    userIdentity: {
        email: string,
        firstName: string,
        lastName: string,

    }

}

type viewAllfinancier = financials & TableRowData




function InvestmentVehicle() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter()
    const activeAndInvitedFinancierId = useAppSelector(state => (state.financier.activeAndInvitedFinancierId))
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    const [financiers, setFinanciers] = useState<viewAllfinancier[]>([])
    const param = {
        pageNumber: pageNumber,
        pageSize: 10,
        financierId: activeAndInvitedFinancierId
    }

    const {data,isLoading} = useViewFinancierVehiclesQuery(param,{skip: !activeAndInvitedFinancierId})

    useEffect(()=>{
        if(data && data.data){
            setFinanciers(data?.data?.body)
            setNextPage(data?.data?.hasNextPage)
            setTotalPage(data?.data?.totalPages)
            setPageNumber(data?.data?.pageNumber)
        }
    },[data])

    // const handleOpenModal = () => {
    //     setIsOpen(true)
    // }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (row:TableRowData) => {
        store.dispatch(setFinancierInvestmentVehicleId(String(row?.id)))
        store.dispatch(setFinancierMode("investment"))
        router.push('/financier/financier-investment-details')


    }

    const financierHeader = [
        { title: 'Name', sortable: true, id: 'name', selector: (row:viewAllfinancier ) => row?.investmentVehicleName},
        // { title: 'Type', sortable: true, id: 'type', selector: (row:viewAllfinancier) => <div className='w-full flex justify-center items-center '><div className={`${row.financierType === "INDIVIDUAL"? "text-[#68442E] bg-warning50 ": "text-[#142854] bg-[#EEF5FF]"} px-2 rounded-xl relative md:right-[12px]  `}>{capitalizeFirstLetters(row.financierType)}</div></div> },
        { title: <div className='relative md:left-4'>Type</div>, id: 'type', selector: (row:viewAllfinancier) => (
                <span className={`${row.investmentVehicleType ===  "ENDOWMENT" ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] px-2 h-5`}>
    {capitalizeFirstLetters(row.investmentVehicleType)}
</span>
            ) },
        { title: 'Date invested', sortable: true, id: 'number_of_investments', selector: (row:viewAllfinancier) => row.dateInvested|| 0 },
        { title: 'Amount invested', sortable: true, id: 'amount_invested', selector: (row:viewAllfinancier) => formatAmount(row.amountInvested)},
        { title: 'Income earned', sortable: true, id: 'amount_earned', selector: (row:viewAllfinancier) =>formatAmount(row.incomeEarned)},
        { title: 'Net asset value', sortable: true, id: 'payout', selector: (row:viewAllfinancier) => formatAmount(row.netAssertValue)},
        { title: 'Portfolio value', sortable: true, id: 'portfolio_value', selector: (row:viewAllfinancier) => formatAmount(row.portfolioValue)},

    ]
    return (
        <div  className={`${inter.className}`}>
            <div className={'md:flex  md:justify-between gap-5 grid'}>
                <SearchInput
                    id={'financiersSearchInput'}
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='mt-6 '>
                <Table
                    tableData={financiers}
                    tableHeader={financierHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={48}
                    icon={Book}
                    sideBarTabName='financier'
                    condition={true}
                    staticHeader={"Financier"}
                    staticColunm={"name"}
                    sx='cursor-pointer'
                    hasNextPage={hasNextPage}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalPages={totalPage}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default InvestmentVehicle