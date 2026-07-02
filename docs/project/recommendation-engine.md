# Recommendation Engine

## Objectif

Le Recommendation Engine agrege les resultats issus des moteurs d'analyse de TradeAI.

Il produit une structure unique appelee `Recommendation`.

## Principe Cle

Le moteur ne prend jamais de decision.

Il ne dit pas automatiquement :

- acheter
- vendre
- renforcer
- sortir de position

Il construit uniquement une recommandation structuree et neutre.

## Architecture

```txt
packages/core/src/recommendation/
|-- RecommendationEngine.js
|-- RecommendationBuilder.js
|-- RecommendationMapper.js
|-- RecommendationScore.js
`-- index.js
```

## Responsabilites

### RecommendationEngine

Point d'entree du module.

Il orchestre la generation d'une recommandation en deleguant au builder, a l'agregateur de scores et au mapper.

### RecommendationBuilder

Construit une recommandation brute a partir des entrees disponibles.

Il conserve les analyses recues sans ajouter de decision.

### RecommendationScore

Agrege uniquement les scores deja presents dans les analyses.

Il ne produit aucun calcul technique ou financier.

### RecommendationMapper

Normalise la structure finale.

Il garantit que les champs attendus existent et restent neutres si les donnees sont absentes.

## Structure De Sortie

```txt
Recommendation
|-- asset
|-- generatedAt
|-- recommendation
|   |-- status
|   |-- confidence
|   `-- summary
|-- inputs
|   |-- market
|   |-- technical
|   `-- ai
|-- scores
|   |-- market
|   |-- technical
|   |-- ai
|   `-- aggregated
`-- metadata
    |-- engine
    `-- version
```

## Contraintes

Le Recommendation Engine ne contient :

- aucun acces reseau
- aucun acces base de donnees
- aucun calcul financier
- aucune IA
- aucune decision automatique
- aucune logique de trading active

## Evolution Future

Toute evolution devra etre validee avant implementation.

Aucune nouvelle regle de recommandation ne doit etre ajoutee sans decision d'architecture.
