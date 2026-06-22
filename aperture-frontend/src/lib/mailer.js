import nodemailer from 'nodemailer';

// Single shared transporter. Configured via env so credentials never live
// in the repo. Use a Gmail account + App Password (not the normal password):
//   https://myaccount.google.com/apppasswords
//
//   GMAIL_USER          the authenticated Gmail address (e.g. aperture.websites@gmail.com)
//   GMAIL_APP_PASSWORD  the 16-char app password for that account
//   NOTIFY_TO           where notifications are delivered (defaults to aperture.websites@gmail.com)

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export const NOTIFY_TO = process.env.NOTIFY_TO || 'aperture.websites@gmail.com';

export function isMailerConfigured() {
  return Boolean(GMAIL_USER && GMAIL_APP_PASSWORD);
}

let cached;

export function getTransporter() {
  if (!isMailerConfigured()) {
    throw new Error(
      'Mailer not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local'
    );
  }
  if (!cached) {
    cached = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });
  }
  return cached;
}

/**
 * Sends a notification email. `replyTo` lets you hit "reply" in Gmail and
 * respond straight to the person who submitted the form.
 */
export async function sendNotification({ subject, html, text, replyTo }) {
  const transporter = getTransporter();
  return transporter.sendMail({
    from: `"Aperture Website" <${GMAIL_USER}>`,
    to: NOTIFY_TO,
    subject,
    text,
    html,
    replyTo,
  });
}
