import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface resetPassword {
    userEmail : string
}

const initialState : resetPassword = {
    userEmail: ''
}

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {
        setEmail: (state,action: PayloadAction<string>) =>{
         state.userEmail = action.payload
        }
    }
})

export const  {setEmail} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;