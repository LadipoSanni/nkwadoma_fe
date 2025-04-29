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
    // const [setIsDropdownOpen] = useState(false);
    const [financiers, setFinanciers] = useState<viewAllfinancier[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasNextPage,setNextPage] = useState(false)
    const [totalPage,setTotalPage] = useState(0)
    const [pageNumber,setPageNumber] = useState(0)
    // const [setTypeSelectedFinancier] = useState('');
    const [selectedActivationStatusTab, setSelectedActivationStatusTab] = useState('active');
    const router = useRouter()
    const param = {
        pageNumber: pageNumber,
        pageSize: 10,
        financierType: selectedFinancier.toUpperCase(),
        activationStatus: selectedActivationStatusTab.toUpperCase(),
    }


    const {data, isLoading, refetch} = useGetAllActiveAndInvitedFinanciersQuery(param)
    const {data:searchData, isLoading: searchIsLoading} = useSearchFinancierQuery({name:searchTerm, pageNumber: pageNumber, pageSize: 10, activationStatus: selectedActivationStatusTab.toUpperCase()},{skip: !searchTerm})

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


    // const listOfFinanciers = [
    //     { label: 'INDIVIDUAL', name: 'Individual' },
    //     { label: 'COOPERATE', name: 'Corporate' },
    // ];
    //
    // const initialFormValue: FormValues = {
    //     selectValue: '',
    //     financier: 'Individual',
    // };
    //
    // const validationSchema = Yup.object().shape({
    //     selectValue: Yup.string().required('Select value is required'),
    //     financier: Yup.string().required('Financier is required'),
    // });

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // const handleSelectFinancier = (financier: string) => {
    //     setTypeSelectedFinancier(financier);
    // };

    // const handleSubmit = () => {
    //     setSelectedFinancier(tempSelectedFinancier)
    //         refetch()
    //
    // };
    //
    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen);
    // };

    const handleReset = () => {
        // setTypeSelectedFinancier('')
        setSelectedFinancier('');
        // setIsDropdownOpen(false);
        refetch();
    };


    const financierHeader = [
        { title: 'Name', id: 'name', selector: (row: viewAllfinancier) => row?.financierType === "INDIVIDUAL"? row.userIdentity?.firstName + " " + row.userIdentity?.lastName : row?.organizationName},
        { title: 'Type', id: 'type', selector: (row: viewAllfinancier) => (
                <span className={`${row.financierType === "INDIVIDUAL"  ? 'text-[#66440A] bg-[#FEF6E8]' : 'text-[#142854] bg-[#EEF5FF]'} rounded-[32px] px-2 h-5`}>
            {capitalizeFirstLetters(row.financierType)}
        </span>
            ) },
        { title: 'No. of investments', id: 'investments', selector: (row:viewAllfinancier) => row.investments || 0 },
        { title: 'Amount invested', id: 'amountInvested', selector: (row:viewAllfinancier) => formatAmount(row.amountInvested) },
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
        <main className={'mt-7 mx-5'}>
            <section className={'md:flex justify-between grid gap-4'}>
                <div className={'flex gap-3'}>
                    <SearchInput id={'financiersSearch'} style='' value={searchTerm} onChange={handleSearchChange} />
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
                        placeHolder="Select type"
                        triggerId="financierSelectId"
                        className="h-11 md:w-sm w-full mt-0 bg-[#F7F7F7] border border-[#D0D5DD]"
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

            <div className={`pt-5`}>
                <Tabs value={selectedActivationStatusTab} onValueChange={setSelectedActivationStatusTab} >
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
                            {searchTerm && financiers.length === 0 ? (
                                <div className={`flex justify-center items-center text-center md:h-[32vh] h-[40%] w-full mt-32`}>
                                    <SearchEmptyState icon={MdSearch} name="Financier" />
                                </div>
                            ) : (
                                <Table
                                    tableData={financiers}
                                    tableHeader={financierHeader}
                                    handleRowClick={handleRowClick}
                                    tableHeight={58}
                                    icon={MdOutlineBusinessCenter }
                                    sideBarTabName='financier'
                                    condition={true}
                                    staticHeader={"Financier"}
                                    staticColunm={"name"}
                                    sx='cursor-pointer'
                                    hasNextPage={hasNextPage}
                                    pageNumber={pageNumber}
                                    setPageNumber={setPageNumber}
                                    totalPages={totalPage}
                                    isLoading={isLoading || searchIsLoading}
                                />
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value={"invited"} className={`pt-3`}>
                        <Table
                            tableData={financiers}
                            tableHeader={financierHeader}
                            handleRowClick={handleRowClick}
                            tableHeight={58}
                            icon={MdOutlineBusinessCenter }
                            sideBarTabName='financier'
                            condition={true}
                            staticHeader={"Financier"}
                            staticColunm={"name"}
                            sx='cursor-pointer'
                            hasNextPage={hasNextPage}
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalPages={totalPage}
                            isLoading={isLoading || searchIsLoading}
                        />

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
                        <InviteFinanciers  setIsOpen={setIsModalOpen} />
                    </Modal>
                </div>
            )}
        </main>
    );
};

export default ViewFinanciers;