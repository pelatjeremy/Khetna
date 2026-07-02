# ADR-009 - Repository Layer

## Status

Accepted

## Context

TradeAI dispose desormais d'une couche de persistance MongoDB passive basee sur Mongoose.

Les modeles Mongoose ne doivent pas etre utilises directement par les futures couches metier, API ou services.

Une couche Repository est necessaire pour centraliser l'acces aux donnees.

## Decision

Creer une couche Repository dans :

```txt
packages/database/src/repositories/
```

Les repositories seront la seule couche autorisee a communiquer directement avec les modeles Mongoose.

Chaque repository expose une API simple et coherente :

- `create()`
- `findById()`
- `findAll()`
- `update()`
- `delete()`

Des methodes de lecture specifiques peuvent etre ajoutees uniquement si elles sont directement liees a l'entite.

Exemples :

- `findByUser()`
- `findByAsset()`
- `findBySymbol()`
- `findByType()`

## Rules

Les repositories ne doivent contenir :

- aucune logique metier ;
- aucun calcul ;
- aucune regle de trading ;
- aucune validation metier ;
- aucun appel IA ;
- aucune orchestration ;
- aucune dependance vers les futurs services.

## Consequences

Cette separation permet :

- d'isoler Mongoose ;
- de faciliter les tests ;
- de preparer les Business Services ;
- de rendre l'architecture plus maintenable ;
- d'eviter l'acces direct aux modeles depuis le reste de l'application.

## Out of Scope

- Business Services
- Controllers
- Routes Express
- Trading Engine
- IA
- Frontend
