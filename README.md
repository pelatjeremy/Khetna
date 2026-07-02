# TradeAI

TradeAI is a trading assistance platform built as a JavaScript monorepo. Release V1 freezes the current product and architecture state and focuses on publication readiness: documentation, reproducible installation, linting, formatting, build validation, and CI.

## Objectives

- Provide a maintainable V1 baseline
- Keep frontend, backend, core, database, shared, and prompt concerns separated
- Make local setup and release validation reproducible
- Preserve the existing architecture without adding new functional scope during the V1 freeze

## Architecture

TradeAI is organized around:

- `apps/web`: Next.js frontend dashboard
- `apps/api`: Express API
- `packages/core`: application core, DTOs, contracts, engines, and services
- `packages/database`: MongoDB Atlas persistence through Mongoose
- `packages/shared`: shared exports
- `packages/prompts`: prompt package
- `docs`: ADRs, project documentation, sprint records, and release documentation

## Stack

- Yarn Workspaces with Yarn 4.9.2
- Next.js, React, Redux Toolkit, and React Redux
- Node.js and Express
- MongoDB Atlas and Mongoose
- ESLint, Prettier, Husky, and lint-staged
- GitHub Actions for CI

## Installation

```bash
corepack enable
corepack yarn install
```

## Environment Variables

Copy example files before running local services:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Main variables:

```env
MONGODB_URI=
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Launch

Run both applications:

```bash
corepack yarn dev
```

Run workspaces separately:

```bash
corepack yarn dev:api
corepack yarn dev:web
```

## Project Structure

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
  adr/
  project/
  release/
tests/
  integration/
  unit/
```

## Yarn Commands

```bash
corepack yarn dev
corepack yarn dev:api
corepack yarn dev:web
corepack yarn lint
corepack yarn format
corepack yarn build
```

## Git Conventions

Use scoped branches:

```txt
feature/<scope>
fix/<scope>
docs/<scope>
chore/<scope>
ci/<scope>
```

Keep commits focused and run validation before opening a pull request.

## Documentation

- Release documentation: `docs/release`
- ADRs: `docs/adr`
- Project documentation: `docs/project`
- Sprint records: `docs/sprint-*`

## License

TradeAI is distributed under the MIT License. See `LICENSE`.

## Contribution

See `docs/release/CONTRIBUTING.md`.

## Release V1

Release V1 is accepted when installation, lint, format, build, documentation, CI, and release checklist validation are complete. Sprint 19 does not add new features or change the architecture.
