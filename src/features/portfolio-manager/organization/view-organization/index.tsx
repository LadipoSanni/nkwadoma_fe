"use client";
import React, {useEffect, useState} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import {inter} from '@/app/fonts'
import OrganizationActionBar from '@/components/portfolio-manager/organization/Organization-action-bar'
// import {organizationList} from '@/utils/LoanRequestMockData/cohortProduct';
import {MdOutlineAccountBalance} from 'react-icons/md';
import TableModal from '@/reuseable/modals/TableModal';
import InviteOrganizationForm from '@/components/portfolio-manager/organization/Invite-organization-form';
import {Cross2Icon} from "@radix-ui/react-icons";
import {useViewAllOrganizationsQuery} from "@/service/admin/organization";
import { formatAmount } from '@/utils/Format';
import { useSearchOrganisationByNameQuery } from '@/service/admin/organization';
import { setItemSessionStorage } from '@/utils/storage';
import { useRouter } from 'next/navigation'
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState'
import { MdSearch } from 'react-icons/md'
// import DataTable from '@/reuseable/table/Table';



interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}


const tabData = [
    {
        name: "Active",
        value: "active"
    },
    {
        name: "Invited",
        value: "invite"
    },
    {
        name: "Deactivated",
        value: "deactivate"
    }
]

interface organizationListPros extends TableRowData{
    name:string,
    rcNumber: string,
    totalDebtRepaid:string,
    totalCurrentDebt:string,
    totalHistoricalDebt:string,
    repaymentRate:number,
    phoneNumber:string,
    numberOfPrograms: number,
    tin:string,
    invitedDate:string,
    numberOfLoanees:string,
    status: string,
    

}



function Organization() {

   

    const [isOpen, setIsOpen] = useState(false);
    const [pageNumber,setPageNumber] = useState<number>(0);
  const [pageSize] = useState(300);
    const router = useRouter()

    const handleInviteOrganizationClick = () => {
        setIsOpen(!isOpen);
    }
    const dataElement = {
        pageNumber,
        pageSize
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [organizationList, setOrganizationList] = useState<organizationListPros[]>([]);

    const {data,refetch} = useViewAllOrganizationsQuery(dataElement)
    const { data: searchResults } = useSearchOrganisationByNameQuery(searchTerm, { skip: !searchTerm });

    
   console.log("the data: ",data)
  

    // useEffect(()=> {
    //     if (searchTerm && searchResults && searchResults.data) {
    //         const organizations = searchResults.data;
    //         setOrganizationList(organizations);
    //     } else if (!searchTerm && data && data?.data) {
    //         const organizations = data?.data?.body;
    //         setOrganizationList(organizations);
    //         setPageNumber(data?.data?.pageNumber)
           
    //     }
    // },[searchTerm,searchResults,data])

    useEffect(()=> {
        const sortedOrganizations = (data?.data?.body.slice() ?? []).sort((a: organizationListPros, b: organizationListPros) => new Date(b.invitedDate).getTime() - new Date(a.invitedDate).getTime());
        if (searchTerm && searchResults && searchResults.data) {
            const organizations = searchResults.data;
            setOrganizationList(organizations);
        } else if (!searchTerm && data && data?.data) {
            // const organizations = data?.data?.body;
            setOrganizationList(sortedOrganizations );
            setPageNumber(data?.data?.pageNumber)
           
        }
    },[searchTerm,searchResults,data])

    //  const handleNextPage = () => {
    //     if(data?.data?.hasNextPage){
    //         setPageNumber((prevPage) => prevPage + 1);
    //     }
    //  }

    //  const handlePreviousPage = () => {
    //     if(pageNumber > 0){
    //         setPageNumber((prevPage) => prevPage - 1);
    //     }
    //  }

    

    useEffect(() => {
        
        refetch();
      }, [pageNumber, refetch]);

    const handleRowClick = (row:TableRowData) => {
         router.push('/organizations/details')
         setItemSessionStorage("organisationId",String(row.id))
        
    }


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        // console.log("the eventsearch: ",event)
    };
      

    const activeOrganization = organizationList.filter(organization => organization.status === 'ACTIVE' );
    const invitedOrganization = organizationList.filter(organization => organization.status === 'INVITED');
    const deactivatedOrganization = organizationList.filter(organization => organization.status === 'DEACTIVATED');

    
  
    const organizationHeader = [
        {title: <div>Name</div>, sortable: true, id: 'name', selector: (row: TableRowData) => row.name},
        {title: "No. of loanees", sortable: true, id: 'numberOfLoanees', selector: (row: TableRowData) => row.numberOfLoanees},
        {
            title: "Historical debt",
            sortable: true,
            id: 'totalHistoricalDebt',
            selector: (row: TableRowData) => formatAmount(row.totalHistoricalDebt)},
        {
            title: "Repayment rate(%)",
            sortable: true,
            id: 'repaymentRate',
            selector: (row: TableRowData) => row.repaymentRate
        },
        {title: "Debt repaid", sortable: true, id: 'totalDebtRepaid', selector: (row: TableRowData) => formatAmount(row.totalDebtRepaid)},
        {title: "Current debt", sortable: true, id: 'totalCurrentDebt', selector: (row: TableRowData) => formatAmount(row.totalCurrentDebt)},
    ]


    const tabContent = [
        {
            actionBar: <div>
                <OrganizationActionBar
                    id='activeId'
                    inviteButton='active'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
            </div>,
            value: "active",
            table: <div>
               {
                searchTerm && activeOrganization.length === 0? <div><SearchEmptyState icon={MdSearch} name='Active organization'/></div> :
                <Tables
                    tableData={activeOrganization}
                    tableHeader={organizationHeader}
                    tableHeight={52}
                    sx='cursor-pointer'
                    handleRowClick={handleRowClick}
                    tableCellStyle={'h-12'}
                    optionalRowsPerPage={10}
                    staticHeader='Name'
                    staticColunm='name'
                    sideBarTabName='organization'
                    optionalFilterName='active'
                    condition={true}
                    icon={MdOutlineAccountBalance}
                />
    //             <DataTable
    //   tableData={activeOrganization.slice().reverse()}
    //   tableHeader={organizationHeader}
    //   tableHeight={52}
    //   sx="cursor-pointer"
    //   handleRowClick={handleRowClick}
    //   tableCellStyle="h-12"
    // //   optionalRowsPerPage={pageSize}
    //   staticHeader="Name"
    //   staticColunm="name"
    //   sideBarTabName="organization"
    //   optionalFilterName="active"
    //   condition
    //   icon={MdOutlineAccountBalance}
    //   totalPages={data?.data?.totalPages}
    //   pageNumber={pageNumber}
    //   hasNextPage={data?.data?.hasNextPage}
    //   setPageNumber={setPageNumber}
    // />
               }
               {/* <button className='bg-slate-100'
               onClick={handleNextPage}
               >
                next
               </button>
               <div></div>
               <button className='bg-slate-100'
               onClick={handlePreviousPage}
               >
                back
               </button> */}
            </div>
        },
        {
            actionBar: <div>
                <OrganizationActionBar
                    id='inviteId'
                    inviteButton='invited'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
            </div>,
            value: "invite",
            table: <div>

               { searchTerm && invitedOrganization.length === 0? <div><SearchEmptyState icon={MdSearch} name='Invited organization'/></div> :<Tables
                    tableData={invitedOrganization}
                    tableHeader={organizationHeader}
                    tableHeight={52}
                    sx='cursor-pointer'
                    handleRowClick={handleRowClick}
                    tableCellStyle={'h-12'}
                    optionalRowsPerPage={10}
                    staticHeader='Name'
                    staticColunm='name'
                    sideBarTabName='organization'
                    optionalFilterName='invited'
                    icon={MdOutlineAccountBalance}
                    condition={true}

                />
               }
            </div>
        },
        {
            actionBar: <div>
                <OrganizationActionBar
                    id='deactivateId'
                    inviteButton='deactivated'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
            </div>,
            value: "deactivate",
            table: <div>
                {
                    searchTerm && invitedOrganization.length === 0? <div><SearchEmptyState icon={MdSearch} name='Deactivated organization'/></div> :
                    <Tables
                    tableData={deactivatedOrganization}
                    tableHeader={organizationHeader}
                    tableHeight={52}
                    sx='cursor-pointer'
                    handleRowClick={handleRowClick}
                    tableCellStyle={'h-12'}
                    optionalRowsPerPage={10}
                    staticHeader='Name'
                    staticColunm='name'
                    sideBarTabName='organization'
                    optionalFilterName='deactivated'
                    condition={true}
                    icon={MdOutlineAccountBalance}
                />
        }
            </div>
        }
    ]
    return (
        <div className={`px-6 py-5 ${inter.className}`}>
            
            <Tabs defaultValue='active'>
                <TabsList className={`z-50 `}>
                    {tabData.map((tab, index) => (
                        <TabsTrigger id={`${tab.name}-${index}`} data-testid={`tabDataName${tab.value}`} value={tab.value} key={index}>
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
                    />
                </TableModal>
            </div>
        </div>
    )
}

export default Organization
