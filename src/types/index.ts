import type { Timestamp } from "firebase/firestore";

export type FrequencyType = "daily" | "weekly";

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  frequencyType: FrequencyType;
  targetCount: number;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface HabitLog {
  id: string;
  userId: string;
  habitId: string;
  /** Canonical habit date stored as a "YYYY-MM-DD" string (not a Firestore Date). */
  date: string;
  completed: boolean;
  completedAt: Timestamp;
}
