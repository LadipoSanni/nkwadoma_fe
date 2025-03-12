"use client";
import React, {useState, useEffect} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import {inter} from '@/app/fonts'
import InvestmentActionBar from '@/components/portfolio-manager/fund/Investment-action-bar'
import {formatAmount} from '@/utils/Format';
import {MdOutlinePayments} from 'react-icons/md';
import TableModal from '@/reuseable/modals/TableModal';
import {Cross2Icon} from "@radix-ui/react-icons";
import CreateInvestmentVehicle from '@/components/portfolio-manager/fund/Create-investment-vehicle';
import {useRouter} from 'next/navigation'
import {
    useGetAllInvestmentmentVehicleQuery,
    useGetInvestmentVehiclesByTypeAndStatusQuery
} from '@/service/admin/fund_query';
import {formatMonthInDate} from '@/utils/Format';
import {useSearchInvestmentVehicleByNameQuery} from '@/service/admin/fund_query';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import {MdSearch} from 'react-icons/md'
import Draft from "@/features/portfolio-manager/fund/draft/Index";
import {store} from "@/redux/store";
import {setCurrentVehicleId} from "@/redux/slice/vehicle/vehicle";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}


const tabData = [
    {
        name: "Commercial funds",
        value: "commercialFund"
    },
    {
        name: "Endowment funds",
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
    const [searchTerm, setSearchTerm] = useState('');
    const [draft, setDraft] = React.useState(false);

    const dataElement = {
        pageNumber: 0,
        pageSize: 300
    }

    const {data: investmentVehicleData} = useGetAllInvestmentmentVehicleQuery(dataElement)
    const {data: searchData} = useSearchInvestmentVehicleByNameQuery(searchTerm, {skip: !searchTerm})
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('commercialFund');
    const getVehicleTypeFromTab = (tabValue: string) => {
        return tabValue === 'commercialFund' ? 'COMMERCIAL' : 'ENDOWMENT';
    };
    const {refetch} = useGetInvestmentVehiclesByTypeAndStatusQuery({
        pageSize: 50,
        pageNumber: 0,
        type: getVehicleTypeFromTab(activeTab),
        status: "DRAFT",
    }, {skip: !draft});

    useEffect(() => {
        if (draft) {
            refetch();
        }
    }, [draft, refetch]);


    useEffect(() => {
        if (searchTerm && searchData && searchData?.data) {
            const result = searchData?.data
            setViewAllInvestmentVehicle(result)
        } else if (investmentVehicleData && investmentVehicleData.data) {
            setViewAllInvestmentVehicle(investmentVehicleData.data)
        }
    }, [searchTerm, searchData, investmentVehicleData])

    const handleCommercialFundDraftClick = () => {
        setModalType('commercial');
        setDraft(true);
    }
    const handleEndowmentFundDraftClick = () => {
        setModalType('endowment');
        setDraft(true);
    }
    const handleCreateInvestmentVehicleClick = () => {
        setModalType('commercial');
        setIsModalOpen(true);
    }

    const handleCreateInvestmentDonorClick = () => {
        setModalType('endowment');
        setIsModalOpen(true);
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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


    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setCurrentVehicleId(String(row.id)));
        router.push('/vehicle/details')
    }


    const commercial = viewAllInvestmentVehicle.filter(vehicle => vehicle.investmentVehicleType === 'COMMERCIAL');
    const endowment = viewAllInvestmentVehicle.filter(vehicle => vehicle.investmentVehicleType === 'ENDOWMENT');

    const tabContent = [
        {
            actionBar: <div>
                <InvestmentActionBar
                    id='commercialFundId'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleDraftClick={handleCommercialFundDraftClick}
                    handleCreateInvestmentVehicleClick={handleCreateInvestmentVehicleClick}
                    buttonName='Set up commercial fund'
                />
            </div>,
            value: "commercialFund",
            table: <div>
                {
                    searchTerm && commercial.length === 0 ?
                        <div><SearchEmptyState icon={MdSearch} name='Commercial fund'/></div> :
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
                            sideBarTabName='fund'
                            optionalFilterName='commercial'
                            condition={true}
                        />
                }
            </div>
        },
        {
            actionBar: <div>
                <InvestmentActionBar
                    id='endowmentFundId'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleDraftClick={handleEndowmentFundDraftClick}
                    handleCreateInvestmentVehicleClick={handleCreateInvestmentDonorClick}
                    buttonName='Set up endownment fund'
                />
            </div>,
            value: "endowmentFund",
            table: <div>
                {
                    searchTerm && endowment.length === 0 ?
                        <div><SearchEmptyState icon={MdSearch} name='Endowment fund'/></div> :
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
                            sideBarTabName='fund'
                            optionalFilterName='endowment'
                            condition={true}
                            sx='cursor-pointer'
                        />
                }
            </div>
        }
    ]


    return (
        <div className={`px-6 py-5 ${inter.className}`}>
            <Tabs defaultValue='commercialFund' onValueChange={handleTabChange}>
                <TabsList className={`z-50 `}>
                    {tabData.map((tab, index) => (
                        <TabsTrigger data-testid={`tabDataName${tab.value}`} value={tab.value} key={index}>
                            {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {
                    tabContent.map((tab, index) => (
                        <TabsContent key={index} value={tab.value} className='mt-5'>
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
                        closeModal={() => setIsModalOpen(false)}
                        className='pb-1'
                        headerTitle={modalType === 'commercial' ? "Commerciial fund" : "Endowment fund"}
                        closeOnOverlayClick={true}
                        icon={Cross2Icon}
                        width={"36%"}
                    >
                        {modalType === 'commercial' ? (
                            <CreateInvestmentVehicle setIsOpen={() => setIsModalOpen(false)} type='sponsor'
                                                     investmentVehicleType='COMMERCIAL'/>) : (
                            <CreateInvestmentVehicle setIsOpen={() => setIsModalOpen(false)} type='donor'
                                                     investmentVehicleType='ENDOWMENT'/>)}
                    </TableModal>
                }
            </div>
            <div>
                {
                    <TableModal
                        isOpen={draft}
                        closeModal={() => setDraft(false)}
                        className={`pb-1`}
                        headerTitle={"Draft"}
                        closeOnOverlayClick={true}
                        icon={Cross2Icon}
                        width={"36%"}
                    >
                        {activeTab === 'commercialFund' ? (
                            <Draft setIsOpen={() => setDraft(false)} type='sponsor' investmentVehicleType='COMMERCIAL'/>
                        ) : (
                            <Draft setIsOpen={() => setDraft(false)} type='donor' investmentVehicleType='ENDOWMENT'/>
                        )}
                    </TableModal>
                }
            </div>

        </div>
    )
}

export default InvestmentVehicle