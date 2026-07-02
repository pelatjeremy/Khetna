# Sprint 15 - Scheduler Engine

## Objective

Create the internal architecture of the TradeAI Scheduler Engine.

The Scheduler only prepares orchestration of Trading Core triggers.

## Context

Sprint 14 validated the Application DTO contracts.

The project can now introduce an internal Scheduler that stays independent from future concrete planning mechanisms.

## Scope

Create only:

```txt
packages/core/src/scheduler/
|-- SchedulerEngine.js
|-- SchedulerJob.js
|-- SchedulerContext.js
|-- SchedulerTrigger.js
`-- index.js
```

Update the central export in `packages/core/src/index.js`.

## Responsibilities

`SchedulerEngine` orchestrates trigger requests without real planning.

`SchedulerJob` represents a planned job with structural data only.

`SchedulerContext` transports execution information.

`SchedulerTrigger` represents abstract trigger rules.

## Constraints

This sprint remains an architectural skeleton.

Methods contain only documented TODOs, neutral returns, or minimal structural behavior.

Forbidden:

- external dependency
- system scheduler
- HTTP
- OpenAI
- dashboard
- notification
- MongoDB
- authentication
- business calculation
- trading logic
- recommendation logic

## Acceptance Criteria

- scheduler module exists
- expected classes exist
- exports are clean
- no real planning is present
- no external dependency is added
- no MongoDB access is present
- no HTTP call is present
- no OpenAI call is present
- no business logic is present
- lint OK
- format OK
- code volume remains below 500 lines
