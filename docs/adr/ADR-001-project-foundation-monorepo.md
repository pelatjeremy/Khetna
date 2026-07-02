# ADR-001 - Project Foundation Monorepo

## Status

Accepted

## Context

TradeAI is an AI-assisted trading platform built as a professional portfolio project.

The approved architecture uses a Yarn monorepo with:

- `apps/web`: Next.js, React, Redux Toolkit
- `apps/api`: Node.js, Express
- `packages/database`: MongoDB and Mongoose
- `packages/shared`
- `packages/prompts`

Sprint 01 creates only the technical foundation of the project.

## Decision

The project uses:

- Yarn Workspaces
- a clear monorepo structure
- Next.js for the frontend
- Express for the API
- MongoDB Atlas through Mongoose
- ESLint
- Prettier
- Husky
- lint-staged
- versioned documentation
- an ADR directory
- a professional project structure

## Consequences

This sprint creates the technical base without business logic.

Future sprints can rely on a stable, readable, and maintainable structure.

## Out of Scope

The following items are explicitly excluded:

- authentication
- trading engine
- AI engine
- market data retrieval
- scoring
- portfolio logic
- business React components
- business API routes
