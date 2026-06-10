import { StatCard } from "./StatCard";

export function StorageKpis() {
  return (
    <div className="kpi-grid">
      <StatCard
        title="Storage Capacity"
        value="78%"
        note="Across all zones"
      />

      <StatCard
        title="Near Threshold"
        value="4"
        note="Within 6 hours"
        danger
      />

      <StatCard
        title="Breached"
        value="1"
        note="Immediate action required"
        danger
      />

      <StatCard
        title="Pickup Requests"
        value="2"
        note="Pending CBWTF confirmation"
      />
    </div>
  );
}