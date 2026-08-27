import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Calendar,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Info,
  RefreshCw,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSchedule } from "@/lib/schedule-store";
import {
  generateWeatherImpact,
  MOCK_WEATHER,
  sortWeatherByDay,
  type ImpactType,
  type WeatherCondition,
  type WeatherDay,
} from "@/lib/weather-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "AI Weather Assistant — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Check mock weekly weather conditions and identify possible construction project delays and risks.",
      },
      { property: "og:title", content: "AI Weather Assistant — AI Weekly Scheduler" },
      {
        property: "og:description",
        content:
          "Check mock weekly weather conditions and identify possible construction project delays and risks.",
      },
    ],
  }),
  component: WeatherPage,
});

const CONDITION_ICON: Record<WeatherCondition, React.ComponentType<{ className?: string }>> = {
  Sunny: Sun,
  "Partly Cloudy": CloudSun,
  Cloudy: Cloud,
  "Light Rain": CloudRain,
  "Heavy Rain": CloudRain,
  Thunderstorms: CloudLightning,
};

const IMPACT_STYLE: Record<
  ImpactType,
  { icon: React.ComponentType<{ className?: string }>; border: string; bg: string; text: string }
> = {
  delay: {
    icon: AlertTriangle,
    border: "border-destructive/40",
    bg: "bg-destructive/10",
    text: "text-destructive",
  },
  risk: {
    icon: AlertTriangle,
    border: "border-warning/50",
    bg: "bg-warning/15",
    text: "text-warning-foreground",
  },
  recommendation: {
    icon: Info,
    border: "border-info/40",
    bg: "bg-info/10",
    text: "text-info",
  },
};

function ForecastCard({ day }: { day: WeatherDay }) {
  const Icon = CONDITION_ICON[day.condition];
  const isSevere = day.condition === "Heavy Rain" || day.condition === "Thunderstorms";

  return (
    <Card
      className={cn(
        "shadow-card transition-colors",
        isSevere && "border-destructive/40 bg-destructive/[0.03]",
      )}
    >
      <CardContent className="flex flex-col items-center p-5 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {day.dayName}
        </p>
        <p className="mt-0.5 text-[10px] text-muted-foreground/70">{day.date}</p>
        <Icon
          className={cn(
            "my-3 size-10",
            isSevere ? "text-destructive" : "text-primary",
          )}
        />
        <p className="text-sm font-semibold text-foreground">{day.condition}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {day.tempLowC}°C – {day.tempHighC}°C
        </p>
        <Badge
          variant={day.rainProbability >= 70 ? "destructive" : "secondary"}
          className="mt-3 text-[10px]"
        >
          {day.rainProbability}% rain
        </Badge>
      </CardContent>
    </Card>
  );
}

function WeatherPage() {
  const { tasks } = useSchedule();
  const [weather] = useState<WeatherDay[]>(() => sortWeatherByDay(MOCK_WEATHER));
  const [impacts, setImpacts] = useState<ReturnType<typeof generateWeatherImpact> | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);

  const analyse = () => {
    setIsAnalysing(true);
    window.setTimeout(() => {
      setImpacts(generateWeatherImpact(weather, tasks));
      setIsAnalysing(false);
    }, 500);
  };

  return (
    <AppShell
      title="AI Weather Assistant"
      description="Review mock weekly weather and spot possible construction delays."
    >
      <div className="space-y-6">
        <div className="flex gap-3 rounded-xl border border-border bg-accent/40 p-4">
          <CloudSun className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Weather analysis provides planning suggestions only. Project Managers must review actual
            site conditions and approved safety procedures.
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              7-Day Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
              {weather.map((day) => (
                <ForecastCard key={day.date} day={day} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-primary" />
              Potential Project Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {impacts ? (
              <div className="space-y-3">
                {impacts.map((impact, index) => {
                  const style = IMPACT_STYLE[impact.type];
                  const Icon = style.icon;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-3 rounded-xl border p-4",
                        style.border,
                        style.bg,
                      )}
                    >
                      <Icon className={cn("mt-0.5 size-4 shrink-0", style.text)} />
                      <div>
                        <p className={cn("text-sm font-semibold", style.text)}>{impact.title}</p>
                        <p className="mt-0.5 text-sm text-foreground/90">{impact.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-accent/30 py-12 text-center">
                <CloudSun className="size-10 text-muted-foreground/50" />
                <p className="mt-4 text-sm font-medium text-foreground">No analysis yet</p>
                <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                  Click Analyse Weather Impact to compare the forecast with this week’s schedule
                  and generate delay warnings.
                </p>
              </div>
            )}

            <Button className="w-full" onClick={analyse} disabled={isAnalysing}>
              {isAnalysing ? (
                <RefreshCw className="mr-2 size-4 animate-spin" />
              ) : (
                <CloudSun className="mr-2 size-4" />
              )}
              Analyse Weather Impact
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
