export type MonthlyTarget = {
  month: string
  label: string
  targetLeads: number
  targetDeals: number
  actualLeads: number
  actualDeals: number
}

// 한화비전 제시 2026 월간 목표치 + 실제 데이터
// actualDeals = 결제월(paymentApprovedAt / 수정일자 fallback) 기준
export const monthlyTargets: MonthlyTarget[] = [
  { month: "2026-01", label: "1월", targetLeads: 513, targetDeals: 77, actualLeads: 512, actualDeals: 42 },
  { month: "2026-02", label: "2월", targetLeads: 641, targetDeals: 115, actualLeads: 854, actualDeals: 53 },
  { month: "2026-03", label: "3월", targetLeads: 769, targetDeals: 154, actualLeads: 710, actualDeals: 100 },
  { month: "2026-04", label: "4월", targetLeads: 874, targetDeals: 192, actualLeads: 0, actualDeals: 0 },
  { month: "2026-05", label: "5월", targetLeads: 1003, targetDeals: 231, actualLeads: 0, actualDeals: 0 },
  { month: "2026-06", label: "6월", targetLeads: 1077, targetDeals: 269, actualLeads: 0, actualDeals: 0 },
  { month: "2026-07", label: "7월", targetLeads: 1183, targetDeals: 308, actualLeads: 0, actualDeals: 0 },
  { month: "2026-08", label: "8월", targetLeads: 1282, targetDeals: 346, actualLeads: 0, actualDeals: 0 },
  { month: "2026-09", label: "9월", targetLeads: 1374, targetDeals: 385, actualLeads: 0, actualDeals: 0 },
  { month: "2026-10", label: "10월", targetLeads: 1459, targetDeals: 423, actualLeads: 0, actualDeals: 0 },
  { month: "2026-11", label: "11월", targetLeads: 1538, targetDeals: 462, actualLeads: 0, actualDeals: 0 },
  { month: "2026-12", label: "12월", targetLeads: 1667, targetDeals: 500, actualLeads: 0, actualDeals: 0 },
]

export const yearTarget = {
  totalLeads: 13380,
  totalDeals: 3462,
}
