import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface authSlice {
    resetPasswordUserInput : string,
    error: string,
}

const initialState : authSlice = {
    resetPasswordUserInput: '',
    error: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserPasswordInput: (state, action: PayloadAction<string>) =>{
         state.resetPasswordUserInput = action.payload
        },
        setError: (state, action: PayloadAction<string>) =>{
            state.error = action.payload
        }
    }
})

export const  {setUserPasswordInput, setError} = authSlice.actions;
export default authSlice.reducer;