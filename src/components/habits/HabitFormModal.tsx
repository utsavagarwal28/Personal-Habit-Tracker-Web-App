import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import {
  validateHabitInput,
  WEEKLY_TARGET_MAX,
  WEEKLY_TARGET_MIN,
  type HabitInput,
  type HabitValidationErrors,
} from "../../lib/habits";
import type { FrequencyType, Habit } from "../../types";

interface HabitFormModalProps {
  open: boolean;
  /** When provided, the form edits this habit; otherwise it creates a new one. */
  habit?: Habit | null;
  busy?: boolean;
  onSubmit: (input: HabitInput) => void;
  onClose: () => void;
}

const EMPTY: HabitInput = { name: "", frequencyType: "daily", targetCount: 1 };

export function HabitFormModal({
  open,
  habit,
  busy = false,
  onSubmit,
  onClose,
}: HabitFormModalProps) {
  const [form, setForm] = useState<HabitInput>(EMPTY);
  const [errors, setErrors] = useState<HabitValidationErrors>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      habit
        ? {
            name: habit.name,
            frequencyType: habit.frequencyType,
            targetCount: habit.targetCount,
          }
        : EMPTY,
    );
  }, [open, habit]);

  function handleFrequencyChange(frequencyType: FrequencyType) {
    setForm((prev) => ({
      ...prev,
      frequencyType,
      // Daily is always 1; weekly defaults to a sensible target.
      targetCount: frequencyType === "daily" ? 1 : Math.max(prev.targetCount, 1),
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const validationErrors = validateHabitInput(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form);
    }
  }

  return (
    <Modal
      open={open}
      title={habit ? "Edit habit" : "New habit"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Name</span>
          <input
            type="text"
            value={form.name}
            autoFocus
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="min-h-touch rounded-lg border border-gray-300 px-3 dark:border-gray-600 dark:bg-gray-700"
            placeholder="e.g. Drink water"
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
        </label>

        <fieldset className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Frequency</span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={form.frequencyType === "daily" ? "primary" : "secondary"}
              onClick={() => handleFrequencyChange("daily")}
              className="flex-1"
            >
              Daily
            </Button>
            <Button
              type="button"
              variant={form.frequencyType === "weekly" ? "primary" : "secondary"}
              onClick={() => handleFrequencyChange("weekly")}
              className="flex-1"
            >
              Weekly
            </Button>
          </div>
        </fieldset>

        {form.frequencyType === "weekly" && (
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Times per week</span>
            <input
              type="number"
              min={WEEKLY_TARGET_MIN}
              max={WEEKLY_TARGET_MAX}
              value={form.targetCount}
              onChange={(e) =>
                setForm((p) => ({ ...p, targetCount: Number(e.target.value) }))
              }
              className="min-h-touch rounded-lg border border-gray-300 px-3 dark:border-gray-600 dark:bg-gray-700"
            />
            {errors.targetCount && (
              <span className="text-xs text-red-500">{errors.targetCount}</span>
            )}
          </label>
        )}

        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : habit ? "Save changes" : "Add habit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
