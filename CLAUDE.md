# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-tenant e-commerce backend API built with Node.js, Express, and MongoDB. The application serves different store types (clothing, restaurants, pizzeria, tech, beverages, hats, produce) through a single API using tenant-based routing.

## Development Commands

**Start development server with auto-reload:**
```bash
npm run dev
```

**Start production server:**
```bash
npm start
```

**Environment:**
- Development uses `dev.env` file for configuration
- The application automatically loads environment variables from `dev.env` in the root directory

## Architecture

### Multi-Tenant System

The core architecture is built around tenant identification through HTTP headers:
- `x-tenant`: Identifies which store to serve (e.g., 'ropa', 'pizza', 'tech')
- `x-api-key`: API key validated against `API_KEY_TENANT` environment variable

**Authentication Flow:**
1. All `/api/tenants/*` routes pass through `getTenatApiKeys` middleware ([src/middlewares/tenats.middlewares.js](src/middlewares/tenats.middlewares.js))
2. Middleware validates both tenant and API key headers
3. Valid tenant is attached to `req.tenant` for downstream use

### Data Architecture

**Mock Data System:**
The application currently uses JSON mock files ([src/data/](src/data/)) instead of querying MongoDB for product data:
- Each tenant has a corresponding JSON file (e.g., `mock-tiendaropa2.json`, `mock-pizzeria2.json`)
- `DataService` ([src/services/DataService.js](src/services/DataService.js)) loads all mock files at startup
- `getData(tenantId)` function maps tenant IDs to their respective data

**MongoDB Connection:**
- MongoDB client is initialized in [src/database/mongodb.js](src/database/mongodb.js)
- Currently connects to `commerce24` database
- Connection is established at application startup in [index.js](index.js)
- Note: Current implementation tests DB connection by querying products collection, but API endpoints serve mock data

### Request Flow

1. Request hits Express server with tenant headers
2. `getTenatApiKeys` middleware validates authentication
3. Request routed to appropriate controller in [src/controllers/tenant.controllers.js](src/controllers/tenant.controllers.js)
4. Controller calls `DataService` with tenant parameter
5. `DataService` returns data from corresponding mock JSON file
6. Response sent to client

### Module System

This project uses ES Modules (`"type": "module"` in package.json):
- Use `import/export` syntax
- File extensions (`.js`) are required in import statements
- Use `fileURLToPath` and `dirname` to get `__dirname` equivalent

## API Endpoints

All endpoints require `x-tenant` and `x-api-key` headers:

- `GET /api/tenants/products` - Get products and categories for tenant
- `GET /api/tenants/branches` - Get all branches for tenant
- `GET /api/tenants/branches/:id` - Get specific branch by ID
- `GET /api/tenants/storeconfig` - Get complete store configuration

## Available Tenants

- `ropa` - Clothing store
- `hotdog` - Hot dog restaurant
- `pizza` - Pizzeria
- `tech` - Technology store
- `bebidas` - Beverage store
- `hats` - Hat store
- `verduras` - Produce store

Default tenant is `ropa` if not specified.

## Key Dependencies

- **express**: Web framework
- **mongodb**: Database driver (connected but not actively used for products)
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication (imported but not currently implemented)
- **cors**: Cross-origin resource sharing
- **cookie-parser**: Cookie parsing middleware
- **morgan**: HTTP request logger
- **dotenv**: Environment variable management

## Development Notes

**CORS Configuration:**
Currently hardcoded to allow `http://localhost:8081/` origin ([src/server.js:18](src/server.js#L18)). Update this when deploying or adding new frontend origins.

**Port Configuration:**
Server runs on port 8080 by default in development, or uses `process.env.PORT` in production.

**Controllers Pattern:**
Controllers are implemented as static class methods. Import pattern:
```javascript
import { TenantControllers } from '../controllers/index.js';
```

**Error Handling:**
All controllers follow try-catch pattern returning 500 status with error message on failure.

## Common Tasks

**Adding a new tenant:**
1. Create new mock data file in [src/data/](src/data/) (e.g., `mock-newstore.json`)
2. Import and load it in [src/services/DataService.js](src/services/DataService.js)
3. Add mapping in `getData()` function

**Adding a new endpoint:**
1. Add route in [src/routes/tenant.routes.js](src/routes/tenant.routes.js)
2. Add static method in [src/controllers/tenant.controllers.js](src/controllers/tenant.controllers.js)
3. Add service method in [src/services/DataService.js](src/services/DataService.js) if needed

**Migrating from mock data to MongoDB:**
Currently mock JSON files are used for product data. To use MongoDB:
1. Ensure data structure in MongoDB matches mock JSON format
2. Replace `getData()` logic in DataService with MongoDB queries
3. Collection names should match tenant structure