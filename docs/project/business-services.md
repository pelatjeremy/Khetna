# Business Services Layer

## Objectif

La couche Business Services contient les regles metier de TradeAI.

Elle est situee dans :

```txt
packages/core/
```

Elle represente le debut du Trading Core.

## Architecture

```txt
Controller
Service
Repository
Model
MongoDB
```

## Role de packages/core

`packages/core` contient la logique metier pure.

Il ne depend pas :

- d'Express ;
- de React ;
- d'OpenAI ;
- directement de Mongoose.

Il depend uniquement des repositories exposes par `packages/database`.

## Services

- `TradeService` gere les operations metier liees aux trades et ne reconstruit jamais le portefeuille.
- `PortfolioService` reconstruit un portefeuille complet a partir des trades et calcule quantite, prix moyen, capital investi, plus-value, moins-value et performance.
- `MarketSnapshotService` cree des snapshots de marche a partir de donnees deja fournies.
- `AnalysisService` cree des analyses sans intelligence artificielle.
- `EvaluationService` cree des evaluations.
- `AssetService` gere les actifs.
- `UserService` gere les utilisateurs.
- `SettingService` gere les parametres.

## Regle principale

Aucun modele Mongoose ne doit etre importe dans `packages/core`. Les services doivent passer par les repositories.

## Ajouter un futur service

1. Creer le service dans `packages/core/src/services`.
2. Importer uniquement les repositories necessaires.
3. Garder une responsabilite unique.
4. Ne pas ajouter de dependance Express, React ou OpenAI.
5. Exporter le service depuis `packages/core/src/index.js`.
