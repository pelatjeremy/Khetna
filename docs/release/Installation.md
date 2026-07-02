# Installation

## Prerequisites

- Node.js compatible with the project dependencies
- Corepack enabled
- Yarn 4.9.2, managed through Corepack
- MongoDB Atlas connection string for database-backed usage
- Git for source control

## Node and Yarn

Enable Corepack:

```bash
corepack enable
```

Install dependencies:

```bash
corepack yarn install
```

## MongoDB Atlas

Create or reuse a MongoDB Atlas cluster and provide the connection string through `MONGODB_URI`.

## Environment Variables

Root example:

```env
MONGODB_URI=
API_PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

API and web examples are available in:

- `apps/api/.env.example`
- `apps/web/.env.example`

## First Launch

Start both local applications:

```bash
corepack yarn dev
```

Then verify:

- API health endpoint responds
- Web application starts on the configured Next.js port
- No lint or build error is present before release
