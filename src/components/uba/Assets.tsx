import { Panel, Pill, StatusDot } from "./Panel";
import { assets } from "@/lib/uba-data";
import { Fuel, Wrench } from "lucide-react";

export function Assets() {
  const totalUtil =
    assets.reduce((s, a) => s + a.utilisation, 0) / assets.length;

  return (
    <div className="space-y-4">
      <Panel
        title="ASSET LEDGER"
        subtitle="Living asset registry · IoT telemetry"
        right={
          <span className="text-[11px] font-mono-display text-muted-foreground">
            Fleet utilisation{" "}
            <span className="text-primary">{totalUtil.toFixed(0)}%</span>
          </span>
        }
      >
        <table className="w-full text-sm">
          <thead className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr>
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left py-2">Asset</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Utilisation</th>
              <th className="text-left py-2">Engine hrs</th>
              <th className="text-right px-4 py-2">Next service</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {assets.map((a) => {
              const tone =
                a.status === "Fault"
                  ? "danger"
                  : a.status === "Maintenance"
                    ? "warn"
                    : a.status === "Active"
                      ? "good"
                      : "neutral";
              return (
                <tr key={a.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5 font-mono-display text-xs text-muted-foreground">
                    {a.id}
                  </td>
                  <td className="py-2.5">
                    <div className="text-foreground">{a.name}</div>
                    <div className="text-[11px] text-muted-foreground">{a.type}</div>
                  </td>
                  <td className="py-2.5">
                    <span className="inline-flex items-center gap-2">
                      <StatusDot tone={tone} />
                      <Pill tone={tone}>{a.status}</Pill>
                    </span>
                  </td>
                  <td className="py-2.5 w-48">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className={
                            "h-full " +
                            (a.utilisation > 85
                              ? "bg-destructive"
                              : a.utilisation > 60
                                ? "bg-warning"
                                : "bg-primary")
                          }
                          style={{ width: `${a.utilisation}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono-display text-muted-foreground w-8 text-right">
                        {a.utilisation}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Fuel className="h-3 w-3" /> {a.engineHrs.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Wrench className="h-3 w-3" />
                      <span
                        className={
                          a.nextService === "URGENT"
                            ? "text-destructive font-mono-display"
                            : ""
                        }
                      >
                        {a.nextService}
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
