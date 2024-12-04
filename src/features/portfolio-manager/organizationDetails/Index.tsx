'use client'
import React, { useState, useEffect } from 'react';
import { inter, cabinetGrotesk } from '@/app/fonts';
import { MdOutlineArrowBack } from 'react-icons/md';
import { IoGlobeOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { DetailsTabContainer } from "@/reuseable/details/DetailsTabContainer";
import SearchInput from "@/reuseable/Input/SearchInput";
import { Button } from "@/components/ui/button";
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import { Book } from "lucide-react";
import InviteAdminDialog from "@/reuseable/modals/InviteAdminDialog/Index";
import { useViewAllAdminsInOrganizationQuery } from '@/service/admin/organization';
import { useRouter } from 'next/navigation';


interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

const OrganizationDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page] = useState(0);

    const { data: adminData } = useViewAllAdminsInOrganizationQuery({
        organizationId: '0e1e93ee-3392-4de4-90f0-2f29b9c6a7dc',
        pageNumber: page,
        pageSize: 100
    });

    const router = useRouter();

    const handleBackClick = () => {
        router.push('/organizations');
    };

    const handleInviteClick = () => {
        setIsModalOpen(true);
    };

    const setAdminView = (data: typeof adminData) => {
        // Define the function logic here
        console.log(data);
    };

    const details = { cohortStatus: "Active" };

    const dataList = [
        { label: "Phone number", value: "+2349000021111" },
        {
            label: "Status",
            value: <span className={`rounded-[32px] h-[21px] w-[58px] flex items-center justify-center ${details.cohortStatus === "Active" ? "bg-[#E7F5EC] text-[#063F1A]" : "bg-[#FEF6E8] text-[#66440A]"}`}>
                {details.cohortStatus}
            </span>
        },
        { label: "Address", value: "312, Herbert Macaulay Way, Alagomeji, Yaba." },
        { label: "Number of programs", value: "20" },
        { label: "Number of cohorts", value: "30" },
        { label: "Number of trainees", value: "2,000" },
        { label: "Still in training", value: "57" },
    ];

    const loanDetail = [
        { detail: "Number of loan requests", value: "200,000" },
        { detail: "Pending loan offers", value: "1,000" },
        { detail: "Number of performing loans", value: "120,000" },
        { detail: "Number of non-performing loans", value: "5" },
        { detail: "Historical debt", value: "₦92,500,000.00" },
        { detail: "Amount repaid (in percent)", value: "₦59,500,000.00 (50.3%)" },
        { detail: "Amount outstanding", value: "₦33,000,000.00" },
        { detail: "Moratorium (in percent)", value: "₦10,000,000.00 (30.8%)" },
    ];

    const adminsHeader = [
        { title: 'Full name', sortable: true, id: 'name', selector: (row: TableRowData) => row.name },
        { title: 'Email', sortable: true, id: 'email', selector: (row: TableRowData) => row.email },
        {
            title: <div className='relative md:right-4 md:left-4'>Status</div>,
            sortable: true,
            id: 'adminStatus',
            selector: (row: TableRowData) => (
                <span className={`pt-1 pb-1 pr-3 pl-3 rounded-xl ${row.adminStatus === "Active" ? "text-[#063F1A] bg-[#E7F5EC]" : row.adminStatus === "Invited" ? "text-[#142854] bg-[#F3F8FF]" : "text-[#59100D] bg-[#FBE9E9]"}`}>
                    {row.adminStatus ?? "Deactivated"}
                </span>
            ),
        },
    ];

    useEffect(() => {
        if (adminData) {
            setAdminView(adminData);
        }
    }, [adminData]);

    return (
        <main className={`${inter.className} grid gap-7 py-6 px-3 md:px-10`}>
            <div onClick={handleBackClick} className={'inline-flex  w-[10.375rem] cursor-pointer gap-2 items-center'}>
                <MdOutlineArrowBack className={'h-5 w-5 text-meedlBlue'} />
                <p className={'text-meedlBlue font-medium text-[14px] leading-[150%]'}>Back to organization</p>
            </div>
            <Tabs defaultValue="details">
                <TabsList className={'p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100'}>
                    <TabsTrigger value="details" className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] w-[3.875rem] data-[state=active]:shadow-custom'}>Details</TabsTrigger>
                    <TabsTrigger value="admins" className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom'}>Admins</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <div className={'mt-10 grid gap-9 md:gap-0 md:flex  md:justify-between'}>
                        <section className={'relative'}>
                            <Image src={'/asset/Image/Banner.svg'} alt={'banner'} height={134} width={351} />
                            <div className={'flex items-center justify-center absolute top-[70px] left-[14px] w-[140px] h-[140px] bg-greyBase200 rounded-full border-[10px] border-meedlWhite'}>
                                <Image src={'/asset/Image/semicolonLogo.svg'} alt={'organization logo'} height={70} width={70} className={''} />
                            </div>
                            <div className={'grid mt-24 gap-3 '}>
                                <h1 className={`${cabinetGrotesk.className} text-black500 font-medium text-[24px] leading-[120%]`}>Semicolon africa</h1>
                                <div className={'flex items-center gap-2'}>
                                    <IoGlobeOutline className={'h-5 w-5 text-meedlBlue'} />
                                    <p className={'text-meedlBlue text-[14px] font-medium leading-[150%]'}>www.semicolon.africa</p>
                                </div>
                            </div>
                        </section>
                        <div className={`relative md:w-6/12 md:pt-0 pt-0`}>
                            <DetailsTabContainer isTable={false} isNotTableDataList={loanDetail} dataList={dataList} tabTitle1={"Organization details"} tabTitle2={"Loan details"} />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="admins" className={'mt-4'}>
                    <section className={'md:flex md:justify-between grid  gap-5 items-center mt-10'}>
                        <SearchInput id={'programCohortSearch'} value="search" onChange={() => { }} />
                        <Button className={'h-[2.8125rem] md:w-[10.375rem] w-full rounded-md bg-meedlBlue hover:bg-meedlBlue text-meedlWhite text-[0.875rem] font-semibold leading-[150%] '} onClick={handleInviteClick}>Invite admin</Button>
                    </section>
                    <div id="programListView" className={'grid mt-7'} style={{ height: '62vh', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <LoanProductTable
                            tableData={adminData?.data.body}
                            tableHeader={adminsHeader}
                            staticHeader={"Programs"}
                            staticColunm={'name'}
                            tableHeight={42}
                            handleRowClick={() => { }}
                            sx='cursor-pointer'
                            showKirkBabel={true}
                            icon={Book}
                            sideBarTabName='Program'
                            optionalRowsPerPage={10}
                        />
                    </div>

                    <InviteAdminDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                </TabsContent>
            </Tabs>
        </main>
    );
};

export default OrganizationDetails;