# Responsabilites des Objets Metier

## Objectif

Ce document precise les responsabilites de chaque objet metier du Trading Core.

Il ne definit aucun comportement executable.

## Portfolio

Responsabilites :

- regrouper les Positions
- representer le perimetre principal de suivi
- fournir une vision consolidee des expositions
- servir de point d'entree aux analyses
- porter un historique metier

N'est pas responsable de :

- recuperer des donnees de marche
- executer une analyse
- stocker techniquement les donnees

## Asset

Responsabilites :

- identifier un instrument financier
- permettre aux Positions de referencer un instrument commun
- servir de point de rattachement aux contextes de marche

N'est pas responsable de :

- porter une strategie
- calculer un score
- declencher une analyse

## Position

Responsabilites :

- representer l'exposition a un Asset
- relier un Portfolio a un Asset
- contribuer a la lecture globale du Portfolio

N'est pas responsable de :

- analyser le risque
- produire une recommandation
- evaluer la performance globale

## Market Data Snapshot

Responsabilites :

- representer un contexte de marche date
- contextualiser une AI Analysis
- fournir une base de comparaison future

N'est pas responsable de :

- recuperer les donnees de marche
- garantir la source technique des donnees
- produire une decision

## AI Analysis

Responsabilites :

- formaliser une interpretation metier
- documenter le perimetre analyse
- conserver le contexte utilise
- porter une conclusion
- etre associee a un Score si necessaire

N'est pas responsable de :

- executer un modele IA
- appeler un fournisseur externe
- modifier le Portfolio

## Score

Responsabilites :

- synthetiser une evaluation
- faciliter la comparaison entre analyses
- rendre l'analyse plus lisible

N'est pas responsable de :

- remplacer l'analyse
- prendre une decision
- expliquer seul le contexte complet

## History Event

Responsabilites :

- tracer un evenement significatif
- maintenir une chronologie metier
- renforcer l'auditabilite du domaine

N'est pas responsable de :

- recalculer les statistiques
- produire une analyse
- modifier les objets suivis

## Statistics

Responsabilites :

- consolider des indicateurs metier
- donner une vue synthetique du domaine
- aider a comparer l'evolution dans le temps

N'est pas responsable de :

- definir la verite metier source
- remplacer les History Events
- produire une analyse qualitative

## Self Evaluation

Responsabilites :

- evaluer une AI Analysis a posteriori
- documenter les ecarts entre analyse et evolution observee
- contribuer a l'amelioration des analyses futures

N'est pas responsable de :

- produire l'analyse initiale
- modifier le Score original
- declencher une decision automatique
