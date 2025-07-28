import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface totalNumberOfNotification {
    totalNotifications : number,
    refetchTrigger: number,
    setNotification: string,
    setNotificationId: string,
    notificationFlag: string,
    notificationPageNumber: number,
    selectedNotificationId: string
}

const initialState: totalNumberOfNotification = {
    totalNotifications: 0,
    refetchTrigger: 0,
    setNotification: "",
    setNotificationId: "",
    notificationFlag: "",
    notificationPageNumber:0,
    selectedNotificationId: ""
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
            state.setNotificationId = "";
            state.notificationFlag = ""
        },
        setNotificationFlag: (state, action: PayloadAction<string>) => {
            state.notificationFlag = action.payload;
        },
        setNotificationPageNumber:(state, action: PayloadAction<number>) => {
         state.notificationPageNumber = action.payload;
        },
        resetNotificationPageNumber:(state) => {
            state.notificationPageNumber = 0;
            state.selectedNotificationId = ""
        },
        setSelectedNotificationId: (state, action: PayloadAction<string>) => {
            state.selectedNotificationId = action.payload;
        }
    }
})

export const {setCurrentTotalNotification,triggerRefetch,setNotification,resetNotification,setNotificationId,setNotificationFlag,setNotificationPageNumber,resetNotificationPageNumber,setSelectedNotificationId} = notificationSlice.actions;
export default notificationSlice.reducer;