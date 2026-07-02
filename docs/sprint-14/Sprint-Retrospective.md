# Sprint Retrospective - Sprint 14 Application Contracts DTO

## Objectif Du Sprint

Creer les contrats applicatifs entre le Trading Core et les interfaces.

## Resultat Attendu

Les applications consomment des DTO stables au lieu de manipuler directement les objets internes du Core.

## Start

- Utiliser les DTO comme contrat officiel entre Core et applications.
- Documenter chaque nouveau contrat expose par le Core.

## Stop

- Exposer directement les objets internes du Trading Core.
- Ajouter de la logique metier dans les objets de transfert.

## Continue

- Garder le Core independant d'Express, MongoDB et React.
- Centraliser les exports publics du Core.
- Valider lint, format et scans de dependances interdites.

## Risques Identifies

- Derive future du mapper vers de l'enrichissement metier.
- Couplage accidentel avec l'API REST lors d'un sprint d'integration.

## Ameliorations Possibles

- Ajouter des tests dedies aux contrats DTO lors d'un sprint futur.
- Brancher l'API REST sur les DTO dans un perimetre separe.

## Decision Finale

- [x] Sprint valide
- [ ] Sprint a corriger
