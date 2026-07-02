# Checklist - Sprint 11

## Structure

- [ ] `packages/core/src/recommendation/` cree
- [ ] `RecommendationEngine.js` cree
- [ ] `RecommendationBuilder.js` cree
- [ ] `RecommendationMapper.js` cree
- [ ] `RecommendationScore.js` cree
- [ ] `index.js` cree
- [ ] export central mis a jour

## Responsabilites

- [ ] `RecommendationEngine` orchestre uniquement
- [ ] `RecommendationBuilder` construit une recommandation brute
- [ ] `RecommendationMapper` normalise le resultat
- [ ] `RecommendationScore` agrege uniquement des scores existants

## Perimetre Interdit

- [ ] aucun OpenAI
- [ ] aucun HTTP
- [ ] aucun fetch
- [ ] aucun axios
- [ ] aucun MongoDB
- [ ] aucun Mongoose
- [ ] aucun scheduler
- [ ] aucune notification
- [ ] aucune route
- [ ] aucun controller
- [ ] aucun dashboard
- [ ] aucun service
- [ ] aucun repository

## Logique Interdite

- [ ] aucun calcul financier
- [ ] aucun calcul technique
- [ ] aucun calcul metier complexe
- [ ] aucune decision automatique
- [ ] aucun signal d'achat
- [ ] aucun signal de vente
- [ ] aucune execution d'ordre

## Architecture

- [ ] aucun moteur existant modifie
- [ ] aucun fichier hors perimetre modifie inutilement
- [ ] architecture modulaire respectee
- [ ] exports propres

## Validation

- [ ] lint OK
- [ ] format OK
- [ ] smoke import OK
- [ ] scan des termes interdits OK
- [ ] volume maitrise
