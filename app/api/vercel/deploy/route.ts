import { apiSuccess } from "@/lib/api";

export async function GET() {
  return apiSuccess({
    deployed: false,
    message: "Placeholder Vercel deploy route. Wire this to the Vercel Projects API when live credentials are available.",
    steps: [
      "Create a Vercel project",
      "Upload the generated package or connect the Git repository",
      "Configure environment variables",
      "Trigger deployment"
    ]
  });
}
