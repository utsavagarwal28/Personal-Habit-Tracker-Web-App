import { describe, expect, it } from "vitest";
import {
  HABIT_NAME_MAX_LENGTH,
  isValidHabitInput,
  normalizeHabitInput,
  validateHabitInput,
  type HabitInput,
} from "../src/lib/habits";

const daily: HabitInput = { name: "Drink Water", frequencyType: "daily", targetCount: 1 };
const weekly: HabitInput = { name: "Exercise", frequencyType: "weekly", targetCount: 3 };

describe("validateHabitInput", () => {
  it("accepts a valid daily habit", () => {
    expect(validateHabitInput(daily)).toEqual({});
    expect(isValidHabitInput(daily)).toBe(true);
  });

  it("accepts a valid weekly habit", () => {
    expect(validateHabitInput(weekly)).toEqual({});
    expect(isValidHabitInput(weekly)).toBe(true);
  });

  it("requires a non-empty name", () => {
    expect(validateHabitInput({ ...daily, name: "   " }).name).toBeDefined();
  });

  it("rejects names that are too long", () => {
    const name = "a".repeat(HABIT_NAME_MAX_LENGTH + 1);
    expect(validateHabitInput({ ...daily, name }).name).toBeDefined();
  });

  it("forces daily target to 1", () => {
    expect(validateHabitInput({ ...daily, targetCount: 3 }).targetCount).toBeDefined();
  });

  it("rejects weekly targets outside 1..7", () => {
    expect(validateHabitInput({ ...weekly, targetCount: 0 }).targetCount).toBeDefined();
    expect(validateHabitInput({ ...weekly, targetCount: 8 }).targetCount).toBeDefined();
  });

  it("rejects non-integer weekly targets", () => {
    expect(validateHabitInput({ ...weekly, targetCount: 2.5 }).targetCount).toBeDefined();
  });

  it("rejects an invalid frequency type", () => {
    const bad = { ...daily, frequencyType: "monthly" } as unknown as HabitInput;
    expect(validateHabitInput(bad).frequencyType).toBeDefined();
  });
});

describe("normalizeHabitInput", () => {
  it("trims the name and keeps weekly target", () => {
    expect(normalizeHabitInput({ ...weekly, name: "  Exercise  " })).toEqual({
      name: "Exercise",
      frequencyType: "weekly",
      targetCount: 3,
    });
  });

  it("forces daily target to 1", () => {
    expect(normalizeHabitInput(daily).targetCount).toBe(1);
  });

  it("throws on invalid input", () => {
    expect(() => normalizeHabitInput({ ...daily, name: "" })).toThrow();
  });
});
