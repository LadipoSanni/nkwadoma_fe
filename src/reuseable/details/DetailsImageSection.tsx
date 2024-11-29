"use client"
import React, {ElementType} from "react";
import {inter} from "@/app/fonts";
import {Card} from "@/components/ui/card";
import Image from 'next/image';
import {Button} from "@/components/ui/button";
import {TagButton} from "@/reuseable/tagButton/TagButton";
import Kebab from "@/reuseable/Kebab/Kebab";
import {IoEllipsisHorizontalSharp} from "react-icons/io5";
import TableModal from '@/reuseable/modals/TableModal'
import {Cross2Icon} from "@radix-ui/react-icons";
import AddTraineeForm from "@/components/cohort/AddTraineeForm";


interface detailsProps {
    imageSrc?: string;
    cohortTitle: string;
    cohortDescription: string;
    icon?: ElementType;
    dropdownOption: { name: string, id: string }[];
    handleDropdownClicked: (id: string) => void;
    buttonText: string;
    tagButtonData: { tagIcon: ElementType, tagCount: number, tagButtonStyle: string, tagText: string }[];
    isEditButton: boolean
}

const DetailsImageSection: React.FC<detailsProps> = ({
                                                         imageSrc,
                                                         cohortTitle,
                                                         cohortDescription,
                                                         icon: Icon,
                                                         dropdownOption,
                                                         handleDropdownClicked,
                                                         buttonText,
                                                         tagButtonData,
                                                         isEditButton = true,
                                                     }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleModalOpen = () => {
        setIsOpen(!isOpen)
    }

    const cohortId = "1"

    return (
        <main id="details-main" data-testid="details-main" className={``}>
            <div id="cohort-image-section" data-testid="cohort-image-section"
                 className={`flex md:flex-col flex-col md:block space-y-3 md:max-w-sm w-full`}>
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
                            <div className="w-32 h-32 flex bg-[#D9EAFF] rounded-full justify-center items-center">
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

                    <div className={`flex flex-row md:space-x-3 space-x-2 md:pt-5 pt-8 w-full`}>
                        {
                            isEditButton ? <div>
                                <Button variant={"secondary"}
                                        size={"lg"}
                                        className={`bg-meedlBlue text-meedlWhite w-full h-12 flex justify-center items-center`}
                                        onClick={handleModalOpen}>{buttonText}</Button>
                                <div
                                    role="button"
                                    className={`w-14 h-12 flex justify-center items-center border border-meedlBlue rounded-full active:bg-meedlBlue focus:outline-none focus:ring-2 focus:ring-tagButtonColor transition-colors`}
                                >
                                    <Kebab
                                        kebabOptions={dropdownOption}
                                        handleDropDownClick={handleDropdownClicked}
                                        icon={IoEllipsisHorizontalSharp}
                                    />
                                </div>
                            </div> : " "
                        }

                    </div>
                </div>
            </div>
            <div>
                <TableModal isOpen={isOpen}
                            closeModal={() => setIsOpen(false)}
                            closeOnOverlayClick={true}
                            headerTitle={"Add trainee"}
                            className={"md:w-full pb-1"}
                            icon={Cross2Icon}
                >
                    <AddTraineeForm cohortId={cohortId} setIsOpen={handleModalOpen}/>
                </TableModal>
            </div>
        </main>
    );
};

export default DetailsImageSection;