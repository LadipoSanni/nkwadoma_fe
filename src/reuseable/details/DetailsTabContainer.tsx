"use client"
import React from 'react';
import {inter} from "@/app/fonts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Tables from "@/reuseable/table/LoanProductTable";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import {MdOutlinePerson} from "react-icons/md";
import {Breakdown} from "@/reuseable/details/breakdown";

interface detailContainerProps {
    dataList?: { label: string; value: string; }[];
    isNotTableDataList?: {detail: string; value: string}[]
    breakDown?: { title: string; amount: string; }[];
    tabTitle1: string;
    tabTitle2: string;
    useBreakdown?: boolean;
    isTable?: boolean;
}

export const DetailsTabContainer: React.FC<detailContainerProps> = ({
                                                                        dataList, breakDown,
                                                                        tabTitle1, tabTitle2, useBreakdown = false,
                                                                        isTable=true, isNotTableDataList
                                                                    }) => {

    const ProgramHeader = [
        {title: "Trainee", sortable: true, id: "trainee"},
        {title: "Referral Date", sortable: true, id: "referralDate"},
        {title: "Amount Requested", sortable: true, id: "amountRequested"},
    ];

    return (
        <div id="cohort-details" data-testid="cohort-details"
             className={`${inter.className} border border-slate-200 rounded-md md:p-3 px-2 py-3`}>
            <div id="tabs-section" data-testid="tabs-section" className={`md:p-3 px-2 py-3 `}>
                <div className={`w-full rounded-md`}>
                    <Tabs
                        id="cohort-tabs"
                        data-testid="cohort-tabs"
                        defaultValue={"trainee-details-mock-data"}
                        className={`shadow-none`}
                    >
                        <TabsList id="tabs-list" data-testid="tabs-list" className={`p-1`}>
                            <TabsTrigger value={"trainee-details-mock-data"}
                                         data-testid="cohort-details-tab ">{tabTitle1}
                            </TabsTrigger>
                            <TabsTrigger value={"trainee"} data-testid="trainees-tab">{tabTitle2}</TabsTrigger>
                        </TabsList>

                        <TabsContent value={"trainee-details-mock-data"} id="cohort-details-content"
                                     data-testid="cohort-details-content" className={`py-2`}>
                            <div
                                className="bg-[#F9F9F9] px-5 md:h-[450px] w-full h-96 py-2 overflow-y-auto rounded-sm">
                                {dataList?.map((item, index) => (
                                    <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                         key={index}
                                         className="flex md:flex-row py-5 flex-col w-full justify-between font-medium text-sm">
                                        <div className="text-black300">
                                            <p>{item.label}</p>
                                        </div>
                                        <div className="text-meedlBlack">
                                            <p>{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                                {useBreakdown ? <Breakdown breakDown={breakDown}
                                /> : ""}
                            </div>
                        </TabsContent>

                        <TabsContent value={"trainee"} id="trainee-content" data-testid="trainee-content"
                                     className={`py-3 w-full `}>
                            {isTable?
                                <Tables
                                tableData={traineeData}
                                tableHeader={ProgramHeader}
                                staticHeader={'Trainee'}
                                staticColunm={'trainee'}
                                tableHeight={51}
                                icon={MdOutlinePerson}
                                sideBarTabName={"Trainee"}
                                handleRowClick={() => {
                                }}
                                optionalRowsPerPage={10}
                                tableCellStyle={'h-12'}
                            />
                                :
                                    <div
                                        className="bg-[#F9F9F9] px-5 w-full h-96 p-5 overflow-y-auto rounded-sm">
                                        {isNotTableDataList?.map((item, index) => (
                                            <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                                 key={index}
                                                 className="flex md:flex-row py-5 flex-col w-full justify-between font-medium text-sm">
                                                <div className="text-black300">
                                                    <p>{item.detail}</p>
                                                </div>
                                                <div className="text-meedlBlack">
                                                    <p>{item.value}</p>
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