import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { randomInt } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
  const { phone } = await req.json();
  const code = String(randomInt(100000, 999999));
  await supabaseAdmin.from('login_codes').insert({ phone, code, expires_at: new Date(Date.now() + 5 * 60_000).toISOString() });
  await client.messages.create({ to: phone, from: process.env.TWILIO_FROM, body: `Your login code: ${code}` });
  return NextResponse.json({ sent: true });
}
