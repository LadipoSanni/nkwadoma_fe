'use client';

import React from 'react'
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}

