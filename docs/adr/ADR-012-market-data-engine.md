# ADR-012 - Market Data Engine

## Status

Accepted

## Context

Le Trading Core est en place.

TradeAI doit maintenant disposer d'une couche dediee a la manipulation des snapshots de marche.

Le Market Data Engine ne doit pas recuperer les donnees depuis Internet dans ce sprint.

## Decision

Creer un Market Data Engine dans :

```txt
packages/core/src/market/
```

Ce moteur fournit une interface stable au Trading Core pour :

- obtenir le dernier MarketSnapshot ;
- obtenir un historique de MarketSnapshots ;
- preparer les donnees pour les futurs moteurs.

Le moteur reste independant de tout fournisseur externe.

## Rules

Le Market Data Engine ne doit contenir :

- aucun appel HTTP ;
- aucun fetch ;
- aucun axios ;
- aucun fournisseur externe ;
- aucun calcul technique ;
- aucun indicateur ;
- aucune analyse IA ;
- aucun scheduler.

## Consequences

Le Trading Core dependra d'une interface stable.

Les futurs fournisseurs de donnees pourront etre branches sans modifier le Trading Core.

## Out of Scope

- API externe
- Market data provider reel
- temps reel
- RSI
- MACD
- EMA
- IA
- dashboard
