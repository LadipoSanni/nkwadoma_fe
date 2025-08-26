import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDsState {
    userID: string | null;
    sessionID: string | null;
    user2faState: string;
}

const initialIDsState: IDsState = {
    userID: null,
    sessionID: null,
    user2faState: '',
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
        },
        setUser2faState(state, action: PayloadAction<string>) {
            state.user2faState = action.payload;
        }
    }
});

export const { setUserID, clearUserID, setSessionID, clearSessionID, setUser2faState } = idsSlice.actions;
export default idsSlice.reducer;