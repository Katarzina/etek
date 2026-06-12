import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { COMPANY } from '@/lib/config';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'noreply@etek-stavby.cz',
    to:   process.env.EMAIL_TO   ?? 'info@etek-stavby.cz',
    replyTo: email,
    subject: `Nová zpráva od ${name}`,
    html: `
      <h2>Nová zpráva z webu ${COMPANY.fullName}</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        <tr><td><strong>Jméno</strong></td><td>${name}</td></tr>
        <tr><td><strong>E-mail</strong></td><td>${email}</td></tr>
        ${phone ? `<tr><td><strong>Telefon</strong></td><td>${phone}</td></tr>` : ''}
        <tr><td><strong>Zpráva</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
      </table>
    `,
  });

  if (error) {
    console.error('[contact] Resend error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
