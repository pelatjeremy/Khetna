# Market Data Engine

## Objectif

Le Market Data Engine est la couche metier responsable de manipuler les MarketSnapshot.

Il ne recupere pas les donnees depuis Internet.

## Position dans l'architecture

```txt
Trading Core
Market Data Engine
Business Services
Repositories
MongoDB
```

## Responsabilites

Le Market Data Engine doit :

- fournir le dernier MarketSnapshot ;
- fournir un historique de MarketSnapshots ;
- preparer un contexte de marche stable pour les moteurs suivants ;
- masquer au Trading Core les futures implementations de fournisseurs.

## Non-responsabilites

Le Market Data Engine ne doit pas :

- appeler une API externe ;
- utiliser fetch ou axios ;
- calculer RSI, MACD, EMA ou autres indicateurs ;
- interroger OpenAI ;
- planifier des taches ;
- afficher un dashboard.

## Composants

### MarketDataEngine

Interface principale utilisee par le Trading Core.

### MarketDataProvider

Abstraction du futur fournisseur de donnees.

Dans ce sprint, aucun fournisseur reel n'est implemente.

### MarketSnapshotMapper

Prepare une structure stable a partir des snapshots existants.

Aucun calcul technique n'est autorise.

## Principe d'evolution

Plus tard, un fournisseur pourra etre branche derriere une abstraction interne.

Le Trading Core ne devra pas etre modifie lors du remplacement d'un fournisseur.
