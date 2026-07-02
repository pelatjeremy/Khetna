# ADR-020 - Scheduler Engine

## Status

Accepted

## Context

TradeAI now has a Trading Core able to produce a `RecommendationResult`.

The project must introduce an internal planning module that can prepare future executions of the Trading Core.

The Scheduler must not contain business logic, depend on a real planning system, or know the technical details of future trigger implementations.

## Decision

Create a Scheduler module in:

```txt
packages/core/src/scheduler/
```

The Scheduler is composed of:

- `SchedulerEngine`
- `SchedulerJob`
- `SchedulerContext`
- `SchedulerTrigger`

The Scheduler is only responsible for orchestrating trigger requests toward the Trading Core.

It contains no business logic, no calculation, no real planning, no external dependency, no MongoDB access, no HTTP call, no OpenAI call, and no notification.

## Architecture

```txt
Scheduler
-> Trading Core
-> RecommendationResult
```

## Consequences

This decision prepares future triggers without implementing them, keeps the Scheduler independent, keeps business logic in the Trading Core, simplifies future tests, and avoids premature coupling with concrete trigger mechanisms.

## Out of Scope

- system planning
- webhook
- notification
- dashboard
- MongoDB
- OpenAI
- authentication
- HTTP API
