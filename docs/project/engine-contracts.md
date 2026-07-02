# Engine Contracts

## Objectif

Les Engine Contracts definissent les interfaces publiques des moteurs TradeAI.

Ils ne contiennent aucune implementation.

## Pourquoi des contracts ?

TradeAI contient plusieurs moteurs independants :

- Trading Core
- Market Data Engine
- Technical Analysis Engine
- AI Analysis Engine
- Decision Engine
- Scheduler
- Notification Engine

Les contracts permettent d'uniformiser les echanges entre ces moteurs.

## Architecture

```txt
packages/core/src/contracts/
|-- EngineContract.js
|-- MarketDataContract.js
|-- TechnicalAnalysisContract.js
|-- AIAnalysisContract.js
|-- DecisionContract.js
|-- NotificationContract.js
|-- SchedulerContract.js
`-- index.js
```

## Principe

Un contract definit ce qu'un moteur doit exposer.

Il ne definit jamais comment le moteur fonctionne.

## Exemple de responsabilite

MarketDataContract definit les methodes publiques attendues d'un moteur de donnees marche.

Il ne recupere aucune donnee.

Il ne contacte aucun provider.

Il ne transforme aucune donnee.

## Ajouter un futur contract

Pour ajouter un futur contract :

- creer le fichier dans `packages/core/src/contracts/` ;
- exposer uniquement les methodes publiques ;
- ne pas ajouter d'implementation ;
- exporter le contract dans `contracts/index.js` ;
- mettre a jour la documentation.

## Interdictions permanentes

Un contract ne doit jamais contenir :

- logique metier ;
- calcul ;
- appel HTTP ;
- appel IA ;
- acces MongoDB ;
- dependance Express ;
- dependance React ;
- orchestration.
