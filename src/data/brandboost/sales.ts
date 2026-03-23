// BrandBoost 세일즈 목업 데이터

export type MonthlyRevenue = {
  month: string
  revenue: number
  target: number
  deals: number
}

export type PipelineStage = {
  stage: string
  count: number
  value: number
  avgDays: number
}

export type DealRow = {
  id: string
  company: string
  contact: string
  stage: string
  value: number
  probability: number
  owner: string
  expectedClose: string
  createdAt: string
}

export type RepPerformance = {
  name: string
  deals: number
  revenue: number
  winRate: number
  avgDeal: number
}

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "2024-04", revenue: 128000000, target: 130000000, deals: 18 },
  { month: "2024-05", revenue: 141000000, target: 135000000, deals: 21 },
  { month: "2024-06", revenue: 158000000, target: 140000000, deals: 24 },
  { month: "2024-07", revenue: 134000000, target: 145000000, deals: 19 },
  { month: "2024-08", revenue: 162000000, target: 150000000, deals: 23 },
  { month: "2024-09", revenue: 178000000, target: 160000000, deals: 27 },
  { month: "2024-10", revenue: 189000000, target: 170000000, deals: 29 },
  { month: "2024-11", revenue: 204000000, target: 180000000, deals: 31 },
  { month: "2024-12", revenue: 231000000, target: 190000000, deals: 36 },
  { month: "2025-01", revenue: 172000000, target: 195000000, deals: 24 },
  { month: "2025-02", revenue: 198000000, target: 200000000, deals: 28 },
  { month: "2025-03", revenue: 224000000, target: 210000000, deals: 33 },
]

export const pipeline: PipelineStage[] = [
  { stage: "리드", count: 142, value: 1840000000, avgDays: 3 },
  { stage: "미팅", count: 68, value: 1240000000, avgDays: 8 },
  { stage: "제안", count: 34, value: 890000000, avgDays: 14 },
  { stage: "협상", count: 18, value: 620000000, avgDays: 21 },
  { stage: "계약", count: 9, value: 380000000, avgDays: 7 },
]

export const activeDeals: DealRow[] = [
  {
    id: "d001",
    company: "테크스타트 주식회사",
    contact: "김민준",
    stage: "협상",
    value: 48000000,
    probability: 75,
    owner: "이서연",
    expectedClose: "2025-04-15",
    createdAt: "2025-02-01",
  },
  {
    id: "d002",
    company: "글로벌마케팅그룹",
    contact: "박지우",
    stage: "제안",
    value: 86000000,
    probability: 50,
    owner: "최준혁",
    expectedClose: "2025-04-30",
    createdAt: "2025-02-18",
  },
  {
    id: "d003",
    company: "이커머스솔루션",
    contact: "정하은",
    stage: "협상",
    value: 124000000,
    probability: 80,
    owner: "이서연",
    expectedClose: "2025-04-10",
    createdAt: "2025-01-25",
  },
  {
    id: "d004",
    company: "미디어컴퍼니",
    contact: "강도현",
    stage: "미팅",
    value: 32000000,
    probability: 30,
    owner: "박성민",
    expectedClose: "2025-05-20",
    createdAt: "2025-03-05",
  },
  {
    id: "d005",
    company: "디지털에이전시",
    contact: "윤채원",
    stage: "제안",
    value: 67000000,
    probability: 55,
    owner: "최준혁",
    expectedClose: "2025-04-25",
    createdAt: "2025-02-28",
  },
  {
    id: "d006",
    company: "리테일체인",
    contact: "임태양",
    stage: "계약",
    value: 215000000,
    probability: 95,
    owner: "박성민",
    expectedClose: "2025-03-31",
    createdAt: "2025-01-10",
  },
]

export const repPerformance: RepPerformance[] = [
  { name: "이서연", deals: 14, revenue: 186000000, winRate: 68, avgDeal: 13300000 },
  { name: "최준혁", deals: 11, revenue: 142000000, winRate: 61, avgDeal: 12900000 },
  { name: "박성민", deals: 9, revenue: 198000000, winRate: 72, avgDeal: 22000000 },
  { name: "김도연", deals: 8, revenue: 96000000, winRate: 53, avgDeal: 12000000 },
  { name: "오지민", deals: 7, revenue: 84000000, winRate: 58, avgDeal: 12000000 },
]

export const salesKpis = {
  mrr: { value: 224000000, change: 13.1 },
  pipelineValue: { value: 4970000000, change: 8.4 },
  winRate: { value: 62, change: 3.2 },
  avgDealSize: { value: 16800000, change: 6.7 },
  avgSalesCycle: { value: 34, change: -4.1 },
  newDeals: { value: 33, change: 17.9 },
}
