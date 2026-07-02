# ADR-019 - Application Contracts With DTO

## Status

Accepted

## Context

Le Trading Core de TradeAI produit des objets internes, notamment `RecommendationResult`.

Ces objets ne doivent pas etre exposes directement aux interfaces externes comme l'API REST.

Le Core doit rester independant de :

- Express
- HTTP
- MongoDB
- React
- tout client applicatif

## Decision

Creer une couche DTO dans `packages/core/src/dto/`.

Les DTO deviennent le contrat officiel entre le Trading Core et les applications.

Le flux valide est :

```txt
Trading Core
-> RecommendationResult
-> DTOMapper
-> RecommendationResponseDTO
-> REST API
-> Client
```

## Rules

Les DTO :

- decrivent uniquement les donnees exposees
- ne contiennent aucune logique metier
- ne calculent rien
- ne dependent pas de MongoDB
- ne dependent pas d'Express
- ne dependent pas de React

`DTOMapper` est uniquement responsable de transformer les objets internes du Core vers les DTO.

## Consequences

Cette decision permet :

- de decoupler le Core de l'API REST
- de stabiliser les contrats applicatifs
- de proteger les objets internes du Core
- de faciliter l'evolution future des interfaces

## Out Of Scope

- logique metier
- MongoDB
- Express
- OpenAI
- HTTP
- React
- notifications
- scheduler
- dashboard
- authentification
