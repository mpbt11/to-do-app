'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
