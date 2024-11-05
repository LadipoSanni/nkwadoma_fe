import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch,useSelector, type TypedUseSelectorHook } from "react-redux";
import selectedLoanReducer from "@/redux/slice/SelectedLoan";
import adminLayoutReducer from "@/redux/slice/layout/adminLayout";
import authSlice from "@/redux/slice/auth/slice"

export const store = configureStore({
  reducer: {
    adminLayout: adminLayoutReducer,
    selectedLoan: selectedLoanReducer,
    // authSlice: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
    ]),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
