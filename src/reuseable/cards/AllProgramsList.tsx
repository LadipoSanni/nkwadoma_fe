"use client"
import React, {ElementType} from 'react';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {inter} from "@/app/fonts";
import Kebab from "@/reuseable/Kebab/Kebab";
import { FiMoreVertical } from 'react-icons/fi';
import {TagButton} from "@/reuseable/tagButton/TagButton";
// import {MdPersonOutline} from "react-icons/md";


interface ProgramList {
    id: string;
    title: string;
    description: string;
    tagButtonData: { tagIcon: ElementType, tagCount: number, tagButtonStyle: string, tagText: string }[];
    dropdownOption: { name: string, id: string }[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    handleCardDropDownClick: (optionId: string) => void;
    handleProgramDetails?: (optionId: string) => void;
}

const AllProgramsCard: React.FC<ProgramList> = ({id, title, description, tagButtonData, dropdownOption, handleCardDropDownClick,handleProgramDetails}) => {



    const handleProgramDetailsOnclick = (optionId: string) => {
        if(handleProgramDetails){
            handleProgramDetails(optionId);
        }
    };

    const stripHtmlTags = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html.replace(/<\/p><p>/g, ' ');
        return div.textContent || div.innerText || '';
    };

    const plainTextDescription = stripHtmlTags(description);
    const shortDescription = plainTextDescription.length > 90
        ? plainTextDescription.substring(0, 80)
        : plainTextDescription;

    const shortTitle = title.length > 15 ? `${title.substring(0, 20)}...` : title;

    return (
        <Card  id={`allProgramsCard-${id}`} data-testid="allProgramsCard"  className="w-full md:max-w-lg h-[13.8125rem]  border border-grey50 rounded-lg cursor-pointer pt-0" onClick={() => handleProgramDetailsOnclick(id)} >
            <CardHeader id={`header-${id}`} data-testid="header" className="flex flex-row justify-between items-center" >
               <CardTitle id={`title`} data-testid="title" className={`${inter.className} text-lg font-medium text-[#101828]`} >
                {shortTitle}
                {title.length > 90 && (
                        <span
                            id={`readMore-${id}`}
                            data-testid="readMore"
                            className="${inter.className} text-grey450 ml-2"
                        >
              { "...."}
            </span>)}
                </CardTitle>
                   <div onClick={(e) => e.stopPropagation()}><Kebab kebabOptions={dropdownOption} icon={FiMoreVertical} handleDropDownClick={handleCardDropDownClick}/></div> 
            </CardHeader>

            <CardContent id={`contentId`} data-testid={`contentId`}>
                <CardDescription id={`description-${id}`} data-testid="description"
                                 className={`${inter.className}  text-sm text-grey450 line-clamp-2 h-10`}
                                 
                      >  
                        <span
                         dangerouslySetInnerHTML={{ __html: shortDescription}}
                        />                       
                    
                    {plainTextDescription.length > 90 && (
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
                 {/* <div
                  className="grid grid-cols-2 gap-3 w-fit mt-4 cursor-pointer"
                  id='card details'
                 >
                    <TagButton 
                    tagIcon={MdPersonOutline}

                    />

                 </div> */}

            </CardContent>
        </Card>
    );
};

export default AllProgramsCard;
