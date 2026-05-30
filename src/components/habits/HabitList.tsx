import { useState } from "react";
import { HabitRow } from "./HabitRow";
import { HabitFormModal } from "./HabitFormModal";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { Button } from "../ui/Button";
import { useHabits } from "../../hooks/useHabits";
import { useAuth } from "../../context/AuthContext";
import { createHabit, deleteHabit, updateHabit } from "../../firebase/habits";
import type { HabitInput } from "../../lib/habits";
import type { Habit } from "../../types";

export function HabitList() {
  const { user } = useAuth();
  const { habits, loading, error } = useHabits();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Habit | null>(null);
  const [deleting, setDeleting] = useState<Habit | null>(null);
  const [busy, setBusy] = useState(false);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(habit: Habit) {
    setEditing(habit);
    setFormOpen(true);
  }

  async function handleSubmit(input: HabitInput) {
    if (!user) return;
    setBusy(true);
    try {
      if (editing) {
        await updateHabit(editing.id, input);
      } else {
        await createHabit(user.uid, input);
      }
      setFormOpen(false);
      setEditing(null);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      await deleteHabit(deleting.id);
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Habits</h2>
        <Button onClick={openCreate}>Add habit</Button>
      </div>

      {loading && <p className="text-sm text-gray-400">Loading habits…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && habits.length === 0 && (
        <p className="text-sm text-gray-400">
          No habits yet. Add your first one to get started.
        </p>
      )}

      {habits.length > 0 && (
        <ul className="flex flex-col gap-2">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onEdit={openEdit}
              onDelete={setDeleting}
            />
          ))}
        </ul>
      )}

      <HabitFormModal
        open={formOpen}
        habit={editing}
        busy={busy}
        onSubmit={handleSubmit}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
      />

      <ConfirmDialog
        open={deleting !== null}
        title="Delete habit"
        message={
          deleting
            ? `Delete "${deleting.name}"? This cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        busy={busy}
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </section>
  );
}
