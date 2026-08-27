export type EmailType = "Project Update" | "Delay Report" | "Request" | "Follow-up";
export type EmailTone = "Professional" | "Formal" | "Concise";

export const EMAIL_TYPES: EmailType[] = ["Project Update", "Delay Report", "Request", "Follow-up"];
export const EMAIL_TONES: EmailTone[] = ["Professional", "Formal", "Concise"];

export type EmailDraft = {
  subject: string;
  body: string;
};

const PROJECT_NAME = "Riverside Commercial Development";

function recipientName(recipient: string): string {
  const local = recipient.split("@")[0]?.trim();
  if (!local) return "there";
  return local
    .replace(/[._\-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function opening(tone: EmailTone, recipient: string): string {
  const name = recipientName(recipient);
  if (tone === "Formal") return `Dear ${name === "there" ? "Sir/Madam" : name},`;
  if (tone === "Concise") return `Hi ${name},`;
  return `Hello ${name},`;
}

function closing(tone: EmailTone): string {
  if (tone === "Formal") {
    return `Yours faithfully,\nProject Manager\n${PROJECT_NAME}`;
  }
  if (tone === "Concise") {
    return `Regards,\nPM`;
  }
  return `Best regards,\nProject Manager\n${PROJECT_NAME}`;
}

function buildBody(
  tone: EmailTone,
  recipient: string,
  description: string,
  paragraphs: string[],
): string {
  const open = opening(tone, recipient);
  const close = closing(tone);
  const detail = description.trim() || "the current construction activities";
  const content = paragraphs.map((p) => p.replace("{{detail}}", detail)).join("\n\n");
  return `${open}\n\n${content}\n\n${close}`;
}

export function generateEmailDraft(
  type: EmailType,
  recipient: string,
  description: string,
  tone: EmailTone,
): EmailDraft {
  const detail = description.trim() || "the current construction activities";

  switch (type) {
    case "Project Update": {
      const subject = tone === "Concise" ? `${PROJECT_NAME} — weekly update` : `${PROJECT_NAME} — Weekly Project Update`;
      const body =
        tone === "Formal"
          ? buildBody(tone, recipient, description, [
              `I am writing to provide a formal update on the progress of ${PROJECT_NAME}. {{detail}}.`,
              "Please do not hesitate to contact me should you require further information.",
            ])
          : tone === "Concise"
            ? buildBody(tone, recipient, description, [
                `Quick update on ${PROJECT_NAME}: {{detail}}.`,
                "Let me know if you need anything else.",
              ])
            : buildBody(tone, recipient, description, [
                `I wanted to share a quick update on ${PROJECT_NAME}. {{detail}}.`,
                "Please let me know if you have any questions or need additional details.",
              ]);
      return { subject, body };
    }

    case "Delay Report": {
      const subject = tone === "Concise" ? `${PROJECT_NAME} — delay notice` : `${PROJECT_NAME} — Delay Notification`;
      const body =
        tone === "Formal"
          ? buildBody(tone, recipient, description, [
              `I wish to formally notify you of a delay impacting ${PROJECT_NAME}. {{detail}}.`,
              "We are taking all reasonable steps to mitigate the impact and will provide a revised programme in due course.",
            ])
          : tone === "Concise"
            ? buildBody(tone, recipient, description, [
                `Delay on ${PROJECT_NAME}: {{detail}}.`,
                "We are working to minimise impact and will share a revised timeline shortly.",
              ])
            : buildBody(tone, recipient, description, [
                `I’m writing to let you know about a delay on ${PROJECT_NAME}. {{detail}}.`,
                "We’re working to minimise the impact and will share a revised timeline as soon as possible.",
              ]);
      return { subject, body };
    }

    case "Request": {
      const subject = tone === "Concise" ? `${PROJECT_NAME} — request` : `${PROJECT_NAME} — Request for Action`;
      const body =
        tone === "Formal"
          ? buildBody(tone, recipient, description, [
              `I am writing to request your assistance in respect of ${PROJECT_NAME}. {{detail}}.`,
              "Your prompt attention to this matter would be greatly appreciated.",
            ])
          : tone === "Concise"
            ? buildBody(tone, recipient, description, [
                `Could you please assist with ${PROJECT_NAME}: {{detail}}.`,
                "Thanks in advance.",
              ])
            : buildBody(tone, recipient, description, [
                `Could you please help with the following for ${PROJECT_NAME}: {{detail}}.`,
                "Thanks in advance for your support.",
              ]);
      return { subject, body };
    }

    case "Follow-up": {
      const subject = tone === "Concise" ? `${PROJECT_NAME} — follow-up` : `${PROJECT_NAME} — Follow-up`;
      const body =
        tone === "Formal"
          ? buildBody(tone, recipient, description, [
              `I am following up on the matter relating to ${PROJECT_NAME}. {{detail}}.`,
              "I would be grateful for your response at your earliest convenience.",
            ])
          : tone === "Concise"
            ? buildBody(tone, recipient, description, [
                `Following up on ${PROJECT_NAME}: {{detail}}.`,
                "Please reply when you can.",
              ])
            : buildBody(tone, recipient, description, [
                `Just following up on ${PROJECT_NAME}. {{detail}}.`,
                "I’d appreciate a quick update when you have a moment.",
              ]);
      return { subject, body };
    }
  }
}
