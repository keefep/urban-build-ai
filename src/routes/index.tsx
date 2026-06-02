import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HardHat, Wifi, ShieldCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UrbanBuild AI — Sign in" },
      {
        name: "description",
        content:
          "Sign in to the UrbanBuild AI Site Command Centre — digital twin and predictive orchestration for Tier-1 Australian construction.",
      },
    ],
  }),
  component: Login,
});

type RoleKey = "pm" | "supervisor" | "subcontractor" | "inspector";

const roleCards: {
  key: RoleKey;
  to: "/pm" | "/supervisor" | "/subcontractor" | "/inspector";
  label: string;
  org: string;
  user: string;
  tagline: string;
}[] = [
  {
    key: "pm",
    to: "/pm",
    label: "Project Manager",
    org: "UrbanBuild · HQ",
    user: "S. Miller",
    tagline: "Programme, cost & risk oversight",
  },
  {
    key: "supervisor",
    to: "/supervisor",
    label: "Site Supervisor",
    org: "Marina Tower · Docklands",
    user: "K. Zhang",
    tagline: "Daily orchestration & safety on deck",
  },
  {
    key: "subcontractor",
    to: "/subcontractor",
    label: "Subcontractor Lead",
    org: "Apex Concrete Co.",
    user: "M. Okafor",
    tagline: "Crew work orders & defect response",
  },
  {
    key: "inspector",
    to: "/inspector",
    label: "Govt Inspector",
    org: "VBA · Victoria",
    user: "R. Lawson",
    tagline: "Compliance, sign-off & audit trail",
  },
];

function Login() {
  const [selected, setSelected] = useState<RoleKey>("pm");
  const active = roleCards.find((r) => r.key === selected)!;

  return (
    <div className="min-h-screen bg-background text-foreground grid lg:grid-cols-2 relative overflow-hidden">
      {/* left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 border-r border-border bg-card/30">
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-warning/10 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-primary flex items-center justify-center glow-primary">
            <HardHat className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-base font-semibold font-mono-display tracking-tight">
              URBANBUILD<span className="text-primary">.AI</span>
            </div>
            <div className="text-[10px] font-mono-display uppercase tracking-[0.22em] text-muted-foreground">
              Site Command · v1.4
            </div>
          </div>
        </div>

        <div className="relative max-w-md space-y-5">
          <div className="text-[10px] font-mono-display uppercase tracking-[0.22em] text-primary">
            // Tier-1 Construction Operating System
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05]">
            Predict the site.
            <br />
            <span className="text-primary">Protect</span> the people.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            UrbanBuild AI fuses live IoT, digital-twin geometry and a human-in-the-loop
            Autonomous Site Supervisor to keep subcontractors, plant and inspections in
            sync — without surrendering authority to the algorithm.
          </p>
          <ul className="space-y-2 text-sm text-foreground/90">
            {[
              "Real-time hazard triage with cordoning workflow",
              "Defect-to-payment linkage across every trade",
              "Sovereign AU-East data residency · audit-grade logs",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-4 text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
          <span className="flex items-center gap-1.5 text-success">
            <Wifi className="h-3 w-3" /> AU-East · sovereign
          </span>
          <span>·</span>
          <span>ISO 27001 · NCC 2026</span>
        </div>
      </div>

      {/* right login panel */}
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="h-9 w-9 rounded bg-primary flex items-center justify-center">
              <HardHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold font-mono-display">
                URBANBUILD<span className="text-primary">.AI</span>
              </div>
              <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
                Site Command
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono-display uppercase tracking-[0.22em] text-muted-foreground">
            Step 01 / Identify
          </div>
          <h2 className="text-2xl font-semibold mt-2">Sign in to your console</h2>
          <p className="text-sm text-muted-foreground mt-1.5">
            Choose your role. Each console is scoped to the modules and approvals you
            need for the Marina Tower project.
          </p>

          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
                Site ID / Email
              </label>
              <input
                defaultValue={`${active.user.toLowerCase().replace(/[^a-z]/g, "")}@urbanbuild.ai`}
                className="mt-1.5 w-full px-3 py-2.5 rounded border border-border bg-card text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground">
                Passphrase · MFA token
              </label>
              <input
                type="password"
                defaultValue="••••••••••"
                className="mt-1.5 w-full px-3 py-2.5 rounded border border-border bg-card text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2">
              <div className="text-[10px] font-mono-display uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Role · select console
              </div>
              <div className="grid grid-cols-1 gap-2">
                {roleCards.map((r) => {
                  const isSel = selected === r.key;
                  return (
                    <button
                      type="button"
                      key={r.key}
                      onClick={() => setSelected(r.key)}
                      className={cn(
                        "text-left rounded border px-3 py-2.5 transition-all flex items-center gap-3",
                        isSel
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:bg-muted/50",
                      )}
                    >
                      <div
                        className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center text-[10px] font-mono-display font-bold",
                          isSel
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground",
                        )}
                      >
                        {r.user
                          .split(/[\s.]+/)
                          .map((s) => s[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{r.label}</div>
                        <div className="text-[11px] text-muted-foreground truncate">
                          {r.user} · {r.org}
                        </div>
                      </div>
                      <div
                        className={cn(
                          "h-4 w-4 rounded-full border flex items-center justify-center",
                          isSel ? "border-primary" : "border-border",
                        )}
                      >
                        {isSel && <div className="h-2 w-2 rounded-full bg-primary" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              to={active.to}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition glow-primary"
            >
              Enter as {active.label}
              <ChevronRight className="h-4 w-4" />
            </Link>

            <div className="flex items-center justify-between pt-3 text-[11px] text-muted-foreground">
              <span>Need access? Contact your site admin.</span>
              <span className="font-mono-display">v1.4.2-au</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
