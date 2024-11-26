import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch,useSelector, type TypedUseSelectorHook } from "react-redux";
import appReducer from "@/redux/reducer";
import {authApi} from "@/service/auths/api"
import { programApi } from "@/service/admin/program_query";
import { cohortApi } from "@/service/admin/cohort_query";


export const store = configureStore({
  reducer: appReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
        authApi.middleware,
        programApi.middleware,
        cohortApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
