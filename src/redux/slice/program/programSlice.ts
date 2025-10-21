import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialProgramFormValue {
    id: string,
    programName: string,
    deliveryType: string,
    programMode: string,
    programDuration: string,
    programDescription: string,
}


interface ProgramSliceState {
    currentProgramId:  string | undefined;
    cohortOrProgramRoute: string | undefined;
    initialProgramFormValue: InitialProgramFormValue | null;
    totalNumberOfLoanee: number,
}

const initialState: ProgramSliceState = {
    currentProgramId: "",
    cohortOrProgramRoute: "",
    initialProgramFormValue: null,
    totalNumberOfLoanee: 0
}

export const programSlice = createSlice({
    name: 'program',
    initialState,
    reducers: {
        setCurrentProgramId: ( state, action: PayloadAction<undefined | string >) => {
            state.currentProgramId = action.payload;
        },
         setcohortOrProgramRoute: ( state, action: PayloadAction<undefined | string >) => {
            state.cohortOrProgramRoute = action.payload;
        },
        resetCurrentProgramId: ( state ) => {
            state.currentProgramId = "";
        },
        setInitialProgramFormValue: ( state, action: PayloadAction<InitialProgramFormValue>) => {
            state.initialProgramFormValue = action.payload;
        },
        resetInitialProgramFormValue: ( state) => {
            state.initialProgramFormValue = null;
            state.totalNumberOfLoanee = 0
        },
        setTotalNumberOfLoanee: ( state, action: PayloadAction<number>) => {
            state.totalNumberOfLoanee = action.payload;
        },
    }
})

export const {setCurrentProgramId,setcohortOrProgramRoute,resetCurrentProgramId,
    setInitialProgramFormValue,resetInitialProgramFormValue,setTotalNumberOfLoanee
} = programSlice.actions;
export default programSlice.reducer;