import { sendNotification, sendMail, isMailerConfigured } from '@/lib/mailer';

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

  // 1. Build and send the notification email to the admin team (NOTIFY_TO)
  const adminHtml = buildAdminHtml(type, fields, config);
  const adminText = `${config.label}\n\n` + config.fields
    .filter((key) => String(fields[key] || '').trim())
    .map((key) => `${LABELS[key] || key}: ${fields[key]}`)
    .join('\n');

  // 2. Build and send the personalized confirmation email to the client
  const clientHtml = buildClientHtml(type, fields, config);
  const clientText = buildClientText(type, fields, config);
  const clientSubject = type === 'moments'
    ? `Aperture Moments Experience Registration Confirmed`
    : `Strategy Call Booking Confirmed — Aperture`;

  try {
    // Send both in parallel
    await Promise.all([
      sendNotification({
        subject: `${config.label} — ${fields.name}`,
        html: adminHtml,
        text: adminText,
        replyTo: fields.email,
      }),
      sendMail({
        to: fields.email,
        subject: clientSubject,
        html: clientHtml,
        text: clientText,
      }),
    ]);

    return Response.json({ ok: true });
  } catch (err) {
    console.error('[notify] email sending failed:', err);
    return Response.json(
      { ok: false, error: 'Could not send your message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}

function buildAdminHtml(type, fields, config) {
  const accent = config.accent;
  const label = config.label;

  const rows = config.fields
    .filter((key) => String(fields[key] || '').trim())
    .map(
      (key) =>
        `<tr>
          <td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#888;white-space:nowrap;vertical-align:top;width:35%">${escapeHtml(
            LABELS[key] || key
          )}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222;font-weight:500">${escapeHtml(
            fields[key]
          ).replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${label}</title>
    </head>
    <body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fafafa;padding:40px 10px">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;border:1px solid #e8e8e8;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.03)">
              
              <!-- Header -->
              <tr>
                <td style="background-color:#111111;padding:32px 32px 28px 32px;text-align:left">
                  <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
                    <tr>
                      <td style="border:1.5px solid #ffffff;border-radius:50%;width:20px;height:20px;text-align:center;vertical-align:middle">
                        <span style="display:inline-block;background-color:#ffffff;width:6px;height:6px;border-radius:50%"></span>
                      </td>
                      <td style="font-size:18px;font-weight:600;color:#ffffff;letter-spacing:1px;padding-left:10px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif">APERTURE SYSTEM</td>
                    </tr>
                  </table>
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:500;line-height:1.2;letter-spacing:-0.5px">New ${label}</h1>
                  <div style="height:3px;width:40px;background-color:${accent};margin-top:16px"></div>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding:40px 32px 32px 32px">
                  <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#333">A new lead has been submitted on the website. Below are the details:</p>
                  
                  <!-- Lead Details Table -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #eaeaea;border-radius:8px;overflow:hidden;border-collapse:separate;margin-bottom:32px">
                    ${rows}
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#fcfcfc;border-top:1px solid #f0f0f0;padding:32px;text-align:center">
                  <p style="margin:0 0 8px 0;font-size:12px;color:#888;line-height:1.5">
                    Reply directly to this email to follow up with <strong>${escapeHtml(fields.name)}</strong> (${escapeHtml(fields.email)}).
                  </p>
                  <p style="margin:24px 0 0 0;font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:1px">&copy; ${new Date().getFullYear()} Aperture System. Confidential internal notification.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildClientHtml(type, fields, config) {
  const isMoments = type === 'moments';
  const accent = config.accent;
  
  const title = isMoments 
    ? 'Your Memory Experience' 
    : 'Strategy Call Request';
    
  const heading = isMoments 
    ? 'Aperture Moments Registration' 
    : 'Strategy Call Received';

  const introText = isMoments
    ? `Hi ${escapeHtml(fields.name)},<br><br>Thank you for registering for an <strong>Aperture Moments</strong> experience. We are thrilled to help you capture and curate this special occasion. A dedicated memory architect from our team will reach out to you within 24 hours to plan your custom experience.`
    : `Hi ${escapeHtml(fields.name)},<br><br>We have successfully received your booking request for a <strong>Strategy Call</strong> with Aperture. We're excited to learn more about your goals and explore how we can engineer an extraordinary solution for your business.`;

  // Build the details list
  const rows = config.fields
    .filter((key) => String(fields[key] || '').trim())
    .map(
      (key) =>
        `<tr>
          <td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#888;white-space:nowrap;vertical-align:top;width:35%">${escapeHtml(
            LABELS[key] || key
          )}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #f0f0f0;font-size:14px;color:#222;font-weight:500">${escapeHtml(
            fields[key]
          ).replace(/\n/g, '<br>')}</td>
        </tr>`
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background-color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#fafafa;padding:40px 10px">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background-color:#ffffff;border:1px solid #e8e8e8;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.03)">
              
              <!-- Header -->
              <tr>
                <td style="background-color:#111111;padding:32px 32px 28px 32px;text-align:left;position:relative">
                  <!-- Minimal Dot Logo -->
                  <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:20px">
                    <tr>
                      <td style="border:1.5px solid #ffffff;border-radius:50%;width:20px;height:20px;text-align:center;vertical-align:middle">
                        <span style="display:inline-block;background-color:#ffffff;width:6px;height:6px;border-radius:50%"></span>
                      </td>
                      <td style="font-size:18px;font-weight:600;color:#ffffff;letter-spacing:1px;padding-left:10px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif">APERTURE</td>
                    </tr>
                  </table>
                  <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:500;line-height:1.2;letter-spacing:-0.5px">${heading}</h1>
                  <div style="height:3px;width:40px;background-color:${accent};margin-top:16px"></div>
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding:40px 32px 32px 32px">
                  <p style="margin:0 0 24px 0;font-size:15px;line-height:1.6;color:#333">${introText}</p>
                  
                  <!-- Booking Details -->
                  <h3 style="margin:32px 0 12px 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#111;font-weight:600">Your Submitted Details</h3>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #eaeaea;border-radius:8px;overflow:hidden;border-collapse:separate;margin-bottom:32px">
                    ${rows}
                  </table>

                  <!-- Helpful Resources / Interactive links -->
                  <h3 style="margin:32px 0 16px 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#111;font-weight:600">Interactive Connections</h3>
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px">
                    <tr>
                      <td style="padding-bottom:12px">
                        <a href="https://wa.me/919003472654" target="_blank" style="display:block;text-decoration:none;border:1px solid #25d366;border-radius:6px;padding:12px 16px;background-color:#f4fbf6;color:#128c7e;font-size:14px;font-weight:500;text-align:center">
                          💬 Connect via WhatsApp Business &rarr;
                        </a>
                      </td>
                    </tr>
                    ${!isMoments ? `
                    <tr>
                      <td style="padding-bottom:12px">
                        <a href="https://aperturewebs.co.in/#services" target="_blank" style="display:block;text-decoration:none;border:1px solid #111111;border-radius:6px;padding:12px 16px;background-color:#111111;color:#ffffff;font-size:14px;font-weight:500;text-align:center">
                          Explore Our Software Engineering Capabilities
                        </a>
                      </td>
                    </tr>
                    ` : `
                    <tr>
                      <td style="padding-bottom:12px">
                        <a href="https://aperturewebs.co.in/moments" target="_blank" style="display:block;text-decoration:none;border:1px solid #e6a532;border-radius:6px;padding:12px 16px;background-color:#fefaf3;color:#b27612;font-size:14px;font-weight:500;text-align:center">
                          Explore More Aperture Moments
                        </a>
                      </td>
                    </tr>
                    `}
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#fcfcfc;border-top:1px solid #f0f0f0;padding:32px;text-align:center">
                  <p style="margin:0 0 16px 0;font-size:12px;color:#888;line-height:1.5">
                    Aperture Technologies · Chennai, Tamil Nadu, India<br>
                    Intelligent Digital Experiences · <a href="https://aperturewebs.co.in" target="_blank" style="color:#111;text-decoration:underline">aperturewebs.co.in</a>
                  </p>
                  <table border="0" cellpadding="0" cellspacing="0" align="center">
                    <tr>
                      <td style="padding:0 8px">
                        <a href="https://www.linkedin.com/company/aperturewebs" target="_blank" style="color:#0077b5;text-decoration:none;font-size:12px;font-weight:500">LinkedIn</a>
                      </td>
                      <td style="color:#ddd">·</td>
                      <td style="padding:0 8px">
                        <a href="https://github.com/aperturewebs" target="_blank" style="color:#333;text-decoration:none;font-size:12px;font-weight:500">GitHub</a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:24px 0 0 0;font-size:10px;color:#aaa;text-transform:uppercase;letter-spacing:1px">&copy; ${new Date().getFullYear()} Aperture. All rights reserved.</p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function buildClientText(type, fields, config) {
  const isMoments = type === 'moments';
  const heading = isMoments ? 'Aperture Moments Registration' : 'Strategy Call Received';
  const intro = isMoments
    ? `Hi ${fields.name},\n\nThank you for registering for an Aperture Moments experience. We are thrilled to help you capture and curate this special occasion. A dedicated memory architect from our team will reach out to you within 24 hours to plan your custom experience.`
    : `Hi ${fields.name},\n\nWe have successfully received your booking request for a Strategy Call with Aperture. We're excited to learn more about your goals and explore how we can engineer an extraordinary solution for your business.`;

  const details = config.fields
    .filter((key) => String(fields[key] || '').trim())
    .map((key) => `${LABELS[key] || key}: ${fields[key]}`)
    .join('\n');

  return `${heading}\n\n${intro}\n\nSubmitted Details:\n${details}\n\nContact us on WhatsApp: https://wa.me/919003472654\nWebsite: https://aperturewebs.co.in`;
}
