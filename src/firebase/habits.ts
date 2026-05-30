import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import type { Habit } from "../types";
import { normalizeHabitInput, type HabitInput } from "../lib/habits";

const HABITS_COLLECTION = "habits";

function mapHabit(snapshot: QueryDocumentSnapshot): Habit {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    userId: data.userId,
    name: data.name,
    frequencyType: data.frequencyType,
    targetCount: data.targetCount,
    active: data.active,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

/**
 * Subscribe to a user's habits, ordered by creation time.
 * Returns an unsubscribe function.
 */
export function subscribeToHabits(
  userId: string,
  onChange: (habits: Habit[]) => void,
  onError?: (error: Error) => void,
): () => void {
  const habitsQuery = query(
    collection(db, HABITS_COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "asc"),
  );

  return onSnapshot(
    habitsQuery,
    (snapshot) => onChange(snapshot.docs.map(mapHabit)),
    (error) => onError?.(error),
  );
}

/** Create a new active habit for the user. Returns the new document id. */
export async function createHabit(
  userId: string,
  input: HabitInput,
): Promise<string> {
  const normalized = normalizeHabitInput(input);
  const ref = await addDoc(collection(db, HABITS_COLLECTION), {
    userId,
    name: normalized.name,
    frequencyType: normalized.frequencyType,
    targetCount: normalized.targetCount,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Update an existing habit's editable fields. */
export async function updateHabit(
  habitId: string,
  input: HabitInput,
): Promise<void> {
  const normalized = normalizeHabitInput(input);
  await updateDoc(doc(db, HABITS_COLLECTION, habitId), {
    name: normalized.name,
    frequencyType: normalized.frequencyType,
    targetCount: normalized.targetCount,
    updatedAt: serverTimestamp(),
  });
}

/** Permanently delete a habit. */
export async function deleteHabit(habitId: string): Promise<void> {
  await deleteDoc(doc(db, HABITS_COLLECTION, habitId));
}
