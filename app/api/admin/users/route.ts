import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return apiError("Forbidden.", 403);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return apiSuccess({ users });
}
