import React from "react";
import { incidents as initialIncidents } from "../data/mockData";
import { IncidentWorkflow } from "../components/IncidentWorkflow";
import { StatusBadge } from "../components/StatusBadge";
import type { Incident, IncidentStatus } from "../types/bmw";

const nextStatusMap: Record<IncidentStatus, IncidentStatus | null> = {
  Open: "Investigating",
  Investigating: "CAPA Assigned",
  "CAPA Assigned": "Awaiting Closure",
  "Awaiting Closure": "Closed",
  Closed: null,
};

export function Incidents() {
  const [incidents, setIncidents] = React.useState<Incident[]>(initialIncidents);
  const [selectedIncident, setSelectedIncident] = React.useState<Incident | null>(
    incidents[0] ?? null
  );

  function updateIncidentStatus(id: string, status: IncidentStatus) {
    const updated = incidents.map((incident) =>
      incident.id === id ? { ...incident, status } : incident
    );

    setIncidents(updated);
    setSelectedIncident(updated.find((incident) => incident.id === id) ?? null);
  }

  function createIncident(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const newIncident: Incident = {
      id: `INC-${String(incidents.length + 1).padStart(3, "0")}`,
      type: String(form.get("type")),
      department: String(form.get("department")),
      severity: form.get("severity") as Incident["severity"],
      status: "Open",
      owner: String(form.get("owner")),
      dueDate: String(form.get("dueDate")),
      action: String(form.get("action")),
    };

    setIncidents([newIncident, ...incidents]);
    setSelectedIncident(newIncident);
    event.currentTarget.reset();
  }

  return (
    <>
      <p className="demo-label">Exception-first compliance</p>
      <h2>Incident Workflow & CAPA</h2>
      <p className="demo-description">
        Track spills, mis-segregation, sharps risks, leaking bags, equipment downtime,
        corrective action, and closure evidence.
      </p>

      <div className="incident-layout">
        <form className="form-card" onSubmit={createIncident}>
          <h3>Create Incident</h3>

          <label>Incident Type</label>
          <select name="type">
            <option>Mis-segregation</option>
            <option>Spill</option>
            <option>Sharps Injury</option>
            <option>Leaking Bag</option>
            <option>Equipment Downtime</option>
          </select>

          <label>Department</label>
          <input name="department" placeholder="Example: OT" required />

          <label>Severity</label>
          <select name="severity">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>CAPA Owner</label>
          <input name="owner" placeholder="Example: BMW Officer" required />

          <label>Due Date</label>
          <input name="dueDate" type="date" required />

          <label>Corrective Action</label>
          <input
            name="action"
            placeholder="Example: Re-bag, sanitize, train staff..."
            required
          />

          <button className="primary-btn">Create Incident</button>
        </form>

        <div className="card">
          <h3>Incident Register</h3>

          <div className="incident-list">
            {incidents.map((incident) => (
              <button
                key={incident.id}
                className={`incident-row ${
                  selectedIncident?.id === incident.id ? "selected" : ""
                }`}
                onClick={() => setSelectedIncident(incident)}
              >
                <strong>{incident.id}</strong>
                <span>{incident.type}</span>
                <StatusBadge value={incident.status} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedIncident && (
        <div className="detail-panel">
          <div className="detail-header">
            <div>
              <p className="demo-label">Incident Detail</p>
              <h3>{selectedIncident.id}</h3>
            </div>

            <StatusBadge value={selectedIncident.severity} />
          </div>

          <IncidentWorkflow status={selectedIncident.status} />

          <div className="detail-actions">
            {nextStatusMap[selectedIncident.status] ? (
              <button
                className="primary-btn"
                onClick={() =>
                  updateIncidentStatus(
                    selectedIncident.id,
                    nextStatusMap[selectedIncident.status]!
                  )
                }
              >
                Move to {nextStatusMap[selectedIncident.status]}
              </button>
            ) : (
              <button className="secondary-btn" disabled>
                Incident Closed
              </button>
            )}
          </div>

          <div className="detail-grid">
            <p>Type: <span>{selectedIncident.type}</span></p>
            <p>Department: <span>{selectedIncident.department}</span></p>
            <p>Status: <StatusBadge value={selectedIncident.status} /></p>
            <p>Owner: <span>{selectedIncident.owner}</span></p>
            <p>Due Date: <span>{selectedIncident.dueDate}</span></p>
            <p>Action: <span>{selectedIncident.action}</span></p>
          </div>
        </div>
      )}
    </>
  );
}