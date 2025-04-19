---
sidebar_position: 1
---

# API Employees

La API de Empleados es un servicio basado en NestJS que gestiona todo lo relacionado con empleados, clubes, y recursos del sistema QRcoats destinados al personal interno.

## Visión General

La API de Empleados proporciona:

- Gestión de empleados y usuarios
- Administración de clubes y planes
- Gestión de ubicaciones, racks, slots y colgadores
- Procesamiento de órdenes y códigos QR
- Comunicación por email
- Autenticación y autorización basada en roles

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
cd api_employees

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copiar .env.example a .env y configurar las variables necesarias
```

#### Variables de Entorno Esenciales

Asegúrate de configurar estas variables en tu archivo `.env`:

```
URI_MONGODB=<tu-conexión-mongodb>
JWT_SECRET=<tu-clave-secreta-jwt>
JWT_DURATION=7d
PORT=3001
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
api_employees/
├── src/                # Código fuente
│   ├── main.ts         # Punto de entrada
│   ├── app.module.ts   # Módulo principal
│   ├── endpoints/      # Controladores y servicios por funcionalidad
│   │   ├── auth/       # Autenticación y autorización
│   │   ├── clubs/      # Gestión de clubes
│   │   ├── email/      # Servicios de email
│   │   ├── hangers/    # Gestión de colgadores
│   │   ├── locations/  # Gestión de ubicaciones
│   │   ├── orders/     # Gestión de órdenes
│   │   ├── plans/      # Gestión de planes
│   │   ├── qrs/        # Gestión de códigos QR
│   │   ├── racks/      # Gestión de racks
│   │   └── slots/      # Gestión de slots
│   ├── core/           # Lógica de negocio central
│   │   ├── entities/   # Modelos y esquemas
│   │   ├── guards/     # Guardias de autenticación
│   │   ├── shared/     # Utilidades compartidas
│   │   └── exceptions/ # Manejo de excepciones
│   └── repos/          # Repositorios para acceso a datos
├── test/               # Pruebas
├── uploads/            # Directorio para archivos subidos
└── dist/               # Código compilado
```

## Modelos de Datos Principales

La API utiliza Mongoose como ODM para MongoDB. Estos son los principales modelos:

### User

```typescript
@Schema()
export class User {
    @Prop() name: string;
    @Prop() lastName: string;
    @Prop() username: string;
    @Prop() email: string;
    @Prop() password: string; // Almacenado con hash
    @Prop() rol: string;
    @Prop() photoURL: string;
    @Prop() phone: string;
}
```

### Club

```typescript
@Schema({ collection: 'clubs' })
export class Club {
    @Prop() name: string;
    @Prop() icon: string;
    @Prop() photo: string;
    @Prop() customNote: string;
    @Prop() closingHour: string;
    @Prop() openingHour: string;
    @Prop() services: Array<Service>;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' })
    plan: mongoose.Schema.Types.ObjectId;
}
```

## Endpoints API Principales

La documentación detallada de la API está disponible a través de Swagger en `/api` cuando la aplicación está en ejecución.

### Autenticación

- `POST /auth/login` - Iniciar sesión

### Clubs

- `GET /clubs` - Listar clubs
- `GET /clubs/:id` - Obtener un club por ID
- `GET /clubs/byClub/:clubid` - Obtener clubs via club ID

### QRs

- `GET /qrs` - Listar todos los códigos QR filtrados por club con paginación opcional
  - Query params: `clubId` (obligatorio), `page`, `limit`, `orderType`
- `GET /qrs/:id` - Obtener un código QR por ID y marcarlo como usado
- `GET /qrs/onlyFind/:id` - Obtener un código QR por ID sin modificar su estado
- `GET /qrs/search/:searchTerm` - Buscar QRs por término (nombre del hanger o email)
  - Query params: `clubId` (obligatorio)
- `GET /qrs/breaks` - Listar todos los descansos activos
- `POST /qrs/assign` - Asignar un colgador (hanger) a un QR
- `POST /qrs/detach` - Desasignar un colgador de un QR
- `POST /qrs/slot` - Actualizar el estado de slot de un QR
- `POST /qrs/payment` - Confirmar el pago de un QR
- `POST /qrs/upload-s3` - Subir un archivo asociado a QR a AWS S3
- `PATCH /qrs/:id` - Actualizar un código QR
- `PATCH /qrs/break/:id` - Gestionar un descanso para un QR

## Seguridad y Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación:

```typescript
// Ejemplo de uso del AuthGuard
@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

Los tokens JWT se generan al iniciar sesión y deben incluirse en el encabezado `Authorization` como `Bearer <token>` para las rutas protegidas.

## Integración con Servicios Externos

- **MongoDB Atlas**: Para almacenamiento de datos
- **AWS S3**: Para almacenamiento de archivos
<!-- - **Firebase**: Para notificaciones -->
- **Mailgun**: Para envío de correos electrónicos

## Buenas Prácticas para Desarrolladores

1. **Estructura de Código**: Sigue la estructura establecida para mantener la coherencia
2. **Manejo de Errores**: Utiliza los filtros de excepción proporcionados
3. **Validación de Datos**: Usa los DTOs y class-validator para validar datos de entrada
4. **Pruebas**: Escribe pruebas unitarias para los componentes nuevos
5. **Documentación**: Mantén actualizada la documentación de Swagger

## Herramientas de Desarrollo Útiles

- **Swagger UI**: Accesible en `/api` para explorar y probar los endpoints
- **Jest**: Para pruebas unitarias y e2e
- **Docker**: Para ejecutar en contenedores

## Solución de Problemas Comunes

### Problemas de Conexión a MongoDB

- Verifica la cadena de conexión en el archivo `.env`
- Asegúrate de que tu IP tenga permiso para acceder a MongoDB Atlas

### Errores de Autenticación

- Verifica que el token JWT sea válido y no haya expirado
- Asegúrate de que el usuario tenga los permisos correctos

### Errores en la Carga de Archivos

- Verifica las credenciales de AWS S3 en el archivo `.env`
- Asegúrate de que el directorio `uploads` tenga permisos de escritura
