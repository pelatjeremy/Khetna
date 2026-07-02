# DTO Contracts

## Objectif

Les DTO definissent les donnees exposees par le Trading Core aux interfaces applicatives.

Ils servent de contrat stable entre :

- le Core
- l'API REST
- les futurs clients

## Principe

Les DTO sont passifs.

Ils ne doivent jamais contenir :

- logique metier
- calcul
- acces MongoDB
- acces Express
- appel HTTP
- appel IA

## Flux

```txt
Trading Core
-> Internal Result
-> DTOMapper
-> DTO
-> REST API
-> Client
```

## DTO Attendus

### AnalysisRequestDTO

Contrat d'entree pour une demande d'analyse.

Champs exposes :

- `assetSymbol`
- `timeframe`
- `context`

### AnalysisResponseDTO

Contrat de sortie pour une reponse d'analyse.

Champs exposes :

- `status`
- `analysis`
- `metadata`

### RecommendationRequestDTO

Contrat d'entree pour une demande de recommandation.

Champs exposes :

- `assetSymbol`
- `timeframe`
- `portfolioContext`

### RecommendationResponseDTO

Contrat de sortie pour une recommandation.

Champs exposes :

- `status`
- `recommendation`
- `confidence`
- `riskLevel`
- `metadata`

### HealthResponseDTO

Contrat de sortie pour l'etat technique.

Champs exposes :

- `status`
- `service`
- `timestamp`

### VersionResponseDTO

Contrat de sortie pour les informations de version.

Champs exposes :

- `name`
- `version`
- `environment`

## DTOMapper

`DTOMapper` transforme les objets internes du Core vers les DTO exposes.

Il ne doit pas calculer, enrichir ou interpreter les donnees.

## Ajouter Un Futur DTO

1. Creer le fichier DTO dans `packages/core/src/dto/`.
2. Definir uniquement les champs exposes.
3. Ajouter le mapping dans `DTOMapper` si necessaire.
4. Exporter le DTO dans `dto/index.js`.
5. Exporter depuis `packages/core/src/index.js`.
6. Verifier l'absence de dependances interdites.
