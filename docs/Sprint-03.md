# Sprint 03 - MongoDB Persistence Layer

## Objectif

Construire la couche de persistance MongoDB en creant les modeles Mongoose du projet.

## Contexte

Le Domain Model est desormais valide.

Ce sprint traduit uniquement ce modele en structures de persistance.

## Perimetre

Creation de :

- `packages/database/src/connection`
- `packages/database/src/models`
- `packages/database/src/schemas`
- `packages/database/src/plugins`
- `packages/database/src/index.js`

Creation des modeles :

- User
- Asset
- Trade
- PortfolioSnapshot
- MarketSnapshot
- Analysis
- Evaluation
- Setting

## Contraintes

Interdictions :

- logique metier
- services
- repositories
- routes Express
- controllers
- IA
- React
- helpers
- methodes metier

## Architecture Concernee

`packages/database` uniquement.

## Criteres d'Acceptation

- Tous les modeles compilent.
- Les exports fonctionnent.
- Les validations Mongoose sont definies.
- Les timestamps sont actives.
- Les index sont presents lorsque pertinents.
- Aucun modele ne contient de logique metier.
