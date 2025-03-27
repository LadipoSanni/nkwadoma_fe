import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface totalNumberOfNotification {
    totalNotifications : number,
    refetchTrigger: number
}

const initialState: totalNumberOfNotification = {
    totalNotifications: 0,
    refetchTrigger: 0,
}

export const notificationSlice = createSlice({
    name: "totalNotification",
    initialState,
    reducers: {
        setCurrentTotalNotification: (state, action: PayloadAction<number>) => {
            state.totalNotifications = action.payload;
        },
        triggerRefetch(state) {
            state.refetchTrigger += 1; 
          },
    }
})

export const {setCurrentTotalNotification,triggerRefetch} = notificationSlice.actions;
export default notificationSlice.reducer;