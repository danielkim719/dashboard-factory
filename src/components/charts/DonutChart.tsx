"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

type DonutChartProps = {
  data: { name: string; value: number }[]
  colors: string[]
  height?: number
  innerRadius?: number
  outerRadius?: number
  formatTooltip?: (value: number) => string
}

export function DonutChart({
  data,
  colors,
  height = 300,
  innerRadius = 60,
  outerRadius = 90,
  formatTooltip,
}: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [
            formatTooltip ? formatTooltip(Number(value)) : `${value}%`,
            name,
          ]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            fontSize: "12px",
          }}
        />
        <Legend iconType="circle" iconSize={8} />
      </PieChart>
    </ResponsiveContainer>
  )
}
