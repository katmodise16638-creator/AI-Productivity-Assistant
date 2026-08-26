import { createFileRoute } from "@tanstack/react-router";
import { Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AiNotice } from "@/components/schedule/AiNotice";
import { TaskEditor } from "@/components/schedule/TaskEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITIES, generateWeeklyPlan, type Priority } from "@/lib/schedule-data";
import { useSchedule } from "@/lib/schedule-store";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Describe project activities and constraints to generate an editable weekly construction schedule.",
      },
      { property: "og:title", content: "AI Task Planner — AI Weekly Scheduler" },
      {
        property: "og:description",
        content: "Generate and edit an AI-suggested weekly construction plan.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const { plannerInput, setPlannerInput, setTasks, tasks } = useSchedule();
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const field = (key: keyof typeof plannerInput) => (value: string) =>
    setPlannerInput({ ...plannerInput, [key]: value });

  const generate = () => {
    setLoading(true);
    window.setTimeout(() => {
      setTasks(generateWeeklyPlan(plannerInput));
      setLoading(false);
      setGenerated(true);
    }, 900);
  };

  return (
    <AppShell
      title="AI Task Planner"
      description="Generate a suggested weekly construction schedule, then review and edit it."
    >
      <div className="space-y-6">
        <AiNotice />

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Project inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project name</Label>
                <Input
                  id="projectName"
                  value={plannerInput.projectName}
                  onChange={(e) => field("projectName")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phase">Current construction phase</Label>
                <Input
                  id="phase"
                  value={plannerInput.phase}
                  onChange={(e) => field("phase")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekStart">Week starting date</Label>
                <Input
                  id="weekStart"
                  type="date"
                  value={plannerInput.weekStart}
                  onChange={(e) => field("weekStart")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Available team</Label>
                <Input
                  id="team"
                  value={plannerInput.team}
                  onChange={(e) => field("team")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={plannerInput.priority}
                  onValueChange={(v) =>
                    setPlannerInput({ ...plannerInput, priority: v as Priority })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="constraints">Project constraints</Label>
                <Input
                  id="constraints"
                  value={plannerInput.constraints}
                  onChange={(e) => field("constraints")(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Describe the current project activities and constraints</Label>
              <Textarea
                id="notes"
                rows={5}
                value={plannerInput.notes}
                placeholder="Excavation is 70% complete. The foundation inspection must be completed before concrete can be poured. Steel reinforcement will arrive on Wednesday. The concrete crew is available Thursday and Friday."
                onChange={(e) => field("notes")(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={generate} disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {loading ? "Generating…" : "Generate Weekly Plan"}
              </Button>
              {generated && (
                <Button variant="outline" onClick={generate} disabled={loading}>
                  <RefreshCw className="size-4" /> Regenerate
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>
              Generated weekly schedule{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({tasks.length} activities · fully editable)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskEditor />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
