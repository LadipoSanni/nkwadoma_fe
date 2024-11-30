'use client';
import React, {useState, useEffect} from 'react';
import {inter, cabinetGrotesk} from '@/app/fonts';
import {MdClose, MdOutlineArrowBack} from 'react-icons/md';
import {IoGlobeOutline} from "react-icons/io5";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";
import SearchInput from "@/reuseable/Input/SearchInput";
import {Button} from "@/components/ui/button";
import LoanProductTable from "@/reuseable/table/LoanProductTable";
import {Book} from "lucide-react";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogTitle} from '@/components/ui/dialog';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface TableRowData {
    [key: string]: string | number | null | React.ReactNode;
}

interface viewAllProgramProps extends TableRowData {
    id?: string;
    name?: string;
    email?: string;
    programStatus?: string;
}

const OrganizationDetails = () => {
    const [adminView, setAdminView] = useState<viewAllProgramProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const handleInviteClick = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        setIsModalOpen(false);
    };

    const dataList = [
        {label: "Program mode", value: "Full-time"},
        {label: "Program delivery type", value: ""},
        {label: "Completion rate", value: "0%"},
        {label: "Employment rate", value: "0%"},
        {label: "Average starting income", value: ""},
    ]
    const loanDetail = [
        {detail: "Repayment rate", value: "0%"},
        {detail: "Debt percentage", value: "0%"},
        {detail: "Total loan amount disbursed", value: ""},
        {detail: "Total loan amount repaid", value: ""},
        {detail: "Total loan amount outstanding", value: ""},
    ]


    const adminsHeader = [
        {title: 'Full name', sortable: true, id: 'name', selector: (row: TableRowData) => row.name},
        {title: 'Email', sortable: true, id: 'email', selector: (row: TableRowData) => row.email},
        {
            title: <div className='relative md:right-4 md:left-4'>Status</div>,
            sortable: true,
            id: 'programStatus',
            selector: (row: TableRowData) => <span
                className={`pt-1 pb-1 pr-3 pl-3 rounded-xl ${row.programStatus === "Accepted" ? "text-success600 bg-[#E6F4EB]" : "text-error600 bg-error50"}`}>{row.programStatus ?? "Declined"}</span>
        },
    ];

    useEffect(() => {
        const mockData: viewAllProgramProps[] = [
            {id: '1', name: 'John Doe', email: 'john.doe@example.com', programStatus: 'Accepted'},
            {id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', programStatus: 'Declined'},
            {id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '4', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '5', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '6', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '7', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '8', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '9', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '10', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '11', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '12', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '13', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '14', name: 'Alice Johnson', email: 'alice.johnson@example.com', programStatus: 'Accepted'},
            {id: '15', name: 'Jane Smith', email: 'jane.smith@example.com', programStatus: 'Declined'},


        ];

        setAdminView(mockData);
    }, []);

    return (
        <main className={`${inter.className} grid gap-7 py-6 px-3 md:px-10`}>
            <div className={'inline-flex gap-2 items-center'}>
                <MdOutlineArrowBack className={'h-5 w-5 text-meedlBlue'}/>
                <p className={'text-meedlBlue font-medium text-[14px] leading-[150%]'}>Back to organization</p>
            </div>
            <Tabs defaultValue="details">
                <TabsList className={'p-0.5 gap-1 h-[2.0625rem] items-center cursor-pointer rounded-md bg-neutral100'}>
                    <TabsTrigger value="details"
                                 className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] w-[3.875rem] data-[state=active]:shadow-custom'}>Details</TabsTrigger>
                    <TabsTrigger value="admins"
                                 className={'py-1 px-2 gap-1 items-center rounded-md h-[1.8125rem] data-[state=active]:shadow-custom'}>Admins</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <div className={'mt-10 grid md:flex  md:justify-between'}>
                        <section className={'relative'}>
                            <Image src={'/asset/Image/Banner.svg'} alt={'banner'} height={134} width={351}/>
                            <div
                                className={'flex items-center justify-center absolute top-[70px] left-[14px] w-[140px] h-[140px] bg-greyBase200 rounded-full border-[10px] border-meedlWhite'}>
                                <Image src={'/asset/Image/semicolonLogo.svg'} alt={'organization logo'} height={70}
                                       width={70} className={''}/>
                            </div>
                            <div className={'grid mt-24 gap-3 '}>
                                <h1 className={`${cabinetGrotesk.className} text-black500 font-medium text-[24px] leading-[120%]`}>Semicolon
                                    africa</h1>
                                <div className={'flex items-center gap-2'}>
                                    <IoGlobeOutline className={'h-5 w-5 text-meedlBlue'}/>
                                    <p className={'text-meedlBlue text-[14px] font-medium leading-[150%]'}>www.semicolon.africa</p>
                                </div>
                            </div>
                        </section>
                        <div className={`relative md:w-6/12 md:pt-0 pt-0`}>
                            <DetailsTabContainer isTable={false} isNotTableDataList={loanDetail} dataList={dataList}
                                                 tabTitle1={"Organization details"} tabTitle2={"Loan details"}/></div>
                    </div>
                </TabsContent>

                <TabsContent value="admins" className={'mt-4'}>
                    <section className={'md:flex md:justify-between grid  gap-5 items-center mt-10'}>
                        <SearchInput id={'programCohortSearch'} value="search" onChange={() => {
                        }}/>
                        <Button
                            className={'h-[2.8125rem] md:w-[10.375rem] w-full rounded-md bg-meedlBlue hover:bg-meedlBlue text-meedlWhite text-[0.875rem] font-semibold leading-[150%] '}
                            onClick={handleInviteClick}>Invite
                            admin</Button>
                    </section>
                    <div id="programListView" className={'grid mt-7'}
                         style={{height: '62vh', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
                        <LoanProductTable
                            tableData={adminView.slice().reverse()}
                            tableHeader={adminsHeader}
                            staticHeader={"Programs"}
                            staticColunm={'name'}
                            tableHeight={42}
                            handleRowClick={() => {
                            }}
                            sx='cursor-pointer'
                            showKirkBabel={true}
                            icon={Book}
                            sideBarTabName='Program'
                            optionalRowsPerPage={10}
                        />
                    </div>


                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogOverlay className="bg-[rgba(52,64,84,0.70)] backdrop-blur-[6px]" />
                        <DialogContent className={'max-w-[425px] md:max-w-[533px] [&>button]:hidden gap-6 py-5 pl-5 pr-2'}>
                            <DialogHeader className={'flex py-3'} id="createCohortDialogHeader">
                                <DialogTitle className={`${cabinetGrotesk.className} text-[28px] font-medium text-labelBlue leading-[120%]`}>Invite admin</DialogTitle>
                                <DialogClose asChild>
                                    <button id="createCohortDialogCloseButton" className="absolute right-5">
                                        <MdClose id={'createCohortCloseIcon'} className="h-6 w-6 text-neutral950" />
                                    </button>
                                </DialogClose>
                            </DialogHeader>
                            <form className={`${inter.className} pr-2 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-10rem)]`} onSubmit={handleSubmit}>
                                <main className={'grid gap-5'}>
                                    <div className={'grid gap-2'}>
                                        <Label htmlFor="fullName" className="block text-sm font-medium text-labelBlue">Full Name</Label>
                                        <Input
                                            type="text"
                                            id="fullName"
                                            placeholder="Enter Full name"
                                            className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650'}
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className={'grid gap-2'}>
                                        <Label htmlFor="email" className="block text-sm font-medium text-labelBlue">Email Address</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="Enter email address"
                                            className={'p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650'}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-5 mt-3">
                                        <Button
                                            type="button"
                                            className="h-[3.5625rem] w-[8.75rem] border border-meedlBlue text-meedlBlue px-4 py-2 bg-gray-300 rounded-md"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className={`h-[3.5625rem] w-[8.75rem] px-4 py-2 bg-meedlBlue hover:bg-meedlBlue text-white rounded-md`}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </main>
                            </form>
                        </DialogContent>
                    </Dialog>

                </TabsContent>
            </Tabs>
        </main>
    );
};

export default OrganizationDetails;