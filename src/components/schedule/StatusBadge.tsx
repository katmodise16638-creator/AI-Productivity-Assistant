import type { Priority, Status } from "@/lib/schedule-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<Status, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-info/12 text-info",
  Completed: "bg-success/15 text-success",
  "At Risk": "bg-destructive/12 text-destructive",
};

export const statusBar: Record<Status, string> = {
  "Not Started": "bg-muted-foreground/35",
  "In Progress": "bg-info",
  Completed: "bg-success",
  "At Risk": "bg-destructive",
};

const priorityStyles: Record<Priority, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/20 text-warning-foreground",
  Low: "bg-secondary text-secondary-foreground",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        priorityStyles[priority],
      )}
    >
      {priority}
    </span>
  );
}
