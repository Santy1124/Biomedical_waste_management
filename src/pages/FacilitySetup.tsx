export function FacilitySetup() {
  return (
    <>
      <p className="demo-label">One-time configuration</p>
      <h2>Facility Setup</h2>

      <div className="form-grid">
        <div className="form-card">
          <h3>Hospital Profile</h3>
          <label>Hospital Name</label>
          <input placeholder="Example: Chennai Care Hospital" />
          <label>Bed Count</label>
          <input placeholder="Example: 250" />
          <label>BMW Officer</label>
          <input placeholder="Officer name" />
        </div>

        <div className="form-card">
          <h3>CBWTF Tie-up</h3>
          <label>Operator Name</label>
          <input placeholder="Authorized CBWTF operator" />
          <label>Pickup Window</label>
          <input placeholder="Example: 6 PM - 8 PM" />
          <label>Escalation Contact</label>
          <input placeholder="Phone / email" />
        </div>
      </div>
    </>
  );
}