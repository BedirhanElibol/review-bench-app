import { NextResponse } from 'next/server';
import { parseToken } from '@/lib/api-auth';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const caller = parseToken(req.headers.get('authorization'));
  if (caller.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  await supabaseAdmin.auth.admin.deleteUser(id);
  return NextResponse.json({ ok: true });
}
