# Sprint 07 - Market Data Engine

## Objective

Creer le moteur Market Data interne de TradeAI.

## Context

Le Trading Core existe deja.

Le Market Data Engine doit lui fournir une interface unique pour manipuler les MarketSnapshot.

## Scope

Creer uniquement :

```txt
packages/core/src/market/MarketDataEngine.js
packages/core/src/market/MarketDataProvider.js
packages/core/src/market/MarketSnapshotMapper.js
packages/core/src/market/index.js
```

## Responsibilities

Le Market Data Engine est responsable de :

- obtenir le dernier MarketSnapshot ;
- obtenir un historique de snapshots ;
- preparer les donnees pour les moteurs suivants ;
- masquer le futur fournisseur de donnees au Trading Core.

## Constraints

Interdit :

- fetch
- axios
- OpenAI
- scheduler
- dashboard
- appel API externe
- calcul technique
- RSI
- MACD
- EMA
- logique IA

## Acceptance Criteria

- Structure `packages/core/src/market` creee
- 4 fichiers attendus presents
- Methodes limitees a de l'orchestration minimale
- TODO documentes
- Aucun appel externe
- Aucun indicateur technique
- Exports propres
- Lint OK
- Format OK
- Code inferieur a environ 500 lignes
