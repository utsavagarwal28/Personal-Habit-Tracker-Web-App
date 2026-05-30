import { signOut } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

/**
 * Phase 1 placeholder dashboard. Habit list, streak summary, and calendar
 * are implemented in later phases.
 */
export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto flex h-full max-w-md flex-col px-4 py-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-accent-dark">Trackr</h1>
        <button
          type="button"
          onClick={() => void signOut()}
          className="min-h-touch rounded-lg px-3 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
        >
          Sign out
        </button>
      </header>

      <main className="mt-8">
        <p className="text-gray-600 dark:text-gray-300">
          Signed in as {user?.displayName || user?.email}.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Habits, streaks, and calendar arrive in the next phases.
        </p>
      </main>
    </div>
  );
}
