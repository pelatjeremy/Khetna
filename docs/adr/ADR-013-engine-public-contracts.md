# ADR-013 - Engine Public Contracts

## Status

Accepted

## Context

TradeAI dispose deja de plusieurs moteurs techniques, notamment :

- Trading Core
- Market Data Engine

D'autres moteurs seront introduits plus tard :

- Technical Analysis Engine
- AI Analysis Engine
- Decision Engine
- Scheduler
- Notification Engine

Pour eviter les dependances directes entre implementations, les moteurs doivent communiquer via des contrats publics stables.

## Decision

Creer une couche de contrats dans :

```txt
packages/core/src/contracts/
```

Cette couche definit uniquement les interfaces publiques attendues pour chaque moteur.

Les contrats ne contiennent aucune implementation metier.

## Scope

Creer les contrats suivants :

- EngineContract
- MarketDataContract
- TechnicalAnalysisContract
- AIAnalysisContract
- DecisionContract
- NotificationContract
- SchedulerContract

## Rules

Chaque contrat doit :

- exposer uniquement des signatures de methodes publiques ;
- rester independant des implementations ;
- ne pas acceder a MongoDB ;
- ne pas dependre d'Express ;
- ne pas dependre de React ;
- ne pas appeler OpenAI ;
- ne pas effectuer de calcul ;
- ne pas effectuer de recuperation HTTP.

## Consequences

Les moteurs futurs pourront etre developpes avec une API homogene.

Les dependances seront plus faciles a controler.

Les tests et les remplacements d'implementations seront facilites.

## Out of Scope

- Implementation des moteurs
- Appels API externes
- IA
- Scheduler reel
- Notifications reelles
- Analyse technique reelle
- Decision de trading reelle
