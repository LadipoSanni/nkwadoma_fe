import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface adminLayoutState  {
    showMobileSideBar: boolean,
    currentNavbarItem: string,
    currentNavBottomItem: string,
    underlineTabCurrentTab: string,
}
const initialState: adminLayoutState = {
    showMobileSideBar: false,
    currentNavbarItem: 'Overview',
    currentNavBottomItem: '',
    underlineTabCurrentTab: '',

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
        },
        setUnderlineTabCurrentTab: (state, action:PayloadAction<string>) => {
           state.underlineTabCurrentTab = action.payload;
        }
    }
})

export const {setShowMobileSideBar,setUnderlineTabCurrentTab, setCurrentNavbarItem, setCurrentNavBottomItem} = adminLayoutSlice.actions;
export default adminLayoutSlice.reducer;