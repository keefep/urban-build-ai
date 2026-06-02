import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/uba/Shell";

export const Route = createFileRoute("/supervisor")({
  head: () => ({
    meta: [
      { title: "Site Supervisor — UrbanBuild AI" },
      {
        name: "description",
        content:
          "Daily orchestration, crew safety and plant logistics for the on-deck Site Supervisor.",
      },
    ],
  }),
  component: () => (
    <Shell
      role="Site Supervisor"
      roleTagline="On-deck command"
      modules={["overview", "twin", "work", "safety", "assets"]}
    />
  ),
});
