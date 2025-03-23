import React, { ReactNode } from 'react';
import { AuthProvider } from '../utils/AuthContext';

type RootProps = {
  children: ReactNode;
};

export default function Root({ children }: RootProps): ReactNode {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 