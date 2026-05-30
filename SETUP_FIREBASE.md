# Firebase Setup Guide

Trackr uses Firebase Authentication (Google) and Firestore. Everything fits within the Firebase free (Spark) tier.

> Phase 1 scaffold: these steps connect the app to a real Firebase project. The
> repository ships with placeholder values in `.env.example` only — no real
> credentials are committed.

## 1. Create a Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com/) and click **Add project**.
2. Name it (e.g. `trackr`), and complete the wizard. Google Analytics is optional and not required.

## 2. Register a Web app

1. In the project, click the **Web** (`</>`) icon to add a web app.
2. Give it a nickname (e.g. `trackr-web`). Firebase Hosting is **not** needed (we deploy on Vercel).
3. Copy the `firebaseConfig` values shown — these map to the `.env` variables below.

## 3. Enable Google Authentication

1. **Build → Authentication → Get started**.
2. On the **Sign-in method** tab, enable **Google** and save.
3. (Optional) Under **Settings → Authorized domains**, add your Vercel domain when you deploy.

## 4. Create the Firestore database

1. **Build → Firestore Database → Create database**.
2. Start in **production mode** (we ship security rules).
3. Choose a region close to you.

## 5. Apply security rules and indexes

The repo includes [`firestore.rules`](./firestore.rules) and [`firestore.indexes.json`](./firestore.indexes.json).

Using the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,firestore:indexes
```

Or paste `firestore.rules` into the Firestore **Rules** tab of the console.

## 6. Configure environment variables

Copy `.env.example` to `.env` and fill in the values from step 2:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=<project-id>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<project-id>
VITE_FIREBASE_STORAGE_BUCKET=<project-id>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Then run `npm run dev` and sign in with Google.
