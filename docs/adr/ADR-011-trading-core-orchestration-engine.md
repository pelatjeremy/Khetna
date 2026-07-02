# ADR-011 - Trading Core as Orchestration Engine

## Status

Accepted

## Context

TradeAI dispose des couches suivantes :

- Foundation
- Domain Model
- Persistence Layer
- Repository Layer
- Business Services

Le projet introduit maintenant le coeur d'orchestration : le Trading Core.

## Decision

Le Trading Core est concu comme un moteur d'orchestration independant.

Il ne contient :

- aucune logique metier ;
- aucun calcul de portefeuille ;
- aucun calcul de score ;
- aucun appel IA reel ;
- aucun acces MongoDB direct ;
- aucun acces Mongoose ;
- aucun acces Express ;
- aucun acces React.

Il orchestre uniquement les Business Services existants via un pipeline d'execution.

## Architecture

```txt
TradingCore
TradingPipeline
PipelineContext
Business Services
Repositories
MongoDB
```

## Responsibilities

`TradingCore` est le point d'entree du moteur et demarre une execution.

`TradingPipeline` enchaine les etapes dans l'ordre prevu.

`PipelineContext` transporte les donnees entre les etapes.

`PipelineStep` definit le contrat technique minimal d'une etape.

## Consequences

Cette architecture permet :

- une forte modularite ;
- une meilleure testabilite ;
- une separation stricte des responsabilites ;
- une future integration IA sans couplage premature ;
- une future integration API ou scheduler sans modifier le coeur.

## Out of Scope

- IA reelle
- OpenAI
- Prompts
- API REST
- Scheduler
- Controllers
- Routes
- Notifications
- Dashboard
- Appels HTTP externes
