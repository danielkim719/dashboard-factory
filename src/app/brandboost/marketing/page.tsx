"use client"

import { KpiCard } from "@/components/widgets/KpiCard"
import { LineChart } from "@/components/charts/LineChart"
import { DonutChart } from "@/components/charts/DonutChart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { brandboostConfig } from "@/config/brandboost.config"
import {
  marketingKpis,
  monthlyTraffic,
  campaigns,
  channelShare,
  marketingFunnel,
} from "@/data/brandboost/marketing"

const fmt = (n: number) =>
  n >= 100000000
    ? `${(n / 100000000).toFixed(1)}억`
    : n >= 10000
    ? `${(n / 10000).toFixed(0)}만`
    : n.toLocaleString()

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "운영중", variant: "default" },
  paused: { label: "일시정지", variant: "secondary" },
  ended: { label: "종료", variant: "outline" },
}

export default function MarketingPage() {
  const colors = brandboostConfig.colors

  const trafficData = monthlyTraffic.map((d) => ({
    month: d.month.slice(5),
    오가닉: d.organic,
    유료: d.paid,
    소셜: d.social,
    다이렉트: d.direct,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">마케팅</h1>
        <p className="text-sm text-muted-foreground mt-0.5">채널 성과, 캠페인, 리드 퍼널</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="총 리드"
          value={marketingKpis.totalLeads.value.toLocaleString()}
          change={marketingKpis.totalLeads.change}
        />
        <KpiCard
          title="CPL"
          value={fmt(marketingKpis.cpl.value)}
          suffix="원"
          change={marketingKpis.cpl.change}
        />
        <KpiCard
          title="총 광고비"
          value={fmt(marketingKpis.totalSpend.value)}
          suffix="원"
          change={marketingKpis.totalSpend.change}
        />
        <KpiCard
          title="평균 ROAS"
          value={marketingKpis.avgRoas.value}
          suffix="x"
          change={marketingKpis.avgRoas.change}
        />
        <KpiCard
          title="오가닉 트래픽"
          value={marketingKpis.organicTraffic.value.toLocaleString()}
          change={marketingKpis.organicTraffic.change}
        />
        <KpiCard
          title="전환율"
          value={marketingKpis.conversionRate.value}
          suffix="%"
          change={marketingKpis.conversionRate.change}
        />
      </div>

      {/* 트래픽 + 채널 점유율 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">채널별 트래픽 (12개월)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={trafficData}
              lines={[
                { key: "오가닉", label: "오가닉", color: colors.primary },
                { key: "유료", label: "유료", color: colors.secondary },
                { key: "소셜", label: "소셜", color: colors.accent },
                { key: "다이렉트", label: "다이렉트", color: colors.chart[3] },
              ]}
              xKey="month"
              height={280}
              formatY={(v) => `${(v / 1000).toFixed(0)}k`}
              formatTooltip={(v) => v.toLocaleString()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">채널 점유율</CardTitle>
            <CardDescription>이번 달</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={channelShare}
              colors={colors.chart}
              height={280}
              formatTooltip={(v) => `${v}%`}
            />
          </CardContent>
        </Card>
      </div>

      {/* 리드 퍼널 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">마케팅 퍼널</CardTitle>
          <CardDescription>노출 → SQL 전환 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketingFunnel.map((stage, i) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-36 text-sm text-muted-foreground shrink-0">{stage.stage}</div>
                <div className="flex-1 bg-muted rounded-full h-7 relative overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-3 transition-all"
                    style={{
                      width: `${stage.rate}%`,
                      backgroundColor: colors.chart[i % colors.chart.length],
                      opacity: 1 - i * 0.1,
                    }}
                  >
                    <span className="text-xs text-white font-medium">
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-16 text-right text-sm font-medium shrink-0">
                  {stage.rate.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 캠페인 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">캠페인 성과</CardTitle>
          <CardDescription>진행중 및 최근 종료 캠페인</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">캠페인</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">채널</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">예산</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">집행</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">노출</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">전환</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">ROAS</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">상태</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-2.5 px-3 font-medium">{c.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{c.channel}</td>
                    <td className="py-2.5 px-3 text-right">{fmt(c.budget)}원</td>
                    <td className="py-2.5 px-3 text-right">{fmt(c.spend)}원</td>
                    <td className="py-2.5 px-3 text-right">{(c.impressions / 10000).toFixed(0)}만</td>
                    <td className="py-2.5 px-3 text-right">{c.conversions.toLocaleString()}</td>
                    <td
                      className="py-2.5 px-3 text-right font-semibold"
                      style={{ color: c.roas >= 3 ? colors.primary : "#ef4444" }}
                    >
                      {c.roas}x
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge variant={statusConfig[c.status].variant} className="text-xs">
                        {statusConfig[c.status].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
