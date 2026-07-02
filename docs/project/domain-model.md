# Domain Model - Sprint 02

## Objectif

Ce document formalise le domaine metier de TradeAI avant toute implementation backend.

Le Domain Model sert de reference fonctionnelle pour les prochains sprints. Il ne decrit pas de schema technique, de collection MongoDB, de route API ou de service applicatif.

## Principes

- Le domaine est decrit avant le stockage.
- Les objets metier sont separes selon leurs responsabilites.
- Les relations expriment le sens fonctionnel, pas une implementation.
- Les termes du glossaire sont la source officielle de vocabulaire.

## Objets Metier

### Portfolio

Un Portfolio represente l'ensemble des positions et de l'historique associes a une strategie ou a un compte de trading.

Responsabilites principales :

- regrouper les positions
- fournir une vision consolidee de l'exposition
- porter l'historique des changements significatifs
- servir de point d'entree aux analyses

Relations :

- contient plusieurs Positions
- reference plusieurs Assets via ses Positions
- possede un historique d'evenements
- peut etre analyse par une AI Analysis

### Asset

Un Asset represente un instrument financier suivi par TradeAI.

Responsabilites principales :

- identifier un instrument financier
- porter les informations de reference necessaires a l'analyse
- etre associe aux positions et donnees de marche

Relations :

- peut etre reference par plusieurs Positions
- peut etre associe a plusieurs Market Data Snapshots
- peut apparaitre dans plusieurs Analyses

### Position

Une Position represente l'exposition du Portfolio a un Asset.

Responsabilites principales :

- decrire la quantite detenue
- representer le sens de l'exposition
- conserver les donnees necessaires a l'evaluation de la position
- participer au calcul de l'exposition du Portfolio

Relations :

- appartient a un Portfolio
- reference un Asset
- peut etre evaluee dans une AI Analysis
- peut contribuer a des Statistics

### Market Data Snapshot

Un Market Data Snapshot represente un etat observe du marche a un instant donne.

Responsabilites principales :

- figer un contexte de marche
- fournir les donnees d'entree aux analyses
- rendre une analyse explicable dans son contexte temporel

Relations :

- concerne un ou plusieurs Assets
- peut etre utilise par une AI Analysis
- peut alimenter des Statistics

### AI Analysis

Une AI Analysis represente une analyse produite sur un Portfolio, une Position ou un Asset a partir d'un contexte donne.

Responsabilites principales :

- conserver le perimetre analyse
- conserver le contexte utilise
- exposer une conclusion metier
- porter un Score
- etre historisee pour comparaison future

Relations :

- analyse un Portfolio, une Position ou un Asset
- utilise un Market Data Snapshot
- produit ou reference un Score
- peut etre reliee a une Self Evaluation

### Score

Un Score represente une evaluation synthetique issue d'une analyse.

Responsabilites principales :

- resumer une evaluation metier
- permettre la comparaison entre analyses
- expliciter les dimensions evaluees
- rester interpretable par un utilisateur

Relations :

- appartient a une AI Analysis
- peut contribuer a des Statistics
- peut etre compare a des scores historiques

### History Event

Un History Event represente un evenement significatif du domaine.

Responsabilites principales :

- tracer les changements importants
- contextualiser les analyses passees
- permettre un suivi chronologique du Portfolio

Relations :

- peut concerner un Portfolio, une Position, un Asset ou une AI Analysis
- contribue a l'historique global

### Statistics

Les Statistics representent des indicateurs agreges calcules a partir du domaine.

Responsabilites principales :

- offrir une lecture synthetique du Portfolio
- suivre l'evolution des scores
- aider a comparer les analyses dans le temps

Relations :

- peuvent s'appuyer sur des Positions
- peuvent s'appuyer sur des Scores
- peuvent s'appuyer sur des History Events

### Self Evaluation

Une Self Evaluation represente l'evaluation a posteriori d'une analyse ou d'une decision.

Responsabilites principales :

- comparer une analyse a son resultat observe
- aider a ameliorer la qualite des analyses futures
- documenter les ecarts entre intention, analyse et realite

Relations :

- reference une AI Analysis
- peut utiliser des History Events
- peut contribuer a des Statistics

## Relations Principales

| Source          | Relation        | Cible                               |
| --------------- | --------------- | ----------------------------------- |
| Portfolio       | contient        | Position                            |
| Position        | reference       | Asset                               |
| Asset           | est observe via | Market Data Snapshot                |
| AI Analysis     | analyse         | Portfolio, Position ou Asset        |
| AI Analysis     | utilise         | Market Data Snapshot                |
| AI Analysis     | produit         | Score                               |
| History Event   | trace           | Changement metier                   |
| Statistics      | agregent        | Positions, Scores et History Events |
| Self Evaluation | evalue          | AI Analysis                         |

## Cycle de Vie Fonctionnel

1. Le Portfolio est defini comme point central.
2. Les Assets sont identifies.
3. Les Positions relient le Portfolio aux Assets.
4. Un contexte de marche est capture.
5. Une AI Analysis est produite sur un perimetre donne.
6. Un Score synthetise l'analyse.
7. Les History Events tracent les etapes importantes.
8. Les Statistics consolident les informations.
9. Une Self Evaluation peut comparer l'analyse a posteriori.

## Hors Perimetre

Ce document ne definit pas :

- schema MongoDB
- modele Mongoose
- route API
- service backend
- controleur
- composant frontend
- logique executable
