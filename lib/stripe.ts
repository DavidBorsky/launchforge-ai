export function stripeEnabled() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripePlaceholderUrl(plan: string) {
  return `/dashboard/billing?checkout=${plan.toLowerCase()}`;
}
