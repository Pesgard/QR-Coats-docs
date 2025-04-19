---
sidebar_position: 1
---

# API QR para Clientes

El API QR es un servicio basado en NestJS que proporciona toda la funcionalidad para la gestión de códigos QR, procesos de pago, pases digitales y servicios para los clientes del sistema QRcoats.

## Visión General

El API QR proporciona:

- Generación y gestión de códigos QR
- Procesamiento de pagos con Stripe y Moneris
- Gestión de pases digitales (Apple Wallet/Google Wallet)
- Administración de usuarios y clientes
- Gestión de ubicaciones, racks, slots y colgadores
- Gestión de códigos de descuento
- Estadísticas y registros diarios
- Suscripciones y planes

## Primeros Pasos para Desarrolladores

### Requisitos Previos

- Node.js (v16 o superior)
- npm
- MongoDB (local o acceso a MongoDB Atlas)
- Git
- Editor de código (VS Code recomendado)

### Instalación y Configuración

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio del proyecto
cd qr-api

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copiar .env.example a .env y configurar las variables necesarias
```

#### Variables de Entorno Esenciales

Asegúrate de configurar estas variables en tu archivo `.env`:

```
URI_MONGODB="mongodb+srv://usuario:contraseña@cluster.mongodb.net/database" 
JWT_SECRET="TuClaveSecreta" 
EXPIRES_IN="12h" 
APP_URL="https://qrCoats.com" 
PORT=3000 
```

### Ejecutar la Aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod

# Para construir el proyecto
npm run build
```

## Estructura del Proyecto

```
qr-api/
├── src/                # Código fuente
│   ├── main.ts         # Punto de entrada
│   ├── app.module.ts   # Módulo principal
│   ├── endpoints/      # Controladores y servicios por funcionalidad
│   │   ├── auth/       # Autenticación
│   │   ├── client/     # Gestión de clientes
│   │   ├── clube/      # Gestión de clubes
│   │   ├── daily/      # Registros diarios
│   │   ├── discount-code/ # Códigos de descuento
│   │   ├── hanger/     # Gestión de colgadores
│   │   ├── location/   # Gestión de ubicaciones
│   │   ├── moneris/    # Procesamiento de pagos Moneris
│   │   ├── order/      # Gestión de órdenes
│   │   ├── pass/       # Pases digitales (Apple/Google Wallet)
│   │   ├── payment/    # Procesamiento de pagos (Stripe)
│   │   ├── plan/       # Gestión de planes
│   │   ├── qr/         # Generación y gestión de QR
│   │   ├── rack/       # Gestión de racks
│   │   ├── registros/  # Registros y estadísticas
│   │   ├── slot/       # Gestión de slots
│   │   ├── sms/        # Envío de SMS
│   │   └── user/       # Gestión de usuarios
│   └── commons/        # Código compartido
│       ├── filters/    # Filtros de excepción
│       ├── interceptors/ # Interceptores
│       ├── interfaces/ # Interfaces compartidas
│       └── utils/      # Utilidades
├── passModels/         # Plantillas para pases digitales
├── uploads/            # Directorio para archivos subidos temporales
└── certs/              # Certificados para pases digitales
```

## Endpoints API Principales

La documentación detallada de la API está disponible a través de Swagger en `/api/docs` cuando la aplicación está en ejecución.

### Autenticación

- `POST /api/v1/auth/login` - Iniciar sesión
<!-- - `POST /api/v1/auth/register` - Registrar nuevo usuario -->

### QR

- `GET /api/v1/qr` - Listar todos los códigos QR
- `GET /api/v1/qr/:id/url` - Obtener URL del QR por ID
- `POST /api/v1/qr` - Crear un nuevo código QR
- `PATCH /api/v1/qr/:id` - Actualizar un código QR
- `PUT /api/v1/qr/delete/:id` - Eliminar un código QR
- `POST /api/v1/qr/upload-s3` - Subir archivo a S3

### Pagos

- `POST /api/v1/payment/create-payment-intent` - Crear intento de pago con Stripe
- `POST /api/v1/moneris/process-payment` - Procesar pago con Moneris

### Pases Digitales

- `POST /api/v1/pass/generate` - Generar un pase digital para Apple/Google Wallet
- `GET /api/v1/pass/:id` - Obtener un pase digital existente

## Integración con Apple/Google Wallet

El API QR incluye integración con Apple Wallet y Google Wallet para generar pases digitales. Estos pases permitirán a los usuarios tener acceso directo a sus QR desde sus dispositivos móviles.

```typescript
// Ejemplo de generación de un pase digital
@Post('generate')
async generatePass(@Body() passData: PassDTO) {
  return this.passService.generatePass(passData);
}
```

## Procesamiento de Pagos

El sistema soporta múltiples procesadores de pago:

1. **Stripe**: Para pagos con tarjetas internacionales
2. **Moneris**: Para procesamiento de pagos en Canadá

## Seguridad y Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación:

```typescript
// Ejemplo de ruta protegida con JWT
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

## Integración con Servicios Externos

- **MongoDB Atlas**: Para almacenamiento de datos
- **AWS S3**: Para almacenamiento de archivos
<!-- - **Firebase**: Para notificaciones -->
- **Stripe y Moneris**: Para procesamiento de pagos
- **Apple/Google Wallet**: Para pases digitales

## Buenas Prácticas para Desarrolladores

1. **Estructura de Código**: Sigue la estructura establecida para mantener la coherencia
2. **Manejo de Errores**: Utiliza los filtros de excepción proporcionados
3. **Validación de Datos**: Usa los DTOs y class-validator para validar datos de entrada
4. **Pruebas**: Escribe pruebas unitarias para los componentes nuevos
5. **Documentación**: Mantén actualizada la documentación de Swagger

## WebSockets

La API implementa WebSockets para notificaciones en tiempo real:

```typescript
// Configuración en main.ts
app.useWebSocketAdapter(new IoAdapter(app));
```

## Solución de Problemas Comunes

### Problemas de Conexión a MongoDB

- Verifica la cadena de conexión en el archivo `.env`
- Asegúrate de que tu IP tenga permiso para acceder a MongoDB Atlas

### Errores en la Generación de Pases

- Verifica que los certificados en la carpeta `certs/` sean válidos
- Asegúrate de que las plantillas en `passModels/` estén correctamente configuradas

### Errores en los Pagos

- Verifica las claves API de Stripe/Moneris
- Revisa los logs para identificar mensajes de error específicos
