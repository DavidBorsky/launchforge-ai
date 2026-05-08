import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildProjectZip } from "@/lib/export";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: session.user.id
    }
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const buffer = await buildProjectZip({
    name: project.name,
    branding: project.branding as any,
    generatedContent: project.generatedContent as any,
    seo: project.seo as any
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${project.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-launch-kit.zip"`
    }
  });
}
