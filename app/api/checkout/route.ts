import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { requireUser } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, number> = { starter: 900, pro: 2900 };

export async function POST(req: Request) {
  const { user } = await requireUser();
  const { plan } = await req.json();
  const amount = PLANS[plan];
  if (!amount) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
  const intent = await stripe.paymentIntents.create({ amount, currency: 'usd', metadata: { userId: user.id, plan } });
  return NextResponse.json({ clientSecret: intent.client_secret });
}
