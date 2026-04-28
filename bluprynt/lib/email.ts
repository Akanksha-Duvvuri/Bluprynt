import { Resend } from "resend";
import type { FaqGroup } from "./faq";

/**
 * Resend client — lazy-initialised so the build doesn't fail
 * when RESEND_API_KEY isn't set yet.
 */
let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY is not set");
    }
    resendClient = new Resend(key);
  }
  return resendClient;
}

const FROM_EMAIL = process.env.FROM_EMAIL ?? "hello@bluprynt.com";
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "owner@bluprynt.com";

/* ──────────────────────────────────────────────────────────────
   PROSPECT CONFIRMATION (US-16)
   ────────────────────────────────────────────────────────────── */
interface ProspectConfirmationArgs {
  name: string;
  email: string;
  faqGroup: FaqGroup;
}

export async function sendProspectConfirmation({
  name,
  email,
  faqGroup,
}: ProspectConfirmationArgs): Promise<void> {
  const firstName = name.split(" ")[0];
  const html = renderProspectHtml(firstName, faqGroup);
  const text = renderProspectText(firstName, faqGroup);

  await getResend().emails.send({
    from: `Bluprynt Consulting Group <${FROM_EMAIL}>`,
    to: email,
    subject: "We've received your enquiry — Bluprynt Consulting Group",
    html,
    text,
  });
}

function renderProspectHtml(firstName: string, faq: FaqGroup): string {
  const qaBlocks = faq.questions
    .map(
      (q) => `
        <p style="margin: 0 0 6px; color: #C4A564; font-size: 13px; font-weight: 600;">
          ${escapeHtml(q.q)}
        </p>
        <p style="margin: 0 0 18px; color: #FFEEC6; font-size: 14px; line-height: 1.6;">
          ${escapeHtml(q.a)}
        </p>
      `
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<body style="margin: 0; background: #15130D; font-family: 'Helvetica Neue', sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #15130D;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px;">
          <tr>
            <td style="padding-bottom: 32px; border-bottom: 1px solid rgba(196,165,100,0.2);">
              <p style="margin: 0; color: #C4A564; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;">
                Bluprynt Consulting Group
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 0 24px;">
              <p style="margin: 0 0 16px; color: #FFEEC6; font-size: 22px; font-weight: 400;">
                Hi ${escapeHtml(firstName)},
              </p>
              <p style="margin: 0; color: #FFEEC6; font-size: 15px; line-height: 1.6; opacity: 0.85;">
                Thanks for reaching out about <strong style="color: #C4A564;">${escapeHtml(faq.serviceName)}</strong>.
                While we prepare a personal response, here are answers to the questions
                we hear most often.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0; border-top: 1px solid rgba(196,165,100,0.15);">
              ${qaBlocks}
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0; border-top: 1px solid rgba(196,165,100,0.15);">
              <p style="margin: 0; color: #FFEEC6; font-size: 14px; line-height: 1.6; opacity: 0.85;">
                We'll be in touch within one business day.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 0 0; border-top: 1px solid rgba(196,165,100,0.15); color: rgba(255,238,198,0.5); font-size: 11px; letter-spacing: 0.15em;">
              Bluprynt Consulting Group · ${FROM_EMAIL}<br />
              Engineering accuracy. Consulting excellence.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderProspectText(firstName: string, faq: FaqGroup): string {
  const qa = faq.questions.map((q) => `${q.q}\n  ${q.a}`).join("\n\n");
  return [
    `Hi ${firstName},`,
    "",
    `Thanks for reaching out about ${faq.serviceName}. While we prepare a personal response, here are answers to the questions we hear most often.`,
    "",
    qa,
    "",
    "We'll be in touch within one business day.",
    "",
    "—",
    "Bluprynt Consulting Group",
    "Engineering accuracy. Consulting excellence.",
  ].join("\n");
}

/* ──────────────────────────────────────────────────────────────
   OWNER ALERT (US-17)
   ────────────────────────────────────────────────────────────── */
interface OwnerAlertArgs {
  name: string;
  email: string;
  company: string;
  message: string;
  faqGroup: FaqGroup;
}

export async function sendOwnerAlert({
  name,
  email,
  company,
  message,
  faqGroup,
}: OwnerAlertArgs): Promise<void> {
  const text = [
    `New enquiry from ${name}`,
    "",
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || "—"}`,
    `Service:  ${faqGroup.serviceName} (matched: ${faqGroup.key})`,
    `Time:     ${new Date().toISOString()}`,
    "",
    "Message:",
    message,
    "",
    "—",
    "Reply to this email to respond directly to the prospect.",
  ].join("\n");

  await getResend().emails.send({
    from: `Bluprynt Site <${FROM_EMAIL}>`,
    to: OWNER_EMAIL,
    replyTo: email,
    subject: `New enquiry from ${name} — Bluprynt Consulting Group`,
    text,
  });
}

/* ── helpers ── */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}