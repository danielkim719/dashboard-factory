"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GitBranch,
  Megaphone,
  Target,
  XCircle,
  List,
  Bell,
  ChevronDown,
  Shield,
} from "lucide-react"
import { keeperConfig } from "@/config/keeper.config"
import { Separator } from "@/components/ui/separator"

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  GitBranch: <GitBranch className="w-4 h-4" />,
  Target: <Target className="w-4 h-4" />,
  Megaphone: <Megaphone className="w-4 h-4" />,
  XCircle: <XCircle className="w-4 h-4" />,
  List: <List className="w-4 h-4" />,
}

export default function KeeperLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r bg-card flex flex-col">
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: keeperConfig.colors.primary }}
          >
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">{keeperConfig.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Call Sales Dashboard</p>
          </div>
        </div>
        <Separator />

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {keeperConfig.nav.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/keeper" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={isActive ? { backgroundColor: keeperConfig.colors.primary } : {}}
              >
                {iconMap[item.icon]}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              DK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Daniel Kim</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
            <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <p className="text-sm font-medium">
              {keeperConfig.nav.find(
                (n) =>
                  pathname === n.href ||
                  (n.href !== "/keeper" && pathname.startsWith(n.href))
              )?.label ?? "Overview"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              2026-03-24 스냅샷
            </span>
            <button className="relative p-1.5 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}