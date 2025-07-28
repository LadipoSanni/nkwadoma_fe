import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProgramSliceState {
    currentProgramId:  string | undefined;
    cohortOrProgramRoute: string | undefined
}

const initialState: ProgramSliceState = {
    currentProgramId: "",
    cohortOrProgramRoute: ""
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
    }
})

export const {setCurrentProgramId,setcohortOrProgramRoute } = programSlice.actions;
export default programSlice.reducer;