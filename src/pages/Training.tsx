export function Training() {
  return (
    <>
      <p className="demo-label">Segregation improvement</p>
      <h2>Training Dashboard</h2>

      <div className="kpi-grid">
        <div className="featured-card">
          <span className="demo-label">Completion</span>
          <h3>82%</h3>
          <p>Staff training completed</p>
        </div>
        <div className="featured-card">
          <span className="demo-label">Due</span>
          <h3>17</h3>
          <p>Staff need refresher training</p>
        </div>
        <div className="featured-card danger-card">
          <span className="demo-label">Hotspot</span>
          <h3>OT</h3>
          <p>Highest segregation violations</p>
        </div>
      </div>
    </>
  );
}