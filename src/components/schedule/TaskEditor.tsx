import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DAYS,
  PRIORITIES,
  STATUSES,
  TEAMS,
  type Day,
  type Priority,
  type Status,
  type Task,
} from "@/lib/schedule-data";
import { useSchedule } from "@/lib/schedule-store";

function TaskRow({ task }: { task: Task }) {
  const { updateTask, removeTask } = useSchedule();

  return (
    <div className="grid gap-3 rounded-xl border border-border bg-card p-3 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:items-center">
      <Input
        value={task.name}
        aria-label="Task name"
        onChange={(e) => updateTask(task.id, { name: e.target.value })}
      />

      <Select value={task.day} onValueChange={(v) => updateTask(task.id, { day: v as Day })}>
        <SelectTrigger aria-label="Day">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DAYS.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={task.team} onValueChange={(v) => updateTask(task.id, { team: v })}>
        <SelectTrigger aria-label="Team">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {TEAMS.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={task.priority}
        onValueChange={(v) => updateTask(task.id, { priority: v as Priority })}
      >
        <SelectTrigger aria-label="Priority">
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

      <Select
        value={task.status}
        onValueChange={(v) => updateTask(task.id, { status: v as Status })}
      >
        <SelectTrigger aria-label="Status">
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

      <div className="flex gap-1.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Mark completed"
          title="Mark as completed"
          onClick={() => updateTask(task.id, { status: "Completed" })}
        >
          <Check className="size-4 text-success" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete task"
          title="Delete task"
          onClick={() => removeTask(task.id)}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}

export function TaskEditor() {
  const { tasks, addTask } = useSchedule();

  return (
    <div className="space-y-3">
      <div className="hidden gap-3 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase md:grid md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto]">
        <span>Task</span>
        <span>Day</span>
        <span>Team</span>
        <span>Priority</span>
        <span>Status</span>
        <span className="w-[84px]">Actions</span>
      </div>

      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}

      <Button variant="outline" onClick={addTask} className="w-full sm:w-auto">
        <Plus className="size-4" /> Add task
      </Button>
    </div>
  );
}
