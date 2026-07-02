# Glossaire Metier - Sprint 02

## Objectif

Ce glossaire fixe le vocabulaire metier officiel de TradeAI pour les prochains sprints.

## Termes

| Terme                | Definition                                                                     |
| -------------------- | ------------------------------------------------------------------------------ |
| Portfolio            | Ensemble coherent de positions suivi par TradeAI                               |
| Asset                | Instrument financier pouvant etre suivi, analyse ou reference par une position |
| Position             | Exposition d'un Portfolio a un Asset                                           |
| Market Data Snapshot | Representation du contexte de marche a un instant donne                        |
| AI Analysis          | Analyse metier produite sur un Portfolio, une Position ou un Asset             |
| Score                | Synthese evaluative associee a une analyse                                     |
| History Event        | Evenement metier significatif conserve dans l'historique                       |
| Statistics           | Indicateurs agreges permettant une lecture synthetique du domaine              |
| Self Evaluation      | Evaluation a posteriori d'une analyse metier                                   |
| Trading Core         | Ensemble conceptuel des objets et workflows centraux du domaine TradeAI        |
| Perimetre d'analyse  | Objet ou ensemble d'objets concernes par une analyse                           |
| Contexte d'analyse   | Informations prises en compte au moment de l'analyse                           |
| Historisation        | Conservation des evenements significatifs dans le temps                        |
| Exposition           | Niveau de dependance d'un Portfolio a un Asset via une Position                |
| Evaluation           | Interpretation metier donnant lieu a une analyse ou a un score                 |

## Regles de Vocabulaire

- Utiliser Portfolio pour designer l'ensemble suivi.
- Utiliser Asset pour designer l'instrument financier.
- Utiliser Position pour designer l'exposition a un Asset.
- Utiliser AI Analysis pour designer l'analyse metier produite.
- Utiliser Score uniquement pour la synthese evaluative.
- Utiliser Self Evaluation uniquement pour une evaluation a posteriori.

## Termes Hors Perimetre Technique

Les termes suivants ne doivent pas etre convertis en implementation pendant le Sprint 02 :

- modele
- schema
- collection
- endpoint
- service
- controleur
- test
