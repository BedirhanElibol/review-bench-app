import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const CREDITS: Record<string, number> = { starter: 100, pro: 500 };

export async function POST(req: Request) {
  const event = await req.json();
  if (event.type === 'payment_intent.succeeded') {
    const { userId, plan } = event.data.object.metadata;
    const { data: profile } = await supabaseAdmin.from('profiles').select('credits').eq('id', userId).single();
    await supabaseAdmin.from('profiles').update({ credits: (profile?.credits ?? 0) + (CREDITS[plan] ?? 0) }).eq('id', userId);
  }
  return NextResponse.json({ received: true });
}
