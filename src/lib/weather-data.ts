import { DAYS, type Day, type Task } from "./schedule-data";

export type WeatherCondition =
  | "Sunny"
  | "Partly Cloudy"
  | "Cloudy"
  | "Light Rain"
  | "Heavy Rain"
  | "Thunderstorms";

export type WeatherDay = {
  date: string;
  dayName: Day;
  condition: WeatherCondition;
  tempHighC: number;
  tempLowC: number;
  rainProbability: number;
};

export type ImpactType = "delay" | "risk" | "recommendation";

export type ImpactWarning = {
  type: ImpactType;
  title: string;
  message: string;
};

export const WEATHER_CONDITIONS: WeatherCondition[] = [
  "Sunny",
  "Partly Cloudy",
  "Cloudy",
  "Light Rain",
  "Heavy Rain",
  "Thunderstorms",
];

/** Mock 7-day forecast aligned with the default schedule week. */
export const MOCK_WEATHER: WeatherDay[] = [
  {
    date: "2026-08-31",
    dayName: "Monday",
    condition: "Partly Cloudy",
    tempHighC: 22,
    tempLowC: 12,
    rainProbability: 20,
  },
  {
    date: "2026-09-01",
    dayName: "Tuesday",
    condition: "Light Rain",
    tempHighC: 19,
    tempLowC: 11,
    rainProbability: 60,
  },
  {
    date: "2026-09-02",
    dayName: "Wednesday",
    condition: "Cloudy",
    tempHighC: 21,
    tempLowC: 13,
    rainProbability: 30,
  },
  {
    date: "2026-09-03",
    dayName: "Thursday",
    condition: "Heavy Rain",
    tempHighC: 18,
    tempLowC: 14,
    rainProbability: 85,
  },
  {
    date: "2026-09-04",
    dayName: "Friday",
    condition: "Thunderstorms",
    tempHighC: 17,
    tempLowC: 13,
    rainProbability: 95,
  },
  {
    date: "2026-09-05",
    dayName: "Saturday",
    condition: "Cloudy",
    tempHighC: 20,
    tempLowC: 12,
    rainProbability: 25,
  },
  {
    date: "2026-09-06",
    dayName: "Sunday",
    condition: "Sunny",
    tempHighC: 24,
    tempLowC: 11,
    rainProbability: 5,
  },
];

const SEVERE_CONDITIONS: WeatherCondition[] = ["Heavy Rain", "Thunderstorms"];
const RAINY_CONDITIONS: WeatherCondition[] = ["Light Rain", "Heavy Rain", "Thunderstorms"];

function formatTaskNames(tasks: Task[]): string {
  if (tasks.length === 1) return tasks[0]!.name;
  const allButLast = tasks.slice(0, -1).map((t) => t.name);
  return `${allButLast.join(", ")} and ${tasks[tasks.length - 1]!.name}`;
}

/** Generate delay/risk/recommendation warnings from mock weather and the live schedule. */
export function generateWeatherImpact(
  weather: WeatherDay[],
  tasks: Task[],
): ImpactWarning[] {
  const warnings: ImpactWarning[] = [];

  const severeDays = weather.filter((w) => SEVERE_CONDITIONS.includes(w.condition));
  const rainyDays = weather.filter((w) => RAINY_CONDITIONS.includes(w.condition));

  // Delay warnings for tasks scheduled on severe-weather days.
  severeDays.forEach((day) => {
    const dayTasks = tasks.filter((t) => t.day === day.dayName);
    if (dayTasks.length) {
      warnings.push({
        type: "delay",
        title: "Possible Delay",
        message: `${day.condition} on ${day.dayName} may affect ${formatTaskNames(dayTasks)}.`,
      });
    }
  });

  // Risk warnings for weather-sensitive milestones.
  const pour = tasks.find((t) => t.name.toLowerCase().includes("concrete pour"));
  if (pour) {
    const pourWeather = weather.find((w) => w.dayName === pour.day);
    if (pourWeather && RAINY_CONDITIONS.includes(pourWeather.condition)) {
      warnings.push({
        type: "risk",
        title: "Possible Risk",
        message: `${pourWeather.condition} is forecast for ${pour.day} — the scheduled concrete pour may be impacted.`,
      });
    }
  }

  const inspection = tasks.find((t) =>
    t.name.toLowerCase().includes("engineer inspection"),
  );
  if (inspection) {
    const inspectionWeather = weather.find((w) => w.dayName === inspection.day);
    if (inspectionWeather && SEVERE_CONDITIONS.includes(inspectionWeather.condition)) {
      warnings.push({
        type: "risk",
        title: "Possible Risk",
        message: `Severe weather on ${inspection.day} could delay the engineer inspection.`,
      });
    }
  }

  // General recommendation when rain is expected.
  if (rainyDays.length) {
    const dayList = rainyDays.map((w) => w.dayName).join(", ");
    warnings.push({
      type: "recommendation",
      title: "Recommendation",
      message: `Consider reviewing and rescheduling weather-sensitive activities on ${dayList}.`,
    });
  }

  if (!warnings.length) {
    warnings.push({
      type: "recommendation",
      title: "Recommendation",
      message:
        "Weather looks favourable this week. Continue monitoring site conditions and approved safety procedures.",
    });
  }

  return warnings;
}

/** Stable ordering for forecast cards (Monday → Sunday). */
export function sortWeatherByDay(weather: WeatherDay[]): WeatherDay[] {
  return [...weather].sort(
    (a, b) => DAYS.indexOf(a.dayName) - DAYS.indexOf(b.dayName),
  );
}
