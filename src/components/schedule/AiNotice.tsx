import { ShieldAlert } from "lucide-react";
import { RESPONSIBLE_AI_NOTICE } from "@/lib/schedule-data";

export function AiNotice() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-accent/40 p-4">
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
      <p className="text-xs leading-relaxed text-muted-foreground">{RESPONSIBLE_AI_NOTICE}</p>
    </div>
  );
}
