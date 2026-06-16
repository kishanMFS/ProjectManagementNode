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

- Node.js v25.8.1
- npm
- Database Server

## Installation

Clone the repository:

```bash
git clone https://github.com/kishanMFS/ProjectManagementNode.git
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

| Method | Endpoint                                  | Description       |
|--------|-------------------------------------------|-------------------|
| GET    | /api/projects                             | Get all projects  |
| POST   | /:project_id/files                        | Upload files      |
| POST   | /api/projects                             | Create project    |
| POST   | /:project_id/jobs/zip                     | Create Zip        |
| DELETE | /api/projects/:id                         | Delete project    |
| GET    | /:project_id/jobs                         | Get Job Status    |
| GET    | /:project_id/files/:fileName/download     | Download zip      |

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

