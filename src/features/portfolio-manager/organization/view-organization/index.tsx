"use client";
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { inter } from '@/app/fonts';
import OrganizationActionBar from '@/components/portfolio-manager/organization/Organization-action-bar';
import { MdOutlineAccountBalance } from 'react-icons/md';
import TableModal from '@/reuseable/modals/TableModal';
import Table from '@/reuseable/table/Table';
import InviteOrganizationForm from '@/components/portfolio-manager/organization/Invite-organization-form';
import { Cross2Icon } from "@radix-ui/react-icons";
import { useViewAllOrganizationByStatusQuery, useSearchOrganisationByNameQuery } from "@/service/admin/organization";
import { formatAmount,formatToTwoDecimals } from '@/utils/Format';
import { useRouter } from 'next/navigation';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
import { MdSearch } from 'react-icons/md';
import { setOrganizationTabStatus,setOrganizationId,resetOrganizationId,resetOrganizationDetailsStatus,resetOrganizationStatus,setOrganizationName} from '@/redux/slice/organization/organization';
import { useAppSelector } from '@/redux/store';
import { store } from "@/redux/store";
import { resetNotification } from '@/redux/slice/notification/notification';
import { useDebounce } from '@/hooks/useDebounce';
import { resetAll,clearSaveCreateInvestmentField} from '@/redux/slice/vehicle/vehicle';

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const tabData = [
    { name: "Active", value: "active" },
    { name: "Invited", value: "invited" },
    { name: "Deactivated", value: "deactivated" }
];

interface organizationListPros extends TableRowData {
    name: string;
    rcNumber: string;
    totalDebtRepaid: string;
    totalCurrentDebt: string;
    totalHistoricalDebt: string;
    repaymentRate: number;
    phoneNumber: string;
    numberOfPrograms: number;
    tin: string;
    invitedDate: string;
    numberOfLoanees: string;
    status: string;
    totalAmountReceived: string
}

interface TabState {
    pageNumber: number;
    totalPages: number;
    hasNextPage: boolean;
}

function Organization() {
    const tabType = useAppSelector(state => state?.organization?.organizationStatusTab);
    const [isOpen, setIsOpen] = useState(false);
    const [pageSize] = useState(10);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [organizationList, setOrganizationList] = useState<organizationListPros[]>([]);

    const [tabStates, setTabStates] = useState<Record<string, TabState>>({
        active: { pageNumber: 0, totalPages: 0, hasNextPage: false },
        invited: { pageNumber: 0, totalPages: 0, hasNextPage: false },
        deactivated: { pageNumber: 0, totalPages: 0, hasNextPage: false }
    });

    const currentTabState = tabStates[tabType];

      const [debouncedSearchTerm, isTyping] = useDebounce(searchTerm, 1000);

    const dataElement = {
        pageNumber: currentTabState.pageNumber,
        pageSize,
        status: tabType.toUpperCase(),
    };

    const searchElement = {
        name:debouncedSearchTerm,
        status: tabType.toUpperCase(),
        pageNumber: currentTabState.pageNumber,
        pageSize,
    }


    const { data, isLoading,isFetching,refetch} = useViewAllOrganizationByStatusQuery(dataElement, {
        refetchOnMountOrArgChange: true 
    });

    const { data: searchResults, isLoading: isloading, isFetching: isfetching } = useSearchOrganisationByNameQuery(searchElement, { skip: !debouncedSearchTerm });

    useEffect(() => {
        if (debouncedSearchTerm && searchResults && searchResults.data) {
            setOrganizationList(searchResults.data?.body);
            setTabStates(prev => ({
                ...prev,
                [tabType]: {
                    pageNumber: searchResults.data.pageNumber,
                    totalPages: searchResults.data.totalPages,
                    hasNextPage:searchResults.data.hasNextPage
                }
            }));
        } else if (!debouncedSearchTerm && data && data?.data) {
            setOrganizationList(data?.data?.body);
            setTabStates(prev => ({
                ...prev,
                [tabType]: {
                    pageNumber: data.data.pageNumber,
                    totalPages: data.data.totalPages,
                    hasNextPage: data.data.hasNextPage
                }
            }));
        }
        store.dispatch(resetOrganizationId())
        store.dispatch(resetNotification())
        store.dispatch(resetOrganizationDetailsStatus())
        store.dispatch(resetAll())
        store.dispatch(clearSaveCreateInvestmentField())
        store.dispatch(resetOrganizationStatus())
    }, [debouncedSearchTerm, searchResults, data, tabType]);

    const handleInviteOrganizationClick = () => {
        setIsOpen(!isOpen);
    };

    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setOrganizationId(String(row.id)))
        store.dispatch(setOrganizationName(String(row?.name)))
        router.push('/organizations/details');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
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
    
    const organizationHeader = [
        { title: <div>Name</div>, sortable: true, id: 'name', selector: (row: TableRowData) => row.name },
        { title: "No. of loanees", sortable: true, id: 'numberOfLoanees', selector: (row: TableRowData) => row.numberOfLoanees },
        { title: "Historical debt", sortable: true, id: 'totalHistoricalDebt', selector: (row: TableRowData) => formatAmount(row.totalAmountReceived) },
        { title: "Repayment rate(%)", sortable: true, id: 'repaymentRate', selector: (row: TableRowData) => formatToTwoDecimals(row.repaymentRate) },
        { title: "Debt repaid", sortable: true, id: 'totalDebtRepaid', selector: (row: TableRowData) => formatAmount(row.totalDebtRepaid) },
        { title: "Current debt", sortable: true, id: 'totalCurrentDebt', selector: (row: TableRowData) => formatAmount(row.totalCurrentDebt) },
    ];

    const renderTable = (tabValue: string) => {
        const isEmpty = !isTyping && debouncedSearchTerm  && organizationList.length === 0;
        const emptyStateName = `${tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} organization`;

        return isEmpty ? (
            <SearchEmptyState icon={MdSearch} name={emptyStateName} />
        ) : (
            <Table
                tableData={organizationList}
                tableHeader={organizationHeader}
                tableHeight={55}
                sx='cursor-pointer'
                handleRowClick={handleRowClick}
                tableCellStyle={'h-12'}
                staticHeader='Name'
                staticColunm='name'
                sideBarTabName='Organization'
                optionalFilterName={tabValue}
                condition={true}
                icon={MdOutlineAccountBalance}
                hasNextPage={currentTabState.hasNextPage}
                pageNumber={currentTabState.pageNumber}
                setPageNumber={handlePageChange}
                totalPages={currentTabState.totalPages}
                isLoading={isLoading || isloading || isFetching || isfetching}
            />
        );
    };

    const tabContent = tabData.map(tab => ({
        value: tab.value,
        content: (
            <div>
                <OrganizationActionBar
                    id={`${tab.value}Id`}
                    inviteButton={tab.value}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
                <div className='mt-6'>
                    {renderTable(tab.value)}
                </div>
            </div>
        )
    }));

    return (
        <div className={`px-6 py-5 ${inter.className}`}>
            <Tabs 
                value={tabType} 
                onValueChange={(value) => {
                    store.dispatch(setOrganizationTabStatus(value));
                }}
            >
                <TabsList className={`z-50`}>
                    {tabData.map((tab, index) => (
                        <TabsTrigger 
                            id={`${tab.name}-${index}`} 
                            data-testid={`tabDataName${tab.value}`} 
                            value={tab.value} 
                            key={index}
                        >
                            {tab.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                
                {tabContent.map((tab, index) => (
                    <TabsContent key={index} value={tab.value} className='mt-5'>
                        {tab.content}
                    </TabsContent>
                ))}
            </Tabs>

            <TableModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                className='pb-1'
                headerTitle='Invite organization'
                closeOnOverlayClick={true}
                icon={Cross2Icon}
                width='36%'
            >
                <InviteOrganizationForm 
                setIsOpen={setIsOpen} 
                organizationRefetch={refetch}
                tabType={tabType}
                />
            </TableModal>
        </div>
    );
}

export default Organization;
