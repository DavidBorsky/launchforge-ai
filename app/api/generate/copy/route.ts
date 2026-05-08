import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { generateStartupCopy } from "@/lib/ai";
import { getUserPlan } from "@/lib/platform";
import { prisma } from "@/lib/prisma";
import { enforceGenerationLimit } from "@/lib/rate-limit";
import { startupQuestionnaireSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);

  const body = await request.json();
  const parsed = startupQuestionnaireSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Invalid copy generation input.");
  }

  const { plan } = await getUserPlan(session.user.id);
  await enforceGenerationLimit(session.user.id, plan);
  const generatedContent = await generateStartupCopy(parsed.data);

  await prisma.generation.create({
    data: {
      userId: session.user.id,
      type: "COPY_REFRESH",
      input: parsed.data,
      output: generatedContent
    }
  });

  return apiSuccess({ generatedContent });
}
