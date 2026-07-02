# UML - Recommendation Engine

```txt
+--------------------------+
|  RecommendationEngine    |
+--------------------------+
| - builder                |
| - scoreAggregator        |
| - mapper                 |
+--------------------------+
| + generate(input)        |
+------------+-------------+
             |
             v
+--------------------------+
|  RecommendationBuilder   |
+--------------------------+
| + build(input)           |
+--------------------------+

+--------------------------+
|  RecommendationScore     |
+--------------------------+
| + aggregate(input)       |
| + extractScore(analysis) |
+--------------------------+

+--------------------------+
|  RecommendationMapper    |
+--------------------------+
| + toRecommendation(raw)  |
+--------------------------+
```

## Lecture

RecommendationEngine orchestre le flux.

Il s'appuie sur :

- RecommendationBuilder pour construire une recommandation brute
- RecommendationScore pour agreger les scores deja disponibles
- RecommendationMapper pour normaliser le resultat final

Le module ne prend aucune decision automatique.
