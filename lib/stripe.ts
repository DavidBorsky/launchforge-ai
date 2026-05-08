import Stripe from "stripe";
import { SubscriptionPlan, SubscriptionStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

let stripeClient: Stripe | null = null;

export function stripeEnabled() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-02-25.clover"
    });
  }

  return stripeClient;
}

export function getStripePriceId(plan: string) {
  const stripePriceEnvByPlan: Record<string, string | undefined> = {
    STARTER: process.env.STRIPE_PRICE_STARTER,
    PRO: process.env.STRIPE_PRICE_PRO,
    AGENCY: process.env.STRIPE_PRICE_AGENCY
  };

  return stripePriceEnvByPlan[plan];
}

export async function getOrCreateStripeCustomer(user: {
  id: string;
  email?: string | null;
  name?: string | null;
}) {
  const subscription = await prisma.subscription.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  if (subscription?.stripeCustomerId) {
    return subscription.stripeCustomerId;
  }

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    metadata: {
      userId: user.id
    }
  });

  if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        stripeCustomerId: customer.id
      }
    });
  } else {
    await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeCustomerId: customer.id,
        plan: SubscriptionPlan.FREE,
        status: SubscriptionStatus.INACTIVE
      }
    });
  }

  return customer.id;
}

export async function syncStripeSubscription(subscriptionId: string) {
  const stripe = getStripe();
  const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  const userId = stripeSubscription.metadata.userId;
  const customerId =
    typeof stripeSubscription.customer === "string"
      ? stripeSubscription.customer
      : stripeSubscription.customer.id;

  if (!userId) {
    return null;
  }

  const plan = (stripeSubscription.metadata.plan ?? "FREE") as SubscriptionPlan;
  const status = mapStripeStatus(stripeSubscription.status);
  const currentPeriodEndUnix =
    (stripeSubscription as Stripe.Subscription & {
      current_period_end?: number;
      items?: { data?: Array<{ current_period_end?: number }> };
    }).current_period_end ??
    (stripeSubscription.items.data[0] as { current_period_end?: number } | undefined)?.current_period_end;

  const currentPeriodEnd = currentPeriodEndUnix
    ? new Date(currentPeriodEndUnix * 1000)
    : null;

  const existing = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  if (existing) {
    return prisma.subscription.update({
      where: { id: existing.id },
      data: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: stripeSubscription.id,
        plan,
        status,
        currentPeriodEnd
      }
    });
  }

  return prisma.subscription.create({
    data: {
      userId,
      stripeCustomerId: customerId,
      stripeSubscriptionId: stripeSubscription.id,
      plan,
      status,
      currentPeriodEnd
    }
  });
}

export async function cancelStripeSubscriptionRecord(subscriptionId: string) {
  const existing = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
    orderBy: { createdAt: "desc" }
  });

  if (!existing) return null;

  return prisma.subscription.update({
    where: { id: existing.id },
    data: {
      status: SubscriptionStatus.CANCELED
    }
  });
}

function mapStripeStatus(status: Stripe.Subscription.Status): SubscriptionStatus {
  switch (status) {
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "trialing":
      return SubscriptionStatus.TRIALING;
    case "past_due":
      return SubscriptionStatus.PAST_DUE;
    case "canceled":
    case "unpaid":
      return SubscriptionStatus.CANCELED;
    default:
      return SubscriptionStatus.INACTIVE;
  }
}
