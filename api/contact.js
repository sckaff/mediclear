const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  console.log(`Received ${req.method} request`);

  // Handle preflight requests (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { email, name, message, source } = req.body; // Destructuring with the possibility that 'source' might be empty

    // Construct email content, handling the 'source' field gracefully
    const sourceInfo = source ? `\nHeard about us through: ${source}` : '';
    const content = {
      to: 'your-email@example.com',
      from: 'no-reply@example.com',
      subject: `New Contact Message from ${name}`,
      text: `Message: ${message}\nFrom: ${name} <${email}>${sourceInfo}`,
      html: `<p>Message: ${message}</p><p>From: ${name} (<a href="mailto:${email}">${email}</a>)</p><p>${source ? 'Heard about us through: ' + source : ''}</p>`,
    };

    try {
      await sendgrid.send(content);
      res.status(200).json({ status: 'Ok' });
    } catch (error) {
      console.error('SendGrid error:', error);
      res.status(500).json({ status: 'Error', message: 'Failed to send message' });
    }
  } else {
    // Handle any non-POST and non-OPTIONS requests
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
