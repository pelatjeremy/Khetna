# Workflow Metier - Sprint 02

## Objectif

Ce document decrit le workflow metier cible de TradeAI au niveau conceptuel.

Il ne decrit aucune implementation technique.

## Workflow Principal

### 1. Definition du Portfolio

Le Portfolio represente le point d'entree du domaine.

Il regroupe les Positions et sert de base aux analyses futures.

### 2. Identification des Assets

Les Assets representent les instruments financiers concernes par le Portfolio.

Ils fournissent le vocabulaire commun permettant de relier Positions, donnees de marche et analyses.

### 3. Constitution des Positions

Les Positions decrivent l'exposition du Portfolio a chaque Asset.

Elles structurent la lecture du portefeuille sans definir de logique technique.

### 4. Capture du Contexte de Marche

Un Market Data Snapshot represente l'etat du marche au moment ou une analyse doit etre contextualisee.

Ce snapshot permet de comprendre pourquoi une analyse a ete produite dans un contexte donne.

### 5. Preparation du Perimetre d'Analyse

Le perimetre d'analyse peut concerner :

- un Portfolio
- une Position
- un Asset

Le perimetre determine les objets metier pris en compte dans l'analyse.

### 6. Production de l'AI Analysis

L'AI Analysis formalise une interpretation metier a partir du perimetre et du contexte.

Elle conserve la conclusion, les elements explicatifs et le lien avec les objets analyses.

### 7. Attribution d'un Score

Le Score synthetise l'evaluation issue de l'analyse.

Il permet de comparer plusieurs analyses dans le temps.

### 8. Historisation

Les History Events tracent les evenements importants du domaine.

Ils rendent le systeme auditable et facilitent la comprehension de l'evolution du Portfolio.

### 9. Consolidation Statistique

Les Statistics agregeront les informations utiles a une lecture globale.

Elles peuvent s'appuyer sur Positions, Scores et History Events.

### 10. Auto-Evaluation

La Self Evaluation permet de comparer une analyse a posteriori a l'evolution observee.

Elle sert a documenter les ecarts et a ameliorer la qualite des analyses futures.

## Flux Resume

| Etape                      | Entree                     | Sortie documentaire   |
| -------------------------- | -------------------------- | --------------------- |
| Definition du Portfolio    | Objectif de suivi          | Portfolio identifie   |
| Identification des Assets  | Instruments concernes      | Assets references     |
| Constitution des Positions | Expositions                | Positions formalisees |
| Capture du contexte        | Etat du marche             | Market Data Snapshot  |
| Preparation de l'analyse   | Perimetre + contexte       | Cadre d'analyse       |
| Analyse                    | Cadre d'analyse            | AI Analysis           |
| Scoring                    | AI Analysis                | Score                 |
| Historisation              | Evenements                 | History Events        |
| Statistiques               | Donnees consolidees        | Statistics            |
| Auto-evaluation            | Analyse + resultat observe | Self Evaluation       |

## Points de Controle

- Le Portfolio reste le point d'entree principal.
- Les Positions relient le Portfolio aux Assets.
- Les analyses doivent toujours avoir un perimetre clair.
- Le contexte de marche doit etre explicite.
- Le Score ne remplace pas l'analyse, il la synthetise.
- L'auto-evaluation intervient apres observation.

## Hors Perimetre

Ce workflow ne definit pas :

- orchestration technique
- job planifie
- recuperation de donnees
- endpoint API
- service backend
- modele de stockage
