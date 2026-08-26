import { DAYS, type Task } from "@/lib/schedule-data";
import { cn } from "@/lib/utils";
import { statusBar } from "./StatusBadge";

export function GanttChart({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[760px]">
        <div className="grid grid-cols-[220px_repeat(7,minmax(0,1fr))] border-b border-border pb-2">
          <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Activity
          </div>
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              {d.slice(0, 3)}
            </div>
          ))}
        </div>

        <div className="divide-y divide-border">
          {tasks.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No activities scheduled yet.
            </p>
          )}
          {tasks.map((task) => {
            const index = DAYS.indexOf(task.day);
            return (
              <div
                key={task.id}
                className="grid grid-cols-[220px_repeat(7,minmax(0,1fr))] items-center py-2.5"
              >
                <div className="pr-4">
                  <p className="truncate text-sm font-medium text-foreground">{task.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{task.team}</p>
                </div>
                {DAYS.map((d, i) => (
                  <div key={d} className="px-1">
                    {i === index ? (
                      <div
                        className={cn(
                          "h-7 rounded-lg shadow-soft transition-all",
                          statusBar[task.status],
                        )}
                        title={`${task.name} — ${task.status}`}
                      />
                    ) : (
                      <div className="h-7 rounded-lg bg-muted/50" />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function GanttLegend() {
  return (
    <div className="flex flex-wrap gap-4">
      {(Object.keys(statusBar) as (keyof typeof statusBar)[]).map((s) => (
        <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={cn("size-3 rounded-full", statusBar[s])} />
          {s}
        </div>
      ))}
    </div>
  );
}
