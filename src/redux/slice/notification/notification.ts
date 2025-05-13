import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface totalNumberOfNotification {
    totalNotifications : number,
    refetchTrigger: number,
    setNotification: string,
    setNotificationId: string
}

const initialState: totalNumberOfNotification = {
    totalNotifications: 0,
    refetchTrigger: 0,
    setNotification: "",
    setNotificationId: ""
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setCurrentTotalNotification: (state, action: PayloadAction<number>) => {
            state.totalNotifications = action.payload;
        },
        triggerRefetch(state) {
            state.refetchTrigger += 1; 
          },
          setNotification: (state, action: PayloadAction<string>) => {
            state.setNotification = action.payload;
        },
      
        setNotificationId: (state, action: PayloadAction<string>) => {
            state.setNotificationId = action.payload;
        },
        resetNotification: (state) => {
            state.setNotification = "";
            state.setNotificationId = ""
        },
    }
})

export const {setCurrentTotalNotification,triggerRefetch,setNotification,resetNotification,setNotificationId} = notificationSlice.actions;
export default notificationSlice.reducer;