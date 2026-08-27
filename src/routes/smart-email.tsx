import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Mail, RefreshCw, Wand2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
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
import {
  EMAIL_TONES,
  EMAIL_TYPES,
  generateEmailDraft,
  type EmailDraft,
  type EmailTone,
  type EmailType,
} from "@/lib/email-drafts";

export const Route = createFileRoute("/smart-email")({
  head: () => ({
    meta: [
      { title: "Smart Email — AI Weekly Scheduler" },
      {
        name: "description",
        content:
          "Generate professional construction email drafts for project updates, delay reports, requests and follow-ups.",
      },
      { property: "og:title", content: "Smart Email — AI Weekly Scheduler" },
      {
        property: "og:description",
        content:
          "Generate professional construction email drafts for project updates, delay reports, requests and follow-ups.",
      },
    ],
  }),
  component: SmartEmailPage,
});

function SmartEmailPage() {
  const [emailType, setEmailType] = useState<EmailType>("Project Update");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState<EmailTone>("Professional");
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setDraft(generateEmailDraft(emailType, recipient, description, tone));
      setIsGenerating(false);
    }, 450);
  };

  const copyToClipboard = async () => {
    if (!draft) return;
    const text = `Subject: ${draft.subject}\n\n${draft.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const canGenerate = recipient.trim().length > 0 && description.trim().length > 0;

  return (
    <AppShell
      title="Smart Email"
      description="Generate professional construction email drafts in seconds."
    >
      <div className="space-y-6">
        <div className="flex gap-3 rounded-xl border border-border bg-accent/40 p-4">
          <Mail className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            AI-generated emails are drafts and should be reviewed before sending.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="size-5 text-primary" />
                Email details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email-type">Email type</Label>
                <Select
                  value={emailType}
                  onValueChange={(value) => setEmailType(value as EmailType)}
                >
                  <SelectTrigger id="email-type" className="w-full">
                    <SelectValue placeholder="Select email type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  type="email"
                  placeholder="e.g. manager@example.com"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">What is this email about?</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the update, delay, request or follow-up in a few sentences…"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={(value) => setTone(value as EmailTone)}>
                  <SelectTrigger id="tone" className="w-full">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMAIL_TONES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={generate}
                disabled={!canGenerate || isGenerating}
              >
                {isGenerating ? (
                  <RefreshCw className="mr-2 size-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 size-4" />
                )}
                Generate Email
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-5 text-primary" />
                Draft
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {draft ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={draft.subject}
                      onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">Email body</Label>
                    <Textarea
                      id="body"
                      rows={12}
                      value={draft.body}
                      onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                      className="font-normal leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
                      {copied ? (
                        <Check className="mr-2 size-4 text-green-600" />
                      ) : (
                        <Copy className="mr-2 size-4" />
                      )}
                      {copied ? "Copied" : "Copy Email"}
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={generate}
                      disabled={isGenerating}
                    >
                      <RefreshCw
                        className={`mr-2 size-4 ${isGenerating ? "animate-spin" : ""}`}
                      />
                      Regenerate
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-accent/30 py-16 text-center">
                  <Mail className="size-10 text-muted-foreground/50" />
                  <p className="mt-4 text-sm font-medium text-foreground">
                    No draft generated yet
                  </p>
                  <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                    Fill in the details and click Generate Email to create a professional
                    construction email draft.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
