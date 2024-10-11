"use client"
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { inter } from "@/app/fonts";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface CourseCardProps {
    title: string;
    description: string;
    trainees: number;
    months: number;
    cohorts: number;
    menu: JSX.Element;
}

const AllProgramsCard: React.FC<CourseCardProps> = ({ title, description, trainees, months, cohorts, menu }) => {
    const [anchorel, setAnchorel] = useState<null | HTMLElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorel(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorel(null);
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const shortDescription = description.length > 90 && !isExpanded
        ? description.substring(0, 80)
        : description;

    return (
        <div id="allProgramsCard" data-testid="allProgramsCard" className="rounded-lg p-4 shadow-md w-full max-w-xs border border-slate-200">
            <div id="header" data-testid="header" className="flex justify-between">
                <h3 id="title" data-testid="title" className="text-[#101828] font-medium text-lg leading-7">{title}</h3>
                <div id="menuIcon" data-testid="menuIcon" onClick={handleClick}>
                    <MoreVertIcon sx={{ color: "black" }} />
                </div>
                {React.cloneElement(menu, {
                    anchorell: anchorel,
                    open: Boolean(anchorel),
                    onClose: handleClose,
                })}
            </div>

            <p id="description" data-testid="description" className={`${inter.className} text-[#475467] mt-2 font-normal text-sm`}>
                {shortDescription}
                {description.length > 90 && (
                    <span
                        id="readMore"
                        data-testid="readMore"
                        onClick={toggleDescription}
                        className="text-blue-600 cursor-pointer ml-2"
                    >
                        {isExpanded ? "....." : "....."}
                    </span>
                )}
            </p>

            <div id="details" data-testid="details" className="flex flex-col justify-start mt-4">
                <div id="traineesAndMonths" data-testid="traineesAndMonths" className="flex flex-row space-x-2">
                    <span id="trainees" data-testid="trainees" className="py-1 px-2 mb-2 text-sm font-medium text-gray-900 bg-[#D0D5DD] rounded-full border border-slate-200 flex items-center space-x-2">
                        <PersonIcon sx={{ color: "black", fontSize: "16px" }} />
                        <span className={`${inter.className} text-[#142854] leading-5 text-base font-normal`}>{trainees} trainees</span>
                    </span>
                    <span id="months" data-testid="months" className="py-1 px-2 mb-2 text-sm font-medium text-gray-900 bg-[#D0D5DD] rounded-full border border-slate-200 flex items-center space-x-2">
                        <CalendarMonthIcon sx={{ color: "black", fontSize: "16px" }} />
                        <span className={`${inter.className} text-[#142854] leading-5 text-base font-normal`}>{months} months</span>
                    </span>
                </div>

                <div id="cohorts" data-testid="cohorts">
                    <span className="py-1 px-2 mb-2 text-sm font-medium text-gray-900 bg-[#D0D5DD] rounded-full border border-slate-200 items-center space-x-2">
                        <PeopleAltIcon sx={{ color: "black", fontSize: "16px" }} />
                        <span className={`${inter.className} text-[#142854] leading-5 text-base font-normal`}>{cohorts} cohorts</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AllProgramsCard;
