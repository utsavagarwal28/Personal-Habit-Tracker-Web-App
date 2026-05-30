import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./config";

const googleProvider = new GoogleAuthProvider();

/**
 * Ensures a `users/{uid}` document exists for the signed-in user.
 * Created once on first login; never overwrites existing fields.
 */
async function ensureUserDocument(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      createdAt: serverTimestamp(),
    });
  }
}

/** Sign in with Google (the only supported auth provider). */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  await ensureUserDocument(result.user);
  return result.user;
}

/** Sign the current user out. */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
