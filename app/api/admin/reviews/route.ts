import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await sql`
    SELECT id, name, text, rating, created_at, approved
    FROM reviews
    ORDER BY approved ASC, created_at DESC
  `;

  return NextResponse.json(rows);
}
