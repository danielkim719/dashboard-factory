// 실패 분석 데이터 (2026-03-25 기준)
// 전체 실패: 2,878건 / 전체 성공: 303건

export const failureSummary = {
  totalFail: 2878,
  totalSuccess: 303,
  failRate: 74.2,
  // 실패 유형 대분류
  unreachable: 2452,        // 부재중3회 탈락
  unreachableRate: 85.2,
  afterConsult: 426,         // 상담 후 실패
  afterConsultRate: 14.8,
  // 통화 여부
  calledAndFailed: 651,      // 메모 기록 있음 (통화함)
  neverCalled: 2227,         // 메모 없음 (미통화)
  // 사유 기록
  reasonRecorded: 250,
  reasonMissing: 2628,
}

export type FailureReason = {
  reason: string
  count: number
  color: string
}

export const failureReasons: FailureReason[] = [
  { reason: "부재중", count: 76, color: "#ef4444" },
  { reason: "기타 사유", count: 43, color: "#94a3b8" },
  { reason: "가격 부담", count: 38, color: "#f59e0b" },
  { reason: "잘못 유입됨", count: 36, color: "#8b5cf6" },
  { reason: "타 회사 선택", count: 32, color: "#1E3A5F" },
  { reason: "변심", count: 19, color: "#f97316" },
  { reason: "단순 견적 문의", count: 15, color: "#64748b" },
  { reason: "결합 서비스 필요", count: 5, color: "#06b6d4" },
  { reason: "콜 늦은 대처", count: 1, color: "#ec4899" },
]

export type FailByChannel = {
  channel: string
  total: number
  fail: number
  failRate: number
  success: number
  successRate: number
}

export const failByChannel: FailByChannel[] = [
  { channel: "토스 배너광고", total: 34, fail: 31, failRate: 91.2, success: 0, successRate: 0.0 },
  { channel: "naver.performance_da", total: 42, fail: 38, failRate: 90.5, success: 2, successRate: 4.8 },
  { channel: "meta", total: 179, fail: 157, failRate: 87.7, success: 18, successRate: 10.1 },
  { channel: "cashnote", total: 182, fail: 156, failRate: 85.7, success: 0, successRate: 0.0 },
  { channel: "(미추적)", total: 1715, fail: 1372, failRate: 80.0, success: 123, successRate: 7.2 },
  { channel: "naver.searchad", total: 486, fail: 383, failRate: 78.8, success: 52, successRate: 10.7 },
  { channel: "naver", total: 285, fail: 196, failRate: 68.8, success: 51, successRate: 17.9 },
  { channel: "facebook.business", total: 555, fail: 352, failRate: 63.4, success: 48, successRate: 8.6 },
  { channel: "danggeun_market", total: 100, fail: 63, failRate: 63.0, success: 0, successRate: 0.0 },
]

export type FailByEntry = {
  entry: string
  total: number
  fail: number
  failRate: number
}

export const failByEntry: FailByEntry[] = [
  { entry: "토스", total: 172, fail: 170, failRate: 98.8 },
  { entry: "보안서비스 도입 문의", total: 42, fail: 40, failRate: 95.2 },
  { entry: "카페&베이커리 페어", total: 57, fail: 54, failRate: 94.7 },
  { entry: "서비스 소개서 다운", total: 85, fail: 75, failRate: 88.2 },
  { entry: "빠른 상담하기 (도입문의)", total: 633, fail: 548, failRate: 86.6 },
  { entry: "견적계산기", total: 1554, fail: 1222, failRate: 78.6 },
  { entry: "한달프로모션", total: 49, fail: 35, failRate: 71.4 },
  { entry: "도입문의", total: 436, fail: 247, failRate: 56.7 },
  { entry: "창업 가이드 북 다운로드", total: 159, fail: 47, failRate: 29.6 },
]

export type FailByTemp = {
  level: string
  total: number
  fail: number
  failRate: number
  success: number
  successRate: number
}

export const failByTemp: FailByTemp[] = [
  { level: "(미평가)", total: 3038, fail: 2423, failRate: 79.8, success: 241, successRate: 7.9 },
  { level: "상", total: 198, fail: 133, failRate: 67.2, success: 35, successRate: 17.7 },
  { level: "중", total: 317, fail: 191, failRate: 60.3, success: 18, successRate: 5.7 },
  { level: "하", total: 325, fail: 131, failRate: 40.3, success: 9, successRate: 2.8 },
]

export type FailByPipeline = {
  pipeline: string
  count: number
}

export const failByPipeline: FailByPipeline[] = [
  { pipeline: "실패 파이프라인 (888)", count: 808 },
  { pipeline: "(에어테이블 직접)", count: 772 },
  { pipeline: "실패 파이프라인", count: 613 },
  { pipeline: "실패 파이프라인 (500)", count: 466 },
  { pipeline: "진행중 → 실패", count: 118 },
  { pipeline: "장기고객관리 → 실패", count: 88 },
  { pipeline: "창업 가이드 북 → 실패", count: 13 },
]

export type MonthlyFail = {
  month: string
  total: number
  fail: number
  failRate: number
}

export const monthlyFails: MonthlyFail[] = [
  { month: "2025-09", total: 221, fail: 202, failRate: 91.4 },
  { month: "2025-10", total: 270, fail: 250, failRate: 92.6 },
  { month: "2025-11", total: 236, fail: 217, failRate: 91.9 },
  { month: "2025-12", total: 838, fail: 658, failRate: 78.5 },
  { month: "2026-01", total: 512, fail: 413, failRate: 80.7 },
  { month: "2026-02", total: 854, fail: 619, failRate: 72.5 },
  { month: "2026-03", total: 710, fail: 304, failRate: 42.8 },
]