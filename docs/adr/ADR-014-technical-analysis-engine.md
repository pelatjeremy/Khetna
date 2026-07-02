# ADR-014 - Technical Analysis Engine Skeleton

## Status

Accepted

## Context

TradeAI must prepare a technical analysis engine able, in a later sprint, to expose indicators such as RSI, MACD, EMA, ATR, VWAP, supports, and resistances.

Sprint 09 does not implement these calculations.

The engine follows Dependency Inversion and depends on the public contracts introduced in Sprint 08.

## Decision

Create a dedicated skeleton in:

```txt
packages/core/src/technical/
```

With:

- `TechnicalAnalysisEngine`
- `TechnicalIndicatorProvider`
- `TechnicalSnapshotMapper`

The engine receives already available market data and returns a normalized technical analysis structure.

## Rules

The engine must not contain:

- network calls
- MongoDB access
- Mongoose imports
- OpenAI calls
- scheduler logic
- real complex indicator calculations
- dependencies on concrete implementations

## Consequences

This separation prepares the future technical analysis engine without coupling the Trading Core to a library, API, or specific implementation.

## Out Of Scope

- real RSI
- real MACD
- real EMA
- real ATR
- real VWAP
- real supports or resistances
- REST API
- persistence
- dashboard
