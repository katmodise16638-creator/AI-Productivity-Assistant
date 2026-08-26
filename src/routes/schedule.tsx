import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { GanttChart, GanttLegend } from "@/components/schedule/GanttChart";
import { PriorityBadge, StatusBadge } from "@/components/schedule/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DAYS } from "@/lib/schedule-data";
import { useSchedule } from "@/lib/schedule-store";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Weekly Schedule — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Gantt-style weekly construction timeline showing every activity from Monday to Sunday with status colours.",
      },
      { property: "og:title", content: "Weekly Schedule — AI Weekly Scheduler" },
      {
        property: "og:description",
        content: "View the construction week as a simple Gantt-style timeline.",
      },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const { tasks } = useSchedule();
  const ordered = [...tasks].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));

  return (
    <AppShell
      title="Weekly Schedule"
      description="Gantt-style timeline of this week's construction activities."
    >
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader className="gap-3">
            <CardTitle>Week timeline</CardTitle>
            <GanttLegend />
          </CardHeader>
          <CardContent>
            <GanttChart tasks={ordered} />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Activity list</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {ordered.map((task) => (
              <div key={task.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{task.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {task.day} · {task.team} · {task.phase}
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
      </div>
    </AppShell>
  );
}
