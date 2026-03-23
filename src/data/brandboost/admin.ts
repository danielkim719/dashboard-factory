// BrandBoost 어드민/내부운영 목업 데이터

export type MonthlyBudget = {
  month: string
  planned: number
  actual: number
  category: string
}

export type TicketRow = {
  id: string
  title: string
  requester: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in_progress" | "resolved" | "closed"
  createdAt: string
  resolvedAt: string | null
}

export type TeamProductivity = {
  week: string
  tasksCompleted: number
  tasksCreated: number
  onTime: number
}

export type ContractRow = {
  id: string
  client: string
  value: number
  startDate: string
  endDate: string
  status: "active" | "expiring" | "expired" | "pending"
  type: string
}

export type ExpenseCategory = {
  category: string
  budget: number
  spent: number
  remaining: number
}

export const monthlyBudget: MonthlyBudget[] = [
  { month: "2024-04", planned: 180000000, actual: 172000000, category: "전체" },
  { month: "2024-05", planned: 185000000, actual: 189000000, category: "전체" },
  { month: "2024-06", planned: 190000000, actual: 184000000, category: "전체" },
  { month: "2024-07", planned: 188000000, actual: 192000000, category: "전체" },
  { month: "2024-08", planned: 195000000, actual: 198000000, category: "전체" },
  { month: "2024-09", planned: 200000000, actual: 196000000, category: "전체" },
  { month: "2024-10", planned: 205000000, actual: 208000000, category: "전체" },
  { month: "2024-11", planned: 210000000, actual: 214000000, category: "전체" },
  { month: "2024-12", planned: 240000000, actual: 238000000, category: "전체" },
  { month: "2025-01", planned: 195000000, actual: 188000000, category: "전체" },
  { month: "2025-02", planned: 200000000, actual: 202000000, category: "전체" },
  { month: "2025-03", planned: 210000000, actual: 207000000, category: "전체" },
]

export const expenseCategories: ExpenseCategory[] = [
  { category: "인건비", budget: 120000000, spent: 118000000, remaining: 2000000 },
  { category: "마케팅 광고비", budget: 30000000, spent: 26040000, remaining: 3960000 },
  { category: "소프트웨어/도구", budget: 8000000, spent: 7200000, remaining: 800000 },
  { category: "오피스/시설", budget: 12000000, spent: 11800000, remaining: 200000 },
  { category: "교육/컨퍼런스", budget: 5000000, spent: 3200000, remaining: 1800000 },
  { category: "기타 운영비", budget: 10000000, spent: 8600000, remaining: 1400000 },
]

export const supportTickets: TicketRow[] = [
  {
    id: "t001",
    title: "CRM 데이터 동기화 오류",
    requester: "이서연",
    category: "IT 지원",
    priority: "high",
    status: "in_progress",
    createdAt: "2025-03-20",
    resolvedAt: null,
  },
  {
    id: "t002",
    title: "3월 급여 명세서 요청",
    requester: "김도연",
    category: "인사/급여",
    priority: "medium",
    status: "resolved",
    createdAt: "2025-03-18",
    resolvedAt: "2025-03-19",
  },
  {
    id: "t003",
    title: "노트북 교체 요청",
    requester: "박성민",
    category: "IT 지원",
    priority: "low",
    status: "open",
    createdAt: "2025-03-22",
    resolvedAt: null,
  },
  {
    id: "t004",
    title: "계약서 법무 검토 요청",
    requester: "최준혁",
    category: "법무",
    priority: "urgent",
    status: "in_progress",
    createdAt: "2025-03-23",
    resolvedAt: null,
  },
  {
    id: "t005",
    title: "신규 입사자 온보딩 자료",
    requester: "오지민",
    category: "인사/급여",
    priority: "medium",
    status: "open",
    createdAt: "2025-03-21",
    resolvedAt: null,
  },
  {
    id: "t006",
    title: "Slack 채널 권한 요청",
    requester: "강도현",
    category: "IT 지원",
    priority: "low",
    status: "resolved",
    createdAt: "2025-03-19",
    resolvedAt: "2025-03-19",
  },
]

export const teamProductivity: TeamProductivity[] = [
  { week: "W1 (3/3)", tasksCompleted: 48, tasksCreated: 52, onTime: 89 },
  { week: "W2 (3/10)", tasksCompleted: 56, tasksCreated: 49, onTime: 91 },
  { week: "W3 (3/17)", tasksCompleted: 61, tasksCreated: 58, onTime: 88 },
  { week: "W4 (3/24)", tasksCompleted: 44, tasksCreated: 62, onTime: 86 },
]

export const contracts: ContractRow[] = [
  {
    id: "con001",
    client: "테크스타트 주식회사",
    value: 120000000,
    startDate: "2024-04-01",
    endDate: "2025-03-31",
    status: "expiring",
    type: "연간 구독",
  },
  {
    id: "con002",
    client: "글로벌마케팅그룹",
    value: 240000000,
    startDate: "2024-07-01",
    endDate: "2026-06-30",
    status: "active",
    type: "2년 약정",
  },
  {
    id: "con003",
    client: "이커머스솔루션",
    value: 60000000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "expired",
    type: "연간 구독",
  },
  {
    id: "con004",
    client: "리테일체인",
    value: 215000000,
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    status: "pending",
    type: "연간 구독",
  },
  {
    id: "con005",
    client: "미디어컴퍼니",
    value: 48000000,
    startDate: "2024-10-01",
    endDate: "2025-09-30",
    status: "active",
    type: "연간 구독",
  },
]

export const adminKpis = {
  headcount: { value: 28, change: 2 },
  avgTicketResolutionHours: { value: 6.4, change: -18.2 },
  taskCompletionRate: { value: 88, change: 3.1 },
  budgetUtilization: { value: 94.2, change: -1.8 },
  contractsExpiringSoon: { value: 2, change: 0 },
  nps: { value: 72, change: 8 },
}
