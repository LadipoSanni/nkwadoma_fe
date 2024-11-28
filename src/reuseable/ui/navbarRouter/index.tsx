import React from 'react'
import {navbarRouterItemsProps} from "@/types/Component.type";
// import styles from "./index.module.css"
import {inter} from "@/app/fonts";
interface Props <T extends navbarRouterItemsProps> {
    navbarItems: T[] | undefined,
    currentTab: string | undefined | string[] | null,
    handleClick: (name: string,  id: string ) => void,
}


function NavbarRouter<T extends navbarRouterItemsProps>({navbarItems, handleClick, currentTab}: Readonly<Props<T>>) {


    const currentTabStyle =  'rounded bg-[#f6f6f8]';
    const currentTabNameStyle =  `text-meedleBlue`
    const tabNameStyle =  `text-[#626F8C]`;
    const noStyle = ``;



    return(
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={` w-full h-auto grid gap-2 py-3 md:w-full  md:h-auto md:py-3 md:grid md:gap-2 md: `}
        >
            {navbarItems?.map((item, index) => (
                <button
                    key={item?.id + index}
                    id={item.id}
                    data-testid={item.id}
                    className={`inline-flex h-fit py-2 gap-2 px-1 w-full ${(currentTab === item.name ?currentTabStyle : noStyle  )} `}
                    onClick={() => {handleClick(item.name, item.id)}}
                >
                    <div className={` flex gap-2`}>
                        <div id={'navbarRouteIcon' + item.id}
                             data-testid={'navbarRouteIcon' + item.id}
                        >{item?.icon}</div>
                        <span id={'navbarRouterName' + item.id}
                              data-testid={`navbarRouteName` + item.id}
                              className={`text-xs mt-auto mb-auto font-thin   ${inter.className}  ${(currentTab !== item.name ? tabNameStyle : currentTabNameStyle)} `}>{item.name}</span>

                    </div>
                </button>
            ))}

        </div>
    )
}

export default NavbarRouter