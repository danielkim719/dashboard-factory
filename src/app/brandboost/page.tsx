"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart } from "@/components/charts/BarChart"
import { brandboostConfig } from "@/config/brandboost.config"
import { marketingKpis, marketingFunnel, campaigns, monthlyTraffic } from "@/data/brandboost/marketing"
import { salesKpis, monthlyRevenue } from "@/data/brandboost/sales"
import { adminKpis } from "@/data/brandboost/admin"
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Megaphone,
  Leaf,
  Share2,
} from "lucide-react"

const fmt = (n: number) =>
  n >= 100000000
    ? `${(n / 100000000).toFixed(1)}억`
    : n >= 10000
    ? `${(n / 10000).toFixed(0)}만`
    : n.toLocaleString()

// 채널별 추정 데이터 (이번달 트래픽 비율 기준 분배)
const latestTraffic = monthlyTraffic[monthlyTraffic.length - 1]
const totalTraffic = latestTraffic.organic + latestTraffic.paid + latestTraffic.social + latestTraffic.direct
const totalLeads = marketingKpis.totalLeads.value

const channelData = {
  paid: {
    traffic: latestTraffic.paid,
    leads: Math.round(totalLeads * (latestTraffic.paid / totalTraffic) * 1.18), // 유료는 CVR 높음
    cvr: 3.1,
    spend: marketingKpis.totalSpend.value,
    cpl: marketingKpis.cpl.value,
    roas: marketingKpis.avgRoas.value,
  },
  organic: {
    traffic: latestTraffic.organic,
    leads: Math.round(totalLeads * (latestTraffic.organic / totalTraffic) * 0.95),
    cvr: 1.8,
    spend: 0,
    cpl: 0,
  },
  social: {
    traffic: latestTraffic.social + latestTraffic.direct,
    leads: Math.round(totalLeads * ((latestTraffic.social + latestTraffic.direct) / totalTraffic) * 0.72),
    cvr: 1.2,
    spend: 0,
    cpl: 0,
  },
}

// 퍼널 단계 (sessions → revenue)
const funnelStages = [
  { label: "방문", value: totalTraffic, unit: "명", color: "#6366f1" },
  { label: "리드", value: marketingFunnel[4].count, unit: "명", color: "#8b5cf6", rate: 17.4 },
  { label: "MQL", value: marketingFunnel[4].count, unit: "명", color: "#06b6d4", rate: 30.0 },
  { label: "SQL", value: marketingFunnel[5].count, unit: "명", color: "#10b981", rate: 40.0 },
  { label: "계약", value: salesKpis.newDeals.value, unit: "건", color: "#f59e0b", rate: 3.1 },
  { label: "매출", value: salesKpis.mrr.value, unit: "원", color: "#ef4444", rate: null },
]

type ChannelKey = "paid" | "organic" | "social"

export default function BrandboostOverviewPage() {
  const [expanded, setExpanded] = useState<ChannelKey | null>(null)
  const colors = brandboostConfig.colors

  const toggle = (key: ChannelKey) => setExpanded((prev) => (prev === key ? null : key))

  const revenueChartData = monthlyRevenue.slice(-6).map((d) => ({
    month: d.month.slice(5),
    매출: d.revenue,
    목표: d.target,
  }))

  const topCampaigns = campaigns
    .filter((c) => c.status === "active")
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 3)

  return (
    <div className="space-y-6 max-w-6xl">
      {/* ── 헤더 ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold">전체 퍼널 Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">브랜드부스트 · 2025년 3월</p>
        </div>
        <Badge variant="outline" className="text-xs">목업 데이터</Badge>
      </div>

      {/* ── 히어로 KPI 4개 ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "총 리드", value: totalLeads.toLocaleString(), change: marketingKpis.totalLeads.change, suffix: "명" },
          { label: "전체 전환율", value: marketingKpis.conversionRate.value, change: marketingKpis.conversionRate.change, suffix: "%" },
          { label: "이번달 매출", value: fmt(salesKpis.mrr.value), change: salesKpis.mrr.change, suffix: "원" },
          { label: "평균 ROAS", value: marketingKpis.avgRoas.value, change: marketingKpis.avgRoas.change, suffix: "x" },
        ].map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-sm" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}08)` }}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-2xl font-bold mt-1">
                {kpi.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">{kpi.suffix}</span>
              </p>
              {kpi.change !== undefined && (
                <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${kpi.change > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {kpi.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change > 0 ? "+" : ""}{kpi.change}% 전월 대비
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── 퍼널 플로우 시각화 ── */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-1 mb-4">
            <p className="text-sm font-semibold">전체 퍼널 플로우</p>
            <span className="text-xs text-muted-foreground ml-2">방문 → 매출 단계별 전환 현황</span>
          </div>
          <div className="flex items-center gap-0 overflow-x-auto pb-1">
            {funnelStages.map((stage, i) => (
              <div key={stage.label} className="flex items-center flex-shrink-0">
                {/* 스테이지 박스 */}
                <div className="flex flex-col items-center min-w-[90px]">
                  <div
                    className="w-full rounded-lg px-3 py-3 text-center text-white"
                    style={{ backgroundColor: stage.color, opacity: 1 - i * 0.07 }}
                  >
                    <p className="text-xs font-medium opacity-90">{stage.label}</p>
                    <p className="text-base font-bold mt-0.5 leading-none">
                      {stage.label === "매출" ? fmt(stage.value) : stage.value.toLocaleString()}
                    </p>
                    <p className="text-xs opacity-80 mt-0.5">{stage.unit}</p>
                  </div>
                  {stage.rate !== null && i > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">{stage.rate}% 전환</p>
                  )}
                </div>
                {/* 화살표 */}
                {i < funnelStages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-1 flex-shrink-0 mt-[-12px]" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 채널별 리드 소스 (클릭 확장) ── */}
      <div>
        <p className="text-sm font-semibold mb-3">채널별 리드 소스</p>
        <div className="space-y-3">

          {/* Paid Marketing */}
          <Card className="overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => toggle("paid")}
            >
              <div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.primary}20` }}>
                  <Megaphone className="w-4 h-4" style={{ color: colors.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">Paid Marketing</p>
                    <Badge variant="outline" className="text-xs">Google · Meta · Naver · YouTube</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <Stat label="리드" value={`${channelData.paid.leads.toLocaleString()}명`} color={colors.primary} />
                    <Stat label="전환율" value={`${channelData.paid.cvr}%`} />
                    <Stat label="광고비" value={`${fmt(channelData.paid.spend)}원`} />
                    <Stat label="CPL" value={`${fmt(channelData.paid.cpl)}원`} />
                    <Stat label="ROAS" value={`${channelData.paid.roas}x`} color="#10b981" />
                  </div>
                </div>
                <div className="text-muted-foreground flex-shrink-0">
                  {expanded === "paid" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {expanded === "paid" && (
              <div className="border-t px-4 py-4 bg-muted/20 space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">캠페인별 ROAS (운영중)</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {topCampaigns.map((c) => (
                    <div key={c.id} className="bg-background rounded-lg p-3 border">
                      <p className="text-xs font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.channel}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-muted-foreground text-xs">ROAS</span>
                        <span className="font-bold" style={{ color: c.roas >= 3 ? "#10b981" : "#f59e0b" }}>{c.roas}x</span>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>전환 {c.conversions}건</span>
                        <span>집행 {fmt(c.spend)}원</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/brandboost/marketing" className="inline-flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: colors.primary }}>
                  마케팅 상세 보기 <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </Card>

          {/* Organic */}
          <Card className="overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => toggle("organic")}
            >
              <div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.accent}20` }}>
                  <Leaf className="w-4 h-4" style={{ color: colors.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">Organic Search</p>
                    <Badge variant="outline" className="text-xs">SEO · 콘텐츠</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <Stat label="리드" value={`${channelData.organic.leads.toLocaleString()}명`} color={colors.accent} />
                    <Stat label="전환율" value={`${channelData.organic.cvr}%`} />
                    <Stat label="광고비" value="0원" />
                    <Stat label="CPL" value="0원 (무료)" color="#10b981" />
                  </div>
                </div>
                <div className="text-muted-foreground flex-shrink-0">
                  {expanded === "organic" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {expanded === "organic" && (
              <div className="border-t px-4 py-4 bg-muted/20 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">오가닉 트래픽 추이 (최근 6개월)</p>
                <BarChart
                  data={monthlyTraffic.slice(-6).map((d) => ({ month: d.month.slice(5), 오가닉: d.organic }))}
                  bars={[{ key: "오가닉", label: "오가닉 방문", color: colors.accent }]}
                  xKey="month"
                  height={160}
                  formatY={(v) => `${(v / 1000).toFixed(0)}k`}
                  formatTooltip={(v) => v.toLocaleString()}
                />
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-background rounded-lg p-3 border text-center">
                    <p className="text-xs text-muted-foreground">이번달 방문</p>
                    <p className="text-lg font-bold mt-1" style={{ color: colors.accent }}>{latestTraffic.organic.toLocaleString()}</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 border text-center">
                    <p className="text-xs text-muted-foreground">전월 대비</p>
                    <p className="text-lg font-bold mt-1 text-emerald-600">+13.8%</p>
                  </div>
                  <div className="bg-background rounded-lg p-3 border text-center">
                    <p className="text-xs text-muted-foreground">총 리드 기여</p>
                    <p className="text-lg font-bold mt-1">{Math.round(channelData.organic.leads / totalLeads * 100)}%</p>
                  </div>
                </div>
                <Link href="/brandboost/marketing" className="inline-flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: colors.accent }}>
                  마케팅 상세 보기 <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </Card>

          {/* Social + Direct */}
          <Card className="overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => toggle("social")}
            >
              <div className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.secondary}20` }}>
                  <Share2 className="w-4 h-4" style={{ color: colors.secondary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">Social · Direct · Referral</p>
                    <Badge variant="outline" className="text-xs">Instagram · LinkedIn · Direct</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <Stat label="리드" value={`${channelData.social.leads.toLocaleString()}명`} color={colors.secondary} />
                    <Stat label="전환율" value={`${channelData.social.cvr}%`} />
                    <Stat label="총 방문" value={`${channelData.social.traffic.toLocaleString()}명`} />
                    <Stat label="총 리드 기여" value={`${Math.round(channelData.social.leads / totalLeads * 100)}%`} />
                  </div>
                </div>
                <div className="text-muted-foreground flex-shrink-0">
                  {expanded === "social" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {expanded === "social" && (
              <div className="border-t px-4 py-4 bg-muted/20 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">채널별 방문 비중</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Instagram / Meta", visits: latestTraffic.social, share: Math.round(latestTraffic.social / totalTraffic * 100) },
                    { label: "Direct / Bookmark", visits: latestTraffic.direct, share: Math.round(latestTraffic.direct / totalTraffic * 100) },
                  ].map((ch) => (
                    <div key={ch.label} className="bg-background rounded-lg p-3 border">
                      <p className="text-xs text-muted-foreground">{ch.label}</p>
                      <p className="text-lg font-bold mt-1" style={{ color: colors.secondary }}>{ch.visits.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">전체의 {ch.share}%</p>
                    </div>
                  ))}
                </div>
                <Link href="/brandboost/marketing" className="inline-flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: colors.secondary }}>
                  마케팅 상세 보기 <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* ── 하단: 세일즈 + 어드민 요약 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 세일즈 요약 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">세일즈 요약</p>
              <Link href="/brandboost/sales" className="inline-flex items-center gap-1 text-xs" style={{ color: colors.primary }}>
                상세 <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <MiniStat label="이번달 매출" value={fmt(salesKpis.mrr.value) + "원"} change={salesKpis.mrr.change} color={colors.primary} />
              <MiniStat label="파이프라인" value={fmt(salesKpis.pipelineValue.value) + "원"} change={salesKpis.pipelineValue.change} />
              <MiniStat label="승률" value={salesKpis.winRate.value + "%"} change={salesKpis.winRate.change} />
            </div>
            <Separator className="my-3" />
            <BarChart
              data={revenueChartData}
              bars={[
                { key: "매출", label: "매출", color: colors.primary },
                { key: "목표", label: "목표", color: "#e2e8f0" },
              ]}
              xKey="month"
              height={120}
              formatY={(v) => `${(v / 100000000).toFixed(0)}억`}
              formatTooltip={(v) => `${fmt(v)}원`}
            />
          </CardContent>
        </Card>

        {/* 어드민 요약 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">내부 운영 요약</p>
              <Link href="/brandboost/admin" className="inline-flex items-center gap-1 text-xs" style={{ color: colors.primary }}>
                상세 <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <MiniStat label="NPS" value={String(adminKpis.nps.value)} change={adminKpis.nps.change} color={colors.primary} />
              <MiniStat label="태스크 완료율" value={adminKpis.taskCompletionRate.value + "%"} change={adminKpis.taskCompletionRate.change} />
              <MiniStat label="예산 집행률" value={adminKpis.budgetUtilization.value + "%"} change={adminKpis.budgetUtilization.change} />
            </div>
            <Separator className="my-3" />
            <div className="space-y-2.5">
              {[
                { label: "임직원", value: `${adminKpis.headcount.value}명` },
                { label: "계약 만료 임박", value: `${adminKpis.contractsExpiringSoon.value}건 (30일 이내)`, urgent: adminKpis.contractsExpiringSoon.value > 0 },
                { label: "평균 티켓 해결", value: `${adminKpis.avgTicketResolutionHours.value}시간` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={`font-medium ${row.urgent ? "text-amber-500" : ""}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ── 인라인 헬퍼 컴포넌트 ──

type StatProps = { label: string; value: string; color?: string }
function Stat({ label, value, color }: StatProps) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold" style={color ? { color } : {}}>
        {value}
      </span>
    </div>
  )
}

type MiniStatProps = { label: string; value: string; change?: number; color?: string }
function MiniStat({ label, value, change, color }: MiniStatProps) {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-bold mt-0.5" style={color ? { color } : {}}>
        {value}
      </p>
      {change !== undefined && (
        <p className={`text-xs mt-0.5 ${change > 0 ? "text-emerald-600" : "text-red-500"}`}>
          {change > 0 ? "+" : ""}{change}%
        </p>
      )}
    </div>
  )
}
