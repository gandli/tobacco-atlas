import { Badge } from "@/components/ui/Badge"
import type { ReactNode } from "react"

export function SectionHeader({
  title,
  subtitle,
  badge,
  right,
}: {
  title: string
  subtitle?: string
  badge?: string
  right?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          {badge ? <Badge tone="accent">{badge}</Badge> : null}
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        </div>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </div>
      {right}
    </div>
  )
}
