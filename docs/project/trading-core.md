# Trading Core

## Objectif

Le Trading Core est le coeur d'orchestration de TradeAI.

Il ne contient pas la logique metier. Il coordonne uniquement les etapes necessaires a une execution d'analyse.

## Architecture

```txt
TradingCore
TradingPipeline
PipelineContext
Business Services
Repositories
MongoDB
```

## Composants

### TradingCore

Point d'entree du moteur.

Il prepare le contexte d'execution et declenche le pipeline.

### TradingPipeline

Responsable de l'enchainement sequentiel des etapes.

### PipelineContext

Objet de transport des donnees pendant une execution.

Il permet aux etapes de partager des informations sans couplage direct.

### PipelineStep

Contrat technique minimal pour representer une etape.

## Principe fondamental

Le Trading Core ne doit jamais connaitre les details techniques des couches inferieures.

Il ne connait pas :

- MongoDB
- Mongoose
- Express
- React
- OpenAI
- Scheduler

## Ajouter une future etape

1. Creer ou declarer l'etape.
2. Lui donner un nom explicite.
3. L'ajouter dans l'ordre du pipeline.
4. Utiliser uniquement les dependances injectees.
5. Ne jamais introduire de logique metier dans le pipeline.
