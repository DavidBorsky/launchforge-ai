import Stripe from "stripe";
import { apiError, apiSuccess } from "@/lib/api";
import {
  cancelStripeSubscriptionRecord,
  getStripe,
  stripeEnabled,
  syncStripeSubscription
} from "@/lib/stripe";

export async function POST(request: Request) {
  if (!stripeEnabled()) {
    return apiError("Stripe is not configured.", 400);
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return apiError("Missing STRIPE_WEBHOOK_SECRET.", 400);
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return apiError("Missing Stripe signature header.", 400);
  }

  const rawBody = await request.text();
  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return apiError(
      error instanceof Error ? `Webhook signature verification failed: ${error.message}` : "Invalid Stripe webhook.",
      400
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.subscription && typeof session.subscription === "string") {
        await syncStripeSubscription(session.subscription);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.created": {
      const subscription = event.data.object as Stripe.Subscription;
      await syncStripeSubscription(subscription.id);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await cancelStripeSubscriptionRecord(subscription.id);
      break;
    }
    default:
      break;
  }

  return apiSuccess({ received: true, type: event.type });
}
