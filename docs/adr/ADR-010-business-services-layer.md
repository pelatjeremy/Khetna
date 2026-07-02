# ADR-010 - Business Services Layer

## Status

Accepted

## Context

TradeAI dispose deja d'une couche MongoDB passive et d'une couche Repository dediee a l'acces aux donnees.

Le projet introduit maintenant la premiere couche contenant de la logique metier. Cette logique ne doit pas etre placee dans les modeles Mongoose, les repositories, les controllers, les routes Express ou le frontend.

## Decision

Creer un nouveau package :

```txt
packages/core/
```

Ce package devient le coeur metier du logiciel. Les Business Services sont responsables des regles metier et utilisent uniquement les repositories.

Architecture cible :

```txt
Controller
Service
Repository
Model
MongoDB
```

## Rules

Les services :

- contiennent les regles metier ;
- utilisent uniquement les repositories ;
- ne connaissent pas Express ;
- ne connaissent pas React ;
- ne connaissent pas OpenAI ;
- ne connaissent pas directement Mongoose ;
- ne font aucun appel externe non valide.

## Consequences

Cette separation permet :

- une meilleure testabilite ;
- une architecture claire ;
- une evolution progressive du Trading Core ;
- une separation stricte entre metier, persistance et transport HTTP.

## Out of Scope

- Routes Express
- Controllers
- IA
- OpenAI
- Market Data externe
- Scheduler
- Dashboard
- Notifications
