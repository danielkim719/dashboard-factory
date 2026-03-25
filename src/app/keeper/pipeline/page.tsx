"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { keeperConfig } from "@/config/keeper.config"
import {
  absenceStages,
  dealStages,
  finalStages,
  activeCross,
  totalRecords,
  activeRecords,
} from "@/data/keeper/pipeline"
import { ChevronRight } from "lucide-react"

export default function KeeperPipelinePage() {
  const colors = keeperConfig.colors

  const successTotal = finalStages
    .filter((s) => s.name.startsWith("결제"))
    .reduce((a, b) => a + b.count, 0)

  const dealMax = Math.max(...dealStages.map((s) => s.count))

  const absenceGroups = [
    { label: "유입", stages: ["유입"], color: "#10b981", desc: "첫 연락 대기" },
    { label: "부재중 (1~2회)", stages: ["부재중", "부재중2회"], color: "#f59e0b", desc: "재시도 필요" },
    { label: "부재중3회", stages: ["부재중3회"], color: "#ef4444", desc: "종료 처리 대상" },
  ]

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold">파이프라인 상세</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          전체 {totalRecords.toLocaleString()}건 · 진행중 {activeRecords}건
        </p>
      </div>

      {/* ── Horizontal Deal Pipeline ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">딜 파이프라인</p>
          <p className="text-xs text-muted-foreground mb-5">
            진행중 {activeRecords}건의 현재 단계
          </p>
          <div className="flex items-end gap-0 overflow-x-auto pb-2">
            {dealStages.map((s, i) => {
              const heightPct = Math.max(12, (s.count / dealMax) * 100)
              return (
                <div key={s.name} className="flex items-end flex-shrink-0">
                  {/* Stage column */}
                  <div className="flex flex-col items-center" style={{ minWidth: 80 }}>
                    {/* Count */}
                    <span
                      className="text-sm font-black mb-1"
                      style={{ color: s.color }}
                    >
                      {s.count}
                    </span>
                    {/* Bar */}
                    <div
                      className="w-14 rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${heightPct * 1.6}px`,
                        backgroundColor: s.color,
                        minHeight: 20,
                      }}
                    />
                    {/* Label */}
                    <p className="text-xs text-muted-foreground mt-2 text-center leading-tight w-20">
                      {s.name}
                    </p>
                  </div>
                  {/* Arrow between stages */}
                  {i < dealStages.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 mb-8 -mx-1 flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
          {/* Pipeline flow line */}
          <div className="mt-3 mx-4 flex items-center gap-1">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-muted-foreground/20 via-muted-foreground/40 to-emerald-500/40 rounded" />
            <span className="text-xs text-muted-foreground px-2">결제 →</span>
          </div>
        </CardContent>
      </Card>

      {/* ── Absence Status + Final Result ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 부재중 상태 */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-1">부재중 상태</p>
            <p className="text-xs text-muted-foreground mb-4">진행중 {activeRecords}건</p>
            <div className="space-y-3">
              {absenceStages.map((s) => {
                const pct = ((s.count / activeRecords) * 100).toFixed(1)
                const barWidth = Math.max(4, (s.count / activeRecords) * 100)
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-sm font-medium">{s.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{s.count}</span>
                        <span className="text-xs text-muted-foreground w-10 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: s.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* 최종 결과 (전체) */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-1">최종 결과</p>
            <p className="text-xs text-muted-foreground mb-4">전체 {totalRecords.toLocaleString()}건</p>
            <div className="space-y-3">
              {finalStages.map((s) => {
                const pct = ((s.count / totalRecords) * 100).toFixed(1)
                const barWidth = Math.max(2, (s.count / totalRecords) * 100)
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-sm font-medium">{s.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{s.count.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground w-10 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          backgroundColor: s.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">총 결제 완료</span>
              <span className="text-2xl font-black" style={{ color: "#10b981" }}>
                {successTotal}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Active Leads Cross Table ── */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">진행중 리드 상세</p>
              <p className="text-xs text-muted-foreground">
                부재중 × 딜스테이지 교차 · {activeRecords}건
              </p>
            </div>
            <Badge
              variant="outline"
              className="text-xs font-bold"
              style={{ color: colors.primary, borderColor: colors.primary }}
            >
              {activeRecords}건
            </Badge>
          </div>

          {absenceGroups.map((group) => {
            const groupCells = activeCross.filter((c) =>
              group.stages.includes(c.absence)
            )
            const groupTotal = groupCells.reduce((a, b) => a + b.count, 0)
            if (groupTotal === 0) return null

            return (
              <div key={group.label} className="mb-5 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-sm font-semibold">{group.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {groupTotal}건 · {group.desc}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ml-5">
                  {groupCells
                    .sort((a, b) => b.count - a.count)
                    .map((cell) => (
                      <div
                        key={`${cell.absence}-${cell.deal}`}
                        className="p-2.5 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                      >
                        <p className="text-xs text-muted-foreground">{cell.deal}</p>
                        <p className="text-lg font-bold mt-0.5">{cell.count}</p>
                        {cell.absence !== group.stages[0] && (
                          <p className="text-xs text-muted-foreground">{cell.absence}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* ── Insight ── */}
      <Card style={{ background: `linear-gradient(135deg, ${colors.primary}08, ${colors.accent}05)` }}>
        <CardContent className="p-5">
          <p className="text-sm font-bold mb-3" style={{ color: colors.primary }}>
            파이프라인 인사이트
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground">즉시 액션 가능</p>
              <p className="text-sm font-bold" style={{ color: colors.accent }}>
                유입 362건 + 부재중1~2회 169건
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                연락 대기 중인 활성 리드
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground">상담중 집중</p>
              <p className="text-sm font-bold" style={{ color: "#00B4D8" }}>
                433건 (77.7%)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                진행중 리드의 대부분이 상담 단계
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground">결제 임박</p>
              <p className="text-sm font-bold" style={{ color: "#10b981" }}>
                결제대기 26건 + 회원가입 2건
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                전환 직전 단계
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}