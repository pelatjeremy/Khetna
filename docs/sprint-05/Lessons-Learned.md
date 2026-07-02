# Lessons Learned - Sprint 05

## Ce qui a bien fonctionne

- La couche Repository permet d'ajouter les services sans exposer les modeles Mongoose.

## Difficultes rencontrees

- Le schema `PortfolioSnapshot` ne stocke pas tous les agregats calcules par `PortfolioService`.

## Decisions confirmees

- Les calculs de portefeuille restent dans `PortfolioService`.
- Les services simples restent des facades metier minces au-dessus des repositories.

## Points de vigilance

- Ne pas importer `@tradeai/database/src/models` depuis `packages/core`.
- Ne pas ajouter d'appels externes dans les services.

## Ameliorations possibles

- Ajouter des tests unitaires dedies aux calculs de portefeuille dans un futur sprint.

## Actions pour le sprint suivant

-
