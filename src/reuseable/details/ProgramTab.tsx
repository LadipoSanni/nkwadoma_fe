"use client"
import React from 'react';
import {inter} from "@/app/fonts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface detailContainerProps {
    dataList: { label: string; value: string; }[];
    loanDetail: { label: string; value: string; }[];

}
export const ProgramTab: React.FC<detailContainerProps> = ({dataList, loanDetail}, ) => {

    return (
        <div id="cohort-details" data-testid="cohort-details"
             className={`${inter.className} md:border md:border-slate-200 md:rounded-md h-[384px]`}>
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
                            <TabsTrigger value={"trainee"} data-testid="trainees-tab">Loan details</TabsTrigger>
                        </TabsList>

                        <TabsContent value={"trainee-details-mock-data"} id="cohort-details-content"
                                     data-testid="cohort-details-content" className={`py-2 bg-grey105`}>
                            <div
                                className="bg-grey105 px-4 md:h-[289px] w-full h-96 py-2 bg- overflow-y-auto rounded-sm">
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

                        <TabsContent value={"trainee"} id="trainee-content" data-testid="trainee-content"
                                     className={`py-2 bg-grey105`}>
                            <div
                                className="bg-grey105 px-4 md:h-[289px] w-full h-96 py-2 overflow-y-auto rounded-sm">
                                {loanDetail.map((item, index) => (
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
                    </Tabs>
                </div>
            </div>
        </div>
    );
};