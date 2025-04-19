---
sidebar_position: 1
---

# Arquitectura del sistema

Esta seccion muestra una vista detallada de la arquitectura del sistema que se usa en QRCoats, mostrando como todas las diferentes instancias se relacionan entre si e interactuan una con la otra

## Overview

QRcoats sigue una arquitectura modular que separa el frontend en diferentes aplicaciones y el backend en diferentes servicios:

- Aplicaciones del Frontend (Admin, SuperAdmin, Customers, Employees)
- Servicios del Backend (api-employees, qr-api)

## Diagrama del sistema

![System Diagram](/content/arquitectura.jpg)

## Documentos Clave de Arquitectura

- [Descripción General de Componentes](./components/index.md) - Información detallada sobre cada componente
- [Flujo de Datos](./data-flow/index.md) - Cómo fluyen los datos entre componentes
- [Arquitectura de Implementación](./deployment/index.md) - Información sobre implementación e infraestructura
- [Servicios Backend](./backend-services/index.md) - Guías y estándares para el desarrollo de servicios backend

## Interacciones de Componentes

- **Aplicaciones Frontend** consumen las APIs del backend
- **api-employees** gestiona la funcionalidad específica para empleados
- **qr-api** maneja la generación y gestión de códigos QR

## Stack Tecnológico

- Frontend: React/TypeScript, Angular/TypeScript
- Backend: NestJS
- Base de Datos: MongoDB con Mongoose como ODM
- Autenticación: JWT
