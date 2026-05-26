// lib/mailer.ts
import nodemailer from 'nodemailer';

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const SENDER_NAME = process.env.MAIL_SENDER_NAME || 'OOTD Project';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error('GMAIL_USER atau GMAIL_APP_PASSWORD belum di-set di env');
  }

  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  return transporter;
}

type SendLetterEmailParams = {
  recipientEmail: string;
  recipientName: string;
  letterContent: string;
  scheduledAt: string; // ISO string, untuk display di email
};

export async function sendLetterEmail({
  recipientEmail,
  recipientName,
  letterContent,
  scheduledAt,
}: SendLetterEmailParams) {
  const subject = `Surat dari masa lalu untuk ${recipientName} 💌`;

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #FBF8F4; padding: 32px 16px; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <h1 style="color: #B85C72; font-size: 24px; margin: 0 0 16px 0;">Halo ${recipientName} 👋</h1>
        <p style="color: #555; font-size: 14px; margin: 0 0 24px 0;">
          Ini surat yang lo tulis untuk diri lo sendiri pada
          <strong>${new Date(scheduledAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</strong>.
          Selamat membaca:
        </p>
        <div style="background-color: #FBF8F4; border-left: 4px solid #B85C72; padding: 20px; border-radius: 4px; color: #333; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(letterContent)}</div>
        <p style="color: #888; font-size: 12px; margin: 32px 0 0 0; text-align: center;">
          Dikirim dengan ❤️ oleh OOTD Project — Dear Future Fit
        </p>
      </div>
    </div>
  `;

  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from: `"${SENDER_NAME}" <${GMAIL_USER}>`,
    to: recipientEmail,
    subject,
    html,
  });

  return { messageId: info.messageId };
}

type SendAdminNotificationParams = {
  recipientName: string;
  recipientEmail: string;
  recipientAge: number;
  deliveryOption: string;
  scheduledAt: string;
};

export async function sendAdminNotification({
  recipientName,
  recipientEmail,
  recipientAge,
  deliveryOption,
  scheduledAt,
}: SendAdminNotificationParams) {
  if (!ADMIN_EMAIL) return; // skip kalau admin email ga di-set

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #FBF8F4; padding: 24px; max-width: 600px;">
      <h2 style="color: #B85C72;">Submission baru di Dear Future Fit</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px; color: #888;">Nama</td><td style="padding: 8px;">${escapeHtml(recipientName)}</td></tr>
        <tr><td style="padding: 8px; color: #888;">Email</td><td style="padding: 8px;">${escapeHtml(recipientEmail)}</td></tr>
        <tr><td style="padding: 8px; color: #888;">Usia</td><td style="padding: 8px;">${recipientAge}</td></tr>
        <tr><td style="padding: 8px; color: #888;">Opsi</td><td style="padding: 8px;">${escapeHtml(deliveryOption)}</td></tr>
        <tr><td style="padding: 8px; color: #888;">Jadwal kirim</td><td style="padding: 8px;">${new Date(scheduledAt).toLocaleString('id-ID')}</td></tr>
      </table>
    </div>
  `;

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"${SENDER_NAME}" <${GMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `[OOTD] Submission baru: ${recipientName}`,
    html,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}