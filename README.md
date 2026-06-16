# Project Management System API

A RESTful backend API for managing projects, tasks, users, and authentication. Built with Node.js, TypeScript, and modern development practices.

## Features

- User Authentication & Authorization
- Project Management
- Task Management
- RESTful API Architecture
- TypeScript Support
- Environment-based Configuration
- Modular Route Structure
- Error Handling Middleware

## Tech Stack

- Node.js
- TypeScript
- Express.js
- JWT Authentication
- PostgreSQL

## Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
│   ├── authRoutes.ts
│   └── projectRoutes.ts
├── services/
├── utils/
│   └── db.ts
├── types/
└── server.ts
```

## Prerequisites

- Node.js 18+
- npm
- Database Server

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd ProjectManagementNode
```

Install dependencies:

```bash
npm install
```

## Running the Application

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Path Aliases

The project uses TypeScript path aliases.

Example:

```ts
import db from '@/utils/db';
import authRoutes from '@/routes/authRoutes';
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/auth/login  | Login user |
| POST | /api/auth/verify | Verify user |
### Projects

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | /api/projects     | Get all projects  |
| GET    | /api/projects/:id | Get project by ID |
| POST   | /api/projects     | Create project    |
| PUT    | /api/projects/:id | Update project    |
| DELETE | /api/projects/:id | Delete project    |

## Error Handling

The API includes centralized error handling for:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Database Errors
- Internal Server Errors

## Development Notes

### TypeScript Compilation

```bash
npx tsc
```

### Run Directly with TSX

```bash
npx tsx src/server.ts
```

