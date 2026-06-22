import { NextRequest, NextResponse } from "next/server";
import { matchFaqGroup } from "@/lib/faq";
import { sendOwnerAlert, sendProspectConfirmation } from "@/lib/email";

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

  // Send notification email to team (non-blocking — log but don't fail submission)
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bluprynt Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_NOTIFICATION_EMAIL,
        reply_to: email,
        subject: `New contact: ${name}${company ? ` (${company})` : ""}`,
        text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Company:  ${company || "—"}`,
        `Location: ${location || "—"}`,    // ← add
        `Services: ${services || "—"}`,    // ← add
        ``,
        `Message:`,
        message,
        ``,
        `———`,
        `Submitted via bluprynt.com contact form`,
      ].join("\n"),
      }),
    });
  } catch (err) {
    console.error("[contact] email notification failed:", err);
    // Don't fail the submission
  }

  return NextResponse.json({ ok: true });
}