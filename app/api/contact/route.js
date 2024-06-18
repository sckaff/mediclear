// app/api/contact/route.js

import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const { name, email, phone, message, source } = await req.json();

  const emailContent = `Name: ${name}\nEmail: ${email}\n${phone ? 'Phone: ' + phone + '\n' : ''}Message: ${message}\n${source ? 'Heard about us through: ' + source : ''}`;
  const content = {
    to: 'fernando@mediclear.ai',
    from: 'fernando@mediclear.ai',
    subject: `New message from ${name}`,
    text: emailContent,
    html: `<p>${emailContent.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await sendgrid.send(content);
    return new Response(JSON.stringify({ status: 'Ok', message: 'Email sent successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    return new Response(JSON.stringify({ status: 'Error', message: 'Failed to send message' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Allow': 'POST, OPTIONS',
    },
  });
}
