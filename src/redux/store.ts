import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from '@/redux/reducer';
import { authApi } from '@/service/auths/api';
import { programApi } from '@/service/admin/program_query';
import { cohortApi } from '@/service/admin/cohort_query';
import { userApi } from '@/service/users/api';
import { organizationApi } from '@/service/admin/organization';
import { loaneeApi } from '@/service/users/Loanee_query';
import { loanProductApi } from '@/service/admin/loan_product';
import { loanRequestApi } from '@/service/admin/loan/loan-request-api';
import { fundApi } from '@/service/admin/fund_query';
import { loanOfferApi } from '@/service/admin/loan/loan-offer-api';
import { loanDisbursalApi } from '@/service/admin/loan/Loan-disbursal-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { notificationApi } from '@/service/notification/notification_query';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['adminLayout', 'selectedLoan', 'adminLayout', 'vehicle', 'program','vehicleMultistep', 'kycMultistep'],
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
            loaneeApi.middleware,
            cohortApi.middleware,
            userApi.middleware,
            organizationApi.middleware,
            loanProductApi.middleware,
            loanRequestApi.middleware,
            fundApi.middleware,
            loanOfferApi.middleware,
            loanDisbursalApi.middleware,
            userApi.middleware,
            notificationApi.middleware
        ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;