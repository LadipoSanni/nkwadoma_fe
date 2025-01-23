
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
//
// interface SelectedLoanState {
//   currentTab: string;
//   clickedOrganizationId: string | number,
// }
//
// const initialState: SelectedLoanState = {
//     currentTab: 'Loan requests',
//     clickedOrganizationId: '',
//
//
// };
//
//
// export const selectedLoanSlice = createSlice({
//     name: "SelectedLoan",
//     initialState,
//     reducers: {
//         setCurrentTab: (state, action: PayloadAction<string>)=>{
//             state.currentTab = action.payload;
//         },
//         setClickedOrganization: (state, action: PayloadAction<string | number>)=> {
//           state.clickedOrganizationId = action.payload
//         },
//     },
//
// });
//
//
// export const { setCurrentTab, setClickedOrganization } = selectedLoanSlice.actions;
//
// export default selectedLoanSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedLoanState {
    currentTab: string;
    clickedOrganization: {
        id: string | number;
        name: string;
        logoImage: string;
    } | null;
}

const initialState: SelectedLoanState = {
    currentTab: 'Loan requests',
    clickedOrganization: null,
};

export const selectedLoanSlice = createSlice({
    name: "SelectedLoan",
    initialState,
    reducers: {
        setCurrentTab: (state, action: PayloadAction<string>) => {
            state.currentTab = action.payload;
        },
        setClickedOrganization: (state, action: PayloadAction<{ id: string | number; name: string; logoImage: string }>) => {
            state.clickedOrganization = action.payload;
        },
    },
});

export const { setCurrentTab, setClickedOrganization } = selectedLoanSlice.actions;

export default selectedLoanSlice.reducer;
