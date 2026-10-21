import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { requireUser } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, number> = { starter: 900, pro: 2900 };

// Plans can now be bought with a promo-adjusted price computed on the pricing page.
export async function POST(req: Request) {
  const { user } = await requireUser();
  const { plan, amount } = await req.json();
  if (!PLANS[plan]) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });
  const intent = await stripe.paymentIntents.create({
    amount: Number(amount ?? PLANS[plan]),
    currency: 'usd',
    metadata: { userId: user.id, plan },
  });
  return NextResponse.json({ clientSecret: intent.client_secret });
}
