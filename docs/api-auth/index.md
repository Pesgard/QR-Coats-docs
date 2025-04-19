---
sidebar_position: 1
---

# API Auth Service

The API Auth Service is a NestJS-based authentication and authorization service for the QRcoats system.

## Overview

The API Auth Service provides:
- User authentication via JWT
- Role-based access control
- Account management (signup, login, password reset)
- Session management
- Integration with other QRcoats services

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- MongoDB (or relevant database)

### Installation

```bash
# Navigate to the api-auth directory
cd api-auth

# Install dependencies
npm install

# Start development server
npm run start:dev
```

## Project Structure

```
api-auth/
├── src/                # Source code
│   ├── auth/           # Auth module
│   ├── users/          # Users module
│   ├── roles/          # Roles module
│   ├── common/         # Shared utilities
│   ├── config/         # Configuration
│   ├── app.module.ts   # Main app module
│   └── main.ts         # Entry point
├── test/               # Tests
├── package.json        # Dependencies and scripts
└── nest-cli.json       # NestJS configuration
```

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh-token` - Refresh JWT token
- `POST /auth/logout` - User logout

### Users

- `GET /users/me` - Get current user
- `PATCH /users/me` - Update current user
- [Other user-related endpoints]

## JWT Authentication

[Details about the JWT authentication implementation]

## Security Considerations

[Security best practices implemented in the service]

## Technical Details

[Additional technical details of the API Auth Service] 