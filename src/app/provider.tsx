'use client';

import React from 'react'
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {PersistGate} from "redux-persist/integration/react";
import NetworkConnectionDetector from "@/components/common/NetworkConnectionDetector";
import Index from "@/features/systemLogout/SystemLogout";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index/>
        <NetworkConnectionDetector>
        {children}
        </NetworkConnectionDetector>
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  )
}

