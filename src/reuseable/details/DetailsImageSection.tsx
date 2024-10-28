"use client"
import React, {ElementType} from "react";
import {cabinetGrotesk, inter} from "@/app/fonts";
import {Card} from "@/components/ui/card";
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {BiArrowBack} from "react-icons/bi";
import {IoEllipsisHorizontal} from "react-icons/io5";
import CreateProgramButton from "@/features/admin/program/createProgramButton/Index";
import {TagButton} from "../../../test/reuseable/tagButton/TagButton";

interface detailsProps {
    imageSrc?: string;
    cohortTitle: string;
    cohortDescription: string;
    tagCount: number;
    tagText: string;
    icon?: ElementType;
    tagButtonIcon: ElementType;
    tagButtonStyle: string;
    goBackText: string;
    handleBackClick: () => void;
}

const DetailsImageSection: React.FC<detailsProps> = ({
                                             imageSrc,
                                             cohortTitle,
                                             cohortDescription,
                                             tagButtonIcon: tagIcon,
                                             tagCount,
                                             tagText,
                                             tagButtonStyle,
                                             icon: Icon,
                                             goBackText: GoBackText,
                                             handleBackClick: HandleBackClick,
                                         }) => {




    return (
        <main id="details-main" data-testid="details-main">
            <div className={`flex cursor-pointer items-center space-x-2 text-meedlBlue`} onClick={HandleBackClick}>
                <BiArrowBack/>
                <h1>{GoBackText}</h1>
            </div>

            <div className={`flex flex-row justify-between py-4 `}>
                <div id="cohort-image-section" data-testid="cohort-image-section"
                     className={`flex md:flex-col flex-row md:block space-y-5 max-w-sm`}>
                    <div id="cohort-image-card" data-testid="cohort-image-card">
                        <Card className="rounded-lg">
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt="Cohort DetailsImageSection"
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
                                <TagButton tagIcon={tagIcon} tagText={tagText} tagButtonStyle={tagButtonStyle}
                                           tagCount={tagCount}/>
                            </div>

                            <div id="dropouts-count" data-testid="dropouts-count">
                                <TagButton tagText={tagText} tagButtonStyle={tagButtonStyle} tagCount={tagCount}
                                           tagIcon={tagIcon}/>
                            </div>
                        </div>

                        <div className={`flex flex-row space-x-3 pt-5`}>
                            <CreateProgramButton buttonText={"Edit Cohort"} title={"Edit Cohort"}
                                                 programDeliveryTypes={["Full-time", "Part-time"]}
                                                 programModes={["Online", "Physical"]}
                                                 programDurations={["3years", "4years"]}
                                                 submitButtonText={"Save Cohort"} triggerButtonStyle={`w-full`}/>
                            <Button size={"lg"} variant={"outline"}
                                    className={`w-8 h-9 flex justify-center items-center rounded-full`}>
                                <IoEllipsisHorizontal className={`text-meedlBlack`}/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
export default DetailsImageSection;