"use client"
import React from 'react';
import {inter} from "@/app/fonts";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Button} from "@/components/ui/button";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";


interface breakdownProps {
    breakDown?: { title: string; amount: string; }[];
}

export const Breakdown: React.FC<breakdownProps> = ({breakDown}) => {
    const [isDropdown, setIsDropdown] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
        setIsDropdown(!isDropdown);
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={handleOpen}
            className="space-y-2  md:w-full bg-meedlWhite rounded-md"
            id="tuition-breakdown-collapsible"
            data-testid="tuition-breakdown-collapsible"
        >
            <CollapsibleTrigger
            asChild className={`border-b w-full`}
                                id="tuition-breakdown-trigger"
                                data-testid="tuition-breakdown-trigger">
                <Button variant="ghost" size="lg"
                        className={`w-full focus:outline-none px-6 focus:ring-0 focus-visible:ring-0`}>
                    <div
                        className="flex justify-center items-center gap-2 bg-meedlWhite">
                        <div className={`${inter.className} text-sm text-black300 md:w-full md:block hidden`}>
                            {isOpen ? <p > Collapse to hide the tuition breakdown </p>: <p > Expand to see the tuition breakdown </p>}
                        </div>
                        <div className={`${inter.className} text-sm text-black300 md:w-full md:hidden block`}>
                            {isOpen ? <p > Collapse to hide <br/> the tuition breakdown </p>: <p > Expand to see <br/> the tuition breakdown </p>}
                        </div>

                        <div>
                            {isDropdown ? (
                                <ChevronUpIcon className={`h-5 w-5 font-bold`}/>
                            ) : (
                                <ChevronDownIcon className={`h-5 w-5 font-bold`}/>
                            )}
                        </div>
                    </div>
                </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="bg-meedlWhite px-2"
                                id="tuition-breakdown-content"
                                data-testid="tuition-breakdown-content">
                {breakDown && breakDown.map((item, index) => (
                    <React.Fragment key={index}>
                        <div id={`breakdown-item-${index}`}
                             data-testid={`breakdown-item-${index}`}
                             className="flex md:flex-row flex-col py-5 justify-between">
                            <div className="text-black300">
                                <p>{item.title}</p>
                            </div>
                            <div className="text-meedlBlack">
                                <p>{item.amount}</p>
                            </div>
                        </div>
                        {index === 3 && index < breakDown.length - 1 && (
                            <DropdownMenuSeparator className="border-b"/>
                        )}
                    </React.Fragment>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
};