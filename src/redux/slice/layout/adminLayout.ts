import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface adminLayoutState  {
    showMobileSideBar: boolean,
    currentNavbarItem: string,
    currentNavBottomItem: string,
    underlineTabCurrentTab: string,
    organizationFrom: string,
}
const initialState: adminLayoutState = {
    showMobileSideBar: false,
    currentNavbarItem: 'Overview',
    currentNavBottomItem: '',
    underlineTabCurrentTab: '',
    organizationFrom: '',

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
        },
        setOrganizationFrom: (state, action:PayloadAction<string>) => {
           state.organizationFrom = action.payload;
        }
    }
})

export const {setShowMobileSideBar,setUnderlineTabCurrentTab, setOrganizationFrom,setCurrentNavbarItem, setCurrentNavBottomItem} = adminLayoutSlice.actions;
export default adminLayoutSlice.reducer;