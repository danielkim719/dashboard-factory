"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

type KpiCardProps = {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  suffix?: string
  prefix?: string
  description?: string
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel,
  suffix,
  prefix,
  description,
}: KpiCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral = change === undefined || change === 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">
              {prefix}
              {value}
              {suffix}
            </p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {change !== undefined && (
            <Badge
              variant="outline"
              className={`flex items-center gap-1 text-xs font-medium ${
                isPositive
                  ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                  : isNegative
                  ? "text-red-500 border-red-200 bg-red-50"
                  : "text-muted-foreground"
              }`}
            >
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {isNeutral && <Minus className="w-3 h-3" />}
              {isPositive ? "+" : ""}
              {change}%{changeLabel ? ` ${changeLabel}` : ""}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}