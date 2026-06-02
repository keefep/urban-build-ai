import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/uba/Shell";

export const Route = createFileRoute("/subcontractor")({
  head: () => ({
    meta: [
      { title: "Subcontractor — UrbanBuild AI" },
      {
        name: "description",
        content:
          "Crew work orders, defect response and hazard reporting for subcontractor leads.",
      },
    ],
  }),
  component: () => (
    <Shell
      role="Site Worker"
      roleTagline="Crew · Apex Concrete"
      modules={["work", "safety", "twin"]}
    />
  ),
});
