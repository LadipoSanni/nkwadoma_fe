"use client"
import React, {ElementType} from "react";
import {inter} from "@/app/fonts";
import {Card} from "@/components/ui/card";
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import CreateProgramButton from "@/features/admin/program/create-program-button/Index";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import Kebab from "@/reuseable/Kebab/Kebab";
import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import TableModal from '@/reuseable/modals/TableModal'
import {Cross2Icon} from "@radix-ui/react-icons";


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
    const [isOpen, setIsOpen] = React.useState(false);

    const handleModalOpen = () => {
        setIsOpen(true)
    }

    return (
        <main id="details-main" data-testid="details-main" className={``}>
            <div id="cohort-image-section" data-testid="cohort-image-section"
                 className={`flex md:flex-col flex-col md:block space-y-5 md:max-w-sm ma-w-xs`}>
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
                        className={`${inter.className} text-3xl font-medium text-black`}>
                        {cohortTitle}
                    </h1>
                    <p id="cohort-description" data-testid="cohort-description"
                       className={`${inter.className} text-grey450 text-sm py-3`}>
                        {cohortDescription}
                    </p>


                    <div
                        id={`details`}
                        data-testid="details"
                        className="grid md:grid-cols-3 grid-cols-2 gap-3 w-fit mt-3"
                    >
                        {tagButtonData.map((tagProps, index) => (
                            <TagButton key={index} {...tagProps} />
                        ))}
                    </div>

                    <div className={`flex flex-row md:space-x-3 space-x-2 pt-5 w-full`}>
                        {useProgramButton ? (
                            <CreateProgramButton buttonText={"Edit Cohort"} title={"Edit Cohort"}
                                                 programDeliveryTypes={["Full-time", "Part-time"]}
                                                 programModes={["Online", "Physical"]}
                                                 programDurations={["3years", "4years"]}
                                                 submitButtonText={"Save Cohort"} triggerButtonStyle={`w-full`}
                            />
                        ) : (
                            <Button variant={"secondary"}
                                    size={"lg"}
                                    className={`bg-meedlBlue text-meedlWhite w-full h-12 flex justify-center items-center`}
                                    onClick={handleModalOpen}>Add Trainee</Button>
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
            <div>
                <TableModal isOpen={isOpen}
                            closeModal={() => setIsOpen(false)}
                            closeOnOverlayClick={true}
                            headerTitle={"Add trainee"}
                            className={"w-100%"}
                            icon={Cross2Icon}
                >
                    ADD TRAINEE DIALOG
                </TableModal>
            </div>
        </main>
    );
};
export default DetailsImageSection;