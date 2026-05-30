# Trackr — Personal Habit Tracker

Tracker is a minimalist personal habit-tracking Progressive Web App (PWA) designed for a single user with future multi-user expansion capability.

Primary goals: create habits, track daily/weekly completion, visualize consistency, maintain streaks, export personal data — all on free-tier hosting.

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- Firebase Authentication (Google) + Firestore
- Vercel (hosting)

## Getting Started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env   # then fill in your Firebase config
npm run dev
```

The app runs at http://localhost:5173.

## Environment Variables

All Firebase configuration is provided via `VITE_`-prefixed env vars. See [`.env.example`](./.env.example) for the full list:

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain (`<project>.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

See [`SETUP_FIREBASE.md`](./SETUP_FIREBASE.md) for how to obtain these.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |
| `npm run test` | Run unit tests (Vitest) |

## Project Structure

```
src/
  lib/         pure, unit-tested logic (dates, streaks, calendar, csv)
  firebase/    Firebase init, auth, and Firestore access
  context/     React context providers (auth, theme)
  components/  shared + feature UI components
  pages/       route-level pages (login, dashboard, settings)
  types/       shared TypeScript types
tests/         unit tests for the logic layer
firestore.rules        Firestore security rules (owner-only access)
firestore.indexes.json Firestore composite indexes
```

## Documentation

Product specs live in [`/docs`](./docs). Implementation follows them strictly — no features beyond what is specified.
