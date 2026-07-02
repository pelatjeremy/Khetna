# Lessons Learned - Sprint 12

## Ce Qui A Bien Fonctionne

- Les Engines existants exposaient deja des points d'entree suffisants pour une integration simple.
- L'injection du pipeline dans `TradingCore` permet de respecter l'ordre attendu sans modifier les Engines.

## Difficultes Rencontrees

- `MarketDataProvider` est volontairement non implemente, donc le smoke test utilise un `marketSnapshot` fourni en entree.

## Decisions Confirmees

- L'integration doit rester une couche de transport et d'orchestration.
- Aucune logique metier supplementaire ne doit etre ajoutee dans ce sprint.

## Points De Vigilance

- Les prochaines evolutions devront conserver le decouplage entre Engines.
- Toute nouvelle source de donnees devra rester hors de ce sprint.

## Actions Pour La Suite

- Valider officiellement le Sprint 12 avant de preparer un Sprint 13.
