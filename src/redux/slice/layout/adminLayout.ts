import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface adminLayoutState  {
    showMobileSideBar: boolean;
}
const initialState: adminLayoutState = {
    showMobileSideBar: false,
}

export const adminLayoutSlice = createSlice({
    name: 'adminLayout',
    initialState,
    reducers:{
       setShowMobileSideBar: (state, action:PayloadAction<boolean>)=>{
            state.showMobileSideBar = action.payload;
       }
    }
})

export const {setShowMobileSideBar} = adminLayoutSlice.actions;
export default adminLayoutSlice.reducer;