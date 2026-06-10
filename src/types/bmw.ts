export type PageKey =
  | "dashboard"
  | "facility"
  | "createBag"
  | "bagTracking"
  | "scanner"
  | "storage"
  | "pickup"
  | "incidents"
  | "reports"
  | "training"
  | "compliance"
  | "alerts";

export type RiskLevel = "Normal" | "Medium" | "High" | "Breach";

export type BagStatus =
  | "Created"
  | "Collected"
  | "In Storage"
  | "Ready for Pickup"
  | "In Transit"
  | "Treated"
  | "Disputed";

export type Bag = {
  id: string;
  category: "Yellow" | "Red" | "White" | "Blue";
  department: string;
  status: BagStatus;
  age: string;
  risk: RiskLevel;
  weight: string;
  currentLocation: string;
};

export type TimelineEvent = {
  title: string;
  time: string;
  owner: string;
  note: string;
};

export type IncidentStatus =
  | "Open"
  | "Investigating"
  | "CAPA Assigned"
  | "Awaiting Closure"
  | "Closed";

export type Incident = {
  id: string;
  type: string;
  department: string;
  severity: "Low" | "Medium" | "High";
  status: IncidentStatus;
  owner: string;
  dueDate: string;
  action: string;
};

export type AlertSeverity = "Info" | "Warning" | "Critical";

export type AlertStatus = "New" | "Acknowledged" | "Escalated" | "Resolved";

export type SystemAlert = {
  id: string;
  title: string;
  source: string;
  severity: AlertSeverity;
  status: AlertStatus;
  owner: string;
  time: string;
  action: string;
};