import React from "react";
import { StatusBadge } from "../components/StatusBadge";
import { bags as initialBags } from "../data/mockData";
import type { Bag, BagStatus } from "../types/bmw";

const nextActionMap: Record<BagStatus, { label: string; next: BagStatus } | null> = {
  Created: { label: "Collect Bag", next: "Collected" },
  Collected: { label: "Move to Storage", next: "In Storage" },
  "In Storage": { label: "Mark Ready for Pickup", next: "Ready for Pickup" },
  "Ready for Pickup": { label: "Start Transit", next: "In Transit" },
  "In Transit": { label: "Mark Treated", next: "Treated" },
  Treated: null,
  Disputed: null,
};

export function Scanner() {
  const [bags, setBags] = React.useState<Bag[]>(initialBags);
  const [scanInput, setScanInput] = React.useState("BMW-YEL-001");
  const [scannedBag, setScannedBag] = React.useState<Bag | null>(initialBags[0]);
  const [scanError, setScanError] = React.useState("");
  const [recentScans, setRecentScans] = React.useState<string[]>(["BMW-YEL-001"]);

  function runScan(value: string) {
    const found = bags.find(
      (bag) => bag.id.toLowerCase() === value.trim().toLowerCase()
    );

    if (!found) {
      setScannedBag(null);
      setScanError(`No matching bag found for "${value}".`);
      return;
    }

    setScanError("");
    setScannedBag(found);
    setRecentScans((prev) => [found.id, ...prev.filter((id) => id !== found.id)].slice(0, 5));
  }

  function scanBag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runScan(scanInput);
  }

  function updateStatus(status: BagStatus) {
    if (!scannedBag) return;

    const updatedBags = bags.map((bag) =>
      bag.id === scannedBag.id ? { ...bag, status } : bag
    );

    setBags(updatedBags);
    setScannedBag(updatedBags.find((bag) => bag.id === scannedBag.id) ?? null);
  }

  const nextAction = scannedBag ? nextActionMap[scannedBag.status] : null;

  return (
    <>
      <p className="demo-label">QR workflow</p>
      <h2>Scanner</h2>

      <p className="demo-description">
        Use manual scan now. Real camera scan can be added after this layout is stable.
      </p>

      <div className="scanner-modern-layout">
        <div className="scanner-options">
          <div className="card">
            <h3>Scan Options</h3>

            <button className="primary-btn full-btn">Open Camera Scanner</button>
            <button className="secondary-btn full-btn">Upload QR Image</button>

            <form onSubmit={scanBag} className="scan-form">
              <label>Manual Bag ID</label>
              <input
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="BMW-YEL-001"
              />
              <button className="primary-btn">Scan Bag</button>
            </form>

            {scanError && <p className="error-text">{scanError}</p>}
          </div>

          <div className="card">
            <h3>Recent Scans</h3>
            <div className="recent-scan-list">
              {recentScans.map((id) => (
                <button
                  key={id}
                  className="recent-scan"
                  onClick={() => {
                    setScanInput(id);
                    runScan(id);
                  }}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card scan-result-card">
          <h3>Scan Result</h3>

          {!scannedBag && (
            <p>Scan or enter a bag ID to view custody details and available actions.</p>
          )}

          {scannedBag && (
            <>
              <div className="scan-result-header">
                <div>
                  <p className="demo-label">Bag Found</p>
                  <h3>{scannedBag.id}</h3>
                </div>
                <StatusBadge value={scannedBag.status} />
              </div>

              <div className="scan-result-grid">
                <p>Category: <span>{scannedBag.category}</span></p>
                <p>Department: <span>{scannedBag.department}</span></p>
                <p>Age: <span>{scannedBag.age}</span></p>
                <p>Weight: <span>{scannedBag.weight}</span></p>
                <p>Location: <span>{scannedBag.currentLocation}</span></p>
                <p>Risk: <StatusBadge value={scannedBag.risk} /></p>
              </div>

              <div className="detail-actions">
                {nextAction ? (
                  <button className="primary-btn" onClick={() => updateStatus(nextAction.next)}>
                    {nextAction.label}
                  </button>
                ) : (
                  <button className="secondary-btn" disabled>
                    No Next Action
                  </button>
                )}

                <button className="secondary-btn danger-outline" onClick={() => updateStatus("Disputed")}>
                  Mark Disputed
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}