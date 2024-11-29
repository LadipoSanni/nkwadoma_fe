'use client';
import React from 'react';
import {inter, cabinetGrotesk} from '@/app/fonts'
import {MdOutlineArrowBack} from 'react-icons/md';
import {IoGlobeOutline} from "react-icons/io5";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {DetailsTabContainer} from "@/reuseable/details/DetailsTabContainer";

const OrganizationDetails = () => {
    const dataList = [
        {label: "Program mode", value: "Full-time"},
        {label: "Program delivery type", value: ""},
        {label: "Completion rate", value: "0%"},
        {label: "Employment rate", value: "0%"},
        {label: "Average starting income", value: ""},
    ];

    const loanDetail = [
        {detail: "Repayment rate", value: "0%"},
        {detail: "Debt percentage", value: "0%"},
        {detail: "Total loan amount disbursed", value: ""},
        {detail: "Total loan amount repaid", value: ""},
        {detail: "Total loan amount outstanding", value: ""},

    ]
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
                <div className={'mt-10 grid md:flex  md:justify-between'}>
                    <section className={' relative'}>
                        <Image src={'/asset/Image/Banner.svg'} alt={'banner'} height={134} width={351}/>
                        <div
                            className={'flex items-center justify-center absolute top-[70px] left-[14px] w-[140px] h-[140px] bg-greyBase200 rounded-full border-[10px] border-meedlWhite'}>
                            <Image src={'/asset/Image/semicolonLogo.svg'} alt={'organization logo'} height={70}
                                   width={70}
                                   className={''}/>
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
                                             tabTitle1={"Organization details"} tabTitle2={"Loan details"}/>
                    </div>

                </div>

                <TabsContent value="admins" className={'mt-4'}>
                </TabsContent>

            </Tabs>


        </main>
    );
};

export default OrganizationDetails;