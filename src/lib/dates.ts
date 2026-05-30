/**
 * Date utilities. The canonical habit date is always a "YYYY-MM-DD" string
 * (never a Firestore Date object), per the data model requirements.
 */

/** Format a Date as a local "YYYY-MM-DD" string. */
export function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Parse a "YYYY-MM-DD" string into a local Date at midnight. */
export function fromDateString(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/** True when the value matches the "YYYY-MM-DD" format and is a real date. */
export function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return toDateString(fromDateString(value)) === value;
}
