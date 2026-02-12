import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await db.workspace.update({
        where: { stripeCustomerId: session.customer as string },
        data: {
          plan: "PRO",
          stripeSubscriptionId: session.subscription as string,
        },
      });
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await db.workspace.update({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: "FREE", stripeSubscriptionId: null },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
