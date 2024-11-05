"use client"
import React, {ElementType} from 'react';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {inter} from "@/app/fonts";
import Kebab from "@/reuseable/Kebab/Kebab";
import { FiMoreVertical } from 'react-icons/fi';
import {TagButton} from "@/reuseable/tagButton/TagButton";
import {useRouter} from "next/navigation";

interface ProgramList {
    id: string;
    title: string;
    description: string;
    tagButtonData: { tagIcon: ElementType, tagCount: number, tagButtonStyle: string, tagText: string }[];
    dropdownOption: { name: string, id: string }[];
}

const AllProgramsCard: React.FC<ProgramList> = ({id, title, description, tagButtonData, dropdownOption}) => {

    const router = useRouter();

    const handleProgramDetails = () => {
        router.push(`/program/details`)
    };

    const shortDescription = description.length > 90
        ? description.substring(0, 80)
        : description;


    return (
        <Card id={`allProgramsCard-${id}`} data-testid="allProgramsCard"  className="w-full md:max-w-lg  border border-grey50 rounded-lg">
            <CardHeader id={`header-${id}`} data-testid="header" className="flex flex-row justify-between items-center">
                <CardTitle id={`title-${id}`} data-testid="title" className={`${inter.className} text-lg font-medium text-[#101828]`}>{title}</CardTitle>
                    <Kebab kebabOptions={dropdownOption} icon={FiMoreVertical} />
            </CardHeader>

            <CardContent id={`contentId-${id}`} data-testid={`contentId`} onClick={handleProgramDetails}>
                <CardDescription id={`description-${id}`} data-testid="description"
                                 className={`${inter.className}  text-sm text-grey450 cursor-pointer`}>
                    {shortDescription}
                    {description.length > 90 && (
                        <span
                            id={`readMore-${id}`}
                            data-testid="readMore"
                            className="${inter.className} text-grey450 ml-2"
                        >
              { "...."}
            </span>
                    )}
                </CardDescription>

                <div
                    id={`details-${id}`}
                    data-testid="details"
                    className="grid grid-cols-2 gap-3 w-fit mt-4 cursor-pointer"
                >
                    {tagButtonData.map((tagProps, index) => (
                        <TagButton key={index} {...tagProps} />
                    ))}
                </div>

            </CardContent>
        </Card>
    );
};

export default AllProgramsCard;
