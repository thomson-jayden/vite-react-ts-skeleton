# Repository Guidelines

These instructions apply to the entire repository.

## Repository Structure

- `apps/<app-name>/` contains independently buildable and deployable units. Each direct child is one deployable application. The current examples are `apps/api/` and `apps/frontend/`.
- `modules/<module-name>/` contains independently referenceable, API-oriented modules. A module should be portable enough to move to another API or become part of a future microservice. A C# class library referenced by an API is one example; modules are not restricted to a specific language.
- `.github/workflows/` contains GitHub Actions workflows for CI/CD pipelines.
- `docs/` contains architecture, setup, operational, and other repository documentation.

## Naming Conventions

- Use lowercase kebab-case slugs for directories directly under `apps/` and `modules/`.
- Name the project directory under each slug `App.<PascalCaseSlug>` for applications or `Module.<PascalCaseSlug>` for modules. Convert the slug to PascalCase by removing hyphens.
- Match the `.csproj` filename to the project directory name.
- For example, `apps/api/App.Api/App.Api.csproj` and `modules/weather-forecast/Module.WeatherForecast/Module.WeatherForecast.csproj`.

## Architecture Rules

- Keep application-specific code within the application that owns it.
- Do not create direct dependencies between applications under `apps/`. Extract genuinely reusable API capabilities into a module instead.
- Give each module a clear public contract and keep it independent of any specific API host.
- Modules may define their own configuration contracts and service registration, but must not depend on a specific API's startup code, configuration layout, or deployment topology.
- Keep deployment and pipeline definitions in `.github/workflows/`; keep supporting explanations and operational guidance in `docs/`.

## Working in This Repository

- Add new deployable units as direct children of `apps/`.
- Add reusable, portable API capabilities as direct children of `modules/`.
- When adding an app or module, check that every dependency manifest is covered by `.github/dependabot.yml`, accounting for existing workspace-level entries. Add a weekly update entry for each uncovered ecosystem and directory; for NuGet, use the directory containing the project file. Avoid redundant entries and validate the YAML.
- Update relevant documentation when architecture, setup, or operational behavior changes.
- Update relevant workflows when build, test, release, or deployment behavior changes.
