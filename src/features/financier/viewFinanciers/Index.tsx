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
import { setCurrentFinancierId,setFinancierMode } from '@/redux/slice/financier/financier';
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
    const [tempSelectedFinancier, setTempSelectedFinancier] = useState(''); 
    const router = useRouter()
    const param = {
        pageNumber: pageNumber,
        pageSize: 10,
        financierType: selectedFinancier
    }


    const {data,isLoading,refetch} = useViewAllFinanciersQuery(param)
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
        { label: 'INDIVIDUAL', name: 'Individual' },
        { label: 'COOPERATE', name: 'Corporate' },
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
        setTempSelectedFinancier(financier);
    };

    const handleSubmit = () => {
        setSelectedFinancier(tempSelectedFinancier)
            refetch()
       
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleReset = () => {
        setTempSelectedFinancier('')
        setSelectedFinancier('');
        setIsDropdownOpen(false);
    };


    const financierHeader = [
        { title: 'Name', id: 'name', selector: (row: viewAllfinancier) => row?.financierType === "INDIVIDUAL"? row.userIdentity?.firstName + " " + row.userIdentity?.lastName : row?.organizationName},
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
    };



    return (
        <main className={'mt-7 mx-5'}>
            <section className={'md:flex justify-between grid gap-4'}>
                <div className={'flex gap-3'}>
                    <SearchInput id={'financiersSearch'} style='' value={searchTerm} onChange={handleSearchChange} />
                    <DropdownSelect
                        selectValue={tempSelectedFinancier}
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
                    onClick={() => setIsModalOpen(true)}
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