import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface adminLayoutState  {
    showMobileSideBar: boolean,
    currentNavbarItem: string,
}
const initialState: adminLayoutState = {
    showMobileSideBar: false,
    currentNavbarItem: 'Overview',

}

export const adminLayoutSlice = createSlice({
    name: 'adminLayout',
    initialState,
    reducers:{
       setShowMobileSideBar: (state, action:PayloadAction<boolean>)=>{
            state.showMobileSideBar = action.payload;
       },
       setCurrentNavbarItem: (state, action:PayloadAction<string>) =>{
           state.currentNavbarItem = action.payload;
       }
    }
})

export const {setShowMobileSideBar, setCurrentNavbarItem} = adminLayoutSlice.actions;
export default adminLayoutSlice.reducer;