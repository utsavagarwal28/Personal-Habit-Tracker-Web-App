import { describe, expect, it } from "vitest";
import {
  fromDateString,
  isValidDateString,
  toDateString,
} from "../src/lib/dates";

describe("dates", () => {
  it("formats a Date as YYYY-MM-DD", () => {
    expect(toDateString(new Date(2024, 0, 5))).toBe("2024-01-05");
    expect(toDateString(new Date(2024, 11, 31))).toBe("2024-12-31");
  });

  it("round-trips a date string", () => {
    const value = "2025-03-09";
    expect(toDateString(fromDateString(value))).toBe(value);
  });

  it("validates date strings", () => {
    expect(isValidDateString("2024-02-29")).toBe(true);
    expect(isValidDateString("2023-02-29")).toBe(false);
    expect(isValidDateString("2024-13-01")).toBe(false);
    expect(isValidDateString("not-a-date")).toBe(false);
  });
});
