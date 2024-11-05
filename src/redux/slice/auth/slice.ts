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
        setEmail: (state,action: PayloadAction<string>) =>{
         state.resetPasswordUserInput = action.payload
        }
    }
})

export const  {setEmail} = authSlice.actions;
export default authSlice.reducer;