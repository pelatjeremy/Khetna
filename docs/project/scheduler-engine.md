# Scheduler Engine

## Objective

The Scheduler Engine prepares internal orchestration of TradeAI triggers.

It performs no real planning in this sprint.

Its role is only to structure the objects needed by future Trading Core trigger flows.

## Architecture

```txt
Scheduler
-> Trading Core
-> RecommendationResult
```

## Location

```txt
packages/core/src/scheduler/
```

## Components

### SchedulerEngine

Responsible for trigger orchestration.

It does not know concrete trigger details such as webhooks, dashboards, or external events.

### SchedulerJob

Represents a planned job.

It only contains structural information required to describe a job.

### SchedulerContext

Transports execution information.

It does not mutate data and does not persist anything.

### SchedulerTrigger

Represents an abstract trigger rule.

It does not parse expressions and does not automatically trigger execution.

## Principles

The Scheduler remains independent, passive, free from business logic, free from external dependencies, and free from MongoDB, HTTP, and OpenAI calls.

## Future Triggers

A future trigger mechanism must be added in a separately validated sprint.

Possible future mechanisms include manual triggers, webhooks, events, and API triggers.

None of these mechanisms is implemented in Sprint 15.

## Important Rule

The Scheduler never decides what to analyze.

It only prepares an execution using a provided context.

Trading logic remains in the Trading Core.
