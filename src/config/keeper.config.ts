import type { ClientConfig } from "./brandboost.config"

export const keeperConfig: ClientConfig = {
  name: "한화비전 키퍼",
  slug: "keeper",
  colors: {
    primary: "#FF6B2C",
    secondary: "#1E3A5F",
    accent: "#00B4D8",
    chart: ["#FF6B2C", "#1E3A5F", "#00B4D8", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6366f1"],
  },
  currency: "KRW",
  nav: [
    { label: "Overview", href: "/keeper", icon: "LayoutDashboard" },
    { label: "파이프라인", href: "/keeper/pipeline", icon: "GitBranch" },
    { label: "목표 달성률", href: "/keeper/targets", icon: "Target" },
    { label: "채널 분석", href: "/keeper/channels", icon: "Megaphone" },
    { label: "실패 분석", href: "/keeper/failures", icon: "XCircle" },
    { label: "리드 상세", href: "/keeper/leads", icon: "List" },
  ],
}