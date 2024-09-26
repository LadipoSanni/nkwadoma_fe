import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch,useSelector, type TypedUseSelectorHook } from "react-redux";
import counterReducer from "./slice/CounterSlice";
import selectedLoanReducer from "@/redux/slice/SelectedLoan";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    selectedLoan: selectedLoanReducer,
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
