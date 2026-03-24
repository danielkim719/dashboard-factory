"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart } from "@/components/charts/BarChart"
import { Separator } from "@/components/ui/separator"
import { keeperConfig } from "@/config/keeper.config"
import { monthlyTargets, yearTarget } from "@/data/keeper/targets"
import { cohortFunnel } from "@/data/keeper/overview"
import { Target, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function KeeperTargetsPage() {
  const colors = keeperConfig.colors

  const active = monthlyTargets.filter((m) => m.actualLeads > 0)
  const current = active[active.length - 1]

  const ytdActualLeads = active.reduce((a, b) => a + b.actualLeads, 0)
  const ytdTargetLeads = active.reduce((a, b) => a + b.targetLeads, 0)
  const ytdActualDeals = active.reduce((a, b) => a + b.actualDeals, 0)
  const ytdTargetDeals = active.reduce((a, b) => a + b.targetDeals, 0)

  const ytdLeadRate = Math.round((ytdActualLeads / ytdTargetLeads) * 100)
  const ytdDealRate = Math.round((ytdActualDeals / ytdTargetDeals) * 100)

  const leadsChartData = monthlyTargets.map((m) => ({
    월: m.label,
    목표: m.targetLeads,
    실적: m.actualLeads > 0 ? m.actualLeads : 0,
  }))

  const dealsChartData = monthlyTargets.map((m) => ({
    월: m.label,
    목표: m.targetDeals,
    실적: m.actualDeals > 0 ? m.actualDeals : 0,
  }))

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">목표 달성률</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            한화비전 제시 2026 월간 목표 대비 실적
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-xs"
          style={{ borderColor: colors.primary, color: colors.primary }}
        >
          2026 연간 목표: 리드 {yearTarget.totalLeads.toLocaleString()} / 구매 {yearTarget.totalDeals.toLocaleString()}
        </Badge>
      </div>

      {/* YTD Hero Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* YTD 리드 달성률 */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div
            className="h-1.5"
            style={{
              background: ytdLeadRate >= 100
                ? "linear-gradient(90deg, #10b981, #34d399)"
                : ytdLeadRate >= 80
                ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                : "linear-gradient(90deg, #ef4444, #f87171)",
            }}
          />
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">YTD 리드 달성률</p>
            <div className="flex items-end gap-2 mt-1">
              <p
                className="text-3xl font-black"
                style={{
                  color: ytdLeadRate >= 100 ? "#10b981" : ytdLeadRate >= 80 ? "#f59e0b" : "#ef4444",
                }}
              >
                {ytdLeadRate}%
              </p>
              {ytdLeadRate >= 100 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-500 mb-1" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {ytdActualLeads.toLocaleString()} / {ytdTargetLeads.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* YTD 구매 달성률 */}
        <Card className="border-0 shadow-md overflow-hidden">
          <div
            className="h-1.5"
            style={{
              background: ytdDealRate >= 100
                ? "linear-gradient(90deg, #10b981, #34d399)"
                : ytdDealRate >= 80
                ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                : "linear-gradient(90deg, #ef4444, #f87171)",
            }}
          />
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">YTD 구매 달성률</p>
            <div className="flex items-end gap-2 mt-1">
              <p
                className="text-3xl font-black"
                style={{
                  color: ytdDealRate >= 100 ? "#10b981" : ytdDealRate >= 80 ? "#f59e0b" : "#ef4444",
                }}
              >
                {ytdDealRate}%
              </p>
              {ytdDealRate >= 100 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
              ) : ytdDealRate >= 80 ? (
                <AlertTriangle className="w-5 h-5 text-amber-500 mb-1" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500 mb-1" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {ytdActualDeals.toLocaleString()} / {ytdTargetDeals.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* 이번달 리드 */}
        {current && (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-1" style={{ backgroundColor: colors.primary }} />
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{current.label} 리드</p>
              <p className="text-2xl font-bold mt-1">
                {current.actualLeads.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / {current.targetLeads.toLocaleString()}
                </span>
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (current.actualLeads / current.targetLeads) * 100)}%`,
                    backgroundColor:
                      current.actualLeads >= current.targetLeads ? "#10b981" : colors.primary,
                  }}
                />
              </div>
              <p className="text-xs text-right mt-1" style={{ color: colors.primary }}>
                {Math.round((current.actualLeads / current.targetLeads) * 100)}%
              </p>
            </CardContent>
          </Card>
        )}

        {/* 이번달 구매 */}
        {current && (
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="h-1" style={{ backgroundColor: "#10b981" }} />
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{current.label} 구매</p>
              <p className="text-2xl font-bold mt-1">
                {current.actualDeals.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / {current.targetDeals.toLocaleString()}
                </span>
              </p>
              <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (current.actualDeals / current.targetDeals) * 100)}%`,
                    backgroundColor:
                      current.actualDeals >= current.targetDeals ? "#10b981" : "#ef4444",
                  }}
                />
              </div>
              <p
                className="text-xs text-right mt-1"
                style={{
                  color: current.actualDeals >= current.targetDeals ? "#10b981" : "#ef4444",
                }}
              >
                {Math.round((current.actualDeals / current.targetDeals) * 100)}%
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4" style={{ color: colors.primary }} />
              <p className="text-sm font-semibold">월별 리드 목표 vs 실적</p>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              회색 = 목표, 컬러 = 실적
            </p>
            <BarChart
              data={leadsChartData}
              bars={[
                { key: "목표", label: "목표 리드", color: "#e2e8f0" },
                { key: "실적", label: "실제 리드", color: colors.primary },
              ]}
              xKey="월"
              height={300}
              formatTooltip={(v) => `${v.toLocaleString()}건`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" style={{ color: "#10b981" }} />
              <p className="text-sm font-semibold">월별 구매 목표 vs 실적</p>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              회색 = 목표, 컬러 = 실적
            </p>
            <BarChart
              data={dealsChartData}
              bars={[
                { key: "목표", label: "목표 구매", color: "#e2e8f0" },
                { key: "실적", label: "실제 구매", color: "#10b981" },
              ]}
              xKey="월"
              height={300}
              formatTooltip={(v) => `${v.toLocaleString()}건`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Detail Table */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-4">월별 목표 달성 현황</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">월</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">목표 리드</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">실제 리드</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">리드 달성률</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">목표 구매</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">실제 구매</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">구매 달성률</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTargets.map((m) => {
                  const leadRate = m.actualLeads > 0 ? Math.round((m.actualLeads / m.targetLeads) * 100) : null
                  const dealRate = m.actualDeals > 0 ? Math.round((m.actualDeals / m.targetDeals) * 100) : null
                  const isFuture = m.actualLeads === 0

                  return (
                    <tr
                      key={m.month}
                      className={`border-b last:border-0 ${isFuture ? "opacity-40" : "hover:bg-muted/30"}`}
                    >
                      <td className="py-2.5 px-3 font-medium">{m.label}</td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground">
                        {m.targetLeads.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold">
                        {isFuture ? "-" : m.actualLeads.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {leadRate !== null ? (
                          <RateBadge rate={leadRate} />
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right text-muted-foreground">
                        {m.targetDeals.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-semibold">
                        {isFuture ? "-" : m.actualDeals.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {dealRate !== null ? (
                          <RateBadge rate={dealRate} />
                        ) : (
                          <span className="text-xs text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 font-bold">
                  <td className="py-2.5 px-3">연간 합계</td>
                  <td className="py-2.5 px-3 text-right text-muted-foreground">
                    {yearTarget.totalLeads.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right">{ytdActualLeads.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right">
                    <RateBadge rate={ytdLeadRate} />
                  </td>
                  <td className="py-2.5 px-3 text-right text-muted-foreground">
                    {yearTarget.totalDeals.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right">{ytdActualDeals.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right">
                    <RateBadge rate={ytdDealRate} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insight */}
      <Card
        style={{
          background:
            ytdDealRate >= 100
              ? "linear-gradient(135deg, #10b98110, #34d39908)"
              : "linear-gradient(135deg, #ef444410, #f8717108)",
        }}
      >
        <CardContent className="p-5">
          <p className="text-sm font-bold mb-2">
            {ytdDealRate >= 100 ? "목표 달성 중" : "목표 미달 — 분석"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground">리드 확보</p>
              <p className="text-sm font-bold" style={{ color: ytdLeadRate >= 100 ? "#10b981" : "#f59e0b" }}>
                {ytdLeadRate >= 100
                  ? `목표 초과 달성 (${ytdLeadRate}%)`
                  : `${100 - ytdLeadRate}%p 부족`}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground">구매 전환</p>
              <p className="text-sm font-bold" style={{ color: ytdDealRate >= 100 ? "#10b981" : "#ef4444" }}>
                {ytdDealRate >= 100
                  ? `목표 달성 (${ytdDealRate}%)`
                  : `${ytdTargetDeals - ytdActualDeals}건 부족`}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground">필요 전환율</p>
              <p className="text-sm font-bold" style={{ color: colors.accent }}>
                {ytdActualLeads > 0
                  ? `${((ytdTargetDeals / ytdActualLeads) * 100).toFixed(1)}% (현재 ${((ytdActualDeals / ytdActualLeads) * 100).toFixed(1)}%)`
                  : "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Funnel Conversion Trend ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">퍼널 전환율 월별 추이</p>
          <p className="text-xs text-muted-foreground mb-4">
            유입월 코호트별 퍼널 단계 전환율 (2025.12~)
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">통화 연결률</p>
              <BarChart
                data={cohortFunnel.map((c) => ({
                  월: c.month.slice(5),
                  통화연결률: c.connRate,
                }))}
                bars={[{ key: "통화연결률", label: "통화 연결률 (%)", color: colors.primary }]}
                xKey="월"
                height={220}
                formatY={(v) => `${v}%`}
                formatTooltip={(v) => `${v}%`}
              />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">결제 전환율</p>
              <BarChart
                data={cohortFunnel.map((c) => ({
                  월: c.month.slice(5),
                  결제전환율: c.dealRate,
                }))}
                bars={[{ key: "결제전환율", label: "결제 전환율 (%)", color: "#10b981" }]}
                xKey="월"
                height={220}
                formatY={(v) => `${v}%`}
                formatTooltip={(v) => `${v}%`}
              />
            </div>
          </div>
          <Separator className="my-4" />
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">유입월</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">총 리드</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">통화 연결</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">연결률</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">상담 진행</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">결제 완료</th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">전환율</th>
              </tr>
            </thead>
            <tbody>
              {cohortFunnel.map((c) => (
                <tr key={c.month} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="py-2 px-3 font-medium">{c.month}</td>
                  <td className="py-2 px-3 text-right">{c.total.toLocaleString()}</td>
                  <td className="py-2 px-3 text-right" style={{ color: colors.primary }}>{c.connected}</td>
                  <td className="py-2 px-3 text-right">
                    <RateBadge rate={c.connRate} />
                  </td>
                  <td className="py-2 px-3 text-right">{c.consulting}</td>
                  <td className="py-2 px-3 text-right text-emerald-600 font-semibold">{c.deals}</td>
                  <td className="py-2 px-3 text-right">
                    <RateBadge rate={c.dealRate} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

function RateBadge({ rate }: { rate: number }) {
  const color = rate >= 100 ? "#10b981" : rate >= 80 ? "#f59e0b" : "#ef4444"
  const bg = rate >= 100 ? "#10b98115" : rate >= 80 ? "#f59e0b15" : "#ef444415"

  return (
    <Badge
      variant="outline"
      className="text-xs font-bold"
      style={{ color, borderColor: color, backgroundColor: bg }}
    >
      {rate}%
    </Badge>
  )
}