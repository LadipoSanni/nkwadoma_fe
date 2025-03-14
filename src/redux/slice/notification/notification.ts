import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface totalNumberOfNotification {
    totalNotifications : number
}

const initialState: totalNumberOfNotification = {
    totalNotifications: 0
}

export const notificationSlice = createSlice({
    name: "totalNotification",
    initialState,
    reducers: {
        setCurrentTotalNotification: (state, action: PayloadAction<number>) => {
            state.totalNotifications = action.payload;
        }
    }
})

export const {setCurrentTotalNotification} = notificationSlice.actions;
export default notificationSlice.reducer;