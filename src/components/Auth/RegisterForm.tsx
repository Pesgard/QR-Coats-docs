import React, { useState } from 'react';
import { signUp } from '../../utils/supabase';
import { useAuth } from '../../utils/AuthContext';
import styles from './Auth.module.css';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp({ email, password });
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError('Ha ocurrido un error durante el registro');
      console.error('Error en el registro:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <div>Ya has iniciado sesión</div>;
  }

  return (
    <div className={styles.authContainer}>
      <h2>Registro</h2>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
      <form onSubmit={handleRegister} className={styles.authForm}>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.authButton}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
} 