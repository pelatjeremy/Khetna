# ADR-024 - Release Quality Gate

## Status

Accepted

## Context

TradeAI reaches the V1 release freeze. The project needs a clear quality gate before publication so future contributors can install, inspect, validate, and maintain the codebase without relying on undocumented local knowledge.

The release must remain focused on quality. It must not introduce new product behavior, new engines, new routes, new services, new business objects, or architecture changes.

## Decision

Adopt a mandatory V1 release quality gate based on:

- complete project and release documentation
- reproducible dependency installation through Corepack and Yarn
- lint validation
- format validation during local release preparation
- build validation
- GitHub Actions CI with install, lint, and build jobs
- preserved monorepo architecture
- explicit exclusion of new functional scope during the release freeze

The root project exposes a `build` script so the release can be validated from the repository root.

## Consequences

The V1 release can be reviewed through a predictable checklist. Contributors have a documented path for installation, development, launch, contribution, and release verification.

The project remains functionally unchanged during Sprint 19. Any future feature work must happen after the V1 freeze and must be tracked separately from this quality gate.
