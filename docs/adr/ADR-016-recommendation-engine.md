# ADR-016 - Recommendation Engine

## Status

Accepted

## Context

TradeAI dispose de plusieurs moteurs specialises :

- Market Data Engine
- Technical Analysis Engine
- AI Analysis Engine
- Trading Core

Ces moteurs produisent des resultats distincts. Une couche dediee est necessaire pour agreger ces resultats dans une structure unique appelee `Recommendation`.

## Decision

Creer un `Recommendation Engine` dans :

```txt
packages/core/src/recommendation/
```

Le moteur ne prend aucune decision automatique.

Il agrege uniquement :

- Market Analysis
- Technical Analysis
- AI Analysis

Il produit une structure normalisee :

- asset
- generatedAt
- recommendation
- inputs
- scores
- metadata

## Responsibilities

### RecommendationEngine

Orchestrer la generation d'une recommandation.

### RecommendationBuilder

Construire une recommandation a partir des resultats disponibles.

### RecommendationScore

Agreger uniquement les scores deja calcules.

### RecommendationMapper

Normaliser le resultat final.

## Constraints

Le moteur ne doit contenir :

- aucun appel IA
- aucun appel HTTP
- aucun acces MongoDB
- aucune logique de trading automatique
- aucun calcul financier
- aucun scoring technique
- aucune decision d'achat ou de vente

## Consequences

Le Recommendation Engine devient une couche d'agregation stable entre les moteurs d'analyse et le Trading Core.

Il prepare les futurs usages sans modifier les moteurs existants.

## Out Of Scope

- OpenAI
- HTTP
- fetch
- axios
- MongoDB
- scheduler
- notification
- route
- controller
- dashboard
- decision automatique
