# Contributing

## Workflow

1. Create a scoped branch.
2. Keep changes focused.
3. Run local validation.
4. Open a pull request with a clear summary.
5. Wait for review and CI.

## Branches

Use:

```txt
feature/<scope>
fix/<scope>
docs/<scope>
chore/<scope>
ci/<scope>
```

## Commits

Use concise commit messages with a clear type:

```txt
docs: add release guide
ci: add release quality workflow
chore: add root build command
```

## Code Style

Run formatting and linting before review:

```bash
corepack yarn format
corepack yarn lint
```

## Review

Reviews should check:

- behavioral scope
- ownership boundaries
- documentation updates
- lint and build status
- absence of unrelated changes

## Pull Requests

Pull requests should include:

- summary of changes
- validation commands run
- screenshots only when UI behavior changed
- linked ADR when architecture is affected

For Sprint 19 release work, pull requests must not add product features or alter architecture.
