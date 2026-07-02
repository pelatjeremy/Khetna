# Definition of Done - Sprint 05

Le Sprint 05 est termine uniquement si :

- `packages/core` existe ;
- les 8 Business Services sont crees ;
- chaque service respecte une responsabilite unique ;
- les services utilisent uniquement les repositories ;
- aucun service n'accede directement aux modeles Mongoose ;
- aucun service ne depend d'Express, React ou OpenAI ;
- aucune route, controller ou API n'est cree ;
- aucune recuperation de donnees marche externe n'est creee ;
- aucune logique IA n'est creee ;
- `PortfolioService` est le seul service a reconstruire le portefeuille ;
- `TradeService` ne calcule jamais le portefeuille ;
- les exports sont centralises ;
- ESLint ne retourne aucune erreur ;
- Prettier ne retourne aucune erreur ;
- le volume de code reste inferieur a environ 500 lignes.
