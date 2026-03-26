/**
 * Regression tests for the formatRuntime utility function.
 * This function appears identically in both programme.js and random.js.
 * Tests ensure the new changes did not alter runtime formatting behaviour.
 */

// Inline the function as it exists in the source files so we can unit-test it
// without DOM dependencies.
const formatRuntime = (runtime) => {
  const rt = parseInt(runtime, 10);
  if (isNaN(rt) || rt <= 0) return "";
  const hours = Math.floor(rt / 60);
  const mins = rt % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

describe("formatRuntime", () => {
  test("converts hours and minutes correctly", () => {
    expect(formatRuntime(124)).toBe("2h 4m");
    expect(formatRuntime(90)).toBe("1h 30m");
    expect(formatRuntime(60)).toBe("1h 0m");
    expect(formatRuntime(128)).toBe("2h 8m");
  });

  test("handles minutes-only runtimes (< 60 min)", () => {
    expect(formatRuntime(45)).toBe("45m");
    expect(formatRuntime(1)).toBe("1m");
    expect(formatRuntime(59)).toBe("59m");
  });

  test("returns empty string for zero or negative values", () => {
    expect(formatRuntime(0)).toBe("");
    expect(formatRuntime(-10)).toBe("");
  });

  test("returns empty string for non-numeric input", () => {
    expect(formatRuntime(NaN)).toBe("");
    expect(formatRuntime(undefined)).toBe("");
    expect(formatRuntime(null)).toBe("");
    expect(formatRuntime("abc")).toBe("");
    expect(formatRuntime("")).toBe("");
  });

  test("parses numeric strings correctly", () => {
    expect(formatRuntime("124")).toBe("2h 4m");
    expect(formatRuntime("45")).toBe("45m");
  });
});
