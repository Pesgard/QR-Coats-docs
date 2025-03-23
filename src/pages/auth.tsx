import React from 'react';
import Layout from '@theme/Layout';
import AuthTabs from '../components/Auth/AuthTabs';
import UserProfile from '../components/Auth/UserProfile';
import { useAuth } from '../utils/AuthContext';

export default function Auth() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Layout
      title="Autenticación"
      description="Inicia sesión o regístrate en nuestra plataforma"
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Autenticación</h1>
          <p>Inicia sesión o regístrate para acceder a todas las funcionalidades</p>
        </div>
        
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <p>Cargando...</p>
          </div>
        ) : isAuthenticated ? (
          <UserProfile />
        ) : (
          <AuthTabs />
        )}
      </div>
    </Layout>
  );
} 