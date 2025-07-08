"use client"
import React from 'react';
import {inter} from "@/app/fonts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import {MdOutlinePerson} from "react-icons/md";
import {Breakdown} from "@/reuseable/details/breakdown";
import Tables from "@/reuseable/table/LoanProductTable";
import style from "@/components/selected-loan/SelectedLoan.module.css";

interface detailContainerProps {
    dataList?: { label: string; value: string | React.ReactNode; }[];
    isNotTableDataList?: { detail: string; value: string }[]
    breakDown?: { itemName: string; itemAmount: string; }[];
    tabTitle1: string;
    tabTitle2: string;
    useBreakdown?: boolean;
    isTable?: boolean;
}

export const DetailsTabContainer: React.FC<detailContainerProps> = ({
                                                                        dataList, breakDown,
                                                                        tabTitle1, tabTitle2, useBreakdown = false,
                                                                        isTable = true, isNotTableDataList
                                                                    }) => {
    const ProgramHeader = [
        {title: "Loanee", sortable: true, id: "trainee"},
        {title: "Referral Date", sortable: true, id: "referralDate"},
        {title: "Amount Requested", sortable: true, id: "amountRequested"},
    ];

    return (
        <div id="cohort-details" data-testid="cohort-details"
             className={`${inter.className} border border-slate-200 rounded-md md:p-3 px-2`}>
            <div id="tabs-section" data-testid="tabs-section" className={`md:p-3 px-2 py-3 `}>
                <div className={`w-full rounded-md`}>
                    <Tabs
                        id="cohort-tabs"
                        data-testid="cohort-tabs"
                        defaultValue={"trainee-details-mock-data"}
                        className={`shadow-none`}
                    >
                        <div className={`${style.scrollBarNone} overflow-x-auto`}>
                        <TabsList id="tabs-list" data-testid="tabs-list" className={`p-1`}>
                            <TabsTrigger id='tabTitleOne' value={"trainee-details-mock-data"}
                                         data-testid="cohort-details-tab ">{tabTitle1}
                            </TabsTrigger>
                            <TabsTrigger id='tabTitleTwo' value={"trainee"} data-testid="trainees-tab">{tabTitle2}</TabsTrigger>
                        </TabsList>
                        </div>

                        <TabsContent value={"trainee-details-mock-data"} id="cohort-details-content"
                                     data-testid="cohort-details-content" className={`py-2`}>
                            <div
                                className={`bg-[#F9F9F9] grid gap-4 min-h-[45vh] md:max-h-[53vh] px-5 py-2 overflow-x-hidden w-full md:overflow-y-auto rounded-sm`}>
                                {dataList?.map((item, index) => (
                                    <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                         key={index}
                                         className="flex md:flex-row py-5 md:py-2 flex-col w-full justify-between font-medium text-sm">
                                        <div className="text-black300">
                                            <span className={` text-[14px] ${inter.className} `}>{item.label}</span>
                                        </div>
                                        <div className="text-meedlBlack">
                                            <span className={` text-[14px] ${inter.className} `}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                                {useBreakdown ? <Breakdown breakDown={breakDown}
                                /> : ""}
                            </div>
                        </TabsContent>

                        <TabsContent value={"trainee"} id="trainee-content" data-testid="trainee-content"
                                     className={`py-2 w-full `}>
                            {isTable ?
                                <Tables
                                    tableData={traineeData}
                                    tableHeader={ProgramHeader}
                                    staticHeader={'Trainee'}
                                    staticColunm={'trainee'}
                                    tableHeight={41.5}
                                    icon={MdOutlinePerson}
                                    sideBarTabName={"Trainee"}
                                    handleRowClick={() => {
                                    }}
                                    optionalRowsPerPage={10}
                                    tableCellStyle={'h-12'}
                                />
                                :
                                <div
                                    className="bg-[#F9F9F9] grid gap-2 min-h-[40vh] md:max-h-[40vh]  px-5 w-full py-2 md:overflow-y-auto rounded-sm">
                                    {isNotTableDataList?.map((item, index) => (
                                        <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                             key={index}
                                             className="flex md:flex-row py-5  md:py-2 flex-col w-full justify-between font-medium text-sm">
                                            <div className="text-black300">
                                                <span className={`${inter.className} text-[14px] `}>{item.detail}</span>
                                            </div>
                                            <div className="text-meedlBlack">
                                                <span className={` ${inter.className} text-[14px]`}>{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};