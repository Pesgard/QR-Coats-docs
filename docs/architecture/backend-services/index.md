---
sidebar_position: 1
---

# Servicios Backend

Esta sección proporciona guías, estándares y mejores prácticas para el desarrollo de servicios backend en el sistema QRcoats.

## Introducción

Los servicios backend de QRcoats están implementados utilizando NestJS, un framework moderno para Node.js que implementa patrones de arquitectura como Dependency Injection, Separation of Concerns, y modulable.

Esta sección cubre:

- [Documentación con Swagger](./swagger.md) - Estándares para documentar APIs
- Manejo de errores y excepciones
- Patrones de diseño recomendados
- Seguridad y autenticación
- Testing y calidad de código

## Estándares Generales

Los servicios backend deben seguir estos estándares generales:

1. **Estructura modular**: Organización clara en módulos con responsabilidad única
2. **Validación de entrada**: Uso de DTOs y validadores para toda entrada de datos
3. **Manejo de errores**: Filtros de excepción globales y consistentes
4. **Documentación**: Todos los endpoints deben estar documentados con Swagger
5. **Testing**: Cobertura de pruebas para lógica de negocio crítica

## Servicios Principales

QRcoats tiene dos servicios backend principales:

1. **API QR (qr-api)**: Enfocada en clientes finales, gestión de QRs, pagos y pases digitales
2. **API Empleados (api_employees)**: Enfocada en operaciones internas, gestión de clubes, y administración

Consulte las secciones específicas para obtener detalles sobre cada uno de estos servicios. 