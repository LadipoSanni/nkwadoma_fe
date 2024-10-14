"use client"
import React, {useState} from 'react';
import { MdOutlinePeopleAlt } from "react-icons/md";
import {FiMoreVertical} from "react-icons/fi";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {PersonIcon} from "@radix-ui/react-icons";
import {cabinetGroteskBold} from "@/app/fonts";

interface CourseCardProps {
    title: string;
    description: string;
    trainees: number;
    months: number;
    cohorts: number;
}

const AllProgramsCard: React.FC<CourseCardProps> = ({title, description, trainees, months, cohorts}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const shortDescription = description.length > 90 && !isExpanded
        ? description.substring(0, 80)
        : description;

    return (
        <Card id="allProgramsCard" data-testid="allProgramsCard"  className="w-full max-w-xs border border-grey50 shadow-md rounded-lg">
            <CardHeader id="header" data-testid="header" className="flex flex-row justify-between items-center">
                <CardTitle id="title" data-testid="title" className={`${cabinetGroteskBold.className} text-lg font-medium text-[#101828]`}>{title}</CardTitle>
                <Button  id="menuIcon" data-testid="menuIcon" variant="ghost" size="icon" className="text-gray-500">
                    <FiMoreVertical className="w-5 h-5"/>
                </Button>
            </CardHeader>

            <CardContent id={`contentId`} data-testid={`contentId`}>
                <CardDescription id="description" data-testid="description" className="text-sm text-grey1">
                    {shortDescription}
                    {description.length > 90 && (
                        <span
                            id="readMore"
                            data-testid="readMore"
                            onClick={toggleDescription}
                            className="text-blue-600 cursor-pointer ml-2"
                        >
              {isExpanded ? "...." : "...."}
            </span>
                    )}
                </CardDescription>

                <div id="details" data-testid="details" className="inline-flex flex-col justify-start mt-4 w-full space-y-2">
                    <div id="traineesAndMonths" data-testid="traineesAndMonths" className="flex flex-row space-x-2">
                            <div>
                                <span
                                    id="trainees" data-testid="trainees"
                                    className="py-1 px-2 text-sm font-medium text-gray-900 w-28 bg-gray rounded-full border border-slate-200 flex items-center space-x-1">
                                    <PersonIcon className="w-4 h-4 text-black"/>
                                    <span className="text-[#142854]">{trainees} trainees</span>
                                </span>
                            </div>

                        <div>
                            <span
                                id="months" data-testid="months"
                                className="py-1 px-2 text-sm font-medium w-28 text-gray-00 bg-gray rounded-full border border-slate-200 flex items-center space-x-1">
                                  <MdOutlineCalendarMonth className="w-4 h-4 text-black"/>
                                  <span className="text-[#142854]">{months} months</span>
                            </span>
                        </div>
                    </div>
                    <div>
                        <span
                            id="cohorts" data-testid="cohorts"
                            className="py-1 px-2 text-sm w-28 font-medium text-gray-900 bg-gray rounded-full border border-slate-200 flex items-center space-x-1">
                          <MdOutlinePeopleAlt className="w-4 h-4 text-black"/>
                          <span className="text-[#142854]">{cohorts} cohorts</span>
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AllProgramsCard;
