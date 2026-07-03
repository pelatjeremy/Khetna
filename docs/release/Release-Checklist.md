# Release Checklist

## Documentation

- [x] README describes TradeAI V2.0.0
- [x] Architecture documentation exists
- [x] Developer guide exists
- [x] User guide exists
- [x] Installation guide exists
- [x] Launch guide exists
- [x] Contributing guide exists
- [x] Changelog exists
- [x] Final V2 release ADR exists
- [x] License exists

## Quality

- [x] `corepack yarn install` succeeds
- [x] `corepack yarn lint` succeeds
- [x] `corepack yarn format` succeeds
- [x] `corepack yarn build` succeeds

## CI

- [x] GitHub Actions workflow exists
- [x] CI installs dependencies
- [x] CI runs lint
- [x] CI runs build
- [x] CI has no deployment step

## Tests

- [x] `tests/unit` exists
- [x] `tests/integration` exists
- [x] No business test is added during Sprint V2-13

## Release

- [x] Documentation is complete
- [x] No new feature is introduced
- [x] Architecture remains unchanged
- [x] V2.0.0 release scope is stabilization only
- [x] V3 and new feature work remain out of scope
- [x] Final validation commands have been run successfully
