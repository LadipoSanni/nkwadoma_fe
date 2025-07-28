'use client';

import React from 'react'
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {PersistGate} from "redux-persist/integration/react";
import NetworkConnectionDetector from "@/components/common/NetworkConnectionDetector";
import SystemLogout from "@/features/systemLogout/SystemLogout";
import RefreshUserToken from "@/features/refresh-token/refreshUserToken";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SystemLogout/>
        <RefreshUserToken>
        <NetworkConnectionDetector>
        {children}
        </NetworkConnectionDetector>
        </RefreshUserToken>
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  )
}

