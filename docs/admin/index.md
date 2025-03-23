---
sidebar_position: 1
---

# Admin Panel

The Admin Panel is a web application designed for administrative users to manage the QRcoats system.

## Overview

The Admin panel provides functionality to manage:
- User accounts
- QR code generation
- Reports and analytics
- System settings

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

```bash
# Navigate to the Admin directory
cd Admin

# Install dependencies
npm install # or pnpm install

# Start development server
npm run dev
```

## Project Structure

```
Admin/
├── public/         # Static assets
├── src/            # Source code
│   ├── components/ # Reusable components
│   ├── pages/      # Page components
│   ├── services/   # API services
│   ├── hooks/      # Custom React hooks
│   ├── utils/      # Utility functions
│   ├── contexts/   # React contexts
│   ├── styles/     # CSS and styling
│   ├── App.tsx     # Main App component
│   └── main.tsx    # Entry point
├── package.json    # Dependencies and scripts
└── vite.config.ts  # Vite configuration
```

## Key Features

[Detailed explanation of key features]

## API Integration

The Admin panel integrates with the following APIs:
- api-auth for authentication
- api-employees for employee management
- qr-api for QR code generation

## Technical Details

[Additional technical details of the Admin panel] 