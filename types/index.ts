export type PlanName = "FREE" | "STARTER" | "PRO" | "AGENCY";

export interface StartupQuestionnaireInput {
  businessName: string;
  niche: string;
  targetAudience: string;
  problem: string;
  productType: string;
  pricingModel: string;
  tone: string;
  brandingStyle: string;
  preferredColors: string;
  websiteGoal: string;
  emailCaptureGoal: string;
  socialPlatformFocus: string;
  templateId?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPostStarter {
  title: string;
  excerpt: string;
}

export interface SocialCaption {
  platform: string;
  caption: string;
}

export interface GeneratedStartupContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  valueProposition: string;
  positioning: string;
  features: FeatureItem[];
  benefits: string[];
  pricing: PricingTier[];
  faq: FAQItem[];
  contact: {
    headline: string;
    description: string;
    email: string;
  };
  emailFunnel: {
    subjectLine: string;
    previewText: string;
    body: string;
  };
  blogPosts: BlogPostStarter[];
  socialCaptions: SocialCaption[];
}

export interface BrandingKit {
  personality: string;
  tagline: string;
  voiceGuide: string[];
  logoPlaceholder: string;
  keywords: string[];
  fonts: {
    heading: string;
    body: string;
  };
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

export interface BusinessIdeaResult {
  businessNames: string[];
  problem: string;
  targetCustomer: string;
  offer: string;
  pricingIdea: string;
  mvpDescription: string;
  marketingAngle: string;
  difficultyRating: "Low" | "Medium" | "High";
  monetizationPotential: "Moderate" | "Strong" | "Excellent";
}

export interface ProjectAnalyticsSnapshot {
  pageViews: number;
  visitors: number;
  conversionRate: number;
  emailSignups: number;
  ctaClicks: number;
  trafficSources: Array<{ label: string; value: number }>;
  devices: Array<{ label: string; value: number }>;
  revenueEstimate: number;
}

export interface PlanLimits {
  plan: PlanName;
  projects: number;
  generations: number;
  exports: string;
  analytics: string;
}

export interface TemplateSeed {
  id: string;
  name: string;
  category: string;
  description: string;
  suggestedUseCase: string;
  previewLabel: string;
  config: Partial<StartupQuestionnaireInput>;
}

export interface ProjectRecord {
  id: string;
  name: string;
  niche: string;
  targetAudience: string;
  businessType: string;
  pricingModel: string;
  brandingStyle: string;
  status: string;
  generatedContent: GeneratedStartupContent;
  branding: BrandingKit;
  seo: SEOConfig;
  analytics: ProjectAnalyticsSnapshot;
  createdAt: string;
  updatedAt: string;
}
