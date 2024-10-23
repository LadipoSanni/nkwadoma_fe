"use client"
import React, {useState} from 'react';
import { MdOutlinePeopleAlt } from "react-icons/md";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {PersonIcon} from "@radix-ui/react-icons";
import {inter} from "@/app/fonts";
import Kebab from "@/reuseable/Kebab/Kebab";

interface ProgramList {
    id: string;
    title: string;
    description: string;
    trainees: number;
    months: number;
    cohorts: number;
    dropdownOption: { name: string, id: string }[];
}

const AllProgramsCard: React.FC<ProgramList> = ({id, title, description, trainees, months, cohorts, dropdownOption}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const shortDescription = description.length > 90 && !isExpanded
        ? description.substring(0, 80)
        : description;

    return (
        <Card id={`allProgramsCard-${id}`} data-testid="allProgramsCard"  className="w-full md:max-w-lg  border border-grey50 rounded-lg">
            <CardHeader id={`header-${id}`} data-testid="header" className="flex flex-row justify-between items-center">
                <CardTitle id={`title-${id}`} data-testid="title" className={`${inter.className} text-lg font-medium text-[#101828]`}>{title}</CardTitle>
                    <Kebab kebabOptions={dropdownOption} />
            </CardHeader>

            <CardContent id={`contentId-${id}`} data-testid={`contentId`}>
                <CardDescription id={`description-${id}`} data-testid="description" className={`${inter.className}  text-sm text-grey450`}>
                    {shortDescription}
                    {description.length > 90 && (
                        <span
                            id={`readMore-${id}`}
                            data-testid="readMore"
                            onClick={toggleDescription}
                            className="${inter.className} text-grey450 cursor-pointer ml-2"
                        >

              {isExpanded ? "...." : "...."}
            </span>
                    )}
                </CardDescription>

                <div id={`details-${id}`} data-testid="details" className="inline-flex flex-col justify-start mt-4 w-full space-y-3">
                    <div id={`traineesAndMonths-${id}`} data-testid="traineesAndMonths" className="flex flex-row space-x-2">
                            <div>
                                <span
                                    id={`trainees-${id}`}
                                    data-testid="trainees"
                                    className={`${inter.className}  py-1 px-2 text-sm font-medium text-meedlBlue w-30 bg-gray rounded-full border border-slate-200 flex items-center space-x-2`}>
                                    <PersonIcon className="w-4 h-4 text-black"/>
                                    <span className={`${inter.className} text-meedlBlue`}>{trainees} trainees</span>
                                </span>
                            </div>

                        <div>
                            <span
                                id={`months-${id}`}
                                data-testid="months"
                                className="py-1 px-2 text-sm font-medium w-28 text-meedlBlue bg-gray rounded-full border border-slate-200 flex items-center space-x-2">
                                  <MdOutlineCalendarMonth className="w-4 h-4 text-black"/>
                                  <span className={`${inter.className} text-meedlBlue`}>{months} months</span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <span
                            id={`cohorts-${id}`}
                            data-testid="cohorts"
                            className="py-1 px-2 text-sm w-28 font-medium text-meedlBlue bg-gray rounded-full border border-slate-200 flex items-center space-x-2">
                          <MdOutlinePeopleAlt className="w-4 h-4 text-black"/>
                          <span className={`${inter.className} text-meedlBlue`}>{cohorts} cohorts</span>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AllProgramsCard;
