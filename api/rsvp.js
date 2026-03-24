export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const data = req.body;

    // Send email via AgentMail
    const apiKey = process.env.AGENTMAIL_API_KEY;
    const response = await fetch('https://api.agentmail.to/v0/inboxes/shopto@agentmail.to/threads', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject: `Wedding RSVP: ${data.guest_names || 'Unknown'} — ${data.attending === 'yes' ? '✅ Attending' : '❌ Not Attending'}`,
        to: ['shopto@agentmail.to'],
        text: [
          `RSVP Submission`,
          `──────────────`,
          `Attending: ${data.attending === 'yes' ? 'Yes ✅' : 'No ❌'}`,
          `Guests: ${data.guests || 1}`,
          `Names: ${data.guest_names || 'Not provided'}`,
          `Message: ${data.message || 'None'}`,
          `──────────────`,
          `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('AgentMail error:', err);
      return res.status(500).json({ error: 'Failed to submit RSVP' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('RSVP error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
