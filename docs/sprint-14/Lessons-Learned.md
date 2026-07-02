# Lessons Learned - Sprint 14

## Ce Qui A Bien Fonctionne

- La couche DTO a pu etre ajoutee sans modifier les applications.
- Les exports centralises rendent les DTO importables depuis le package Core.
- Le perimetre strict a evite toute logique metier ou dependance applicative.

## Difficultes Rencontrees

- Le sprint distingue la creation de la couche DTO et la documentation associee.
- Le branchement de l'API REST vers les DTO reste volontairement hors perimetre.

## Decisions Confirmees

- Les DTO sont des contrats passifs.
- `DTOMapper` reste limite a la transformation explicite des objets internes vers les DTO.
- Le Core ne depend pas des interfaces applicatives.

## Points De Vigilance

- Ne pas ajouter de validation metier dans les DTO.
- Ne pas enrichir les donnees dans `DTOMapper`.
- Ne pas exposer directement les objets internes aux futurs clients.

## Actions Pour Le Sprint Suivant

- Valider separement toute integration API REST vers les DTO.
- Conserver les contrats DTO comme reference publique du Core.
