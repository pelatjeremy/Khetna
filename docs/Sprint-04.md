# Sprint 04 - Repository Layer

## Objective

Construire la couche Repository du projet TradeAI.

## Context

Le Sprint 03 a permis de creer les modeles Mongoose passifs.

Le Sprint 04 ajoute une couche d'acces aux donnees entre les modeles Mongoose et les futures couches metier.

## Scope

Creer uniquement :

```txt
packages/database/src/repositories/
```

Avec les fichiers :

- `UserRepository.js`
- `AssetRepository.js`
- `TradeRepository.js`
- `PortfolioSnapshotRepository.js`
- `MarketSnapshotRepository.js`
- `AnalysisRepository.js`
- `EvaluationRepository.js`
- `SettingRepository.js`
- `index.js`

## Repository API

Chaque repository doit proposer :

- `create(data)`
- `findById(id)`
- `findAll(filter, options)`
- `update(id, data)`
- `delete(id)`

Des methodes de lecture specifiques sont autorisees uniquement si elles sont directement liees a l'entite.

## Constraints

Interdits :

- logique metier
- calcul
- regle de trading
- scoring
- validation metier
- appel IA
- service
- controller
- route Express
- composant React
- modification des modeles Mongoose existants sauf export necessaire

## Architecture Concerned

Uniquement :

- `packages/database/src/repositories/`
- `packages/database/src/index.js`

## Acceptance Criteria

Le sprint est accepte si :

- tous les repositories existent ;
- chaque repository expose une API coherente ;
- les repositories utilisent les modeles Mongoose ;
- aucun modele Mongoose n'est utilise ailleurs dans une nouvelle couche ;
- aucun repository ne contient de logique metier ;
- les exports sont centralises ;
- ESLint passe ;
- Prettier passe ;
- le code reste inferieur a environ 500 lignes.
