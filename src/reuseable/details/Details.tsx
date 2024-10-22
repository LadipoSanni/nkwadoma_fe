"use client"
import React, { useState } from "react";
import { cabinetGrotesk, inter } from "@/app/fonts";
import { Card } from "@/components/ui/card";
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon, PersonIcon } from "@radix-ui/react-icons";
import { CiLaptop } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Tables from "../table/LoanProductTable";

interface detailsProps {
    imageSrc: string;
    cohortTitle: string;
    cohortDescription: string;
    traineesCount: number;
    dropoutsCount: number;
    dataList: { label: string; value: string; }[];
    breakDown: { title: string; amount: string; }[];
}

const Details: React.FC<detailsProps> =({
                           imageSrc,
                           cohortTitle,
                           cohortDescription,
                           traineesCount,
                           dropoutsCount,
                           dataList,
                           breakDown,
                       }) => {
    const [isDropdown, setIsDropdown] = useState(false);

    return (
        <main className={`${inter.className} flex flex-row gap-8 px-10 pt-10 justify-between`}>
            <div className={`flex flex-col md:block hidden space-y-5 max-w-sm`}>
                <div className={``}>
                    <Card className="rounded-lg">
                        <Image
                            src={imageSrc}
                            alt="Cohort Details"
                            width={300}
                            height={300}
                            className="w-full h-auto object-cover"
                        />
                    </Card>
                </div>
                <div className={`flex flex-col`}>
                    <h1 className={`${cabinetGrotesk.className} text-3xl font-medium text-black`}>
                        {cohortTitle}
                    </h1>
                    <p className={`${inter.className} text-grey450 pt-3`}>
                        {cohortDescription}
                    </p>

                    <div className={`flex flex-row space-x-3 pt-5 `}>
                        <div>
                            <span
                                id={`trainees`}
                                className={`${inter.className}  py-1 px-2 text-sm font-medium text-lightBlue300 w-30 bg-lightBlue300 rounded-full border border-slate-200 flex items-center space-x-2`}>
                                <CiLaptop className="w-4 h-4 text-meedlBlue" />
                                <span className={`${inter.className} text-meedlBlue`}>
                                    {traineesCount} trainees
                                </span>
                            </span>
                        </div>

                        <div>
                            <span
                                id={`dropouts`}
                                className={`${inter.className}  py-1 px-2 text-sm font-medium text-lightBlue300 w-30 bg-yellow300 rounded-full border border-slate-200 flex items-center space-x-2`}>
                                <PersonIcon className="w-4 h-4 text-meedlBlue" />
                                <span className={`${inter.className} text-meedlBlue`}>
                                    {dropoutsCount} dropouts
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`md:w-6/12 w-xs border border-slate-200 h-[96%] rounded-md`}>
                <div className={`px-4 py-3`}>
                    <div className={``}>
                        <Tabs className={`mb-3`}>
                            <TabsList>
                                <TabsTrigger value={"cohortDetails"}>Cohort Details</TabsTrigger>
                                <TabsTrigger value={"trainee"}>Trainees</TabsTrigger>
                            </TabsList>
                            <TabsContent value={"cohortDetails"}>
                                <div className="bg-grey105 px-4 py-4 h-[400px] overflow-y-auto rounded-sm">
                                    {dataList.map((item, index) => (
                                        <div key={index}
                                             className="flex md:flex-row flex-col justify-between py-2 space-y-4">
                                            <div className="text-black300">
                                                <p>{item.label}</p>
                                            </div>
                                            <div className="text-meedlBlack">
                                                <p>{item.value}</p>
                                            </div>
                                        </div>
                                    ))}

                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant={`secondary`} size={`lg`}
                                                    className={`bg-meedlWhite text-black300 focus:outline-none focus:ring-0 focus-visible:ring-0`}>
                                                Expand to see the tuition breakdown
                                            </Button>
                                            {/*<div className={`ml-4`}>*/}
                                            {/*    {isDropdown ? (*/}
                                            {/*        <ChevronUpIcon className={`h-4 w-5 font-bold`} />*/}
                                            {/*    ) : (*/}
                                            {/*        <ChevronDownIcon className={`h-4 w-5 font-bold`} />*/}
                                            {/*    )}*/}
                                            {/*</div>*/}
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className={``}>
                                            {breakDown.map((item, index) => (
                                                <div key={index}
                                                     className="flex md:flex-row flex-col justify-between space-y-4">
                                                    <div className="text-black300">
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="text-meedlBlack">
                                                        <p>{item.amount}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TabsContent>

                            <TabsContent value={"trainee"}>
                                {/*<Tables*/}
                                {/*    tableData={traineeData}*/}
                                {/*    tableHeader={ProgramHeader} */}
                                {/*/>*/}
                            </TabsContent>
                        </Tabs>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Details;
