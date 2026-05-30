import type { FrequencyType } from "../types";

/** User-provided fields for creating or editing a habit. */
export interface HabitInput {
  name: string;
  frequencyType: FrequencyType;
  targetCount: number;
}

/** Normalized, validated habit fields ready to persist. */
export interface NormalizedHabit {
  name: string;
  frequencyType: FrequencyType;
  targetCount: number;
}

export const HABIT_NAME_MAX_LENGTH = 60;

/** Weekly habits run "X times per week"; X is 1..7. Daily is always 1. */
export const WEEKLY_TARGET_MIN = 1;
export const WEEKLY_TARGET_MAX = 7;

export type HabitValidationErrors = Partial<Record<keyof HabitInput, string>>;

/**
 * Validates raw habit input. Returns a map of field -> error message;
 * an empty object means the input is valid.
 */
export function validateHabitInput(input: HabitInput): HabitValidationErrors {
  const errors: HabitValidationErrors = {};

  const name = input.name.trim();
  if (name.length === 0) {
    errors.name = "Name is required.";
  } else if (name.length > HABIT_NAME_MAX_LENGTH) {
    errors.name = `Name must be ${HABIT_NAME_MAX_LENGTH} characters or fewer.`;
  }

  if (input.frequencyType !== "daily" && input.frequencyType !== "weekly") {
    errors.frequencyType = "Frequency must be daily or weekly.";
  }

  if (input.frequencyType === "daily") {
    if (input.targetCount !== 1) {
      errors.targetCount = "Daily habits must have a target of 1.";
    }
  } else if (input.frequencyType === "weekly") {
    if (!Number.isInteger(input.targetCount)) {
      errors.targetCount = "Weekly target must be a whole number.";
    } else if (
      input.targetCount < WEEKLY_TARGET_MIN ||
      input.targetCount > WEEKLY_TARGET_MAX
    ) {
      errors.targetCount = `Weekly target must be between ${WEEKLY_TARGET_MIN} and ${WEEKLY_TARGET_MAX}.`;
    }
  }

  return errors;
}

/** True when the input passes all validation rules. */
export function isValidHabitInput(input: HabitInput): boolean {
  return Object.keys(validateHabitInput(input)).length === 0;
}

/**
 * Normalizes valid input for persistence: trims the name and forces
 * daily habits to a target of 1. Throws if the input is invalid.
 */
export function normalizeHabitInput(input: HabitInput): NormalizedHabit {
  if (!isValidHabitInput(input)) {
    throw new Error("Cannot normalize invalid habit input.");
  }
  return {
    name: input.name.trim(),
    frequencyType: input.frequencyType,
    targetCount: input.frequencyType === "daily" ? 1 : input.targetCount,
  };
}
