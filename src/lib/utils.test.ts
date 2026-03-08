import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("foo", "bar");
    expect(result).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base", isActive && "active");
    expect(result).toBe("base active");
  });

  it("should handle falsy values", () => {
    const result = cn("base", false && "hidden", null, undefined);
    expect(result).toBe("base");
  });

  it("should merge tailwind classes correctly", () => {
    // twMerge should handle conflicting tailwind classes
    const result = cn("px-4 py-2", "px-6");
    expect(result).toBe("py-2 px-6");
  });

  it("should handle object notation", () => {
    const result = cn({ active: true, disabled: false });
    expect(result).toBe("active");
  });

  it("should handle array notation", () => {
    const result = cn(["foo", "bar"], "baz");
    expect(result).toBe("foo bar baz");
  });

  it("should merge conflicting margin classes", () => {
    const result = cn("m-4", "m-8");
    expect(result).toBe("m-8");
  });

  it("should handle complex tailwind class merging", () => {
    const result = cn(
      "flex items-center justify-center",
      "flex-col",
      "text-sm font-medium"
    );
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("flex-col");
  });

  it("should handle empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  it("should handle various class types", () => {
    const result = cn(
      "text-primary",
      { "bg-background": true },
      ["rounded-lg", "shadow-md"],
      undefined,
      null
    );
    expect(result).toContain("text-primary");
    expect(result).toContain("bg-background");
    expect(result).toContain("rounded-lg");
    expect(result).toContain("shadow-md");
  });
});