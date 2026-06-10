import type { DemoUser } from "../types/auth";

export const demoUsers: DemoUser[] = [
  {
    name: "Hospital Admin",
    role: "Admin",
    allowedPages: [
      "dashboard",
      "facility",
      "createBag",
      "bagTracking",
      "scanner",
      "storage",
      "pickup",
      "incidents",
      "reports",
      "training",
      "compliance",
      "alerts",
    ],
  },
  {
    name: "BMW Officer",
    role: "BMW Officer",
    allowedPages: [
      "dashboard",
      "bagTracking",
      "scanner",
      "storage",
      "pickup",
      "incidents",
      "reports",
      "training",
      "compliance",
      "alerts"
    ],
  },
  {
    name: "Nurse / Technician",
    role: "Nurse",
    allowedPages: ["createBag", "scanner", "training"],
  },
  {
    name: "Housekeeping Staff",
    role: "Housekeeping",
    allowedPages: ["scanner", "bagTracking", "storage", "alerts"],
  },
  {
    name: "CBWTF Pickup Staff",
    role: "CBWTF Operator",
    allowedPages: ["pickup", "scanner", "reports"],
  },
];