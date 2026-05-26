import { Resend } from 'resend';

function getResendApiKey(): string {
  const value = process.env.RESEND_API_KEY;
  if (!value) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }
  return value;
}

function getResendFromEmail(): string {
  const value = process.env.RESEND_FROM_EMAIL;
  if (!value) {
    throw new Error('Missing RESEND_FROM_EMAIL environment variable');
  }
  return value;
}

export function getResendClient(): Resend {
  return new Resend(getResendApiKey());
}

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
  const { name, letterContent, originalDate } = options;
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
                <p style="margin:12px 0 0;font-size:16px;line-height:1.6;">Terima kasih sudah menulis kepada dirimu sendiri.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 0 32px;">
                <p style="margin:0 0 12px;font-size:16px;line-height:1.7;">Halo <strong>${name}</strong>,</p>
                <p style="margin:0 0 24px;font-size:14px;line-height:1.8;color:#555555;">Surat ini ditulis pada <strong>${formatDate(originalDate)}</strong>. Simpan momen ini sebagai pengingat dan rencana masa depanmu.</p>
                <div style="background:${backgroundColor};border:1px solid rgba(184,92,114,0.2);border-radius:18px;padding:24px;color:${textColor};font-size:16px;line-height:1.8;white-space:pre-wrap;">
                  ${letterContent}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px 32px;">
                <p style="margin:0;font-size:14px;line-height:1.7;color:#555555;">Jangan lupa, setiap surat adalah pengingat bahwa pilihanmu hari ini membentuk besokmu.</p>
                <p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:#555555;">Salam hangat, <br/> Tim OOTD</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendLetterEmail(options: {
  to: string;
  name: string;
  letterContent: string;
  originalDate: string;
}): Promise<void> {
  await getResendClient().emails.send({
    from: getResendFromEmail(),
    to: options.to,
    subject: 'Surat dari masa lalumu 💌',
    html: buildLetterHtml(options),
  });
}

export async function sendAdminNotification(options: {
  name: string;
  email: string;
  age: number;
  deliveryOption: string;
  scheduledDelivery: string;
}): Promise<void> {
  const html = `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notifikasi Surat Baru</title>
  </head>
  <body style="margin:0;padding:0;background:${backgroundColor};font-family:Arial, sans-serif;color:${textColor};">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${backgroundColor};padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.08);">
            <tr>
              <td style="padding:28px 32px;background:${primaryColor};color:#ffffff;text-align:center;">
                <h1 style="margin:0;font-size:24px;line-height:1.2;font-weight:700;">Notifikasi Surat Baru</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 32px 32px;">
                <p style="margin:0 0 20px;font-size:16px;line-height:1.7;">Ada surat baru yang masuk dari halaman Dear Future Fit.</p>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;font-size:14px;color:#555555;"><strong>Nama:</strong> ${options.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:14px;color:#555555;"><strong>Email:</strong> ${options.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:14px;color:#555555;"><strong>Usia:</strong> ${options.age}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:14px;color:#555555;"><strong>Pengiriman:</strong> ${options.deliveryOption}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;font-size:14px;color:#555555;"><strong>Dijadwalkan:</strong> ${formatDate(options.scheduledDelivery)}</td>
                  </tr>
                </table>
                <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#555555;">Cek Supabase untuk data detail dan status pengiriman.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  await getResendClient().emails.send({
    from: getResendFromEmail(),
    to: 'nabilajasmine6426@gmail.com',
    subject: 'OOTD: Surat baru Dear Future Fit',
    html,
  });
}
