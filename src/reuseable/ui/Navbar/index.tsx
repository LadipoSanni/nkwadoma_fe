import React from 'react';
import {navbarItemsProps} from "@/types/Component.type";

interface Props {
    items: navbarItemsProps[]
}
const NavbarContainer = ({items}: Props) => {
    return (
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={`md:w-full  md:h-auto md:py-3 md:grid md:gap-2 md: `}
        >
            {items?.map((item, index) => (
                <button
                    key={item?.id + index}
                    id={item.id}
                    data-testid={item.id}
                    className={`inline-flex h-fit py-2 gap-2 px-1 w-full`}
                    onClick={() => {item.handleClick()}}
                >
                    <div id={'navbarIcon' + item.id}
                         data-testid={'navbarIcon' + item.id}
                    >{item?.icon}</div>
                    <div id={'navbarItemName' + item.id}
                         data-testid={`navbarItemName` + item.id}
                         className={`text-sm text-blue800`}>{item.name}</div>

                </button>
                ))}
        </div>
    );
};

export default NavbarContainer;