import React, { useState } from 'react';
import { signIn } from '../../utils/supabase';
import { useAuth } from '../../utils/AuthContext';
import styles from './Auth.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn({ email, password });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Ha ocurrido un error durante el inicio de sesión');
      console.error('Error en el inicio de sesión:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <div>Ya has iniciado sesión</div>;
  }

  return (
    <div className={styles.authContainer}>
      <h2>Iniciar Sesión</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleLogin} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.authButton}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
} 