# Sprint 11 - Recommendation Engine

## Objectif

Creer le Recommendation Engine de TradeAI.

Ce moteur agrege les resultats deja produits par les moteurs existants afin de construire une recommandation structuree, stable et neutre.

## Contexte

Les moteurs suivants existent deja :

- Market Data Engine
- Technical Analysis Engine
- AI Analysis Engine
- Trading Core

Le Recommendation Engine ajoute une couche d'agregation entre les moteurs d'analyse et le Trading Core.

## Perimetre

Creer uniquement :

```txt
packages/core/src/recommendation/
|-- RecommendationEngine.js
|-- RecommendationBuilder.js
|-- RecommendationMapper.js
|-- RecommendationScore.js
`-- index.js
```

Mettre a jour l'export central de `packages/core`.

## Responsabilites

### RecommendationEngine

Orchestrer la generation d'une recommandation.

Il appelle le builder, l'agregateur de scores et le mapper.

### RecommendationBuilder

Construire une recommandation brute a partir des analyses recues.

Il agrege `marketAnalysis`, `technicalAnalysis` et `aiAnalysis` sans produire de decision.

### RecommendationScore

Agreger uniquement les scores deja calcules et disponibles dans les entrees.

Il ne calcule aucun score technique, financier ou metier.

### RecommendationMapper

Normaliser la recommandation finale.

Il garantit une structure stable et ajoute des valeurs neutres lorsque des donnees sont absentes.

## Hors Perimetre

- OpenAI
- appel IA
- fetch
- axios
- HTTP
- MongoDB
- Mongoose
- scheduler
- notification
- route
- controller
- dashboard
- service
- repository
- calcul financier
- calcul technique
- decision automatique
- signal d'achat
- signal de vente
- execution d'ordre

## Criteres D'acceptation

- le module `recommendation` existe
- les 5 fichiers attendus existent
- l'export central fonctionne
- la recommandation est normalisee
- le statut reste neutre par defaut
- aucun moteur existant n'est modifie
- aucun appel externe n'est present
- aucune decision automatique n'est produite
- aucun calcul financier ou technique n'est ajoute
- lint OK
- format OK
- smoke import OK
