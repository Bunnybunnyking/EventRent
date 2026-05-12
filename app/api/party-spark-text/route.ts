import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/lib/site-data";

export const runtime = "nodejs";

const MAX_LEN = 8000;

function clean(s: unknown): string {
  return typeof s === "string" ? s.trim().slice(0, MAX_LEN) : "";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function phoneOk(raw: string): boolean {
  const d = raw.replace(/\D/g, "");
  return d.length >= 10 && d.length <= 15;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const firstName = clean(body.firstName);
  const phone = clean(body.phone);
  const consent = Boolean(body.consent);
  const partyName = clean(body.partyName);
  const inviteLine = clean(body.inviteLine);
  const setupIdea = clean(body.setupIdea);
  const vibe = clean(body.vibe);
  const eventType = clean(body.eventType);
  const eventDate = clean(body.eventDate);
  const eventTown = clean(body.eventTown);
  const email = clean(body.email);

  if (!firstName || !phone) {
    return NextResponse.json({ error: "First name and phone are required." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ error: "Consent is required to receive text messages." }, { status: 400 });
  }
  if (!phoneOk(phone)) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!partyName) {
    return NextResponse.json({ error: "Missing party details." }, { status: 400 });
  }

  const smsTemplate = `Hi ${firstName} — here’s your party idea from ${business.name}:

Party Name: ${partyName}
Vibe: ${vibe} / ${eventType}
Invite Line: “${inviteLine}”

Suggested Setup:
${setupIdea}

Want help pricing this setup? Reply QUOTE and we’ll help.`;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.QUOTE_EMAIL_FROM?.trim();
  const toRaw = process.env.QUOTE_NOTIFICATION_EMAIL?.trim() || business.email.trim();

  if (!apiKey || !from) {
    console.error("[party-spark-text] Missing RESEND_API_KEY or QUOTE_EMAIL_FROM");
    return NextResponse.json(
      {
        error:
          "Text request service is not configured. Please use Copy to save your idea, or call the shop for help.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const rows = [
    { label: "First name", value: firstName },
    { label: "Phone (for SMS follow-up)", value: phone },
    { label: "Event date (optional)", value: eventDate || "—" },
    { label: "Event town (optional)", value: eventTown || "—" },
    { label: "Email (optional)", value: email || "—" },
    { label: "Party name", value: partyName },
    { label: "Vibe / type", value: `${vibe} / ${eventType}` },
    { label: "Invite line", value: inviteLine },
    { label: "Setup idea (customer-facing)", value: setupIdea },
  ];

  const tableRows = rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px 6px 0;font-weight:600;color:#444;vertical-align:top">${escapeHtml(r.label)}</td><td style="padding:6px 0;color:#111;vertical-align:top">${escapeHtml(r.value).replace(/\n/g, "<br/>")}</td></tr>`
    )
    .join("");

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;font-size:15px;color:#111">
    <h1 style="font-size:18px">Party Spark — text request</h1>
    <p style="color:#555">Customer asked to receive this party idea by text. Use your SMS workflow; message template is below.</p>
    <table style="border-collapse:collapse;margin:16px 0">${tableRows}</table>
    <h2 style="font-size:16px;margin-top:24px">SMS template (verify consent on file before sending)</h2>
    <pre style="white-space:pre-wrap;background:#f6f3ec;padding:12px;border-radius:8px;border:1px solid #e6e1d8">${escapeHtml(
      smsTemplate
    )}</pre>
  </body></html>`;

  const { error } = await resend.emails.send({
    from,
    to: toRaw,
    subject: `Party Spark text request — ${firstName} — ${partyName}`.slice(0, 180),
    html,
  });

  if (error) {
    console.error("[party-spark-text] Resend error", error);
    return NextResponse.json({ error: "Could not complete request. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
