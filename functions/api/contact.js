export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    // Honeypot spam trap.
    if (body.website) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const requiredFields = ['name', 'email', 'service'];
    const missing = requiredFields.some((field) => !String(body[field] || '').trim());
    if (missing) {
      return new Response(JSON.stringify({ error: 'Missing required fields.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return new Response(JSON.stringify({ error: 'Email service not configured.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const submission = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      phone: String(body.phone || '').trim(),
      service: String(body.service || '').trim(),
      message: String(body.message || '').trim()
    };

    const html = `
      <h2>New Inquiry - Brutechgyan</h2>
      <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(submission.phone || 'N/A')}</p>
      <p><strong>Service:</strong> ${escapeHtml(submission.service)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(submission.message || 'N/A').replace(/\n/g, '<br/>')}</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: submission.email,
        subject: `New website inquiry from ${submission.name}`,
        html
      })
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      return new Response(JSON.stringify({ error: 'Email delivery failed.', details }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request payload.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
