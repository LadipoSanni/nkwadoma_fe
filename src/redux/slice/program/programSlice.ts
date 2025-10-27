import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialProgramFormValue {
    id: string,
    programName: string,
    deliveryType: string,
    programMode: string,
    programDuration: string,
    programDescription: string,

}

interface  CurrentProgramDetailData {
    programName?: string,
    isLoading?: boolean,
    numberOfLoanee?: number
}


interface ProgramSliceState {
    currentProgramId:  string | undefined;
    cohortOrProgramRoute: string | undefined;
    initialProgramFormValue: InitialProgramFormValue | null;
    totalNumberOfLoanee: number,
    currentProgramDetailData: CurrentProgramDetailData | null;
    programDetail: string,
    programView: string
}

const initialState: ProgramSliceState = {
    currentProgramId: "",
    cohortOrProgramRoute: "",
    initialProgramFormValue: null,
    totalNumberOfLoanee: 0,
    currentProgramDetailData: null,
    programDetail: "",
    programView: "grid"
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
            state.totalNumberOfLoanee = 0;
            state.currentProgramDetailData = null
        },
        setTotalNumberOfLoanee: ( state, action: PayloadAction<number>) => {
            state.totalNumberOfLoanee = action.payload;
        },
        setCurrentProgramDetailData: ( state, action: PayloadAction<CurrentProgramDetailData>) => {
            state.currentProgramDetailData = action.payload;
        },
        resetCurrentProgramDetailData: ( state) => {
            state.currentProgramDetailData = null
        },
        setProgramDetail: ( state, action: PayloadAction<string>) => {
            state.programDetail = action.payload;
        },
        resetProgramDetail: ( state) => {
            state.programDetail = ""
        },
        setProgramView: ( state, action: PayloadAction<string>) => {
            state.programView = action.payload;
        },
    }
})

export const {setCurrentProgramId,setcohortOrProgramRoute,resetCurrentProgramId,resetCurrentProgramDetailData,resetProgramDetail,
    setInitialProgramFormValue,resetInitialProgramFormValue,setTotalNumberOfLoanee, setCurrentProgramDetailData,setProgramDetail,setProgramView
} = programSlice.actions;
export default programSlice.reducer;