# UML - Entites Metier

## Objectif

Ce document decrit les entites metier de TradeAI et leurs relations sous forme UML documentaire.

Aucun schema technique ni code n'est defini ici.

## Entites

| Entite               | Role                                                       |
| -------------------- | ---------------------------------------------------------- |
| Portfolio            | Point central du domaine, regroupe positions et historique |
| Asset                | Instrument financier suivi                                 |
| Position             | Exposition du Portfolio a un Asset                         |
| Market Data Snapshot | Contexte de marche observe a un instant donne              |
| AI Analysis          | Analyse metier d'un perimetre donne                        |
| Score                | Evaluation synthetique issue d'une analyse                 |
| History Event        | Trace d'un evenement metier significatif                   |
| Statistics           | Indicateurs agreges issus du domaine                       |
| Self Evaluation      | Evaluation a posteriori d'une analyse                      |

## Relations UML Documentaires

| Relation                              | Cardinalite | Description                                                   |
| ------------------------------------- | ----------- | ------------------------------------------------------------- |
| Portfolio vers Position               | 1 vers 0..n | Un Portfolio peut contenir plusieurs Positions                |
| Position vers Asset                   | n vers 1    | Une Position reference un seul Asset                          |
| Asset vers Market Data Snapshot       | 1 vers 0..n | Un Asset peut etre observe dans plusieurs contextes de marche |
| Portfolio vers AI Analysis            | 1 vers 0..n | Un Portfolio peut faire l'objet de plusieurs analyses         |
| Position vers AI Analysis             | 1 vers 0..n | Une Position peut faire l'objet de plusieurs analyses         |
| Asset vers AI Analysis                | 1 vers 0..n | Un Asset peut faire l'objet de plusieurs analyses             |
| AI Analysis vers Market Data Snapshot | n vers 1    | Une analyse s'appuie sur un contexte de marche                |
| AI Analysis vers Score                | 1 vers 0..1 | Une analyse peut produire un score                            |
| Portfolio vers History Event          | 1 vers 0..n | Un Portfolio peut avoir un historique d'evenements            |
| AI Analysis vers Self Evaluation      | 1 vers 0..1 | Une analyse peut etre evaluee a posteriori                    |
| Statistics vers Score                 | 1 vers 0..n | Des statistiques peuvent agreger plusieurs scores             |
| Statistics vers History Event         | 1 vers 0..n | Des statistiques peuvent s'appuyer sur l'historique           |

## Vue Textuelle

Portfolio est l'agregat fonctionnel principal.

Portfolio contient des Positions.

Chaque Position reference un Asset.

Un Asset peut etre observe via des Market Data Snapshots.

Une AI Analysis porte sur un Portfolio, une Position ou un Asset, et s'appuie sur un Market Data Snapshot.

Une AI Analysis peut produire un Score.

Les History Events documentent les evenements significatifs.

Les Statistics consolident les informations issues des Positions, Scores et History Events.

Une Self Evaluation peut evaluer une AI Analysis a posteriori.

## Hors Perimetre

Ce document ne definit pas :

- classes techniques
- schemas de base de donnees
- interfaces
- methodes
- endpoints
- services
