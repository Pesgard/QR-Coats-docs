---
sidebar_position: 1
---

# Visión General de Componentes

Esta sección proporciona información detallada sobre cada componente en el sistema QRcoats.

## Arquitectura del Sistema

QRcoats está construido como un ecosistema de aplicaciones que trabajan en conjunto para proporcionar una solución completa de gestión y validación mediante códigos QR. La arquitectura se divide en componentes frontend y backend que se comunican a través de APIs RESTful.

![System Diagram](/content/arquitectura.jpg)

## Componentes Frontend

### Panel de Administrador

**Repositorio:** Admin

El Panel de Administrador es una aplicación React + Vite diseñada para usuarios administrativos del sistema. Proporciona una interfaz para gestionar usuarios, códigos QR y visualizar informes.

**Características principales:**

- Gestión de usuarios y permisos
- Generación y administración de códigos QR
- Tableros de informes y analíticas
- Configuración del sistema
- Gestión de clientes

**Tecnologías:**

- React 18
- TypeScript
- Vite
- Gestión de estado con React Context API / Redux
- Componentes UI personalizados

[Más información sobre el Panel de Administrador](../../admin/index.md)

### Panel de SuperAdmin

**Repositorio:** SuperAdmin

El Panel de SuperAdmin extiende las capacidades del Panel de Administrador, proporcionando herramientas avanzadas para la gestión a nivel de sistema. Está diseñado para administradores con acceso completo al sistema.

**Características principales:**

- Gestión de organizaciones
- Configuración global del sistema
- Herramientas de auditoría y monitoreo
- Control de acceso avanzado
- Gestión de integraciones

**Tecnologías:**

- React
- TypeScript
- Vite
- Componentes reutilizables compartidos con el Panel de Administrador

[Más información sobre el Panel de SuperAdmin](../../superadmin/index.md)

### Aplicación de Clientes

**Repositorio:** Customers

La Aplicación de Clientes es una interfaz orientada al usuario final que permite a los clientes gestionar sus códigos QR, verificar la autenticidad de productos y acceder a información relacionada.

**Características principales:**

- Registro y gestión de cuenta
- Generación y gestión de códigos QR
- Verificación de autenticidad
- Estadísticas de uso
- Interfaz adaptable a móviles

**Tecnologías:**

- React
- TypeScript
- Vite
- Diseño responsive para móviles y desktop

[Más información sobre la Aplicación de Clientes](../../customers/index.md)

### Aplicación de Empleados

**Repositorio:** Employees

La Aplicación de Empleados es una aplicación Angular diseñada para el personal operativo que interactúa con los códigos QR en el campo. Permite gestionar, escanear y procesar códigos QR, así como realizar tareas administrativas relacionadas con los productos etiquetados.

**Características principales:**

- Escaneo y validación de códigos QR
- Gestión de artículos (items) asociados a códigos QR
- Sistema de paginación infinita para grandes volúmenes de datos
- Búsqueda y filtrado avanzado de códigos QR
- Intercambio y reorganización de códigos QR (swap)
- Visualización detallada de información de códigos QR
- Gestión de ubicaciones y racks

**Tecnologías:**

- Angular 16
- TypeScript
- Angular Material
- RxJS para programación reactiva
- Firebase/Angular Fire para backend
- QR Scanner y QRCode para manipulación de códigos QR
- Jest para pruebas unitarias

**Características técnicas destacadas:**

- Implementación de IntersectionObserver para scroll infinito
- Sistema de ordenamiento y filtrado en tiempo real
- Integración con cámara para escaneo de QR
- Implementación de observables para actualización en tiempo real
- Contenedorización con Docker para despliegue sencillo

[Más información sobre la Aplicación de Empleados](../../employees/index.md)

## Componentes Backend

### API de Autenticación

**Repositorio:** api-auth

El servicio API de Autenticación gestiona la autenticación y autorización para todos los componentes del sistema QRcoats. Proporciona endpoints seguros para la gestión de usuarios y permisos.

**Características principales:**

- Autenticación mediante JWT
- Gestión de usuarios y perfiles
- Control de acceso basado en roles (RBAC)
- Seguridad y verificación de tokens
- Integración con proveedores de autenticación externos

**Tecnologías:**

- NestJS
- TypeScript
- JWT para tokens de autenticación
- Estrategias de seguridad avanzadas

**Endpoints principales:**

- `/auth/login` - Autenticación de usuarios
- `/auth/register` - Registro de nuevos usuarios
- `/users` - Gestión de usuarios
- `/roles` - Gestión de roles y permisos

[Más información sobre la API de Autenticación](../../api-auth/index.md)

### API de Empleados

**Repositorio:** api_employees

El servicio API de Empleados gestiona la información y operaciones relacionadas con los empleados del sistema. Proporciona endpoints para la gestión de tareas, rendimiento y datos de empleados.

**Características principales:**

- Gestión de datos de empleados
- Asignación y seguimiento de tareas
- Métricas de rendimiento
- Generación de informes
- Integración con la API de QR

**Tecnologías:**

- NestJS
- TypeScript
- Integración con base de datos
- Comunicación con otros servicios mediante HTTP/microservicios

**Endpoints principales:**

- `/employees` - CRUD de empleados
- `/tasks` - Gestión de tareas
- `/performance` - Métricas de rendimiento
- `/reports` - Generación de informes

[Más información sobre la API de Empleados](../../api-employees/index.md)

### API de QR

**Repositorio:** qr-api

El servicio API de QR es el núcleo del sistema QRcoats, encargado de la generación, validación y análisis de códigos QR. Proporciona endpoints para todas las operaciones relacionadas con códigos QR.

**Características principales:**

- Generación de códigos QR únicos
- Verificación y validación de códigos QR
- Almacenamiento y recuperación de información asociada
- Análisis de uso y escaneos
- Detección de falsificaciones

**Tecnologías:**

- NestJS
- TypeScript
- Bibliotecas especializadas en generación de QR
- Algoritmos de seguridad y encriptación
- Almacenamiento de datos optimizado

**Endpoints principales:**

- `/qr/generate` - Generación de nuevos códigos QR
- `/qr/validate` - Validación de códigos QR
- `/qr/info` - Obtención de información asociada a QR
- `/qr/analytics` - Análisis de uso y escaneos

[Más información sobre la API de QR](../../qr-api/index.md)

## Interacción entre Componentes

El sistema QRcoats funciona a través de la interacción entre sus diferentes componentes:

1. **Flujo de autenticación:**
   - Los usuarios se autentican a través de la API de Autenticación
   - Se generan tokens JWT que se utilizan en las solicitudes a otras APIs

2. **Generación de códigos QR:**
   - Los administradores o clientes solicitan nuevos códigos a través de sus respectivas interfaces
   - La solicitud pasa por la API de Autenticación para verificar permisos
   - La API de QR genera el código y lo almacena junto con sus metadatos

3. **Validación de códigos QR:**
   - Los empleados o clientes escanean códigos QR con sus aplicaciones
   - La aplicación envía el código a la API de QR para validación
   - La API de QR verifica la autenticidad y devuelve la información asociada

4. **Gestión de empleados:**
   - Los administradores asignan tareas a través del Panel de Administración
   - La API de Empleados gestiona estas asignaciones
   - Los empleados reciben y completan las tareas a través de su aplicación

## Consideraciones de Seguridad

- Todas las comunicaciones entre componentes utilizan HTTPS
- Los tokens JWT tienen tiempo de expiración limitado
- Se implementa RBAC para garantizar que los usuarios solo accedan a recursos autorizados
- Los códigos QR incluyen elementos de seguridad para prevenir falsificaciones
- Datos sensibles se almacenan de forma encriptada
