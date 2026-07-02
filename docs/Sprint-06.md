# Sprint 06 - Trading Core & Pipeline

## Objective

Creer l'ossature complete du Trading Core et du pipeline d'execution.

## Context

Les couches Foundation, Domain Model, Persistence Layer, Repository Layer et Business Services sont validees.

Le Sprint 06 introduit le moteur central du projet.

## Scope

Creer uniquement :

```txt
packages/core/
└── src/
    └── engine/
        ├── TradingCore.js
        ├── TradingPipeline.js
        ├── PipelineContext.js
        ├── PipelineStep.js
        └── index.js
```

## Pipeline Steps

Le pipeline contient les etapes suivantes :

1. Load Asset
2. Load Trades
3. Build Portfolio
4. Load Market Snapshot
5. Build Analysis Context
6. Run AI Analysis
7. Persist Analysis
8. Evaluate Previous Analysis
9. Return Result

Les etapes contiennent uniquement des TODO documentes.

## Constraints

Le Trading Core ne doit jamais dependre directement de :

- MongoDB
- Mongoose
- Express
- React
- OpenAI
- API REST
- Scheduler

## Acceptance Criteria

Le sprint est accepte si :

- `packages/core/src/engine` existe ;
- les 5 fichiers attendus sont crees ;
- le pipeline contient les 9 etapes prevues ;
- aucun code IA reel n'est present ;
- aucun acces MongoDB direct n'est present ;
- aucun service non valide n'est cree ;
- aucun controller ou route n'est cree ;
- le code reste inferieur a environ 500 lignes ;
- ESLint passe ;
- Prettier passe.
