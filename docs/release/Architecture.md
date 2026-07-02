# Architecture

## Global Architecture

TradeAI is organized as a JavaScript monorepo using Yarn Workspaces. The repository separates user interfaces, API entry points, business/core logic, persistence, shared utilities, and prompt assets.

## Monorepo

```txt
apps/
  api/
  web/
packages/
  core/
  database/
  prompts/
  shared/
docs/
```

The root package coordinates workspace commands such as development, linting, formatting, and build validation.

## Frontend

`apps/web` contains the Next.js application. It provides the dashboard interface and uses React, Redux Toolkit, and React Redux. The frontend consumes public API configuration through `NEXT_PUBLIC_API_URL`.

## Backend

`apps/api` contains the Express API. It exposes technical and application routes through controllers, middlewares, and route modules. Runtime configuration is loaded from environment variables.

## Database

`packages/database` contains MongoDB Atlas integration through Mongoose. It groups schemas, models, repositories, and database connection code.

## Core

`packages/core` contains the application core: services, DTOs, contracts, trading orchestration, market data, technical analysis, AI analysis, recommendation, scheduler, notification, integration, and backtesting modules.

## Shared

`packages/shared` contains shared exports intended for reuse across workspaces.

## Prompts

`packages/prompts` contains prompt-related assets used by AI-oriented parts of the project.

## Application Flow

The typical flow is:

1. The frontend displays dashboard and application data.
2. The frontend calls the API.
3. API routes delegate to controllers.
4. Controllers use DTOs and core services.
5. Core services orchestrate domain modules and persistence repositories.
6. Database repositories read and write MongoDB documents.

## Separation Principles

- UI code stays in `apps/web`.
- HTTP routing and middleware stay in `apps/api`.
- Business orchestration stays in `packages/core`.
- Persistence details stay in `packages/database`.
- Shared primitives stay in `packages/shared`.
- Prompt assets stay in `packages/prompts`.
- Release documentation stays in `docs/release`.
