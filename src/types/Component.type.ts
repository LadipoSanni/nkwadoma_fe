import React from'react'

export  interface navbarItemsProps {
    id: string,
    name: string,
    route?: string,
    icon?:string|React.ReactElement| JSX.Element;
}