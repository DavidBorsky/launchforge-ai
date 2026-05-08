import {
  buildMockBranding,
  buildMockIdeas,
  buildMockSEO,
  buildMockStartupContent
} from "@/data/mock";
import { BusinessIdeaResult, BrandingKit, GeneratedStartupContent, SEOConfig, StartupQuestionnaireInput } from "@/types";

function providerEnabled() {
  return Boolean(process.env.OPENAI_API_KEY);
}

async function mockDelay() {
  await new Promise((resolve) => setTimeout(resolve, 250));
}

export async function generateStartupCopy(
  input: StartupQuestionnaireInput
): Promise<GeneratedStartupContent> {
  if (!providerEnabled()) {
    await mockDelay();
    return buildMockStartupContent(input);
  }

  await mockDelay();
  return buildMockStartupContent(input);
}

export async function generateBranding(input: StartupQuestionnaireInput): Promise<BrandingKit> {
  if (!providerEnabled()) {
    await mockDelay();
    return buildMockBranding(input);
  }

  await mockDelay();
  return buildMockBranding(input);
}

export async function generateSEO(input: StartupQuestionnaireInput): Promise<SEOConfig> {
  if (!providerEnabled()) {
    await mockDelay();
    return buildMockSEO(input);
  }

  await mockDelay();
  return buildMockSEO(input);
}

export async function generateBlogPosts(input: StartupQuestionnaireInput) {
  const content = await generateStartupCopy(input);
  return content.blogPosts;
}

export async function generateSocialCaptions(input: StartupQuestionnaireInput) {
  const content = await generateStartupCopy(input);
  return content.socialCaptions;
}

export async function generateBusinessIdeas(input: {
  industry: string;
  skills: string;
  budget: string;
  audience: string;
  monetizationPreference: string;
  automationLevel: string;
}): Promise<BusinessIdeaResult> {
  if (!providerEnabled()) {
    await mockDelay();
    return buildMockIdeas(input);
  }

  await mockDelay();
  return buildMockIdeas(input);
}
