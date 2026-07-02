# Technical Analysis Engine

## Objective

The Technical Analysis Engine prepares future technical analysis for TradeAI.

It does not calculate real complex indicators yet.

## Architecture

```txt
Trading Core
|
v
Technical Analysis Engine
|
v
Market Data Engine
|
v
Business Services
|
v
Repositories
|
v
MongoDB
```

## Responsibilities

### TechnicalAnalysisEngine

Orchestrates technical analysis preparation from already available market data.

### TechnicalIndicatorProvider

Represents the abstraction for a future indicator calculation engine.

### TechnicalSnapshotMapper

Converts technical output into a stable format consumable by future engines.

## Principles

- no concrete dependency
- no network access
- no database access
- no real complex calculation
- stable structure for future sprints

## Adding A Future Indicator

A future indicator must be added only in a validated sprint.

The rule will be:

- add calculation in a dedicated provider
- keep a stable output format
- avoid unnecessary Trading Core changes
- validate impacts through an ADR if needed
