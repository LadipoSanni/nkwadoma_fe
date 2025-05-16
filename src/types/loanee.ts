export interface LoaneeCurentInformation {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    nextOfKinRelationship: string,
    contactAddress: string,
    alternateEmail: string,
    alternatePhoneNumber: string,
    alternateContactAddress: string,
}

export interface CohortInfo {
    id: string,
    name: string,
    numberOfLoanees: number,
    startDate: string,
    tuitionAmount: number,
    amountRequested: number,
    amountReceived: number,
    amountOutstanding: number
}