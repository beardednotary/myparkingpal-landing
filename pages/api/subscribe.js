export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, hp } = req.body || {};

  // Honeypot check
  if (hp) return res.status(200).json({ ok: true });

  if (!email || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  try {
    const resp = await fetch(
      `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'pending', // or 'subscribed' if you want instant signups (not recommended)
        }),
      }
    );

    const data = await resp.json();

    if (resp.status >= 200 && resp.status < 300) {
      return res.status(200).json({ ok: true });
    }

    if (data.title === 'Member Exists') {
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: data.detail || 'Subscription failed' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
