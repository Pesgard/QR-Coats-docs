import React, { type ReactNode } from 'react';
import { AuthProvider } from '../utils/AuthContext';
import ProtectedRoute from '../components/Auth/ProtectedRoute';

export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <AuthProvider>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </AuthProvider>
  );
} 