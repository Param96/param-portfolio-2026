import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // Initialize inside the handler to prevent Next.js build-time errors if the env var isn't set yet
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, subject, message, reason } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default testing domain
      to: ['paramppatel100@gmail.com'], // The destination email
      replyTo: email,
      subject: `New Message from ${name}: ${subject || 'No Subject'}`,
      text: `Name: ${name}\nEmail: ${email}\nReason: ${reason || 'Not specified'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #BA421A;">New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Reason:</strong> ${reason || 'Not specified'}</p>
          <p><strong>Subject:</strong> ${subject || 'None'}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
