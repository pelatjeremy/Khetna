# TradeAI

TradeAI est une plateforme de trading assistee par IA. Ce depot contient uniquement les fondations techniques du projet pour le Sprint 01.

Ce sprint ne contient aucune logique metier.

## Stack

- Monorepo Yarn Workspaces
- Next.js, React et Redux Toolkit pour `apps/web`
- Node.js et Express pour `apps/api`
- MongoDB Atlas via Mongoose dans `packages/database`
- ESLint, Prettier, Husky et lint-staged

## Structure

```txt
apps/
  web/
  api/

packages/
  database/
  shared/
  prompts/

docs/
  adr/
  project/
```

## Installation

```bash
yarn install
```

## Commandes

```bash
yarn dev
yarn dev:web
yarn dev:api
yarn lint
yarn format
```

## Variables d'environnement

Copier les fichiers `.env.example` en fichiers `.env` locaux si necessaire.

Variables principales :

```env
MONGODB_URI=
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API technique

L'API expose uniquement une route technique :

```txt
GET /health
```

## Conventions Git

Commandes recommandees pour preparer la livraison du sprint :

```bash
git checkout -b feature/project-foundation
git add .
git commit -m "chore: initialize project foundation"
git push origin feature/project-foundation
```

## Documentation

- ADR : `docs/adr`
- Documentation projet : `docs/project`
