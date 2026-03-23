"use client"

import { KpiCard } from "@/components/widgets/KpiCard"
import { BarChart } from "@/components/charts/BarChart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { brandboostConfig } from "@/config/brandboost.config"
import {
  salesKpis,
  monthlyRevenue,
  pipeline,
  activeDeals,
  repPerformance,
} from "@/data/brandboost/sales"

const fmt = (n: number) =>
  n >= 100000000
    ? `${(n / 100000000).toFixed(1)}억`
    : n >= 10000
    ? `${(n / 10000).toFixed(0)}만`
    : n.toLocaleString()

const stageColor: Record<string, string> = {
  리드: "#6366f1",
  미팅: "#8b5cf6",
  제안: "#06b6d4",
  협상: "#10b981",
  계약: "#f59e0b",
}

const dealStageColor: Record<string, string> = {
  리드: "secondary",
  미팅: "outline",
  제안: "outline",
  협상: "default",
  계약: "default",
}

export default function SalesPage() {
  const colors = brandboostConfig.colors

  const revenueChartData = monthlyRevenue.map((d) => ({
    month: d.month.slice(5),
    매출: d.revenue,
    목표: d.target,
  }))

  const repChartData = repPerformance.map((r) => ({
    name: r.name,
    매출: r.revenue,
  }))

  const maxPipelineValue = Math.max(...pipeline.map((p) => p.value))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">세일즈</h1>
        <p className="text-sm text-muted-foreground mt-0.5">매출, 파이프라인, 딜 현황</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="월 매출"
          value={fmt(salesKpis.mrr.value)}
          suffix="원"
          change={salesKpis.mrr.change}
        />
        <KpiCard
          title="파이프라인"
          value={fmt(salesKpis.pipelineValue.value)}
          suffix="원"
          change={salesKpis.pipelineValue.change}
        />
        <KpiCard
          title="승률"
          value={salesKpis.winRate.value}
          suffix="%"
          change={salesKpis.winRate.change}
        />
        <KpiCard
          title="평균 거래 규모"
          value={fmt(salesKpis.avgDealSize.value)}
          suffix="원"
          change={salesKpis.avgDealSize.change}
        />
        <KpiCard
          title="영업주기"
          value={salesKpis.avgSalesCycle.value}
          suffix="일"
          change={salesKpis.avgSalesCycle.change}
        />
        <KpiCard
          title="신규 딜"
          value={salesKpis.newDeals.value}
          suffix="건"
          change={salesKpis.newDeals.change}
        />
      </div>

      {/* 매출 차트 + 파이프라인 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">월별 매출 vs 목표 (12개월)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={revenueChartData}
              bars={[
                { key: "매출", label: "실제 매출", color: colors.primary },
                { key: "목표", label: "목표", color: "#e2e8f0" },
              ]}
              xKey="month"
              height={280}
              formatY={(v) => `${(v / 100000000).toFixed(0)}억`}
              formatTooltip={(v) => `${fmt(v)}원`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">파이프라인 현황</CardTitle>
            <CardDescription>단계별 거래 규모</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipeline.map((p) => (
                <div key={p.stage} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{p.stage}</span>
                    <span className="text-muted-foreground">{p.count}건</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(p.value / maxPipelineValue) * 100}%`,
                        backgroundColor: stageColor[p.stage] ?? colors.primary,
                      }}
                    />
                  </div>
                  <p className="text-xs text-right text-muted-foreground">{fmt(p.value)}원</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 딜 목록 + 담당자 성과 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">진행 중 딜</CardTitle>
            <CardDescription>가중 파이프라인 기준 정렬</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">회사</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">단계</th>
                    <th className="text-right py-2 px-3 font-medium text-muted-foreground">금액</th>
                    <th className="text-right py-2 px-3 font-medium text-muted-foreground">확률</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">담당</th>
                    <th className="text-left py-2 px-3 font-medium text-muted-foreground">예상마감</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDeals
                    .sort((a, b) => b.value * b.probability - a.value * a.probability)
                    .map((deal) => (
                      <tr key={deal.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-2.5 px-3">
                          <div className="font-medium">{deal.company}</div>
                          <div className="text-xs text-muted-foreground">{deal.contact}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <Badge variant={dealStageColor[deal.stage] as "default" | "secondary" | "outline"} className="text-xs">
                            {deal.stage}
                          </Badge>
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium">{fmt(deal.value)}원</td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className="font-semibold"
                            style={{ color: deal.probability >= 70 ? colors.primary : deal.probability >= 40 ? "#f59e0b" : "#94a3b8" }}
                          >
                            {deal.probability}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{deal.owner}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{deal.expectedClose}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">담당자별 성과</CardTitle>
            <CardDescription>이번 달</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {repPerformance
                .sort((a, b) => b.revenue - a.revenue)
                .map((rep, i) => (
                  <div key={rep.name} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: colors.chart[i % colors.chart.length],
                      }}
                    >
                      {rep.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{rep.name}</span>
                        <span>{fmt(rep.revenue)}원</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-0.5">
                        <span>{rep.deals}건 · 승률 {rep.winRate}%</span>
                        <span>평균 {fmt(rep.avgDeal)}원</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <BarChart
                data={repChartData}
                bars={[{ key: "매출", label: "매출", color: colors.primary }]}
                xKey="name"
                height={160}
                formatY={(v) => `${(v / 100000000).toFixed(0)}억`}
                formatTooltip={(v) => `${fmt(v)}원`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
