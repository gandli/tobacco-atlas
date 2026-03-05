export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

