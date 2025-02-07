import React from 'react';
import {navbarItemsProps} from "@/types/Component.type";
import {inter} from "@/app/fonts";

interface Props {
    items: navbarItemsProps[],
    current?: string
    
}
const NavbarContainer = ({items, current}: Props) => {
    return (
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={`md:w-full  md:pr-4 md:mr-4 w-full h-auto py-3 grid gap-2  md:h-auto md:py-3 md:grid md:gap-2 md: `}
        >
            {items?.map((item, index) => (
                <button
                    key={item?.id + index}
                    id={item.id}
                    data-testid={item.id}
                    className={`inline-flex h-fit ${current === item.name ? 'rounded bg-[#f6f6f8]  ': ''} py-2 gap-2 px-1 w-full`}
                     onClick={() => {item.handleClick(item?.name, item?.id)}}
                >
                    <div id={'navbarIcon' + item.id}
                         data-testid={'navbarIcon' + item.id}
                    >{item?.icon}</div>
                    <span id={'navbarItemName' + item.id}
                         data-testid={`navbarItemName` + item.id}
                         className={` ${current === item.name ? 'text-[#142854]' : 'text-[#626F8C]'} text-xs mt-auto mb-auto font-thin   ${inter.className} `}>{item.name}</span>

                </button>
                ))}
        </div>
    );
};

export default NavbarContainer;