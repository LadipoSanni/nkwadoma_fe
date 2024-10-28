"use client"
import React, {ElementType} from "react";
import {cabinetGrotesk, inter} from "@/app/fonts";
import {Card} from "@/components/ui/card";
import Image from 'next/image';
import {ChevronDownIcon, ChevronUpIcon, PersonIcon} from "@radix-ui/react-icons";
import {CiLaptop} from "react-icons/ci";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Tables from "../table/LoanProductTable";
import {CohortTraineeData} from "@/utils/cohort/cohortDetails/Index";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import { BiArrowBack } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import CreateProgramButton from "@/features/admin/program/createProgramButton/Index";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";


interface detailsProps {
    imageSrc?: string;
    cohortTitle: string;
    cohortDescription: string;
    traineesCount: number;
    dropoutsCount: number;
    dataList: { label: string; value: string; }[];
    breakDown?: { title: string; amount: string; }[];
    icon?: ElementType
    goBackText: string
    handleBackClick: () => void
}

const Details: React.FC<detailsProps> = ({
                                             imageSrc,
                                             cohortTitle,
                                             cohortDescription,
                                             traineesCount,
                                             dropoutsCount,
                                             dataList,
                                             breakDown,
                                             icon:Icon,
                                             goBackText: GoBackText,
                                             handleBackClick: HandleBackClick,
                                         }) => {
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



    return (
        <main id="details-main" data-testid="details-main"
              className={`${inter.className}  gap-8 md:p-6 p-4 `}>
            <div className={`flex cursor-pointer items-center space-x-2 text-meedlBlue`} onClick={HandleBackClick}>
                <BiArrowBack/>
                <h1>{GoBackText}</h1>
            </div>

            <div className={`flex flex-row justify-between py-4 `}>
            <div id="cohort-image-section" data-testid="cohort-image-section"
                 className={`flex flex-col md:block hidden space-y-5 max-w-sm`}>
                <div id="cohort-image-card" data-testid="cohort-image-card" className={``}>
                    <Card className="rounded-lg">
                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt="Cohort Details"
                                width={300}
                                height={300}
                                className="w-full h-auto object-cover"
                                data-testid="cohort-image"
                            />
                        ) : Icon ? (
                            <div className="w-full h-72 flex justify-center items-center">
                                <Icon className="text-6xl text-meedlBlue"/>
                            </div>
                        ) : null}
                    </Card>
                </div>

                <div id="cohort-info" data-testid="cohort-info" className={`flex flex-col`}>
                    <h1 id="cohort-title" data-testid="cohort-title"
                        className={`${cabinetGrotesk.className} text-3xl font-medium text-black`}>
                        {cohortTitle}
                    </h1>
                    <p id="cohort-description" data-testid="cohort-description"
                       className={`${inter.className} text-grey450 text-sm py-3`}>
                        {cohortDescription}
                    </p>

                    <div id="cohort-stats" data-testid="cohort-stats" className={`flex flex-row space-x-3`}>
                        <div id="trainees-count" data-testid="trainees-count">
                            <span
                                id={`trainees`}
                                className={`${inter.className}  py-1 px-2 text-sm font-medium text-lightBlue300 w-full bg-lightBlue300 rounded-full border border-slate-200 flex items-center space-x-2`}>
                                <CiLaptop className="w-4 h-4 text-meedlBlue"/>
                                <span className={`${inter.className} text-meedlBlue`}>
                                    {traineesCount} trainees
                                </span>
                            </span>
                        </div>

                        <div id="dropouts-count" data-testid="dropouts-count">
                            <span
                                id={`dropouts`}
                                className={`${inter.className}  py-1 px-2 text-sm font-medium text-lightBlue300 w-full bg-yellow300 rounded-full border border-slate-200 flex items-center space-x-2`}>
                                <PersonIcon className="w-4 h-4 text-meedlBlue"/>
                                <span className={`${inter.className} text-meedlBlue`}>
                                    {dropoutsCount} dropouts
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className={`flex flex-row space-x-3 pt-5`}>
                        <CreateProgramButton  buttonText={"Edit program"} title={"Edit Cohort"}
                                              programDeliveryTypes={["Full-time", "Part-time"]}
                                              programModes={["Online", "Physical"]}
                                              programDurations={["3years", "4years"]} useSecondaryButton={false} submitButtonText={"Save Cohort"}/>
                        <Button size={"lg"} variant={"outline"}>
                            <IoEllipsisHorizontal/>
                        </Button>
                        <div id="dropdownSkidding"
                             className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul className="py-2 text-sm text-meedlBlack"
                                aria-labelledby="dropdownDefault">
                                <li>
                                    <a href="#"
                                       className="block px-4 py-2 bg-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

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
                                        <div id={`data-item-${index}`} data-testid={`data-item-${index}`} key={index}
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
                                            <Button variant="ghost" size="lg" className={`w-full focus:outline-none px-6 focus:ring-0  focus-visible:ring-0`}>
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
                                                        <DropdownMenuSeparator className="border-b" />
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
                                    tableHeight={53}
                                    handleRowClick={() => {
                                    }}
                                    tableCellStyle={'h-14'}
                                    optionalRowsPerPage={10}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            </div>
        </main>
    );
};

export default Details;