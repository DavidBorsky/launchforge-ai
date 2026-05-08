import { z } from "zod";

export const startupQuestionnaireSchema = z.object({
  businessName: z.string().min(2),
  niche: z.string().min(2),
  targetAudience: z.string().min(2),
  problem: z.string().min(5),
  productType: z.string().min(2),
  pricingModel: z.string().min(2),
  tone: z.string().min(2),
  brandingStyle: z.string().min(2),
  preferredColors: z.string().min(2),
  websiteGoal: z.string().min(2),
  emailCaptureGoal: z.string().min(2),
  socialPlatformFocus: z.string().min(2),
  templateId: z.string().optional()
});

export const ideaGeneratorSchema = z.object({
  industry: z.string().min(2),
  skills: z.string().min(2),
  budget: z.string().min(2),
  audience: z.string().min(2),
  monetizationPreference: z.string().min(2),
  automationLevel: z.string().min(2)
});

export const projectPatchSchema = z.object({
  name: z.string().min(2).optional(),
  generatedContent: z.any().optional(),
  branding: z.any().optional(),
  seo: z.any().optional(),
  analytics: z.any().optional(),
  status: z.string().optional()
});
