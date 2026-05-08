import {
  BrandingKit,
  BusinessIdeaResult,
  GeneratedStartupContent,
  ProjectAnalyticsSnapshot,
  SEOConfig,
  StartupQuestionnaireInput
} from "@/types";

const palettes = [
  {
    primary: "#0F172A",
    secondary: "#1E293B",
    accent: "#10B981",
    background: "#F8FAFC",
    text: "#020617",
    muted: "#CBD5E1"
  },
  {
    primary: "#1D4ED8",
    secondary: "#172554",
    accent: "#F59E0B",
    background: "#F8FAFC",
    text: "#0F172A",
    muted: "#BFDBFE"
  },
  {
    primary: "#14532D",
    secondary: "#166534",
    accent: "#EAB308",
    background: "#FFFBEB",
    text: "#1C1917",
    muted: "#D9F99D"
  }
];

function pickPalette(seed: string) {
  return palettes[seed.length % palettes.length];
}

export function buildMockStartupContent(input: StartupQuestionnaireInput): GeneratedStartupContent {
  return {
    hero: {
      headline: `${input.businessName} helps ${input.targetAudience.toLowerCase()} launch faster without the guesswork.`,
      subheadline: `A polished ${input.productType.toLowerCase()} experience for ${input.niche.toLowerCase()} founders who want a sharper message, stronger brand, and a site that converts from day one.`,
      ctaPrimary: "Generate my launch kit",
      ctaSecondary: "Preview a sample startup"
    },
    valueProposition: `${input.businessName} turns your ${input.niche.toLowerCase()} idea into a launch-ready presence with messaging, branding, pricing, and funnel assets in one flow.`,
    positioning: `Built for ${input.targetAudience.toLowerCase()} who care about speed, clarity, and a ${input.tone.toLowerCase()} brand voice.`,
    features: [
      {
        title: "Guided startup generation",
        description: `Translate your idea, audience, and ${input.websiteGoal.toLowerCase()} into launch-ready messaging and structure.`
      },
      {
        title: "Brand system in minutes",
        description: `Generate a cohesive palette, tagline, and tone guide aligned to your ${input.brandingStyle.toLowerCase()} style.`
      },
      {
        title: "Export and deploy",
        description: "Move from concept to shareable website package with ZIP export and Vercel-ready deployment guidance."
      }
    ],
    benefits: [
      "Spend less time staring at a blank page",
      "Package your offer into a sharper conversion story",
      "Launch with copy, SEO, and growth assets already in place"
    ],
    pricing: [
      {
        name: "Launch",
        price: "$0",
        description: "A free plan to validate and shape your first idea.",
        features: ["1 project", "10 AI generations", "Basic export"]
      },
      {
        name: "Momentum",
        price: "$29",
        description: `For ${input.targetAudience.toLowerCase()} ready to ship and iterate.`,
        features: ["25 projects", "Advanced analytics", "Deploy workflow support"]
      }
    ],
    faq: [
      {
        question: `Who is ${input.businessName} best for?`,
        answer: `It's ideal for ${input.targetAudience.toLowerCase()} building ${input.productType.toLowerCase()} offers in ${input.niche.toLowerCase()} and needing a polished go-to-market foundation.`
      },
      {
        question: "Can I edit the generated output?",
        answer: "Yes. Every section of the launch kit can be refined in the built-in editor before export or deployment."
      },
      {
        question: "What if I do not have live integrations yet?",
        answer: "The platform is designed to stay useful with mock-safe AI, Stripe, and Vercel placeholder flows until you add real API keys."
      }
    ],
    contact: {
      headline: "Start building a startup that feels real from day one",
      description: `Book a demo or start your first ${input.niche.toLowerCase()} launch kit today.`,
      email: `hello@${input.businessName.toLowerCase().replace(/\s+/g, "")}.co`
    },
    emailFunnel: {
      subjectLine: `${input.businessName}: your faster path to a sharper launch`,
      previewText: "See how your startup can go from idea to launch kit in one guided flow.",
      body: `Thanks for exploring ${input.businessName}. We'll help you clarify the problem you solve, shape a ${input.tone.toLowerCase()} voice, and launch a brand experience your audience remembers.`
    },
    blogPosts: [
      {
        title: `How ${input.targetAudience} can validate a ${input.niche} offer before building too much`,
        excerpt: "A practical framework for finding signal, not just shipping features."
      },
      {
        title: `The fastest way to position a ${input.productType.toLowerCase()} business in a crowded market`,
        excerpt: "A messaging checklist for founders who need sharper differentiation."
      },
      {
        title: `Why brand clarity matters before you buy more traffic`,
        excerpt: "Use tone, offer framing, and conversion architecture to make every click work harder."
      }
    ],
    socialCaptions: [
      {
        platform: input.socialPlatformFocus,
        caption: `${input.businessName} is helping ${input.targetAudience.toLowerCase()} stop launching from scratch. Messaging, brand, pricing, and site assets in one polished workflow.`
      },
      {
        platform: "LinkedIn",
        caption: `Most early-stage launches fail because the story is fuzzy. ${input.businessName} gives founders a clear offer, a cleaner brand, and a site built to convert.`
      }
    ]
  };
}

export function buildMockBranding(input: StartupQuestionnaireInput): BrandingKit {
  const palette = pickPalette(`${input.businessName}${input.preferredColors}`);

  return {
    personality: `${input.tone} and confidence-building`,
    tagline: `${input.problem} solved with a launch experience that feels premium and fast.`,
    voiceGuide: [
      "Write with clarity before cleverness.",
      "Sound practical, modern, and reassuring.",
      "Focus on outcomes and momentum."
    ],
    logoPlaceholder: input.businessName
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 3),
    keywords: [input.niche, input.targetAudience, input.brandingStyle, input.tone],
    fonts: {
      heading: "Satoshi / system fallback",
      body: "Inter / system fallback"
    },
    palette
  };
}

export function buildMockSEO(input: StartupQuestionnaireInput): SEOConfig {
  return {
    title: `${input.businessName} | Launch smarter in ${input.niche}`,
    description: `${input.businessName} helps ${input.targetAudience.toLowerCase()} solve ${input.problem.toLowerCase()} with a ${input.productType.toLowerCase()} launch system built for conversion.`,
    keywords: [input.businessName, input.niche, input.targetAudience, input.productType],
    ogTitle: `${input.businessName} launch kit`,
    ogDescription: `Generate branding, copy, pricing, SEO, and deploy-ready assets for your next ${input.niche.toLowerCase()} startup.`
  };
}

export function buildMockIdeas(seed: {
  industry: string;
  skills: string;
  budget: string;
  audience: string;
  monetizationPreference: string;
  automationLevel: string;
}): BusinessIdeaResult {
  return {
    businessNames: [`${seed.industry}Pilot`, `${seed.audience}Forge`, `${seed.skills}Loop`],
    problem: `${seed.audience} struggle to turn ${seed.skills.toLowerCase()} into repeatable growth without wasting time on manual setup.`,
    targetCustomer: `${seed.audience} seeking a lean ${seed.industry.toLowerCase()} business they can start with ${seed.budget.toLowerCase()}.`,
    offer: `A productized ${seed.industry.toLowerCase()} service with ${seed.automationLevel.toLowerCase()} automation and built-in reporting.`,
    pricingIdea: `${seed.monetizationPreference} with a low-friction starter tier and premium concierge upsell.`,
    mvpDescription: `A simple dashboard, lead capture page, onboarding flow, and automated delivery engine tailored to ${seed.audience.toLowerCase()}.`,
    marketingAngle: `Show how ${seed.audience.toLowerCase()} can save time, ship faster, and look more professional immediately.`,
    difficultyRating: "Medium",
    monetizationPotential: "Strong"
  };
}

export function buildMockAnalytics(projectName: string): ProjectAnalyticsSnapshot {
  const seed = projectName.length * 17;
  return {
    pageViews: 1200 + seed,
    visitors: 430 + (seed % 120),
    conversionRate: Number((4.3 + (seed % 8) * 0.3).toFixed(1)),
    emailSignups: 68 + (seed % 40),
    ctaClicks: 102 + (seed % 60),
    trafficSources: [
      { label: "Organic", value: 42 },
      { label: "Social", value: 28 },
      { label: "Direct", value: 18 },
      { label: "Referral", value: 12 }
    ],
    devices: [
      { label: "Desktop", value: 61 },
      { label: "Mobile", value: 31 },
      { label: "Tablet", value: 8 }
    ],
    revenueEstimate: 1800 + seed
  };
}
