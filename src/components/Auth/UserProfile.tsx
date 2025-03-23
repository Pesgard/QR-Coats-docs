import React from 'react';
import { useAuth } from '../../utils/AuthContext';
import styles from './Auth.module.css';

export default function UserProfile() {
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <div>No has iniciado sesión</div>;
  }

  return (
    <div className={styles.authContainer}>
      <h2>Perfil de Usuario</h2>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Último inicio de sesión:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
      </div>
      <button 
        onClick={handleSignOut} 
        className={styles.authButton}
      >
        Cerrar Sesión
      </button>
    </div>
  );
} 