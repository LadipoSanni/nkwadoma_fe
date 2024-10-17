import React from 'react'
import {navbarRouterItemsProps} from "@/types/Component.type";
interface Props <T extends navbarRouterItemsProps> {
    navbarItems: T[],
    currentTab: number,
    handleClick: (name: string, index: number, id: string ) => void,
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
                    className={`inline-flex h-fit py-2 gap-2 px-1 w-full ${(currentTab !== index ? `` : `rounded bg-neutral100 `)} `}
                    onClick={() => {handleClick(item.name, index, item.id)}}
                >
                    <div id={'navbarRouteIcon' + item.id}
                         data-testid={'navbarRouteIcon' + item.id}
                    >{item?.icon}</div>
                    <div id={'navbarRouterName' + item.id}
                         data-testid={`navbarRouteName` + item.id}
                         className={`text-sm  ${(currentTab !== index  ? `text-grey100` : `text-meedlBlue`)} =`}>{item.name}</div>

                </button>
                ))}

        </div>
    )
}

export default NavbarRouter