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

export function FunnelChart({ stages, height = 360 }: FunnelChartProps) {
  const n = stages.length
  // Each stage gets a proportionally decreasing width
  // First stage = 100%, last stage = proportional to its count, middle stages interpolate
  const maxCount = stages[0]?.count ?? 1
  const minWidthPct = Math.max(18, (stages[n - 1]?.count / maxCount) * 100)

  // Assign widths: use logarithmic scale to exaggerate differences when values are close
  const widths = stages.map((stage) => {
    const ratio = stage.count / maxCount
    // Apply power curve to spread out similar values
    const curved = Math.pow(ratio, 0.4)
    return Math.max(minWidthPct, curved * 100)
  })

  const stageHeight = Math.floor((height - (n - 1) * 28) / n)

  return (
    <div className="flex flex-col items-center gap-0" style={{ minHeight: height }}>
      {stages.map((stage, i) => {
        const topWidth = widths[i]
        const bottomWidth = i < n - 1 ? widths[i + 1] : topWidth * 0.85

        return (
          <div key={stage.label} className="w-full flex flex-col items-center">
            {/* Stage trapezoid */}
            <div
              className="relative flex items-center justify-center text-white font-semibold transition-all duration-500"
              style={{
                width: `${topWidth}%`,
                height: stageHeight,
                backgroundColor: stage.color,
                clipPath: `polygon(0 0, 100% 0, ${50 + (bottomWidth / topWidth) * 50}% 100%, ${50 - (bottomWidth / topWidth) * 50}% 100%)`,
                borderRadius: i === 0 ? "10px 10px 0 0" : undefined,
              }}
            >
              <div className="flex flex-col items-center z-10">
                <span className="text-xs font-medium opacity-80">{stage.label}</span>
                <span className="text-xl font-black leading-tight">
                  {stage.count.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Conversion rate badge between stages */}
            {i < n - 1 && stages[i + 1].rate !== null && (
              <div className="flex items-center gap-1.5 py-1">
                <div
                  className="w-6 h-px"
                  style={{ backgroundColor: `${stages[i + 1].color}40` }}
                />
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${stages[i + 1].color}12`,
                    color: stages[i + 1].color,
                    border: `1px solid ${stages[i + 1].color}25`,
                  }}
                >
                  {stages[i + 1].rate}%
                </span>
                <div
                  className="w-6 h-px"
                  style={{ backgroundColor: `${stages[i + 1].color}40` }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}