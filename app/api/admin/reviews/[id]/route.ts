import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await sql`UPDATE reviews SET approved = TRUE WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await sql`DELETE FROM reviews WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
