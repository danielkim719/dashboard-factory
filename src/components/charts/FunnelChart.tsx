"use client"

type FunnelStage = {
  label: string
  count: number
  rate: number | null
  color: string
}

type FunnelChartProps = {
  stages: FunnelStage[]
  height?: number
}

export function FunnelChart({ stages, height = 320 }: FunnelChartProps) {
  const maxCount = stages[0]?.count ?? 1

  return (
    <div className="flex flex-col items-center gap-0" style={{ minHeight: height }}>
      {stages.map((stage, i) => {
        const widthPct = Math.max(20, (stage.count / maxCount) * 100)
        const nextWidthPct = stages[i + 1]
          ? Math.max(20, (stages[i + 1].count / maxCount) * 100)
          : widthPct

        return (
          <div key={stage.label} className="w-full flex flex-col items-center">
            {/* Stage bar */}
            <div
              className="relative flex items-center justify-center text-white font-semibold text-sm transition-all duration-500"
              style={{
                width: `${widthPct}%`,
                minHeight: 48,
                backgroundColor: stage.color,
                clipPath: `polygon(0 0, 100% 0, ${50 + nextWidthPct / 2}% 100%, ${50 - nextWidthPct / 2}% 100%)`,
                borderRadius: i === 0 ? "8px 8px 0 0" : undefined,
              }}
            >
              <div className="flex flex-col items-center z-10 pb-1">
                <span className="text-xs font-medium opacity-90">{stage.label}</span>
                <span className="text-lg font-bold leading-tight">
                  {stage.count.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Conversion rate badge */}
            {stage.rate !== null && i > 0 && (
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-px h-3 bg-border" />
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${stage.color}15`,
                    color: stage.color,
                  }}
                >
                  {stage.rate}%
                </span>
                <div className="w-px h-3 bg-border" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}