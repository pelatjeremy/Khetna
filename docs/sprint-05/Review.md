# Review - Sprint 05 Business Services

## Decision

- [ ] Accepte
- [ ] Accepte avec corrections mineures
- [ ] Refuse

## Architecture

- Les services sont-ils bien dans `packages/core` ?
- Les services utilisent-ils uniquement les repositories ?
- Les repositories restent-ils independants des services ?
- L'architecture respecte-t-elle bien le flux Service -> Repository -> Model ?

## Dependances interdites

Verifier l'absence de :

- [ ] import direct de modeles Mongoose
- [ ] import direct de schemas Mongoose
- [ ] import `mongoose`
- [ ] import `express`
- [ ] import `react`
- [ ] import `openai`

## Responsabilites

### TradeService

- [ ] Gere uniquement les trades
- [ ] Ne calcule pas le portefeuille
- [ ] Ne calcule pas la performance

### PortfolioService

- [ ] Reconstruit le portefeuille depuis les trades
- [ ] Calcule les agregats demandes
- [ ] Cree un PortfolioSnapshot
- [ ] Ne recupere aucune donnee externe

### AnalysisService

- [ ] Cree une Analysis
- [ ] Ne contient aucune IA
- [ ] Ne contient aucun prompt

### MarketSnapshotService

- [ ] Cree un MarketSnapshot
- [ ] Ne recupere aucune donnee externe

## Qualite

- Le code est-il lisible ?
- Les responsabilites sont-elles claires ?
- Y a-t-il de la duplication inutile ?
- Le volume est-il inferieur a environ 500 lignes ?
- Les exports sont-ils propres ?

## Validation technique

- [ ] `corepack yarn lint` OK
- [ ] `corepack yarn format` OK
- [ ] Imports `packages/core` OK

## Commentaires

-
