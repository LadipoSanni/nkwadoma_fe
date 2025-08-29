'use client';
import React, { useState,useEffect } from 'react';
import SearchInput from '@/reuseable/Input/SearchInput';
import { Button } from "@/components/ui/button";
import { inter } from "@/app/fonts";
import Table from '@/reuseable/table/Table';
import {MdOutlineBusinessCenter, MdSearch} from 'react-icons/md';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
import InviteFinanciers from '@/components/portfolio-manager/fund/financier/financiers-step';
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from '@radix-ui/react-icons';
import { formatAmount } from '@/utils/Format';
import {
    useSearchFinancierQuery,
    useGetAllActiveAndInvitedFinanciersQuery
} from '@/service/admin/financier';
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import {
    setActiveAndInvitedFinancierId,
    setFinancierMode
} from '@/redux/slice/financier/financier';
import {store} from "@/redux/store";
import { useRouter } from 'next/navigation'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import CustomSelect from "@/reuseable/Input/Custom-select";
import { useAppSelector } from '@/redux/store';
import { setFinancierStatusTab } from '@/redux/slice/financier/financier';
import { resetAll,clearSaveCreateInvestmentField} from '@/redux/slice/vehicle/vehicle';
import { useDebounce } from '@/hooks/useDebounce';


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface financials {
    financierType: string,
    organizationName: string,
    totalAmountInvested: string
    userIdentity: {
        email: string,
        firstName: string,
        lastName: string,

    }

}

type viewAllfinancier = financials & TableRowData

interface TabState {
    pageNumber: number;
    totalPages: number;
    hasNextPage: boolean;
}


const ViewFinanciers = () => {
    const tabType = useAppSelector(state => state?.financier?.financierStatusTab)
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFinancier, setSelectedFinancier] = useState('');
    const [financiers, setFinanciers] = useState<viewAllfinancier[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    const isDisabled = false;

    const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const [tabStates, setTabStates] = useState<Record<string, TabState>>({
            active: { pageNumber: 0, totalPages: 0, hasNextPage: false },
            invited: { pageNumber: 0, totalPages: 0, hasNextPage: false },
            
        });

    const currentTabState = tabStates[tabType];


    const param = {
        pageNumber: currentTabState.pageNumber,
        pageSize: 10,
        financierType: selectedFinancier.toUpperCase(),
        activationStatus: tabType.toUpperCase(),
    }


    const {data, isLoading, refetch,isFetching} = useGetAllActiveAndInvitedFinanciersQuery(param)
    const {data:searchData, isLoading: searchIsLoading,isFetching: isSearchFetching} = useSearchFinancierQuery({name:debouncedSearchTerm, pageNumber: currentTabState.pageNumber, pageSize: 10, financierType: selectedFinancier.toUpperCase(), activationStatus: tabType.toUpperCase()},{skip: !debouncedSearchTerm})

    useEffect(()=>{
        if(debouncedSearchTerm && searchData && searchData?.data){
            const result = searchData?.data?.body
            setFinanciers(result)
            setTabStates(prev => ({
                ...prev,
                [tabType]: {
                    pageNumber: searchData?.data.pageNumber,
                    totalPages: searchData?.data.totalPages,
                    hasNextPage: searchData?.data.hasNextPage
                }
            }));
        }
        else if(data && data?.data){
            setFinanciers(data?.data?.body)
            setTabStates(prev => ({
                ...prev,
                [tabType]: {
                    pageNumber: data.data.pageNumber,
                    totalPages: data.data.totalPages,
                    hasNextPage: data.data.hasNextPage
                }
            }));
           
        }
        store.dispatch(resetAll())
       store.dispatch(clearSaveCreateInvestmentField())
    },[debouncedSearchTerm, searchData,data,tabType])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        if(!isTyping ){
            setTabStates(prev => ({
                ...prev,
                [tabType]: {
                    ...prev[tabType],
                    pageNumber: 0
                }
            }));
        }
       
    };

    const handleReset = () => {
        setSelectedFinancier('');
        refetch();
    };

    const handlePageChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
            const newPage = typeof value === 'function' ? value(currentTabState.pageNumber) : value;
            setTabStates(prev => ({
                ...prev,
                [tabType]: {
                    ...prev[tabType],
                    pageNumber: newPage
                }
            }));
        };


    const financierHeader = [
        { title: 'Name', id: 'name', selector: (row: viewAllfinancier) => row?.name},
        { title: 'Type', id: 'type', selector: (row: viewAllfinancier) => (
                <span className={`${row.financierType === "INDIVIDUAL"  ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] px-2 h-5`}>
            {capitalizeFirstLetters(row.financierType)}
        </span>
            ) },
        { title: 'No. of investments', id: 'investments', selector: (row:viewAllfinancier) => row.investments || 0 },
        { title: 'Amount invested', id: 'totalAmountInvested', selector: (row:viewAllfinancier) => formatAmount(row.totalAmountInvested) },
        { title: 'Amount earned', id: 'amountEarned', selector: (row:viewAllfinancier) => formatAmount(row.amountEarned) },
        { title: 'Payout', id: 'payout', selector: (row:viewAllfinancier) => formatAmount(row.payout) },
        { title: 'Portfolio value', id: 'portfolioValue', selector: (row:viewAllfinancier) => formatAmount(row.portfolioValue) }
    ];

    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setActiveAndInvitedFinancierId(String(row?.id)))
        store.dispatch(setFinancierMode("platform"))
        router.push('/financier/details')
    };



    return (
        <main className={'mt-7 w-[100%] md:px-4 '}>
            
            <div className={'md:flex w-full justify-between  gap-4'}>
                <div className={'flex gap-4 pr-3 md:pr-0'}>
                    <SearchInput id={'financiersSearch'} value={searchTerm} onChange={handleSearchChange} />
                    <CustomSelect
                        id="financierId"
                        value={selectedFinancier}
                        onChange={(value) => {
                            if (value === "Reset") {
                                handleReset();
                            } else {
                                setSelectedFinancier(value);
                            }
                        }}
                        selectContent={["Individual", "Cooperate", "Reset"]}
                        placeHolder="Type"
                        triggerId="financierSelectId"
                        className="h-11 w-28  mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
                    />
                </div>
                <div className='pr-3 md:pr-0'>
                <Button
                    variant={"secondary"}
                    size={"lg"}
                    className={`${inter.className}  ${isDisabled? "bg-[#D7D7D7] hover:bg-[#D7D7D7]" : "bg-meedlBlue"}  text-meedlWhite h-[2.8125rem] w-full md:w-fit flex justify-center items-center`}
                    id='createProgramModal'
                    onClick={() => setIsModalOpen(true)}
                    disabled={isDisabled}
                >
                    Invite financier
                </Button>
                </div>
            </div>

            <div className={`pt-2 md:mt-0 mt-4`}>
                <Tabs value={tabType} onValueChange={(value) => {
    store.dispatch(setFinancierStatusTab(value));
  }} >
                    <TabsList>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="invited">Invited</TabsTrigger>
                    </TabsList>

                    <TabsContent value="active">
                        <div
                            id="financierListView"
                            className={"grid mt-5 gap-6"}
                            style={{
                                height: "62vh",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            }}
                        >
                            {!isTyping && debouncedSearchTerm?.length > 0 && searchTerm && financiers.length === 0 ? (
                                <div className={`flex justify-center items-center text-center md:h-[32vh] h-[40%] w-full mt-32`}>
                                    <SearchEmptyState icon={MdSearch} name="Financier" />
                                </div>
                            ) : (
                                <div className='pr-3 md:pr-0'>
                                <Table
                                    tableData={financiers}
                                    tableHeader={financierHeader}
                                    handleRowClick={handleRowClick}
                                    tableHeight={55}
                                    icon={MdOutlineBusinessCenter }
                                    sideBarTabName='financier'
                                    condition={true}
                                    staticHeader={"Financier"}
                                    staticColunm={"name"}
                                    sx='cursor-pointer'
                                    hasNextPage={currentTabState.hasNextPage}
                                    pageNumber={currentTabState.pageNumber}
                                    setPageNumber={handlePageChange}
                                    totalPages={currentTabState.totalPages}
                                    isLoading={isLoading || searchIsLoading || isFetching || isSearchFetching}
                                    tableCellStyle={'h-12'}
                                />
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value={"invited"} className={`pt-3`}>
                    <div className='pr-3 md:pr-0'>
                        <Table
                            tableData={financiers}
                            tableHeader={financierHeader}
                            handleRowClick={handleRowClick}
                            tableHeight={55}
                            icon={MdOutlineBusinessCenter }
                            sideBarTabName='financier'
                            condition={true}
                            staticHeader={"Financier"}
                            staticColunm={"name"}
                            sx='cursor-pointer'
                            hasNextPage={currentTabState.hasNextPage}
                            pageNumber={currentTabState.pageNumber}
                            setPageNumber={handlePageChange}
                            totalPages={currentTabState.totalPages}
                            isLoading={isLoading || searchIsLoading || isFetching || isSearchFetching}
                            tableCellStyle={'h-12'}
                        />
               </div>
                    </TabsContent>

                </Tabs>

            </div>

            {isModalOpen && (
                <div>
                    <Modal
                        isOpen={isModalOpen}
                        closeModal={() => setIsModalOpen(false)}
                        headerTitle='Invite financier'
                        closeOnOverlayClick={true}
                        icon={Cross2Icon}
                        width='36%'
                    >
                        <InviteFinanciers  setIsOpen={setIsModalOpen} state='platform'/>
                    </Modal>
                </div>
            )}
        </main>
    );
};

export default ViewFinanciers;