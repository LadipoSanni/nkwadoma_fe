import { configureStore } from '@reduxjs/toolkit';
import { programDetailsApi } from '@/service/program/programDetailsApi';

export const store = configureStore({
    reducer: {
        [programDetailsApi.reducerPath]: programDetailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(programDetailsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;