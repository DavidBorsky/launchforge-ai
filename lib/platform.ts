import { ProjectStatus, SubscriptionPlan, SubscriptionStatus } from "@prisma/client";
import { buildMockAnalytics } from "@/data/mock";
import { planLimits } from "@/data/plans";
import { templateSeeds } from "@/data/templates";
import { prisma } from "@/lib/prisma";

export async function ensureTemplateSeeds() {
  const count = await prisma.template.count();
  if (count > 0) return;

  await prisma.template.createMany({
    data: templateSeeds.map((template) => ({
      name: template.name,
      category: template.category,
      description: template.description,
      previewImage: template.previewLabel,
      config: template.config
    }))
  });
}

export async function ensureUserSubscription(userId: string) {
  const existing = await prisma.subscription.findFirst({ where: { userId } });
  if (existing) return existing;

  return prisma.subscription.create({
    data: {
      userId,
      plan: SubscriptionPlan.FREE,
      status: SubscriptionStatus.ACTIVE
    }
  });
}

export async function getUserPlan(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  const plan = subscription?.plan ?? SubscriptionPlan.FREE;

  return {
    subscription,
    plan,
    limits: planLimits[plan]
  };
}

export async function getDashboardSummary(userId: string) {
  await ensureUserSubscription(userId);
  const [projects, generations, exportedProjects, planInfo] = await Promise.all([
    prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" }
    }),
    prisma.generation.count({ where: { userId } }),
    prisma.project.count({
      where: {
        userId,
        status: {
          in: [ProjectStatus.PUBLISHED, ProjectStatus.GENERATED]
        }
      }
    }),
    getUserPlan(userId)
  ]);

  return {
    projects,
    stats: {
      projectCount: projects.length,
      generations,
      exportedProjects,
      currentPlan: planInfo.plan
    },
    planInfo
  };
}

export async function getProjectForUser(projectId: string, userId: string) {
  return prisma.project.findFirst({
    where: { id: projectId, userId }
  });
}

export async function seedAnalyticsEvent(projectId: string) {
  return prisma.analyticsEvent.create({
    data: {
      projectId,
      type: "page_view",
      metadata: buildMockAnalytics(projectId)
    }
  });
}

export async function getAdminSnapshot() {
  const [users, projects, subscriptions, moderation, generations] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.subscription.findMany(),
    prisma.moderationItem.count({
      where: { status: "PENDING" }
    }),
    prisma.generation.count()
  ]);

  const activeSubscriptions = subscriptions.filter((item) => item.status === "ACTIVE");
  const mrr = activeSubscriptions.reduce((total, item) => {
    if (item.plan === "STARTER") return total + 9;
    if (item.plan === "PRO") return total + 29;
    if (item.plan === "AGENCY") return total + 79;
    return total;
  }, 0);

  return {
    users,
    projects,
    subscriptions: activeSubscriptions.length,
    moderation,
    generations,
    mrr
  };
}
