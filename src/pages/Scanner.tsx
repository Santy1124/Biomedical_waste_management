import React from "react";
import { bags as initialBags } from "../data/mockData";
import type { Bag, BagStatus } from "../types/bmw";
import { StatusBadge } from "../components/StatusBadge";
import { RealQrScanner } from "../components/RealQrScanner";

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
  const [scannedBag, setScannedBag] = React.useState<Bag | null>(null);
  const [scanError, setScanError] = React.useState("");

  function scanBag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = bags.find(
      (bag) => bag.id.toLowerCase() === scanInput.trim().toLowerCase()
    );

    if (!found) {
      setScannedBag(null);
      setScanError("Bag not found. Try BMW-YEL-001, BMW-RED-014, BMW-WHT-032, or BMW-BLU-009.");
      return;
    }

    setScanError("");
    setScannedBag(found);
  }

  function handleRealQrScan(decodedText: string) {
    setScanInput(decodedText);

    const found = bags.find(
      (bag) => bag.id.toLowerCase() === decodedText.trim().toLowerCase()
    );

    if (!found) {
      setScannedBag(null);
      setScanError(`Scanned "${decodedText}", but no matching bag was found.`);
      return;
    }

    setScanError("");
    setScannedBag(found);
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
      <p className="demo-label">QR workflow simulation</p>
      <h2>Scanner</h2>

      <p className="demo-description">
        Simulate QR scanning using a bag ID. Later this can connect to a real mobile camera scanner.
      </p>

      <div className="scanner-layout">
        <div className="scanner-box">
          <RealQrScanner onScan={handleRealQrScan} />

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