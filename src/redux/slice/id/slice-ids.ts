import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDsState {
    userID: string | null;
    sessionID: string | null;
}

const initialIDsState: IDsState = {
    userID: null,
    sessionID: null,
};

const idsSlice = createSlice({
    name: 'ids',
    initialState: initialIDsState,
    reducers: {
        setUserID(state, action: PayloadAction<string>) {
            state.userID = action.payload;
        },
        clearUserID(state) {
            state.userID = null;
        },
        setSessionID(state, action: PayloadAction<string>) {
            state.sessionID = action.payload;
        },
        clearSessionID(state) {
            state.sessionID = null;
        }
    }
});

export const { setUserID, clearUserID, setSessionID, clearSessionID } = idsSlice.actions;
export default idsSlice.reducer;