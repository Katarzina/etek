import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sql } from '@/lib/db';
import { COMPANY } from '@/lib/config';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, text, rating } = await request.json();

  if (!name || !text || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
  }

  await sql`
    INSERT INTO reviews (name, text, rating) VALUES (${name}, ${text}, ${ratingNum})
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'noreply@etek-stavby.cz',
    to:   process.env.EMAIL_TO   ?? COMPANY.email,
    subject: `Nový recenzi od ${name}`,
    html: `
      <h2>Nová recenze na webu ${COMPANY.fullName}</h2>
      <p><strong>Jméno:</strong> ${name}</p>
      <p><strong>Hodnocení:</strong> ${'★'.repeat(ratingNum)}${'☆'.repeat(5 - ratingNum)}</p>
      <p><strong>Text:</strong></p>
      <p style="white-space:pre-wrap">${text}</p>
      <hr/>
      <p>Schválit nebo smazat: <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">Přejít do administrace</a></p>
    `,
  });

  return NextResponse.json({ ok: true });
}
