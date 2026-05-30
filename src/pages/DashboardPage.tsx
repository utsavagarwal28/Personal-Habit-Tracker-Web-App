import { signOut } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import { HabitList } from "../components/habits/HabitList";

/**
 * Dashboard. Habit management lands in Phase 2; streak summary and calendar
 * arrive in later phases.
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

      <p className="mt-2 text-sm text-gray-400">
        Signed in as {user?.displayName || user?.email}.
      </p>

      <main className="mt-8">
        <HabitList />
      </main>
    </div>
  );
}
