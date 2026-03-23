"use client"

import { KpiCard } from "@/components/widgets/KpiCard"
import { LineChart } from "@/components/charts/LineChart"
import { BarChart } from "@/components/charts/BarChart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { brandboostConfig } from "@/config/brandboost.config"
import { marketingKpis, monthlyTraffic } from "@/data/brandboost/marketing"
import { salesKpis, monthlyRevenue } from "@/data/brandboost/sales"
import { adminKpis } from "@/data/brandboost/admin"

const fmt = (n: number) =>
  n >= 100000000
    ? `${(n / 100000000).toFixed(1)}억`
    : n >= 10000
    ? `${(n / 10000).toFixed(0)}만`
    : n.toLocaleString()

export default function BrandboostOverviewPage() {
  const colors = brandboostConfig.colors

  const revenueData = monthlyRevenue.slice(-6).map((d) => ({
    month: d.month.slice(5),
    매출: d.revenue,
    목표: d.target,
  }))

  const trafficData = monthlyTraffic.slice(-6).map((d) => ({
    month: d.month.slice(5),
    organic: d.organic,
    paid: d.paid,
    social: d.social,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Overview</h1>
        <p className="text-sm text-muted-foreground mt-0.5">브랜드부스트 전체 현황 — 2025년 3월</p>
      </div>

      {/* KPI 섹션 — 마케팅 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          마케팅
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard
            title="총 리드"
            value={marketingKpis.totalLeads.value.toLocaleString()}
            change={marketingKpis.totalLeads.change}
            description="전월 대비"
          />
          <KpiCard
            title="CPL"
            value={fmt(marketingKpis.cpl.value)}
            change={marketingKpis.cpl.change}
            suffix="원"
            description="리드당 비용"
          />
          <KpiCard
            title="광고비 집행"
            value={fmt(marketingKpis.totalSpend.value)}
            change={marketingKpis.totalSpend.change}
            suffix="원"
          />
          <KpiCard
            title="평균 ROAS"
            value={marketingKpis.avgRoas.value}
            change={marketingKpis.avgRoas.change}
            suffix="x"
          />
          <KpiCard
            title="오가닉 트래픽"
            value={marketingKpis.organicTraffic.value.toLocaleString()}
            change={marketingKpis.organicTraffic.change}
          />
          <KpiCard
            title="전환율"
            value={marketingKpis.conversionRate.value}
            change={marketingKpis.conversionRate.change}
            suffix="%"
          />
        </div>
      </section>

      {/* KPI 섹션 — 세일즈 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          세일즈
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard
            title="월 매출"
            value={fmt(salesKpis.mrr.value)}
            change={salesKpis.mrr.change}
            suffix="원"
          />
          <KpiCard
            title="파이프라인"
            value={fmt(salesKpis.pipelineValue.value)}
            change={salesKpis.pipelineValue.change}
            suffix="원"
          />
          <KpiCard
            title="승률"
            value={salesKpis.winRate.value}
            change={salesKpis.winRate.change}
            suffix="%"
          />
          <KpiCard
            title="평균 거래 규모"
            value={fmt(salesKpis.avgDealSize.value)}
            change={salesKpis.avgDealSize.change}
            suffix="원"
          />
          <KpiCard
            title="평균 영업주기"
            value={salesKpis.avgSalesCycle.value}
            change={salesKpis.avgSalesCycle.change}
            suffix="일"
          />
          <KpiCard
            title="신규 딜"
            value={salesKpis.newDeals.value}
            change={salesKpis.newDeals.change}
            suffix="건"
          />
        </div>
      </section>

      {/* KPI 섹션 — 어드민 */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          내부 운영
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard title="임직원 수" value={adminKpis.headcount.value} suffix="명" />
          <KpiCard
            title="티켓 해결시간"
            value={adminKpis.avgTicketResolutionHours.value}
            change={adminKpis.avgTicketResolutionHours.change}
            suffix="h"
            description="평균 해결 시간"
          />
          <KpiCard
            title="태스크 완료율"
            value={adminKpis.taskCompletionRate.value}
            change={adminKpis.taskCompletionRate.change}
            suffix="%"
          />
          <KpiCard
            title="예산 집행률"
            value={adminKpis.budgetUtilization.value}
            change={adminKpis.budgetUtilization.change}
            suffix="%"
          />
          <KpiCard
            title="계약 만료 임박"
            value={adminKpis.contractsExpiringSoon.value}
            suffix="건"
            description="30일 이내"
          />
          <KpiCard
            title="NPS"
            value={adminKpis.nps.value}
            change={adminKpis.nps.change}
          />
        </div>
      </section>

      {/* 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">월별 매출 vs 목표</CardTitle>
            <CardDescription>최근 6개월</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={revenueData}
              bars={[
                { key: "매출", label: "매출", color: colors.primary },
                { key: "목표", label: "목표", color: colors.accent },
              ]}
              xKey="month"
              height={260}
              formatY={(v) => `${(v / 100000000).toFixed(0)}억`}
              formatTooltip={(v) => `${fmt(v)}원`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">채널별 트래픽 추이</CardTitle>
            <CardDescription>최근 6개월</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={trafficData}
              lines={[
                { key: "organic", label: "오가닉", color: colors.primary },
                { key: "paid", label: "유료", color: colors.secondary },
                { key: "social", label: "소셜", color: colors.accent },
              ]}
              xKey="month"
              height={260}
              formatY={(v) => `${(v / 1000).toFixed(0)}k`}
              formatTooltip={(v) => v.toLocaleString()}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
