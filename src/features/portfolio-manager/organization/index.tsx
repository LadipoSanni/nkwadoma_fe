"use client";
import React,{useState} from 'react'
import { Tabs,TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tables from '@/reuseable/table/LoanProductTable'
import { inter } from '@/app/fonts'
import OrganizationActionBar from '@/components/portfolio-manager/Organization-action-bar'
import { organizationList } from '@/utils/LoanRequestMockData/cohortProduct';
import { MdOutlineAccountBalance } from 'react-icons/md';
import TableModal from '@/reuseable/modals/TableModal';
import InviteOrganizationForm from '@/components/portfolio-manager/Invite-organization-form';
import { Cross2Icon } from "@radix-ui/react-icons";


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
   }


const tabData = [
    {name:"Active",
        value: "active"
      },
      {
        name:"Invited",
        value: "invite"
      },
      {
        name:"Deactivated",
        value: "deactivate"
      }
  ]

  

function Organization() {

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => { 
        // setSearchTerm(event.target.value);
        console.log(event)
      };

      const [isOpen,setIsOpen] =  useState(false);

      const handleInviteOrganizationClick = () => {
         setIsOpen(!isOpen);
      }

      const organizationHeader = [
        { title: <div >Name</div> , sortable: true, id: 'name', selector: (row:TableRowData ) => row.name},
        { title: "No. of loanees" , sortable: true, id: 'noOfLoanees', selector: (row:TableRowData ) => row.noOfLoanees},
        { title: "Historical debt" , sortable: true, id: 'historicalDebt', selector: (row:TableRowData ) => row.historicalDebt},
        { title: "Repayment rate(%)" , sortable: true, id: 'repaymentRate', selector: (row:TableRowData ) => row.historicalDebt},
        { title: "Debt repaid" , sortable: true, id: 'debtRepaid', selector: (row:TableRowData ) => row.historicalDebt},
          { title: "Current debt" , sortable: true, id: 'currentDebt', selector: (row:TableRowData ) => row.currentDebt},
      ]
      

    const tabContent = [
        {
            actionBar: <div>
                <OrganizationActionBar 
                  id='activeId'
                  value=''
                  onChange={handleSearchChange}
                  handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
            </div>,
            value:"active",
            table: <div>
                <Tables
                tableData={organizationList}
                tableHeader={organizationHeader}
                tableHeight={52}
                sx='cursor-pointer'
                handleRowClick={() => {}}
                tableCellStyle={'h-12'}
                optionalRowsPerPage={10}
                staticHeader='Name'
                staticColunm='name'
                sideBarTabName='Organization'
                optionalFilterName='Active'
                condition={true}
                icon={MdOutlineAccountBalance}
                />
            </div>
        },
        {
            actionBar: <div>
                 <OrganizationActionBar 
                  id='inviteId'
                  value=''
                  onChange={handleSearchChange}
                  handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
            </div>,
            value:"invite",
            table: <div>
               <Tables
                tableData={organizationList}
                tableHeader={organizationHeader}
                tableHeight={52}
                sx='cursor-pointer'
                handleRowClick={() => {}}
                tableCellStyle={'h-12'}
                optionalRowsPerPage={10}
                staticHeader='Name'
                staticColunm='name'
                sideBarTabName='Organization'
                optionalFilterName='Invited'
                icon={MdOutlineAccountBalance}
                condition={true}
               
                />
            </div>
        },
        {
            actionBar: <div>
                 <OrganizationActionBar 
                  id='deactivateId'
                  value=''
                  onChange={handleSearchChange}
                  handleInviteOrganizationClick={handleInviteOrganizationClick}
                />
            </div>,
            value:"deactivate",
            table: <div>
               <Tables
                tableData={organizationList}
                tableHeader={organizationHeader}
                tableHeight={52}
                sx='cursor-pointer'
                handleRowClick={() => {}}
                tableCellStyle={'h-12'}
                optionalRowsPerPage={10}
                staticHeader='Name'
                staticColunm='name'
                sideBarTabName='Organization'
                optionalFilterName='Deactivated'
                condition={true}
                icon={MdOutlineAccountBalance}
                />
            </div>
        }
      ]
  return (
    <div className={`px-6 py-5 ${inter.className}`}>
        <Tabs defaultValue='active'>
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
          <TableModal
            isOpen={isOpen}
            closeModal={() => setIsOpen(false)}
            className='pb-1'
            headerTitle='Invite organization'
            closeOnOverlayClick={true}
            icon={Cross2Icon}
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
