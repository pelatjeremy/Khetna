# AI Analysis Engine

## Objectif

Le module AI Analysis Engine prepare l'integration future d'un moteur IA dans TradeAI.

Dans le Sprint 10, il ne contacte aucun provider reel.

## Architecture

```txt
packages/core/src/ai/
|-- AIAnalysisEngine.js
|-- AIAnalysisProvider.js
|-- PromptBuilder.js
|-- AIResponseMapper.js
`-- index.js
```

## Responsabilites

### AIAnalysisEngine

Orchestre une demande d'analyse IA.

Il recoit un contexte deja prepare, construit une structure de prompt, appelle un provider abstrait puis retourne une analyse normalisee.

### AIAnalysisProvider

Represente l'abstraction du futur fournisseur IA.

Dans ce sprint, il retourne uniquement une reponse simulee.

### PromptBuilder

Prepare une structure de prompt a partir d'un contexte.

Il ne contient aucune logique de trading complexe.

### AIResponseMapper

Transforme une reponse IA simulee en objet normalise exploitable.

## Principes

- aucun appel OpenAI reel
- aucun HTTP
- aucun acces MongoDB
- aucune decision finale de trading
- aucune regle metier complexe
- module isole et testable
