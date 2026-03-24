"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { keeperConfig } from "@/config/keeper.config"
import { kpis, temperatureData, leadTimeBuckets } from "@/data/keeper/overview"
import { BarChart } from "@/components/charts/BarChart"

export default function KeeperLeadsPage() {
  const colors = keeperConfig.colors

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-xl font-bold">리드 상세</h1>
        <p className="text-sm text-muted-foreground mt-0.5">온도감, 리드타임, 통화 연결 분석</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <div className="h-1" style={{ backgroundColor: colors.primary }} />
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">통화 연결률</p>
            <p className="text-2xl font-bold mt-1">
              {((kpis.callConnectCount / kpis.totalLeads) * 100).toFixed(1)}
              <span className="text-sm font-normal text-muted-foreground ml-1">%</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {kpis.callConnectCount.toLocaleString()} / {kpis.totalLeads.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <div className="h-1" style={{ backgroundColor: "#ef4444" }} />
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">부재중 탈락</p>
            <p className="text-2xl font-bold mt-1 text-red-500">
              {(kpis.totalLeads - kpis.callConnectCount).toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground ml-1">건</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              전체의 {(((kpis.totalLeads - kpis.callConnectCount) / kpis.totalLeads) * 100).toFixed(0)}%
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <div className="h-1" style={{ backgroundColor: colors.accent }} />
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">평균 첫 콜 응답</p>
            <p className="text-2xl font-bold mt-1">
              {kpis.avgCallResponseDays}
              <span className="text-sm font-normal text-muted-foreground ml-1">일</span>
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <div className="h-1" style={{ backgroundColor: "#f59e0b" }} />
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">평균 딜 사이즈</p>
            <p className="text-2xl font-bold mt-1">
              {Math.round(kpis.avgDealSize / 10000).toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground ml-1">만원</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Temperature Detail */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4">온도감별 성과 상세</p>
            <BarChart
              data={temperatureData.map((t) => ({
                온도감: t.level,
                전환율: t.rate,
                총건수: t.total,
              }))}
              bars={[
                { key: "전환율", label: "전환율 (%)", color: colors.primary },
              ]}
              xKey="온도감"
              height={280}
              formatY={(v) => `${v}%`}
              formatTooltip={(v) => `${v}%`}
            />
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                온도감 &ldquo;상&rdquo;의 전환율이 <span className="font-bold">17.8%</span>로,
                &ldquo;하&rdquo;(3.2%)보다 <span className="font-bold">5.6배</span> 높습니다.
                온도감 평가가 정확한 리드 스코어링 역할을 하고 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Lead Time */}
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-semibold mb-4">리드타임 구간별 분포</p>
            <BarChart
              data={leadTimeBuckets.map((b) => ({
                구간: b.range,
                건수: b.count,
              }))}
              bars={[{ key: "건수", label: "성공 건수", color: colors.secondary }]}
              xKey="구간"
              height={280}
              formatTooltip={(v) => `${v}건`}
            />
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-800">
                성공 건의 <span className="font-bold">57.3%</span>가 7일 이내에 결제를 완료합니다.
                첫 통화 후 1주일이 골든 타임입니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Big Insight Banner */}
      <Card style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}08)` }}>
        <CardContent className="p-6">
          <p className="text-sm font-bold mb-3" style={{ color: colors.primary }}>
            핵심 병목 분석
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">최대 병목</p>
              <p className="text-sm font-bold text-red-500">통화 연결 실패 77.7%</p>
              <p className="text-xs text-muted-foreground mt-1">
                리드의 3/4이 부재중 3회로 탈락
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">최고 ROI 채널</p>
              <p className="text-sm font-bold" style={{ color: "#10b981" }}>
                Naver 오가닉 17.9%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                광고비 0원, 최고 전환율
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <p className="text-xs text-muted-foreground mb-1">골든 타임</p>
              <p className="text-sm font-bold" style={{ color: colors.accent }}>
                유입 후 7일 이내
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                성공 건의 57%가 1주일 내 전환
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
