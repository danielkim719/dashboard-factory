"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart } from "@/components/charts/BarChart"
import { DonutChart } from "@/components/charts/DonutChart"
import { LineChart } from "@/components/charts/LineChart"
import { keeperConfig } from "@/config/keeper.config"
import {
  failureSummary as fs,
  failureReasons,
  failByChannel,
  failByEntry,
  failByTemp,
  failByPipeline,
  monthlyFails,
} from "@/data/keeper/failures"
import { XCircle, PhoneOff, MessageCircleX, AlertTriangle, TrendingDown } from "lucide-react"

export default function KeeperFailuresPage() {
  const colors = keeperConfig.colors

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">실패 분석</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          전체 실패 {fs.totalFail.toLocaleString()}건 심층 분석
        </p>
      </div>

      {/* ── Hero: 실패 유형 대분류 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-1.5 bg-red-500" />
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">전체 실패</span>
            </div>
            <p className="text-3xl font-black text-red-500">{fs.totalFail.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              전체의 {fs.failRate}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-1.5 bg-red-400" />
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <PhoneOff className="w-4 h-4 text-red-400" />
              <span className="text-xs text-muted-foreground">부재중 탈락</span>
            </div>
            <p className="text-3xl font-black text-red-400">{fs.unreachable.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              실패의 {fs.unreachableRate}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-1.5" style={{ backgroundColor: colors.secondary }} />
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircleX className="w-4 h-4" style={{ color: colors.secondary }} />
              <span className="text-xs text-muted-foreground">상담 후 실패</span>
            </div>
            <p className="text-3xl font-black" style={{ color: colors.secondary }}>
              {fs.afterConsult}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              실패의 {fs.afterConsultRate}%
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md overflow-hidden">
          <div className="h-1.5 bg-amber-500" />
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">사유 미기록</span>
            </div>
            <p className="text-3xl font-black text-amber-500">
              {((fs.reasonMissing / fs.totalFail) * 100).toFixed(0)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {fs.reasonMissing.toLocaleString()}건 사유 없음
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ── 실패 구조 시각화: 트리맵 스타일 ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">실패 구조 분해</p>
          <p className="text-xs text-muted-foreground mb-4">
            {fs.totalFail.toLocaleString()}건 실패의 원인별 구성
          </p>

          {/* 대분류 비율 바 */}
          <div className="h-10 rounded-lg overflow-hidden flex mb-4">
            <div
              className="h-full flex items-center justify-center text-xs text-white font-bold"
              style={{
                width: `${fs.unreachableRate}%`,
                backgroundColor: "#ef4444",
              }}
            >
              부재중 탈락 {fs.unreachableRate}%
            </div>
            <div
              className="h-full flex items-center justify-center text-xs text-white font-bold"
              style={{
                width: `${fs.afterConsultRate}%`,
                backgroundColor: colors.secondary,
              }}
            >
              상담 후 {fs.afterConsultRate}%
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 부재중 탈락 상세 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <p className="text-sm font-semibold">
                  부재중 탈락 {fs.unreachable.toLocaleString()}건
                </p>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-2">
                <p className="text-xs text-red-800">
                  전화 3회 시도 후 연결 안 됨 → 자동 실패 처리
                </p>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-red-600">메모 있음 (통화 시도 기록)</p>
                    <p className="text-lg font-bold text-red-700">{fs.calledAndFailed - fs.afterConsult}</p>
                  </div>
                  <div>
                    <p className="text-xs text-red-600">메모 없음 (리캐치 일괄)</p>
                    <p className="text-lg font-bold text-red-700">{fs.neverCalled - (fs.unreachable - (fs.calledAndFailed - fs.afterConsult))}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 상담 후 실패 상세 — 사유 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
                <p className="text-sm font-semibold">
                  상담 후 실패 사유 (기록된 {fs.reasonRecorded}건)
                </p>
              </div>
              <div className="space-y-1.5">
                {failureReasons.map((r) => {
                  const barW = Math.max(4, (r.count / failureReasons[0].count) * 100)
                  return (
                    <div key={r.reason} className="flex items-center gap-2">
                      <span className="text-xs w-24 text-right truncate">{r.reason}</span>
                      <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                        <div
                          className="h-full rounded flex items-center pl-2"
                          style={{ width: `${barW}%`, backgroundColor: r.color }}
                        >
                          {r.count > 10 && (
                            <span className="text-xs text-white font-bold">{r.count}</span>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-bold w-8 text-right">{r.count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 채널별 실패율 ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">채널별 실패율</p>
          <p className="text-xs text-muted-foreground mb-4">
            실패율 높은 순 — 어떤 채널의 리드 품질이 낮은지
          </p>
          <BarChart
            data={failByChannel.map((c) => ({
              채널: c.channel.length > 12 ? c.channel.slice(0, 12) + ".." : c.channel,
              실패율: c.failRate,
              전환율: c.successRate,
            }))}
            bars={[
              { key: "실패율", label: "실패율 (%)", color: "#ef4444" },
              { key: "전환율", label: "전환율 (%)", color: "#10b981" },
            ]}
            xKey="채널"
            height={280}
            formatY={(v) => `${v}%`}
            formatTooltip={(v) => `${v}%`}
          />
          <Separator className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-600 font-medium">전환율 0% 채널</p>
              <p className="text-sm font-bold text-red-700 mt-1">
                {failByChannel.filter((c) => c.successRate === 0).map((c) => c.channel).join(", ")}
              </p>
              <p className="text-xs text-red-600 mt-1">
                {failByChannel.filter((c) => c.successRate === 0).reduce((a, b) => a + b.total, 0)}건 투입, 성공 0건
              </p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-600 font-medium">실패율 85%+ 채널</p>
              <p className="text-sm font-bold text-amber-700 mt-1">
                {failByChannel.filter((c) => c.failRate >= 85).map((c) => c.channel).join(", ")}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs text-emerald-600 font-medium">상대적 우수 채널</p>
              <p className="text-sm font-bold text-emerald-700 mt-1">
                naver (실패 {failByChannel.find((c) => c.channel === "naver")?.failRate}%)
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                전환율 {failByChannel.find((c) => c.channel === "naver")?.successRate}% — 최고 효율
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 진입경로별 + 온도감별 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 진입경로별 실패율 */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4">진입경로별 실패율</p>
            <div className="space-y-2">
              {failByEntry.map((e) => (
                <div key={e.entry}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate flex-1">{e.entry}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-muted-foreground">{e.fail}/{e.total}</span>
                      <Badge
                        variant="outline"
                        className="text-xs font-bold w-14 justify-center"
                        style={
                          e.failRate >= 90
                            ? { color: "#ef4444", borderColor: "#ef4444", backgroundColor: "#ef444410" }
                            : e.failRate >= 75
                            ? { color: "#f59e0b", borderColor: "#f59e0b", backgroundColor: "#f59e0b10" }
                            : { color: "#10b981", borderColor: "#10b981", backgroundColor: "#10b98110" }
                        }
                      >
                        {e.failRate}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${e.failRate}%`,
                        backgroundColor:
                          e.failRate >= 90 ? "#ef4444" : e.failRate >= 75 ? "#f59e0b" : "#10b981",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 온도감별 */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4">온도감별 실패 vs 성공</p>
            <BarChart
              data={failByTemp.map((t) => ({
                온도감: t.level,
                실패율: t.failRate,
                전환율: t.successRate,
              }))}
              bars={[
                { key: "실패율", label: "실패율 (%)", color: "#ef4444" },
                { key: "전환율", label: "전환율 (%)", color: "#10b981" },
              ]}
              xKey="온도감"
              height={250}
              formatY={(v) => `${v}%`}
              formatTooltip={(v) => `${v}%`}
            />
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                온도감 &ldquo;하&rdquo;의 실패율이 <span className="font-bold">40.3%</span>로 가장 낮은 이유:
                아직 진행중인 건이 많기 때문 (최종 결과 미정). 실제 전환율도 2.8%로 낮아 주의 필요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── 월별 실패율 추이 ── */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <p className="text-sm font-semibold">월별 실패율 추이</p>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            실패율이 낮아지고 있다면 긍정적 신호
          </p>
          <LineChart
            data={monthlyFails.map((m) => ({
              월: m.month.slice(5),
              실패율: m.failRate,
            }))}
            lines={[{ key: "실패율", label: "실패율 (%)", color: "#ef4444" }]}
            xKey="월"
            height={250}
            formatY={(v) => `${v}%`}
            formatTooltip={(v) => `${v}%`}
          />
          <Separator className="my-4" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">월</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">총 유입</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">실패</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">실패율</th>
                </tr>
              </thead>
              <tbody>
                {monthlyFails.map((m) => (
                  <tr key={m.month} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-2 px-3 font-medium">{m.month}</td>
                    <td className="py-2 px-3 text-right">{m.total.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-red-500 font-semibold">{m.fail}</td>
                    <td className="py-2 px-3 text-right">
                      <Badge
                        variant="outline"
                        className="text-xs font-bold"
                        style={
                          m.failRate >= 85
                            ? { color: "#ef4444", borderColor: "#ef4444" }
                            : m.failRate >= 70
                            ? { color: "#f59e0b", borderColor: "#f59e0b" }
                            : { color: "#10b981", borderColor: "#10b981" }
                        }
                      >
                        {m.failRate}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── 리캐치 파이프라인 출처 ── */}
      <Card>
        <CardContent className="p-5">
          <p className="text-sm font-semibold mb-1">실패 건 출처 (리캐치 파이프라인)</p>
          <p className="text-xs text-muted-foreground mb-4">
            리캐치에서 이미 실패 판정된 건이 에어테이블에 그대로 반영
          </p>
          <div className="space-y-2">
            {failByPipeline.map((p) => {
              const barW = Math.max(3, (p.count / failByPipeline[0].count) * 100)
              return (
                <div key={p.pipeline} className="flex items-center gap-3">
                  <span className="text-xs w-40 text-right truncate">{p.pipeline}</span>
                  <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${barW}%`,
                        backgroundColor: p.pipeline.includes("에어테이블") ? colors.primary : "#94a3b8",
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold w-12 text-right">{p.count}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── 종합 인사이트 ── */}
      <Card
        className="border-2"
        style={{ borderColor: "#ef444430", background: "linear-gradient(135deg, #ef444408, #f59e0b05)" }}
      >
        <CardContent className="p-6">
          <p className="text-sm font-black mb-4 text-red-600">
            실패 원인 종합 인사이트
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-xs font-bold text-red-500">1. 최대 원인: 부재중 탈락 85%</p>
              <p className="text-xs text-muted-foreground">
                2,452건이 전화 3회 미연결로 자동 실패. 콜백 타이밍 최적화,
                문자 선발송, 다양한 시간대 시도가 필요.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-xs font-bold text-amber-600">2. 사유 미기록 91%</p>
              <p className="text-xs text-muted-foreground">
                실패 사유가 기록된 건은 250건(8.7%)뿐.
                상담 후 실패 시 사유 기록을 필수화하면
                구조적 개선 포인트를 찾을 수 있음.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-xs font-bold" style={{ color: colors.secondary }}>3. 제로 전환 채널 정리</p>
              <p className="text-xs text-muted-foreground">
                캐시노트(182건), 당근마켓(100건), 토스 배너(34건) 등
                총 316건 투입에 전환 0건. 채널 ROI 재검토 필요.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-xs font-bold text-purple-600">4. 토스 리드 98.8% 실패</p>
              <p className="text-xs text-muted-foreground">
                172건 중 170건 실패. 리드 품질 심각.
                토스 채널 자체의 유저 의도(호기심 클릭)가
                구매 의향과 맞지 않을 가능성.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-xs font-bold text-blue-600">5. 가격 부담 38건 — 구조적 이슈</p>
              <p className="text-xs text-muted-foreground">
                기록된 사유 중 2위. 한달 프로모션 경로의 전환율이
                24.5%로 높은 것과 대조하면, 체험 기회 제공이
                가격 저항을 줄이는 효과적 전략.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-xs font-bold text-emerald-600">6. 실패율 하락 추세 (긍정)</p>
              <p className="text-xs text-muted-foreground">
                9~11월 91% → 12월 78% → 2월 72% → 3월 43%.
                3월은 진행중 건이 많아 낮지만,
                전반적 하락 추세는 운영 개선의 증거.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
