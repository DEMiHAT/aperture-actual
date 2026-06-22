import { sendNotification, isMailerConfigured } from '@/lib/mailer';

// Route handler for both lead types: strategy-call bookings and Aperture
// Moments registrations. Both deliver to NOTIFY_TO (aperture.websites@gmail.com).

export const runtime = 'nodejs';

const CONFIG = {
  'strategy-call': {
    label: 'Strategy Call Booking',
    accent: '#000000',
    fields: ['name', 'email', 'phone', 'company', 'preferredDate', 'preferredTime', 'message'],
    required: ['name', 'email'],
  },
  moments: {
    label: 'Aperture Moments Registration',
    accent: '#e6a532',
    fields: ['name', 'email', 'phone', 'occasion', 'recipient', 'addons', 'message'],
    required: ['name', 'email'],
  },
};

const LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  company: 'Company',
  preferredDate: 'Preferred date',
  preferredTime: 'Preferred time',
  occasion: 'Occasion',
  recipient: 'For whom',
  addons: 'Add-ons',
  message: 'Message',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const { type, fields = {} } = body || {};
  const config = CONFIG[type];
  if (!config) {
    return Response.json({ ok: false, error: 'Unknown submission type.' }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; humans don't.
  if (body.company_website) {
    return Response.json({ ok: true });
  }

  // Validate required fields.
  for (const key of config.required) {
    if (!String(fields[key] || '').trim()) {
      return Response.json(
        { ok: false, error: `Missing required field: ${LABELS[key] || key}.` },
        { status: 400 }
      );
    }
  }
  if (!isValidEmail(fields.email)) {
    return Response.json({ ok: false, error: 'Please provide a valid email.' }, { status: 400 });
  }

  if (!isMailerConfigured()) {
    return Response.json(
      { ok: false, error: 'Email service is not configured on the server.' },
      { status: 503 }
    );
  }

  // Build the email body from whichever fields were supplied.
  const rows = config.fields
    .filter((key) => String(fields[key] || '').trim())
    .map(
      (key) =>
        `<tr>
          <td style="padding:8px 16px;border-bottom:1px solid #eee;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#888;white-space:nowrap;vertical-align:top">${escapeHtml(
            LABELS[key] || key
          )}</td>
          <td style="padding:8px 16px;border-bottom:1px solid #eee;font-size:15px;color:#111">${escapeHtml(
            fields[key]
          ).replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto">
      <div style="background:${config.accent};padding:24px 28px">
        <h1 style="margin:0;color:#fff;font-size:18px;letter-spacing:1px">${escapeHtml(
          config.label
        )}</h1>
        <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:12px">Aperture Technologies — aperturewebs.co.in</p>
      </div>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-top:none">
        ${rows}
      </table>
      <p style="margin:18px 0 0;font-size:12px;color:#aaa">Reply directly to this email to respond to ${escapeHtml(
        fields.name
      )}.</p>
    </div>`;

  const text = config.fields
    .filter((key) => String(fields[key] || '').trim())
    .map((key) => `${LABELS[key] || key}: ${fields[key]}`)
    .join('\n');

  try {
    await sendNotification({
      subject: `${config.label} — ${fields.name}`,
      html,
      text: `${config.label}\n\n${text}`,
      replyTo: fields.email,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('[notify] send failed:', err);
    return Response.json(
      { ok: false, error: 'Could not send your message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
