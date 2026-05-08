import { PlanLimits } from "@/types";

export const planLimits: Record<string, PlanLimits> = {
  FREE: {
    plan: "FREE",
    projects: 1,
    generations: 10,
    exports: "Basic ZIP export",
    analytics: "Core traffic stats"
  },
  STARTER: {
    plan: "STARTER",
    projects: 5,
    generations: 100,
    exports: "Full ZIP export",
    analytics: "Enhanced funnel analytics"
  },
  PRO: {
    plan: "PRO",
    projects: 25,
    generations: 500,
    exports: "Advanced exports and client handoff",
    analytics: "Advanced analytics and deploy tools"
  },
  AGENCY: {
    plan: "AGENCY",
    projects: 9999,
    generations: 2000,
    exports: "Unlimited client-ready exports",
    analytics: "Priority analytics and growth insights"
  }
};

export const pricingPlans = [
  {
    name: "Free",
    plan: "FREE",
    price: "$0",
    blurb: "Validate one startup concept with guided AI help.",
    features: ["1 project", "10 generations per month", "Basic export"]
  },
  {
    name: "Starter",
    plan: "STARTER",
    price: "$9",
    blurb: "Launch a side business with editing and export tools.",
    features: ["5 projects", "100 generations", "ZIP export", "Email funnel copy"]
  },
  {
    name: "Pro",
    plan: "PRO",
    price: "$29",
    blurb: "Build and refine multiple polished startup launches.",
    features: ["25 projects", "500 generations", "Advanced analytics", "Deploy workflow"]
  },
  {
    name: "Agency",
    plan: "AGENCY",
    price: "$79",
    blurb: "Run client launches with scale, speed, and support.",
    features: ["Unlimited projects", "2,000 generations", "Client-ready exports", "Priority support"]
  }
] as const;
