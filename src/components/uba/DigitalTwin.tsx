import { Panel, Pill, StatusDot } from "./Panel";
import { workOrders, hazards } from "@/lib/uba-data";

// Simplified digital-twin / site map: SVG floor plan with zones colour-coded
// by activity and overlay markers for active work orders + hazards.

const zones = [
  { id: "tA", label: "Tower A", x: 60, y: 60, w: 200, h: 220 },
  { id: "tB", label: "Tower B", x: 290, y: 60, w: 200, h: 220 },
  { id: "core", label: "Site Core", x: 60, y: 300, w: 430, h: 80 },
  { id: "south", label: "Site South", x: 60, y: 400, w: 200, h: 90 },
  { id: "east", label: "Site East", x: 290, y: 400, w: 200, h: 90 },
];

const markers = [
  { x: 110, y: 130, type: "wo", label: "WO-1041" },
  { x: 200, y: 200, type: "wo", label: "WO-1046" },
  { x: 340, y: 150, type: "wo", label: "WO-1043" },
  { x: 420, y: 200, type: "hz", label: "HZ-218" },
  { x: 150, y: 100, type: "hz", label: "HZ-220" },
  { x: 380, y: 340, type: "wo", label: "WO-1047" },
  { x: 380, y: 440, type: "crane", label: "TC-02" },
  { x: 110, y: 440, type: "hz", label: "HZ-219" },
];

export function DigitalTwin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel
        title="LIVE DIGITAL TWIN"
        subtitle="Site overview · as-built vs plan"
        className="lg:col-span-2"
        right={
          <div className="flex items-center gap-3 text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1"><StatusDot tone="good" /> Active</span>
            <span className="flex items-center gap-1"><StatusDot tone="warn" /> Inspecting</span>
            <span className="flex items-center gap-1"><StatusDot tone="danger" /> Hazard</span>
          </div>
        }
      >
        <div className="relative grid-bg p-2">
          <svg viewBox="0 0 550 520" className="w-full h-auto">
            {/* Zones */}
            {zones.map((z) => (
              <g key={z.id}>
                <rect
                  x={z.x}
                  y={z.y}
                  width={z.w}
                  height={z.h}
                  rx={4}
                  fill="oklch(0.24 0.014 240)"
                  stroke="oklch(0.4 0.02 240)"
                  strokeWidth={1}
                />
                <text
                  x={z.x + 8}
                  y={z.y + 18}
                  fill="oklch(0.7 0.018 240)"
                  fontSize={10}
                  fontFamily="monospace"
                  letterSpacing={1.5}
                >
                  {z.label.toUpperCase()}
                </text>
              </g>
            ))}

            {/* Crane radii */}
            <circle cx={150} cy={170} r={110} fill="oklch(0.82 0.17 85 / 0.06)" stroke="oklch(0.82 0.17 85 / 0.3)" strokeDasharray="2 4" />
            <circle cx={390} cy={170} r={110} fill="oklch(0.65 0.18 220 / 0.06)" stroke="oklch(0.65 0.18 220 / 0.3)" strokeDasharray="2 4" />

            {/* Markers */}
            {markers.map((m, i) => {
              const colour =
                m.type === "hz"
                  ? "oklch(0.62 0.22 27)"
                  : m.type === "crane"
                    ? "oklch(0.65 0.18 220)"
                    : "oklch(0.82 0.17 85)";
              return (
                <g key={i}>
                  <circle cx={m.x} cy={m.y} r={10} fill={colour} opacity={0.2}>
                    <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={m.x} cy={m.y} r={4} fill={colour} />
                  <text
                    x={m.x + 8}
                    y={m.y + 3}
                    fill="oklch(0.96 0.005 240)"
                    fontSize={9}
                    fontFamily="monospace"
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-0 scanline pointer-events-none" />
        </div>
      </Panel>

      <div className="space-y-4">
        <Panel title="LIVE FEED" subtitle="Sensor + check-ins">
          <ul className="divide-y divide-border text-xs">
            {[
              { t: "14:02:11", m: "428 workers on site (peak)", tone: "neutral" as const },
              { t: "14:01:48", m: "CP-07 hydraulic pressure → fault", tone: "danger" as const },
              { t: "13:59:02", m: "WO-1042 marked Awaiting Inspection", tone: "warn" as const },
              { t: "13:54:30", m: "TC-02 lift completed (8.2t)", tone: "good" as const },
              { t: "13:51:15", m: "Wind 22 km/h NW", tone: "neutral" as const },
              { t: "13:48:00", m: "HZ-218 reported (Tower B / L03)", tone: "danger" as const },
            ].map((e, i) => (
              <li key={i} className="px-4 py-2 flex items-start gap-2">
                <StatusDot tone={e.tone} />
                <div className="flex-1">
                  <div className="text-foreground">{e.m}</div>
                  <div className="text-[10px] font-mono-display text-muted-foreground">{e.t}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="ZONE ACTIVITY" subtitle="Now">
          <div className="p-4 space-y-2.5">
            {zones.map((z) => {
              const wos = workOrders.filter((w) => w.zone.includes(z.label.split(" ")[1] ?? z.label));
              const hzs = hazards.filter((h) => h.zone.includes(z.label.split(" ")[1] ?? z.label));
              return (
                <div key={z.id} className="flex items-center gap-2 text-xs">
                  <span className="font-mono-display text-muted-foreground w-24 truncate">
                    {z.label}
                  </span>
                  <div className="flex-1 flex items-center gap-1.5">
                    {wos.length > 0 && <Pill tone="info">{wos.length} WO</Pill>}
                    {hzs.length > 0 && <Pill tone="danger">{hzs.length} HZ</Pill>}
                    {wos.length === 0 && hzs.length === 0 && (
                      <span className="text-muted-foreground text-[11px]">— quiet —</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
