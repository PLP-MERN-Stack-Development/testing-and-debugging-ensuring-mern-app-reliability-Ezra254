# Testing Strategy Documentation

## Overview
This document outlines the comprehensive testing strategy implemented for the MERN stack reliability toolkit, spanning unit, integration, end-to-end testing, and debugging techniques.

## Testing Framework Setup

### Task 1: Testing Environment ✅

#### Jest Configuration
- **Root Configuration**: `jest.config.js` orchestrates client and server projects
- **Client Configuration**: `jsdom` environment with Babel transforms for JSX/ESNext
- **Server Configuration**: Node environment, MongoMemoryServer for isolation
- **Coverage Thresholds**: `collectCoverage` enabled globally with 70%+ minimums

#### Testing Utilities
- **React Testing Library**: Component/hook assertions with `@testing-library/jest-dom`
- **Supertest**: HTTP assertions for Express APIs
- **MongoDB Memory Server**: Ephemeral Mongo instances (no external DB required)
- **Cypress 13**: Cross-browser E2E automation (Electron headless by default)

#### Test Scripts (root `package.json`)
- `npm test` – Run entire Jest suite with coverage
- `npm run test:unit` – Unit suites only (coverage enforced)
- `npm run test:integration` – API & integration suites (`--coverage=false`)
- `npm run test:e2e` – Headless Cypress (requires dev servers)
- `npm run test:e2e:open` – Cypress UI
- `npm run test:coverage` – Generate coverage reports

Captured CLI output for each suite is stored in `artifacts/` for submission evidence.

## Unit Testing

### Task 2: Unit Tests ✅

#### Client-Side Unit Tests (`client/src/tests/unit/`)
- **Utilities**: `formatDate.test.js`, `validate.test.js`
- **Hooks**: `useLocalStorage.test.js`, `useApi.test.js`
- **Components**: `Button.test.jsx`, `LoginForm.test.jsx`, `PostForm.test.jsx`, `ErrorBoundary.test.jsx`
- **State**: `authReducer.test.js`, `authActions.test.js`

#### Server-Side Unit Tests (`server/tests/unit/`)
- **Utilities**: `auth.test.js`, `validators.test.js`
- **Middleware**: `middleware.auth.test.js` (authenticate/authorize)

#### Coverage
- `npm run test:unit` produces combined coverage; HTML output lives under `coverage/client` and `coverage/server`
- Current run exceeds 90% statements/lines (see README for summary)

## Integration Testing

### Task 3: Integration Tests ✅

#### API Endpoint Tests (`server/tests/integration/`)
- **auth.test.js** – Register/login/me flows with validation and token checks
- **posts.test.js** – CRUD operations, authz, filtering, pagination, validation errors

#### React Integration Tests (`client/src/tests/integration/`)
- **LoginFlow.test.jsx** – Login happy-path + error handling using axios mocks

#### Database Strategy
- Each test spins up an isolated MongoMemoryServer instance
- Collections are cleaned between tests to maintain independence

## End-to-End Testing

### Task 4: End-to-End Tests ✅

#### Cypress Configuration
- Located in `client/cypress.config.js`; base URL defaults to `http://localhost:3000`
- Custom commands in `client/cypress/support/`
- Execute via `npm run dev` (separate shell) + `npm run test:e2e`

#### Test Suites (`client/cypress/e2e/`)
- **login.cy.js** – Form rendering, validation, happy/error API flows
- **navigation.cy.js** – Primary navigation, login/register routing, 404 recovery
- **posts-crud.cy.js** – Authenticated create/read/update/delete + form validation (API calls intercepted)

Cypress generates screenshots/videos on failure (stored under `client/cypress/screenshots`/`videos`).

## Debugging Techniques

### Task 5: Debugging Tools ✅

#### Server-Side
- Structured logging (`server/src/utils/logger.js`) with rotating file outputs
- Global error handler distinguishes validation/JWT/misc errors
- Performance monitor middleware logs slow requests (>1s)

#### Client-Side
- React error boundary with reset affordance (`client/src/components/ErrorBoundary.jsx`)
- Custom performance helper for measuring expensive operations (`client/src/utils/performanceMonitor.js`)
- `useApi` hook centralises error handling/loading state logging

## Test Execution Summary

```bash
# Dependencies
npm run install-all

# Development servers
npm run dev

# Jest suites
npm run test:unit
npm run test:integration
npm run test:coverage

# Cypress (requires running dev servers)
npm run test:e2e            # headless
npm run test:e2e:open       # interactive GUI
```

## Best Practices Implemented

1. **Isolation** – MongoMemoryServer + per-test cleanup ensures deterministic runs
2. **Mocking** – Axios/Express responses mocked where appropriate for speed
3. **Coverage** – 70%+ requirement baked into Jest config
4. **Artifacts** – Test logs archived in `artifacts/` for grading/reference
5. **Fail Fast** – Scripts exit non-zero on test failure (except integration coverage)
6. **Developer Experience** – Scripts documented in README; proxy avoids CORS hassle

## Coverage Targets

- Unit (client/server): ≥ 70% statements/lines (current run ~91%)
- Integration: All endpoints and auth flows covered
- End-to-End: Login, navigation, and posts CRUD happy/error paths

## Notes

- `npm run test:e2e` must run alongside `npm run dev`
- MongoDB connection string is configurable via `server/.env`
- Artifacts folder contains the most recent CLI output for unit, integration, and e2e runs
- Week 6 assignment requirements map directly to sections above; see `Week6-Assignment.md`






