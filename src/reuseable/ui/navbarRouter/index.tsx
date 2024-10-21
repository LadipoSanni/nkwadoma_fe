import React from 'react'
import {navbarRouterItemsProps} from "@/types/Component.type";
interface Props <T extends navbarRouterItemsProps> {
    navbarItems: T[],
    currentTab: string | undefined | string[],
    handleClick: (name: string,  id: string ) => void,
}


function NavbarRouter<T extends navbarRouterItemsProps>({navbarItems, handleClick, currentTab}: Readonly<Props<T>>) {




    return(
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={`md:w-full  md:h-auto md:py-3 md:grid md:gap-2 md: `}
        >
            {navbarItems?.map((item, index) => (
                <button
                    key={item?.id + index}
                    id={item.id}
                    data-testid={item.id}
                    className={`inline-flex h-fit py-2 gap-2 px-1 w-full ${(currentTab !== item.name ? `` : `rounded bg-neutral100 `)} `}
                    onClick={() => {handleClick(item.name, item.id)}}
                >
                    <div id={'navbarRouteIcon' + item.id}
                         data-testid={'navbarRouteIcon' + item.id}
                    >{item?.icon}</div>
                    <div id={'navbarRouterName' + item.id}
                         data-testid={`navbarRouteName` + item.id}
                         className={`text-sm  ${(currentTab !== item.name  ? `text-black300` : `text-meedlBlue`)} =`}>{item.name}</div>

                </button>
                ))}

        </div>
    )
}

export default NavbarRouter