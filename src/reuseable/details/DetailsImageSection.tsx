"use client"
import React, {ElementType} from "react";
import {cabinetGrotesk, inter} from "@/app/fonts";
import {Card} from "@/components/ui/card";
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import CreateProgramButton from "@/features/admin/program/create-program-button/Index";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import Kebab from "@/reuseable/Kebab/Kebab";
import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import CreateCohort from "@/reuseable/modals/CreateCohort";

interface detailsProps {
    imageSrc?: string;
    cohortTitle: string;
    cohortDescription: string;
    icon?: ElementType;
    dropdownOption: { name: string, id: string }[];
    handleDeleteClick: () => void;
    useProgramButton: boolean;
    tagButtonData: { tagIcon: ElementType, tagCount: number, tagButtonStyle: string, tagText: string }[];
}

const DetailsImageSection: React.FC<detailsProps> = ({
                                                         imageSrc,
                                                         cohortTitle,
                                                         cohortDescription,
                                                         icon: Icon,
                                                         dropdownOption,
                                                         handleDeleteClick,
                                                         useProgramButton,
                                                         tagButtonData
                                                     }) => {

    return (
        <main id="details-main" data-testid="details-main">
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


                        <div
                            id={`details`}
                            data-testid="details"
                            className="grid grid-cols-3 gap-3 w-fit mt-3"
                        >
                            {tagButtonData.map((tagProps, index) => (
                                <TagButton key={index} {...tagProps} />
                            ))}
                        </div>

                        <div className={`flex flex-row space-x-3 pt-7`}>
                            {useProgramButton ? (
                                <CreateProgramButton buttonText={"Edit Cohort"} title={"Edit Cohort"}
                                                     programDeliveryTypes={["Full-time", "Part-time"]}
                                                     programModes={["Online", "Physical"]}
                                                     programDurations={["3years", "4years"]}
                                                     submitButtonText={"Save Cohort"} triggerButtonStyle={`w-full`}
                                />
                            ) : (
                                <CreateCohort triggerButtonStyle={`w-full`}/>
                            )
                            }
                            <Button variant={"outline"}
                                    className={`w-12 h-12 flex justify-center items-center rounded-full`}>
                                <Kebab kebabOptions={dropdownOption} handleDropDownClick={handleDeleteClick}
                                       icon={IoEllipsisHorizontalSharp}/>
                            </Button>
                        </div>
                    </div>
             </div>
        </main>
    );
};
export default DetailsImageSection;