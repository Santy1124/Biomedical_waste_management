import {
  auditItems,
  complianceMetrics,
} from "../data/mockData";

export function Compliance() {
  return (
    <>
      <p className="demo-label">
        Audit & Compliance Center
      </p>

      <h2>Compliance Overview</h2>

      <p className="demo-description">
        Monitor regulatory readiness,
        audit evidence, storage compliance,
        training coverage, and operational risk.
      </p>

      <div className="kpi-grid">

        <div className="featured-card">
          <span className="demo-label">
            Compliance Score
          </span>
          <h3>
            {complianceMetrics.complianceScore}%
          </h3>
          <p>Overall BMW compliance</p>
        </div>

        <div className="featured-card">
          <span className="demo-label">
            Storage Compliance
          </span>
          <h3>
            {complianceMetrics.storageCompliance}%
          </h3>
          <p>48-hour threshold adherence</p>
        </div>

        <div className="featured-card">
          <span className="demo-label">
            Pickup SLA
          </span>
          <h3>
            {complianceMetrics.pickupSLA}%
          </h3>
          <p>On-time collection</p>
        </div>

        <div className="featured-card">
          <span className="demo-label">
            Incident Closure
          </span>
          <h3>
            {complianceMetrics.incidentClosureRate}%
          </h3>
          <p>CAPA effectiveness</p>
        </div>

      </div>

      <h3 className="subsection-title">
        Audit Evidence
      </h3>

      <div className="section-grid">
        {auditItems.map((item) => (
          <div
            key={item.title}
            className="card"
          >
            <h3>{item.title}</h3>

            <p>
              Status:
              <span> {item.status}</span>
            </p>

            <button className="secondary-btn">
              Review
            </button>
          </div>
        ))}
      </div>
    </>
  );
}