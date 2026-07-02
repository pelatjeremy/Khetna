# Sprint 14 - Application Contracts DTO

## Objectif

Creer les objets d'echange entre le Trading Core et les interfaces applicatives.

## Contexte

Le Sprint 13 a expose le Trading Core via une API REST minimale.

Le Sprint 14 introduit une couche de contrats applicatifs afin que l'API REST ne manipule pas directement les objets internes du Core.

## Architecture

```txt
Trading Core
-> RecommendationResult
-> DTOMapper
-> RecommendationResponseDTO
-> REST API
-> Client
```

## Perimetre

Creation uniquement de la couche DTO dans `packages/core/src/dto/` :

- `AnalysisRequestDTO.js`
- `AnalysisResponseDTO.js`
- `RecommendationRequestDTO.js`
- `RecommendationResponseDTO.js`
- `HealthResponseDTO.js`
- `VersionResponseDTO.js`
- `DTOMapper.js`
- `index.js`

L'export central `packages/core/src/index.js` expose les DTO depuis le package Core.

## Contraintes

Interdits :

- logique metier
- calcul
- OpenAI
- MongoDB
- HTTP
- Express
- React
- notification
- scheduler
- dashboard
- authentification

## Criteres D'acceptation

- tous les DTO existent
- les DTO sont passifs
- `DTOMapper` transforme les objets internes vers les DTO
- aucun DTO ne contient de logique metier
- aucun DTO ne depend d'Express
- aucun DTO ne depend de MongoDB
- les exports sont centralises
- lint OK
- format OK
- volume inferieur a environ 500 lignes
