# User Guide

## Presentation

TradeAI is a trading assistance platform organized around a web dashboard, an API, a core application layer, and MongoDB persistence.

The V1 release is a professional baseline. It documents the current system and makes it installable, runnable, and maintainable.

## Installation

Install dependencies from the repository root:

```bash
corepack enable
corepack yarn install
```

## Configuration

Copy environment examples before launching local services:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

On Windows PowerShell, copy the files manually or use:

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
```

Main variables:

```env
MONGODB_URI=
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Launch

Start both applications:

```bash
corepack yarn dev
```

Or start each application separately:

```bash
corepack yarn dev:api
corepack yarn dev:web
```

## General Structure

- Web application: `apps/web`
- API application: `apps/api`
- Core logic: `packages/core`
- Database layer: `packages/database`
- Documentation: `docs`

## V1 Limitations

- V1 is a release freeze, not a new feature release.
- The dashboard remains limited to the behavior implemented before Sprint 19.
- No deployment automation is included in Sprint 19.
- Test structure is prepared, but no business tests are added during the freeze.
