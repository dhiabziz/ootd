import * as Brevo from '@getbrevo/brevo';

function getBrevoApiKey(): string {
  const value = process.env.BREVO_API_KEY;
  if (!value) {
    throw new Error('Missing BREVO_API_KEY environment variable');
  }
  return value;
}

function getBrevoSenderEmail(): string {
  const value = process.env.BREVO_SENDER_EMAIL;
  if (!value) {
    throw new Error('Missing BREVO_SENDER_EMAIL environment variable');
  }
  return value;
}

function getBrevoSenderName(): string {
  const value = process.env.BREVO_SENDER_NAME;
  if (!value) {
    throw new Error('Missing BREVO_SENDER_NAME environment variable');
  }
  return value;
}

function getAdminEmail(): string {
  const value = process.env.ADMIN_EMAIL;
  if (!value) {
    throw new Error('Missing ADMIN_EMAIL environment variable');
  }
  return value;
}

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  getBrevoApiKey()
);

const primaryColor = '#B85C72';
const backgroundColor = '#FBF8F4';
const textColor = '#1F1F1F';

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function buildLetterHtml(options: {
  name: string;
  letterContent: string;
  originalDate: string;
}): string {
  return `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Surat dari masa lalumu</title>
  </head>
  <body style="margin:0;padding:0;background:${backgroundColor};font-family:Arial, sans-serif;color:${textColor};">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${backgroundColor};padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.08);">
            <tr>
              <td style="padding:28px 32px;background:${primaryColor};color:#ffffff;text-align:center;">
                <h1 style="margin:0;font-size:28px;line-height:1.2;font-weight:700;">Surat dari masa lalumu 💌</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Halo <strong>${options.name}</strong>,</p>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.8;color:#555555;">Ini surat yang kamu tulis pada <strong>${formatDate(options.originalDate)}</strong>. Simpan sebagai pengingat dan doakan versi depanmu terus berkembang.</p>
                <div style="border-left:4px solid ${primaryColor};background:${backgroundColor};padding:20px 20px 20px 24px;border-radius:12px;color:${textColor};font-size:16px;line-height:1.8;white-space:pre-wrap;">
                  ${options.letterContent}
                </div>
                <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#555555;">— Versi lampaumu yang masih percaya.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildAdminHtml(options: {
  name: string;
  email: string;
  age: number;
  deliveryOption: string;
  scheduledDelivery: string;
}): string {
  return `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notifikasi Surat Baru</title>
  </head>
  <body style="margin:0;padding:24px;background:${backgroundColor};font-family:Arial, sans-serif;color:${textColor};">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:24px;border-radius:16px;border:1px solid rgba(184,92,114,0.15);">
      <h2 style="margin:0 0 16px;font-size:20px;color:${primaryColor};">📩 Surat baru dari ${options.name}</h2>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:14px;color:#333333;">
        <tr>
          <td style="padding:8px 0;font-weight:700;width:160px;">Nama</td>
          <td style="padding:8px 0;">${options.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:700;">Email</td>
          <td style="padding:8px 0;">${options.email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:700;">Usia</td>
          <td style="padding:8px 0;">${options.age}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:700;">Pengiriman</td>
          <td style="padding:8px 0;">${options.deliveryOption}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:700;">Dijadwalkan</td>
          <td style="padding:8px 0;">${formatDate(options.scheduledDelivery)}</td>
        </tr>
      </table>
      <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#555555;">Cek Supabase untuk detail lengkap dan update status pengiriman.</p>
    </div>
  </body>
</html>`;
}

export async function sendLetterEmail(options: {
  to: string;
  name: string;
  letterContent: string;
  originalDate: string;
}): Promise<void> {
  await apiInstance.sendTransacEmail({
    sender: {
      name: getBrevoSenderName(),
      email: getBrevoSenderEmail(),
    },
    to: [{ email: options.to, name: options.name }],
    subject: 'Surat dari masa lalumu 💌',
    htmlContent: buildLetterHtml(options),
  });
}

export async function sendAdminNotification(options: {
  name: string;
  email: string;
  age: number;
  deliveryOption: string;
  scheduledDelivery: string;
}): Promise<void> {
  await apiInstance.sendTransacEmail({
    sender: {
      name: getBrevoSenderName(),
      email: getBrevoSenderEmail(),
    },
    to: [{ email: getAdminEmail(), name: 'OOTD Admin' }],
    subject: `📩 [OOTD] Surat baru dari ${options.name}`,
    htmlContent: buildAdminHtml(options),
  });
}
