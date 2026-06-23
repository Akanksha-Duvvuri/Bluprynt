import { NextRequest, NextResponse } from "next/server";
import { matchFaqGroup } from "@/lib/faq";
import { sendOwnerAlert, sendProspectConfirmation } from "@/lib/email";
import { pushSubmissionToSheets } from "@/lib/sheets";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  location?: string;
  services?: string;
}

/**
 * POST /api/contact
 *
 * Server-side handler for the contact form.
 * 1. Validates the payload (defence-in-depth — client also validates).
 * 2. Scans the message body for keywords → picks an FAQ group.
 * 3. Sends two emails in parallel:
 *      - Confirmation to the prospect (with tailored FAQ block)
 *      - Alert to the firm owner (plain text, reply-to set to prospect)
 */
export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const company = payload.company?.trim() ?? "";
  const message = payload.message?.trim();
  const location = payload.location?.trim() ?? "";    // ← add
  const services = payload.services?.trim() ?? "";    // ← add

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  console.log("[debug] RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
  console.log("[debug] CONTACT_NOTIFICATION_EMAIL:", process.env.CONTACT_NOTIFICATION_EMAIL);
  console.log("[debug] reached email block");

  try {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Bluprynt Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_NOTIFICATION_EMAIL,
      cc: process.env.CONTACT_CC_EMAIL,   
      reply_to: email,
      subject: `New contact: ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Company:  ${company || "—"}`,
        ``,
        `Message:`,
        message,
        ``,
        `———`,
        `Submitted via blupryntconsulting.com contact form`,
      ].join("\n"),
    }),
  });

  // Push to Google Sheets as a backup (non-blocking)
    pushSubmissionToSheets({
      name,
      email,
      company,
      location,
      services,
      message,
    }).catch((err) => {
      console.error("[contact] sheets push failed:", err);
    });

  const responseText = await res.text();
  console.log("[debug] Resend response status:", res.status);
  console.log("[debug] Resend response body:", responseText);

  if (!res.ok) {
    console.error("[contact] Resend rejected the send");
  }
} catch (err) {
  console.error("[contact] email notification fetch threw:", err);
}

  return NextResponse.json({ ok: true });
}