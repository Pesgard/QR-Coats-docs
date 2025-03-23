import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './Auth.module.css';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('login')}
          style={{
            padding: '10px 20px',
            borderRadius: activeTab === 'login' ? '4px 0 0 4px' : '4px',
            border: '1px solid #ccc',
            backgroundColor: activeTab === 'login' ? '#2e8555' : '#f5f5f5',
            color: activeTab === 'login' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 500,
            borderRight: activeTab === 'login' ? '1px solid #ccc' : 'none',
          }}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setActiveTab('register')}
          style={{
            padding: '10px 20px',
            borderRadius: activeTab === 'register' ? '0 4px 4px 0' : '4px',
            border: '1px solid #ccc',
            backgroundColor: activeTab === 'register' ? '#2e8555' : '#f5f5f5',
            color: activeTab === 'register' ? 'white' : '#333',
            cursor: 'pointer',
            fontWeight: 500,
            borderLeft: activeTab === 'register' ? '1px solid #ccc' : 'none',
          }}
        >
          Registrarse
        </button>
      </div>

      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

      <div className={styles.authNav}>
        <p className={styles.authNavText}>
          {activeTab === 'login'
            ? '¿No tienes cuenta?'
            : '¿Ya tienes cuenta?'}
        </p>
        <button onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}>
          {activeTab === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>
      </div>
    </div>
  );
} 