export type SheetsSubmission = {
  name: string;
  email: string;
  company?: string;
  location?: string;
  services?: string;
  message: string;
};

type Result =
  | { ok: true }
  | { ok: false; reason: string; details?: string };

export async function pushSubmissionToSheets(
  data: SheetsSubmission,
): Promise<Result> {
  const url = process.env.SHEETS_WEB_APP_URL;
  const secret = process.env.SHEETS_WEB_APP_SECRET;

  if (!url || !secret) {
    console.warn("[sheets] missing env vars, skipping push");
    return { ok: false, reason: "missing-env" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, secret }),
      redirect: "follow", // Apps Script web apps redirect through usercontent.google.com
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(
        `[sheets] push failed: status=${res.status} body=${text}`,
      );
      return { ok: false, reason: "api-error", details: text };
    }

    return { ok: true };
  } catch (err) {
    console.error("[sheets] push exception:", err);
    return {
      ok: false,
      reason: "exception",
      details: err instanceof Error ? err.message : String(err),
    };
  }
}