import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { getStripePlaceholderUrl, stripeEnabled } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);

  const body = await request.json();
  const plan = String(body.plan || "FREE").toUpperCase();

  return apiSuccess({
    enabled: stripeEnabled(),
    checkoutUrl: getStripePlaceholderUrl(plan),
    message: stripeEnabled()
      ? "Replace this placeholder with a live Stripe Checkout Session."
      : "Stripe keys are missing, so this route returns a placeholder checkout URL."
  });
}
