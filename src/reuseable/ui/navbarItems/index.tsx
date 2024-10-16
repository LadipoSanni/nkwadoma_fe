import React from 'react'
import {navbarItemsProps} from "@/types/Component.type";

interface Props <T extends navbarItemsProps> {
    navbarItems: T[]
}


function NavbarItems<T extends navbarItemsProps>(navbarItems:Props<T>) {

    return(
        <div
            id={`navBarItemsContainer`}
            data-testid={'navBarItemsContainer'}
            className={`md:w-full md:h-auto md:bg-meedlWhite`}
        >


        </div>
    )
}

export default NavbarItems