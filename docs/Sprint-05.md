# Sprint 05 - Business Services

## Objective

Creer la couche Business Services de TradeAI.

Ce sprint represente la premiere couche contenant de la logique metier.

## Context

Les modeles Mongoose et les repositories sont deja valides.

Les services portent maintenant les regles metier sans acceder directement aux modeles Mongoose.

## Scope

Creer uniquement :

```txt
packages/core/
└── src/
    ├── services/
    │   ├── TradeService.js
    │   ├── PortfolioService.js
    │   ├── MarketSnapshotService.js
    │   ├── AnalysisService.js
    │   ├── EvaluationService.js
    │   ├── AssetService.js
    │   ├── SettingService.js
    │   └── UserService.js
    └── index.js
```

## Services

- `TradeService` gere la creation, modification, suppression et lecture des trades. Il ne calcule pas le portefeuille.
- `PortfolioService` reconstruit un portefeuille a partir des trades, calcule les agregats metier et cree un `PortfolioSnapshot`.
- `MarketSnapshotService` cree des snapshots de marche fournis, sans recuperation externe.
- `AnalysisService` cree des analyses, sans IA, prompt ou appel OpenAI.
- `EvaluationService` cree des evaluations.
- `AssetService` gere les regles metier liees aux actifs.
- `UserService` gere les regles metier utilisateur.
- `SettingService` gere les regles metier des parametres.

## Constraints

Interdits :

- routes ;
- controllers ;
- API ;
- IA ;
- OpenAI ;
- recuperation marche ;
- scheduler ;
- dashboard ;
- notification ;
- prompt ;
- acces direct aux modeles Mongoose.

## Acceptance Criteria

Le sprint est accepte si :

- `packages/core` existe ;
- tous les services demandes existent ;
- les services dependent uniquement des repositories ;
- aucun service ne depend d'Express, React ou OpenAI ;
- aucun service n'accede directement aux modeles Mongoose ;
- aucune route ni controller n'est cree ;
- ESLint passe ;
- Prettier passe ;
- le code reste inferieur a environ 500 lignes.
