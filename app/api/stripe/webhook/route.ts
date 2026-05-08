import { apiSuccess } from "@/lib/api";
import { stripeEnabled } from "@/lib/stripe";

export async function POST() {
  return apiSuccess({
    received: true,
    enabled: stripeEnabled(),
    message: stripeEnabled()
      ? "Webhook endpoint is ready for Stripe signature verification logic."
      : "Webhook placeholder received the request. Add Stripe secrets to enable live processing."
  });
}
