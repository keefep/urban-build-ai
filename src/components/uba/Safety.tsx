import { useState } from "react";
import { Panel, Pill } from "./Panel";
import { hazards as seed, type Hazard } from "@/lib/uba-data";
import { Camera, MapPin, Send, ShieldAlert } from "lucide-react";

export function Safety() {
  const [list, setList] = useState<Hazard[]>(seed);
  const [title, setTitle] = useState("");
  const [zone, setZone] = useState("Tower A / L11");
  const [sev, setSev] = useState<Hazard["severity"]>("Medium");

  const submit = () => {
    if (!title.trim()) return;
    setList((p) => [
      {
        id: `HZ-${220 + p.length + 1}`,
        title,
        zone,
        reporter: "You",
        severity: sev,
        status: "Open",
        time: "now",
      },
      ...p,
    ]);
    setTitle("");
  };

  const advance = (id: string, status: Hazard["status"]) => {
    setList((p) => p.map((h) => (h.id === id ? { ...h, status } : h)));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel
        title="HAZARD LIFECYCLE"
        subtitle="Open → Triaged → Cordoned → Resolved"
        className="lg:col-span-2"
      >
        <ul className="divide-y divide-border">
          {list.map((h) => (
            <li key={h.id} className="p-4 hover:bg-muted/30">
              <div className="flex items-start gap-3">
                <ShieldAlert
                  className={
                    "h-4 w-4 mt-0.5 " +
                    (h.severity === "Critical" || h.severity === "High"
                      ? "text-destructive"
                      : h.severity === "Medium"
                        ? "text-warning"
                        : "text-muted-foreground")
                  }
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono-display text-muted-foreground">
                      {h.id}
                    </span>
                    <Pill
                      tone={
                        h.severity === "Critical" || h.severity === "High"
                          ? "danger"
                          : h.severity === "Medium"
                            ? "warn"
                            : "neutral"
                      }
                    >
                      {h.severity}
                    </Pill>
                    <Pill tone={h.status === "Resolved" ? "good" : "info"}>{h.status}</Pill>
                    <span className="ml-auto text-[10px] text-muted-foreground">{h.time}</span>
                  </div>
                  <div className="text-sm mt-1">{h.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {h.zone} · reported by {h.reporter}
                  </div>
                  {h.status !== "Resolved" && (
                    <div className="mt-2 flex gap-1.5">
                      {(["Triaged", "Cordoned", "Resolved"] as const)
                        .filter((s) => s !== h.status)
                        .map((s) => (
                          <button
                            key={s}
                            onClick={() => advance(h.id, s)}
                            className="text-[10px] font-mono-display uppercase tracking-wider px-2 py-0.5 rounded border border-border hover:bg-muted text-muted-foreground hover:text-foreground"
                          >
                            → {s}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="REPORT HAZARD" subtitle="Geo-tagged · auto-routed">
        <div className="p-4 space-y-3">
          <div>
            <label className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground">
              Description
            </label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exposed live wiring near east stairwell"
              className="mt-1 w-full bg-input border border-border rounded px-2.5 py-2 text-sm focus:outline-none focus:border-primary resize-none h-20"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground">
              Zone
            </label>
            <input
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="mt-1 w-full bg-input border border-border rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground">
              Severity
            </label>
            <div className="mt-1 grid grid-cols-4 gap-1">
              {(["Low", "Medium", "High", "Critical"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSev(s)}
                  className={
                    "text-[11px] font-mono-display uppercase tracking-wider px-2 py-1.5 rounded border " +
                    (sev === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full text-xs font-mono-display uppercase tracking-wider px-2 py-2 rounded border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary flex items-center justify-center gap-2">
            <Camera className="h-3.5 w-3.5" /> Attach geo-tagged photo
          </button>
          <button
            onClick={submit}
            className="w-full text-xs font-mono-display uppercase tracking-wider px-2 py-2.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 glow-primary"
          >
            <Send className="h-3.5 w-3.5" /> Submit hazard
          </button>
        </div>
      </Panel>
    </div>
  );
}
