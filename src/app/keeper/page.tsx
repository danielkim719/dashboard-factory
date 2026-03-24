"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart } from "@/components/charts/BarChart"
import { DonutChart } from "@/components/charts/DonutChart"
import { LineChart } from "@/components/charts/LineChart"
import { FunnelChart } from "@/components/charts/FunnelChart"
import { keeperConfig } from "@/config/keeper.config"
import {
  kpis,
  funnel,
  monthlyData,
  utmSources,
  entryPaths,
  temperatureData,
  leadTimeBuckets,
} from "@/data/keeper/overview"
import {
  TrendingUp,
  Phone,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  ThermometerSun,
} from "lucide-react"

const fmt = (n: number) =>
  n >= 100000000
    ? `${(n / 100000000).toFixed(1)}억`
    : n >= 10000
    ? `${(n / 10000).toFixed(0)}만`
    : n.toLocaleString()

export default function KeeperOverviewPage() {
  const colors = keeperConfig.colors

  const funnelStages = funnel.map((s, i) => ({
    ...s,
    color: colors.chart[i % colors.chart.length],
  }))

  const monthlyChartData = monthlyData.slice(-7).map((d) => ({
    month: d.month.slice(5),
    유입: d.total,
    성공: d.success,
    실패: d.fail,
  }))

  const resultDonut = [
    { name: "성공", value: kpis.successCount },
    { name: "실패", value: kpis.failCount },
    { name: "B2B", value: kpis.b2bCount },
    { name: "진행중", value: kpis.inProgressCount },
  ]

  const utmChartData = utmSources
    .filter((u) => u.source !== "(미추적)")
    .slice(0, 8)
    .map((u) => ({
      채널: u.source.length > 10 ? u.source.slice(0, 10) + ".." : u.source,
      전환율: u.rate,
      리드수: u.total,
    }))

  return (
    <div className="space-y-6 max-w-7xl">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">콜 세일즈 성과 Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            한화비전 키퍼 · 2025.05 ~ 2026.03 통합 분석
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-xs"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          {kpis.totalLeads.toLocaleString()} 리드
        </Badge>
      </div>

      {/* ── Hero KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            icon: <Target className="w-4 h-4" />,
            label: "총 리드",
            value: kpis.totalLeads.toLocaleString(),
            suffix: "건",
            accent: colors.primary,
          },
          {
            icon: <CheckCircle2 className="w-4 h-4" />,
            label: "결제 완료",
            value: kpis.successCount.toLocaleString(),
            suffix: "건",
            accent: "#10b981",
          },
          {
            icon: <TrendingUp className="w-4 h-4" />,
            label: "전환율",
            value: `${kpis.conversionRate}`,
            suffix: "%",
            accent: colors.accent,
          },
          {
            icon: <Clock className="w-4 h-4" />,
            label: "리드타임 (중앙값)",
            value: `${kpis.medianLeadTimeDays}`,
            suffix: "일",
            accent: colors.secondary,
          },
          {
            icon: <Zap className="w-4 h-4" />,
            label: "총 매출",
            value: fmt(kpis.totalRevenue),
            suffix: "원",
            accent: "#f59e0b",
          },
        ].map((kpi) => (
          <Card
            key={kpi.label}
            className="border-0 shadow-sm overflow-hidden"
          >
            <div
              className="h-1"
              style={{ backgroundColor: kpi.accent }}
            />
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.accent}15`, color: kpi.accent }}
                >
                  {kpi.icon}
                </div>
                <span className="text-xs text-muted-foreground">{kpi.label}</span>
              </div>
              <p className="text-2xl font-bold">
                {kpi.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {kpi.suffix}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Funnel + Result Donut ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Funnel - 깔때기 */}
        <Card className="lg:col-span-3">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-4 h-4" style={{ color: colors.primary }} />
              <p className="text-sm font-semibold">세일즈 퍼널</p>
              <span className="text-xs text-muted-foreground">
                리드 유입 → 결제 완료
              </span>
            </div>
            <FunnelChart stages={funnelStages} height={340} />
          </CardContent>
        </Card>

        {/* Result Donut */}
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-1">최종 결과 분포</p>
            <p className="text-xs text-muted-foreground mb-3">
              전체 {kpis.totalLeads.toLocaleString()}건
            </p>
            <DonutChart
              data={resultDonut}
              colors={["#10b981", "#ef4444", colors.secondary, "#94a3b8"]}
              height={200}
              innerRadius={55}
              outerRadius={80}
              formatTooltip={(v) => `${v.toLocaleString()}건`}
            />
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-2">
              {resultDonut.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: ["#10b981", "#ef4444", colors.secondary, "#94a3b8"][i],
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-semibold ml-auto">
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({((item.value / kpis.totalLeads) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Monthly Trend ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">월별 리드 유입 & 전환</p>
          <p className="text-xs text-muted-foreground mb-4">
            실제 유입일 기준 (리캐치 보정 적용)
          </p>
          <LineChart
            data={monthlyChartData}
            lines={[
              { key: "유입", label: "리드 유입", color: colors.primary },
              { key: "성공", label: "결제 완료", color: "#10b981" },
            ]}
            xKey="month"
            height={280}
            formatTooltip={(v) => `${v.toLocaleString()}건`}
          />
        </CardContent>
      </Card>

      {/* ── Channel Summary ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">채널별 전환율</p>
          <p className="text-xs text-muted-foreground mb-4">
            UTM Source 기준 (미추적 제외)
          </p>
          <BarChart
            data={utmChartData}
            bars={[{ key: "전환율", label: "전환율 (%)", color: colors.accent }]}
            xKey="채널"
            height={240}
            formatY={(v) => `${v}%`}
            formatTooltip={(v) => `${v}%`}
          />
        </CardContent>
      </Card>

      {/* ── Bottom Detail: Entry Path + Temperature + Lead Time ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Entry Path */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-3">진입경로별 전환율</p>
            <div className="space-y-2">
              {entryPaths.slice(0, 8).map((ep) => (
                <div key={ep.path} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{ep.path}</p>
                    <p className="text-xs text-muted-foreground">
                      {ep.total.toLocaleString()}건
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs font-bold ml-2"
                    style={
                      ep.rate >= 15
                        ? { color: "#10b981", borderColor: "#10b981", backgroundColor: "#10b98110" }
                        : ep.rate >= 8
                        ? { color: colors.accent, borderColor: colors.accent, backgroundColor: `${colors.accent}10` }
                        : {}
                    }
                  >
                    {ep.rate}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Temperature */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ThermometerSun className="w-4 h-4" style={{ color: "#f59e0b" }} />
              <p className="text-sm font-semibold">온도감별 전환율</p>
            </div>
            <div className="space-y-3">
              {temperatureData.map((t) => {
                const tempColor =
                  t.level === "상"
                    ? "#ef4444"
                    : t.level === "중"
                    ? "#f59e0b"
                    : t.level === "하"
                    ? "#3b82f6"
                    : "#94a3b8"
                return (
                  <div key={t.level}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tempColor }}
                        />
                        <span className="text-sm font-medium">{t.level}</span>
                        <span className="text-xs text-muted-foreground">
                          {t.total.toLocaleString()}건
                        </span>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: tempColor }}
                      >
                        {t.rate}%
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(t.rate / 20) * 100}%`,
                          backgroundColor: tempColor,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Lead Time Distribution */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4" style={{ color: colors.secondary }} />
              <p className="text-sm font-semibold">리드타임 분포</p>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              유입 → 결제 (성공건, n={leadTimeBuckets.reduce((a, b) => a + b.count, 0)})
            </p>
            <BarChart
              data={leadTimeBuckets.map((b) => ({
                구간: b.range,
                건수: b.count,
              }))}
              bars={[{ key: "건수", label: "건수", color: colors.secondary }]}
              xKey="구간"
              height={180}
              formatTooltip={(v) => `${v}건`}
            />
            <Separator className="my-3" />
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-xs text-muted-foreground">평균</p>
                <p className="text-lg font-bold" style={{ color: colors.secondary }}>
                  {kpis.avgLeadTimeDays}일
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">중앙값</p>
                <p className="text-lg font-bold" style={{ color: colors.primary }}>
                  {kpis.medianLeadTimeDays}일
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Monthly Detail Table ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-4">월별 상세 현황</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">월</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">총 유입</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">성공</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">실패</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">B2B</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">진행중</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">전환율</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((d) => {
                  const rate = d.total > 0 ? ((d.success / d.total) * 100).toFixed(1) : "0.0"
                  return (
                    <tr key={d.month} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="py-2 px-3 font-medium">{d.month}</td>
                      <td className="py-2 px-3 text-right">{d.total.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-emerald-600 font-semibold">
                        {d.success}
                      </td>
                      <td className="py-2 px-3 text-right text-red-500">{d.fail}</td>
                      <td className="py-2 px-3 text-right" style={{ color: colors.secondary }}>
                        {d.b2b}
                      </td>
                      <td className="py-2 px-3 text-right text-muted-foreground">{d.pending}</td>
                      <td className="py-2 px-3 text-right">
                        <Badge
                          variant="outline"
                          className="text-xs font-bold"
                          style={
                            Number(rate) >= 10
                              ? { color: "#10b981", borderColor: "#10b981" }
                              : Number(rate) >= 7
                              ? { color: colors.accent, borderColor: colors.accent }
                              : {}
                          }
                        >
                          {rate}%
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
