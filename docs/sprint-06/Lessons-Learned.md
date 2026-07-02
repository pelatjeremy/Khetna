# Lessons Learned - Sprint 06

## Ce qui a bien fonctionne

- L'architecture du Trading Core a ete figee sans introduire de logique metier.

## Difficultes rencontrees

-

## Decisions confirmees

- Le Trading Core reste un moteur d'orchestration.
- Les dependances metier seront injectees au lieu d'etre importees directement.

## Points de vigilance

- Ne pas transformer les etapes du pipeline en services metier.
- Garder l'IA reelle hors perimetre tant qu'elle n'est pas validee.

## Actions pour le sprint suivant

-
