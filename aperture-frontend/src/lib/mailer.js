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
  // Always operational; falls back to terminal console logs if environment variables are not set
  return true;
}

let cached;

export function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      'Mailer not configured: set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local'
    );
  }
  if (!cached) {
    cached = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    });
  }
  return cached;
}

/**
 * Sends any email via the transporter, with console log fallback.
 */
export async function sendMail({ to, subject, html, text, replyTo }) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const destination = to || NOTIFY_TO;

  if (!user || !pass) {
    console.log('\n✉️  [Mailer Fallback Mode] Sending Email:');
    console.log(`To:       ${destination}`);
    console.log(`Reply-To: ${replyTo || 'None'}`);
    console.log(`Subject:  ${subject}`);
    console.log('--------------------------------------------------');
    console.log(text);
    console.log('==================================================\n');
    return { messageId: 'console-fallback-id' };
  }

  const transporter = getTransporter();
  return transporter.sendMail({
    from: `"Aperture" <${user}>`,
    to: destination,
    subject,
    text,
    html,
    replyTo,
  });
}

/**
 * Sends a notification email to the admin team.
 */
export async function sendNotification({ subject, html, text, replyTo }) {
  return sendMail({
    to: NOTIFY_TO,
    subject,
    text,
    html,
    replyTo,
  });
}

