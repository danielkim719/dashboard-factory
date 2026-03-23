"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

type BarConfig = {
  key: string
  label: string
  color: string
}

type BarChartProps = {
  data: Record<string, string | number>[]
  bars: BarConfig[]
  xKey: string
  height?: number
  formatY?: (value: number) => string
  formatTooltip?: (value: number) => string
  referenceLineValue?: number
  referenceLineLabel?: string
  stacked?: boolean
}

export function BarChart({
  data,
  bars,
  xKey,
  height = 300,
  formatY,
  formatTooltip,
  referenceLineValue,
  referenceLineLabel,
  stacked = false,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatY}
          className="text-muted-foreground"
        />
        <Tooltip
          formatter={(value, name) => [
            formatTooltip ? formatTooltip(Number(value)) : Number(value).toLocaleString(),
            bars.find((b) => b.key === String(name))?.label ?? String(name),
          ]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            fontSize: "12px",
          }}
        />
        <Legend
          formatter={(value) => bars.find((b) => b.key === value)?.label ?? value}
          iconType="square"
          iconSize={8}
        />
        {referenceLineValue !== undefined && (
          <ReferenceLine
            y={referenceLineValue}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            label={{ value: referenceLineLabel, position: "insideTopRight", fontSize: 11 }}
          />
        )}
        {bars.map((bar) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={bar.color}
            radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
            stackId={stacked ? "stack" : undefined}
            maxBarSize={48}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
