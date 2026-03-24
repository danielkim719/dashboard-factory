export type KpiSummary = {
  totalLeads: number
  successCount: number
  failCount: number
  b2bCount: number
  inProgressCount: number
  conversionRate: number
  avgLeadTimeDays: number
  medianLeadTimeDays: number
  avgCallResponseDays: number
  totalRevenue: number
  avgDealSize: number
  callConnectCount: number
}

export const kpis: KpiSummary = {
  totalLeads: 3856,
  successCount: 301,
  failCount: 2866,
  b2bCount: 72,
  inProgressCount: 617,
  conversionRate: 7.8,
  avgLeadTimeDays: 13.4,
  medianLeadTimeDays: 6,
  avgCallResponseDays: 12.3,
  totalRevenue: 291090247,
  avgDealSize: 1228229,
  callConnectCount: 860,
}

export type FunnelStage = {
  label: string
  count: number
  rate: number | null
}

export const funnel: FunnelStage[] = [
  { label: "총 리드", count: 3856, rate: null },
  { label: "통화 연결", count: 860, rate: 22.3 },
  { label: "상담 진행", count: 710, rate: 82.6 },
  { label: "결제 완료", count: 301, rate: 42.4 },
]

export type MonthlyData = {
  month: string
  total: number
  success: number
  fail: number
  b2b: number
  pending: number
}

export const monthlyData: MonthlyData[] = [
  { month: "2025-05", total: 40, success: 3, fail: 37, b2b: 0, pending: 0 },
  { month: "2025-06", total: 49, success: 5, fail: 44, b2b: 0, pending: 0 },
  { month: "2025-07", total: 40, success: 1, fail: 39, b2b: 0, pending: 0 },
  { month: "2025-08", total: 108, success: 13, fail: 95, b2b: 0, pending: 0 },
  { month: "2025-09", total: 221, success: 17, fail: 202, b2b: 2, pending: 0 },
  { month: "2025-10", total: 270, success: 20, fail: 250, b2b: 0, pending: 0 },
  { month: "2025-11", total: 236, success: 15, fail: 217, b2b: 0, pending: 4 },
  { month: "2025-12", total: 838, success: 84, fail: 658, b2b: 1, pending: 95 },
  { month: "2026-01", total: 512, success: 55, fail: 413, b2b: 18, pending: 26 },
  { month: "2026-02", total: 854, success: 59, fail: 617, b2b: 35, pending: 143 },
  { month: "2026-03", total: 688, success: 29, fail: 294, b2b: 16, pending: 349 },
]

export type UtmSource = {
  source: string
  total: number
  success: number
  fail: number
  rate: number
}

export const utmSources: UtmSource[] = [
  { source: "(미추적)", total: 1710, success: 122, fail: 1372, rate: 7.1 },
  { source: "facebook.business", total: 548, success: 48, fail: 349, rate: 8.8 },
  { source: "naver.searchad", total: 483, success: 52, fail: 378, rate: 10.8 },
  { source: "naver", total: 280, success: 50, fail: 195, rate: 17.9 },
  { source: "cashnote", total: 182, success: 0, fail: 156, rate: 0.0 },
  { source: "meta", total: 179, success: 18, fail: 157, rate: 10.1 },
  { source: "danggeun_market", total: 98, success: 0, fail: 60, rate: 0.0 },
  { source: "nemo", total: 83, success: 1, fail: 31, rate: 1.2 },
  { source: "exibition", total: 62, success: 1, fail: 16, rate: 1.6 },
  { source: "google", total: 44, success: 3, fail: 23, rate: 6.8 },
  { source: "naver.performance_da", total: 42, success: 2, fail: 38, rate: 4.8 },
  { source: "토스 배너광고", total: 34, success: 0, fail: 31, rate: 0.0 },
]

export type AgentPerf = {
  name: string
  total: number
  success: number
  fail: number
  rate: number
}

export const agentPerformance: AgentPerf[] = [
  { name: "(미배정)", total: 2485, success: 133, fail: 1992, rate: 5.4 },
  { name: "이학영", total: 476, success: 50, fail: 231, rate: 10.5 },
  { name: "권미희", total: 372, success: 37, fail: 289, rate: 9.9 },
  { name: "김영훈", total: 213, success: 48, fail: 157, rate: 22.5 },
  { name: "천세영", total: 187, success: 10, fail: 113, rate: 5.3 },
  { name: "이요한", total: 52, success: 6, fail: 46, rate: 11.5 },
  { name: "이도현", total: 46, success: 16, fail: 30, rate: 34.8 },
  { name: "김기백", total: 21, success: 1, fail: 4, rate: 4.8 },
  { name: "이용진", total: 4, success: 0, fail: 4, rate: 0.0 },
]

export type EntryPath = {
  path: string
  total: number
  success: number
  rate: number
}

export const entryPaths: EntryPath[] = [
  { path: "견적계산기", total: 1544, success: 131, rate: 8.5 },
  { path: "빠른 상담하기 (도입문의)", total: 633, success: 76, rate: 12.0 },
  { path: "도입문의", total: 425, success: 30, rate: 7.1 },
  { path: "(없음)", total: 305, success: 9, rate: 3.0 },
  { path: "토스", total: 172, success: 2, rate: 1.2 },
  { path: "창업 가이드 북 다운로드", total: 159, success: 2, rate: 1.3 },
  { path: "서비스 소개서 다운", total: 85, success: 3, rate: 3.5 },
  { path: "카페&베이커리 페어", total: 57, success: 3, rate: 5.3 },
  { path: "한달프로모션", total: 49, success: 12, rate: 24.5 },
  { path: "보안서비스 도입 문의", total: 42, success: 2, rate: 4.8 },
]

export type TempLevel = {
  level: string
  total: number
  success: number
  rate: number
}

export const temperatureData: TempLevel[] = [
  { level: "상", total: 197, success: 35, rate: 17.8 },
  { level: "중", total: 292, success: 17, rate: 5.8 },
  { level: "하", total: 284, success: 9, rate: 3.2 },
  { level: "(미평가)", total: 3083, success: 240, rate: 7.8 },
]

export type CohortFunnel = {
  month: string
  total: number
  connected: number
  consulting: number
  deals: number
  connRate: number
  dealRate: number
}

// 월별 코호트: 유입월별 퍼널 도달 (12월 이후만 부재중상태 데이터 유효)
export const cohortFunnel: CohortFunnel[] = [
  { month: "2025-12", total: 838, connected: 143, consulting: 143, deals: 84, connRate: 17.1, dealRate: 10.0 },
  { month: "2026-01", total: 512, connected: 73, consulting: 73, deals: 55, connRate: 14.3, dealRate: 10.7 },
  { month: "2026-02", total: 854, connected: 174, consulting: 164, deals: 59, connRate: 20.4, dealRate: 6.9 },
  { month: "2026-03", total: 688, connected: 447, consulting: 304, deals: 29, connRate: 65.0, dealRate: 4.2 },
]

export type ChannelCohort = {
  month: string
  channel: string
  total: number
  connected: number
  deals: number
  connRate: number
  dealRate: number
}

export const channelCohorts: ChannelCohort[] = [
  { month: "2025-12", channel: "facebook.business", total: 0, connected: 0, deals: 0, connRate: 0, dealRate: 0 },
  { month: "2026-01", channel: "facebook.business", total: 149, connected: 17, deals: 19, connRate: 11.4, dealRate: 12.8 },
  { month: "2026-02", channel: "facebook.business", total: 212, connected: 47, deals: 20, connRate: 22.2, dealRate: 9.4 },
  { month: "2026-03", channel: "facebook.business", total: 187, connected: 151, deals: 9, connRate: 80.7, dealRate: 4.8 },
  { month: "2025-12", channel: "naver.searchad", total: 120, connected: 13, deals: 21, connRate: 10.8, dealRate: 17.5 },
  { month: "2026-01", channel: "naver.searchad", total: 109, connected: 4, deals: 7, connRate: 3.7, dealRate: 6.4 },
  { month: "2026-02", channel: "naver.searchad", total: 85, connected: 16, deals: 15, connRate: 18.8, dealRate: 17.6 },
  { month: "2026-03", channel: "naver.searchad", total: 82, connected: 60, deals: 3, connRate: 73.2, dealRate: 3.7 },
  { month: "2025-12", channel: "naver", total: 68, connected: 8, deals: 12, connRate: 11.8, dealRate: 17.6 },
  { month: "2026-01", channel: "naver", total: 70, connected: 4, deals: 14, connRate: 5.7, dealRate: 20.0 },
  { month: "2026-02", channel: "naver", total: 71, connected: 21, deals: 12, connRate: 29.6, dealRate: 16.9 },
  { month: "2026-03", channel: "naver", total: 46, connected: 36, deals: 8, connRate: 78.3, dealRate: 17.4 },
  { month: "2025-12", channel: "meta", total: 155, connected: 12, deals: 16, connRate: 7.7, dealRate: 10.3 },
  { month: "2026-01", channel: "meta", total: 7, connected: 0, deals: 1, connRate: 0.0, dealRate: 14.3 },
  { month: "2026-02", channel: "meta", total: 9, connected: 1, deals: 1, connRate: 11.1, dealRate: 11.1 },
  { month: "2026-03", channel: "meta", total: 1, connected: 1, deals: 0, connRate: 100.0, dealRate: 0.0 },
  { month: "2025-12", channel: "cashnote", total: 31, connected: 0, deals: 0, connRate: 0.0, dealRate: 0.0 },
  { month: "2026-01", channel: "cashnote", total: 0, connected: 0, deals: 0, connRate: 0, dealRate: 0 },
  { month: "2026-02", channel: "cashnote", total: 45, connected: 1, deals: 0, connRate: 2.2, dealRate: 0.0 },
  { month: "2026-03", channel: "cashnote", total: 98, connected: 36, deals: 0, connRate: 36.7, dealRate: 0.0 },
  { month: "2025-12", channel: "danggeun_market", total: 0, connected: 0, deals: 0, connRate: 0, dealRate: 0 },
  { month: "2026-01", channel: "danggeun_market", total: 0, connected: 0, deals: 0, connRate: 0, dealRate: 0 },
  { month: "2026-02", channel: "danggeun_market", total: 16, connected: 2, deals: 0, connRate: 12.5, dealRate: 0.0 },
  { month: "2026-03", channel: "danggeun_market", total: 82, connected: 60, deals: 0, connRate: 73.2, dealRate: 0.0 },
]

export type LeadTimeBucket = {
  range: string
  count: number
}

export const leadTimeBuckets: LeadTimeBucket[] = [
  { range: "당일", count: 31 },
  { range: "1-3일", count: 47 },
  { range: "4-7일", count: 36 },
  { range: "8-14일", count: 30 },
  { range: "15-30일", count: 37 },
  { range: "31일+", count: 23 },
]