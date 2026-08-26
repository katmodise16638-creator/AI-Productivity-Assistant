export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const DAYS: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export type Priority = "High" | "Medium" | "Low";
export type Status = "Not Started" | "In Progress" | "Completed" | "At Risk";

export const PRIORITIES: Priority[] = ["High", "Medium", "Low"];
export const STATUSES: Status[] = ["Not Started", "In Progress", "Completed", "At Risk"];

export const TEAMS = [
  "Site Team",
  "Earthworks Team",
  "Concrete Team",
  "Steel Team",
  "Engineer",
] as const;

export type Task = {
  id: string;
  name: string;
  day: Day;
  team: string;
  priority: Priority;
  status: Status;
  phase: string;
};

export type PlannerInput = {
  projectName: string;
  phase: string;
  weekStart: string;
  team: string;
  priority: Priority;
  constraints: string;
  notes: string;
};

export const PROJECT = {
  name: "Riverside Commercial Development",
  type: "Commercial Construction Project",
};

export const RESPONSIBLE_AI_NOTICE =
  "Responsible AI Notice: AI-generated schedules and recommendations are planning suggestions only. They must be reviewed by the responsible Project Manager and relevant qualified professionals. The system does not replace engineering judgement, approved project documentation, safety procedures or construction regulations.";

export const uid = () => Math.random().toString(36).slice(2, 10);

export const INITIAL_TASKS: Task[] = [
  {
    id: uid(),
    name: "Site survey",
    day: "Monday",
    team: "Site Team",
    priority: "Medium",
    status: "Completed",
    phase: "Earthworks",
  },
  {
    id: uid(),
    name: "Complete excavation",
    day: "Monday",
    team: "Earthworks Team",
    priority: "High",
    status: "In Progress",
    phase: "Earthworks",
  },
  {
    id: uid(),
    name: "Compaction",
    day: "Tuesday",
    team: "Earthworks Team",
    priority: "Medium",
    status: "Not Started",
    phase: "Earthworks",
  },
  {
    id: uid(),
    name: "Install formwork",
    day: "Tuesday",
    team: "Concrete Team",
    priority: "Medium",
    status: "Not Started",
    phase: "Foundation Works",
  },
  {
    id: uid(),
    name: "Reinforcement installation",
    day: "Wednesday",
    team: "Steel Team",
    priority: "High",
    status: "Not Started",
    phase: "Foundation Works",
  },
  {
    id: uid(),
    name: "Engineer inspection",
    day: "Thursday",
    team: "Engineer",
    priority: "High",
    status: "At Risk",
    phase: "Foundation Works",
  },
  {
    id: uid(),
    name: "Concrete pour",
    day: "Friday",
    team: "Concrete Team",
    priority: "High",
    status: "Not Started",
    phase: "Concrete Works",
  },
];

/** Simulated AI generation — deterministic realistic construction week. */
export function generateWeeklyPlan(input: PlannerInput): Task[] {
  const base: Omit<Task, "id">[] = [
    {
      name: "Complete excavation",
      day: "Monday",
      team: "Earthworks Team",
      priority: "High",
      status: "In Progress",
      phase: "Earthworks",
    },
    {
      name: "Compaction and foundation preparation",
      day: "Tuesday",
      team: "Earthworks Team",
      priority: "Medium",
      status: "Not Started",
      phase: "Earthworks",
    },
    {
      name: "Install formwork",
      day: "Tuesday",
      team: "Concrete Team",
      priority: "Medium",
      status: "Not Started",
      phase: "Foundation Works",
    },
    {
      name: "Reinforcement installation",
      day: "Wednesday",
      team: "Steel Team",
      priority: "High",
      status: "Not Started",
      phase: "Foundation Works",
    },
    {
      name: "Engineer inspection",
      day: "Thursday",
      team: "Engineer",
      priority: "High",
      status: "Not Started",
      phase: "Foundation Works",
    },
    {
      name: "Concrete pour",
      day: "Friday",
      team: "Concrete Team",
      priority: "High",
      status: "Not Started",
      phase: "Concrete Works",
    },
    {
      name: "Curing checks and site clean-up",
      day: "Saturday",
      team: "Site Team",
      priority: "Low",
      status: "Not Started",
      phase: "Concrete Works",
    },
  ];

  const text = `${input.notes} ${input.constraints}`.toLowerCase();
  const extra: Omit<Task, "id">[] = [];

  if (text.includes("survey")) {
    extra.push({
      name: "Site survey verification",
      day: "Monday",
      team: "Site Team",
      priority: "Medium",
      status: "Not Started",
      phase: "Earthworks",
    });
  }
  if (text.includes("rain") || text.includes("weather")) {
    extra.push({
      name: "Weather contingency — dewatering and covering",
      day: "Wednesday",
      team: "Site Team",
      priority: "High",
      status: "At Risk",
      phase: "Earthworks",
    });
  }
  if (text.includes("safety")) {
    extra.push({
      name: "Safety toolbox talk and site induction",
      day: "Monday",
      team: "Site Team",
      priority: "High",
      status: "Not Started",
      phase: "Site Management",
    });
  }

  return [...extra, ...base].map((t) => ({
    ...t,
    id: uid(),
    priority: t.priority === "High" && input.priority === "Low" ? "Medium" : t.priority,
  }));
}

export function progressFor(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const notStarted = tasks.filter((t) => t.status === "Not Started").length;
  const atRisk = tasks.filter((t) => t.status === "At Risk").length;
  const percent = total === 0 ? 0 : Math.round(((completed + inProgress * 0.5) / total) * 100);
  return { total, completed, inProgress, notStarted, atRisk, percent };
}

export function phaseProgress(tasks: Task[]) {
  const phases = Array.from(new Set(tasks.map((t) => t.phase)));
  return phases.map((phase) => {
    const subset = tasks.filter((t) => t.phase === phase);
    return { phase, percent: progressFor(subset).percent, count: subset.length };
  });
}

/** Simulated AI assistant responses derived from live schedule data. */
export function assistantReply(question: string, tasks: Task[]): string {
  const q = question.toLowerCase();
  const stats = progressFor(tasks);
  const high = tasks.filter((t) => t.priority === "High" && t.status !== "Completed");
  const risk = tasks.filter((t) => t.status === "At Risk");

  if (q.includes("risk")) {
    if (risk.length === 0)
      return "No tasks are currently flagged At Risk. Keep monitoring the engineer inspection, since downstream concrete work depends on it.";
    return `${risk.length} task(s) are flagged At Risk: ${risk
      .map((t) => `${t.name} (${t.day}, ${t.team})`)
      .join("; ")}. Confirm resource availability and inspection bookings early in the week to protect the pour date.`;
  }

  if (q.includes("priority") || q.includes("highest")) {
    if (high.length === 0) return "All high priority activities are already completed. Well done.";
    return `Your highest priority open activities are: ${high
      .map((t) => `${t.name} — ${t.day} (${t.team})`)
      .join("; ")}. Sequence them so the engineer inspection is cleared before any concrete work begins.`;
  }

  if (q.includes("concrete pour") || q.includes("before")) {
    const pour = tasks.find((t) => t.name.toLowerCase().includes("concrete pour"));
    const pre = tasks.filter((t) =>
      /excavat|compact|formwork|reinforce|inspect|prepar/i.test(t.name),
    );
    return `Before the concrete pour${pour ? ` (${pour.day})` : ""} you should complete: ${pre
      .map((t) => `${t.name} (${t.status})`)
      .join(", ")}. The foundation inspection is the critical gate — the pour cannot proceed until it is signed off.`;
  }

  if (q.includes("summar") || q.includes("week")) {
    const byDay = DAYS.map((d) => {
      const items = tasks.filter((t) => t.day === d);
      return items.length ? `${d}: ${items.map((t) => t.name).join(", ")}` : null;
    }).filter(Boolean);
    return `This week is ${stats.percent}% complete across ${stats.total} activities (${stats.completed} completed, ${stats.inProgress} in progress, ${stats.atRisk} at risk).\n\n${byDay.join(
      "\n",
    )}`;
  }

  if (q.includes("progress") || q.includes("status")) {
    return `Weekly progress is at ${stats.percent}%. ${stats.completed} of ${stats.total} activities are complete, ${stats.inProgress} are in progress and ${stats.notStarted} have not started.`;
  }

  return `Based on the current weekly schedule (${stats.total} activities, ${stats.percent}% complete), the critical path runs through the foundation inspection into the concrete pour. Ask me about priorities, risks, pour prerequisites, or a summary of the week.`;
}
