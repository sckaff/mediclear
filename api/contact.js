const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, email, phone, message, source } = req.body;

    const emailContent = `Name: ${name}\nEmail: ${email}\n${phone ? 'Phone: ' + phone + '\n' : ''}Message: ${message}\n${source ? 'Heard about us through: ' + source : ''}`;
    const content = {
      to: 'fernando@mediclear.ai',
      from: 'fernando@mediclear.ai', // Make sure this is a verified sender in SendGrid
      subject: `New message from ${name}`,
      text: emailContent,
      html: `<p>${emailContent.replace(/\n/g, '<br>')}</p>`,
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
