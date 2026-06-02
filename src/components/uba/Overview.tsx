import { Panel, Pill, StatusDot } from "./Panel";
import { aiInsights, hazards, kpis, milestones, workOrders } from "@/lib/uba-data";
import { Activity, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";

export function Overview() {
  return (
    <div className="space-y-4">
      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-md border border-border bg-card p-4 relative overflow-hidden"
          >
            <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
              {k.label}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-mono-display font-semibold text-foreground">
                {k.value}
              </span>
              <StatusDot tone={k.tone} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{k.delta}</div>
            <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-primary/5 blur-2xl" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI insights */}
        <Panel
          title="AUTONOMOUS SITE SUPERVISOR"
          subtitle="Predictive insights — human approval required"
          className="lg:col-span-2"
          right={
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-mono-display uppercase tracking-wider text-primary">
                ASS v0.9 · advisory
              </span>
            </div>
          }
        >
          <ul className="divide-y divide-border">
            {aiInsights.map((i) => (
              <li key={i.id} className="p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div
                    className={
                      "mt-1 h-2 w-2 rounded-full " +
                      (i.level === "crit"
                        ? "bg-destructive"
                        : i.level === "warn"
                          ? "bg-warning"
                          : "bg-accent")
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono-display text-muted-foreground">
                        {i.id}
                      </span>
                      <Pill
                        tone={i.level === "crit" ? "danger" : i.level === "warn" ? "warn" : "info"}
                      >
                        {i.level === "crit" ? "Critical" : i.level === "warn" ? "Warning" : "Info"}
                      </Pill>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mt-1">{i.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{i.detail}</p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-muted-foreground">
                        Recommends:{" "}
                        <span className="text-foreground">{i.recommend}</span>
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="text-[11px] font-mono-display uppercase tracking-wider px-2.5 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition">
                        Approve action
                      </button>
                      <button className="text-[11px] font-mono-display uppercase tracking-wider px-2.5 py-1 rounded border border-border text-muted-foreground hover:bg-muted transition">
                        Override
                      </button>
                      <button className="text-[11px] font-mono-display uppercase tracking-wider px-2.5 py-1 rounded text-muted-foreground hover:text-foreground transition">
                        View context
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Live hazards */}
        <Panel
          title="LIVE HAZARDS"
          subtitle="Last 24 hours"
          right={<AlertTriangle className="h-3.5 w-3.5 text-destructive" />}
        >
          <ul className="divide-y divide-border">
            {hazards.map((h) => (
              <li key={h.id} className="p-3">
                <div className="flex items-center gap-2">
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
                  <span className="ml-auto text-[10px] text-muted-foreground">{h.time}</span>
                </div>
                <div className="text-sm mt-1">{h.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {h.zone} · {h.reporter} · <span className="text-foreground">{h.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel
          title="MILESTONE VARIANCE"
          subtitle="Schedule vs actual"
          right={<TrendingUp className="h-3.5 w-3.5 text-accent" />}
        >
          <table className="w-full text-sm">
            <thead className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left px-4 py-2">Milestone</th>
                <th className="text-left py-2">Scheduled</th>
                <th className="text-left py-2">Actual</th>
                <th className="text-left py-2">Δ</th>
                <th className="text-right px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {milestones.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5">
                    <div className="text-foreground">{m.name}</div>
                    <div className="text-[10px] font-mono-display text-muted-foreground">
                      {m.id}
                    </div>
                  </td>
                  <td className="py-2.5 text-muted-foreground">{m.scheduled}</td>
                  <td className="py-2.5 text-foreground">{m.actual}</td>
                  <td className="py-2.5 font-mono-display text-xs">{m.variance}</td>
                  <td className="px-4 py-2.5 text-right">
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
                      {m.status}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel
          title="WORK ORDER STATUS"
          subtitle={`${workOrders.length} active orders`}
          right={<Activity className="h-3.5 w-3.5 text-primary" />}
        >
          <div className="p-4 space-y-2">
            {(["In Progress", "Awaiting Inspection", "Defect Raised", "Assigned", "Approved", "Draft"] as const).map(
              (state) => {
                const items = workOrders.filter((w) => w.state === state);
                const pct = (items.length / workOrders.length) * 100;
                return (
                  <div key={state}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{state}</span>
                      <span className="font-mono-display text-foreground">{items.length}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={
                          "h-full transition-all " +
                          (state === "Defect Raised"
                            ? "bg-destructive"
                            : state === "Awaiting Inspection"
                              ? "bg-warning"
                              : state === "Approved"
                                ? "bg-success"
                                : "bg-primary")
                        }
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
