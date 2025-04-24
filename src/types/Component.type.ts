import React from'react'

export  interface navbarRouterItemsProps {
    id: string,
    name: string,
    route?: string,
    icon?:string|React.ReactElement| JSX.Element;
    handleClick?: (element: unknown)=> void,
    isActive?: boolean
}

export interface FinancierInInvestmentVehicle {

    id: string,
    financierType: string,
    activationStatus: string,
    totalAmountInvested: string,
    nextOfKin: string,
    investmentVehicleRole: string[],
    organizationName: string,
    userIdentity: {
    id: string,
        email: string,
        firstName:string,
        lastName: string,
        phoneNumber: string,
        emailVerified: boolean,
        image: string,
        gender: string,
        dateOfBirth: string,
        stateOfOrigin: string,
        maritalStatus: string,
        stateOfResidence: string,
        nationality: string,
        residentialAddress: string,
        role: string,
        createdBy: string,
        alternateEmail: string,
        alternatePhoneNumber: string,
        alternateContactAddress: string,
        identityVerified: boolean
},
    invitedBy: string,
    investmentVehicles: string

}

export interface CurrentMyInvestmentVehicleDetails {
    name: string,
    investmentVehicleType: string,
    fundManager : string,
    dateInvested: string,
    amountInvested: string,
    netAssetValue: string,
    netAssetValueInPercent: string,
    talentFunded: string,
    percentageOfPortfolio: string,
    startDate: string,
    maturityDate: string,
    incomeEarned: string,
    incomeInterval: string,
    designations: string,
    operationStatus: string,
    couponDistributionStatus: string,
    vehicleClosureStatus: string,
    investmentVehicleVisibility: string,
    mandate: string,
    interestRateOffered: string,
    fundRaisingStatus: string,
    deployingStatus: string,
    id: string,
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