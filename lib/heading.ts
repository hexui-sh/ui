export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export class HeadingSlugger {
  private occurrences = new Map<string, number>()

  reset(): void {
    this.occurrences.clear()
  }

  slug(value: string): string {
    const base = slugifyHeading(value) || "section"
    if (!this.occurrences.has(base)) {
      this.occurrences.set(base, 0)
      return base
    }
    let count = (this.occurrences.get(base) ?? 0) + 1
    while (this.occurrences.has(`${base}-${count}`)) {
      count += 1
    }
    this.occurrences.set(base, count)
    this.occurrences.set(`${base}-${count}`, 0)
    return `${base}-${count}`
  }
}