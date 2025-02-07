import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface authSlice {
    resetPasswordUserInput : string
}

const initialState : authSlice = {
    resetPasswordUserInput: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserPasswordInput: (state, action: PayloadAction<string>) =>{
         state.resetPasswordUserInput = action.payload
        }
    }
})

export const  {setUserPasswordInput} = authSlice.actions;
export default authSlice.reducer;