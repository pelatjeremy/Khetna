# Sprint 09 - Technical Analysis Engine

## Objective

Create the skeleton of the TradeAI technical analysis engine.

## Context

Sprint 08 introduced the public engine contracts.

Sprint 09 creates a technical module depending on these contracts, without implementing complex calculations.

## Scope

Create only:

```txt
packages/core/src/technical/
|-- TechnicalAnalysisEngine.js
|-- TechnicalIndicatorProvider.js
|-- TechnicalSnapshotMapper.js
`-- index.js
```

Update if needed:

```txt
packages/core/src/index.js
```

## Responsibilities

### TechnicalAnalysisEngine

- orchestrate technical analysis preparation
- receive already available market data
- return a normalized structure

### TechnicalIndicatorProvider

- represent the future indicator calculator abstraction
- return only a normalized placeholder structure
- avoid real complex indicators

### TechnicalSnapshotMapper

- map technical data into a format future engines can consume

## Constraints

Forbidden:

- network calls
- fetch
- axios
- OpenAI
- scheduler
- route
- controller
- dashboard
- direct MongoDB access
- mongoose
- real RSI
- real MACD
- real EMA
- complex calculation

## Acceptance Criteria

- technical module created
- working exports
- dependency on Sprint 08 contracts only
- no forbidden imports
- no complex calculations
- lint OK
- format OK
- code below about 500 lines
