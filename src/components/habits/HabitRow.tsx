import { FrequencyIndicator } from "./FrequencyIndicator";
import { Button } from "../ui/Button";
import type { Habit } from "../../types";

interface HabitRowProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

export function HabitRow({ habit, onEdit, onDelete }: HabitRowProps) {
  return (
    <li className="flex min-h-touch items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-2 dark:border-gray-700">
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium">{habit.name}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <FrequencyIndicator
          frequencyType={habit.frequencyType}
          targetCount={habit.targetCount}
        />
        <Button
          variant="ghost"
          onClick={() => onEdit(habit)}
          aria-label={`Edit ${habit.name}`}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          onClick={() => onDelete(habit)}
          aria-label={`Delete ${habit.name}`}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
