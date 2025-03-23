import React from 'react';
import Link from '@docusaurus/Link';
import { useAuth } from '../../utils/AuthContext';

export default function NavbarLoginButton() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated && user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px', fontSize: '0.9rem' }}>
          {user.email?.split('@')[0]}
        </span>
        <Link
          className="button button--sm button--secondary"
          to="/auth"
        >
          Mi Perfil
        </Link>
      </div>
    );
  }

  return (
    <Link
      className="button button--sm button--secondary"
      to="/auth"
    >
      Iniciar Sesión
    </Link>
  );
} 