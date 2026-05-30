import { useState } from "react";
import { Navigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { user, loading } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  async function handleSignIn() {
    setError(null);
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch {
      setError("Sign-in failed. Please try again.");
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-accent-dark">Trackr</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Build better habits, one day at a time.
        </p>
      </div>

      <button
        type="button"
        onClick={handleSignIn}
        disabled={signingIn}
        className="min-h-touch rounded-lg bg-accent px-6 py-3 font-medium text-white shadow-sm transition hover:bg-accent-dark disabled:opacity-60"
      >
        {signingIn ? "Signing in…" : "Continue with Google"}
      </button>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
