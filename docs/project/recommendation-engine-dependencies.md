# Dependencies - Recommendation Engine

## Flux Cible

```txt
Market Analysis
    |
    v
Recommendation Engine
    |
    v
Trading Core

Technical Analysis
    |
    v
Recommendation Engine

AI Analysis
    |
    v
Recommendation Engine
```

## Regles

Le module Recommendation Engine ne depend pas directement de :

- MongoDB
- Mongoose
- repositories
- services concrets
- OpenAI
- HTTP
- fetch
- axios
- routes
- controllers
- scheduler
- notification
- dashboard

## Objectif Architectural

Le Recommendation Engine reste une couche d'agregation isolee.

Il consomme des resultats deja produits par d'autres moteurs et retourne une structure normalisee.

Il ne declenche aucun traitement externe et ne modifie pas les moteurs existants.
