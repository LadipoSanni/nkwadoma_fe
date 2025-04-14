'use client';

import React, { useState,useEffect } from 'react';
import SearchInput from '@/reuseable/Input/SearchInput';
import { Button } from "@/components/ui/button";
import { inter } from "@/app/fonts";
import DropdownSelect from "@/reuseable/Dropdown/DropdownSelect";
import Table from '@/reuseable/table/Table';
import * as Yup from 'yup';
import { MdSearch } from 'react-icons/md';
import SearchEmptyState from '@/reuseable/emptyStates/SearchEmptyState';
import { Book } from 'lucide-react';
import InviteFinanciers from '@/components/portfolio-manager/fund/financier/financiers-step';
import Modal from '@/reuseable/modals/TableModal';
import { Cross2Icon } from '@radix-ui/react-icons';
import { formatAmount } from '@/utils/Format';
import { useViewAllFinanciersQuery,useSearchFinancierQuery } from '@/service/admin/financier';
import { capitalizeFirstLetters } from "@/utils/GlobalMethods";
import { setCurrentFinancierId,setFinancierMode } from '@/redux/financier/financier';
import {store} from "@/redux/store";
import { useRouter } from 'next/navigation'


interface FormValues {
    selectValue: string;
    financier: string;
}


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



const ViewFinanciers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFinancier, setSelectedFinancier] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [financiers, setFinanciers] = useState<viewAllfinancier[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
     const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    const router = useRouter()
    const param = {
        pageNumber: pageNumber,
        pageSize: 10,
        }
       
        const {data,isLoading} = useViewAllFinanciersQuery(param)
         const {data:searchData} = useSearchFinancierQuery({name:searchTerm, pageNumber: pageNumber, pageSize: 10},{skip: !searchTerm})

        useEffect(()=>{
              if(searchTerm && searchData && searchData?.data){
                const result = searchData?.data?.body
                setFinanciers(result)
                setNextPage(searchData?.data?.hasNextPage)
                setTotalPage(searchData?.data?.totalPages)
                setPageNumber(searchData?.data?.pageNumber)
              }
              else if(data && data.data){
               setFinanciers(data?.data?.body)
               setNextPage(data?.data?.hasNextPage)
               setTotalPage(data?.data?.totalPages)
               setPageNumber(data?.data?.pageNumber)
              }
           },[searchTerm, searchData,data])
        

    const listOfFinanciers = [
        { id: '1', name: 'Individual' },
        { id: '2', name: 'Corporate' },
    ];

    const initialFormValue: FormValues = {
        selectValue: '',
        financier: 'Individual',
    };

    const validationSchema = Yup.object().shape({
        selectValue: Yup.string().required('Select value is required'),
        financier: Yup.string().required('Financier is required'),
    });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectFinancier = (financier: string) => {
        setSelectedFinancier(financier);
    };

    const handleSubmit = () => {
        // console.log('Form submitted with values:', values);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleReset = () => {
        setSelectedFinancier('');
        setIsDropdownOpen(false);
    };

    // const financierView = [
    //     { id: '1', name: 'Financier 1', type: 'Individual', investments: 5, amountInvested: 10000, amountEarned: 2000, payout: 500, portfolioValue: 12000 },
    //     { id: '2', name: 'Financier 2', type: 'Corporate', investments: 10, amountInvested: 50000, amountEarned: 10000, payout: 2000, portfolioValue: 60000 },
    //     { id: '3', name: 'Financier 3', type: 'Individual', investments: 7, amountInvested: 15000, amountEarned: 3000, payout: 700, portfolioValue: 18000 },
    //     { id: '4', name: 'Financier 4', type: 'Corporate', investments: 12, amountInvested: 60000, amountEarned: 12000, payout: 2500, portfolioValue: 72000 },
    //     { id: '5', name: 'Financier 5', type: 'Individual', investments: 3, amountInvested: 8000, amountEarned: 1600, payout: 400, portfolioValue: 9600 },
    //     { id: '6', name: 'Financier 6', type: 'Corporate', investments: 15, amountInvested: 75000, amountEarned: 15000, payout: 3000, portfolioValue: 90000 },
    //     { id: '7', name: 'Financier 7', type: 'Individual', investments: 4, amountInvested: 9000, amountEarned: 1800, payout: 450, portfolioValue: 10800 },
    //     { id: '8', name: 'Financier 8', type: 'Corporate', investments: 20, amountInvested: 100000, amountEarned: 20000, payout: 4000, portfolioValue: 120000 },
    //     { id: '9', name: 'Financier 9', type: 'Individual', investments: 6, amountInvested: 12000, amountEarned: 2400, payout: 600, portfolioValue: 14400 },
    //     { id: '10', name: 'Financier 10', type: 'Corporate', investments: 25, amountInvested: 125000, amountEarned: 25000, payout: 5000, portfolioValue: 150000 },
    //     { id: '11', name: 'Financier 11', type: 'Individual', investments: 8, amountInvested: 16000, amountEarned: 3200, payout: 800, portfolioValue: 19200 },
    //     { id: '12', name: 'Financier 12', type: 'Corporate', investments: 30, amountInvested: 150000, amountEarned: 30000, payout: 6000, portfolioValue: 180000 },
    // ];

    const financierHeader = [
        { title: 'Name', id: 'name', selector: (row: viewAllfinancier) => row.userIdentity?.firstName? row.userIdentity?.firstName + " " + row.userIdentity?.lastName : row?.organizationName},
        { title: 'Type', id: 'type', selector: (row: viewAllfinancier) => (
                <span className={`${row.financierType === "INDIVIDUAL"  ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] px-2 h-5`}>
            {capitalizeFirstLetters(row.financierType)}
        </span>
            ) },
        { title: 'No. of Investments', id: 'investments', selector: (row:viewAllfinancier) => row.investments || 0 },
        { title: 'Amount Invested', id: 'amountInvested', selector: (row:viewAllfinancier) => formatAmount(row.amountInvested) },
        { title: 'Amount Earned', id: 'amountEarned', selector: (row:viewAllfinancier) => formatAmount(row.amountEarned) },
        { title: 'Payout', id: 'payout', selector: (row:viewAllfinancier) => formatAmount(row.payout) },
        { title: 'Portfolio Value', id: 'portfolioValue', selector: (row:viewAllfinancier) => formatAmount(row.portfolioValue) }
    ];

    const handleRowClick = (row: TableRowData) => {
        store.dispatch(setCurrentFinancierId(String(row?.id)))
        store.dispatch(setFinancierMode("platform"))
        router.push('/funds/financier-details')
        console.log('Row clicked:', row?.id);
    };



    return (
        <main className={'mt-7 mx-5'}>
            <section className={'md:flex justify-between grid gap-4'}>
                <div className={'flex gap-3'}>
                    <SearchInput id={'financiersSearch'} style='' value={searchTerm} onChange={handleSearchChange} />
                    <DropdownSelect
                        selectValue={selectedFinancier}
                        listOfItems={listOfFinanciers}
                        initialFormValue={initialFormValue}
                        validationSchema={validationSchema}
                        handleSelectChange={handleSelectFinancier}
                        handleSubmit={handleSubmit}
                        handleReset={handleReset}
                        isDropdownOpen={isDropdownOpen}
                        toggleDropdown={toggleDropdown}
                        isLoading={isLoading}
                    />
                </div>
                <Button
                    variant={"secondary"}
                    size={"lg"}
                    className={`${inter.className} bg-meedlBlue text-meedlWhite h-[2.8125rem] w-full md:w-[7.8125rem] flex justify-center items-center`}
                    id='createProgramModal'
                    onClick={() => setIsModalOpen(true)} // Open modal on button click
                >
                    Invite financier
                </Button>
            </section>

            <div
                id="financierListView"
                className={"grid mt-8 gap-6"}
                style={{
                    height: "62vh",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
            >
                {searchTerm && financiers.length === 0 ? (
                    <div>
                        <SearchEmptyState icon={MdSearch} name="Financier" />
                    </div>
                ) : (
                    <Table
                    tableData={financiers}
                    tableHeader={financierHeader}
                    handleRowClick={handleRowClick}
                    tableHeight={58}
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
                )}
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
                        <InviteFinanciers  setIsOpen={setIsModalOpen} />
                    </Modal>
                </div>
            )}
        </main>
    );
};

export default ViewFinanciers;