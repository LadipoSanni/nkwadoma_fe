import React from'react'

export  interface navbarRouterItemsProps {
    id: string,
    name: string,
    route?: string,
    icon?:string|React.ReactElement| JSX.Element;
    handleClick?: (element: unknown)=> void,
    isActive?: boolean
}

export  interface navbarItemsProps {
    id: string,
    name: string,
    icon?:string|React.ReactElement| JSX.Element;
    handleClick: (id?:string, name?: string, isActive?: boolean)=> void
    route?: string,
}

export interface cohortLoaneeResponse {
    cohortId : string,
    createdAt: string,
    createdBy: string,
    id: string,
    loaneeLoanDetail : [],
    loaneeStatus: string,
    updatedAt : string,
    userIdentity: []
}

export type cohortBreakDown = {
    currency: string,
    itemAmount: string,
    itemName: string,
    loanBreakdownId: string

}