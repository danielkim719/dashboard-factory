"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart } from "@/components/charts/BarChart"
import { DonutChart } from "@/components/charts/DonutChart"
import { LineChart } from "@/components/charts/LineChart"
import { Separator } from "@/components/ui/separator"
import { keeperConfig } from "@/config/keeper.config"
import { utmSources, entryPaths, channelCohorts } from "@/data/keeper/overview"

export default function KeeperChannelsPage() {
  const colors = keeperConfig.colors

  const utmBarData = utmSources.map((u) => ({
    채널: u.source.length > 12 ? u.source.slice(0, 12) + ".." : u.source,
    리드수: u.total,
    성공: u.success,
  }))

  const utmDonut = utmSources
    .filter((u) => u.source !== "(미추적)")
    .slice(0, 6)
    .map((u) => ({ name: u.source, value: u.total }))

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold">채널 분석</h1>
        <p className="text-sm text-muted-foreground mt-0.5">UTM Source 및 진입경로별 성과</p>
      </div>

      {/* UTM Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {utmSources.slice(0, 4).map((u) => (
          <Card key={u.source} className="border-0 shadow-sm">
            <div className="h-1" style={{ backgroundColor: colors.primary }} />
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground truncate">{u.source}</p>
              <p className="text-2xl font-bold mt-1">{u.total.toLocaleString()}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{u.success}건 성공</span>
                <Badge
                  variant="outline"
                  className="text-xs font-bold"
                  style={
                    u.rate >= 10
                      ? { color: "#10b981", borderColor: "#10b981" }
                      : {}
                  }
                >
                  {u.rate}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* UTM Bar Chart */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4">채널별 리드 수 & 성공</p>
            <BarChart
              data={utmBarData}
              bars={[
                { key: "리드수", label: "전체 리드", color: colors.primary },
                { key: "성공", label: "결제 성공", color: "#10b981" },
              ]}
              xKey="채널"
              height={320}
              formatTooltip={(v) => `${v.toLocaleString()}건`}
            />
          </CardContent>
        </Card>

        {/* UTM Donut */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4">채널 비중 (추적 건)</p>
            <DonutChart
              data={utmDonut}
              colors={colors.chart}
              height={320}
              innerRadius={70}
              outerRadius={110}
              formatTooltip={(v) => `${v.toLocaleString()}건`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Entry Path Table */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-4">진입경로별 상세</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">진입경로</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">총 리드</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">성공</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">전환율</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">비중</th>
                </tr>
              </thead>
              <tbody>
                {entryPaths.map((ep) => (
                  <tr key={ep.path} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-2 px-3 font-medium">{ep.path}</td>
                    <td className="py-2 px-3 text-right">{ep.total.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-emerald-600 font-semibold">{ep.success}</td>
                    <td className="py-2 px-3 text-right">
                      <Badge
                        variant="outline"
                        className="text-xs font-bold"
                        style={
                          ep.rate >= 15
                            ? { color: "#10b981", borderColor: "#10b981", backgroundColor: "#10b98110" }
                            : ep.rate >= 8
                            ? { color: colors.accent, borderColor: colors.accent }
                            : {}
                        }
                      >
                        {ep.rate}%
                      </Badge>
                    </td>
                    <td className="py-2 px-3 text-right text-muted-foreground">
                      {((ep.total / 3856) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── Channel Funnel Trend ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">채널별 퍼널 전환율 추이</p>
          <p className="text-xs text-muted-foreground mb-4">
            주요 채널의 월별 통화연결률 & 결제전환율 (2025.12~)
          </p>

          {(() => {
            const channels = ["naver", "naver.searchad", "facebook.business", "cashnote", "danggeun_market"]
            const channelLabels: Record<string, string> = {
              "naver": "Naver 오가닉",
              "naver.searchad": "Naver 검색광고",
              "facebook.business": "Facebook/IG",
              "cashnote": "캐시노트",
              "danggeun_market": "당근마켓",
            }
            const months = ["2025-12", "2026-01", "2026-02", "2026-03"]

            const connData = months.map((m) => {
              const row: Record<string, string | number> = { 월: m.slice(5) }
              channels.forEach((ch) => {
                const found = channelCohorts.find((c) => c.month === m && c.channel === ch)
                row[channelLabels[ch]] = found && found.total > 0 ? found.connRate : 0
              })
              return row
            })

            const dealData = months.map((m) => {
              const row: Record<string, string | number> = { 월: m.slice(5) }
              channels.forEach((ch) => {
                const found = channelCohorts.find((c) => c.month === m && c.channel === ch)
                row[channelLabels[ch]] = found && found.total > 0 ? found.dealRate : 0
              })
              return row
            })

            const lineColors = [colors.accent, colors.primary, "#8b5cf6", "#f59e0b", "#10b981"]
            const lines = channels.map((ch, i) => ({
              key: channelLabels[ch],
              label: channelLabels[ch],
              color: lineColors[i],
            }))

            return (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">통화 연결률 추이 (%)</p>
                  <LineChart
                    data={connData}
                    lines={lines}
                    xKey="월"
                    height={280}
                    formatY={(v) => `${v}%`}
                    formatTooltip={(v) => `${v}%`}
                  />
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">결제 전환율 추이 (%)</p>
                  <LineChart
                    data={dealData}
                    lines={lines}
                    xKey="월"
                    height={280}
                    formatY={(v) => `${v}%`}
                    formatTooltip={(v) => `${v}%`}
                  />
                </div>
              </div>
            )
          })()}

          <Separator className="my-4" />

          {/* Channel detail table */}
          <p className="text-xs font-medium text-muted-foreground mb-2">채널 × 월별 상세</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">채널</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">월</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">리드</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">통화연결</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">연결률</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">결제</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">전환율</th>
                </tr>
              </thead>
              <tbody>
                {["naver", "naver.searchad", "facebook.business", "cashnote", "danggeun_market"].map((ch) =>
                  channelCohorts
                    .filter((c) => c.channel === ch && c.total > 0)
                    .map((c, i, arr) => (
                      <tr key={`${c.channel}-${c.month}`} className="border-b last:border-0 hover:bg-muted/30">
                        {i === 0 && (
                          <td className="py-1.5 px-2 font-medium align-top" rowSpan={arr.length}>
                            {c.channel}
                          </td>
                        )}
                        <td className="py-1.5 px-2 text-right text-muted-foreground">{c.month.slice(5)}</td>
                        <td className="py-1.5 px-2 text-right">{c.total}</td>
                        <td className="py-1.5 px-2 text-right" style={{ color: colors.primary }}>{c.connected}</td>
                        <td className="py-1.5 px-2 text-right">
                          <Badge variant="outline" className="text-xs font-bold"
                            style={c.connRate >= 30
                              ? { color: "#10b981", borderColor: "#10b981" }
                              : { color: colors.primary, borderColor: colors.primary }}
                          >
                            {c.connRate}%
                          </Badge>
                        </td>
                        <td className="py-1.5 px-2 text-right text-emerald-600 font-semibold">{c.deals}</td>
                        <td className="py-1.5 px-2 text-right">
                          <Badge variant="outline" className="text-xs font-bold"
                            style={c.dealRate >= 10
                              ? { color: "#10b981", borderColor: "#10b981" }
                              : c.dealRate > 0
                              ? { color: "#f59e0b", borderColor: "#f59e0b" }
                              : { color: "#ef4444", borderColor: "#ef4444" }}
                          >
                            {c.dealRate}%
                          </Badge>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
