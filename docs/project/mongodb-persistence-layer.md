# MongoDB Persistence Layer

## Objectif

La couche `packages/database` est responsable uniquement de la persistance des donnees.

Elle ne contient aucune logique metier.

## Architecture

```text
packages/database/
`-- src/
    |-- connection/
    |-- models/
    |-- schemas/
    |-- plugins/
    `-- index.js
```

## Role des Dossiers

### connection/

Gestion de la connexion MongoDB.

### schemas/

Definition des schemas Mongoose.

### models/

Creation des modeles a partir des schemas.

### plugins/

Plugins Mongoose reutilisables sans logique metier.

### index.js

Point d'entree unique exportant la connexion et les modeles.

## Ajouter un Nouveau Modele

1. Creer le schema dans `schemas/`.
2. Creer le modele dans `models/`.
3. Exporter le modele dans `index.js`.
4. Verifier :
   - timestamps ;
   - validations ;
   - index ;
   - references ObjectId ;
   - absence de logique metier.

## Principes

- Les modeles decrivent uniquement la structure des donnees.
- Les calculs seront realises dans les Business Services.
- Les modeles restent passifs et reutilisables.
