import { Panel, Pill } from "./Panel";
import { milestones } from "@/lib/uba-data";
import { FileCheck2, ScrollText, Stamp } from "lucide-react";

export function Inspections() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel
        title="INSPECTION QUEUE"
        subtitle="Digital compliance packets"
        className="lg:col-span-2"
        right={<FileCheck2 className="h-3.5 w-3.5 text-accent" />}
      >
        <ul className="divide-y divide-border">
          {[
            {
              id: "INSP-77",
              wo: "WO-1042",
              title: "Curtain wall mullion install · L09",
              inspector: "VBA — D. Mehta",
              docs: ["BIM snapshot v3.2", "Torque test report", "12 geo-photos"],
              status: "Awaiting review",
              tone: "warn" as const,
            },
            {
              id: "INSP-76",
              wo: "WO-1041",
              title: "L14 slab pour · west bay",
              inspector: "Private — R. Singh",
              docs: ["Concrete test 32MPa", "Rebar inspection", "Pour log"],
              status: "Scheduled 16:30",
              tone: "info" as const,
            },
            {
              id: "INSP-75",
              wo: "WO-1046",
              title: "Fire stair handrails L1-L5",
              inspector: "VBA — D. Mehta",
              docs: ["AS 1657 cert", "8 geo-photos", "Load test report"],
              status: "Approved",
              tone: "good" as const,
            },
            {
              id: "INSP-74",
              wo: "WO-1044",
              title: "Hydraulic riser pressure test",
              inspector: "Hydraulic Consult",
              docs: ["Pressure log", "Defect note 22"],
              status: "Defect — payment hold",
              tone: "danger" as const,
            },
          ].map((i) => (
            <li key={i.id} className="p-4 hover:bg-muted/30">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-display text-muted-foreground">
                      {i.id}
                    </span>
                    <span className="text-[10px] font-mono-display text-accent">{i.wo}</span>
                  </div>
                  <div className="text-sm mt-1">{i.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Inspector · {i.inspector}
                  </div>
                </div>
                <Pill tone={i.tone}>{i.status}</Pill>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {i.docs.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1 text-[10px] font-mono-display uppercase tracking-wider px-2 py-1 rounded bg-muted text-muted-foreground border border-border"
                  >
                    <ScrollText className="h-3 w-3" /> {d}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel
        title="MILESTONE GATE"
        subtitle="Stage cannot proceed without sign-off"
        right={<Stamp className="h-3.5 w-3.5 text-primary" />}
      >
        <ul className="divide-y divide-border">
          {milestones.map((m) => (
            <li key={m.id} className="p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-sm truncate">{m.name}</div>
                  <div className="text-[10px] font-mono-display text-muted-foreground">
                    {m.id} · {m.scheduled} → {m.actual}
                  </div>
                </div>
                <Pill
                  tone={
                    m.status === "Complete"
                      ? "good"
                      : m.status === "On Track"
                        ? "info"
                        : m.status === "At Risk"
                          ? "warn"
                          : "danger"
                  }
                >
                  {m.variance}
                </Pill>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
