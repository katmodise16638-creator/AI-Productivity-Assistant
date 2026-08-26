import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/schedule/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DAYS, STATUSES, phaseProgress, progressFor, type Status } from "@/lib/schedule-data";
import { useSchedule } from "@/lib/schedule-store";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress Tracker — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Track overall weekly construction progress by phase and update task statuses in real time.",
      },
      { property: "og:title", content: "Progress Tracker — AI Weekly Scheduler" },
      {
        property: "og:description",
        content: "Monitor completed, in-progress and outstanding construction activities.",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { tasks, updateTask } = useSchedule();
  const stats = progressFor(tasks);
  const phases = phaseProgress(tasks);
  const ordered = [...tasks].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));

  const tiles = [
    { label: "Completed", value: stats.completed, tone: "text-success" },
    { label: "In progress", value: stats.inProgress, tone: "text-info" },
    { label: "Not started", value: stats.notStarted, tone: "text-muted-foreground" },
    { label: "At risk", value: stats.atRisk, tone: "text-destructive" },
  ];

  return (
    <AppShell
      title="Progress Tracker"
      description="Weekly completion across phases and activities."
    >
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Overall weekly progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-semibold tracking-tight text-primary">
                {stats.percent}%
              </span>
              <span className="pb-1.5 text-sm text-muted-foreground">
                {stats.completed} of {stats.total} activities completed
              </span>
            </div>
            <Progress value={stats.percent} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {tiles.map((t) => (
                <div key={t.label} className="rounded-xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">{t.label}</p>
                  <p className={`mt-1 text-2xl font-semibold ${t.tone}`}>{t.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Progress by phase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {phases.map((p) => (
              <div key={p.phase} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {p.phase}{" "}
                    <span className="text-muted-foreground">({p.count} activities)</span>
                  </span>
                  <span className="text-muted-foreground">{p.percent}%</span>
                </div>
                <Progress value={p.percent} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Update task status</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {ordered.map((task) => (
              <div key={task.id} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{task.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {task.day} · {task.team}
                  </p>
                </div>
                <StatusBadge status={task.status} className="hidden sm:inline-flex" />
                <Select
                  value={task.status}
                  onValueChange={(v) => updateTask(task.id, { status: v as Status })}
                >
                  <SelectTrigger className="w-[160px]" aria-label={`Status for ${task.name}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
