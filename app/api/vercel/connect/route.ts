import { apiSuccess } from "@/lib/api";

export async function GET() {
  return apiSuccess({
    connected: false,
    message: "Placeholder Vercel connection route. Add VERCEL_ACCESS_TOKEN and VERCEL_TEAM_ID to enable live integration.",
    requiredEnv: ["VERCEL_ACCESS_TOKEN", "VERCEL_TEAM_ID", "NEXT_PUBLIC_APP_URL"]
  });
}
