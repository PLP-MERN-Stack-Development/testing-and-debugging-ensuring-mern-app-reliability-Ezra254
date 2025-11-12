# MERN Testing & Reliability Toolkit

This project is a fully connected MERN (MongoDB, Express, React, Node) application that demonstrates end-to-end reliability practices: authentication, protected content management, comprehensive testing (unit, integration, e2e), and debugging instrumentation.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based login/registration with persisted sessions
  - Auth context with protected routes and auto-refresh
- **Posts Knowledge Base**
  - Browse published posts (public)
  - Authenticated authors can create, edit, and delete posts
  - Server-side validation and slug generation
- **Testing Suite**
  - Jest + React Testing Library unit tests for utilities, hooks, and components
  - Supertest + MongoMemoryServer integration coverage for all API endpoints
  - Cypress end-to-end coverage for login, navigation, and posts CRUD flows
- **Debugging & Monitoring**
  - Structured request logging and performance metrics (Express middleware)
  - React error boundary with recovery UI
  - Custom utility for measuring client-side performance

## 🛠️ Prerequisites

- Node.js v18+
- npm 9+
- MongoDB (local instance or Atlas connection string)

## 📂 Project Structure

```
mern-testing/
├── client/                   # React application
│   ├── src/
│   │   ├── components/       # Shared UI components
│   │   ├── context/          # Auth provider
│   │   ├── pages/            # Routed pages
│   │   ├── services/         # Axios API wrappers
│   │   ├── tests/            # Unit & integration tests
│   │   └── utils/            # Helpers & hooks
│   └── cypress/              # End-to-end test suites
├── server/                   # Express API
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # Auth, validation, perf logging
│   │   ├── models/           # Mongoose schemas
│   │   └── routes/           # API routes
│   └── tests/                # Jest unit & integration tests
├── artifacts/                # Captured test run logs (unit/integration/e2e)
├── jest.config.js            # Monorepo Jest configuration
└── Week6-Assignment.md       # Assignment brief
```

## ⚙️ Setup

```bash
# 1. Install dependencies (root + client + server)
npm run install-all

# 2. Create environment configuration (server/.env)
cp server/.env.example server/.env
# update MONGODB_URI and JWT_SECRET as needed
```

## ▶️ Running the App Locally

The development environment runs both the Express API (port 5000) and the React client (port 3000) via a single command. The client proxies API calls to the server.

```bash
npm run dev
```

Key routes:
- Client: `http://localhost:3000`
- API health check: `http://localhost:5000/health`
- API root overview: `http://localhost:5000/`

## 🧪 Testing Commands

| Scope            | Command                               | Notes |
| ---------------- | -------------------------------------- | ----- |
| All Jest tests   | `npm test`                             | Runs unit + integration with coverage thresholds |
| Unit tests only  | `npm run test:unit`                    | Coverage enforced (70% global) |
| Integration only | `npm run test:integration`             | Runs API/UI integration suites without coverage gating |
| Coverage report  | `npm run test:coverage`                | Outputs HTML reports to `coverage/` |
| E2E (headless)   | `npm run test:e2e`                     | Requires `npm run dev` running in another shell |
| E2E (interactive)| `npm run test:e2e:open`                | Opens Cypress runner |

Captured terminal output for each suite is stored in the `artifacts/` directory.

## 🌐 API Snapshot

```
GET  /api/posts            # Public posts feed
POST /api/posts            # Authenticated create
GET  /api/posts/:id        # Post details
PUT  /api/posts/:id        # Authenticated author update
DELETE /api/posts/:id      # Authenticated author delete
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login and receive JWT
GET  /api/auth/me          # Get current user profile
```

All endpoints enforce validation and return structured error payloads.

## 🧭 Frontend Routes

- `/` – Home dashboard with feature overview
- `/login` – Sign-in page using shared `LoginForm`
- `/register` – Account creation with validation
- `/posts` – Posts listing with delete (for authors)
- `/posts/new` – Protected create form
- `/posts/:id` – Read individual post
- `/posts/:id/edit` – Protected edit form
- `*` – 404 fallback

## 🧰 Debugging Tooling

- **Logging**: Console + file logging via Winston/Morgan wrappers (`server/src/utils/logger.js`)
- **Performance**: Request timing middleware flags slow endpoints (`performanceMonitor.js`)
- **Error Handling**: Centralized Express error handler and React error boundary
- **Developer UX**: Helpful proxy configuration, `setAuthToken` helper, and custom hooks (`useApi`, `useLocalStorage`)

## 📸 Deliverables

- Up-to-date test run logs in `artifacts/`
- Coverage reports in `coverage/client` and `coverage/server`
- Cypress screenshots/videos automatically stored under `client/cypress/screenshots` on failure
- Documentation of testing strategy (`TESTING_STRATEGY.md`)

## ✅ Assignment Checklist

- [x] Client/server connected with functional auth + posts flows
- [x] Unit tests ≥ 90% coverage (see `npm run test:unit`)
- [x] Integration and e2e suites exercising critical paths
- [x] Debugging and monitoring utilities implemented
- [x] Documentation and artifacts prepared for submission

For additional details about the weekly assignment requirements, refer to [`Week6-Assignment.md`](Week6-Assignment.md). 