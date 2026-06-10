import type { Bag } from "../types/bmw";
import type { Incident } from "../types/bmw";

export const bags: Bag[] = [
  {
    id: "BMW-YEL-001",
    category: "Yellow",
    department: "OT",
    status: "In Storage",
    age: "42h",
    risk: "High",
    weight: "3.2 kg",
    currentLocation: "Yellow Zone",
  },
  {
    id: "BMW-RED-014",
    category: "Red",
    department: "ICU",
    status: "Collected",
    age: "18h",
    risk: "Normal",
    weight: "2.1 kg",
    currentLocation: "Trolley T-02",
  },
  {
    id: "BMW-WHT-032",
    category: "White",
    department: "Lab",
    status: "Ready for Pickup",
    age: "11h",
    risk: "Normal",
    weight: "0.8 kg",
    currentLocation: "White Zone",
  },
  {
    id: "BMW-BLU-009",
    category: "Blue",
    department: "Ward",
    status: "Disputed",
    age: "26h",
    risk: "Medium",
    weight: "1.4 kg",
    currentLocation: "Hold Zone",
  },
];

export const incidents: Incident[] = [
  {
    id: "INC-001",
    type: "Mis-segregation",
    department: "OT",
    severity: "Medium",
    status: "Open",
    owner: "BMW Officer",
    dueDate: "2026-06-12",
    action: "Correct segregation and conduct micro-training.",
  },
  {
    id: "INC-002",
    type: "Leaking Bag",
    department: "ICU",
    severity: "High",
    status: "CAPA Assigned",
    owner: "Housekeeping Supervisor",
    dueDate: "2026-06-11",
    action: "Re-bag, sanitize area, and verify PPE checklist.",
  },
];

export const reports = [
  "Daily BMW Register",
  "Monthly Category Summary",
  "Pickup Performance Report",
  "Incident Register",
  "Training Coverage",
  "Annual Form IV Pack",
  "Inspection Evidence Pack",
];

export const bagTimeline = [
  {
    title: "Bag Created",
    time: "Today, 08:20 AM",
    owner: "Nurse / OT",
    note: "Yellow waste bag created at point of generation.",
  },
  {
    title: "Collected",
    time: "Today, 10:10 AM",
    owner: "Housekeeping",
    note: "Scanned during collection round CR-1024.",
  },
  {
    title: "Storage Scan-in",
    time: "Today, 10:42 AM",
    owner: "BMW Storage Staff",
    note: "Moved into Yellow Zone.",
  },
  {
    title: "Threshold Warning",
    time: "Pending",
    owner: "System",
    note: "Alert will trigger before 48-hour storage limit.",
  },
];

export const storageZones = [
  {
    id: "yellow",
    name: "Yellow Zone",
    bags: 14,
    oldestHours: 42,
    capacity: 70,
  },
  {
    id: "red",
    name: "Red Zone",
    bags: 21,
    oldestHours: 18,
    capacity: 55,
  },
  {
    id: "white",
    name: "White Zone",
    bags: 7,
    oldestHours: 11,
    capacity: 25,
  },
  {
    id: "blue",
    name: "Blue Zone",
    bags: 4,
    oldestHours: 52,
    capacity: 90,
  },
];

export const manifests = [
  {
    id: "MAN-2026-001",
    bags: 12,
    weight: "34.2 kg",
    status: "Pending Pickup",
  },
  {
    id: "MAN-2026-002",
    bags: 18,
    weight: "51.8 kg",
    status: "Collected",
  },
];

export const wasteTrendData = [
  { day: "Mon", waste: 35 },
  { day: "Tue", waste: 42 },
  { day: "Wed", waste: 39 },
  { day: "Thu", waste: 47 },
  { day: "Fri", waste: 45 },
  { day: "Sat", waste: 30 },
  { day: "Sun", waste: 28 },
];

export const departmentWasteData = [
  { name: "OT", value: 34 },
  { name: "ICU", value: 28 },
  { name: "Ward", value: 22 },
  { name: "Lab", value: 16 },
];

export const violationData = [
  { department: "OT", count: 12 },
  { department: "ICU", count: 4 },
  { department: "Lab", count: 2 },
  { department: "Ward", count: 1 },
];

export const incidentSummaryData = [
  { status: "Open", count: 3 },
  { status: "CAPA", count: 4 },
  { status: "Closed", count: 27 },
];

export const complianceMetrics = {
  complianceScore: 92,
  storageCompliance: 96,
  pickupSLA: 94,
  trainingCoverage: 82,
  incidentClosureRate: 88,
};

export const auditItems = [
  {
    title: "Storage Breach Log",
    status: "1 Active",
  },
  {
    title: "Manifest History",
    status: "24 Records",
  },
  {
    title: "Training Compliance",
    status: "82% Complete",
  },
  {
    title: "Form IV Readiness",
    status: "Ready",
  },
  {
    title: "Incident Register",
    status: "31 Records",
  },
  {
    title: "Pickup Performance",
    status: "94% SLA",
  },
];

import type { SystemAlert } from "../types/bmw";

export const systemAlerts: SystemAlert[] = [
  {
    id: "ALT-001",
    title: "Yellow Zone nearing 48-hour threshold",
    source: "Central Storage",
    severity: "Critical",
    status: "New",
    owner: "BMW Officer",
    time: "12 min ago",
    action: "Request pickup and document escalation.",
  },
  {
    id: "ALT-002",
    title: "CAPA overdue for leaking bag incident",
    source: "Incident Register",
    severity: "Warning",
    status: "New",
    owner: "Housekeeping Supervisor",
    time: "1 hr ago",
    action: "Update corrective action and closure evidence.",
  },
  {
    id: "ALT-003",
    title: "CBWTF pickup not confirmed",
    source: "Pickup Manifest",
    severity: "Critical",
    status: "Escalated",
    owner: "Hospital Admin",
    time: "2 hrs ago",
    action: "Call CBWTF contact and record communication.",
  },
  {
    id: "ALT-004",
    title: "17 staff due for refresher training",
    source: "Training",
    severity: "Info",
    status: "Acknowledged",
    owner: "BMW Officer",
    time: "Today",
    action: "Schedule department-wise refresher session.",
  },
];