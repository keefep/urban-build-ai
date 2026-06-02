import { useMemo, useState } from "react";
import { Panel, Pill } from "./Panel";
import {
  stateOrder,
  stateTransitions,
  workOrders as initialOrders,
  type WorkOrder,
  type WorkOrderState,
} from "@/lib/uba-data";
import { ArrowRight, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const stateTone: Record<WorkOrderState, "good" | "warn" | "danger" | "neutral" | "info"> = {
  Draft: "neutral",
  Assigned: "info",
  "In Progress": "info",
  "Awaiting Inspection": "warn",
  Approved: "good",
  "Defect Raised": "danger",
  Closed: "neutral",
};

export function WorkOrders() {
  const [orders, setOrders] = useState<WorkOrder[]>(initialOrders);
  const [selectedId, setSelectedId] = useState<string>(initialOrders[0].id);
  const selected = useMemo(
    () => orders.find((o) => o.id === selectedId)!,
    [orders, selectedId],
  );

  const transition = (to: WorkOrderState) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedId
          ? {
              ...o,
              state: to,
              progress: to === "Approved" || to === "Closed" ? 100 : o.progress,
            }
          : o,
      ),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel
        title="WORK ORDER LEDGER"
        subtitle="Living source of truth"
        className="lg:col-span-2"
      >
        <table className="w-full text-sm">
          <thead className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left py-2">Title</th>
              <th className="text-left py-2">Zone</th>
              <th className="text-left py-2">State</th>
              <th className="text-left py-2">Risk</th>
              <th className="text-right px-4 py-2">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr
                key={o.id}
                onClick={() => setSelectedId(o.id)}
                className={cn(
                  "cursor-pointer hover:bg-muted/40 transition",
                  selectedId === o.id && "bg-primary/5 border-l-2 border-l-primary",
                )}
              >
                <td className="px-4 py-2.5 font-mono-display text-xs text-muted-foreground">
                  {o.id}
                </td>
                <td className="py-2.5">
                  <div className="text-foreground">{o.title}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {o.trade} · {o.assignee}
                  </div>
                </td>
                <td className="py-2.5 text-xs text-muted-foreground">{o.zone}</td>
                <td className="py-2.5">
                  <Pill tone={stateTone[o.state]}>{o.state}</Pill>
                </td>
                <td className="py-2.5">
                  <Pill
                    tone={o.aiRisk === "high" ? "danger" : o.aiRisk === "med" ? "warn" : "good"}
                  >
                    {o.aiRisk}
                  </Pill>
                </td>
                <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">{o.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <div className="space-y-4">
        <Panel
          title="STATE MACHINE"
          subtitle={selected.id}
          right={<GitBranch className="h-3.5 w-3.5 text-primary" />}
        >
          <div className="p-4 space-y-3">
            <div>
              <div className="text-xs text-muted-foreground">{selected.title}</div>
              <div className="text-[11px] font-mono-display text-muted-foreground mt-0.5">
                {selected.zone} · {selected.assignee}
              </div>
            </div>

            <div className="space-y-1.5">
              {stateOrder.map((s) => {
                const active = s === selected.state;
                const idxCur = stateOrder.indexOf(selected.state);
                const idxThis = stateOrder.indexOf(s);
                const passed = idxThis < idxCur && selected.state !== "Defect Raised";
                return (
                  <div
                    key={s}
                    className={cn(
                      "flex items-center gap-3 px-2.5 py-1.5 rounded border text-xs",
                      active
                        ? "border-primary bg-primary/10 text-primary glow-primary"
                        : passed
                          ? "border-success/30 bg-success/5 text-muted-foreground"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        active ? "bg-primary" : passed ? "bg-success" : "bg-muted-foreground/40",
                      )}
                    />
                    <span className="font-mono-display uppercase tracking-wider">{s}</span>
                    {active && (
                      <span className="ml-auto text-[10px] text-primary">● current</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border">
              <div className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground mb-2">
                Allowed transitions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stateTransitions[selected.state].length === 0 && (
                  <span className="text-xs text-muted-foreground">— terminal —</span>
                )}
                {stateTransitions[selected.state].map((t) => (
                  <button
                    key={t}
                    onClick={() => transition(t)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono-display uppercase tracking-wider px-2 py-1 rounded bg-primary/90 hover:bg-primary text-primary-foreground transition"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="PROGRESS" subtitle={`${selected.progress}% complete`}>
          <div className="p-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-warning"
                style={{ width: `${selected.progress}%` }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                  Trade
                </div>
                <div className="text-foreground">{selected.trade}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                  Due
                </div>
                <div className="text-foreground">{selected.due}</div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
