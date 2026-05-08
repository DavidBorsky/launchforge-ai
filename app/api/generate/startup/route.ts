import { getServerSession } from "next-auth";
import { Prisma, ProjectStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/platform";
import { startupQuestionnaireSchema, ideaGeneratorSchema } from "@/lib/validations";
import {
  generateBranding,
  generateBusinessIdeas,
  generateSEO,
  generateStartupCopy
} from "@/lib/ai";
import { enforceGenerationLimit } from "@/lib/rate-limit";
import { buildMockAnalytics } from "@/data/mock";
import { templateSeeds } from "@/data/templates";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return apiError("Unauthorized.", 401);
  }

  const mode = request.nextUrl.searchParams.get("mode");
  const body = await request.json();
  const { plan } = await getUserPlan(session.user.id);
  await enforceGenerationLimit(session.user.id, plan);

  if (mode === "ideas") {
    const parsedIdeas = ideaGeneratorSchema.safeParse(body);
    if (!parsedIdeas.success) {
      return apiError("Invalid idea generator input.");
    }

    const idea = await generateBusinessIdeas(parsedIdeas.data);
    await prisma.generation.create({
      data: {
        userId: session.user.id,
        type: "BUSINESS_IDEA",
        input: parsedIdeas.data as Prisma.InputJsonValue,
        output: idea as Prisma.InputJsonValue
      }
    });

    return apiSuccess({ idea });
  }

  const parsed = startupQuestionnaireSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Invalid startup questionnaire input.");
  }

  const template = templateSeeds.find((item) => item.id === parsed.data.templateId);
  const mergedInput = {
    ...template?.config,
    ...parsed.data
  };

  const [generatedContent, branding, seo] = await Promise.all([
    generateStartupCopy(mergedInput),
    generateBranding(mergedInput),
    generateSEO(mergedInput)
  ]);

  const project = await prisma.project.create({
    data: {
      userId: session.user.id,
      name: mergedInput.businessName,
      niche: mergedInput.niche,
      targetAudience: mergedInput.targetAudience,
      businessType: mergedInput.productType,
      pricingModel: mergedInput.pricingModel,
      brandingStyle: mergedInput.brandingStyle,
      status: ProjectStatus.GENERATED,
      generatedContent,
      branding,
      seo,
      analytics: buildMockAnalytics(mergedInput.businessName)
    }
  });

  await prisma.generation.create({
    data: {
      userId: session.user.id,
      projectId: project.id,
      type: "STARTUP_LAUNCH_KIT",
      input: mergedInput as Prisma.InputJsonValue,
      output: { generatedContent, branding, seo } as Prisma.InputJsonValue
    }
  });

  return apiSuccess({
    project
  });
}
