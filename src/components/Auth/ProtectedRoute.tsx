import React, { ReactNode } from 'react';
import { useAuth } from '../../utils/AuthContext';
import AuthTabs from './AuthTabs';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Acceso Restringido</h1>
          <p>Debes iniciar sesión para acceder a esta página</p>
        </div>
        <AuthTabs />
      </div>
    );
  }

  return <>{children}</>;
} 