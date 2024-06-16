// api/sendEmail.js

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { email } = req.body;

    const content = {
      to: 'fernando@mediclear.ai',
      from: 'fernando@mediclear.ai',
      subject: 'New Sign-Up',
      text: `Email: ${email}`,
      html: `<p>Email: ${email}</p>`,
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
