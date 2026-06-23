import { NextResponse } from 'next/server';
import { checkPassword, createSessionToken, sessionCookieHeader } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (!password || !checkPassword(password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.headers.set('Set-Cookie', sessionCookieHeader(token));
  return response;
}
