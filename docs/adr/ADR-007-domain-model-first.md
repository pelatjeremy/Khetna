# ADR-007 - Domain Model First

## Status

Accepted

## Context

TradeAI est une plateforme de trading assistee par intelligence artificielle.

Le domaine metier est complexe :

- portefeuille
- actifs
- positions
- analyses IA
- scoring
- historique
- statistiques
- auto-evaluation

Avant toute implementation backend, le domaine doit etre stabilise.

Les modeles MongoDB ne devront etre crees qu'apres validation complete du domaine.

## Decision

Le Sprint 02 est exclusivement documentaire.

Il vise a definir :

- les objets metier
- leurs responsabilites
- leurs relations
- leur cycle de vie
- leurs interactions
- le vocabulaire metier officiel

Aucun code ne sera produit.

## Consequences

Les futurs developpements backend seront directement derives du Domain Model valide.

Cela limite :

- la dette technique
- les changements de schemas
- les incoherences fonctionnelles

## Out of Scope

Ne pas produire :

- modeles Mongoose
- routes API
- services
- controleurs
- logique metier
- tests
