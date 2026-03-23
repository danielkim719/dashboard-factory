// BrandBoost 마케팅 목업 데이터

export type MonthlyTraffic = {
  month: string
  organic: number
  paid: number
  social: number
  direct: number
}

export type CampaignRow = {
  id: string
  name: string
  channel: string
  budget: number
  spend: number
  impressions: number
  clicks: number
  conversions: number
  roas: number
  status: "active" | "paused" | "ended"
}

export type ChannelShare = {
  name: string
  value: number
}

export type FunnelStage = {
  stage: string
  count: number
  rate: number
}

export const monthlyTraffic: MonthlyTraffic[] = [
  { month: "2024-04", organic: 12400, paid: 8200, social: 4100, direct: 2800 },
  { month: "2024-05", organic: 13100, paid: 9100, social: 4600, direct: 3100 },
  { month: "2024-06", organic: 14200, paid: 9800, social: 5200, direct: 3400 },
  { month: "2024-07", organic: 13800, paid: 10200, social: 5800, direct: 3200 },
  { month: "2024-08", organic: 14900, paid: 11000, social: 6100, direct: 3600 },
  { month: "2024-09", organic: 15600, paid: 12300, social: 6800, direct: 3900 },
  { month: "2024-10", organic: 16200, paid: 13100, social: 7200, direct: 4100 },
  { month: "2024-11", organic: 17800, paid: 14500, social: 8100, direct: 4600 },
  { month: "2024-12", organic: 19200, paid: 16200, social: 9400, direct: 5100 },
  { month: "2025-01", organic: 16100, paid: 13800, social: 7600, direct: 4200 },
  { month: "2025-02", organic: 17400, paid: 14900, social: 8200, direct: 4600 },
  { month: "2025-03", organic: 19800, paid: 16800, social: 9600, direct: 5300 },
]

export const campaigns: CampaignRow[] = [
  {
    id: "c001",
    name: "봄 시즌 브랜드 인지도",
    channel: "Google Ads",
    budget: 5000000,
    spend: 4320000,
    impressions: 892000,
    clicks: 18400,
    conversions: 412,
    roas: 3.8,
    status: "active",
  },
  {
    id: "c002",
    name: "SNS 리타겟팅",
    channel: "Meta Ads",
    budget: 3000000,
    spend: 2980000,
    impressions: 1240000,
    clicks: 31200,
    conversions: 688,
    roas: 4.2,
    status: "active",
  },
  {
    id: "c003",
    name: "유튜브 브랜드필름",
    channel: "YouTube",
    budget: 8000000,
    spend: 7650000,
    impressions: 2180000,
    clicks: 24600,
    conversions: 318,
    roas: 2.1,
    status: "active",
  },
  {
    id: "c004",
    name: "네이버 키워드 광고",
    channel: "Naver",
    budget: 4000000,
    spend: 3890000,
    impressions: 560000,
    clicks: 22100,
    conversions: 542,
    roas: 5.1,
    status: "active",
  },
  {
    id: "c005",
    name: "겨울 세일 캠페인",
    channel: "Google Ads",
    budget: 6000000,
    spend: 6000000,
    impressions: 1340000,
    clicks: 28900,
    conversions: 724,
    roas: 4.6,
    status: "ended",
  },
  {
    id: "c006",
    name: "인플루언서 콜라보",
    channel: "Instagram",
    budget: 2500000,
    spend: 1200000,
    impressions: 480000,
    clicks: 9800,
    conversions: 156,
    roas: 1.8,
    status: "paused",
  },
]

export const channelShare: ChannelShare[] = [
  { name: "Organic Search", value: 38 },
  { name: "Paid Search", value: 32 },
  { name: "Social", value: 18 },
  { name: "Direct", value: 10 },
  { name: "Referral", value: 2 },
]

export const marketingFunnel: FunnelStage[] = [
  { stage: "노출 (Impressions)", count: 4820000, rate: 100 },
  { stage: "클릭 (Clicks)", count: 96400, rate: 2.0 },
  { stage: "방문 (Sessions)", count: 71200, rate: 73.9 },
  { stage: "리드 (Leads)", count: 8960, rate: 12.6 },
  { stage: "MQL", count: 2688, rate: 30.0 },
  { stage: "SQL", count: 1075, rate: 40.0 },
]

export const marketingKpis = {
  totalLeads: { value: 8960, change: 14.2 },
  cpl: { value: 18400, change: -8.3 },
  totalSpend: { value: 26040000, change: 12.1 },
  avgRoas: { value: 3.9, change: 5.4 },
  organicTraffic: { value: 19800, change: 13.8 },
  conversionRate: { value: 2.4, change: 0.3 },
}
