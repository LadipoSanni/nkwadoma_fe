"use client"
import React,{useState} from 'react';
import {Input} from '@/components/ui/input'
import OrganizationNameAndChangeButton from "@/components/selected-loan/OrganizationNameAndChangeButton";
import {MdSearch} from "react-icons/md";
// import {Button} from "@/components/ui/button";
// import {ChevronDownIcon} from "@radix-ui/react-icons";
import ProductFilter from '../loan/selected-loan/loan-request/Product-filter';
import Tables from '@/reuseable/table/LoanProductTable';
import { loanRequestData } from '@/utils/LoanRequestMockData/cohortProduct';
import { formatAmount, formatDate } from '@/utils/Format';
import { useRouter } from 'next/navigation'

export const initialFormValue = {
    selectedProgram:""
  }

const OrganizationAndFilter = () => {
    const [selectProgram, setSelectProgram] = useState('')
    const router = useRouter()

    const handleSubmit = async (values:{selectedProgram: string}) => {
        console.log('Form submitted', values)
        // setIsDropdown(false)
    
      }

      const handleSelectProgram = (programType: string) => {
        setSelectProgram(programType)
   }
 

      const dataList = [
        "Software Engineer",
        "Product Manager",
        "UX Designer",
        "QA Engineer",
        "Full Stack Developer",
        "Data Scientist",
        "Machine Learning Engineer",
        "Data Analyst",
        "Business Analyst",
        "Project Manager",
        "UX/UI Designer",
      ]

      interface TableRowData {
        [key: string]: string | number | null | React.ReactNode;
       }
  

      const loanRequestHeader = [
        { title: 'Loanee', sortable: true, id: 'loanee', selector: (row:TableRowData ) => row.loanee },
        { title: 'Program', sortable: true, id: 'program', selector: (row:TableRowData ) => row?.program},
        { title: 'Cohort', sortable: true, id: 'cohort', selector: (row:TableRowData ) => row.cohort },
        { title: 'Start date', sortable: true, id: 'start', selector: (row:TableRowData ) => formatDate(row?.start)},
        { title: 'Request date', sortable: true, id: 'request', selector: (row:TableRowData ) => formatDate(row?.request)},
        { title: 'Initial deposit', sortable: true, id: 'initialDeposit', selector: (row:TableRowData) => <div className='ml-4'>{formatAmount(row.initialDeposit)}</div> },
        { title: 'Amount requested', sortable: true, id: 'amountRequested', selector: (row:TableRowData) => <div className='ml-6'>{formatAmount(row.amountRequested)}</div> },
       
    
      ]

      const handleRowClick = (row: TableRowData) => {
        router.push('/cohort/cohort-details')
        console.log('The row: ',row)
    
      }
    return (
        <div className='md:px-3'>
        <div
            id="organzationAndFilterComponent"
            className={`grid gap-3 md:place-content-between md:grid md:mr-auto md:ml-auto  w-full h-fit md:w-full md:h-fit`}>
            <OrganizationNameAndChangeButton/>
            <div
                id="filterAndSearchComponent"
                data-testid="filterAndSearchComponent"
                className={`flex gap-1 w-fit h-fit md:w-fit md:h-fit md:flex md:gap-1`}
            >
                <div className='relative'>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                       <MdSearch className="h-6 w-6 text-grey200"/>
                    </span>
                    <Input
                        id='searchLoan'
                        placeholder='Search'
                        className='w-full lg:w-80 rounded h-11 md:h-9 focus-visible:ring-0 shadow-none  border-solid border border-neutral650  text-grey450 pl-10'
                    />
                </div>
                {/* <Button
                    id={'filterLoanButton'}
                    data-testid="filterLoanButton"
                    className={` text-sm gap-2 md:text-xs  w-fit px-2 md:w-1/5 h-11 md:h-9 rounded bg-neutral100 hover:bg-neutral100 text-black border border-[#D0D5DD] shadow-none `}
                >
                    Program
                    <ChevronDownIcon className="h-4 w-4 md:h-8 md:w-8 font-semibold" />
                </Button> */}
                <div>
                    <ProductFilter 
                    filterName='Program'
                    dropDownFilterName='Program'
                    initialFormValue={initialFormValue}
                    placeHolder='Select Program'
                    handleFilterSubmit={handleSubmit}
                    valueName='selectedProgram'
                    valueListData={dataList}
                    selectedValue={selectProgram}
                    handleSelectedValue={handleSelectProgram}
                    />
                </div>
            </div>
        </div>
        <div className='mt-5'>
          <Tables
           tableData={loanRequestData}
           handleRowClick={handleRowClick}
           tableHeader={loanRequestHeader}
           tableHeight={47}
           sx='cursor-pointer'
           staticColunm='loanee'
           staticHeader='Loanee'
           tableCellStyle={'h-12'}
          />
        </div>
        </div>
    );
};

export default OrganizationAndFilter;