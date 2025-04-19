---
sidebar_position: 1
---

# Aplicación para Clientes

La aplicación para Clientes (Customers) es una aplicación web diseñada para usuarios finales que interactúan con el sistema QRcoats, permitiéndoles gestionar sus servicios y acceder a las funcionalidades del sistema.

## Visión General

La aplicación para Clientes permite a los usuarios:
- Registrarse y gestionar sus cuentas
- Explorar y seleccionar clubes disponibles
- Solicitar y gestionar servicios
- Realizar pagos
- Ver historial de recibos y servicios contratados
- Gestionar su perfil de usuario

## Primeros Pasos para Desarrolladores

### Requisitos Previos

- Node.js (v16 o superior)
- npm o pnpm
- Git

### Instalación y Configuración

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio Customers
cd Customers

# Instalar dependencias
npm install # o pnpm install

# Iniciar servidor de desarrollo
npm run dev --host
```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run preview` - Inicia un servidor para previsualizar la versión de producción

### Variables de Entorno

El proyecto utiliza diferentes archivos de entorno para distintos ambientes:

- `.env.development`: Configuración para desarrollo
- `.env.staging`: Configuración para entorno de pruebas
- `.env.production`: Configuración para producción

## Estructura del Proyecto

```
Customers/
├── public/            # Activos estáticos
├── src/               # Código fuente
│   ├── assets/        # Imágenes, fuentes y otros recursos
│   ├── auth/          # Componentes y rutas de autenticación
│   ├── clube/         # Módulo principal de gestión de clubes
│   │   ├── components/  # Componentes reutilizables
│   │   ├── interfaces/  # Interfaces TypeScript
│   │   ├── layout/      # Componentes de layout
│   │   ├── pages/       # Páginas organizadas por funcionalidad
│   │   │   ├── ClubManagment/  # Gestión de servicios y pagos
│   │   │   ├── HomeClubes/     # Página principal con clubes
│   │   │   ├── Profile/        # Gestión de perfil de usuario
│   │   │   └── ReceiptHistory/ # Historial de recibos
│   │   └── routes/      # Configuración de rutas
│   ├── components/    # Componentes globales
│   ├── constants/     # Constantes y configuraciones
│   ├── firebase/      # Configuración de Firebase
│   ├── helepers/      # Funciones de ayuda
│   ├── hooks/         # Hooks personalizados
│   ├── models/        # Modelos y tipos de datos
│   ├── router/        # Configuración de enrutamiento
│   ├── services/      # Servicios para comunicación con APIs
│   ├── store/         # Configuración de Redux
│   ├── theme/         # Configuración del tema
│   ├── tools/         # Funciones de utilidad
│   ├── ui/            # Componentes de UI genéricos
│   ├── QrCoatApp.tsx  # Componente principal
│   ├── main.tsx       # Punto de entrada
│   └── styles.css     # Estilos globales
├── package.json      # Dependencias y scripts
└── vite.config.ts    # Configuración de Vite
```

## Tecnologías Principales

La aplicación para Clientes está construida con:

- **React 18**: Para la construcción de la interfaz de usuario
- **TypeScript**: Para seguridad de tipos
- **Redux**: Para gestión de estado global mediante @reduxjs/toolkit
- **Redux Persist**: Para persistencia de estado
- **React Router v6**: Para enrutamiento
- **Material UI**: Como biblioteca principal de componentes
- **Bootstrap**: Para estilos adicionales y componentes
- **React Hook Form**: Para manejo de formularios
- **Yup**: Para validación de datos
- **Axios**: Para comunicación con APIs REST
- **Stripe**: Para procesamiento de pagos
- **Google OAuth**: Para inicio de sesión con Google
- **Firebase**: Para funcionalidades adicionales
- **Socket.io-client**: Para comunicación en tiempo real
- **Vite**: Como bundler y herramienta de desarrollo

## Características Principales

### Autenticación y Registro
- Sistema de login/registro
- Integración con Google OAuth
- Persistencia de sesión

### Exploración de Clubes
- Lista de clubes disponibles
- Detalles del club seleccionado
- Información sobre ubicaciones y servicios

### Gestión de Servicios
- Selección de servicios
- Configuración de opciones
- Formularios para invitados

### Proceso de Pago
- Integración con Stripe
- Gestión de tarjetas
- Aplicación de códigos de descuento

### Historial y Recibos
- Visualización de servicios contratados
- Detalles de compras anteriores
- Generación de recibos en PDF

### Perfil de Usuario
- Gestión de datos personales
- Preferencias de usuario
- Historial de actividad

## Servicios y APIs

La aplicación para Clientes interactúa con varias APIs a través de servicios dedicados:

```typescript
// Estructura de servicios disponibles
export * from './auth.services';    // Autenticación de usuarios
export * from './club.services';    // Gestión de clubes
export * from './order.services';   // Gestión de órdenes y pagos
```

Ejemplo de servicio de API para clubes:

```typescript
// Ejemplo de servicio para obtener clubes
export const getClubes = () => {
  const controller = loadAbort();
  return {
    call: axios.get(`${currentEnpoint}clubes`, {
      signal: controller.signal,
    }),
    controller,
  };
};
```

## Flujo del Usuario

La aplicación sigue un flujo de usuario intuitivo:

1. **Registro/Login**: El usuario se registra o inicia sesión
2. **Selección de Club**: Visualiza y selecciona un club de la lista disponible
3. **Selección de Servicios**: Elige los servicios que desea adquirir
4. **Proceso de Pago**: Completa la información de pago
5. **Confirmación**: Recibe confirmación y puede ver el historial de servicios

## Proceso de Desarrollo

Para desarrollar nuevas funcionalidades o modificar las existentes, se recomienda:

1. **Comprender el flujo de usuario**: Navegar por la aplicación para entender la experiencia del usuario
2. **Revisar los componentes existentes**: Familiarizarse con los componentes disponibles
3. **Utilizar hooks personalizados**: Aprovechar los hooks del proyecto para reutilizar lógica
4. **Seguir patrones de diseño**: Mantener la coherencia con los patrones establecidos
5. **Probar en diferentes dispositivos**: La aplicación está diseñada para ser responsiva

## Buenas Prácticas

1. **Componentes modulares**: Crear componentes pequeños y reutilizables
2. **Tipado estricto**: Utilizar TypeScript para todos los componentes y funciones
3. **Estado centralizado**: Gestionar el estado global en Redux
4. **Validación de formularios**: Utilizar Yup para validar todos los formularios
5. **Código limpio**: Seguir las convenciones de estilo y mantener el código ordenado
6. **Testing**: Verificar el funcionamiento en diferentes escenarios y dispositivos 