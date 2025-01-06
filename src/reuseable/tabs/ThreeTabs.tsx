"use client"
import React from 'react';
import {inter} from "@/app/fonts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import {MdOutlinePerson} from "react-icons/md";
import {Breakdown} from "@/reuseable/details/breakdown";
import Tables from "@/reuseable/table/LoanProductTable";


interface detailContainerProps {
    dataList?: { label: string; value: string | React.ReactNode; }[];
    isNotTableDataList?: string
    breakDown?: { itemName: string; itemAmount: string; }[];
    tabTitle1: string;
    tabTitle2: string;
    useBreakdown?: boolean;
    isTable?: boolean;
}

export const ThreeTabs: React.FC<detailContainerProps> = ({
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
             className={`${inter.className} border border-slate-200 rounded-md md:p-3 px-2 py-3`}>
            <div id="tabs-section" data-testid="tabs-section" className={`md:p-3 px-2 py-3 `}>
                <div className={`w-full rounded-md`}>
                    <Tabs
                        id="cohort-tabs"
                        data-testid="cohort-tabs"
                        defaultValue={"productDetails"}
                        className={`shadow-none`}
                    >
                        <TabsList id="tabs-list" data-testid="tabs-list" className={`p-1`}>
                            <TabsTrigger id='productDetails' value={"productDetails"}
                                         data-testid="productDetails ">{tabTitle1}
                            </TabsTrigger>
                            <TabsTrigger id='termsAndCondition' value={"termsAndCondition"} data-testid="termsAndCondition">{tabTitle2}</TabsTrigger>
                            {/*<TabsTrigger id='disbursementTerms' value={"disbursementTerms"} data-testid="disbursementTerms">{tabTitle3}</TabsTrigger>*/}
                        </TabsList>

                        <div>

                        <TabsContent value={"productDetails"} id="cohort-details-content"
                                     data-testid="productDetails" className={`py-3`}>
                            <div
                                className="bg-[#F9F9F9] h-80 px-5 w-full overflow-y-auto rounded-sm">
                                {dataList?.map((item, index) => (
                                    <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                         key={index}
                                         className="flex md:flex-row py-5 flex-col w-full justify-between font-medium text-sm">
                                        <div id={`itemsId`} className="text-black300">
                                            <span id={`item`}>{item.label}</span>
                                        </div>
                                        <div id={`valueId`} className="text-meedlBlack">
                                            <span id={`value`}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                                {useBreakdown ? <Breakdown breakDown={breakDown}
                                /> : ""}
                            </div>
                        </TabsContent>

                            <TabsContent value={"termsAndCondition"} id="trainee-content" data-testid="trainee-content"
                                         className={`py-3 w-full `}>
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
                                        className="bg-[#F9F9F9] h-80 px-5 w-full py-2 overflow-y-auto rounded-sm">
                                        <div id={`data-item`} data-testid={`data-item`}
                                             className="flex md:flex-row flex-col w-full font-medium text-sm">
                                            {isNotTableDataList}
                                        </div>
                                    </div>
                                }
                            </TabsContent>

                            {/*<TabsContent value={"disbursementTerms"} id="trainee-content" data-testid="trainee-content"*/}
                            {/*             className={`py-3 w-full `}>*/}
                            {/*    <div*/}
                            {/*        className="bg-[#F9F9F9] h-80 px-5 w-full py-2 overflow-y-auto rounded-sm">*/}
                            {/*        <div id={`data-item`} data-testid={`data-item`}*/}
                            {/*             className="flex md:xcflex-row flex-col overflow-y-auto font-medium text-sm">*/}
                            {/*            {dataList3}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</TabsContent>*/}
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};