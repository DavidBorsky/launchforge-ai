import { planLimits } from "@/data/plans";
import { prisma } from "@/lib/prisma";

export async function enforceGenerationLimit(userId: string, plan = "FREE") {
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const count = await prisma.generation.count({
    where: {
      userId,
      createdAt: {
        gte: currentMonthStart
      }
    }
  });

  const max = planLimits[plan]?.generations ?? planLimits.FREE.generations;

  if (count >= max) {
    throw new Error(`Generation limit reached for ${plan}.`);
  }

  return {
    used: count,
    remaining: Math.max(max - count, 0),
    limit: max
  };
}
