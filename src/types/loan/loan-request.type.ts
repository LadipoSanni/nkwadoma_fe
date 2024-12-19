

export interface LoanRequestType {
    id: string,
    referredBy: string,
    firstName: string,
    lastName: string,
    status: string,
    image: string,
    loanAmountRequested: string,
    alternateEmail: string,
    alternateContactAddress: string,
    alternatePhoneNumber: string,
    createdDate: string,
    initialDeposit: string,
    cohortStartDate: string,
    programName: string,
    nextOfKin: {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        nextOfKinRelationship: string,
        contactAddress: string,
        loanee: string
    }
}