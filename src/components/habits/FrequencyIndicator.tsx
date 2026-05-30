import type { FrequencyType } from "../../types";

interface FrequencyIndicatorProps {
  frequencyType: FrequencyType;
  targetCount: number;
}

/** Small badge describing a habit's frequency, e.g. "Daily" or "3x / week". */
export function FrequencyIndicator({
  frequencyType,
  targetCount,
}: FrequencyIndicatorProps) {
  const label =
    frequencyType === "daily" ? "Daily" : `${targetCount}x / week`;

  return (
    <span className="rounded-full bg-surface-light px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-surface-dark dark:text-gray-300">
      {label}
    </span>
  );
}
