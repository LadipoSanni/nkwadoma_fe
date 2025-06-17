import React from 'react'
import {navbarRouterItemsProps} from "@/types/Component.type";
import { inter500,inter, } from "@/app/fonts";
interface Props <T extends navbarRouterItemsProps> {
    navbarItems: T[] | undefined,
    currentTab: string | undefined | string[] | null,
    handleClick: (name: string,  id?: string, isActive?: boolean ) => void,

}


function NavbarRouter<T extends navbarRouterItemsProps>({navbarItems, handleClick, currentTab}: Readonly<Props<T>>) {


    const currentTabStyle =  'rounded bg-[#f6f6f8]';
    const currentTabNameStyle =  `text-meedleBlue md:text-meedlBlue`
    const tabNameStyle =  `text-[#626F8C]`;
    const noStyle = ``;



    return(
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={` w-full h-auto grid gap-4 py-3 md:w-full  md:h-auto md:py-3 md:grid md:gap-2 md: `}
        >
            {navbarItems?.map((item, index) => (
                <button
                    key={item?.id + index}
                    id={item.id}
                    data-testid={item.id}
                    className={`inline-flex h-fit ${item?.isActive ? 'hover:rounded hover:bg-[#f6f6f8]' : 'cursor-not-allowed'}  py-2 gap-2 px-1 w-full ${item.isActive ? `${(currentTab === item.name ?currentTabStyle : noStyle  )}` :  ''}  `}
                    onClick={() => {handleClick(item.name, item.route, item.isActive)}}
                >
                    <div className={` flex gap-2`}>
                        <div id={'navbarRouteIcon' + item.id}
                             data-testid={'navbarRouteIcon' + item.id}
                             className={` mt-auto mb-auto`}
                        >{item?.icon}</div>
                        <span id={'navbarRouterName' + item.id}
                              data-testid={`navbarRouteName` + item.id}
                              className={`text-xs mt-auto mb-auto hover:text-meedleBlue   ${currentTab === item?.name ? ` ${inter500.className} ` : ` ${inter.className}`}   ${item.isActive ? `${(currentTab !== item.name ? tabNameStyle : currentTabNameStyle)}` : 'text-[#d7d7d7]'} `}>{item.name}</span>

                    </div>
                </button>
            ))}

        </div>
    )
}

export default NavbarRouter