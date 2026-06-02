import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/uba/Shell";

export const Route = createFileRoute("/pm")({
  head: () => ({
    meta: [
      { title: "Project Manager — UrbanBuild AI" },
      {
        name: "description",
        content:
          "Programme, cost and risk oversight for Tier-1 construction projects across UrbanBuild AI.",
      },
    ],
  }),
  component: () => (
    <Shell
      role="Project Manager"
      roleTagline="Programme oversight"
      modules={["overview", "work", "twin", "inspections", "assets", "safety"]}
    />
  ),
});
