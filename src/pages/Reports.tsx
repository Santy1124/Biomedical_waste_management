import { reports } from "../data/mockData";

export function Reports() {
  return (
    <>
      <p className="demo-label">Audit-ready evidence</p>
      <h2>Reports & Evidence Packs</h2>

      <div className="section-grid">
        {reports.map((report) => (
          <div className="card" key={report}>
            <h3>{report}</h3>
            <p>Generate, review, and export this compliance pack.</p>
            <button className="secondary-btn">Generate</button>
          </div>
        ))}
      </div>
    </>
  );
}