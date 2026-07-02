# Dependencies - AI Analysis Engine

## Flux Cible

```txt
Trading Core
    |
    v
AI Analysis Engine
    |
    v
Contracts
    |
    v
Business Services
    |
    v
Repositories
    |
    v
MongoDB
```

## Regles

Le module AI Analysis Engine ne depend pas directement de :

- MongoDB
- Mongoose
- Repositories
- services concrets
- OpenAI
- HTTP
- routes
- controllers
- dashboard

## Objectif Architectural

Le moteur IA reste isole, remplacable et testable.

Le provider simule pourra etre remplace plus tard par un provider reel dans un sprint dedie.
