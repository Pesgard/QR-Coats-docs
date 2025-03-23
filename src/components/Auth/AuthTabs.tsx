import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './Auth.module.css';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className={styles.authTabsContainer}>
      <div className={styles.tabButtonsContainer}>
        <button
          onClick={() => setActiveTab('login')}
          className={`${styles.tabButton} ${activeTab === 'login' ? styles.activeTab : ''} ${styles.leftTab}`}
        >
          Iniciar Sesión
        </button>
      </div>

      <div className={styles.formContainer}>
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>

      {/* <div className={styles.authNav}>
        <p className={styles.authNavText}>
          {activeTab === 'login'
            ? '¿No tienes cuenta?'
            : '¿Ya tienes cuenta?'}
        </p>
        <button 
          className={styles.switchButton}
          onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
        >
          {activeTab === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>
      </div> */}
    </div>
  );
} 