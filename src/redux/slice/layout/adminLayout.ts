import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface adminLayoutState  {
    showMobileSideBar: boolean,
    currentNavbarItem: string,
    currentNavBottomItem: string,
}
const initialState: adminLayoutState = {
    showMobileSideBar: false,
    currentNavbarItem: 'Overview',
    currentNavBottomItem: '',

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
       },
        setCurrentNavBottomItem: (state, action:PayloadAction<string>) => {
           state.currentNavBottomItem = action.payload;
        }
    }
})

export const {setShowMobileSideBar, setCurrentNavbarItem, setCurrentNavBottomItem} = adminLayoutSlice.actions;
export default adminLayoutSlice.reducer;