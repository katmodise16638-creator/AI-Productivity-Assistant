import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PriorityBadge, StatusBadge } from "@/components/schedule/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DAYS, PROJECT, progressFor } from "@/lib/schedule-data";
import { useSchedule } from "@/lib/schedule-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Weekly construction dashboard with progress, task counts, risks and AI insights for the Riverside Commercial Development.",
      },
      { property: "og:title", content: "Dashboard — AI Weekly Scheduler" },
      {
        property: "og:description",
        content: "Track weekly construction progress, tasks at risk and AI planning insights.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { tasks } = useSchedule();
  const stats = progressFor(tasks);

  const cards = [
    {
      label: "Weekly progress",
      value: `${stats.percent}%`,
      icon: TrendingUp,
      tone: "text-primary",
    },
    { label: "Total tasks", value: stats.total, icon: ListChecks, tone: "text-foreground" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, tone: "text-success" },
    { label: "At risk", value: stats.atRisk, icon: AlertTriangle, tone: "text-destructive" },
  ];

  const ordered = [...tasks].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));

  return (
    <AppShell title="Dashboard" description={`${PROJECT.name} · ${PROJECT.type}`}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, tone }) => (
            <Card key={label} className="shadow-card">
              <CardContent className="flex items-center justify-between gap-4 py-2">
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className={`mt-1 text-3xl font-semibold tracking-tight ${tone}`}>{value}</p>
                </div>
                <div className="grid size-11 place-items-center rounded-xl bg-secondary">
                  <Icon className={`size-5 ${tone}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardContent className="space-y-2 py-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Overall weekly progress</span>
              <span className="text-muted-foreground">{stats.percent}%</span>
            </div>
            <Progress value={stats.percent} />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Card className="shadow-card">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>This week's tasks</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/schedule">View timeline</Link>
              </Button>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {ordered.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{task.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.day} · {task.team}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="h-fit border-primary/25 bg-accent/40 shadow-card">
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <Lightbulb className="size-4 text-primary" />
              <CardTitle className="text-base">AI Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The foundation inspection must be completed before the concrete pour. This
                activity should be prioritised to avoid delays.
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link to="/assistant">Ask the AI assistant</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
