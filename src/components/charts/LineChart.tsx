"use client"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type LineConfig = {
  key: string
  label: string
  color: string
}

type LineChartProps = {
  data: Record<string, string | number>[]
  lines: LineConfig[]
  xKey: string
  height?: number
  formatY?: (value: number) => string
  formatTooltip?: (value: number) => string
}

export function LineChart({
  data,
  lines,
  xKey,
  height = 300,
  formatY,
  formatTooltip,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
            lines.find((l) => l.key === String(name))?.label ?? String(name),
          ]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            fontSize: "12px",
          }}
        />
        <Legend
          formatter={(value) => lines.find((l) => l.key === value)?.label ?? value}
          iconType="circle"
          iconSize={8}
        />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
