import React from 'react';
import {inter} from "@/app/fonts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import Tables from "@/reuseable/table/LoanProductTable";
import {CohortTraineeData} from "@/utils/cohort/cohortDetails/Index";
import {MdOutlinePerson} from "react-icons/md";

interface detailContainerProps {
    dataList: { label: string; value: string; }[];
    breakDown?: { title: string; amount: string; }[];
}
export const DetailsTabContainer: React.FC<detailContainerProps> = ({dataList,
                                                                        breakDown, }) => {
    const [isDropdown, setIsDropdown] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
        setIsDropdown(!isDropdown);
    };

    const ProgramHeader = [
        {title: "Trainee", sortable: true, id: "trainee"},
        {title: "Referral Date", sortable: true, id: "referralDate"},
        {title: "Amount Requested", sortable: true, id: "amountRequested"},
    ];

    return(
        <div id="cohort-details" data-testid="cohort-details"
             className={`${inter.className} md:w-6/12 w-xs md:border md:border-slate-200 h-[96%] w-full md:rounded-md`}>
            <div id="tabs-section" data-testid="tabs-section" className={`md:p-4 p-2 `}>
                <div className={`w-full`}>
                    <Tabs
                        id="cohort-tabs"
                        data-testid="cohort-tabs"
                        defaultValue={"cohortDetails"}
                        className={`shadow-none`}
                    >
                        <TabsList id="tabs-list" data-testid="tabs-list" className={`px-1 py-1`}>
                            <TabsTrigger value={"cohortDetails"} data-testid="cohort-details-tab ">Cohort
                                details</TabsTrigger>
                            <TabsTrigger value={"trainee"} data-testid="trainees-tab">Trainees</TabsTrigger>
                        </TabsList>

                        <TabsContent value={"cohortDetails"} id="cohort-details-content"
                                     data-testid="cohort-details-content">
                            <div
                                className="bg-grey105 p-4 space-y-8 md:h-[450px] w-full h-96 overflow-y-auto rounded-sm">
                                {dataList.map((item, index) => (
                                    <div id={`data-item-${index}`} data-testid={`data-item-${index}`}
                                         key={index}
                                         className="flex md:flex-row flex-col w-full justify-between ">
                                        <div className="text-black300">
                                            <p>{item.label}</p>
                                        </div>
                                        <div className="text-meedlBlack">
                                            <p>{item.value}</p>
                                        </div>
                                    </div>
                                ))}

                                <Collapsible
                                    open={isOpen}
                                    onOpenChange={handleOpen}
                                    className="space-y-2 w-full bg-meedlWhite rounded-md"
                                    id="tuition-breakdown-collapsible"
                                    data-testid="tuition-breakdown-collapsible"
                                >
                                    <CollapsibleTrigger asChild className={`border-b`}
                                                        id="tuition-breakdown-trigger"
                                                        data-testid="tuition-breakdown-trigger">
                                        <Button variant="ghost" size="lg"
                                                className={`w-full focus:outline-none px-6 focus:ring-0  focus-visible:ring-0`}>
                                            <div
                                                className="flex justify-center gap-2 bg-meedlWhite w-full">
                                                <h4 className={`${inter.className} text-sm text-black300 flex items-center justify-between`}>
                                                    {isOpen ? "Collapse to hide the tuition breakdown" : "Expand to see the tuition breakdown"}
                                                </h4>
                                                <div>
                                                    {isDropdown ? (
                                                        <ChevronUpIcon className={`h-5 w-5 font-bold`}/>
                                                    ) : (
                                                        <ChevronDownIcon className={`h-5 w-5 font-bold`}/>
                                                    )}
                                                </div>
                                            </div>
                                        </Button>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="bg-meedlWhite px-2"
                                                        id="tuition-breakdown-content"
                                                        data-testid="tuition-breakdown-content">
                                        {breakDown && breakDown.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <div id={`breakdown-item-${index}`}
                                                     data-testid={`breakdown-item-${index}`}
                                                     className="flex md:flex-row flex-col py-4 justify-between">
                                                    <div className="text-black300">
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="text-meedlBlack">
                                                        <p>{item.amount}</p>
                                                    </div>
                                                </div>
                                                {index === 3 && index < breakDown.length - 1 && (
                                                    <DropdownMenuSeparator className="border-b"/>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            </div>
                        </TabsContent>

                        <TabsContent value={"trainee"} id="trainee-content" data-testid="trainee-content">
                            <Tables
                                tableData={CohortTraineeData}
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