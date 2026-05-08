import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ensureUserSubscription } from "@/lib/platform";
import { apiError, apiSuccess } from "@/lib/api";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return apiError("Email and password are required.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return apiError("An account with that email already exists.");
  }

  const userCount = await prisma.user.count();
  const user = await prisma.user.create({
    data: {
      name: name || email.split("@")[0],
      email,
      passwordHash: await hash(password, 10),
      role: userCount === 0 ? UserRole.ADMIN : UserRole.USER
    }
  });

  await ensureUserSubscription(user.id);

  return apiSuccess({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
}
