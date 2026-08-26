import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, User } from "lucide-react";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AiNotice } from "@/components/schedule/AiNotice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { assistantReply } from "@/lib/schedule-data";
import { useSchedule } from "@/lib/schedule-store";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Project Assistant — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Ask the AI project assistant about priorities, risks and prerequisites in your weekly construction schedule.",
      },
      { property: "og:title", content: "AI Project Assistant — AI Weekly Scheduler" },
      {
        property: "og:description",
        content: "Chat with an assistant that understands this week's construction schedule.",
      },
    ],
  }),
  component: AssistantPage,
});

type Message = { id: number; role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "What are my highest priority tasks?",
  "Which tasks are at risk?",
  "What should I complete before the concrete pour?",
  "Summarise this week's schedule.",
];

function AssistantPage() {
  const { tasks } = useSchedule();
  const counter = useRef(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hello. I can help you understand and manage this week's construction schedule. Ask about priorities, risks, prerequisites or a weekly summary.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const question = text.trim();
    if (!question) return;
    const userMsg: Message = { id: counter.current++, role: "user", text: question };
    const reply: Message = {
      id: counter.current++,
      role: "assistant",
      text: assistantReply(question, tasks),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    window.setTimeout(() => setMessages((prev) => [...prev, reply]), 450);
  };

  return (
    <AppShell
      title="AI Project Assistant"
      description="Ask questions about this week's construction schedule."
    >
      <div className="space-y-6">
        <AiNotice />

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Suggested questions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Button key={s} variant="outline" size="sm" onClick={() => send(s)}>
                {s}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="space-y-4 py-2">
            <div className="max-h-[480px] space-y-4 overflow-y-auto pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                      m.role === "user" ? "bg-secondary" : "bg-primary"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User className="size-4 text-secondary-foreground" />
                    ) : (
                      <Bot className="size-4 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              className="flex gap-2 border-t border-border pt-4"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the weekly schedule…"
                aria-label="Message"
              />
              <Button type="submit" size="icon" aria-label="Send">
                <Send className="size-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
