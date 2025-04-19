---
sidebar_position: 1
---

# Panel de Administración

El Panel de Administración es una aplicación web desarrollada con React y TypeScript diseñada para administradores del sistema QRcoats.

## Visión General

El Panel de Administración proporciona funcionalidades para gestionar:

- Cuentas de usuarios y empleados
- Clubes y sus configuraciones
- Ubicaciones, racks y slots
- Códigos QR
- Códigos de descuento
- Reportes y estadísticas

## Primeros Pasos para Desarrolladores

### Requisitos Previos

- Node.js (v16 o superior)
- npm o pnpm
- Git

### Instalación y Configuración

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio Admin
cd Admin

# Instalar dependencias
npm install # o pnpm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run build:dev` - Genera la versión de desarrollo
- `npm run build:prod` - Genera la versión de producción optimizada
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run preview` - Inicia un servidor para previsualizar la versión de producción

## Estructura del Proyecto

```
Admin/
├── public/            # Activos estáticos
├── src/               # Código fuente
│   ├── assets/        # Imágenes, fuentes y otros recursos
│   ├── auth/          # Componentes y rutas de autenticación
│   ├── club/          # Módulo principal de gestión de clubes
│   │   ├── components/  # Componentes reutilizables del módulo
│   │   ├── hooks/       # Hooks personalizados del módulo
│   │   ├── interfaces/  # Interfaces TypeScript
│   │   ├── layout/      # Componentes de layout
│   │   ├── pages/       # Páginas del módulo
│   │   └── routes/      # Configuración de rutas
│   ├── constants/     # Constantes y configuraciones
│   ├── context/       # Contextos de React
│   ├── firebase/      # Configuración e integración con Firebase
│   ├── hooks/         # Hooks personalizados globales
│   ├── models/        # Modelos y tipos de datos
│   ├── router/        # Configuración de enrutamiento
│   ├── services/      # Servicios para comunicación con APIs
│   ├── store/         # Configuración de Redux
│   ├── theme/         # Configuración del tema
│   ├── tools/         # Funciones de utilidad
│   ├── types/         # Definiciones de tipos TypeScript
│   ├── ui/            # Componentes de UI genéricos
│   ├── AdminCoatApp.tsx # Componente principal de la aplicación
│   ├── main.tsx        # Punto de entrada
│   └── styles.css      # Estilos globales
├── package.json      # Dependencias y scripts
└── vite.config.ts    # Configuración de Vite
```

## Tecnologías Principales

El Panel de Administración está construido con:

- **React 18**: Para la construcción de la interfaz de usuario
- **TypeScript**: Para seguridad de tipos
- **Redux**: Para gestión de estado global mediante @reduxjs/toolkit
- **Redux Persist**: Para persistencia de estado
- **React Router v6**: Para enrutamiento
- **Material UI**: Como biblioteca principal de componentes
- **Mantine**: Como biblioteca complementaria de componentes
- **Axios**: Para comunicación con APIs REST
- **React Hook Form**: Para manejo de formularios
- **Yup**: Para validación de datos
- **Firebase**: Para funcionalidades adicionales (auth, storage)
- **Socket.io-client**: Para comunicación en tiempo real
- **Vite**: Como bundler y herramienta de desarrollo

## Características Principales

### Autenticación y Autorización

- Sistema de login/logout
- Protección de rutas
- Persistencia de sesión

### Gestión de Clubes

- Creación y edición de clubes
- Administración de servicios
- Configuración de horarios y reglas

### Gestión de Ubicaciones y Recursos

- Administración de ubicaciones, racks y slots
- Asignación de recursos
- Visualización de estado en tiempo real

### Códigos QR

- Generación de códigos QR
- Seguimiento de estado
- Gestión de códigos de descuento

### UI Moderna y Responsiva

- Diseño moderno con Material UI
- Soporte para diferentes dispositivos y tamaños de pantalla
- Tema personalizable

## Integración con APIs

El Panel de Administración se comunica con las siguientes APIs:

- **API de Autenticación**: Para gestión de sesiones
- **API de Empleados**: Para gestión de clubes, ubicaciones y recursos
- **API de QR**: Para gestión de códigos QR

Ejemplo de servicio de API:

```typescript
// Ejemplo de servicio de autenticación
import { currentEnpoint } from "@/constants";
import { loadAbort } from "@/tools";
import axios from "axios";

interface UserData {
  username: string;
  password: string;
}

export const signIn = (userData: UserData) => {
  const controller = loadAbort();
  return {
    call: axios.post(`${currentEnpoint}auth/signin`, userData, {
      signal: controller.signal,
    }),
    controller,
  };
};
```

## Flujo de Navegación

La aplicación tiene dos modos principales de navegación:

1. **Modo No Autenticado**: Acceso solo a las rutas de autenticación
   - `/auth/login`: Pantalla de inicio de sesión
   - `/auth/dashboard`: Resumen inicial

2. **Modo Autenticado**: Acceso a todas las funcionalidades de la aplicación
   - `/club/:id`: Gestión de un club específico
   - `/locations`: Gestión de ubicaciones
   - `/users`: Gestión de usuarios

## Buenas Prácticas para Desarrolladores

1. **Estructura de carpetas**: Mantener la organización modular
2. **Componentes reutilizables**: Utilizar y extender los componentes de UI existentes
3. **TypeScript**: Definir interfaces para todos los datos
4. **Estado global**: Utilizar Redux para estado compartido entre componentes
5. **Hooks personalizados**: Encapsular lógica reutilizable en hooks
6. **Consistencia de diseño**: Seguir el tema y patrones de diseño establecidos
