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

// export interface CurrentMyInvestmentVehicleDetails {
//     name: string,
//     investmentVehicleType: string,
//     fundManager : string,
//     dateInvested: string,
//     amountInvested: string,
//     netAssetValue: string,
//     netAssetValueInPercent: string,
//     talentFunded: string,
//     percentageOfPortfolio: string,
//     startDate: string,
//     maturityDate: string,
//     incomeEarned: string,
//     incomeInterval: string,
//     designations: string,
//     operationStatus: string,
//     couponDistributionStatus: string,
//     vehicleClosureStatus: string,
//     investmentVehicleVisibility: string,
//     mandate: string,
//     interestRateOffered: string,
//     fundRaisingStatus: string,
//     deployingStatus: string,
//     id: string,
// }

export interface MyInvestmentVehicleDetails {
    name: string;
    investmentVehicleType: string;
    fundManager: string;
    dateInvested: string;
    amountInvested: string;
    netAssetValue: string;
    netAssetValueInPercent: string;
    talentFunded: string;
    percentageOfPortfolio: string;
    startDate: string;
    maturityDate: string;
    incomeEarned: string;
    incomeInterval: string;
    designations: string;
    operationStatus: string;
    couponDistributionStatus: string;
    vehicleClosureStatus: {
        recollectionStatus?: string;
        maturity?: string;
    };
    investmentVehicleVisibility: string;
    mandate: string;
    interestRateOffered: string;
    fundRaisingStatus: string;
    deployingStatus: string;
    id: string;
    vehicleOperation?: {
        fundRaisingStatus?: string;
        deployingStatus?: string;
        couponDistributionStatus?: string;
    };
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

export interface CurrentMyInvestmentVehicleDetails {
    id: string,
    name: string,
    investmentVehicleType: string,
    mandate: string,
    sponsors: [],
    tenure: string,
    size: string,
    rate: string,
    totalAvailableAmount: string,
    amountRaised: string,
    amountDisbursed: string,
    amountAvailable: string,
    totalIncomeGenerated: string,
    netAssetValue: string,
    startDate: string,
    createdDate: string,
    investmentVehicleLink: string,
    investmentVehicleStatus: string,
    minimumInvestmentAmount: string,
    fundManager: string,
    trustee: string,
    custodian: string,
    bankPartner: string,
    lastUpdatedDate: string,
    investmentVehicleVisibility: string,
    fundRaisingStatus: string,
    deployingStatus: string,
    couponDistributionStatus: string,
    recollectionStatus: string,
    maturity: string,
    amountFinancierInvested: string,
    investmentVehicleDesignation: string,
    dateInvested: string,
    talentFunded?: string,
    portfolioValue?:string,

}

export type LoanProduct = {
    id: string,
    name: string,
    moratorium: string,
    tenor: string,
    interestRate: number,
    termsAndCondition: string,
    obligorLoanLimit: number,
    loanProductSize: number,
    totalAmountAvailable: number,
    createdAt: string,
    totalAmountEarned: number,
    totalAmountDisbursed: number,
    totalAmountRepaid: number,
    mandate: string,
    costOfFund: string,
    sponsor: string,
    minRepaymentAmount: number,
    bankPartner: string,
    disbursementTerms: string,
    investmentVehicleId: string,
    investmentVehicleName: string,
    totalNumberOfLoanee: number
}

export type cohortBreakDown = {
    currency: string,
    itemAmount: string,
    itemName: string,
    loanBreakdownId: string

}