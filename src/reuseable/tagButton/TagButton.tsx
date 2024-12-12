import React, {ElementType} from "react";
import {inter} from "@/app/fonts";

interface TagButtonProps {
    tagIcon: ElementType;
    tagCount: string | number;
    tagButtonStyle: string;
    tagText: string;
}

export const TagButton: React.FC<TagButtonProps> = ({tagCount, tagIcon: Icon, tagButtonStyle, tagText}) => {

    return (
        <div id="tagButton" data-testid="tagButton" className={`w-full`}>
            <span
                id={`content`}
                className={`${inter.className} ${tagButtonStyle} py-1 px-3 text-sm font-medium text-lightBlue300 w-full rounded-full flex items-center space-x-2`}>
                <Icon className="w-4 h-4 text-meedlBlue"/>
                <span className={`flex flex-row w-full`}>
                    <span className={`${inter.className} w-full text-meedlBlue`}>
                        {tagCount}
                    </span>
                    <span className={`${inter.className} w-full text-meedlBlue`}>
                        {tagText}
                    </span>
                </span>
            </span>
        </div>
    )
}