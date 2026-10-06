# vite-react-ts-skeleton

A Vite + React + TypeScript starter with the default logo-and-counter page.
No backend or API proxy is required.

## Development

```sh
npm ci
npm run dev --workspace=frontend
```

Run `npm run test:e2e`, `npm run lint`, and `npm run build` from the repository
root to verify the app.

## Deployment

The CD workflow deploys `apps/frontend/dist` to GitHub Pages and sets the
production base path to `/<repository-name>/`. Local builds default to `/`;
set `VITE_BASE_PATH` when building for another deployment subpath.
