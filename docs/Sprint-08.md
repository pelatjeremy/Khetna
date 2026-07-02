# Sprint 08 - Engine Contracts

## Objective

Creer les contrats publics des moteurs TradeAI.

Ces contrats servent de reference d'echange entre les moteurs actuels et futurs.

## Context

TradeAI possede deja :

- Trading Core
- Market Data Engine

Les futurs moteurs seront :

- Technical Analysis Engine
- AI Analysis Engine
- Decision Engine
- Scheduler
- Notification Engine

Avant de developper ces moteurs, il faut definir une API publique homogene.

## Scope

Creer uniquement :

```txt
packages/core/src/contracts/
```

Avec :

- EngineContract.js
- MarketDataContract.js
- TechnicalAnalysisContract.js
- AIAnalysisContract.js
- DecisionContract.js
- NotificationContract.js
- SchedulerContract.js
- index.js

## Constraints

Les contrats ne doivent contenir :

- aucune implementation ;
- aucune logique metier ;
- aucun calcul ;
- aucun appel HTTP ;
- aucun appel OpenAI ;
- aucun acces MongoDB ;
- aucune dependance Express ;
- aucune dependance React ;
- aucun import metier.

## Architecture Concerned

Uniquement :

- `packages/core/src/contracts/`
- `packages/core/src/index.js`

## Acceptance Criteria

- Tous les contrats existent
- Chaque contrat expose uniquement des methodes publiques
- Aucun moteur existant n'est modifie
- Aucun moteur supplementaire n'est cree
- Aucun contrat ne contient de logique
- Aucun contrat ne contient de calcul
- Aucun contrat ne contient d'appel externe
- Les exports sont centralises
- Lint OK
- Format OK
- Volume inferieur a environ 500 lignes
