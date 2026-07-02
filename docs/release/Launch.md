# Launch

## Commands

Install dependencies:

```bash
corepack yarn install
```

Run the full development environment:

```bash
corepack yarn dev
```

Run only the API:

```bash
corepack yarn dev:api
```

Run only the web app:

```bash
corepack yarn dev:web
```

## Development Mode

Development mode starts the API with Node watch mode and the web app with Next.js development server.

## Build Mode

Run:

```bash
corepack yarn build
```

The V1 build target validates the Next.js web application.

## Production Mode

Build the project first, then start the relevant workspace production commands:

```bash
corepack yarn build
corepack yarn workspace @tradeai/web start
corepack yarn workspace @tradeai/api start
```

## Verification

Before a release, run:

```bash
corepack yarn lint
corepack yarn format
corepack yarn build
```

Check that environment variables are set and that the API and web application start without runtime errors.
