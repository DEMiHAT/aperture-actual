# Aperture showcase

Standalone frontend copied from selected Beacon/Aperture source screens. The source repository the original Beacon repository is read-only reference material and is not used at runtime.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:8081. `npm run build` type-checks and creates `dist/`.

## Tours

`/beacon` offers Student and Faculty automatic walkthroughs. Each starts with one selection and advances on its own. Pause, replay, restart and exit are available. Camera movement respects reduced-motion preferences. A background tab pauses playback.

The copied student Dashboard, Assessment History, Analytics and faculty Dashboard, Submissions and Analytics components use local fixtures through presentation-only API adapters. Session setup and coding scenes are presentation adaptations of the repo's controls. No login, backend, camera, real student data, API credentials, or production actions are included. All sample people and results are fictional.

The header masks only the legal suffix in the supplied logo; the footer retains the full supplied lockup.

## Deployment

The existing `aperture-frontend` project directory is preserved. Vercel configuration overrides the old Next.js preset with Vite and serves `dist`. A repository-root configuration also supports projects whose root directory is the repository itself. Both support direct navigation to `/beacon` and its tour query parameters.
