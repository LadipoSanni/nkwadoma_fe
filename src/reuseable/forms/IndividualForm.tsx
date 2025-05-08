import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdAdd, MdDeleteOutline } from "react-icons/md";

interface IndividualFormProps {
    sections: {
        id: number;
        firstName: string;
        lastName: string;
    }[];
    onSectionsChange: (updatedSections: {
        id: number;
        firstName: string;
        lastName: string;
    }[]) => void;
}

const IndividualForm: React.FC<IndividualFormProps> = ({ sections, onSectionsChange }) => {
    const handleAddSection = () => {
        const newSection = {
            id: Date.now(),
            firstName: "",
            lastName: "",
        };
        onSectionsChange([...sections, newSection]);
    };

    const handleDeleteSection = (id: number) => {
        onSectionsChange(sections.filter((section) => section.id !== id));
    };

    const handleInputChange = (id: number, field: string, value: string) => {
        onSectionsChange(
            sections.map((section) =>
                section.id === id ? { ...section, [field]: value } : section
            )
        );
    };

    return (
        <div className="space-y-6">
            {sections.map((section) => (
                <section
                    key={section.id}
                    className="grid gap-5 py-5 pl-5 pr-5 rounded-md border-[0.5px] border-lightBlue250 relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor={`firstName-${section.id}`}>First name</Label>
                            <Input
                                id={`firstName-${section.id}`}
                                name="firstName"
                                placeholder="Enter first name"
                                value={section.firstName}
                                onChange={(e) =>
                                    handleInputChange(section.id, "firstName", e.target.value)
                                }
                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`lastName-${section.id}`}>Last name</Label>
                            <Input
                                id={`lastName-${section.id}`}
                                name="lastName"
                                placeholder="Enter last name"
                                value={section.lastName}
                                onChange={(e) =>
                                    handleInputChange(section.id, "lastName", e.target.value)
                                }
                                className="p-4 focus-visible:outline-0 shadow-none focus-visible:ring-transparent rounded-md h-[3.375rem] font-normal leading-[21px] text-[14px] placeholder:text-grey250 text-black500 border border-solid border-neutral650"
                            />
                        </div>
                    </div>
                    {sections.length > 1 && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => handleDeleteSection(section.id)}
                                className="bg-greyBase200 py-1 px-2 hover:bg-greyBase200 flex rounded-md gap-1 h-[1.8125rem] w-[5.25rem]"
                            >
                                <MdDeleteOutline className="text-error450 h-5 w-5" />
                                <span className="text-error450 text-[14px] leading-[150%] font-medium">Delete</span>
                            </button>
                        </div>
                    )}
                </section>
            ))}
            <div className="flex items-center gap-1">
                <Button
                    onClick={handleAddSection}
                    type="button"
                    className="flex items-center gap-2 bg-transparent text-meedlBlue shadow-none px-0 py-2 rounded-md"
                >
                    <MdAdd className="text-meedlBlue h-5 w-5" />
                    <span className="font-semibold text-[14px] leading-[150%]">Add</span>
                </Button>
            </div>
        </div>
    );
};

export default IndividualForm;
