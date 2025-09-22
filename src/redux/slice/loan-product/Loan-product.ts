import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SponsorsObj{
    id: string,
    name: string
 }

 interface Obj{
    product: string,
    vendorName: string,
    costOfService: string,
    duration: string
 }

interface CreateLoanProductField{
    id?:string,
    productName: string,
    investmentVehicleId: string,
    costOfFunds: string,
    tenor: string,
    loanProductSize: string,
    minimumRepaymentAmount: string,
    moratorium: string,
    interest: string,
    obligorLimit: string,
    loanProductMandate: string,
    loanProductTermsAndCondition: string,
    fundProduct: string | null,
    sponsors: SponsorsObj[],
}

interface CreateLoanProductFieldStepTwo{
    disbursementTerms: string,
    vendor: Obj[],
    bankPartner: string,
}

interface LoanProduct {
    loanProductId: string,
    loanProductName: string,
    createLoanProductField: CreateLoanProductField | null,
    createLoanProductFieldStepTwo: CreateLoanProductFieldStepTwo | null,
    completedSteps: string[]
}

const initialState: LoanProduct = {
    loanProductId: "",
    loanProductName: "",
    createLoanProductField: null,
    createLoanProductFieldStepTwo:  null,
    completedSteps: [] ,
}

export const LoanProductSlice = createSlice({
    name: "loanProduct",
    initialState,
    reducers: {
        setLoanProductId: (state, action: PayloadAction<string>) => {
            state.loanProductId = action.payload;
        },
        setLoanProductName: (state, action: PayloadAction<string>) => {
            state.loanProductName = action.payload;
        },
        setLoanProductField: (state, action: PayloadAction<CreateLoanProductField>) => {
            state.createLoanProductField = action.payload;
        },
        clearLoanProductField: (state) => {
            state.createLoanProductField= null;
            state.createLoanProductFieldStepTwo = null
        },
        setLoanProductFieldStepTwo: (state, action: PayloadAction<CreateLoanProductFieldStepTwo>) => {
            state.createLoanProductFieldStepTwo = action.payload;
        },
        markStepCompleted: (state, action) => {
            if (!state.completedSteps.includes(action.payload)) {
              state.completedSteps.push(action.payload);
            }
          },
          resetCompletedSteps: (state) => {
            state.completedSteps = [];
        }
    }})

    export const {setLoanProductId,setLoanProductName,setLoanProductField,clearLoanProductField, setLoanProductFieldStepTwo,markStepCompleted,resetCompletedSteps} = LoanProductSlice.actions;

    export default LoanProductSlice.reducer;