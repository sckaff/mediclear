const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { message } = req.body;

    const content = {
      to: 'fernando@mediclear.ai',
      from: 'fernando@mediclear.ai',
      subject: `Message from Simple Form`,
      text: `Message: ${message}`,
      html: `<p>Message: ${message}</p>`,
    };

    try {
      await sendgrid.send(content);
      res.status(200).json({ status: 'Ok', message: 'Email sent successfully' });
    } catch (error) {
      console.error('SendGrid error:', error);
      res.status(500).json({ status: 'Error', message: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
