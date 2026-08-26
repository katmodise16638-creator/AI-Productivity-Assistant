import { Link } from "@tanstack/react-router";
import {
  BotMessageSquare,
  CalendarRange,
  ChartNoAxesColumn,
  HardHat,
  LayoutDashboard,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { PROJECT } from "@/lib/schedule-data";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/planner", label: "AI Task Planner", icon: Sparkles },
  { to: "/schedule", label: "Weekly Schedule", icon: CalendarRange },
  { to: "/progress", label: "Progress Tracker", icon: ChartNoAxesColumn },
  { to: "/assistant", label: "AI Project Assistant", icon: BotMessageSquare },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className:
              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground shadow-soft",
          }}
        >
          <Icon className="size-4.5 shrink-0" />
          <span className="truncate">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar py-5">
      <div className="flex items-center gap-3 px-6 pb-6">
        <div className="grid size-10 place-items-center rounded-xl bg-sidebar-primary">
          <HardHat className="size-5 text-sidebar-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            AI Weekly Scheduler
          </p>
          <p className="truncate text-xs text-sidebar-foreground/55">Construction PM</p>
        </div>
      </div>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto px-5 pt-6">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-4">
          <p className="text-xs font-medium text-sidebar-foreground/60">Active project</p>
          <p className="mt-1 text-sm font-semibold text-sidebar-foreground">{PROJECT.name}</p>
          <p className="mt-0.5 text-xs text-sidebar-foreground/55">{PROJECT.type}</p>
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 lg:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-card">
            <SidebarContent onNavigate={() => setOpen(false)} />
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-2 text-sidebar-foreground/70 hover:bg-sidebar-accent"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <div className={cn("lg:pl-72")}>
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <button
              aria-label="Open menu"
              className="rounded-lg border border-border p-2 text-foreground lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {title}
              </h1>
              <p className="truncate text-xs text-muted-foreground sm:text-sm">{description}</p>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
