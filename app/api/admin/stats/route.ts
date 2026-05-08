import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { apiError, apiSuccess } from "@/lib/api";
import { getAdminSnapshot } from "@/lib/platform";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "ADMIN") return apiError("Forbidden.", 403);

  const stats = await getAdminSnapshot();
  return apiSuccess({ stats });
}
