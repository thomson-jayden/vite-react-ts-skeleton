# Frontend Agent Instructions

## Running the Vite App

- From the repository root, start the frontend with `npm run dev --workspace=frontend`.
- To pass Vite options from the repository root, use `npm run dev --workspace=frontend -- --host 127.0.0.1`. The extra `--` forwards options through npm to Vite.
- Avoid appending Vite options to the root `npm run dev` script unless that script forwards them; otherwise an option value can be treated as Vite's project-root path.

## Browser Verification

- Before interpreting a Playwright screenshot, confirm the page responds successfully and inspect browser errors. A blank screenshot can be a 404 caused by starting Vite with the wrong project root, rather than a blank app.
