# ADR-008 - Dedicated Persistence Layer

## Status

Accepted

## Context

TradeAI utilise MongoDB comme base de donnees principale.

Les objets metier identifies dans le Domain Model doivent etre persistes sans introduire de logique metier dans la couche de persistance.

Les modeles Mongoose doivent uniquement representer la structure des donnees.

## Decision

La couche `packages/database` est dediee exclusivement a la persistance.

Chaque modele Mongoose :

- represente un document MongoDB ;
- definit les champs, validations et index ;
- configure les timestamps ;
- expose un export propre.

Aucun modele ne doit contenir :

- logique metier ;
- calcul ;
- methode metier ;
- helper ;
- acces API ;
- orchestration.

La logique metier sera implementee dans les Business Services lors d'un sprint ulterieur.

## Consequences

Cette separation permet :

- une meilleure testabilite ;
- une forte maintenabilite ;
- une separation claire des responsabilites ;
- une evolution independante des modeles et des regles metier.

## Out of Scope

- services metier
- repositories
- controllers
- routes
- IA
- trading engine
