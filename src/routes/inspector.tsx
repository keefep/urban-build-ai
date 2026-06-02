import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/uba/Shell";

export const Route = createFileRoute("/inspector")({
  head: () => ({
    meta: [
      { title: "Govt Inspector — UrbanBuild AI" },
      {
        name: "description",
        content:
          "Compliance sign-off, defect audit trail and inspection packets for Australian building regulators.",
      },
    ],
  }),
  component: () => (
    <Shell
      role="Govt Inspector"
      roleTagline="VBA · read & sign-off"
      modules={["inspections", "safety", "work", "twin"]}
    />
  ),
});
