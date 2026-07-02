# Sprint 19 - Quality and Release V1

## Objective

Freeze the TradeAI V1 release and prepare the project for a first professional publication.

## Context

Previous sprints established the monorepo, backend API, frontend dashboard skeleton, persistence layer, core engines, DTO contracts, prompts, and project documentation. Sprint 19 does not extend those capabilities. It consolidates the repository so the V1 state is readable, reproducible, documented, and maintainable.

## Scope

- Final README for the V1 release
- Release documentation under `docs/release`
- Sprint 19 acceptance documents under `docs/sprint-19`
- Release quality ADR
- GitHub Actions CI workflow
- Standard license file
- Empty test structure for future test implementation
- Root build command for release validation

## Out of Scope

- New product features
- New API routes
- New backend services
- New business classes
- New AI, scheduler, notification, dashboard, or trading behavior
- Business refactoring
- Architecture changes
- V2 backlog, planning, estimates, or implementation

## Documentation

The release documentation must explain the architecture, installation, launch commands, contributor workflow, changelog, roadmap directions, and release checklist. It must be usable by a developer discovering the project for the first time.

## Quality

The release quality gate is based on reproducible dependency installation, linting, formatting, and build execution:

```bash
corepack yarn install
corepack yarn lint
corepack yarn format
corepack yarn build
```

## CI

GitHub Actions must run the mandatory release checks:

- install dependencies
- lint the repository
- build the project

No deployment step is part of Sprint 19.

## Release V1

Release V1 is a quality and publication baseline. It freezes the current architecture and behavior and documents the system as it exists at the end of Sprint 19.

## Acceptance Criteria

- README is final for V1
- Release documentation is complete
- CI workflow exists and runs install, lint, and build
- Root build command exists
- Test folders are prepared without business tests
- No functional behavior is added
- No architecture modification is introduced
- The project is ready for V1 publication
