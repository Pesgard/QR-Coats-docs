---
sidebar_position: 1
---

# Flujo de Datos

Esta sección explica cómo fluyen los datos entre los diferentes componentes del sistema QRcoats.

## Flujo de Autenticación

El proceso de autenticación es crucial para asegurar que solo los usuarios autorizados accedan a los diferentes servicios del sistema.

```mermaid
sequenceDiagram
    autonumber
    participant Usuario
    participant Frontend as Aplicación Frontend
    participant Auth as API Autenticación
    participant API as Otras APIs
    
    Usuario->>Frontend: Solicitud de inicio de sesión
    Frontend->>Auth: Solicitud de autenticación
    Auth->>Auth: Validar credenciales
    Auth->>Auth: Generar token JWT
    Auth->>Frontend: Devolver token JWT
    Frontend->>Frontend: Almacenar token en localStorage/cookies
    
    Note over Frontend,API: El token JWT se usa para todas las solicitudes subsiguientes
    
    Frontend->>API: Solicitud a API con token JWT en header
    API->>Auth: Validar token JWT
    Auth->>API: Resultado de validación del token
    
    alt Token válido
        API->>API: Procesar solicitud
        API->>Frontend: Respuesta exitosa
    else Token inválido o expirado
        API->>Frontend: Error 401 Unauthorized
        Frontend->>Auth: Solicitar renovación de token
        Auth->>Frontend: Nuevo token JWT o error
    end
```

## Flujo de Generación de Códigos QR

La generación de códigos QR es una función central del sistema QRcoats, que permite a los usuarios crear identificadores únicos para sus productos.

```mermaid
sequenceDiagram
    autonumber
    participant Usuario
    participant Admin as Panel Administrador
    participant Auth as API Autenticación
    participant QR as API QR
    participant DB as Base de Datos
    
    Usuario->>Admin: Solicitar generación de QR
    Admin->>Auth: Verificar permisos del usuario
    Auth->>Admin: Confirmación de permisos
    
    Admin->>QR: Solicitud de generación de QR con parámetros
    
    QR->>QR: Validar parámetros de solicitud
    QR->>QR: Generar código QR único
    QR->>DB: Almacenar metadata del QR
    
    QR->>Admin: Respuesta con URL y datos del QR
    Admin->>Usuario: Mostrar QR generado
    
    Note over Usuario,DB: El QR contiene información encriptada que solo el sistema puede interpretar
```

## Flujo de Validación de Códigos QR

La validación de los códigos QR permite a los empleados y usuarios verificar la autenticidad de los productos.

```mermaid
sequenceDiagram
    autonumber
    participant Usuario
    participant AppCliente as App Cliente/Empleado
    participant Auth as API Autenticación
    participant QR as API QR
    participant DB as Base de Datos
    
    Usuario->>AppCliente: Escanear código QR
    AppCliente->>AppCliente: Decodificar QR básico
    
    alt Usuario autenticado
        AppCliente->>Auth: Verificar autenticación
        Auth->>AppCliente: Token JWT válido
    else Usuario anónimo
        Note over AppCliente: Acceso limitado a información pública
    end
    
    AppCliente->>QR: Solicitud de validación con ID del QR
    QR->>DB: Consultar datos del QR
    DB->>QR: Devolver información asociada
    
    QR->>QR: Verificar autenticidad y estado
    QR->>DB: Registrar evento de escaneo
    
    QR->>AppCliente: Respuesta con estado y datos
    AppCliente->>Usuario: Mostrar resultado de validación
```

## Flujo de Gestión de Empleados

La gestión de empleados permite asignar tareas y hacer seguimiento de su desempeño.

```mermaid
sequenceDiagram
    autonumber
    participant Admin as Administrador
    participant AdminPanel as Panel Administrador
    participant Auth as API Autenticación
    participant EmpAPI as API Empleados
    participant QR as API QR
    participant DB as Base de Datos
    
    Admin->>AdminPanel: Crear/Asignar tarea a empleado
    AdminPanel->>Auth: Autenticar administrador
    Auth->>AdminPanel: Token JWT
    
    AdminPanel->>EmpAPI: Solicitud de asignación de tarea
    EmpAPI->>DB: Almacenar tarea
    
    alt Tarea relacionada con QR
        EmpAPI->>QR: Consultar datos de QR asociados
        QR->>EmpAPI: Información de QR relevante
        EmpAPI->>DB: Actualizar tarea con datos de QR
    end
    
    EmpAPI->>AdminPanel: Confirmación de creación
    AdminPanel->>Admin: Notificar éxito
    
    Note over EmpAPI,DB: Se programa notificación al empleado
```

## Flujo de Actualización de Estado de QR

Los códigos QR pueden cambiar de estado durante su ciclo de vida (asignado, activado, expirado, etc.).

```mermaid
sequenceDiagram
    autonumber
    participant Usuario
    participant App as App Cliente/Empleado
    participant Auth as API Autenticación
    participant QR as API QR
    participant DB as Base de Datos
    
    Usuario->>App: Solicitar cambio de estado de QR
    App->>Auth: Verificar permisos
    Auth->>App: Confirmación de permisos
    
    App->>QR: Solicitud de actualización de estado
    QR->>DB: Verificar estado actual
    DB->>QR: Estado actual
    
    QR->>QR: Validar cambio de estado permitido
    
    alt Cambio válido
        QR->>DB: Actualizar estado
        QR->>DB: Registrar historial de cambios
        QR->>App: Confirmación de actualización
        App->>Usuario: Mostrar nuevo estado
    else Cambio inválido
        QR->>App: Error con motivo
        App->>Usuario: Mostrar error
    end
```

## Flujo de Sincronización en Tiempo Real

QRcoats utiliza Firebase para mantener sincronizados los datos en tiempo real entre diferentes clientes.

```mermaid
sequenceDiagram
    autonumber
    participant Cliente1 as Cliente 1
    participant Cliente2 as Cliente 2
    participant Firebase as Firebase Realtime DB
    participant QR as API QR
    participant DB as Base de Datos Principal
    
    Cliente1->>QR: Solicitar actualización de QR
    QR->>DB: Actualizar datos
    QR->>Firebase: Publicar evento de cambio
    Firebase-->>Cliente1: Notificar cambio aplicado
    Firebase-->>Cliente2: Notificar cambio en tiempo real
    Cliente2->>Cliente2: Actualizar UI automáticamente
    
    Note over Firebase,Cliente2: Los clientes suscritos reciben actualizaciones sin necesidad de refrescar
```

## Almacenamiento de Datos

QRcoats utiliza diferentes bases de datos dependiendo del servicio y los requisitos de rendimiento:

### Base de Datos Principal (PostgreSQL)

- **API de Autenticación**: 
  - Cuentas de usuario
  - Roles y permisos
  - Registro de inicios de sesión
  - Tokens de refresco
  
- **API de Empleados**:
  - Datos de empleados
  - Asignaciones de tareas
  - Métricas de rendimiento
  - Informes generados

- **API de QR**:
  - Datos básicos de QRs
  - Relaciones entre QRs y productos
  - Configuraciones de seguridad
  - Estadísticas de uso

### Base de Datos en Tiempo Real (Firebase)

- Actualizaciones en tiempo real de estado de QRs
- Notificaciones a empleados
- Estados de escaneo activos
- Registros temporales de acciones

### Almacenamiento de Objetos (AWS S3)

- Imágenes de QRs generados
- Recursos visuales asociados a productos
- Backups de códigos generados
- Archivos de informes

## Consideraciones de Seguridad

La arquitectura de QRcoats implementa múltiples capas de seguridad para proteger los datos:

- **Seguridad en Tránsito**:
  - Todas las comunicaciones utilizan HTTPS/TLS 1.3
  - Los WebSockets para actualizaciones en tiempo real implementan encriptación
  - Las claves API están protegidas y se rotan periódicamente

- **Seguridad de Autenticación**:
  - Los tokens JWT utilizan algoritmos seguros (RS256)
  - Tiempo de expiración corto (15-60 minutos)
  - Implementación de tokens de refresco con invalidación en cascada
  - Protección contra ataques de fuerza bruta

- **Seguridad de Datos**:
  - Encriptación de datos sensibles en reposo
  - Los QRs contienen firmas digitales para prevenir falsificaciones
  - Implementación de control de acceso basado en roles (RBAC)
  - Registro detallado de auditoría para todas las operaciones sensibles

- **Protección contra Vulnerabilidades**:
  - Validación estricta de datos de entrada
  - Protección contra inyección SQL y NoSQL
  - Cabeceras de seguridad configuradas (CORS, CSP, X-XSS-Protection)
  - Escaneo regular de vulnerabilidades y actualizaciones 