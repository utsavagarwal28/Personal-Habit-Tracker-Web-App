import { useEffect, useState } from "react";
import { subscribeToHabits } from "../firebase/habits";
import { useAuth } from "../context/AuthContext";
import type { Habit } from "../types";

interface UseHabitsResult {
  habits: Habit[];
  loading: boolean;
  error: string | null;
}

/** Subscribes to the current user's habits in real time. */
export function useHabits(): UseHabitsResult {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToHabits(
      user.uid,
      (next) => {
        setHabits(next);
        setLoading(false);
        setError(null);
      },
      () => {
        setError("Failed to load habits.");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  return { habits, loading, error };
}
