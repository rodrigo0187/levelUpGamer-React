# Technical Documentation: LevelUpGamer

## Overview
**LevelUpGamer** is a full-stack e-commerce application for gaming products. It allows users to browse products, register, manage their profile, and make purchases. Administrators can manage users and products.

The project is structured as a **monorepo** containing two distinct microservices:
1.  **Backend**: An Express.js REST API.
2.  **Frontend**: A React.js Single Page Application (SPA).

---

## Architecture

### 1. Directory Structure
```
root/
├── backend/            # Express.js API Service
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── scripts/    # Utility scripts (admin creation, schema checks)
│   │   └── server.ts   # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/           # React.js UI Service
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   ├── package.json
│   └── vite.config.ts
```

### 2. Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (via `mysql2`), SQLite/Sequelize (legacy/alternative) |
| **Authentication** | JWT (JSON Web Tokens), BCrypt |
| **Frontend** | React 19, Vite, TypeScript |
| **Styling** | Bootstrap 5, CSS Modules |
| **HTTP Client** | Axios |

---

## Backend Service (`/backend`)

The backend exposes a RESTful API running on port **3006** (default).

### API Routes

| Resource | Path | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | Login, Register, Password Reset |
| **Users** | `/api/users` | User management (Admin only) |
| **Profile** | `/api/perfil` | User profile management |
| **Products** | `/api/productos` | CRUD for products |
| **Orders** | `/api/compras` | Order creation and history |
| **Order Details** | `/api/compra-detalle` | Items within an order |
| **RSS** | `/api/rss` | RSS Feed management |

### Database Schema (Key Tables)

#### `usuarios` (Users)
- `id`: INT (PK, Auto-increment)
- `nombre`: VARCHAR(100)
- `email`: VARCHAR(150) (Unique)
- `password`: VARCHAR(255) (Hashed)
- `role`: ENUM('admin', 'user')
- `created_at`: TIMESTAMP

*(Note: Other tables include `productos`, `compras`, `detalle_compra` based on the routes identified).*

### Configuration
Environment variables used in `.env`:
- `PORT`: Server port
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: Secret key for token generation

---

## Frontend Service (`/frontend`)

The frontend is a Vite-based React application running on port **5173** (default).

### Key Features
- **Public**: Home, Product Catalog, Login, Register.
- **Private (User)**: Profile, My Orders.
- **Private (Admin)**: Dashboard, User Manager, Product Manager.

### Architecture Highlights
- **Hooks**: Custom hooks (e.g., `useProductos`, `useLoginUsuario`) manage business logic and API calls.
- **Context**: Used for global state (if applicable, see `src/context`).
- **Services**: API interaction layer using Axios.

---

## Setup & Deployment

### Prequisites
- Node.js (v18+)
- MySQL Server

### Initialization
1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```
2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Admin Creation
To create a default administrator account:
```bash
cd backend
npm run create:admin
```
Use credentials: `admin@admin.com` / `admin123`.

---
*Generated: December 15, 2025*
