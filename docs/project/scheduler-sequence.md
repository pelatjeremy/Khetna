# Sequence Diagram - Scheduler Engine

```txt
External Trigger
      |
      v
SchedulerTrigger
      |
      v
SchedulerEngine
      |
      v
SchedulerJob
      |
      v
SchedulerContext
      |
      v
Trading Core
      |
      v
RecommendationResult
```

## Description

A future external mechanism is represented by `SchedulerTrigger`.

`SchedulerEngine` orchestrates the trigger request.

`SchedulerJob` describes the job to execute.

`SchedulerContext` transports the required information.

The Trading Core produces a `RecommendationResult`.

## Sprint 15 Limit

Sprint 15 does not implement the real external trigger, automatic planning, notification, persistence, or HTTP calls.
