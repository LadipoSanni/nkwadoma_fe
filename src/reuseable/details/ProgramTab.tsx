"use client"
import React from 'react';
import {inter} from "@/app/fonts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Tables from "@/reuseable/table/LoanProductTable";
import {traineeData} from "@/utils/cohort/trainee-details-mock-data/Index";
import {MdOutlinePerson} from "react-icons/md";

interface detailContainerProps {
    dataList: { label: string; value: string; }[];
}
export const ProgramTab: React.FC<detailContainerProps> = ({dataList}) => {


    const ProgramHeader = [
        {title: "Trainee", sortable: true, id: "trainee"},
        {title: "Referral Date", sortable: true, id: "referralDate"},
        {title: "Amount Requested", sortable: true, id: "amountRequested"},
    ];

    return (
        <div id="cohort-details" data-testid="cohort-details"
             className={`${inter.className} md:border md:border-slate-200 md:rounded-md`}>
            <div id="tabs-section" data-testid="tabs-section" className={`md:p-3 p-2 `}>
                <div className={`w-full`}>
                    <Tabs
                        id="cohort-tabs"
                        data-testid="cohort-tabs"
                        defaultValue={"trainee-details-mock-data"}
                        className={`shadow-none`}
                    >
                        <TabsList id="tabs-list" data-testid="tabs-list" className={`px-1 py-1`}>
                            <TabsTrigger value={"trainee-details-mock-data"} data-testid="cohort-details-tab ">Program
                                details</TabsTrigger>
                            <TabsTrigger value={"trainee"} data-testid="trainees-tab">Cohorts</TabsTrigger>
                        </TabsList>

                        <TabsContent value={"trainee-details-mock-data"} id="cohort-details-content"
                                     data-testid="cohort-details-content" className={`py-2`}>
                            <div
                                className="bg-grey105 px-4 md:max-h-[80vh] w-full h-96 py-2 overflow-y-auto rounded-sm">
                                {dataList.map((item, index) => (
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

                            </div>
                        </TabsContent>

                        <TabsContent value={"trainee"} id="trainee-content" data-testid="trainee-content" className={`py-2`}>
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
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};