import { getServerSession } from "next-auth";
import { ProjectStatus } from "@prisma/client";
import { NextRequest } from "next/server";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return apiError("Forbidden.", 403);

  const projects = await prisma.project.findMany({
    include: { user: true },
    orderBy: { updatedAt: "desc" }
  });

  return apiSuccess({ projects });
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return apiError("Forbidden.", 403);

  const body = await request.json();
  if (!body?.id || !body?.status) return apiError("Project id and status are required.");

  const project = await prisma.project.update({
    where: { id: body.id },
    data: { status: body.status as ProjectStatus }
  });

  return apiSuccess({ project });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return apiError("Forbidden.", 403);

  const body = await request.json();
  if (!body?.id) return apiError("Project id is required.");

  await prisma.project.delete({
    where: { id: body.id }
  });

  return apiSuccess({ ok: true });
}
