import { Resend } from "resend";
import { env } from "@/env";

export async function sendMagicLinkEmail(to: string, token: string) {
  const magicLink = `${env.WEB_URL}/auth/magic-link?token=${token}`;

  if (!env.RESEND_API_KEY) {
    console.log("\n--------------------------------------------------");
    console.log("📧  MAGIC LINK (dev — no email sent)");
    console.log(`    To:   ${to}`);
    console.log(`    Link: ${magicLink}`);
    console.log(`    Token: ${token}`);
    console.log("--------------------------------------------------\n");
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL ?? "noreply@copazo.com",
    to,
    subject: "O teu link de acesso ao Copazo",
    html: `
      <!DOCTYPE html>
      <html lang="pt">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
              <td align="center">
                <table width="480" cellpadding="0" cellspacing="0"
                  style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">

                  <tr>
                    <td align="center" style="padding-bottom:24px;">
                      <h1 style="margin:0;font-size:24px;color:#111827;">⚽ Copazo</h1>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:16px;">
                      <p style="margin:0;font-size:16px;color:#374151;line-height:1.6;">
                        Olá! Clica no botão abaixo para entrares na tua conta.
                        O link expira em <strong>15 minutos</strong> e só pode ser usado uma vez.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding:24px 0;">
                      <a href="${magicLink}"
                        style="display:inline-block;background-color:#16a34a;color:#ffffff;
                               text-decoration:none;font-size:16px;font-weight:600;
                               padding:14px 32px;border-radius:8px;">
                        Entrar no Copazo
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:8px;">
                      <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                        Se o botão não funcionar, copia e cola este link no teu browser:
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom:24px;">
                      <p style="margin:0;font-size:12px;color:#9ca3af;word-break:break-all;">
                        ${magicLink}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="border-top:1px solid #e5e7eb;padding-top:24px;">
                      <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                        Se não pediste este link, podes ignorar este email em segurança.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
}
