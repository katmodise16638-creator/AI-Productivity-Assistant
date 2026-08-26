import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  INITIAL_TASKS,
  PROJECT,
  uid,
  type PlannerInput,
  type Task,
} from "./schedule-data";

type ScheduleContextValue = {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  addTask: () => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  removeTask: (id: string) => void;
  plannerInput: PlannerInput;
  setPlannerInput: (input: PlannerInput) => void;
};

const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const defaultInput: PlannerInput = {
  projectName: PROJECT.name,
  phase: "Foundation Works",
  weekStart: "2026-08-31",
  team: "Earthworks Team, Concrete Team, Steel Team",
  priority: "High",
  constraints: "Concrete crew available Thursday and Friday only.",
  notes:
    "Excavation is 70% complete. The foundation inspection must be completed before concrete can be poured. Steel reinforcement will arrive on Wednesday. The concrete crew is available Thursday and Friday.",
};

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [plannerInput, setPlannerInput] = useState<PlannerInput>(defaultInput);

  const value = useMemo<ScheduleContextValue>(
    () => ({
      tasks,
      setTasks,
      plannerInput,
      setPlannerInput,
      addTask: () =>
        setTasks((prev) => [
          ...prev,
          {
            id: uid(),
            name: "New activity",
            day: "Monday",
            team: "Site Team",
            priority: "Medium",
            status: "Not Started",
            phase: "Site Management",
          },
        ]),
      updateTask: (id, patch) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t))),
      removeTask: (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    }),
    [tasks, plannerInput],
  );

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be used within ScheduleProvider");
  return ctx;
}
