# Developer Guide

## Installation

Use Corepack and Yarn from the repository root:

```bash
corepack enable
corepack yarn install
```

## Structure

- `apps/web`: Next.js frontend
- `apps/api`: Express backend
- `packages/core`: core application logic
- `packages/database`: Mongoose persistence layer
- `packages/shared`: shared package exports
- `packages/prompts`: prompt package
- `docs`: ADRs, project notes, sprint documents, and release documentation

## Conventions

- Keep application behavior in its current ownership boundary.
- Keep HTTP behavior inside `apps/api`.
- Keep UI behavior inside `apps/web`.
- Keep persistence behavior inside `packages/database`.
- Keep core orchestration inside `packages/core`.
- Prefer small modules with explicit exports.

## Git Branches

Use short, scoped branch names:

```txt
feature/<scope>
fix/<scope>
chore/<scope>
docs/<scope>
```

For release quality work, prefer `docs/`, `chore/`, or `ci/` scopes.

## Lint

```bash
corepack yarn lint
```

## Format

```bash
corepack yarn format
```

## Build

```bash
corepack yarn build
```

The root build command validates the web application build, which is the available build target in V1.

## Tests

Sprint 19 prepares only the test folder structure:

```txt
tests/
  unit/
  integration/
```

Business tests are intentionally not added during the release freeze.

## Adding a Module

After V1, new modules should be introduced only with:

- clear ownership in the monorepo
- matching documentation update
- lint and build validation
- tests appropriate to the risk of the change
- ADR when the decision affects architecture

## Good Practices

- Do not bypass DTO or repository boundaries.
- Keep environment-specific values outside source code.
- Update documentation when behavior or setup changes.
- Keep release and sprint documents factual and dated by context.
