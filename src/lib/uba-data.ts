// Mock data for the UrbanBuild AI prototype

export type Role =
  | "Project Manager"
  | "Site Supervisor"
  | "Site Worker"
  | "Safety Officer"
  | "Logistics Coordinator"
  | "Govt Inspector";

export const roles: Role[] = [
  "Project Manager",
  "Site Supervisor",
  "Site Worker",
  "Safety Officer",
  "Logistics Coordinator",
  "Govt Inspector",
];

export type WorkOrderState =
  | "Draft"
  | "Assigned"
  | "In Progress"
  | "Awaiting Inspection"
  | "Approved"
  | "Defect Raised"
  | "Closed";

export interface WorkOrder {
  id: string;
  title: string;
  zone: string;
  trade: string;
  assignee: string;
  state: WorkOrderState;
  progress: number;
  due: string;
  aiRisk: "low" | "med" | "high";
}

export const workOrders: WorkOrder[] = [
  { id: "WO-1041", title: "Level 14 — Slab pour, west bay", zone: "Tower A / L14", trade: "Concrete", assignee: "Apex Concrete Co.", state: "In Progress", progress: 62, due: "Today 16:00", aiRisk: "med" },
  { id: "WO-1042", title: "Curtain wall mullion install", zone: "Tower A / L09", trade: "Facade", assignee: "Glassline Pty", state: "Awaiting Inspection", progress: 100, due: "Yesterday", aiRisk: "low" },
  { id: "WO-1043", title: "Electrical rough-in, east wing", zone: "Tower B / L03", trade: "Electrical", assignee: "Voltcraft", state: "Assigned", progress: 0, due: "Tomorrow 09:00", aiRisk: "low" },
  { id: "WO-1044", title: "Hydraulic riser pressure test", zone: "Tower B / Core", trade: "Plumbing", assignee: "FlowWorks", state: "Defect Raised", progress: 85, due: "Overdue 2d", aiRisk: "high" },
  { id: "WO-1045", title: "Tower crane TC-02 dismantle prep", zone: "Site East", trade: "Rigging", assignee: "Liftco Rigging", state: "Draft", progress: 0, due: "Fri 07:00", aiRisk: "med" },
  { id: "WO-1046", title: "Fire stair handrails — L1-L5", zone: "Tower A / Core", trade: "Steel", assignee: "Ironforge", state: "Approved", progress: 100, due: "Done", aiRisk: "low" },
  { id: "WO-1047", title: "Confined space — pump room fit-out", zone: "Basement L2", trade: "Mechanical", assignee: "MechPro", state: "In Progress", progress: 34, due: "Thu 14:00", aiRisk: "high" },
];

export const stateOrder: WorkOrderState[] = [
  "Draft", "Assigned", "In Progress", "Awaiting Inspection", "Approved", "Defect Raised", "Closed",
];

export const stateTransitions: Record<WorkOrderState, WorkOrderState[]> = {
  Draft: ["Assigned"],
  Assigned: ["In Progress", "Draft"],
  "In Progress": ["Awaiting Inspection"],
  "Awaiting Inspection": ["Approved", "Defect Raised"],
  "Defect Raised": ["In Progress"],
  Approved: ["Closed"],
  Closed: [],
};

export interface Hazard {
  id: string;
  title: string;
  zone: string;
  reporter: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "Triaged" | "Cordoned" | "Resolved";
  time: string;
}

export const hazards: Hazard[] = [
  { id: "HZ-220", title: "Loose scaffold plank, north face L11", zone: "Tower A / L11", reporter: "M. Okafor", severity: "High", status: "Cordoned", time: "12 min ago" },
  { id: "HZ-219", title: "Oil spill near excavator pad 3", zone: "Site South", reporter: "J. Patel", severity: "Medium", status: "Triaged", time: "48 min ago" },
  { id: "HZ-218", title: "Unsecured rebar bundle", zone: "Tower B / L03", reporter: "L. Chen", severity: "Critical", status: "Open", time: "3 min ago" },
  { id: "HZ-217", title: "Glare obscuring crane signal", zone: "Site East", reporter: "S. Tahir", severity: "Low", status: "Resolved", time: "2 h ago" },
];

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: "Idle" | "Active" | "Maintenance" | "Fault";
  utilisation: number;
  engineHrs: number;
  nextService: string;
}

export const assets: Asset[] = [
  { id: "CR-TC02", name: "Liebherr 280 EC-H Tower Crane", type: "Crane", status: "Active", utilisation: 88, engineHrs: 1423, nextService: "in 18 h" },
  { id: "CR-TC01", name: "Potain MDT 219 Tower Crane", type: "Crane", status: "Active", utilisation: 71, engineHrs: 902, nextService: "in 5 d" },
  { id: "EX-04", name: "CAT 336 Excavator", type: "Earthmoving", status: "Maintenance", utilisation: 0, engineHrs: 5210, nextService: "in service" },
  { id: "HO-12", name: "Alimak SE 1200 Hoist", type: "Hoist", status: "Active", utilisation: 94, engineHrs: 612, nextService: "in 2 d" },
  { id: "CP-07", name: "Putzmeister Concrete Pump", type: "Concrete", status: "Fault", utilisation: 0, engineHrs: 1810, nextService: "URGENT" },
  { id: "GE-02", name: "Cummins 200kVA Genset", type: "Power", status: "Idle", utilisation: 12, engineHrs: 340, nextService: "in 22 d" },
];

export interface Milestone {
  id: string;
  name: string;
  scheduled: string;
  actual: string;
  variance: string;
  status: "On Track" | "At Risk" | "Slipping" | "Complete";
}

export const milestones: Milestone[] = [
  { id: "M-08", name: "L13 Slab — structural sign-off", scheduled: "Mon 27 May", actual: "Mon 27 May", variance: "0 d", status: "Complete" },
  { id: "M-09", name: "L14 Slab — structural sign-off", scheduled: "Wed 29 May", actual: "Wed 29 May", variance: "0 d", status: "On Track" },
  { id: "M-10", name: "Facade weather-tight L1-L9", scheduled: "Fri 31 May", actual: "Mon 03 Jun", variance: "+3 d", status: "Slipping" },
  { id: "M-11", name: "MEP rough-in basement", scheduled: "Tue 04 Jun", actual: "—", variance: "—", status: "At Risk" },
  { id: "M-12", name: "Fire compartmentation L1-L5", scheduled: "Fri 07 Jun", actual: "—", variance: "—", status: "On Track" },
];

export interface AiInsight {
  id: string;
  level: "info" | "warn" | "crit";
  title: string;
  detail: string;
  recommend: string;
}

export const aiInsights: AiInsight[] = [
  {
    id: "AI-01",
    level: "crit",
    title: "Concrete pump CP-07 fault → 4 trades will stall by 15:00",
    detail: "Predicted ripple: WO-1041, WO-1047 + 2 follow-on pours. Critical path slips 1.5 days if unresolved.",
    recommend: "Soft-book backup pump from Apex (ETA 90 min). Notify 12 crew members.",
  },
  {
    id: "AI-02",
    level: "warn",
    title: "Trade overlap risk — L09 facade vs window cleaners",
    detail: "Glassline and SkyClean both scheduled L09 west face 10:00–14:00 tomorrow.",
    recommend: "Reschedule SkyClean to 15:00 — frees crane TC-02 window.",
  },
  {
    id: "AI-03",
    level: "info",
    title: "Weather: 38 km/h wind gusts forecast Thu 13:00–17:00",
    detail: "Crane lift threshold exceeded. 7 scheduled lifts affected.",
    recommend: "Bring forward heavy lifts to Thu morning shift.",
  },
];

export const kpis = [
  { label: "Active Workers", value: "428", delta: "+12 today", tone: "neutral" as const },
  { label: "Open Hazards", value: "3", delta: "1 critical", tone: "danger" as const },
  { label: "Schedule Variance", value: "+1.2d", delta: "vs baseline", tone: "warn" as const },
  { label: "Plant Utilisation", value: "78%", delta: "+4% wow", tone: "good" as const },
];
