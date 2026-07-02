# Trading Integration

## Objectif

Le Sprint 12 connecte les Engines existants afin de verifier que le pipeline complet peut s'executer.

Il ne cree aucun nouveau moteur et aucune nouvelle fonctionnalite.

## Pipeline Final

```txt
TradingCore
-> MarketDataEngine
-> TechnicalAnalysisEngine
-> AIAnalysisEngine
-> RecommendationEngine
-> RecommendationResult
```

## Principe D'integration

L'integration repose sur des objets standardises.

Chaque Engine recoit une entree simple et retourne une sortie simple.

Aucun Engine ne connait l'implementation interne des autres Engines.

## IntegrationContext

`IntegrationContext` sert uniquement a transporter les informations entre les etapes.

Il ne contient :

- aucun calcul
- aucune regle metier
- aucune decision
- aucune methode metier

## RecommendationResult

`RecommendationResult` represente la sortie standardisee du pipeline.

Il reste stable et exploitable par les futures couches sans dependre d'une implementation interne.

## Regles

Le pipeline ne doit pas :

- appeler OpenAI reellement
- appeler une API HTTP
- lire ou ecrire MongoDB directement
- declencher de notification
- declencher de scheduler
- exposer une route Express
- afficher une interface React

## Evolution Future

Toute nouvelle etape devra etre validee dans un sprint dedie.

Aucune etape ne doit etre ajoutee dans le Sprint 12.
