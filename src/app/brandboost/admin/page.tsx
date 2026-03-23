"use client"

import { KpiCard } from "@/components/widgets/KpiCard"
import { BarChart } from "@/components/charts/BarChart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { brandboostConfig } from "@/config/brandboost.config"
import {
  adminKpis,
  monthlyBudget,
  expenseCategories,
  supportTickets,
  teamProductivity,
  contracts,
} from "@/data/brandboost/admin"

const fmt = (n: number) =>
  n >= 100000000
    ? `${(n / 100000000).toFixed(1)}억`
    : n >= 10000
    ? `${(n / 10000).toFixed(0)}만`
    : n.toLocaleString()

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: "낮음", color: "#94a3b8" },
  medium: { label: "보통", color: "#f59e0b" },
  high: { label: "높음", color: "#f97316" },
  urgent: { label: "긴급", color: "#ef4444" },
}

const ticketStatusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  open: { label: "오픈", variant: "outline" },
  in_progress: { label: "처리중", variant: "default" },
  resolved: { label: "해결됨", variant: "secondary" },
  closed: { label: "닫힘", variant: "secondary" },
}

const contractStatusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  active: { label: "활성", variant: "default" },
  expiring: { label: "만료임박", variant: "destructive" },
  expired: { label: "만료", variant: "secondary" },
  pending: { label: "대기", variant: "outline" },
}

export default function AdminPage() {
  const colors = brandboostConfig.colors

  const budgetChartData = monthlyBudget.slice(-6).map((d) => ({
    month: d.month.slice(5),
    계획: d.planned,
    실제: d.actual,
  }))

  const productivityChartData = teamProductivity.map((d) => ({
    week: d.week,
    완료: d.tasksCompleted,
    생성: d.tasksCreated,
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">어드민 운영</h1>
        <p className="text-sm text-muted-foreground mt-0.5">예산, 팀 생산성, 티켓, 계약 관리</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard title="임직원 수" value={adminKpis.headcount.value} suffix="명" />
        <KpiCard
          title="티켓 해결시간"
          value={adminKpis.avgTicketResolutionHours.value}
          suffix="h"
          change={adminKpis.avgTicketResolutionHours.change}
          description="평균"
        />
        <KpiCard
          title="태스크 완료율"
          value={adminKpis.taskCompletionRate.value}
          suffix="%"
          change={adminKpis.taskCompletionRate.change}
        />
        <KpiCard
          title="예산 집행률"
          value={adminKpis.budgetUtilization.value}
          suffix="%"
          change={adminKpis.budgetUtilization.change}
        />
        <KpiCard
          title="계약 만료 임박"
          value={adminKpis.contractsExpiringSoon.value}
          suffix="건"
          description="30일 이내"
        />
        <KpiCard title="NPS" value={adminKpis.nps.value} change={adminKpis.nps.change} />
      </div>

      {/* 예산 + 지출 카테고리 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">예산 집행 현황 (최근 6개월)</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={budgetChartData}
              bars={[
                { key: "계획", label: "계획", color: "#e2e8f0" },
                { key: "실제", label: "실제", color: colors.primary },
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
            <CardTitle className="text-base">비용 카테고리</CardTitle>
            <CardDescription>이번 달</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseCategories.map((cat) => {
                const utilRate = (cat.spent / cat.budget) * 100
                return (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{cat.category}</span>
                      <span className="text-muted-foreground">{utilRate.toFixed(0)}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(utilRate, 100)}%`,
                          backgroundColor: utilRate > 95 ? "#ef4444" : utilRate > 85 ? "#f59e0b" : colors.primary,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{fmt(cat.spent)}원 집행</span>
                      <span>잔여 {fmt(cat.remaining)}원</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 팀 생산성 + 티켓 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">팀 생산성</CardTitle>
            <CardDescription>주간 태스크 생성/완료</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={productivityChartData}
              bars={[
                { key: "생성", label: "생성", color: "#e2e8f0" },
                { key: "완료", label: "완료", color: colors.primary },
              ]}
              xKey="week"
              height={200}
            />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {teamProductivity.map((d) => (
                <div key={d.week} className="text-center">
                  <div
                    className="text-lg font-bold"
                    style={{ color: colors.primary }}
                  >
                    {d.onTime}%
                  </div>
                  <div className="text-xs text-muted-foreground">정시 완료</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">지원 티켓</CardTitle>
            <CardDescription>최근 요청</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: priorityConfig[ticket.priority].color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{ticket.title}</span>
                      <Badge
                        variant={ticketStatusConfig[ticket.status].variant}
                        className="text-xs"
                      >
                        {ticketStatusConfig[ticket.status].label}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {ticket.requester} · {ticket.category} · {ticket.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 계약 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">계약 현황</CardTitle>
          <CardDescription>갱신 및 만료 일정 관리</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">고객사</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">계약 유형</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">계약금액</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">기간</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">상태</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-2.5 px-3 font-medium">{c.client}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{c.type}</td>
                    <td className="py-2.5 px-3 text-right">{fmt(c.value)}원</td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {c.startDate} ~ {c.endDate}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <Badge
                        variant={contractStatusConfig[c.status].variant as "default" | "secondary" | "outline" | "destructive"}
                        className="text-xs"
                      >
                        {contractStatusConfig[c.status].label}
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
