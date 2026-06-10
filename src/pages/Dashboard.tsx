import { BagTable } from "../components/BagTable";
import { DashboardCharts } from "../components/DashboardCharts";
import { StatCard } from "../components/StatCard";
import { useBagStore } from "../store/bagStore";

export function Dashboard() {
  const bags = useBagStore((state) => state.bags);
  return (
    <>
      <p className="demo-label">
        Executive Compliance Dashboard
      </p>

      <h2>BMW Waste Management</h2>

      <p className="demo-description">
        Operational visibility, compliance monitoring,
        and performance tracking.
      </p>

      <div className="kpi-grid">
        <StatCard
          title="Bags Today"
          value="46"
          note="+12% from yesterday"
        />

        <StatCard
          title="In Storage"
          value="28"
          note="4 near threshold"
          danger
        />

        <StatCard
          title="Open Incidents"
          value="3"
          note="2 pending CAPA"
        />

        <StatCard
          title="Pickup SLA"
          value="94%"
          note="On-time pickups"
        />
      </div>

      <h3 className="subsection-title">
        Analytics
      </h3>

      <DashboardCharts />

      <h3 className="subsection-title">
        Live Risk Monitoring
      </h3>

      <BagTable bags={bags} />
    </>
  );
}