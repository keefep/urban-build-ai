import { useState, type ComponentType, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  ClipboardList,
  HardHat,
  LayoutGrid,
  LogOut,
  Map,
  ShieldAlert,
  Stamp,
  Wifi,
} from "lucide-react";
import { Overview } from "@/components/uba/Overview";
import { WorkOrders } from "@/components/uba/WorkOrders";
import { Safety } from "@/components/uba/Safety";
import { Assets } from "@/components/uba/Assets";
import { DigitalTwin } from "@/components/uba/DigitalTwin";
import { Inspections } from "@/components/uba/Inspections";
import type { Role } from "@/lib/uba-data";
import { cn } from "@/lib/utils";

export type ModuleId =
  | "overview"
  | "work"
  | "twin"
  | "safety"
  | "assets"
  | "inspections";

const moduleRegistry: Record<
  ModuleId,
  { label: string; icon: ComponentType<{ className?: string }>; render: () => ReactNode }
> = {
  overview: { label: "Overview", icon: LayoutGrid, render: () => <Overview /> },
  work: { label: "Work Orders", icon: ClipboardList, render: () => <WorkOrders /> },
  twin: { label: "Digital Twin", icon: Map, render: () => <DigitalTwin /> },
  safety: { label: "Safety", icon: ShieldAlert, render: () => <Safety /> },
  assets: { label: "Asset Ledger", icon: Boxes, render: () => <Assets /> },
  inspections: { label: "Inspections", icon: Stamp, render: () => <Inspections /> },
};

export function Shell({
  role,
  modules,
  roleTagline,
}: {
  role: Role;
  modules: ModuleId[];
  roleTagline: string;
}) {
  const [active, setActive] = useState<ModuleId>(modules[0]);
  const navigate = useNavigate();
  const Current = moduleRegistry[active];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="hidden md:flex w-60 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="px-4 py-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded bg-primary flex items-center justify-center glow-primary">
              <HardHat className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold font-mono-display tracking-tight">
                URBANBUILD<span className="text-primary">.AI</span>
              </div>
              <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
                Site Command
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {modules.map((id) => {
            const m = moduleRegistry[id];
            const Icon = m.icon;
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary border-l-2 border-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border space-y-2">
          <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
            Project
          </div>
          <div className="text-sm">Marina Tower · Docklands</div>
          <div className="text-[11px] font-mono-display text-muted-foreground">
            JOB-2026-118 · L0 / L23
          </div>
          <div className="flex items-center gap-1.5 pt-2 text-[10px] font-mono-display uppercase tracking-wider text-success">
            <Wifi className="h-3 w-3" /> AU-East · sovereign
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur flex items-center px-4 md:px-6 gap-4">
          <div className="md:hidden flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
              <HardHat className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-mono-display font-semibold">UBA</span>
          </div>

          <div className="hidden md:block">
            <h1 className="text-sm font-medium capitalize">{Current.label}</h1>
            <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
              Live · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} AEST
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border bg-card text-xs">
              <Activity className="h-3 w-3 text-success" />
              <span className="font-mono-display text-muted-foreground">428 on-site</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-card text-sm">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center text-[10px] font-mono-display font-bold text-primary-foreground">
                {role.split(" ").map((s) => s[0]).join("").slice(0, 2)}
              </div>
              <div className="hidden sm:block leading-tight">
                <div>{role}</div>
                <div className="text-[10px] font-mono-display text-muted-foreground uppercase tracking-wider">
                  {roleTagline}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate({ to: "/" })}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border bg-card hover:bg-muted text-xs"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <div className="md:hidden border-b border-border bg-card overflow-x-auto">
          <div className="flex gap-1 p-2 min-w-max">
            {modules.map((id) => {
              const m = moduleRegistry[id];
              const Icon = m.icon;
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs whitespace-nowrap",
                    isActive ? "bg-primary/15 text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-auto">{Current.render()}</div>
      </main>
    </div>
  );
}
