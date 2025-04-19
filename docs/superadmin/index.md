---
sidebar_position: 1
---

# Panel de SuperAdmin

El Panel de SuperAdmin es una interfaz de administración privilegiada con capacidades extendidas para la gestión a nivel de sistema de la plataforma QRcoats.

## Visión General

El Panel de SuperAdmin proporciona funcionalidad para:
- Gestionar administradores de la plataforma
- Administrar clientes y clubes a nivel global
- Configurar y gestionar planes del sistema
- Supervisar y auditar la actividad del sistema
- Establecer parámetros globales de configuración

## Primeros Pasos para Desarrolladores

### Requisitos Previos

- Node.js (v16 o superior)
- npm o pnpm
- Git

### Instalación y Configuración

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio SuperAdmin
cd SuperAdmin

# Instalar dependencias
npm install # o pnpm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run preview` - Inicia un servidor para previsualizar la versión de producción

## Estructura del Proyecto

```
SuperAdmin/
├── public/            # Activos estáticos
├── src/               # Código fuente
│   ├── assets/        # Imágenes, fuentes y otros recursos
│   ├── auth/          # Componentes y rutas de autenticación
│   ├── club/          # Módulo principal para gestión
│   │   ├── components/  # Componentes reutilizables
│   │   ├── interfaces/  # Interfaces TypeScript
│   │   ├── layout/      # Componentes de layout
│   │   ├── pages/       # Páginas organizadas por funcionalidad
│   │   │   ├── Admins/    # Gestión de administradores
│   │   │   ├── Clients/   # Gestión de clientes
│   │   │   ├── Clubs/     # Gestión de clubes
│   │   │   ├── Plans/     # Gestión de planes
│   │   │   └── Users/     # Gestión de usuarios
│   │   └── routes/      # Configuración de rutas
│   ├── constants/     # Constantes y configuraciones
│   ├── hooks/         # Hooks personalizados
│   ├── models/        # Modelos y tipos de datos
│   ├── router/        # Configuración de enrutamiento
│   ├── services/      # Servicios para comunicación con APIs
│   ├── store/         # Configuración de Redux
│   ├── theme/         # Configuración del tema
│   ├── tools/         # Funciones de utilidad
│   ├── ui/            # Componentes de UI genéricos
│   ├── SuperAdmin.tsx # Componente principal
│   ├── main.tsx       # Punto de entrada
│   └── styles.css     # Estilos globales
├── package.json      # Dependencias y scripts
└── vite.config.ts    # Configuración de Vite
```

## Tecnologías Principales

El Panel de SuperAdmin está construido con:

- **React 18**: Para la construcción de la interfaz de usuario
- **TypeScript**: Para seguridad de tipos
- **Redux**: Para gestión de estado global mediante @reduxjs/toolkit
- **Redux Persist**: Para persistencia de estado
- **React Router v6**: Para enrutamiento
- **Material UI**: Como biblioteca principal de componentes
- **Mantine**: Como biblioteca complementaria de componentes
- **Axios**: Para comunicación con APIs REST
- **Vite**: Como bundler y herramienta de desarrollo

## Características Principales

### Gestión de Administradores
- Creación, edición y eliminación de cuentas de administrador
- Asignación de permisos y roles
- Monitoreo de actividad de administradores

### Gestión de Clientes y Clubes
- Panel centralizado para todos los clientes del sistema
- Creación y gestión de clubes asociados a clientes
- Configuración de parámetros específicos por cliente/club

### Gestión de Planes
- Configuración de planes disponibles en el sistema
- Definición de características incluidas en cada plan
- Asignación de planes a clientes

### Reportes y Análisis
- Visión general del sistema completo
- Estadísticas de uso y tendencias
- Informes personalizables

## Servicios y APIs

El Panel de SuperAdmin interactúa con varias APIs a través de servicios dedicados:

```typescript
// Estructura de servicios disponibles
export * from './admin.services';  // Gestión de administradores
export * from './auth.services';   // Autenticación y autorización
export * from './client.services'; // Gestión de clientes
export * from './club.services';   // Gestión de clubes
export * from './plan.services';   // Gestión de planes
```

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

La aplicación sigue un flujo de navegación similar al Panel de Admin, pero con capacidades extendidas:

1. **Modo No Autenticado**: Acceso restringido a las rutas de autenticación
   - `/auth/login`: Pantalla de inicio de sesión para superadministradores

2. **Modo Autenticado**: Acceso completo a todas las funcionalidades
   - Rutas principales para gestión de diferentes entidades del sistema
   - Acceso a configuraciones globales y opciones avanzadas

```typescript
// Estructura básica del enrutador
const AppRouter = () => {
  const { status } = useAppSelector((store) => store.authState);

  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<ClubesRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/dashboard" />} />
    </Routes>
  );
};
```

## Diferencias con el Panel de Admin

El Panel de SuperAdmin se diferencia del Panel de Admin en:

1. **Alcance**: Mientras que el Admin gestiona un único club o conjunto de clubes de un cliente, el SuperAdmin tiene acceso a todos los clientes y clubes del sistema.

2. **Capacidades**: El SuperAdmin puede realizar acciones a nivel de sistema como crear nuevos planes o configurar parámetros globales.

3. **Usuarios**: El SuperAdmin gestiona a los administradores, mientras que los administradores gestionan a sus empleados y clientes.

4. **Configuración**: El SuperAdmin puede modificar configuraciones que afectan a toda la plataforma.

## Buenas Prácticas para Desarrolladores

1. **Comprensión de la jerarquía**: Entender la relación SuperAdmin > Admin > Empleados/Usuarios.

2. **Seguridad**: Tener especial cuidado con los endpoints y acciones disponibles, ya que afectan a todo el sistema.

3. **Testing completo**: Probar exhaustivamente los cambios antes de implementarlos, dada la naturaleza crítica de este panel.

4. **Mantener la coherencia**: Seguir los patrones de diseño y arquitectura establecidos para facilitar el mantenimiento.

5. **Documentación**: Documentar claramente cualquier cambio o nueva funcionalidad, especialmente aquellos que puedan afectar a otros componentes del sistema. 