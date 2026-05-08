import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { generateSEO } from "@/lib/ai";
import { startupQuestionnaireSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);

  const body = await request.json();
  const parsed = startupQuestionnaireSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid SEO input.");

  const seo = await generateSEO(parsed.data);
  return apiSuccess({ seo });
}
