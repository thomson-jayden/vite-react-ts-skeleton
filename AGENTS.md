# Frontend App Guidelines

These instructions apply to the frontend app in `apps/frontend/`.

## App Structure

- Keep frontend application code and app-specific configuration within `apps/frontend/`.
- Keep shared setup and operational documentation in `docs/`, and CI/CD workflows in `.github/workflows/`.

## Working on the Frontend

- Follow the app-specific instructions in `apps/frontend/AGENTS.md` for running and verifying the Vite app.
- Keep dependency manifests covered by `.github/dependabot.yml`; avoid redundant update entries.
- Update relevant documentation and workflows when frontend setup, behavior, testing, or deployment changes.
