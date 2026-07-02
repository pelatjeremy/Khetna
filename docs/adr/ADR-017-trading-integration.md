# ADR-017 - Trading Engines Integration

## Status

Accepted

## Context

Les Engines principaux de TradeAI existent deja :

- TradingCore
- MarketDataEngine
- TechnicalAnalysisEngine
- AIAnalysisEngine
- RecommendationEngine

Le Sprint 12 doit uniquement les integrer dans un pipeline complet.

## Decision

Le pipeline final suit l'ordre suivant :

```txt
TradingCore
-> MarketDataEngine
-> TechnicalAnalysisEngine
-> AIAnalysisEngine
-> RecommendationEngine
-> RecommendationResult
```

Chaque Engine reste independant.

Aucun Engine ne doit connaitre l'implementation interne des autres Engines.

L'integration se fait via un contexte standardise.

## Consequences

Cette decision permet :

- de verifier le fonctionnement complet du pipeline
- de preserver le decouplage des Engines
- de preparer les futurs tests d'integration
- d'eviter toute logique metier supplementaire

## Out Of Scope

- nouveau moteur
- OpenAI reel
- HTTP
- API REST
- Express
- React
- Scheduler
- Notification
- Dashboard
- MongoDB direct
