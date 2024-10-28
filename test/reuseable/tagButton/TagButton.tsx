import React, {ElementType} from "react";
import {inter} from "@/app/fonts";

interface TagButtonProps {
    tagIcon: ElementType;
    tagCount: number;
    tagButtonStyle: string;
    tagText: string;
}

export const TagButton: React.FC<TagButtonProps> = ({tagCount, tagIcon:Icon, tagButtonStyle, tagText}) => {

    return (
        <div id="tagButton" data-testid="tagButton">
            <span
                id={`content`}
                className={`${inter.className} ${tagButtonStyle}  py-1 px-2 text-sm font-medium text-lightBlue300 w-full rounded-full border border-slate-200 flex items-center space-x-2`}>
                <Icon className="w-4 h-4 text-meedlBlue"/>
                <span className={`${inter.className} text-meedlBlue`}>
                    {tagCount} {tagText}
                </span>
            </span>
        </div>
    )
}