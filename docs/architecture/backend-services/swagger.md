---
sidebar_position: 2
---

# Documentación con Swagger

Esta guía proporciona las mejores prácticas para documentar los endpoints de las APIs en QRcoats utilizando Swagger (OpenAPI).

## Visión General

Swagger es una herramienta potente para documentar APIs REST. En QRcoats, utilizamos Swagger para:

1. Proporcionar documentación clara de todos los endpoints
2. Permitir pruebas interactivas de los endpoints
3. Generar documentación automáticamente basada en decoradores
4. Mantener la documentación sincronizada con el código

## Configuración Básica

En ambas APIs de QRcoats, Swagger ya está configurado en los archivos `main.ts`. Esta configuración incluye:

```typescript
// Ejemplo de configuración en api_employees/src/main.ts
const config = new DocumentBuilder()
  .setTitle('QR Coats Employees API')
  .setDescription('The employees API description')
  .setVersion('1.0')
  .addTag('employees')
  .addTag('Auth')
  .addTag('Clubs')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT',
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

```typescript
// Ejemplo de configuración en qr-api/src/main.ts
const options = new DocumentBuilder()
  .setTitle('QR-COATS API')
  .setDescription('QR COATS')
  .setVersion('1.0.0.')
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('/api/docs', app, document, {
  swaggerOptions: {
    filter: true,
  },
});
```

## Enfoques para Documentar Endpoints

### Enfoque 1: Decoradores Directos

En este enfoque, los decoradores de Swagger se aplican directamente a los controladores y métodos:

```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Qrs')
@Controller('qrs')
export class QrsController {
  
  @ApiOperation({ summary: 'Obtener un QR por ID' })
  @ApiParam({ name: 'id', description: 'ID del código QR' })
  @ApiResponse({ status: 200, description: 'QR encontrado' })
  @ApiResponse({ status: 404, description: 'QR no encontrado' })
  @Get(':id')
  getQr(@Param('id') qrId: string) {
    // implementación
  }
  
  @ApiOperation({ summary: 'Listar QRs por club' })
  @ApiQuery({ name: 'clubId', description: 'ID del club', required: true })
  @ApiQuery({ name: 'page', description: 'Número de página', required: false })
  @ApiQuery({ name: 'limit', description: 'Límite de resultados por página', required: false })
  @Get()
  listQrs(
    @Query('clubId') clubId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    // implementación
  }
}
```

### Enfoque 2: Archivos Separados (Recomendado)

Este enfoque, utilizado en el módulo de Clubs, separa la documentación de Swagger en un archivo dedicado:

1. **Crear un archivo `nombre-modulo.swagger.ts`**:

```typescript
// Ejemplo de clubs.swagger.ts
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { clubData } from './dtos/club-data';
import { Club } from 'src/core/entities/club';

/**
 * Apply @ApiTags('Clubs') to controller classes
 */
export const ApiClubsTag = () => applyDecorators(ApiTags('Clubs'));

/**
 * Documentation for the getClubs endpoint
 */
export const ApiGetClubsDoc = () => applyDecorators(
  ApiOperation({ summary: 'Get clubs by admin ID' }),
  ApiQuery({ name: 'adminId', description: 'Admin ID to filter clubs', type: String, required: true }),
  ApiResponse({ 
    status: 200, 
    description: 'List of clubs with their locations', 
    type: [clubData]
  }),
  ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Authentication required' 
  }),
  ApiResponse({ 
    status: 404, 
    description: 'No clubs found' 
  })
);
```

2. **Aplicar los decoradores en el controlador**:

```typescript
import { ApiClubsTag, ApiGetClubsDoc, ApiGetClubsByClubIdDoc, ApiGetClubDataDoc } from './clubs.swagger';
import { ApiSecurity } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiSecurity('JWT')
@ApiClubsTag()
@Controller('clubs')
export class ClubsController {

  @ApiGetClubsDoc()
  @Get()
  async getClubs(@Query('adminId') adminId: string) {
    // implementación
  }

  @ApiGetClubsByClubIdDoc()
  @Get('byClub/:clubId')
  async getClubsByClubId(@Param('clubId') clubId: string) {
    // implementación
  }
}
```

## Documentación de DTOs

Los DTOs (Data Transfer Objects) deben documentarse con decoradores para generar automáticamente la documentación de los esquemas:

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateQrDto {
  @ApiProperty({
    description: 'Email del usuario asociado al QR',
    example: 'usuario@ejemplo.com'
  })
  email: string;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez'
  })
  name: string;

  @ApiProperty({
    description: 'ID del club',
    example: '507f1f77bcf86cd799439011'
  })
  clubId: string;

  @ApiProperty({
    description: 'Estado del pago (true=pagado, false=no pagado)',
    example: true,
    default: false
  })
  paymentStatus: boolean;
}
```

## Documentando Respuestas

Para documentar respuestas estructuradas:

```typescript
@ApiResponse({
  status: 200,
  description: 'Lista de QRs paginada',
  schema: {
    properties: {
      data: {
        type: 'array',
        items: { $ref: getSchemaPath(Qr) }
      },
      total: {
        type: 'number',
        example: 42
      }
    }
  }
})
```

## Integración con Autenticación

Para endpoints que requieren autenticación, incluye los decoradores adecuados:

```typescript
// A nivel de controlador
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/v1/qr')
export class QrController {
  // ...
}

// O usando ApiSecurity para JWT
@ApiSecurity('JWT')
@UseGuards(AuthGuard)
@Controller('clubs')
export class ClubsController {
  // ...
}
```

## Guía para Implementar Swagger en Nuevos Endpoints

### Paso 1: Definir los DTOs

```typescript
// create-hanger.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateHangerDto {
  @ApiProperty({
    description: 'Nombre del colgador',
    example: 'Hanger-A123'
  })
  name: string;

  @ApiProperty({
    description: 'Estado del colgador',
    example: true,
    default: true
  })
  status: boolean;

  @ApiProperty({
    description: 'ID de la ubicación',
    example: '507f1f77bcf86cd799439011'
  })
  locationId: string;
}
```

### Paso 2: Crear el archivo Swagger dedicado

```typescript
// hangers.swagger.ts
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { CreateHangerDto } from './dto/create-hanger.dto';
import { Hanger } from 'src/core/entities/hanger';

export const ApiHangersTag = () => applyDecorators(ApiTags('Hangers'));

export const ApiCreateHangerDoc = () => applyDecorators(
  ApiOperation({ summary: 'Crear un nuevo colgador' }),
  ApiBody({ type: CreateHangerDto }),
  ApiResponse({ 
    status: 201, 
    description: 'Colgador creado exitosamente', 
    type: Hanger
  }),
  ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  }),
  ApiResponse({ 
    status: 401, 
    description: 'No autorizado' 
  })
);

// Añadir más decoradores para otros endpoints...
```

### Paso 3: Aplicar los decoradores en el controlador

```typescript
// hangers.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { HangersService } from './hangers.service';
import { CreateHangerDto } from './dto/create-hanger.dto';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { ApiSecurity } from '@nestjs/swagger';
import { ApiHangersTag, ApiCreateHangerDoc } from './hangers.swagger';

@UseGuards(AuthGuard)
@ApiSecurity('JWT')
@ApiHangersTag()
@Controller('hangers')
export class HangersController {
  constructor(private readonly hangersService: HangersService) {}

  @ApiCreateHangerDoc()
  @Post()
  async create(@Body() createHangerDto: CreateHangerDto) {
    return this.hangersService.create(createHangerDto);
  }

  // Implementar otros endpoints...
}
```

## Mejores Prácticas

1. **Mantén la documentación actualizada**: Actualiza la documentación de Swagger cada vez que modifiques un endpoint.

2. **Usa archivos separados** para la documentación de Swagger en módulos grandes para mantener el código limpio.

3. **Documenta todos los parámetros** de entrada y salida incluyendo ejemplos realistas.

4. **Incluye códigos de respuesta** para situaciones de éxito y error.

5. **Utiliza tipos y esquemas** para una documentación más completa de la estructura de datos.

6. **Añade descripciones claras** para que otros desarrolladores entiendan el propósito de cada endpoint.

## Recursos Adicionales

- [Documentación oficial de NestJS sobre Swagger](https://docs.nestjs.com/openapi/introduction)
- [Especificación OpenAPI 3.0](https://swagger.io/specification/)
- [NestJS Swagger decoradores avanzados](https://docs.nestjs.com/openapi/decorators) 