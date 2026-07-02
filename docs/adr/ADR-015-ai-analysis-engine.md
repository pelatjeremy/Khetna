# ADR-015 - AI Analysis Engine

## Status

Accepted

## Context

TradeAI doit disposer d'un moteur capable de preparer une future analyse IA.

Ce moteur doit rester decouple des providers concrets afin de respecter le principe de Dependency Inversion.

## Decision

Creer un module `AI Analysis Engine` dans :

```txt
packages/core/src/ai/
```

Le module contient :

- `AIAnalysisEngine`
- `AIAnalysisProvider`
- `PromptBuilder`
- `AIResponseMapper`

Le provider reste simule dans ce sprint.

## Rationale

Le moteur IA doit dependre d'abstractions et non de details techniques.

Cette approche permet de remplacer plus tard le provider simule par un vrai provider IA sans modifier toute l'orchestration.

## Consequences

- le code reste testable
- aucun secret n'est necessaire
- aucun appel reseau n'est effectue
- le futur provider IA pourra etre ajoute dans un sprint dedie

## Out Of Scope

- OpenAI reel
- cle API
- HTTP
- MongoDB
- route
- controller
- scheduler
- dashboard
