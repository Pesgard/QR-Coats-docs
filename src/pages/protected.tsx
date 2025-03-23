import React from 'react';
import Layout from '@theme/Layout';
import ProtectedRoute from '../components/Auth/ProtectedRoute';

export default function Protected() {
  return (
    <Layout
      title="Contenido Protegido"
      description="Contenido solo disponible para usuarios autenticados"
    >
      <ProtectedRoute>
        <div style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1>Contenido Protegido</h1>
            <p>¡Felicidades! Has accedido al contenido protegido</p>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>Información Confidencial</h2>
            <p>Esta página solo es accesible para usuarios que han iniciado sesión.</p>
            <p>Aquí puedes mostrar información o funcionalidades que solo deben estar disponibles para usuarios autenticados.</p>
            
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              marginTop: '20px',
              border: '1px solid #e9ecef'
            }}>
              <h3>Ejemplo de contenido privado</h3>
              <ul>
                <li>Datos de usuario</li>
                <li>Configuraciones personalizadas</li>
                <li>Información exclusiva</li>
              </ul>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
} 