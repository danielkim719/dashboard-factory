// 3축 파이프라인: 부재중 상태 → 딜스테이지 → 최종 결과
// 에어테이블 [한화비전] 개발 뷰 기준 (2026-03-25)

export type PipelineStage = {
  name: string
  count: number
  color: string
}

// 부재중/딜스테이지: 진행중(최종결과 미정) 557건만
export const absenceStages: PipelineStage[] = [
  { name: "유입", count: 362, color: "#10b981" },
  { name: "부재중", count: 58, color: "#f59e0b" },
  { name: "부재중2회", count: 111, color: "#f97316" },
  { name: "부재중3회", count: 25, color: "#ef4444" },
]

// 딜 파이프라인 순서: 초기 접촉 → 상담 → 예약 → 실사 → 결제 → 완료
export const dealStages: PipelineStage[] = [
  { name: "문자대기", count: 24, color: "#94a3b8" },
  { name: "상담대기", count: 67, color: "#64748b" },
  { name: "상담중", count: 433, color: "#00B4D8" },
  { name: "전화예약(랜덤)", count: 1, color: "#8b5cf6" },
  { name: "전화예약(약속)", count: 2, color: "#7c3aed" },
  { name: "현장실사", count: 2, color: "#6366f1" },
  { name: "결제 대기", count: 26, color: "#f59e0b" },
  { name: "회원가입완료", count: 2, color: "#10b981" },
]

// 최종결과: 전체 3,959건
export const finalStages: PipelineStage[] = [
  { name: "결제 완료 (영원)", count: 221, color: "#10b981" },
  { name: "결제 완료 (한화비전)", count: 89, color: "#059669" },
  { name: "실패", count: 2997, color: "#ef4444" },
  { name: "B2B", count: 95, color: "#1E3A5F" },
  { name: "(진행중)", count: 557, color: "#94a3b8" },
]

// 진행중 557건의 부재중 × 딜스테이지 교차
export type CrossCell = {
  absence: string
  deal: string
  count: number
}

export const activeCross: CrossCell[] = [
  { absence: "유입", deal: "상담중", count: 299 },
  { absence: "유입", deal: "상담대기", count: 33 },
  { absence: "유입", deal: "결제 대기", count: 23 },
  { absence: "유입", deal: "전화예약(약속)", count: 2 },
  { absence: "유입", deal: "현장실사", count: 2 },
  { absence: "유입", deal: "회원가입완료", count: 2 },
  { absence: "유입", deal: "문자대기", count: 1 },
  { absence: "부재중", deal: "상담대기", count: 32 },
  { absence: "부재중", deal: "문자대기", count: 15 },
  { absence: "부재중", deal: "상담중", count: 7 },
  { absence: "부재중", deal: "결제 대기", count: 3 },
  { absence: "부재중", deal: "전화예약(랜덤)", count: 1 },
  { absence: "부재중2회", deal: "상담중", count: 101 },
  { absence: "부재중2회", deal: "문자대기", count: 8 },
  { absence: "부재중2회", deal: "상담대기", count: 2 },
  { absence: "부재중3회", deal: "상담중", count: 25 },
]

export const totalRecords = 3959
export const activeRecords = 557