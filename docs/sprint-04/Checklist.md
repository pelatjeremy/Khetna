# Checklist - Sprint 04 Repository Layer

## Structure

- [ ] Dossier `packages/database/src/repositories/` cree
- [ ] `UserRepository.js` cree
- [ ] `AssetRepository.js` cree
- [ ] `TradeRepository.js` cree
- [ ] `PortfolioSnapshotRepository.js` cree
- [ ] `MarketSnapshotRepository.js` cree
- [ ] `AnalysisRepository.js` cree
- [ ] `EvaluationRepository.js` cree
- [ ] `SettingRepository.js` cree
- [ ] `repositories/index.js` cree
- [ ] Export central mis a jour dans `packages/database/src/index.js`

## API Commune

Chaque repository expose :

- [ ] `create(data)`
- [ ] `findById(id)`
- [ ] `findAll(filter, options)`
- [ ] `update(id, data)`
- [ ] `delete(id)`

## Methodes Specifiques

- [ ] Methodes specifiques limitees a de la lecture simple
- [ ] Aucun calcul
- [ ] Aucun enrichissement de donnees
- [ ] Aucune regle metier
- [ ] Aucun scoring
- [ ] Aucune logique de trading

## Architecture

- [ ] Les repositories utilisent les modeles Mongoose
- [ ] Aucun modele Mongoose utilise dans une autre nouvelle couche
- [ ] Aucun service cree
- [ ] Aucun repository dependant d'un service
- [ ] Aucune route creee
- [ ] Aucun controller cree
- [ ] Aucun middleware cree
- [ ] Aucun composant React cree

## Qualite

- [ ] Nommage homogene
- [ ] Code lisible
- [ ] Code inferieur a environ 500 lignes
- [ ] Exports propres
- [ ] Pas de duplication excessive

## Validation

- [ ] `corepack yarn lint` OK
- [ ] `corepack yarn format` OK
- [ ] Imports repositories OK
- [ ] Aucun fichier hors perimetre modifie inutilement
