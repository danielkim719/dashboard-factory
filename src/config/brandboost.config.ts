export type NavItem = {
  label: string
  href: string
  icon: string
}

export type ClientConfig = {
  name: string
  slug: string
  colors: {
    primary: string
    secondary: string
    accent: string
    chart: string[]
  }
  currency: "KRW" | "USD"
  nav: NavItem[]
}

export const brandboostConfig: ClientConfig = {
  name: "브랜드부스트",
  slug: "brandboost",
  colors: {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#06b6d4",
    chart: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"],
  },
  currency: "KRW",
  nav: [
    { label: "Overview", href: "/brandboost", icon: "LayoutDashboard" },
    { label: "마케팅", href: "/brandboost/marketing", icon: "Megaphone" },
    { label: "세일즈", href: "/brandboost/sales", icon: "TrendingUp" },
    { label: "어드민 운영", href: "/brandboost/admin", icon: "Settings" },
  ],
}