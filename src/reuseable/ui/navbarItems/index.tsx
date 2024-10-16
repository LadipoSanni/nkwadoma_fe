import React from 'react'
import {navbarItemsProps} from "@/types/Component.type";
import {  inter, ibmPlexSans,cabinetGrotesk,cabinetGroteskRegular } from "@/app/fonts";

interface Props <T extends navbarItemsProps> {
    navbarItems: T[]
}


function NavbarItems<T extends navbarItemsProps>({navbarItems}: Readonly<Props<T>>) {

    return(
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={`md:w-full md:h-auto md:py-3 md:gap-2 md: `}
        >
            {navbarItems?.map((item, index) => (
                <div
                    key={item?.id + index}
                    className={`inline-flex h-fit py-2 gap-1 w-full`}
                >
                    {item?.icon}
                    <div className={` ${cabinetGroteskRegular.className}  text-grey100`}>{item.name}</div>

                </div>
                ))}

        </div>
    )
}

export default NavbarItems