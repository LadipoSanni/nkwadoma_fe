import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SponsorsObj{
    id: string,
    name: string
 }

 interface Obj{
    providerServices: string[],
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
    completedSteps: string[],
    totalNumberOfLoaneess: number,
    isEdit: boolean,
    fundProductId: string,
    loanProductSize: string,
    sponsors: SponsorsObj[] | null,
}

const initialState: LoanProduct = {
    loanProductId: "",
    loanProductName: "",
    createLoanProductField: null,
    createLoanProductFieldStepTwo:  null,
    completedSteps: [] ,
    totalNumberOfLoaneess: 0,
    isEdit: false,
    fundProductId: "",
    loanProductSize: "",
    sponsors: null
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
            state.createLoanProductFieldStepTwo = null;
            state.fundProductId= "";
            state.loanProductSize = "";
            state.sponsors = null
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
        },
        setTotalNumberOfLoanees: (state, action: PayloadAction<number>) => {
            state.totalNumberOfLoaneess = action.payload;
        },
        setIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setFundroductId: (state, action: PayloadAction<string>) => {
            state.fundProductId= action.payload;
        },
        setLoanProductSize: (state, action: PayloadAction<string>) => {
            state.loanProductSize = action.payload;
        },
        setSponsors: (state, action: PayloadAction<SponsorsObj[]>) => {
            state.sponsors = action.payload;
        },
    }})

    export const {setLoanProductId,setLoanProductName,
        setLoanProductField,clearLoanProductField, 
        setLoanProductFieldStepTwo,markStepCompleted,
        resetCompletedSteps,setTotalNumberOfLoanees,
        setIsEdit,setFundroductId,setLoanProductSize,
        setSponsors
    } = LoanProductSlice.actions;

    export default LoanProductSlice.reducer;