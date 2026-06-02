import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Boxes,
  ChevronDown,
  ClipboardList,
  HardHat,
  LayoutGrid,
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
import { roles, type Role } from "@/lib/uba-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UrbanBuild AI — Site Command Centre" },
      {
        name: "description",
        content:
          "Predictive site orchestration, digital twin, and safety lifecycle management for Tier-1 Australian construction.",
      },
    ],
  }),
  component: Index,
});

type ModuleId =
  | "overview"
  | "work"
  | "twin"
  | "safety"
  | "assets"
  | "inspections";

const modules: { id: ModuleId; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "work", label: "Work Orders", icon: ClipboardList },
  { id: "twin", label: "Digital Twin", icon: Map },
  { id: "safety", label: "Safety", icon: ShieldAlert },
  { id: "assets", label: "Asset Ledger", icon: Boxes },
  { id: "inspections", label: "Inspections", icon: Stamp },
];

function Index() {
  const [active, setActive] = useState<ModuleId>("overview");
  const [role, setRole] = useState<Role>("Project Manager");
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="px-4 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded bg-primary flex items-center justify-center glow-primary">
              <HardHat className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold font-mono-display tracking-tight">
                URBANBUILD
                <span className="text-primary">.AI</span>
              </div>
              <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
                Site Command
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
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

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur flex items-center px-4 md:px-6 gap-4">
          <div className="md:hidden flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
              <HardHat className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-mono-display font-semibold">UBA</span>
          </div>

          <div className="hidden md:block">
            <h1 className="text-sm font-medium capitalize">
              {modules.find((m) => m.id === active)?.label}
            </h1>
            <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
              Live · {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
              AEST
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-border bg-card text-xs">
              <Activity className="h-3 w-3 text-success" />
              <span className="font-mono-display text-muted-foreground">428 on-site</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setRoleOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-card hover:bg-muted text-sm"
              >
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center text-[10px] font-mono-display font-bold text-primary-foreground">
                  {role
                    .split(" ")
                    .map((s) => s[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <span className="hidden sm:inline">{role}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              {roleOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-56 rounded border border-border bg-popover shadow-xl z-20"
                  onMouseLeave={() => setRoleOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-border">
                    <div className="text-[10px] font-mono-display uppercase tracking-wider text-muted-foreground">
                      Switch role
                    </div>
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setRoleOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-sm hover:bg-muted",
                        r === role && "text-primary",
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden border-b border-border bg-card overflow-x-auto">
          <div className="flex gap-1 p-2 min-w-max">
            {modules.map((m) => {
              const Icon = m.icon;
              const isActive = active === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActive(m.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs whitespace-nowrap",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {active === "overview" && <Overview />}
          {active === "work" && <WorkOrders />}
          {active === "twin" && <DigitalTwin />}
          {active === "safety" && <Safety />}
          {active === "assets" && <Assets />}
          {active === "inspections" && <Inspections />}
        </div>
      </main>
    </div>
  );
}
