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
  totalLeads: 3878,
  successCount: 303,
  failCount: 2878,
  b2bCount: 72,
  inProgressCount: 625,
  conversionRate: 7.8,
  avgLeadTimeDays: 27.6,
  medianLeadTimeDays: 10,
  avgCallResponseDays: 12.1,
  totalRevenue: 291090247,
  avgDealSize: 1228229,
  callConnectCount: 3273,
}

export type FunnelStage = {
  label: string
  count: number
  rate: number | null
}

export const funnel: FunnelStage[] = [
  { label: "총 리드", count: 3878, rate: null },
  { label: "통화 연결", count: 3273, rate: 84.4 },
  { label: "상담 진행", count: 3163, rate: 96.6 },
  { label: "결제 완료", count: 303, rate: 9.6 },
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
  { month: "2025-12", total: 838, success: 85, fail: 658, b2b: 1, pending: 94 },
  { month: "2026-01", total: 512, success: 56, fail: 413, b2b: 18, pending: 25 },
  { month: "2026-02", total: 854, success: 59, fail: 619, b2b: 35, pending: 141 },
  { month: "2026-03", total: 710, success: 29, fail: 304, b2b: 16, pending: 361 },
]

export type UtmSource = {
  source: string
  total: number
  success: number
  fail: number
  rate: number
}

export const utmSources: UtmSource[] = [
  { source: "(미추적)", total: 1715, success: 123, fail: 1372, rate: 7.2 },
  { source: "facebook.business", total: 555, success: 48, fail: 349, rate: 8.6 },
  { source: "naver.searchad", total: 486, success: 52, fail: 378, rate: 10.7 },
  { source: "naver", total: 285, success: 51, fail: 195, rate: 17.9 },
  { source: "cashnote", total: 182, success: 0, fail: 156, rate: 0.0 },
  { source: "meta", total: 179, success: 18, fail: 157, rate: 10.1 },
  { source: "danggeun_market", total: 100, success: 0, fail: 60, rate: 0.0 },
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

export const agentPerformance: AgentPerf[] = []

export type EntryPath = {
  path: string
  total: number
  success: number
  rate: number
}

export const entryPaths: EntryPath[] = [
  { path: "견적계산기", total: 1554, success: 132, rate: 8.5 },
  { path: "빠른 상담하기 (도입문의)", total: 633, success: 77, rate: 12.2 },
  { path: "도입문의", total: 436, success: 30, rate: 6.9 },
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
  { level: "상", total: 198, success: 35, rate: 17.7 },
  { level: "중", total: 317, success: 18, rate: 5.7 },
  { level: "하", total: 325, success: 9, rate: 2.8 },
  { level: "(미평가)", total: 3038, success: 241, rate: 7.9 },
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

export const cohortFunnel: CohortFunnel[] = [
  { month: "2025-12", total: 838, connected: 743, consulting: 742, deals: 85, connRate: 88.7, dealRate: 10.1 },
  { month: "2026-01", total: 512, connected: 492, consulting: 492, deals: 56, connRate: 96.1, dealRate: 10.9 },
  { month: "2026-02", total: 854, connected: 522, consulting: 519, deals: 59, connRate: 61.1, dealRate: 6.9 },
  { month: "2026-03", total: 710, connected: 553, consulting: 447, deals: 29, connRate: 77.9, dealRate: 4.1 },
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
  { month: "2026-01", channel: "facebook.business", total: 149, connected: 147, deals: 19, connRate: 98.7, dealRate: 12.8 },
  { month: "2026-02", channel: "facebook.business", total: 212, connected: 170, deals: 20, connRate: 80.2, dealRate: 9.4 },
  { month: "2026-03", channel: "facebook.business", total: 194, connected: 175, deals: 9, connRate: 90.2, dealRate: 4.6 },
  { month: "2025-12", channel: "naver.searchad", total: 120, connected: 119, deals: 21, connRate: 99.2, dealRate: 17.5 },
  { month: "2026-01", channel: "naver.searchad", total: 109, connected: 109, deals: 7, connRate: 100.0, dealRate: 6.4 },
  { month: "2026-02", channel: "naver.searchad", total: 85, connected: 63, deals: 15, connRate: 74.1, dealRate: 17.6 },
  { month: "2026-03", channel: "naver.searchad", total: 85, connected: 71, deals: 3, connRate: 83.5, dealRate: 3.5 },
  { month: "2025-12", channel: "naver", total: 68, connected: 67, deals: 12, connRate: 98.5, dealRate: 17.6 },
  { month: "2026-01", channel: "naver", total: 70, connected: 69, deals: 15, connRate: 98.6, dealRate: 21.4 },
  { month: "2026-02", channel: "naver", total: 71, connected: 50, deals: 12, connRate: 70.4, dealRate: 16.9 },
  { month: "2026-03", channel: "naver", total: 51, connected: 44, deals: 8, connRate: 86.3, dealRate: 15.7 },
  { month: "2025-12", channel: "cashnote", total: 31, connected: 31, deals: 0, connRate: 100.0, dealRate: 0.0 },
  { month: "2026-02", channel: "cashnote", total: 45, connected: 25, deals: 0, connRate: 55.6, dealRate: 0.0 },
  { month: "2026-03", channel: "cashnote", total: 98, connected: 81, deals: 0, connRate: 82.7, dealRate: 0.0 },
  { month: "2026-02", channel: "danggeun_market", total: 16, connected: 12, deals: 0, connRate: 75.0, dealRate: 0.0 },
  { month: "2026-03", channel: "danggeun_market", total: 84, connected: 69, deals: 0, connRate: 82.1, dealRate: 0.0 },
]

export type LeadTimeBucket = {
  range: string
  count: number
}

export const leadTimeBuckets: LeadTimeBucket[] = [
  { range: "당일", count: 35 },
  { range: "1-3일", count: 49 },
  { range: "4-7일", count: 43 },
  { range: "8-14일", count: 37 },
  { range: "15-30일", count: 55 },
  { range: "31일+", count: 72 },
]
