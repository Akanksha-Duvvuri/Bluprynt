import { NextRequest, NextResponse } from "next/server";
import { matchFaqGroup } from "@/lib/faq";
import { sendOwnerAlert, sendProspectConfirmation } from "@/lib/email";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
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

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // US-18: keyword routing — first match wins, fallback to GENERAL
  const faqGroup = matchFaqGroup(message);

  try {
    await Promise.all([
      sendProspectConfirmation({ name, email, faqGroup }),
      sendOwnerAlert({ name, email, company, message, faqGroup }),
    ]);
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, faqGroup });
}