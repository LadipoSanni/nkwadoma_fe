import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "@/redux/reducer";
import { authApi } from "@/service/auths/api";
import { programApi } from "@/service/admin/program_query";
import { cohortApi } from "@/service/admin/cohort_query";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["someReducerName"],
    blacklist: ["someOtherReducer"],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
    reducer: persistedReducer,

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

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

