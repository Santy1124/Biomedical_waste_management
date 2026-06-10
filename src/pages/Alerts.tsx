import React from "react";
import { systemAlerts } from "../data/mockData";
import { StatusBadge } from "../components/StatusBadge";
import type { AlertStatus, SystemAlert } from "../types/bmw";

const nextStatusMap: Record<AlertStatus, AlertStatus | null> = {
  New: "Acknowledged",
  Acknowledged: "Escalated",
  Escalated: "Resolved",
  Resolved: null,
};

export function Alerts() {
  const [alerts, setAlerts] = React.useState<SystemAlert[]>(systemAlerts);

  function updateAlertStatus(id: string, status: AlertStatus) {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status } : alert
      )
    );
  }

  return (
    <>
      <p className="demo-label">Command Center</p>
      <h2>Alerts & Notifications</h2>
      <p className="demo-description">
        Proactive alerts for storage thresholds, missed pickups, overdue CAPA,
        training gaps, and unresolved disputes.
      </p>

      <div className="kpi-grid">
        <div className="featured-card danger-card">
          <span className="demo-label">Critical</span>
          <h3>{alerts.filter((a) => a.severity === "Critical").length}</h3>
          <p>Immediate attention</p>
        </div>

        <div className="featured-card">
          <span className="demo-label">New</span>
          <h3>{alerts.filter((a) => a.status === "New").length}</h3>
          <p>Awaiting acknowledgement</p>
        </div>

        <div className="featured-card">
          <span className="demo-label">Escalated</span>
          <h3>{alerts.filter((a) => a.status === "Escalated").length}</h3>
          <p>Assigned to senior owner</p>
        </div>

        <div className="featured-card">
          <span className="demo-label">Resolved</span>
          <h3>{alerts.filter((a) => a.status === "Resolved").length}</h3>
          <p>Closed alerts</p>
        </div>
      </div>

      <h3 className="subsection-title">Active Alerts</h3>

      <div className="alert-list">
        {alerts.map((alert) => {
          const nextStatus = nextStatusMap[alert.status];

          return (
            <div key={alert.id} className="alert-card">
              <div className="alert-main">
                <div>
                  <p className="demo-label">{alert.source}</p>
                  <h3>{alert.title}</h3>
                  <p>{alert.action}</p>
                </div>

                <div className="alert-badges">
                  <StatusBadge value={alert.severity} />
                  <StatusBadge value={alert.status} />
                </div>
              </div>

              <div className="alert-meta">
                <span>{alert.id}</span>
                <span>Owner: {alert.owner}</span>
                <span>{alert.time}</span>
              </div>

              <div className="detail-actions">
                {nextStatus ? (
                  <button
                    className="primary-btn"
                    onClick={() => updateAlertStatus(alert.id, nextStatus)}
                  >
                    Move to {nextStatus}
                  </button>
                ) : (
                  <button className="secondary-btn" disabled>
                    Resolved
                  </button>
                )}

                <button
                  className="secondary-btn danger-outline"
                  onClick={() => updateAlertStatus(alert.id, "Resolved")}
                >
                  Resolve Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}