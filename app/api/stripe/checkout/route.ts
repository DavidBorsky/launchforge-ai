import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { getOrCreateStripeCustomer, getStripe, getStripePriceId, stripeEnabled } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);

  const body = await request.json();
  const plan = String(body.plan || "FREE").toUpperCase();
  if (plan === "FREE") {
    return apiError("The free plan does not require checkout.");
  }

  if (!stripeEnabled()) {
    return apiError("Stripe is not configured. Add Stripe keys and price IDs first.");
  }

  const priceId = getStripePriceId(plan);
  if (!priceId) {
    return apiError(`Missing Stripe Price ID for ${plan}.`);
  }

  const stripe = getStripe();
  const customerId = await getOrCreateStripeCustomer({
    id: session.user.id,
    email: session.user.email,
    name: session.user.name
  });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    allow_promotion_codes: true,
    success_url: `${appUrl}/dashboard/billing?status=success&plan=${plan}`,
    cancel_url: `${appUrl}/dashboard/billing?status=cancel&plan=${plan}`,
    metadata: {
      userId: session.user.id,
      plan
    },
    subscription_data: {
      metadata: {
        userId: session.user.id,
        plan
      }
    }
  });

  return apiSuccess({
    enabled: true,
    checkoutUrl: checkoutSession.url
  });
}
