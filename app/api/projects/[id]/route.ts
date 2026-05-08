import { getServerSession } from "next-auth";
import { Prisma, ProjectStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { projectPatchSchema } from "@/lib/validations";

async function getOwnedProject(id: string, userId: string) {
  return prisma.project.findFirst({
    where: { id, userId }
  });
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);
  const { id } = await context.params;
  const project = await getOwnedProject(id, session.user.id);
  if (!project) return apiError("Project not found.", 404);

  return apiSuccess({ project });
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);
  const { id } = await context.params;
  const project = await getOwnedProject(id, session.user.id);
  if (!project) return apiError("Project not found.", 404);

  const body = await request.json();
  const parsed = projectPatchSchema.safeParse(body);
  if (!parsed.success) return apiError("Invalid project update.");

  const data: Prisma.ProjectUpdateInput = {
    ...(parsed.data.name ? { name: parsed.data.name } : {}),
    ...(parsed.data.status ? { status: parsed.data.status as ProjectStatus } : {}),
    ...(parsed.data.generatedContent !== undefined
      ? { generatedContent: parsed.data.generatedContent as Prisma.InputJsonValue }
      : {}),
    ...(parsed.data.branding !== undefined
      ? { branding: parsed.data.branding as Prisma.InputJsonValue }
      : {}),
    ...(parsed.data.seo !== undefined ? { seo: parsed.data.seo as Prisma.InputJsonValue } : {}),
    ...(parsed.data.analytics !== undefined
      ? { analytics: parsed.data.analytics as Prisma.InputJsonValue }
      : {})
  };

  const updated = await prisma.project.update({
    where: { id },
    data
  });

  return apiSuccess({ project: updated });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return apiError("Unauthorized.", 401);
  const { id } = await context.params;
  const project = await getOwnedProject(id, session.user.id);
  if (!project) return apiError("Project not found.", 404);

  await prisma.project.delete({
    where: { id }
  });

  return apiSuccess({ ok: true });
}
