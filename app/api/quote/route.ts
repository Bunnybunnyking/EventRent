import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "@/lib/site-data";

export const runtime = "nodejs";

const MAX_FIELD_LEN = 8000;

function str(fd: FormData, key: string): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim().slice(0, MAX_FIELD_LEN) : "";
}

function strAll(fd: FormData, key: string): string[] {
  return fd
    .getAll(key)
    .filter((x): x is string => typeof x === "string")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailRow(label: string, value: string): string {
  return `<tr><td style="vertical-align:top;padding:6px 12px 6px 0;font-weight:600;color:#444">${escapeHtml(label)}</td><td style="vertical-align:top;padding:6px 0;color:#111">${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`;
}

const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  if (str(fd, "_honeypot")) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const name = str(fd, "name");
  const email = str(fd, "email");
  const phone = str(fd, "phone");
  const eventDateOrTimeframe = str(fd, "eventDateOrTimeframe");
  const eventType = str(fd, "eventType");

  if (!name || !email || !phone || !eventDateOrTimeframe || !eventType) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!emailOk.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.QUOTE_EMAIL_FROM?.trim();
  const toRaw = process.env.QUOTE_NOTIFICATION_EMAIL?.trim() || business.email.trim();

  if (!apiKey || !from) {
    console.error("[quote] Missing RESEND_API_KEY or QUOTE_EMAIL_FROM");
    return NextResponse.json(
      {
        error:
          "Quote email is not configured on the server. Add RESEND_API_KEY and QUOTE_EMAIL_FROM to the site environment.",
      },
      { status: 503 },
    );
  }

  const eventElements = strAll(fd, "eventElements");
  const approxGuestCount = str(fd, "approxGuestCount");
  const venue = str(fd, "venue");
  const addressLine1 = str(fd, "addressLine1");
  const venueCity = str(fd, "venueCity");
  const addressRegion = str(fd, "addressRegion");
  const postalCode = str(fd, "postalCode");
  const budget = str(fd, "budget");
  const rentalPreferences = str(fd, "rentalPreferences");
  const eventDescription = str(fd, "eventDescription");
  const specialRequests = str(fd, "specialRequests");
  const otherDetails = str(fd, "otherDetails");

  const lines: string[] = [
    `New quote request from ${business.name} website contact form`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Event date / timeframe: ${eventDateOrTimeframe}`,
    `Event type: ${eventType}`,
  ];

  if (eventElements.length) lines.push("", `Event elements: ${eventElements.join(", ")}`);
  if (approxGuestCount) lines.push(`Approx. guest count: ${approxGuestCount}`);
  const locationParts = [venue, addressLine1, venueCity, addressRegion, postalCode].filter(Boolean);
  if (locationParts.length) {
    lines.push("", "Event location (optional):");
    if (venue) lines.push(`Venue / site: ${venue}`);
    if (addressLine1) lines.push(`Street: ${addressLine1}`);
    const cityLine = [venueCity, addressRegion, postalCode].filter(Boolean).join(", ");
    if (cityLine) lines.push(`City / ST / ZIP: ${cityLine}`);
  }
  if (budget) lines.push(`Budget: ${budget}`);
  if (rentalPreferences) lines.push("", `Rental / layout notes: ${rentalPreferences}`);
  if (eventDescription) lines.push("", `Event description: ${eventDescription}`);
  if (specialRequests) lines.push("", `Special requests: ${specialRequests}`);
  if (otherDetails) lines.push("", `Other details: ${otherDetails}`);

  const plain = lines.join("\n");

  const htmlRows: string[] = [
    "<table style=\"border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px\">",
    emailRow("Name", name),
    emailRow("Email", email),
    emailRow("Phone", phone),
    emailRow("Event date / timeframe", eventDateOrTimeframe),
    emailRow("Event type", eventType),
  ];

  if (eventElements.length) htmlRows.push(emailRow("Event elements", eventElements.join(", ")));
  if (approxGuestCount) htmlRows.push(emailRow("Approx. guest count", approxGuestCount));
  if (venue) htmlRows.push(emailRow("Venue / site", venue));
  if (addressLine1) htmlRows.push(emailRow("Street address", addressLine1));
  const cityLine = [venueCity, addressRegion, postalCode].filter(Boolean).join(", ");
  if (cityLine) htmlRows.push(emailRow("City, ST, ZIP", cityLine));
  if (budget) htmlRows.push(emailRow("Budget", budget));
  if (rentalPreferences) htmlRows.push(emailRow("Rental / layout notes", rentalPreferences));
  if (eventDescription) htmlRows.push(emailRow("Event description", eventDescription));
  if (specialRequests) htmlRows.push(emailRow("Special requests", specialRequests));
  if (otherDetails) htmlRows.push(emailRow("Other details", otherDetails));
  htmlRows.push("</table>");

  const html = `<p style="font-family:system-ui,sans-serif;font-size:14px;color:#333">New quote request from the website contact form.</p>${htmlRows.join("")}`;

  const subject = `Quote request: ${eventType.slice(0, 80)} — ${name.slice(0, 60)}`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [toRaw],
    replyTo: email,
    subject,
    text: plain,
    html,
  });

  if (error) {
    console.error("[quote] Resend error:", error);
    return NextResponse.json({ error: "Could not send your request right now. Please call us or try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
